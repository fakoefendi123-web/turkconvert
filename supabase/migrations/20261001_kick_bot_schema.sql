-- ==========================================================
-- TurkConvert Kick Bot Control Center - Complete SQL Migration
-- Database: PostgreSQL (Supabase)
-- ==========================================================

-- 1. Gerekli Eklentiler
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiller Tablosu (Kullanıcı hesapları)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Bağlı Kick Yayıncı Hesapları (Multi-Channel mimarisine tam uygun)
CREATE TABLE IF NOT EXISTS public.kick_accounts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  kick_user_id BIGINT,
  kick_username TEXT NOT NULL,
  kick_channel_slug TEXT NOT NULL,
  profile_pic_url TEXT,
  is_connected BOOLEAN DEFAULT true NOT NULL,
  connected_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_user_channel UNIQUE (user_id, kick_channel_slug)
);

-- 4. Şifrelenmiş OAuth Token'ları (Kesinlikle frontend'e gönderilmez)
CREATE TABLE IF NOT EXISTS public.oauth_tokens (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  kick_account_id UUID REFERENCES public.kick_accounts(id) ON DELETE CASCADE NOT NULL UNIQUE,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_type TEXT DEFAULT 'Bearer',
  expires_at TIMESTAMPTZ NOT NULL,
  scopes TEXT[] DEFAULT ARRAY['user:read', 'channel:read', 'chat:write', 'events:subscribe'],
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Bot Ayarları
CREATE TABLE IF NOT EXISTS public.bot_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  kick_account_id UUID REFERENCES public.kick_accounts(id) ON DELETE CASCADE NOT NULL UNIQUE,
  bot_name TEXT DEFAULT 'TurkConvertBot' NOT NULL,
  prefix TEXT DEFAULT '!' NOT NULL,
  is_online BOOLEAN DEFAULT true NOT NULL,
  timezone TEXT DEFAULT 'Europe/Istanbul' NOT NULL,
  default_cooldown_seconds INT DEFAULT 5 NOT NULL,
  -- Minecraft Ayarları
  minecraft_ip TEXT DEFAULT 'play.ornek.com',
  minecraft_port INT DEFAULT 25565,
  minecraft_version TEXT DEFAULT '1.21.x',
  minecraft_enabled BOOLEAN DEFAULT true NOT NULL,
  -- Sosyal Medya Linkleri
  discord_url TEXT DEFAULT '',
  youtube_url TEXT DEFAULT '',
  instagram_url TEXT DEFAULT '',
  tiktok_url TEXT DEFAULT '',
  twitter_url TEXT DEFAULT '',
  kick_url TEXT DEFAULT '',
  website_url TEXT DEFAULT 'https://turkconvert.online',
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Komutlar
CREATE TABLE IF NOT EXISTS public.commands (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  kick_account_id UUID REFERENCES public.kick_accounts(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  response TEXT NOT NULL,
  cooldown_seconds INT DEFAULT 10 NOT NULL,
  permission TEXT DEFAULT 'everyone' CHECK (permission IN ('everyone', 'subscriber', 'moderator', 'broadcaster')) NOT NULL,
  is_enabled BOOLEAN DEFAULT true NOT NULL,
  usage_count INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_account_command UNIQUE (kick_account_id, name)
);

-- 7. Komut Alias'ları (Örn: !ip, !server, !sunucu)
CREATE TABLE IF NOT EXISTS public.command_aliases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  command_id UUID REFERENCES public.commands(id) ON DELETE CASCADE NOT NULL,
  alias TEXT NOT NULL
);

-- 8. Event Ayarları (Follow, Sub, Gift, Stream)
CREATE TABLE IF NOT EXISTS public.event_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  kick_account_id UUID REFERENCES public.kick_accounts(id) ON DELETE CASCADE NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('follow', 'sub', 'resub', 'gift_sub', 'kick_gift', 'stream_start', 'stream_end')),
  is_enabled BOOLEAN DEFAULT true NOT NULL,
  template TEXT NOT NULL,
  cooldown_seconds INT DEFAULT 5 NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_account_event UNIQUE (kick_account_id, event_type)
);

-- 9. Kullanıcı İstatistikleri & XP & Level
CREATE TABLE IF NOT EXISTS public.user_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  kick_account_id UUID REFERENCES public.kick_accounts(id) ON DELETE CASCADE NOT NULL,
  kick_user_id BIGINT,
  kick_username TEXT NOT NULL,
  display_name TEXT,
  xp BIGINT DEFAULT 0 NOT NULL,
  level INT DEFAULT 1 NOT NULL,
  message_count INT DEFAULT 0 NOT NULL,
  estimated_watch_time_minutes INT DEFAULT 0 NOT NULL,
  first_seen_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_seen_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_account_chat_user UNIQUE (kick_account_id, kick_username)
);

