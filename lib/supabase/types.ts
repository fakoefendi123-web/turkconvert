export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PermissionLevel = "everyone" | "subscriber" | "moderator" | "broadcaster";

export type EventType =
  | "follow"
  | "sub"
  | "resub"
  | "gift_sub"
  | "kick_gift"
  | "stream_start"
  | "stream_end";

export type LogCategory =
  | "AUTH"
  | "CHAT"
  | "COMMAND"
  | "FOLLOW"
  | "SUB"
  | "GIFT"
  | "STREAM"
  | "WEBHOOK"
  | "SYSTEM"
  | "ERROR";

export type LogLevel = "info" | "warn" | "error";

export interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  updated_at: string;
}

export interface KickAccount {
  id: string;
  user_id: string;
  kick_user_id: number;
  kick_username: string;
  kick_channel_slug: string;
  profile_pic_url: string | null;
  is_connected: boolean;
  connected_at: string;
  updated_at: string;
}

export interface BotSettings {
  id: string;
  kick_account_id: string;
  bot_name: string;
  prefix: string;
  is_online: boolean;
  timezone: string;
  default_cooldown_seconds: number;
  // Minecraft Ayarları
  minecraft_ip: string;
  minecraft_port: number;
  minecraft_version: string;
  minecraft_enabled: boolean;
  // Sosyal Medya Bağlantıları
  discord_url: string;
  youtube_url: string;
  instagram_url: string;
  tiktok_url: string;
  twitter_url: string;
  kick_url: string;
  website_url: string;
  updated_at: string;
}

export interface Command {
  id: string;
  kick_account_id: string;
  name: string;
  response: string;
  cooldown_seconds: number;
  permission: PermissionLevel;
  is_enabled: boolean;
  usage_count: number;
  aliases?: string[];
  created_at: string;
  updated_at: string;
}

export interface EventSetting {
  id: string;
  kick_account_id: string;
  event_type: EventType;
  is_enabled: boolean;
  template: string;
  cooldown_seconds: number;
  updated_at: string;
}

export interface UserStats {
  id: string;
  kick_account_id: string;
  kick_user_id: number;
  kick_username: string;
  display_name: string | null;
  xp: number;
  level: number;
  message_count: number;
  estimated_watch_time_minutes: number;
  first_seen_at: string;
  last_seen_at: string;
}

export interface XpSettings {
  id: string;
  kick_account_id: string;
  xp_per_message: number;
  xp_message_cooldown_seconds: number;
  xp_per_follow: number;
  xp_per_sub: number;
  xp_per_gift_sub: number;
  xp_per_100_kicks: number;
  curve_type: "linear" | "progressive" | "custom";
  enabled: boolean;
  updated_at: string;
}

export interface AutoMessage {
  id: string;
  kick_account_id: string;
  name: string;
  message: string;
  interval_minutes: number;
  min_chat_messages: number;
  is_enabled: boolean;
  last_sent_at: string | null;
  created_at: string;
}

export interface BotLog {
  id: string;
  kick_account_id: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  metadata?: Json;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
      };
      kick_accounts: {
        Row: KickAccount;
        Insert: Partial<KickAccount> & { user_id: string; kick_username: string };
        Update: Partial<KickAccount>;
      };
      bot_settings: {
        Row: BotSettings;
        Insert: Partial<BotSettings> & { kick_account_id: string };
        Update: Partial<BotSettings>;
      };
      commands: {
        Row: Command;
        Insert: Partial<Command> & { kick_account_id: string; name: string; response: string };
        Update: Partial<Command>;
      };
      event_settings: {
        Row: EventSetting;
        Insert: Partial<EventSetting> & { kick_account_id: string; event_type: EventType };
        Update: Partial<EventSetting>;
      };
      user_stats: {
        Row: UserStats;
        Insert: Partial<UserStats> & { kick_account_id: string; kick_username: string };
        Update: Partial<UserStats>;
      };
      xp_settings: {
        Row: XpSettings;
        Insert: Partial<XpSettings> & { kick_account_id: string };
        Update: Partial<XpSettings>;
      };
      auto_messages: {
        Row: AutoMessage;
        Insert: Partial<AutoMessage> & { kick_account_id: string; name: string; message: string };
        Update: Partial<AutoMessage>;
      };
      logs: {
        Row: BotLog;
        Insert: Partial<BotLog> & { kick_account_id: string; message: string };
        Update: Partial<BotLog>;
      };
    };
  };
}
