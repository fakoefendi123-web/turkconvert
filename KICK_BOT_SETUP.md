# TurkConvert - Kick Bot Control Center & API Entegrasyon Kılavuzu

Bu belge, **TurkConvert** projesine entegre edilen kapsamlı **Kick.com Yayıncı Botu ve Yönetim Paneli**'nin kurulum, yapılandırma, Supabase mimarisi ve Kick Developer API ayarlarını detaylandırmaktadır.

---

## 1. Mimari Genel Bakış

Sistem, **GitHub Pages**'in statik hosting kısıtlamalarını aşacak şekilde sunucusuz (serverless) ve VPS maliyeti gerektirmeyen bir mimariyle tasarlanmıştır:

```
                  ┌───────────────────────────────────────────────┐
                  │          GitHub Pages / TurkConvert           │
                  │   Next.js 14 (App Router, Static Export)      │
                  │              Route: /kick                     │
                  └───────────────────────┬───────────────────────┘
                                          │ Supabase Client (Anon/Publishable Key)
                                          ▼
                  ┌───────────────────────────────────────────────┐
                  │                 SUPABASE                      │
                  │  ├── Supabase Auth (Yayıncı Girişi / RLS)      │
                  │  ├── PostgreSQL DB (11 Tablo, RLS Korumalı)   │
                  │  ├── Realtime (Canlı Chat & Log Akışı)        │
                  │  └── Edge Functions (Deno Runtime)            │
                  │       ├── kick-oauth   (OAuth 2.1 PKCE)       │
                  │       └── kick-webhook (Event & Chat İşleyici)│
                  └───────────────▲───────────────┬───────────────┘
            Kick Webhook Payloads │               │ Chat Gönderimi
            (Takip, Sub, Chat)    │               │ (https://api.kick.com)
                                  │               ▼
                  ┌───────────────────────────────────────────────┐
                  │                KICK.COM API                   │
                  │       Developer Portal (OAuth 2.1 + Webhook)  │
                  └───────────────────────────────────────────────┘
```

---

## 2. Supabase Kurulumu & Migration

Supabase Proje URL: `https://onlzdwfpbdplpuxiipeb.supabase.co`

### Adım 1: SQL Migration'ı Çalıştırma
Proje dizininde yer alan `supabase/migrations/20261001_kick_bot_schema.sql` dosyasını:
1. Supabase Dashboard -> **SQL Editor** sayfasına yapıştırın ve **Run** butonuna tıklayın.
2. Bu işlem aşağıdaki 11 tabloyu, RLS (Row Level Security) kurallarını, indeksleri ve otomatik tetikleyicileri (triggers) oluşturacaktır:
   - `profiles`: Kullanıcı profilleri
   - `kick_accounts`: Bağlı Kick kanal kimlikleri ve ayarları
   - `oauth_tokens`: Hassas Kick access/refresh tokenları (Yalnızca Edge Functions / Service Role erişebilir)
   - `bot_settings`: Bot prefix, online/offline durumu, Minecraft ve sosyal medya bağlantıları
   - `commands`: Özel komutlar (cooldown, yetki, yanıt şablonu)
   - `command_aliases`: Komut kısayolları (`!ip`, `!server`, `!sunucu`)
   - `event_settings`: Takip, sub, gift sub, kick gift ve yayın event şablonları
   - `user_stats`: İzleyici istatistikleri (XP, level, mesaj sayısı, tahmini watch time)
   - `xp_settings`: Mesaj başı XP, cooldown ve level çarpanları
   - `auto_messages`: Belirli aralıklarla sohbete gönderilen otomatik mesajlar
   - `logs`: Komut ve event tetikleme denetim kayıtları
   - `processed_events`: Webhook replay saldırılarını ve mükerrer eventleri önleyen idempotency tablosu

### Adım 2: Edge Functions'ı Dağıtma (Deploy)
Supabase CLI kurulu ise terminalden şu komutları çalıştırın:

```bash
# Fonksiyonları dağıt
supabase functions deploy kick-oauth --no-verify-jwt
supabase functions deploy kick-webhook --no-verify-jwt
```

### Adım 3: Edge Function Gizli Anahtarlarını (Secrets) Ayarlama
Edge functionların Kick API ve veritabanı ile güvenle haberleşmesi için Supabase dashboard veya CLI üzerinden secret'ları tanımlayın:

```bash
supabase secrets set \
  KICK_CLIENT_ID="KICK_DEVELOPER_PORTAL_CLIENT_ID" \
  KICK_CLIENT_SECRET="KICK_DEVELOPER_PORTAL_CLIENT_SECRET" \
  KICK_REDIRECT_URI="https://turkconvert.online/kick/callback" \
  KICK_WEBHOOK_SECRET="KICK_WEBHOOK_SECRET_KEY" \
  SUPABASE_URL="https://onlzdwfpbdplpuxiipeb.supabase.co" \
  SUPABASE_SERVICE_ROLE_KEY="SUPABASE_SERVICE_ROLE_KEY"
```

