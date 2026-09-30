// ==========================================================
// Supabase Edge Function: kick-webhook
// Secure Kick Webhook Listener, Command Processor & Event Router
// ==========================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, kick-event-signature, kick-event-message-id, kick-event-message-timestamp",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Variable Resolver
function resolveVariables(
  template: string,
  vars: Record<string, string | number | undefined | null>
): string {
  let result = template;
  for (const [key, val] of Object.entries(vars)) {
    const regex = new RegExp(`\\{${key}\\}`, "gi");
    result = result.replace(regex, String(val ?? ""));
  }
  return result;
}

// Calculate level from XP
function calculateLevel(xp: number, curve: "linear" | "progressive" | "custom" = "progressive"): { level: number; nextLevelXp: number } {
  if (curve === "linear") {
    const level = Math.floor(xp / 100) + 1;
    const nextLevelXp = level * 100;
    return { level, nextLevelXp };
  }
  // Progressive curve: Level N requires N * 100 + (N-1)*50 XP
  let level = 1;
  let threshold = 100;
  let accumulated = 0;
  while (xp >= accumulated + threshold) {
    accumulated += threshold;
    level++;
    threshold = Math.floor(threshold * 1.35);
  }
  return { level, nextLevelXp: accumulated + threshold };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const kickWebhookSecret = Deno.env.get("KICK_WEBHOOK_SECRET") || "";
  const kickClientId = Deno.env.get("KICK_CLIENT_ID") || "";
  const kickClientSecret = Deno.env.get("KICK_CLIENT_SECRET") || "";

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const rawBody = await req.text();
    const headers = req.headers;

    const signature = headers.get("kick-event-signature");
    const messageId = headers.get("kick-event-message-id") || crypto.randomUUID();
    const timestampStr = headers.get("kick-event-message-timestamp");

    // 1. Replay Attack & Timestamp Check
    if (timestampStr) {
      let eventTime = new Date(timestampStr).getTime();
      if (isNaN(eventTime) && /^\d+$/.test(timestampStr)) {
        const num = Number(timestampStr);
        eventTime = num > 1e11 ? num : num * 1000;
      }
      if (!isNaN(eventTime)) {
        const now = Date.now();
        if (Math.abs(now - eventTime) > 10 * 60 * 1000) {
          return new Response(JSON.stringify({ error: "Zaman aşımı / Replay attack koruması tetiklendi." }), {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }
    }

    // 2. Webhook Signature Verification (If secret is configured)
    if (kickWebhookSecret && signature) {
      // HMAC SHA-256 verification
      const encoder = new TextEncoder();
      const keyData = encoder.encode(kickWebhookSecret);
      const key = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["verify"]
      );

      const signatureData = new Uint8Array(
        (signature.match(/.{1,2}/g) || []).map((byte) => parseInt(byte, 16))
      );

      const isValid = await crypto.subtle.verify(
        "HMAC",
        key,
        signatureData,
        encoder.encode(rawBody)
      );

      if (!isValid) {
        return new Response(JSON.stringify({ error: "Geçersiz Kick Webhook İmzası." }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const payload = JSON.parse(rawBody || "{}");
    const eventType = payload.event || payload.type || "";
    const eventData = payload.data || payload;

    // 3. Idempotency Check (Prevent duplicate execution)
    const { data: existingEvent } = await supabaseAdmin
      .from("processed_events")
      .select("id")
      .eq("event_id", messageId)
      .maybeSingle();

    if (existingEvent) {
      return new Response(JSON.stringify({ status: "already_processed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Mark as processed
    await supabaseAdmin.from("processed_events").insert({
      event_id: messageId,
      event_type: eventType,
      processed_at: new Date().toISOString(),
    });

    // 4. Broadcaster Identification
    const broadcasterId = eventData.broadcaster_user_id || eventData.channel_id;
    const broadcasterSlug = (eventData.broadcaster?.slug || eventData.channel?.slug || "").toLowerCase();

    let accountQuery = supabaseAdmin.from("kick_accounts").select("id, kick_username, is_connected");
    if (broadcasterId) {
      accountQuery = accountQuery.eq("kick_user_id", broadcasterId);
    } else if (broadcasterSlug) {
      accountQuery = accountQuery.eq("kick_channel_slug", broadcasterSlug);
    }

    let { data: account } = await accountQuery.maybeSingle();
    if (!account) {
      // Tek yayıncı modu: Eğer event payload'ında ID eşleşmezse bağlı olan tek kanalı kullan
      const { data: fallbackAccount } = await supabaseAdmin
        .from("kick_accounts")
        .select("id, kick_username, is_connected")
        .eq("is_connected", true)
        .limit(1)
        .maybeSingle();
      if (fallbackAccount) {
        account = fallbackAccount;
      }
    }

    if (!account || !account.is_connected) {
      return new Response(JSON.stringify({ message: "Bağlı hesap bulunamadı veya pasif." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const accountId = account.id;

    // Fetch Bot Settings & XP Settings
    const [botSettingsRes, xpSettingsRes] = await Promise.all([
      supabaseAdmin.from("bot_settings").select("*").eq("kick_account_id", accountId).single(),
      supabaseAdmin.from("xp_settings").select("*").eq("kick_account_id", accountId).single(),
    ]);

    const botSettings = botSettingsRes.data;
    const xpSettings = xpSettingsRes.data;

    // Helper: Send Chat Message through Kick Chat API with auto-token-refresh
    const sendChatMessage = async (content: string) => {
      if (!content.trim() || !botSettings?.is_online) return;

      const effectiveBroadcasterId = broadcasterId || account.kick_user_id;

      const { data: tokenRecord } = await supabaseAdmin
        .from("oauth_tokens")
        .select("access_token, refresh_token, expires_at")
        .eq("kick_account_id", accountId)
        .maybeSingle();

      if (!tokenRecord?.access_token) return;

      let currentAccessToken = tokenRecord.access_token;
      const isExpired = tokenRecord.expires_at && new Date(tokenRecord.expires_at).getTime() < Date.now() + 60000;

      // Token yenileme yardımcı fonksiyonu
      const doRefreshToken = async (): Promise<string | null> => {
        if (!tokenRecord.refresh_token || !kickClientId || !kickClientSecret) return null;
        try {
          const res = await fetch("https://id.kick.com/oauth/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              client_id: kickClientId,
              client_secret: kickClientSecret,
              refresh_token: tokenRecord.refresh_token,
            }),
          });
          if (!res.ok) return null;
          const refreshed = await res.json();
          const newExpiresAt = new Date(Date.now() + (refreshed.expires_in || 3600) * 1000).toISOString();
          await supabaseAdmin.from("oauth_tokens").update({
            access_token: refreshed.access_token,
            refresh_token: refreshed.refresh_token || tokenRecord.refresh_token,
            expires_at: newExpiresAt,
            updated_at: new Date().toISOString(),
          }).eq("kick_account_id", accountId);
          return refreshed.access_token;
        } catch {
          return null;
        }
      };

      if (isExpired) {
        const freshToken = await doRefreshToken();
        if (freshToken) currentAccessToken = freshToken;
      }

      // Mesajı Kick Chat API'ye gönder (type: 'user' yayıncı adına göndermek için gereklidir)
      const payloadBody = JSON.stringify({
        broadcaster_user_id: effectiveBroadcasterId ? Number(effectiveBroadcasterId) : undefined,
        content: content.trim(),
        type: "user",
      });

      let chatRes = await fetch("https://api.kick.com/public/v1/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentAccessToken}`,
          "Content-Type": "application/json",
        },
        body: payloadBody,
      }).catch((e) => {
        console.error("Kick chat fetch hatası:", e);
        return null;
      });

      // Eğer 401 Unauthorized dönerse tokenı yenileyip bir kez daha dene
      if (chatRes && chatRes.status === 401) {
        const freshToken = await doRefreshToken();
        if (freshToken) {
          chatRes = await fetch("https://api.kick.com/public/v1/chat", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${freshToken}`,
              "Content-Type": "application/json",
            },
            body: payloadBody,
          }).catch((e) => {
            console.error("Kick chat tekrar gönderme hatası:", e);
            return null;
          });
        }
      }

      if (chatRes && !chatRes.ok) {
        const errText = await chatRes.text().catch(() => "");
        console.error(`Kick chat API hatası (${chatRes.status}):`, errText);
        try {
          await supabaseAdmin.from("logs").insert({
            kick_account_id: accountId,
            level: "error",
            category: "CHAT",
            message: `Kick mesaj gönderme hatası (${chatRes.status}): ${errText}`,
          });
        } catch {
          // ignore
        }
      } else if (chatRes && chatRes.ok) {
        try {
          await supabaseAdmin.from("logs").insert({
            kick_account_id: accountId,
            level: "info",
            category: "COMMAND",
            message: `Bot chate yazdı: "${content.trim()}"`,
          });
        } catch {
          // ignore
        }
      }
    };

    // -------------------------------------------------------------------------
    // EVENT: chat.message.sent
    // -------------------------------------------------------------------------
    if (eventType === "chat.message.sent" || eventType === "chat") {
      const sender = eventData.sender || {};
      const username = sender.username || sender.slug || "İzleyici";
      const senderId = sender.id || 0;
      const messageContent = (eventData.content || "").trim();
      const prefix = botSettings?.prefix || "!";

      // Kullanıcı İstatistiklerini Güncelle (XP & Mesaj Sayısı)
      let { data: userStat } = await supabaseAdmin
        .from("user_stats")
        .select("*")
        .eq("kick_account_id", accountId)
        .eq("kick_username", username)
        .maybeSingle();

      const now = new Date();

      if (!userStat) {
        const { data: newStat } = await supabaseAdmin
          .from("user_stats")
          .insert({
            kick_account_id: accountId,
            kick_user_id: senderId,
            kick_username: username,
            display_name: sender.identity?.display_name || username,
            xp: 5,
            level: 1,
            message_count: 1,
            estimated_watch_time_minutes: 1,
            first_seen_at: now.toISOString(),
            last_seen_at: now.toISOString(),
          })
          .select()
          .single();
        userStat = newStat;
      } else {
        // Cooldown kontrolüyle XP ekleme
        const lastSeen = new Date(userStat.last_seen_at).getTime();
        const diffSeconds = (now.getTime() - lastSeen) / 1000;

        let xpToAdd = 0;
        const cooldown = xpSettings?.xp_message_cooldown_seconds || 30;
        if (xpSettings?.enabled && diffSeconds >= cooldown) {
          xpToAdd = xpSettings.xp_per_message || 5;
        }

        const newXp = Number(userStat.xp) + xpToAdd;
        const { level } = calculateLevel(newXp, xpSettings?.curve_type);

        await supabaseAdmin
          .from("user_stats")
          .update({
            xp: newXp,
            level: level,
            message_count: userStat.message_count + 1,
            estimated_watch_time_minutes: userStat.estimated_watch_time_minutes + (diffSeconds > 120 ? 1 : 0),
            last_seen_at: now.toISOString(),
          })
          .eq("id", userStat.id);
      }

      // KOMUT İŞLEME MANTIĞI
      if (messageContent.startsWith(prefix)) {
        const parts = messageContent.slice(prefix.length).trim().split(" ");
        const commandName = parts[0]?.toLowerCase();

        // 1. Database'den komut ve alias'ları ara
        const { data: commands } = await supabaseAdmin
          .from("commands")
          .select("*, command_aliases(alias)")
          .eq("kick_account_id", accountId)
          .eq("is_enabled", true);

        const matchedCommand = (commands || []).find((cmd: any) => {
          if (cmd.name.toLowerCase() === commandName || cmd.name.toLowerCase() === `${prefix}${commandName}`) {
            return true;
          }
          return (cmd.command_aliases || []).some((a: any) => a.alias.toLowerCase() === commandName || a.alias.toLowerCase() === `${prefix}${commandName}`);
        });

        if (matchedCommand) {
          // Değişkenleri hazırla
          const currentXp = Number(userStat?.xp || 0);
          const { level, nextLevelXp } = calculateLevel(currentXp, xpSettings?.curve_type);

          // Sıralama
          const { count: higherCount } = await supabaseAdmin
            .from("user_stats")
            .select("id", { count: "exact", head: true })
            .eq("kick_account_id", accountId)
            .gt("xp", currentXp);

          const rank = (higherCount || 0) + 1;

          // En popüler ilk 5 (top_users değişkeni için)
          let topUsersStr = "";
          if (matchedCommand.response.includes("{top_users}")) {
            const { data: topList } = await supabaseAdmin
              .from("user_stats")
              .select("kick_username, xp, level")
              .eq("kick_account_id", accountId)
              .order("xp", { ascending: false })
              .limit(5);

            topUsersStr = (topList || [])
              .map((u: any, i: number) => `${i + 1}. @${u.kick_username} (Lv.${u.level})`)
              .join(" | ");
          }

          const vars = {
            username: `@${username}`,
            display_name: userStat?.display_name || username,
            channel: account.kick_username,
            minecraft_ip: botSettings?.minecraft_ip || "play.ornek.com",
            minecraft_port: botSettings?.minecraft_port || 25565,
            minecraft_version: botSettings?.minecraft_version || "1.21.x",
            discord: botSettings?.discord_url || "Discord yakında!",
            youtube: botSettings?.youtube_url || "",
            instagram: botSettings?.instagram_url || "",
            tiktok: botSettings?.tiktok_url || "",
            kick: `https://kick.com/${account.kick_username}`,
            website: botSettings?.website_url || "https://turkconvert.online",
            level: level,
            xp: currentXp.toLocaleString("tr-TR"),
            next_level_xp: nextLevelXp.toLocaleString("tr-TR"),
            rank: rank,
            messages: (userStat?.message_count || 1).toLocaleString("tr-TR"),
            uptime: "Yayında • Aktif",
            top_users: topUsersStr,
          };

          const replyMessage = resolveVariables(matchedCommand.response, vars);

          // Yanıtı Kick Chat'e Gönder
          await sendChatMessage(replyMessage);

          // Komut kullanım sayacını artır
          await supabaseAdmin
            .from("commands")
            .update({ usage_count: matchedCommand.usage_count + 1 })
            .eq("id", matchedCommand.id);

          // Log kaydı oluştur
          await supabaseAdmin.from("logs").insert({
            kick_account_id: accountId,
            level: "info",
            category: "COMMAND",
            message: `@${username} '${matchedCommand.name}' komutunu kullandı.`,
          });
        }
      }
    }

    // -------------------------------------------------------------------------
    // EVENT: channel.followed
    // -------------------------------------------------------------------------
    if (eventType === "channel.followed") {
      const followerUsername = eventData.follower?.username || "Yeni Takipçi";

      const { data: eventSetting } = await supabaseAdmin
        .from("event_settings")
        .select("*")
        .eq("kick_account_id", accountId)
        .eq("event_type", "follow")
        .maybeSingle();

      if (eventSetting?.is_enabled) {
        const welcomeMsg = resolveVariables(eventSetting.template, {
          username: `@${followerUsername}`,
          channel: account.kick_username,
        });

        await sendChatMessage(welcomeMsg);

        // Follow XP ekle
        if (xpSettings?.enabled && xpSettings.xp_per_follow > 0) {
          const { data: userStat } = await supabaseAdmin
            .from("user_stats")
            .select("id, xp")
            .eq("kick_account_id", accountId)
            .eq("kick_username", followerUsername)
            .maybeSingle();

          if (userStat) {
            await supabaseAdmin
              .from("user_stats")
              .update({ xp: Number(userStat.xp) + xpSettings.xp_per_follow })
              .eq("id", userStat.id);
          }
        }

        await supabaseAdmin.from("logs").insert({
          kick_account_id: accountId,
          level: "info",
          category: "FOLLOW",
          message: `@${followerUsername} kanalı takip etti.`,
        });
      }
    }

    // -------------------------------------------------------------------------
    // EVENT: Subscription Events (new, renewal, gifts)
    // -------------------------------------------------------------------------
    if (eventType.includes("subscription")) {
      const subUsername = eventData.subscriber?.username || eventData.username || "Abone";
      const targetUser = eventData.target_user?.username || "";
      const months = eventData.duration || eventData.months || 1;

      const subType = eventType.includes("gift") ? "gift_sub" : eventType.includes("renewal") ? "resub" : "sub";

      const { data: eventSetting } = await supabaseAdmin
        .from("event_settings")
        .select("*")
        .eq("kick_account_id", accountId)
        .eq("event_type", subType)
        .maybeSingle();

      if (eventSetting?.is_enabled) {
        const subMsg = resolveVariables(eventSetting.template, {
          username: `@${subUsername}`,
          target_username: targetUser ? `@${targetUser}` : "",
          months: months,
          channel: account.kick_username,
        });

        await sendChatMessage(subMsg);

        await supabaseAdmin.from("logs").insert({
          kick_account_id: accountId,
          level: "info",
          category: "SUB",
          message: `@${subUsername} kanala abone oldu (${subType}).`,
        });
      }
    }

    return new Response(JSON.stringify({ status: "success" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