-- 10. XP Ayarları & Level Eğrisi
CREATE TABLE IF NOT EXISTS public.xp_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  kick_account_id UUID REFERENCES public.kick_accounts(id) ON DELETE CASCADE NOT NULL UNIQUE,
  xp_per_message INT DEFAULT 5 NOT NULL,
  xp_message_cooldown_seconds INT DEFAULT 30 NOT NULL,
  xp_per_follow INT DEFAULT 100 NOT NULL,
  xp_per_sub INT DEFAULT 500 NOT NULL,
  xp_per_gift_sub INT DEFAULT 750 NOT NULL,
  xp_per_100_kicks INT DEFAULT 100 NOT NULL,
  curve_type TEXT DEFAULT 'progressive' CHECK (curve_type IN ('linear', 'progressive', 'custom')) NOT NULL,
  enabled BOOLEAN DEFAULT true NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Otomatik Mesajlar (Auto Messages)
CREATE TABLE IF NOT EXISTS public.auto_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  kick_account_id UUID REFERENCES public.kick_accounts(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  interval_minutes INT DEFAULT 15 NOT NULL,
  min_chat_messages INT DEFAULT 10 NOT NULL,
  is_enabled BOOLEAN DEFAULT true NOT NULL,
  last_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. Denetim & İşlem Logları
CREATE TABLE IF NOT EXISTS public.logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  kick_account_id UUID REFERENCES public.kick_accounts(id) ON DELETE CASCADE NOT NULL,
  level TEXT DEFAULT 'info' CHECK (level IN ('info', 'warn', 'error')) NOT NULL,
  category TEXT DEFAULT 'SYSTEM' CHECK (category IN ('AUTH', 'CHAT', 'COMMAND', 'FOLLOW', 'SUB', 'GIFT', 'STREAM', 'WEBHOOK', 'SYSTEM', 'ERROR')) NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. İşlenmiş Webhook Eventleri (Idempotency - Çift Event Koruması)
CREATE TABLE IF NOT EXISTS public.processed_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id TEXT UNIQUE NOT NULL,
  kick_account_id UUID REFERENCES public.kick_accounts(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- INDEXLER
-- ==========================================================
CREATE INDEX IF NOT EXISTS idx_kick_accounts_user ON public.kick_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_commands_account ON public.commands(kick_account_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_account_xp ON public.user_stats(kick_account_id, xp DESC);
CREATE INDEX IF NOT EXISTS idx_logs_account_created ON public.logs(kick_account_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_processed_events_id ON public.processed_events(event_id);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLİTİKALARI
-- ==========================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kick_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.oauth_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bot_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.command_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auto_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.processed_events ENABLE ROW LEVEL SECURITY;

-- 1. Profiles RLS
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 2. Kick Accounts RLS
CREATE POLICY "Users can manage their own kick accounts" ON public.kick_accounts
  FOR ALL USING (auth.uid() = user_id);

-- 3. OAuth Tokens RLS (Sadece Service Role veya Hesap Sahibi okuyabilir, tokenlar asla dışarı sızmaz)
CREATE POLICY "Users can view their kick token record" ON public.oauth_tokens
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.kick_accounts WHERE kick_accounts.id = oauth_tokens.kick_account_id AND kick_accounts.user_id = auth.uid())
  );

-- 4. Bot Settings RLS
CREATE POLICY "Users can manage their bot settings" ON public.bot_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.kick_accounts WHERE kick_accounts.id = bot_settings.kick_account_id AND kick_accounts.user_id = auth.uid())
  );

-- 5. Commands RLS
CREATE POLICY "Users can manage their commands" ON public.commands
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.kick_accounts WHERE kick_accounts.id = commands.kick_account_id AND kick_accounts.user_id = auth.uid())
  );

-- 6. Command Aliases RLS
CREATE POLICY "Users can manage command aliases" ON public.command_aliases
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.commands 
      JOIN public.kick_accounts ON kick_accounts.id = commands.kick_account_id 
      WHERE commands.id = command_aliases.command_id AND kick_accounts.user_id = auth.uid()
    )
  );

-- 7. Event Settings RLS
CREATE POLICY "Users can manage event settings" ON public.event_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.kick_accounts WHERE kick_accounts.id = event_settings.kick_account_id AND kick_accounts.user_id = auth.uid())
  );

-- 8. User Stats RLS
CREATE POLICY "Users can manage chat user stats" ON public.user_stats
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.kick_accounts WHERE kick_accounts.id = user_stats.kick_account_id AND kick_accounts.user_id = auth.uid())
  );

-- 9. XP Settings RLS
CREATE POLICY "Users can manage xp settings" ON public.xp_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.kick_accounts WHERE kick_accounts.id = xp_settings.kick_account_id AND kick_accounts.user_id = auth.uid())
  );

