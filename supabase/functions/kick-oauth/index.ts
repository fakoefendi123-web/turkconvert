// ==========================================================
// Supabase Edge Function: kick-oauth
// Manages Kick OAuth 2.1 PKCE Authorization & Token Exchange
// ==========================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

// PKCE Helper Functions
function base64UrlEncode(buffer: Uint8Array): string {
  let str = "";
  for (let i = 0; i < buffer.byteLength; i++) {
    str += String.fromCharCode(buffer[i]);
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(new Uint8Array(hash));
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const pathname = url.pathname.split("/").pop(); // 'authorize', 'callback', 'refresh'

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const kickClientId = Deno.env.get("KICK_CLIENT_ID") || "";
  const kickClientSecret = Deno.env.get("KICK_CLIENT_SECRET") || "";
  const kickRedirectUri = Deno.env.get("KICK_REDIRECT_URI") || "https://turkconvert.online/kick/callback";

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // -------------------------------------------------------------------------
    // 1. /authorize: Generates PKCE Verifier & Kick OAuth URL
    // -------------------------------------------------------------------------
    if (pathname === "authorize" || req.method === "POST" && url.searchParams.get("action") === "authorize") {
      let userId: string | null = null;

      // Extract User ID from Authorization Bearer JWT
      const authHeader = req.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
        if (!userError && user) {
          userId = user.id;
        }
      }

      if (!userId) {
        const body = await req.json().catch(() => ({}));
        userId = body.user_id;
      }

      if (!userId || userId === "demo-user") {
        userId = crypto.randomUUID();
      }

      // Generate PKCE code verifier and challenge
      const randomBytes = new Uint8Array(32);
      crypto.getRandomValues(randomBytes);
      const codeVerifier = base64UrlEncode(randomBytes);
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      // Create state containing userId and a random nonce
      const stateNonce = crypto.randomUUID();
      const state = btoa(JSON.stringify({ u: userId, n: stateNonce, v: codeVerifier }));

      // Kick OAuth 2.1 Authorize URL
      const scopes = ["user:read", "channel:read", "chat:write", "events:subscribe"].join(" ");
      const authUrl = `https://id.kick.com/oauth/authorize?client_id=${encodeURIComponent(
        kickClientId
      )}&redirect_uri=${encodeURIComponent(kickRedirectUri)}&response_type=code&scope=${encodeURIComponent(
        scopes
      )}&code_challenge=${encodeURIComponent(codeChallenge)}&code_challenge_method=S256&state=${encodeURIComponent(
        state
      )}`;

      return new Response(JSON.stringify({ url: authUrl }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // -------------------------------------------------------------------------
    // 2. /callback: Exchanges Auth Code for Access & Refresh Tokens
    // -------------------------------------------------------------------------
    if (pathname === "callback" || req.method === "POST" && url.searchParams.get("action") === "callback") {
      const body = await req.json().catch(() => ({}));
      const code = body.code || url.searchParams.get("code");
      const stateRaw = body.state || url.searchParams.get("state");

      if (!code || !stateRaw) {
        return new Response(JSON.stringify({ error: "Code ve State parametreleri eksik." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      let stateData: { u: string; n: string; v: string };
      try {
        stateData = JSON.parse(atob(stateRaw));
      } catch {
        return new Response(JSON.stringify({ error: "Geçersiz State verisi." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const userId = stateData.u;
      const codeVerifier = stateData.v;

      // Exchange code for tokens at Kick ID
      const tokenResponse = await fetch("https://id.kick.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: kickClientId,
          client_secret: kickClientSecret,
          redirect_uri: kickRedirectUri,
          code: code,
          code_verifier: codeVerifier,
        }),
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        return new Response(JSON.stringify({ error: `Kick token değişimi başarısız: ${errorText}` }), {
          status: tokenResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
      const refreshToken = tokenData.refresh_token;
      const expiresIn = tokenData.expires_in || 3600;
      const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

      // Retrieve User Profile from Kick Public API
      const userRes = await fetch("https://api.kick.com/public/v1/users", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      let kickUserId = 0;
      let kickUsername = "broadcaster";
      let profilePic = null;

      if (userRes.ok) {
        const userData = await userRes.json();
        const firstUser = Array.isArray(userData.data) ? userData.data[0] : userData.data;
        if (firstUser) {
          kickUserId = firstUser.user_id || firstUser.id;
          kickUsername = firstUser.name || firstUser.username;
          profilePic = firstUser.profile_picture || null;
        }
      }

      // UUID validation for user_id (only link if user actually exists in Supabase Auth, otherwise null)
      const isValidUuid = (str?: string | null) =>
        Boolean(str && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str));

      let finalUserId: string | null = null;
      if (userId && isValidUuid(userId)) {
        const { data: authCheck } = await supabaseAdmin.auth.admin.getUserById(userId).catch(() => ({ data: null }));
        if (authCheck?.user) {
          finalUserId = userId;
        }
      }

      // Upsert into kick_accounts
      const { data: account, error: accountError } = await supabaseAdmin
        .from("kick_accounts")
        .upsert(
          {
            user_id: finalUserId,
            kick_user_id: kickUserId,
            kick_username: kickUsername,
            kick_channel_slug: kickUsername.toLowerCase(),
            profile_pic_url: profilePic,
            is_connected: true,
            connected_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "kick_channel_slug" }
        )
        .select()
        .single();

      if (accountError) {
        return new Response(JSON.stringify({ error: `Hesap kaydedilemedi: ${accountError.message}` }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Save tokens into oauth_tokens
      const { error: tokenSaveError } = await supabaseAdmin.from("oauth_tokens").upsert(
        {
          kick_account_id: account.id,
          access_token: accessToken,
          refresh_token: refreshToken,
          token_type: "Bearer",
          expires_at: expiresAt,
          scopes: ["user:read", "channel:read", "chat:write", "events:subscribe"],
          updated_at: new Date().toISOString(),
        },
        { onConflict: "kick_account_id" }
      );

      if (tokenSaveError) {
        console.error("Token kaydetme uyarısı:", tokenSaveError);
      }

      // Write Log
      await supabaseAdmin.from("logs").insert({
        kick_account_id: account.id,
        level: "info",
        category: "AUTH",
        message: `@${kickUsername} hesabı başarıyla bağlandı ve yetkilendirildi.`,
      });

      return new Response(JSON.stringify({ success: true, account, username: kickUsername }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // -------------------------------------------------------------------------
    // 3. /refresh: Refresh Expired Access Token
    // -------------------------------------------------------------------------
    if (pathname === "refresh" || req.method === "POST" && url.searchParams.get("action") === "refresh") {
      const body = await req.json().catch(() => ({}));
      const kickAccountId = body.kick_account_id;

      if (!kickAccountId) {
        return new Response(JSON.stringify({ error: "kick_account_id gereklidir." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: tokenRecord, error: fetchError } = await supabaseAdmin
        .from("oauth_tokens")
        .select("refresh_token")
        .eq("kick_account_id", kickAccountId)
        .single();

      if (fetchError || !tokenRecord?.refresh_token) {
        return new Response(JSON.stringify({ error: "Refresh token bulunamadı." }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const refreshRes = await fetch("https://id.kick.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: kickClientId,
          client_secret: kickClientSecret,
          refresh_token: tokenRecord.refresh_token,
        }),
      });

      if (!refreshRes.ok) {
        // Token yenilenemedi, hesabı bağlantısı kesilmiş yap
        await supabaseAdmin
          .from("kick_accounts")
          .update({ is_connected: false })
          .eq("id", kickAccountId);

        await supabaseAdmin.from("logs").insert({
          kick_account_id: kickAccountId,
          level: "error",
          category: "AUTH",
          message: "Token yenileme başarısız oldu. Kullanıcının yeniden giriş yapması gerekiyor.",
        });

        return new Response(JSON.stringify({ error: "Token yenileme başarısız, yeniden giriş gerekli." }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const refreshed = await refreshRes.json();
      const expiresAt = new Date(Date.now() + (refreshed.expires_in || 3600) * 1000).toISOString();

      await supabaseAdmin.from("oauth_tokens").update({
        access_token: refreshed.access_token,
        refresh_token: refreshed.refresh_token || tokenRecord.refresh_token,
        expires_at: expiresAt,
        updated_at: new Date().toISOString(),
      }).eq("kick_account_id", kickAccountId);

      return new Response(JSON.stringify({ success: true, expires_at: expiresAt }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Kick OAuth Edge Function Hazır." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