---

## 3. Kick Developer Portal Ayarları

1. [Kick Developer Portal](https://dev.kick.com) adresine gidin ve yeni bir uygulama oluşturun.
2. **OAuth 2.1 Bilgileri:**
   - **Redirect URI:** `https://turkconvert.online/kick/callback` (Geliştirme için: `http://localhost:3000/kick/callback`)
   - **Scopes:**
     - `user:read` (Kanal sahibi bilgilerini almak için)
     - `channel:read` (Kanal detayları ve takipçiler için)
     - `chat:write` (Botun sohbete mesaj yazabilmesi için)
     - `events:subscribe` (Event webhooklarını dinlemek için)
3. **Webhook Yapılandırması:**
   - **Webhook URL:** `https://onlzdwfpbdplpuxiipeb.supabase.co/functions/v1/kick-webhook`
   - **Abonelik Eventleri:**
     - `chat.message.sent` (Sohbet komutları ve XP kazanımı için)
     - `channel.followed` (Yeni takipçi bildirimleri için)
     - `channel.subscription.new` (Yeni abonelikler için)
     - `channel.subscription.renewal` (Yenilenen abonelikler için)
     - `channel.subscription.gifts` (Hediye abonelikler için)
     - `livestream.status.updated` (Yayın başladı/bitti bildirimleri için)

---

## 4. Ortam Değişkenleri (.env.local)

Frontend uygulamasında gizli (secret) hiçbir anahtar bulunmaz. Yalnızca public anahtarlar yer alır:

```env
# Supabase Public Keys (GitHub Pages frontend için güvenli)
NEXT_PUBLIC_SUPABASE_URL=https://onlzdwfpbdplpuxiipeb.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_ornek_anahtar

# NOT: KICK_CLIENT_SECRET ve SUPABASE_SERVICE_ROLE_KEY asla buraya eklenmez!
# Bu değerler yalnızca Supabase Edge Functions Secrets üzerinde tutulur.
```

---

## 5. Değişken Sistemi (Template Variables)

Paneldeki komutlarda ve event şablonlarında aşağıdaki dinamik değişkenler kullanılabilir:

| Değişken | Açıklama | Örnek Çıktı |
|---|---|---|
| `{username}` | Komutu kullanan veya eventi tetikleyen kullanıcı | `@Ahmet` |
| `{display_name}` | Kullanıcının görünen adı | `Ahmet` |
| `{channel}` | Bağlı Kick kanal adı | `TurkConvert` |
| `{minecraft_ip}` | Panelden girilen sunucu IP adresi | `play.example.com` |
| `{minecraft_port}` | Panelden girilen sunucu portu | `25565` |
| `{minecraft_version}` | Desteklenen oyun versiyonu | `1.21.x` |
| `{discord}` | Discord davet linki | `discord.gg/ornek` |
| `{youtube}` | YouTube kanal bağlantısı | `youtube.com/@ornek` |
| `{instagram}` | Instagram profil bağlantısı | `instagram.com/ornek` |
| `{tiktok}` | TikTok profil bağlantısı | `tiktok.com/@ornek` |
| `{kick}` | Kick kanal adresi | `kick.com/kanal` |
| `{level}` | Kullanıcının mevcut chat seviyesi | `14` |
| `{xp}` | Kullanıcının toplam XP puanı | `3250` |
| `{next_level_xp}` | Bir sonraki seviyeye geçmek için gereken toplam XP | `3600` |
| `{rank}` | Leaderboard sıralaması | `#3` |
| `{messages}` | Toplam sohbet mesaj sayısı | `420` |
| `{watch_time}` | Tahmini izleme süresi (Chat aktivitesine dayalı) | `210 dk` |
| `{uptime}` | Yayının açık kalma süresi | `2s 45dk` |

---

## 6. Güvenlik ve Küfür Filtresi Politikası

- **Küfür Filtresi / Sansür Yok:** Kullanıcı talimatı doğrultusunda bot, **asla küfür engellemesi, kelime sansürü veya mesaj silme işlemi yapmaz**. Botun görevi yalnızca komutları cevaplamak, eventleri kutlamak ve seviye sistemini yönetmektir.
- **Replay Protection:** Webhook istekleri 10 dakikalık zaman damgası kontrolünden (`Kick-Event-Message-Timestamp`) ve idempotency tablosundan (`processed_events`) geçirilir. Mükerrer istekler doğrudan engellenir.
- **RLS Veri İzolasyonu:** Her yayıncı yalnızca kendi kanalına ait komutları, logları ve ayarları okuyabilir/yazabilir.