-- 10. Auto Messages RLS
CREATE POLICY "Users can manage auto messages" ON public.auto_messages
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.kick_accounts WHERE kick_accounts.id = auto_messages.kick_account_id AND kick_accounts.user_id = auth.uid())
  );

-- 11. Logs RLS
CREATE POLICY "Users can view their bot logs" ON public.logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.kick_accounts WHERE kick_accounts.id = logs.kick_account_id AND kick_accounts.user_id = auth.uid())
  );

-- Service Role (Edge Functions) Tüm tablolara tam yetkiyle erişir (Bypass RLS)

-- ==========================================================
-- OTOMATİK BAŞLANGIÇ TETİKLEYİCİLERİ (TRIGGERS)
-- ==========================================================

-- A) Yeni Auth kullanıcısı kaydolduğunda otomatik Profile açma
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- B) Yeni Kick Hesabı bağlandığında varsayılan ayarları, komutları ve eventleri otomatik oluşturma
CREATE OR REPLACE FUNCTION public.handle_new_kick_account()
RETURNS trigger AS $$
BEGIN
  -- 1. Varsayılan Bot Ayarları
  INSERT INTO public.bot_settings (kick_account_id, bot_name, prefix, is_online, minecraft_ip, discord_url, website_url)
  VALUES (NEW.id, 'TurkConvertBot', '!', true, 'play.example.com', 'https://discord.gg/example', 'https://turkconvert.online')
  ON CONFLICT (kick_account_id) DO NOTHING;

  -- 2. Varsayılan XP Ayarları
  INSERT INTO public.xp_settings (kick_account_id, xp_per_message, xp_per_follow, xp_per_sub, xp_per_gift_sub, xp_per_100_kicks)
  VALUES (NEW.id, 5, 100, 500, 750, 100)
  ON CONFLICT (kick_account_id) DO NOTHING;

  -- 3. Varsayılan Komutlar
  INSERT INTO public.commands (kick_account_id, name, response, cooldown_seconds, permission, is_enabled)
  VALUES
    (NEW.id, '!ip', '🎮 Minecraft Sunucumuz: {minecraft_ip} | Sürüm: {minecraft_version}', 10, 'everyone', true),
    (NEW.id, '!discord', '💬 Discord topluluğumuza katılın: {discord}', 10, 'everyone', true),
    (NEW.id, '!uptime', '⏱️ Yayın Süresi: {uptime}', 15, 'everyone', true),
    (NEW.id, '!level', '⭐ {username} • Seviye: {level} • XP: {xp}/{next_level_xp} • Sıralama: #{rank}', 10, 'everyone', true),
    (NEW.id, '!top', '🏆 En Aktif Sohbetçiler (İlk 5): {top_users}', 20, 'everyone', true),
    (NEW.id, '!social', '🔗 Sosyal Medya: Discord: {discord} | YouTube: {youtube} | Kick: {kick}', 15, 'everyone', true),
    (NEW.id, '!bot', '🤖 TurkConvert Kick Bot Aktif ve Hizmetinizde! (turkconvert.online/kick)', 10, 'everyone', true)
  ON CONFLICT DO NOTHING;

  -- 4. Varsayılan Event Şablonları
  INSERT INTO public.event_settings (kick_account_id, event_type, is_enabled, template, cooldown_seconds)
  VALUES
    (NEW.id, 'follow', true, '🎉 {username} kanalı takip etti! Ailemize hoş geldin! ❤️', 3),
    (NEW.id, 'sub', true, '💚 {username} kanala abone oldu! Desteğin için sonsuz teşekkürler!', 3),
    (NEW.id, 'resub', true, '🔄 {username} aboneliğini {months}. ayında yeniledi! Harikasın!', 3),
    (NEW.id, 'gift_sub', true, '🎁 {username}, {target_username} kullanıcısına abonelik hediye etti! Kralsın!', 3),
    (NEW.id, 'kick_gift', true, '💎 {username} kanala {amount} KICK hediye etti! Çok teşekkürler!', 3),
    (NEW.id, 'stream_start', true, '🟢 Yayın Başladı! Kategori: {category} • Herkes hoş geldi!', 10),
    (NEW.id, 'stream_end', true, '🔴 Yayın Sona Erdi. Katılan tüm dostlara teşekkürler, sonraki yayında görüşmek üzere!', 10)
  ON CONFLICT DO NOTHING;

  -- 5. Başlangıç Logu
  INSERT INTO public.logs (kick_account_id, level, category, message)
  VALUES (NEW.id, 'info', 'SYSTEM', 'Kick hesabı başarıyla bağlandı ve varsayılan bot konfigürasyonu oluşturuldu.');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_kick_account_created ON public.kick_accounts;
CREATE TRIGGER on_kick_account_created
  AFTER INSERT ON public.kick_accounts
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_kick_account();
