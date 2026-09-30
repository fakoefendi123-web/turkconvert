"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Radio,
  Tv,
  Terminal,
  Bell,
  Sparkles,
  Trophy,
  Users,
  Clock,
  MessageSquare,
  Gamepad2,
  Share2,
  FileText,
  Settings,
  ExternalLink,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Check,
  X,
  Plus,
  Trash2,
  Edit2,
  Play,
  RotateCw,
  LogOut,
  LogIn,
  AlertTriangle,
  Info,
  Search,
  Copy,
  ChevronRight,
  Flame,
  Key,
} from "lucide-react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  Command,
  BotSettings,
  EventSetting,
  UserStats,
  XpSettings,
  AutoMessage,
  BotLog,
  KickAccount,
  PermissionLevel,
} from "@/lib/supabase/types";

// ==========================================
// VARSAYILAN MOCK / BAŞLANGIÇ VERİLERİ
// ==========================================
const DEFAULT_COMMANDS: Command[] = [
  {
    id: "cmd-1",
    kick_account_id: "demo",
    name: "!ip",
    response: "🎮 Minecraft Sunucumuz: {minecraft_ip} | Sürüm: {minecraft_version}",
    cooldown_seconds: 10,
    permission: "everyone",
    is_enabled: true,
    usage_count: 142,
    aliases: ["!server", "!sunucu"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cmd-2",
    kick_account_id: "demo",
    name: "!discord",
    response: "💬 Discord topluluğumuza katılın: {discord}",
    cooldown_seconds: 10,
    permission: "everyone",
    is_enabled: true,
    usage_count: 89,
    aliases: ["!dc"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cmd-3",
    kick_account_id: "demo",
    name: "!uptime",
    response: "⏱️ Yayın Süresi: {uptime}",
    cooldown_seconds: 15,
    permission: "everyone",
    is_enabled: true,
    usage_count: 64,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cmd-4",
    kick_account_id: "demo",
    name: "!level",
    response: "⭐ {username} • Seviye: {level} • XP: {xp}/{next_level_xp} • Sıralama: #{rank}",
    cooldown_seconds: 10,
    permission: "everyone",
    is_enabled: true,
    usage_count: 312,
    aliases: ["!seviye", "!rank"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cmd-5",
    kick_account_id: "demo",
    name: "!top",
    response: "🏆 En Aktif Sohbetçiler (İlk 5): {top_users}",
    cooldown_seconds: 20,
    permission: "everyone",
    is_enabled: true,
    usage_count: 105,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const DEFAULT_SETTINGS: BotSettings = {
  id: "settings-demo",
  kick_account_id: "demo",
  bot_name: "TurkConvertBot",
  prefix: "!",
  is_online: true,
  timezone: "Europe/Istanbul",
  default_cooldown_seconds: 5,
  minecraft_ip: "play.ornekcraft.com",
  minecraft_port: 25565,
  minecraft_version: "1.21.x",
  minecraft_enabled: true,
  discord_url: "https://discord.gg/turkconvert",
  youtube_url: "https://youtube.com/@ornek",
  instagram_url: "https://instagram.com/ornek",
  tiktok_url: "https://tiktok.com/@ornek",
  twitter_url: "https://x.com/ornek",
  kick_url: "https://kick.com/broadcaster",
  website_url: "https://turkconvert.online",
  updated_at: new Date().toISOString(),
};

const DEFAULT_EVENTS: EventSetting[] = [
  {
    id: "evt-1",
    kick_account_id: "demo",
    event_type: "follow",
    is_enabled: true,
    template: "🎉 {username} kanalı takip etti! Ailemize hoş geldin! ❤️",
    cooldown_seconds: 5,
    updated_at: new Date().toISOString(),
  },
  {
    id: "evt-2",
    kick_account_id: "demo",
    event_type: "sub",
    is_enabled: true,
    template: "💚 {username} kanala abone oldu! Desteğin için sonsuz teşekkürler!",
    cooldown_seconds: 5,
    updated_at: new Date().toISOString(),
  },
  {
    id: "evt-3",
    kick_account_id: "demo",
    event_type: "resub",
    is_enabled: true,
    template: "🔄 {username} aboneliğini {months}. ayında yeniledi! Harikasın!",
    cooldown_seconds: 5,
    updated_at: new Date().toISOString(),
  },
  {
    id: "evt-4",
    kick_account_id: "demo",
    event_type: "gift_sub",
    is_enabled: true,
    template: "🎁 {username}, {target_username} kullanıcısına abonelik hediye etti! Kralsın!",
    cooldown_seconds: 5,
    updated_at: new Date().toISOString(),
  },
  {
    id: "evt-5",
    kick_account_id: "demo",
    event_type: "kick_gift",
    is_enabled: true,
    template: "💎 {username} kanala {amount} KICK hediye etti! Çok teşekkürler!",
    cooldown_seconds: 5,
    updated_at: new Date().toISOString(),
  },
  {
    id: "evt-6",
    kick_account_id: "demo",
    event_type: "stream_start",
    is_enabled: true,
    template: "🟢 Yayın Başladı! Kategori: {category} • Herkes hoş geldi!",
    cooldown_seconds: 10,
    updated_at: new Date().toISOString(),
  },
  {
    id: "evt-7",
    kick_account_id: "demo",
    event_type: "stream_end",
    is_enabled: true,
    template: "🔴 Yayın Sona Erdi. Katılan herkese teşekkürler, iyi geceler!",
    cooldown_seconds: 10,
    updated_at: new Date().toISOString(),
  },
];

const DEFAULT_USERS: UserStats[] = [
  {
    id: "u-1",
    kick_account_id: "demo",
    kick_user_id: 1001,
    kick_username: "AhmetOyunda",
    display_name: "Ahmet",
    xp: 4850,
    level: 16,
    message_count: 820,
    estimated_watch_time_minutes: 340,
    first_seen_at: "2026-09-10T12:00:00Z",
    last_seen_at: new Date().toISOString(),
  },
  {
    id: "u-2",
    kick_account_id: "demo",
    kick_user_id: 1002,
    kick_username: "Zeynep_Stream",
    display_name: "Zeynep",
    xp: 3200,
    level: 12,
    message_count: 540,
    estimated_watch_time_minutes: 260,
    first_seen_at: "2026-09-12T15:30:00Z",
    last_seen_at: new Date().toISOString(),
  },
  {
    id: "u-3",
    kick_account_id: "demo",
    kick_user_id: 1003,
    kick_username: "MehmetPro",
    display_name: "Mehmet",
    xp: 2150,
    level: 9,
    message_count: 310,
    estimated_watch_time_minutes: 190,
    first_seen_at: "2026-09-15T18:00:00Z",
    last_seen_at: new Date().toISOString(),
  },
  {
    id: "u-4",
    kick_account_id: "demo",
    kick_user_id: 1004,
    kick_username: "CananVip",
    display_name: "Canan",
    xp: 1450,
    level: 6,
    message_count: 220,
    estimated_watch_time_minutes: 110,
    first_seen_at: "2026-09-18T20:00:00Z",
    last_seen_at: new Date().toISOString(),
  },
];

const DEFAULT_LOGS: BotLog[] = [
  {
    id: "log-1",
    kick_account_id: "demo",
    level: "info",
    category: "SYSTEM",
    message: "TurkConvert Kick Bot Çekirdeği Başlatıldı. 🟢 Online",
    created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: "log-2",
    kick_account_id: "demo",
    level: "info",
    category: "COMMAND",
    message: "@AhmetOyunda '!ip' komutunu kullandı.",
    created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
  },
  {
    id: "log-3",
    kick_account_id: "demo",
    level: "info",
    category: "FOLLOW",
    message: "@YeniIzleyici kanalı takip etti. Hoş geldin mesajı gönderildi.",
    created_at: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
  },
  {
    id: "log-4",
    kick_account_id: "demo",
    level: "info",
    category: "SUB",
    message: "@Zeynep_Stream kanala abone oldu (1. Ay).",
    created_at: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
  },
];

type ActiveTab =
  | "dashboard"
  | "commands"
  | "events"
  | "minecraft"
  | "social"
  | "xp"
  | "leaderboard"
  | "users"
  | "automessages"
  | "watchtime"
  | "logs"
  | "settings";

export default function KickDashboardClient() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");

  // Auth & Session States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Kick Account State
  const [connectedAccount, setConnectedAccount] = useState<KickAccount | null>({
    id: "demo-acc",
    user_id: "demo-user",
    kick_user_id: 145320,
    kick_username: "OrnekYayin",
    kick_channel_slug: "ornekyayin",
    profile_pic_url: null,
    is_connected: true,
    connected_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  // Data States
  const [commands, setCommands] = useState<Command[]>(DEFAULT_COMMANDS);
  const [settings, setSettings] = useState<BotSettings>(DEFAULT_SETTINGS);
  const [events, setEvents] = useState<EventSetting[]>(DEFAULT_EVENTS);
  const [users, setUsers] = useState<UserStats[]>(DEFAULT_USERS);
  const [logs, setLogs] = useState<BotLog[]>(DEFAULT_LOGS);
  const [autoMessages, setAutoMessages] = useState<AutoMessage[]>([
    {
      id: "auto-1",
      kick_account_id: "demo",
      name: "Discord Hatırlatıcı",
      message: "💬 Discord sunucumuza katılmayı unutmayın: {discord}",
      interval_minutes: 15,
      min_chat_messages: 10,
      is_enabled: true,
      last_sent_at: null,
      created_at: new Date().toISOString(),
    },
    {
      id: "auto-2",
      kick_account_id: "demo",
      name: "Minecraft IP",
      message: "🎮 Minecraft sunucumuz açıldı! IP: {minecraft_ip}",
      interval_minutes: 20,
      min_chat_messages: 15,
      is_enabled: true,
      last_sent_at: null,
      created_at: new Date().toISOString(),
    },
  ]);

  // Modal & Form States
  const [isCommandModalOpen, setIsCommandModalOpen] = useState(false);
  const [editingCommand, setEditingCommand] = useState<Command | null>(null);
  const [newCmdName, setNewCmdName] = useState("");
  const [newCmdResponse, setNewCmdResponse] = useState("");
  const [newCmdCooldown, setNewCmdCooldown] = useState(10);
  const [newCmdPermission, setNewCmdPermission] = useState<PermissionLevel>("everyone");
  const [newCmdAliases, setNewCmdAliases] = useState("");

  // Test Simulator Modal
  const [testModalTitle, setTestModalTitle] = useState("");
  const [testOutput, setTestOutput] = useState("");
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  // Search & Filter
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [logFilterCategory, setLogFilterCategory] = useState("ALL");
  const [leaderboardSortBy, setLeaderboardSortBy] = useState<"xp" | "level" | "messages">("xp");

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Check Supabase Auth on Mount
  useEffect(() => {
    try {
      const client = getSupabase();
      client.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsAuthenticated(true);
        }
      });
    } catch {
      // Local demo mode
    }
  }, []);

  // Handle Login / Sign Up
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      if (!isSupabaseConfigured()) {
        // Mock login if credentials not yet loaded into env
        setIsAuthenticated(true);
        showToast("Demo modunda giriş yapıldı.");
        setAuthLoading(false);
        return;
      }

      const client = getSupabase();
      if (authMode === "signup") {
        const { error } = await client.auth.signUp({
          email: authEmail,
          password: authPassword,
        });
        if (error) throw error;
        showToast("Kayıt başarılı! Giriş yapıldı.");
        setIsAuthenticated(true);
      } else {
        const { error } = await client.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });
        if (error) throw error;
        showToast("Başarıyla giriş yapıldı.");
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      setAuthError(err.message || "Giriş işlemi başarısız.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Kick OAuth 2.1 Connection Handlers
  const handleConnectKick = async () => {
    try {
      showToast("Kick yetkilendirme sayfası hazırlanıyor...");
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://onlzdwfpbdplpuxiipeb.supabase.co";

      let sessionToken = "";
      let currentUserId = "demo-user";
      if (isSupabaseConfigured()) {
        try {
          const client = getSupabase();
          const { data } = await client.auth.getSession();
          if (data.session) {
            sessionToken = data.session.access_token;
            currentUserId = data.session.user.id;
          }
        } catch {
          // ignore
        }
      }

      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (sessionToken) {
        headers["Authorization"] = `Bearer ${sessionToken}`;
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/kick-oauth?action=authorize`, {
        method: "POST",
        headers,
        body: JSON.stringify({ user_id: currentUserId }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Kick yetkilendirme linki alınamadı.");
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Kick bağlantısı başlatılamadı.");
    }
  };

  const handleDisconnectKick = () => {
    setConnectedAccount(null);
    showToast("Kick hesabı bağlantısı kesildi.");
  };

  // Variable Resolver Helper for Testing
  const resolveSampleVariables = (template: string) => {
    const vars: Record<string, string> = {
      username: "@TestUser",
      display_name: "TestUser",
      channel: connectedAccount?.kick_username || "OrnekYayin",
      minecraft_ip: settings.minecraft_ip,
      minecraft_port: String(settings.minecraft_port),
      minecraft_version: settings.minecraft_version,
      discord: settings.discord_url || "discord.gg/ornek",
      youtube: settings.youtube_url || "youtube.com/@ornek",
      instagram: settings.instagram_url || "instagram.com/ornek",
      tiktok: settings.tiktok_url || "tiktok.com/@ornek",
      kick: `kick.com/${connectedAccount?.kick_username || "broadcaster"}`,
      website: settings.website_url,
      level: "14",
      xp: "2,450",
      next_level_xp: "3,000",
      rank: "3",
      messages: "542",
      uptime: "2 saat 14 dakika",
      followers: "1,240",
      subscribers: "84",
      amount: "100",
      months: "3",
      target_username: "@DostKullanici",
      category: "Just Chatting",
      top_users: "1. @AhmetOyunda (Lv.16) | 2. @Zeynep_Stream (Lv.12) | 3. @MehmetPro (Lv.9)",
    };

    let result = template;
    for (const [key, val] of Object.entries(vars)) {
      result = result.replace(new RegExp(`\\{${key}\\}`, "gi"), val);
    }
    return result;
  };

  // Test Function for Commands & Events
  const runTestSimulation = (title: string, rawTemplate: string) => {
    const resolved = resolveSampleVariables(rawTemplate);
    setTestModalTitle(title);
    setTestOutput(resolved);
    setIsTestModalOpen(true);
  };

  // Command CRUD Handlers
  const handleOpenAddCommand = () => {
    setEditingCommand(null);
    setNewCmdName("!");
    setNewCmdResponse("");
    setNewCmdCooldown(10);
    setNewCmdPermission("everyone");
    setNewCmdAliases("");
    setIsCommandModalOpen(true);
  };

  const handleOpenEditCommand = (cmd: Command) => {
    setEditingCommand(cmd);
    setNewCmdName(cmd.name);
    setNewCmdResponse(cmd.response);
    setNewCmdCooldown(cmd.cooldown_seconds);
    setNewCmdPermission(cmd.permission);
    setNewCmdAliases((cmd.aliases || []).join(", "));
    setIsCommandModalOpen(true);
  };

  const handleSaveCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCmdName.trim() || !newCmdResponse.trim()) return;

    const formattedName = newCmdName.startsWith(settings.prefix) ? newCmdName : `${settings.prefix}${newCmdName}`;
    const aliasList = newCmdAliases
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean)
      .map((a) => (a.startsWith(settings.prefix) ? a : `${settings.prefix}${a}`));

    if (editingCommand) {
      setCommands((prev) =>
        prev.map((c) =>
          c.id === editingCommand.id
            ? {
                ...c,
                name: formattedName,
                response: newCmdResponse.trim(),
                cooldown_seconds: newCmdCooldown,
                permission: newCmdPermission,
                aliases: aliasList,
                updated_at: new Date().toISOString(),
              }
            : c
        )
      );
      showToast(`'${formattedName}' komutu güncellendi.`);
    } else {
      const newCmd: Command = {
        id: "cmd-" + Date.now(),
        kick_account_id: connectedAccount?.id || "demo",
        name: formattedName,
        response: newCmdResponse.trim(),
        cooldown_seconds: newCmdCooldown,
        permission: newCmdPermission,
        is_enabled: true,
        usage_count: 0,
        aliases: aliasList,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setCommands((prev) => [...prev, newCmd]);
      showToast(`Yeni '${formattedName}' komutu eklendi.`);
    }

    setIsCommandModalOpen(false);
  };

  const handleDeleteCommand = (id: string) => {
    setCommands((prev) => prev.filter((c) => c.id !== id));
    showToast("Komut silindi.");
  };

  const handleToggleCommand = (id: string) => {
    setCommands((prev) =>
      prev.map((c) => (c.id === id ? { ...c, is_enabled: !c.is_enabled } : c))
    );
  };

  // Event Update Handlers
  const handleUpdateEvent = (eventType: string, updates: Partial<EventSetting>) => {
    setEvents((prev) =>
      prev.map((e) => (e.event_type === eventType ? { ...e, ...updates } : e))
    );
    showToast("Event ayarı kaydedildi.");
  };

  // User XP Editing
  const handleAdjustUserXp = (username: string, delta: number) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.kick_username === username) {
          const newXp = Math.max(0, u.xp + delta);
          const newLevel = Math.floor(newXp / 250) + 1;
          return { ...u, xp: newXp, level: newLevel };
        }
        return u;
      })
    );
    showToast(`${username} kullanıcısının XP'si güncellendi.`);
  };

  // Filtered Users & Leaderboard
  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.kick_username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
        (u.display_name && u.display_name.toLowerCase().includes(userSearchQuery.toLowerCase()))
    );
  }, [users, userSearchQuery]);

  const sortedLeaderboard = useMemo(() => {
    const list = [...users];
    if (leaderboardSortBy === "xp") list.sort((a, b) => b.xp - a.xp);
    if (leaderboardSortBy === "level") list.sort((a, b) => b.level - a.level);
    if (leaderboardSortBy === "messages") list.sort((a, b) => b.message_count - a.message_count);
    return list;
  }, [users, leaderboardSortBy]);

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    if (logFilterCategory === "ALL") return logs;
    return logs.filter((l) => l.category === logFilterCategory);
  }, [logs, logFilterCategory]);

  return (
    <div className="min-h-screen bg-gray-50/60 pb-16 dark:bg-gray-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-primary-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-xl dark:border-primary-800 dark:bg-gray-900 dark:text-white animate-bounce">
          <Check className="h-4 w-4 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ==========================================================
          A. EĞER GİRİŞ YAPILMAMIŞSA (AUTH EKRANI)
         ========================================================== */}
      {!isAuthenticated ? (
        <div className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-4 py-12">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <Radio className="h-6 w-6 animate-pulse" />
              </div>
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Kick Bot Control Center
              </h1>
              <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                Yayıncı paneline erişmek ve bot ayarlarını yönetmek için giriş yapın
              </p>
            </div>

            {/* Giriş / Kayıt Sekmesi */}
            <div className="mt-6 flex rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-950">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition ${
                  authMode === "login"
                    ? "bg-white text-gray-900 shadow-xs dark:bg-gray-800 dark:text-white"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400"
                }`}
              >
                Giriş Yap
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("signup")}
                className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition ${
                  authMode === "signup"
                    ? "bg-white text-gray-900 shadow-xs dark:bg-gray-800 dark:text-white"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400"
                }`}
              >
                Kayıt Ol
              </button>
            </div>

            {authError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  E-Posta Adresi
                </label>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="yayinci@turkconvert.online"
                  required
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Şifre
                </label>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full rounded-xl bg-primary-600 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-primary-700 disabled:opacity-50"
              >
                {authLoading ? "İşleniyor..." : authMode === "login" ? "Giriş Yap" : "Hesap Oluştur"}
              </button>
            </form>

            <div className="mt-6 border-t border-gray-100 pt-4 text-center dark:border-gray-800">
              <button
                type="button"
                onClick={() => {
                  setIsAuthenticated(true);
                  showToast("Demo paneli açıldı.");
                }}
                className="text-xs font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
              >
                Giriş Yapmadan Demo Panelini İncele →
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ==========================================================
            B. OTURUM AÇILDI: ANA DASHBOARD KONTROL MERKEZİ
           ========================================================== */
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          {/* ÜST BAŞLIK VE KANAL BİLGİ KARTI */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center gap-3.5">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                <Radio className="h-6 w-6" />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white dark:ring-gray-900">
                  <Check className="h-2.5 w-2.5 text-white" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                    Kick Bot Control Center
                  </h1>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    🟢 Online
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>Bağlı Kanal:</span>
                  <a
                    href={`https://kick.com/${connectedAccount?.kick_channel_slug || "broadcaster"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    <span>@{connectedAccount?.kick_username || "OrnekYayin"}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <span>•</span>
                  <span>Prefix: <strong>{settings.prefix}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSettings((prev) => ({ ...prev, is_online: !prev.is_online }));
                  showToast(settings.is_online ? "Bot çevrimdışı yapıldı." : "Bot çevrimiçi yapıldı.");
                }}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                  settings.is_online
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                    : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300"
                }`}
              >
                <span>{settings.is_online ? "🟢 Bot Aktif" : "🔴 Bot Durduruldu"}</span>
              </button>

              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  showToast("Oturum kapatıldı.");
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>

          {/* DASHBOARD ANA MENÜ SEKMELERİ (TABS) */}
          <div className="mb-6 flex gap-1.5 overflow-x-auto rounded-xl border border-gray-200 bg-white p-1.5 shadow-xs dark:border-gray-800 dark:bg-gray-900 scrollbar-none">
            {[
              { id: "dashboard", label: "Genel Bakış", icon: Radio },
              { id: "commands", label: "Komutlar", icon: Terminal },
              { id: "events", label: "Eventler", icon: Bell },
              { id: "minecraft", label: "Minecraft", icon: Gamepad2 },
              { id: "social", label: "Sosyal Linkler", icon: Share2 },
              { id: "xp", label: "XP & Seviye", icon: Sparkles },
              { id: "leaderboard", label: "Sıralama", icon: Trophy },
              { id: "users", label: "Kullanıcılar", icon: Users },
              { id: "automessages", label: "Oto-Mesaj", icon: MessageSquare },
              { id: "watchtime", label: "İzleme Süresi", icon: Clock },
              { id: "logs", label: "Canlı Loglar", icon: FileText },
              { id: "settings", label: "Ayarlar", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ActiveTab)}
                  className={`inline-flex items-center gap-1.5 shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "bg-primary-600 text-white shadow-xs"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ==========================================================
              SEKME 1: GENEL BAKIŞ (DASHBOARD)
             ========================================================== */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Metrik Kartları */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Durum</div>
                  <div className="mt-1 text-xl font-bold text-emerald-600 dark:text-emerald-400">Aktif</div>
                  <div className="mt-1 text-[11px] text-gray-400">Kick Bağlantısı Hazır</div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Aktif Komutlar</div>
                  <div className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                    {commands.filter((c) => c.is_enabled).length}
                  </div>
                  <div className="mt-1 text-[11px] text-gray-400">Toplam {commands.length} Komut</div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Toplam Mesaj</div>
                  <div className="mt-1 text-xl font-bold text-gray-900 dark:text-white">1,890</div>
                  <div className="mt-1 text-[11px] text-emerald-500 font-medium">Bu Hafta +420</div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Kayıtlı İzleyici</div>
                  <div className="mt-1 text-xl font-bold text-gray-900 dark:text-white">{users.length}</div>
                  <div className="mt-1 text-[11px] text-gray-400">Sohbet Edenler</div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Dağıtılan XP</div>
                  <div className="mt-1 text-xl font-bold text-primary-600 dark:text-primary-400">
                    {users.reduce((acc, u) => acc + u.xp, 0).toLocaleString("tr-TR")}
                  </div>
                  <div className="mt-1 text-[11px] text-gray-400">Topluluk Puanı</div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">İzleme Süresi</div>
                  <div className="mt-1 text-xl font-bold text-gray-900 dark:text-white">15.2 Saat</div>
                  <div className="mt-1 text-[11px] text-amber-500">Tahmini (Chat Bazlı)</div>
                </div>
              </div>

              {/* Hızlı Aksiyon & Son Eventler */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Sol: Son Event Bildirimleri */}
                <div className="lg:col-span-7 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                      <Bell className="h-4 w-4 text-primary-600" />
                      <span>Son Kanal Eventleri</span>
                    </h3>
                    <span className="text-[11px] text-gray-400">Canlı Bildirimler</span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 dark:border-emerald-900/30 dark:bg-emerald-950/20">
                      <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-600 dark:text-emerald-400">
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-gray-900 dark:text-white">Yeni Takipçi</span>
                          <span className="text-[10px] text-gray-400">4 dk önce</span>
                        </div>
                        <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
                          <strong>@YeniIzleyici</strong> kanalınızı takip etti. Bot hoş geldin mesajı gönderdi.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-xl border border-purple-100 bg-purple-50/50 p-3 dark:border-purple-900/30 dark:bg-purple-950/20">
                      <div className="rounded-lg bg-purple-500/20 p-2 text-purple-600 dark:text-purple-400">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-gray-900 dark:text-white">Yeni Abonelik</span>
                          <span className="text-[10px] text-gray-400">12 dk önce</span>
                        </div>
                        <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
                          <strong>@Zeynep_Stream</strong> kanala abone oldu. +500 XP hesaba tanımlandı.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-3 dark:border-blue-900/30 dark:bg-blue-950/20">
                      <div className="rounded-lg bg-blue-500/20 p-2 text-blue-600 dark:text-blue-400">
                        <Terminal className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-gray-900 dark:text-white">Komut Kullanımı</span>
                          <span className="text-[10px] text-gray-400">18 dk önce</span>
                        </div>
                        <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">
                          <strong>@AhmetOyunda</strong> <code>!ip</code> komutunu kullandı. Minecraft IP paylaşıldı.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sağ: Hızlı Testler & Güvenlik Özeti */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      <span>Güvenlik & Bot Politikası</span>
                    </h3>
                    <div className="mt-3 space-y-2 text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span><strong>Küfür Filtresi Kapalı:</strong> Bot sohbete müdahale etmez veya ban atmaz.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span><strong>Spam Koruması Aktif:</strong> Komutlarda 10s cooldown.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span><strong>Token Güvenliği:</strong> Secretlar sunucu tarafında şifreli saklanır.</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                      <Play className="h-4 w-4 text-primary-600" />
                      <span>Hızlı Komut Simülatörü</span>
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Gerçek yayına mesaj atmadan botun komut cevabını hemen test edin:
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {commands.slice(0, 4).map((c) => (
                        <button
                          key={c.id}
                          onClick={() => runTestSimulation(`Komut Testi: ${c.name}`, c.response)}
                          className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================
              SEKME 2: KOMUT YÖNETİMİ (COMMANDS)
             ========================================================== */}
          {activeTab === "commands" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Özel Komut Yönetimi
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Botun chatte vereceği yanıtları, aliasları ve cooldown sürelerini buradan özelleştirin
                  </p>
                </div>

                <button
                  onClick={handleOpenAddCommand}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-primary-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Yeni Komut Ekle</span>
                </button>
              </div>

              {/* Komut Tablosu */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-gray-100 bg-gray-50/75 text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
                      <tr>
                        <th className="py-3 px-4 font-semibold">Komut Adı & Aliaslar</th>
                        <th className="py-3 px-4 font-semibold">Bot Yanıt Şablonu</th>
                        <th className="py-3 px-4 font-semibold">Yetki</th>
                        <th className="py-3 px-4 font-semibold">Cooldown</th>
                        <th className="py-3 px-4 font-semibold">Kullanım</th>
                        <th className="py-3 px-4 font-semibold">Durum</th>
                        <th className="py-3 px-4 text-right font-semibold">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {commands.map((cmd) => (
                        <tr key={cmd.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                          <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">
                            <div>{cmd.name}</div>
                            {cmd.aliases && cmd.aliases.length > 0 && (
                              <div className="mt-0.5 text-[10px] font-normal text-gray-400">
                                Alias: {cmd.aliases.join(", ")}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 max-w-xs truncate text-gray-600 dark:text-gray-300">
                            {cmd.response}
                          </td>
                          <td className="py-3 px-4">
                            <span className="rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 uppercase">
                              {cmd.permission}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                            {cmd.cooldown_seconds} sn
                          </td>
                          <td className="py-3 px-4 font-medium text-gray-500">
                            {cmd.usage_count} kez
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleToggleCommand(cmd.id)}
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                cmd.is_enabled
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                                  : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                              }`}
                            >
                              {cmd.is_enabled ? "Açık" : "Kapalı"}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => runTestSimulation(`Test: ${cmd.name}`, cmd.response)}
                                title="Değişkenleri ve cevabı test et"
                                className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                              >
                                <Play className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleOpenEditCommand(cmd)}
                                className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/40"
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteCommand(cmd.id)}
                                className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Kullanılabilir Değişkenler Rehberi */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary-600" />
                  <span>Komutlarda Kullanabileceğiniz Değişkenler</span>
                </h3>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Bot bu etiketleri chatte otomatik olarak gerçek yayın ve kullanıcı verileriyle değiştirir:
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6 text-xs font-mono">
                  {[
                    "{username}",
                    "{display_name}",
                    "{channel}",
                    "{minecraft_ip}",
                    "{discord}",
                    "{youtube}",
                    "{kick}",
                    "{level}",
                    "{xp}",
                    "{next_level_xp}",
                    "{rank}",
                    "{uptime}",
                  ].map((v) => (
                    <button
                      key={v}
                      onClick={() => {
                        navigator.clipboard.writeText(v);
                        showToast(`'${v}' panoya kopyalandı.`);
                      }}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-2 text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    >
                      <span>{v}</span>
                      <Copy className="h-3 w-3 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================
              SEKME 3: EVENT YÖNETİMİ (EVENTS)
             ========================================================== */}
          {activeTab === "events" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Kanal Event Bildirimleri
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Takip, abonelik, hediye ve yayın başlangıç eventlerinde botun atacağı mesajları düzenleyin
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {events.map((evt) => (
                  <div
                    key={evt.id}
                    className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                            {evt.event_type.replace("_", " ")} EVENTİ
                          </span>
                        </div>
                        <button
                          onClick={() => handleUpdateEvent(evt.event_type, { is_enabled: !evt.is_enabled })}
                          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            evt.is_enabled
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                              : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {evt.is_enabled ? "Aktif" : "Pasif"}
                        </button>
                      </div>

                      <div className="mt-3">
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                          Chat Mesaj Şablonu
                        </label>
                        <textarea
                          rows={2}
                          value={evt.template}
                          onChange={(e) => handleUpdateEvent(evt.event_type, { template: e.target.value })}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white focus:outline-none focus:border-primary-500 resize-none"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
                      <span className="text-[11px] text-gray-400">Flood Koruması: {evt.cooldown_seconds}s</span>
                      <button
                        onClick={() => runTestSimulation(`${evt.event_type} Event Simülasyonu`, evt.template)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      >
                        <Play className="h-3 w-3 text-emerald-500" />
                        <span>Eventi Test Et</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==========================================================
              SEKME 4: MINECRAFT AYARLARI
             ========================================================== */}
          {activeTab === "minecraft" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Minecraft Sunucu Ayarları
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Chatte <code>!ip</code> komutu kullanıldığında gösterilecek sunucu adresini buradan ayarlayın
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Minecraft Sunucu IP Adresi
                  </label>
                  <input
                    type="text"
                    value={settings.minecraft_ip}
                    onChange={(e) => setSettings({ ...settings, minecraft_ip: e.target.value })}
                    placeholder="play.ornekcraft.com"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white focus:outline-none focus:border-primary-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Port (Opsiyonel)
                    </label>
                    <input
                      type="number"
                      value={settings.minecraft_port}
                      onChange={(e) => setSettings({ ...settings, minecraft_port: Number(e.target.value) })}
                      placeholder="25565"
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white focus:outline-none focus:border-primary-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Oyun Sürümü
                    </label>
                    <input
                      type="text"
                      value={settings.minecraft_version}
                      onChange={(e) => setSettings({ ...settings, minecraft_version: e.target.value })}
                      placeholder="1.21.x"
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => showToast("Minecraft ayarları kaydedildi.")}
                  className="rounded-xl bg-primary-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-primary-700"
                >
                  Değişiklikleri Kaydet
                </button>
              </div>
            </div>
          )}

          {/* ==========================================================
              SEKME 5: SOSYAL LİNKLER
             ========================================================== */}
          {activeTab === "social" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Sosyal Medya Bağlantıları
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Botun <code>!discord</code>, <code>!social</code> gibi komutlarda paylaşacağı linkler:
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900 space-y-4">
                {[
                  { key: "discord_url", label: "Discord Sunucusu", placeholder: "https://discord.gg/..." },
                  { key: "youtube_url", label: "YouTube Kanalı", placeholder: "https://youtube.com/@..." },
                  { key: "instagram_url", label: "Instagram", placeholder: "https://instagram.com/..." },
                  { key: "tiktok_url", label: "TikTok", placeholder: "https://tiktok.com/@..." },
                  { key: "twitter_url", label: "X (Twitter)", placeholder: "https://x.com/..." },
                  { key: "website_url", label: "Web Sitesi", placeholder: "https://turkconvert.online" },
                ].map((item) => (
                  <div key={item.key}>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      {item.label}
                    </label>
                    <input
                      type="url"
                      value={(settings as any)[item.key] || ""}
                      onChange={(e) => setSettings({ ...settings, [item.key]: e.target.value })}
                      placeholder={item.placeholder}
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white focus:outline-none focus:border-primary-500 font-mono"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => showToast("Sosyal medya linkleri güncellendi.")}
                  className="rounded-xl bg-primary-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-primary-700"
                >
                  Linkleri Kaydet
                </button>
              </div>
            </div>
          )}

          {/* ==========================================================
              SEKME 6: XP & SEVİYE SİSTEMİ
             ========================================================== */}
          {activeTab === "xp" && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Topluluk XP & Level Sistemi
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  İzleyicilerin sohbet aktifliğine göre seviye atlamasını sağlayan kurallar
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 space-y-4">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">XP Kazanım Oranları</h3>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Mesaj Başına XP</label>
                    <input
                      type="number"
                      defaultValue={5}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">XP Cooldown (Spam Önleme)</label>
                    <input
                      type="number"
                      defaultValue={30}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                    />
                    <span className="text-[10px] text-gray-400">Aynı izleyici her 30 saniyede bir XP kazanır.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Takip Etme XP Ödülü</label>
                    <input
                      type="number"
                      defaultValue={100}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Abonelik XP Ödülü</label>
                    <input
                      type="number"
                      defaultValue={500}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 p-2 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                    />
                  </div>

                  <button
                    onClick={() => showToast("XP oranları güncellendi.")}
                    className="w-full rounded-xl bg-primary-600 py-2.5 text-xs font-bold text-white shadow-sm"
                  >
                    Oranları Kaydet
                  </button>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 space-y-4">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">Seviye İlerleme Eğrisi</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 rounded-xl border border-gray-200 p-3 text-xs dark:border-gray-800 cursor-pointer">
                      <input type="radio" name="curve" defaultChecked className="text-primary-600" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">Progressive (Önerilen)</div>
                        <div className="text-[11px] text-gray-400">Her seviye bir öncekinden %35 daha fazla XP ister.</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 rounded-xl border border-gray-200 p-3 text-xs dark:border-gray-800 cursor-pointer">
                      <input type="radio" name="curve" className="text-primary-600" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">Linear (Sabit)</div>
                        <div className="text-[11px] text-gray-400">Her seviye sabit 100 XP gerektirir.</div>
                      </div>
                    </label>
                  </div>

                  <div className="mt-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-950">
                    <div className="text-xs font-semibold text-gray-500 mb-1">!level Çıktı Simülasyonu:</div>
                    <div className="font-mono text-xs text-gray-800 dark:text-gray-200">
                      ⭐ @AhmetOyunda<br />
                      Seviye: 16<br />
                      XP: 4,850 / 5,200<br />
                      İlerleme: [████████████░░] %93<br />
                      Sıralama: #1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================
              SEKME 7: LİDERLİK TABLOSU (LEADERBOARD)
             ========================================================== */}
          {activeTab === "leaderboard" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Kanal Liderlik Sıralaması
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    En aktif izleyicilerinizin ve sohbetçilerinizin sıralaması
                  </p>
                </div>

                <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-gray-900">
                  <button
                    onClick={() => setLeaderboardSortBy("xp")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      leaderboardSortBy === "xp" ? "bg-primary-600 text-white" : "text-gray-500 hover:text-gray-900 dark:text-gray-400"
                    }`}
                  >
                    XP&apos;ye Göre
                  </button>
                  <button
                    onClick={() => setLeaderboardSortBy("level")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      leaderboardSortBy === "level" ? "bg-primary-600 text-white" : "text-gray-500 hover:text-gray-900 dark:text-gray-400"
                    }`}
                  >
                    Seviyeye Göre
                  </button>
                  <button
                    onClick={() => setLeaderboardSortBy("messages")}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      leaderboardSortBy === "messages" ? "bg-primary-600 text-white" : "text-gray-500 hover:text-gray-900 dark:text-gray-400"
                    }`}
                  >
                    Mesaj Sayısına Göre
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-gray-100 bg-gray-50 text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
                    <tr>
                      <th className="py-3 px-4 font-semibold w-16">Sıra</th>
                      <th className="py-3 px-4 font-semibold">Kullanıcı Adı</th>
                      <th className="py-3 px-4 font-semibold">Seviye</th>
                      <th className="py-3 px-4 font-semibold">Toplam XP</th>
                      <th className="py-3 px-4 font-semibold">Mesaj Sayısı</th>
                      <th className="py-3 px-4 font-semibold">İzleme (Tahmini)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {sortedLeaderboard.map((user, idx) => (
                      <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                        <td className="py-3 px-4 font-bold">
                          {idx === 0 ? "🥇 #1" : idx === 1 ? "🥈 #2" : idx === 2 ? "🥉 #3" : `#${idx + 1}`}
                        </td>
                        <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">
                          @{user.kick_username}
                        </td>
                        <td className="py-3 px-4">
                          <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-bold text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                            Lv. {user.level}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-primary-600 dark:text-primary-400">
                          {user.xp.toLocaleString("tr-TR")} XP
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          {user.message_count} mesaj
                        </td>
                        <td className="py-3 px-4 text-gray-500">
                          {Math.floor(user.estimated_watch_time_minutes / 60)} sa {user.estimated_watch_time_minutes % 60} dk
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==========================================================
              SEKME 8: KULLANICI PROFİLLERİ (USERS)
             ========================================================== */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    İzleyici Profilleri
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Kanalınızda sohbet eden tüm kullanıcılar ve XP yönetimi
                  </p>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    placeholder="Kullanıcı ara..."
                    className="rounded-xl border border-gray-200 bg-white pl-8 pr-4 py-2 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {filteredUsers.map((u) => (
                  <div
                    key={u.id}
                    className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-sm text-gray-900 dark:text-white">
                          @{u.kick_username}
                        </div>
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          Lv. {u.level}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex justify-between">
                          <span>Toplam XP:</span>
                          <strong className="text-gray-900 dark:text-white">{u.xp.toLocaleString("tr-TR")}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Mesajlar:</span>
                          <strong className="text-gray-900 dark:text-white">{u.message_count}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Tahmini İzleme:</span>
                          <strong className="text-gray-900 dark:text-white">{u.estimated_watch_time_minutes} dk</strong>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-gray-100 pt-3 dark:border-gray-800 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400">XP Düzenle:</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleAdjustUserXp(u.kick_username, -50)}
                          className="rounded-md border border-gray-200 px-2 py-0.5 text-xs font-bold text-red-600 hover:bg-red-50 dark:border-gray-700"
                        >
                          -50
                        </button>
                        <button
                          onClick={() => handleAdjustUserXp(u.kick_username, 100)}
                          className="rounded-md border border-gray-200 px-2 py-0.5 text-xs font-bold text-emerald-600 hover:bg-emerald-50 dark:border-gray-700"
                        >
                          +100
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==========================================================
              SEKME 9: OTOMATİK MESAJLAR (AUTO MESSAGES)
             ========================================================== */}
          {activeTab === "automessages" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Periyodik Otomatik Mesajlar
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Sohbete belirli dakikalarda ve mesaj barajı aşıldığında atılacak duyurular
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newMsg: AutoMessage = {
                      id: "auto-" + Date.now(),
                      kick_account_id: "demo",
                      name: "Yeni Duyuru",
                      message: "💬 Sosyal medya hesaplarımızı takip etmeyi unutmayın: {kick}",
                      interval_minutes: 15,
                      min_chat_messages: 10,
                      is_enabled: true,
                      last_sent_at: null,
                      created_at: new Date().toISOString(),
                    };
                    setAutoMessages([...autoMessages, newMsg]);
                    showToast("Yeni otomatik mesaj eklendi.");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2 text-xs font-bold text-white shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Duyuru Ekle</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {autoMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-gray-900 dark:text-white">{msg.name}</span>
                        <button
                          onClick={() => {
                            setAutoMessages((prev) =>
                              prev.map((m) => (m.id === msg.id ? { ...m, is_enabled: !m.is_enabled } : m))
                            );
                          }}
                          className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                            msg.is_enabled ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {msg.is_enabled ? "Aktif" : "Kapalı"}
                        </button>
                      </div>

                      <p className="mt-3 text-xs text-gray-600 dark:text-gray-300 bg-gray-50 p-3 rounded-xl dark:bg-gray-950 font-mono">
                        {msg.message}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-[11px] text-gray-400 dark:border-gray-800">
                      <span>Her {msg.interval_minutes} dakikada bir (Min. {msg.min_chat_messages} sohbet mesajı)</span>
                      <button
                        onClick={() => setAutoMessages((prev) => prev.filter((m) => m.id !== msg.id))}
                        className="text-red-500 hover:text-red-600 font-semibold"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==========================================================
              SEKME 10: İZLEME SÜRESİ (WATCH TIME AÇIKLAMASI)
             ========================================================== */}
          {activeTab === "watchtime" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  İzleme Süresi (Watch Time) Analizi
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Kick API teknik kısıtları ve hesaplama yöntemi hakkında şeffaf bilgilendirme
                </p>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-6 text-xs text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/20 dark:text-blue-200 leading-relaxed space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span>Kick API Watch Time Hakkında Teknik Gerçek:</span>
                </div>
                <p>
                  Resmi <strong>Kick Developer API</strong>, üçüncü taraf uygulamalara doğrudan her bir izleyicinin canlı yayını kaç dakika izlediğini belirten bir sayaç veya endpoint sunmamaktadır.
                </p>
                <p>
                  TurkConvert, kullanıcıları yanıltmamak adına sahte veri üretmez. Bunun yerine izleyicinin chatteki mesaj sıklığı ve aktifliği üzerinden hesaplanan **Tahmini İzleme Süresi (Estimated Watch Time)** modelini kullanır.
                </p>
              </div>
            </div>
          )}

          {/* ==========================================================
              SEKME 11: CANLI LOGLAR (LOGS)
             ========================================================== */}
          {activeTab === "logs" && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Canlı Bot ve Webhook Logları
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Sistem aktiviteleri, komut kullanımları ve Kick webhook bildirimleri
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={logFilterCategory}
                    onChange={(e) => setLogFilterCategory(e.target.value)}
                    className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
                  >
                    <option value="ALL">Tüm Kategoriler</option>
                    <option value="COMMAND">Komutlar</option>
                    <option value="FOLLOW">Takipçiler</option>
                    <option value="SUB">Abonelikler</option>
                    <option value="SYSTEM">Sistem</option>
                    <option value="AUTH">Kimlik Doğrulama</option>
                  </select>

                  <button
                    onClick={() => setLogs([])}
                    className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
                  >
                    Logları Temizle
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900">
                <div className="max-h-[500px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 text-xs font-mono">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="flex items-center gap-3 p-3 hover:bg-gray-50/50 dark:hover:bg-gray-800/40">
                      <span className="text-[10px] text-gray-400 shrink-0">
                        {new Date(log.created_at).toLocaleTimeString("tr-TR")}
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[9px] font-bold shrink-0 ${
                          log.category === "COMMAND"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                            : log.category === "FOLLOW"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                            : log.category === "SUB"
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {log.category}
                      </span>
                      <span className="text-gray-800 dark:text-gray-200 flex-1 truncate">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================
              SEKME 12: AYARLAR & KICK HESABI
             ========================================================== */}
          {activeTab === "settings" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Genel Bot ve Kick Hesabı Ayarları
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Bot kimliği, komut ön eki ve Kick OAuth 2.1 entegrasyonu
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Bot Adı
                  </label>
                  <input
                    type="text"
                    value={settings.bot_name}
                    onChange={(e) => setSettings({ ...settings, bot_name: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Komut Ön Eki (Prefix)
                  </label>
                  <input
                    type="text"
                    value={settings.prefix}
                    onChange={(e) => setSettings({ ...settings, prefix: e.target.value })}
                    placeholder="!"
                    maxLength={2}
                    className="w-24 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-mono font-bold text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white text-center"
                  />
                </div>

                <div className="border-t border-gray-100 pt-4 dark:border-gray-800">
                  <div className="text-xs font-bold text-gray-900 dark:text-white mb-2">
                    Kick Hesabı
                  </div>
                  {connectedAccount ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-emerald-500 p-2 text-white shadow-xs">
                          <Check className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-gray-900 dark:text-white">
                            @{connectedAccount.kick_username}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                            <span>Durum: 🟢 Bağlı</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleConnectKick}
                          className="rounded-xl border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:bg-gray-900 dark:text-emerald-300 transition"
                        >
                          Hesabı Yeniden Bağla
                        </button>
                        <button
                          type="button"
                          onClick={handleDisconnectKick}
                          className="rounded-xl border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:border-red-800 dark:bg-gray-900 dark:text-red-400 transition"
                        >
                          Bağlantıyı Kes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-amber-500 p-2 text-white shadow-xs">
                          <Radio className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-bold text-xs text-gray-900 dark:text-white">
                            Bağlı Hesap Yok
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-0.5">
                            <span className="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
                            <span>Durum: 🔴 Bağlı Değil</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleConnectKick}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm transition"
                      >
                        Kick Hesabını Bağla
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => showToast("Ayarlar başarıyla kaydedildi.")}
                  className="rounded-xl bg-primary-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm"
                >
                  Ayarları Kaydet
                </button>
              </div>
            </div>
          )}

          {/* ==========================================================
              MODAL: YENİ / DÜZENLE KOMUT PENCERESİ
             ========================================================== */}
          {isCommandModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
              <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    {editingCommand ? "Komutu Düzenle" : "Yeni Komut Oluştur"}
                  </h3>
                  <button
                    onClick={() => setIsCommandModalOpen(false)}
                    className="rounded-lg p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleSaveCommand} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Komut Adı (Örn: !ip)
                    </label>
                    <input
                      type="text"
                      value={newCmdName}
                      onChange={(e) => setNewCmdName(e.target.value)}
                      placeholder="!ip"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Alternatif Aliaslar (Virgülle ayırın: !server, !sunucu)
                    </label>
                    <input
                      type="text"
                      value={newCmdAliases}
                      onChange={(e) => setNewCmdAliases(e.target.value)}
                      placeholder="!server, !sunucu"
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Bot Yanıtı
                    </label>
                    <textarea
                      rows={3}
                      value={newCmdResponse}
                      onChange={(e) => setNewCmdResponse(e.target.value)}
                      placeholder="🎮 Minecraft IP: {minecraft_ip}"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Cooldown (Saniye)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={newCmdCooldown}
                        onChange={(e) => setNewCmdCooldown(Number(e.target.value))}
                        className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Yetki Seviyesi
                      </label>
                      <select
                        value={newCmdPermission}
                        onChange={(e) => setNewCmdPermission(e.target.value as PermissionLevel)}
                        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                      >
                        <option value="everyone">Everyone (Herkes)</option>
                        <option value="subscriber">Subscriber (Aboneler)</option>
                        <option value="moderator">Moderator (Moderatörler)</option>
                        <option value="broadcaster">Broadcaster (Sadece Yayıncı)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCommandModalOpen(false)}
                      className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-primary-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-primary-700"
                    >
                      Kaydet
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ==========================================================
              MODAL: SİMÜLASYON & TEST PENCERESİ
             ========================================================== */}
          {isTestModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
              <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    <Play className="h-4 w-4 text-emerald-500" />
                    <span>{testModalTitle}</span>
                  </h3>
                  <button
                    onClick={() => setIsTestModalOpen(false)}
                    className="rounded-lg p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="my-4">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                    Botun Chat Çıktısı (Simülasyon):
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 text-xs font-mono text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300 leading-relaxed">
                    {testOutput}
                  </div>
                  <p className="mt-2 text-[10px] text-gray-400">
                    ✓ Değişkenler başarıyla çözümlendi. Gerçek Kick yayınına mesaj gönderilmedi.
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setIsTestModalOpen(false)}
                    className="rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white dark:bg-gray-800"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
