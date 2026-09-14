"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Crown,
  Sparkles,
  Tv,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  Flame,
  Award,
  Scroll,
  Heart,
  Maximize2,
  Volume2,
} from "lucide-react";

export default function PrensHazretleriClient() {
  const [biatCount, setBiatCount] = useState<number>(1453);
  const [hasBiat, setHasBiat] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [activeView, setActiveView] = useState<"streamAndChat" | "streamOnly" | "chatOnly">("streamAndChat");

  useEffect(() => {
    try {
      const savedCount = localStorage.getItem("tc_prens_biat_count");
      const savedBiat = localStorage.getItem("tc_user_has_biat");
      if (savedCount) setBiatCount(parseInt(savedCount, 10));
      if (savedBiat === "true") setHasBiat(true);
    } catch {
      // ignore
    }
  }, []);

  const handleBiat = () => {
    const newCount = biatCount + 1;
    setBiatCount(newCount);
    setHasBiat(true);
    setShowSparkles(true);
    try {
      localStorage.setItem("tc_prens_biat_count", String(newCount));
      localStorage.setItem("tc_user_has_biat", "true");
    } catch {
      // ignore
    }
    setTimeout(() => setShowSparkles(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-amber-50 selection:bg-amber-500 selection:text-black">
      {/* Görkemli Altın & Mor Arka Plan Işık Aurası */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-500/20 via-purple-600/15 to-transparent blur-[140px]" />
        <div className="absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[130px]" />
        <div className="absolute bottom-20 -right-40 h-[600px] w-[600px] rounded-full bg-purple-600/15 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        {/* Üst Asil Taç & Rozet */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 opacity-60 blur-md animate-pulse" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400/80 bg-gradient-to-b from-amber-950/80 to-black p-4 shadow-[0_0_35px_rgba(245,158,11,0.5)]">
              <Crown className="h-11 w-11 text-amber-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.8)]" />
            </div>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-yellow-500/20 to-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin" />
            <span>YÜCE VE GÖRKEMLİ DİJİTAL SALTANAT</span>
            <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin" />
          </div>

          <h1 className="mt-4 bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent drop-shadow-sm sm:text-6xl sm:leading-tight">
            Prens Hazretleri
          </h1>

          <p className="mt-3 max-w-2xl text-base font-medium text-amber-200/80 sm:text-lg">
            Halkına Bilabedel Lütfedilmiş ve Bahşedilmiş Muazzam Teknoloji Diyarı
          </p>
        </div>

        {/* Ferman-ı Hümayun (Giriş Bildirgesi) */}
        <div className="relative my-8 overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-b from-amber-950/40 via-purple-950/20 to-black/60 p-6 shadow-[0_0_50px_rgba(245,158,11,0.15)] backdrop-blur-xl sm:p-10">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="flex items-center gap-3 border-b border-amber-500/20 pb-4">
            <Scroll className="h-6 w-6 text-amber-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Ferman-ı Hümayun • Prens Hazretleri&apos;nin Lütuf Beyannamesi
            </h2>
          </div>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-amber-100/90 sm:text-base">
            <p className="font-serif italic text-amber-200">
              &ldquo;Malum ola ki; tebaamızın ve yüce halkımızın dosya dönüştürme, sıkıştırma ve evrak işlerinde çektiği eziyet ve meşakkat dergâhımıza ulaşmıştır. Bu çilelere nihayet vermek gayesiyle, cihanda emsali görülmemiş bu dijital ekosistem tarafımızca bizzat lütfedilmiş ve halkımızın istifadesine bilabedel sunulmuştur.&rdquo;
            </p>
            <p>
              TurkConvert diyarı; hiçbir kulun dosyasını yabancı sunuculara rehin vermeyen, gizliliği mukaddes sayan ve tek bir akçe dahi talep etmeyen <strong>Prens Hazretleri&apos;nin lütufkâr vizyonunun</strong> eseridir.
            </p>
          </div>

          {/* Biat ve Şükran Butonu */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-amber-500/20 pt-6">
            <div className="flex items-center gap-2 text-xs text-amber-300/80">
              <Award className="h-4 w-4 text-amber-400" />
              <span>
                Şu ana kadar <strong>{biatCount.toLocaleString("tr-TR")}</strong> mesut tebaa Prens Hazretleri&apos;ne şükranlarını bildirdi.
              </span>
            </div>

            <button
              onClick={handleBiat}
              className="relative inline-flex items-center gap-2 rounded-xl border border-amber-400 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_25px_rgba(245,158,11,0.6)] transition-all hover:scale-105 active:scale-95"
            >
              <Heart className={`h-4 w-4 ${hasBiat ? "fill-black" : ""}`} />
              <span>{hasBiat ? "Biatınız Tescillendi 👑" : "Prens Hazretleri'ne Biat Et & Şükran Sun"}</span>
              {showSparkles && (
                <span className="absolute -top-3 -right-2 text-sm animate-bounce">✨👑✨</span>
              )}
            </button>
          </div>
        </div>

        {/* Canlı Yayın Otağı Başlığı & Mod Butonları */}
        <div className="my-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3.5 w-3.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Yüce Prens&apos;in Canlı Yayın Otağı
            </h2>
            <span className="rounded-md bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
              KICK.COM/PRENSHAZRETLERI
            </span>
          </div>

          {/* Görünüm Modları */}
          <div className="flex items-center rounded-xl border border-amber-500/30 bg-black/60 p-1 backdrop-blur-md">
            <button
              onClick={() => setActiveView("streamAndChat")}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                activeView === "streamAndChat"
                  ? "bg-amber-500 text-black shadow-xs"
                  : "text-amber-200/70 hover:text-white"
              }`}
            >
              Yayın + Sohbet
            </button>
            <button
              onClick={() => setActiveView("streamOnly")}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                activeView === "streamOnly"
                  ? "bg-amber-500 text-black shadow-xs"
                  : "text-amber-200/70 hover:text-white"
              }`}
            >
              Yalnızca Yayın
            </button>
            <button
              onClick={() => setActiveView("chatOnly")}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                activeView === "chatOnly"
                  ? "bg-amber-500 text-black shadow-xs"
                  : "text-amber-200/70 hover:text-white"
              }`}
            >
              Sohbet Otağı
            </button>
          </div>
        </div>

        {/* Kick Video Player & Chat Alanı */}
        <div className="overflow-hidden rounded-3xl border-2 border-amber-500/40 bg-black/90 shadow-[0_0_60px_rgba(245,158,11,0.2)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* Yayın Bölümü */}
            {(activeView === "streamAndChat" || activeView === "streamOnly") && (
              <div
                className={`relative flex flex-col bg-black ${
                  activeView === "streamOnly" ? "lg:col-span-12" : "lg:col-span-8"
                }`}
              >
                <div className="relative aspect-video w-full flex-1">
                  <iframe
                    src="https://player.kick.com/prenshazretleri?autoplay=true&muted=false"
                    title="Prens Hazretleri Kick Canlı Yayını"
                    className="h-full w-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Alt Yayın Barı */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-amber-500/20 bg-gradient-to-r from-amber-950/60 to-black px-4 py-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-amber-400" />
                    <span className="font-bold text-amber-300">Prens Hazretleri Canlı Otağı</span>
                    <span className="text-amber-200/50">•</span>
                    <span className="text-emerald-400 font-semibold">Resmi Kick Kanalı</span>
                  </div>

                  <a
                    href="https://kick.com/prenshazretleri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/60 px-3 py-1.5 text-xs font-bold text-emerald-300 transition hover:bg-emerald-900/60 hover:text-white"
                  >
                    <span>Kick&apos;te Aç & Takip Et</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Sohbet Bölümü */}
            {(activeView === "streamAndChat" || activeView === "chatOnly") && (
              <div
                className={`flex flex-col border-t border-amber-500/20 bg-[#0c0e14] lg:border-t-0 lg:border-l ${
                  activeView === "chatOnly" ? "lg:col-span-12 h-[650px]" : "lg:col-span-4 min-h-[500px]"
                }`}
              >
                <div className="flex items-center justify-between border-b border-amber-500/20 bg-amber-950/40 px-4 py-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <MessageSquare className="h-4 w-4 text-amber-400" />
                    <span>Huzur-u Şahane Sohbeti</span>
                  </div>
                  <span className="text-[10px] text-amber-200/60">Canlı Mesajlaşma</span>
                </div>

                <div className="relative flex-1">
                  <iframe
                    src="https://kick.com/prenshazretleri/chatroom"
                    title="Prens Hazretleri Canlı Sohbet"
                    className="h-full w-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Prens Hazretleri'nin Saltanat İlkeleri */}
        <div className="mt-16">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-amber-300 sm:text-3xl">
              Prens Hazretleri&apos;nin 4 Büyük Saltanat İlkesi
            </h3>
            <p className="mt-2 text-sm text-amber-200/70">
              Bu sitede halka hizmet Hakk&apos;a hizmettir; tavizsiz lütuf kaideleri:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/30 to-black/80 p-6 text-center shadow-lg transition hover:border-amber-400/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-amber-200">Kusursuz Gizlilik</h4>
              <p className="mt-2 text-xs text-amber-100/70">
                Prens Hazretleri tebaasının hiçbir dosyasını sunucularda bekletmez. Tüm işlemler tarayıcınızda cereyan eder.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/30 to-black/80 p-6 text-center shadow-lg transition hover:border-amber-400/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                <Award className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-amber-200">0 Akçe Vergi / 0 TL</h4>
              <p className="mt-2 text-xs text-amber-100/70">
                Ücretli abonelikler ve gizli bedeller bu diyarda yasaklanmıştır. Tüm araçlar ebediyen ücretsizdir.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/30 to-black/80 p-6 text-center shadow-lg transition hover:border-amber-400/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                <Flame className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-amber-200">Şimşek Hızı</h4>
              <p className="mt-2 text-xs text-amber-100/70">
                Diyarın en mahir yazılımcıları tarafından ilmek ilmek dokunmuş kodlarla tüm dönüşümler göz açıp kapayıncaya kadar tamamlanır.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/30 to-black/80 p-6 text-center shadow-lg transition hover:border-amber-400/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                <Crown className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-amber-200">Halkın Hizmetinde</h4>
              <p className="mt-2 text-xs text-amber-100/70">
                35&apos;i aşkın araçla zanaatkârdan öğrenciye tüm halkın günlük bilişim ihtiyaçları tek bir çatı altında toplanmıştır.
              </p>
            </div>
          </div>
        </div>

        {/* Alt Eylem ve Dönüşüm Butonları */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#araclar"
              className="inline-flex items-center gap-2 rounded-2xl border border-amber-400/80 bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-black shadow-[0_0_30px_rgba(245,158,11,0.4)] transition hover:scale-105"
            >
              <Crown className="h-4 w-4" />
              <span>Prens&apos;in Araçlarını Kullanmaya Başla</span>
            </Link>

            <a
              href="https://kick.com/prenshazretleri"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/60 bg-emerald-950/80 px-6 py-3.5 text-sm font-bold text-emerald-300 transition hover:bg-emerald-900 hover:text-white hover:scale-105"
            >
              <Tv className="h-4 w-4" />
              <span>Kick Yayınına Teşrif Et</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-6 text-xs text-amber-200/50">
            TurkConvert • Yüce Prens Hazretleri Tarafından Aziz Milletine Bahşedilmiştir.
          </p>
        </div>
      </div>
    </div>
  );
}
