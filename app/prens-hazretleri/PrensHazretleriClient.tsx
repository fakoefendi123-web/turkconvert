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
  Volume2,
  RefreshCw,
  Send,
  Check,
  Copy,
  Calendar,
  BookOpen,
  Radio,
  PenTool,
  Receipt,
  ShieldAlert,
  QrCode,
  GitCompare,
  FileImage,
} from "lucide-react";

// Saray Rütbeleri Havuzu
const ROYAL_TITLES = [
  "👑 Saray Başveziri ve Mühürdarı",
  "⚔️ Yüce Prens Hazretleri'nin Baş Muhafızı",
  "📜 Divan-ı Hümayun Başkâtibi",
  "💎 Cihan Hazinedarbaşısı",
  "🛡️ Dijital Akıncılar Kumandanı",
  "🦅 Saray Çavuşbaşısı",
  "🌟 Lütuf Meclisi Âyanı",
];

// Başlangıç Arz-ı Hâlleri (Halktan Gelen Dilekçeler)
const INITIAL_PETITIONS = [
  {
    id: "p-1",
    author: "Kâtip Necati Efendi",
    role: "Vilayet Kâtibi",
    type: "Lütuf Teşekkürü",
    message:
      "Hünkarım, bahşettiğiniz Şeffaf İmza vasıtasıyla devlet dairesindeki evrakları tek tıkla mühürler olduk. Allah saltanatınıza zeval vermesin!",
    date: "Bugün",
  },
  {
    id: "p-2",
    author: "Serdar Selim",
    role: "Cihan Muhafızı",
    type: "Yayın Tebriki",
    message:
      "Yüce Prens'im, Kick yayınındaki fetihleriniz ve chat meclisindeki adaletiniz tebaanız olarak göğsümüzü kabartıyor.",
    date: "Dün",
  },
  {
    id: "p-3",
    author: "Tüccar Bahaddin",
    role: "Hazine Esnafı",
    type: "Lütuf Teşekkürü",
    message:
      "0 akçe vergiyle çalışan PDF Fatura aracı sayesinde esnafın cebi nefes aldı. Lütfunuz daim olsun!",
    date: "3 gün önce",
  },
];

// Saray Lugatı Terimleri
const LUGAT_TERMS = [
  {
    term: "Biat",
    meaning:
      "Prens Hazretleri'nin yüce dijital teknolojisine ve Kick yayın otağına gönülden bağlanıp sadakat bildirme eylemi.",
  },
  {
    term: "Ferman",
    meaning:
      "Prens Hazretleri'nin geri döndürülemez, tebaanın bilişim çilesini anında sonlandıran kutlu buyruğu.",
  },
  {
    term: "Lütuf",
    meaning:
      "TurkConvert'teki 35+ aracın hiçbir reklam ve ücret (akçe) talep edilmeksizin halka bilabedel sunulması.",
  },
  {
    term: "0 Akçe",
    meaning:
      "Yabancı sitelerin istediği fahiş aboneliklere inat, TurkConvert diyarında her şeyin ebediyen 0 TL olması.",
  },
  {
    term: "Huzur-u Şahane Otağı",
    meaning:
      "Kick.com/prenshazretleri canlı yayın meydanı; tebaa ile Prens'in doğrudan hasbihal ettiği mukaddes ekran.",
  },
  {
    term: "Mesut Tebaa",
    meaning:
      "Dosyalarını hiçbir sunucuya kaptırmadan, tarayıcısında şimşek hızında dönüştüren TurkConvert kullanıcısı.",
  },
];

// Prens'in Bizzat Lütfettiği Amiral Araçlar
const ROYAL_TOOLS = [
  {
    title: "Şeffaf Ferman İmzası",
    href: "/seffaf-imza",
    icon: PenTool,
    desc: "Prens Hazretleri'nin mühürleri gibi arka planı yok edilmiş, saydam asil imzalar üretin.",
    badge: "Çok Sevilen",
  },
  {
    title: "Hazine-i Âmire Fatura Stüdyosu",
    href: "/fatura-olusturucu",
    icon: Receipt,
    desc: "Akçe ve dirhem hesaplarını kuruşu kuruşuna, vergi kaidelerine uygun PDF faturaya dökün.",
    badge: "Resmi Evrak",
  },
  {
    title: "Sırr-ı Hümayun Sansürleyici",
    href: "/belge-sansurleyici",
    icon: ShieldAlert,
    desc: "Devlet-i ebed-müddet sırlarını ve mahrem evrakı lekeleyerek meraklı gözlerden gizleyin.",
    badge: "%100 Gizli",
  },
  {
    title: "Görsel Sıkıştırma Dergâhı",
    href: "/image-compressor",
    icon: FileImage,
    desc: "Ağır yük teşkil eden pikselleri lütufkâr algoritmalarla hafifletin, kaliteden ödün vermeyin.",
    badge: "Işık Hızı",
  },
  {
    title: "Saray QR Mührü",
    href: "/qr-code-generator",
    icon: QrCode,
    desc: "Saray meclisindeki konuklara tek okutmayla ağa bağlanma ve bilgi aktarma imtiyazı bahşedin.",
    badge: "Hızlı Erişim",
  },
  {
    title: "Evrak Mukayese Aynası",
    href: "/image-compare",
    icon: GitCompare,
    desc: "İki vesika veya görsel arasındaki en ufak tahrifatı dahi çıplak gözle teşhis edin.",
    badge: "Keskin Göz",
  },
];

export default function PrensHazretleriClient() {
  const [biatCount, setBiatCount] = useState<number>(1453);
  const [hasBiat, setHasBiat] = useState(false);
  const [userTitle, setUserTitle] = useState<string>("");
  const [showCertificate, setShowCertificate] = useState(false);
  const [copiedTitle, setCopiedTitle] = useState(false);

  // Kick Oynatıcı ve Sohbet Durumları
  const [playerKey, setPlayerKey] = useState(0);
  const [activeView, setActiveView] = useState<"streamAndChat" | "streamOnly" | "chatOnly">("streamAndChat");

  // Dilekçe Sandığı Durumları
  const [petitions, setPetitions] = useState(INITIAL_PETITIONS);
  const [newAuthor, setNewAuthor] = useState("");
  const [newType, setNewType] = useState("Lütuf Teşekkürü");
  const [newMessage, setNewMessage] = useState("");
  const [petitionSubmitted, setPetitionSubmitted] = useState(false);

  // Ses Sentezleyici (Web Audio API ile Asil Borazan / Fanfar Çalımı)
  const playFanfare = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99]; // C Majör Asil Akor
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + idx * 0.07 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.75);
      });
    } catch {
      // Ses engellendiyse sessizce geç
    }
  };

  useEffect(() => {
    try {
      const savedCount = localStorage.getItem("tc_prens_biat_count");
      const savedBiat = localStorage.getItem("tc_user_has_biat");
      const savedTitle = localStorage.getItem("tc_user_royal_title");
      const savedPetitions = localStorage.getItem("tc_prens_petitions");

      if (savedCount) setBiatCount(parseInt(savedCount, 10));
      if (savedBiat === "true") setHasBiat(true);
      if (savedTitle) setUserTitle(savedTitle);
      if (savedPetitions) {
        try {
          const parsed = JSON.parse(savedPetitions);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPetitions(parsed);
          }
        } catch {}
      }
    } catch {
      // LocalStorage desteği yoksa varsayılan kalır
    }
  }, []);

  // Biat Etme & Berat Alma İşlemi
  const handleBiat = () => {
    playFanfare();
    const newCount = biatCount + 1;
    setBiatCount(newCount);
    setHasBiat(true);

    // Yeni rastgele rütbe belirle veya eskisini koru
    let assignedTitle = userTitle;
    if (!assignedTitle) {
      const randomIdx = Math.floor(Math.random() * ROYAL_TITLES.length);
      assignedTitle = ROYAL_TITLES[randomIdx];
      setUserTitle(assignedTitle);
    }
    setShowCertificate(true);

    try {
      localStorage.setItem("tc_prens_biat_count", String(newCount));
      localStorage.setItem("tc_user_has_biat", "true");
      localStorage.setItem("tc_user_royal_title", assignedTitle);
    } catch {}
  };

  // Rütbeyi Kopyalama
  const handleCopyTitle = () => {
    if (!userTitle) return;
    navigator.clipboard?.writeText(
      `Yüce Prens Hazretleri tarafından tarafıma tevcih edilen saltanat beratı: "${userTitle}" 👑 (turkconvert.online/prens-hazretleri)`
    );
    setCopiedTitle(true);
    setTimeout(() => setCopiedTitle(false), 2500);
  };

  // Popout Chat Penceresi Açma (Kick Resmi Popout Penceresi)
  const openPopoutChat = () => {
    const width = 430;
    const height = 720;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    window.open(
      "https://kick.com/popout/prenshazretleri/chat",
      "PrensHazretleriChat",
      `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
    );
  };

  // Sinyal Yenileme
  const handleRefreshPlayer = () => {
    setPlayerKey((prev) => prev + 1);
  };

  // Dilekçe Gönderme
  const handlePetitionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const authorName = newAuthor.trim() || userTitle || "Sadık Bir Tebaa";
    const newEntry = {
      id: "p-" + Date.now(),
      author: authorName,
      role: userTitle || "Mesut Kul",
      type: newType,
      message: newMessage.trim(),
      date: "Şimdi",
    };

    const updated = [newEntry, ...petitions];
    setPetitions(updated);
    setNewMessage("");
    setPetitionSubmitted(true);
    playFanfare();

    try {
      localStorage.setItem("tc_prens_petitions", JSON.stringify(updated.slice(0, 20)));
    } catch {}

    setTimeout(() => setPetitionSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#06070B] text-amber-50 selection:bg-amber-500 selection:text-black">
      {/* Görkemli Altın & Asil Mor Arka Plan Auraları */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-500/25 via-purple-700/15 to-transparent blur-[160px]" />
        <div className="absolute top-1/4 -left-48 h-[600px] w-[600px] rounded-full bg-amber-600/15 blur-[150px]" />
        <div className="absolute top-2/3 -right-48 h-[700px] w-[700px] rounded-full bg-purple-600/15 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        {/* ======================= ÜST BAŞLIK & ASİL TAÇ ======================= */}
        <header className="mb-10 flex flex-col items-center text-center">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 opacity-60 blur-lg animate-pulse" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-amber-400 bg-gradient-to-b from-amber-950 via-black to-[#0d0f17] p-4 shadow-[0_0_40px_rgba(245,158,11,0.6)]">
              <Crown className="h-14 w-14 text-amber-300 drop-shadow-[0_2px_12px_rgba(245,158,11,0.9)] animate-bounce" />
            </div>
          </div>

          <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-amber-500/50 bg-gradient-to-r from-amber-500/15 via-yellow-500/25 to-amber-500/15 px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)] backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-amber-300 animate-spin" />
            <span>YÜCE VE GÖRKEMLİ DİJİTAL SALTANAT</span>
            <Sparkles className="h-4 w-4 text-amber-300 animate-spin" />
          </div>

          <h1 className="mt-5 bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-4xl font-black tracking-tight text-transparent drop-shadow-sm sm:text-6xl sm:leading-tight lg:text-7xl">
            Prens Hazretleri
          </h1>

          <p className="mt-4 max-w-3xl text-base font-medium text-amber-200/90 sm:text-xl leading-relaxed">
            Halkına Bilabedel Lütfedilmiş Muazzam Teknoloji Diyarı ve Resmi Canlı Yayın Otağı
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-950/40 px-3 py-1.5 text-amber-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Sıfır Reklam • Sıfır Akçe (0 TL)
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-950/40 px-3 py-1.5 text-purple-300">
              <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
              Resmi Kick Partner Diyarı
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-950/40 px-3 py-1.5 text-amber-300">
              <Award className="h-4 w-4 text-amber-400" />
              Tüm Hakları Aziz Milletine Bahşedilmiştir
            </span>
          </div>
        </header>

        {/* ======================= FERMAN-I HÜMAYUN ======================= */}
        <section className="relative my-10 overflow-hidden rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-amber-950/50 via-[#100c1c]/70 to-black/80 p-6 shadow-[0_0_60px_rgba(245,158,11,0.2)] backdrop-blur-2xl sm:p-10">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/15 blur-3xl" />
          <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-purple-600/15 blur-3xl" />

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/30 pb-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-500/20 p-2 text-amber-400">
                <Scroll className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-base font-bold uppercase tracking-wider text-amber-300 sm:text-lg">
                  Ferman-ı Hümayun • Prens Hazretleri&apos;nin Lütuf Beyannamesi
                </h2>
                <p className="text-xs text-amber-200/60">
                  Cihanın Dört Bir Yanındaki Aziz Tebaa ve Bilişim Ehline Duyurulur
                </p>
              </div>
            </div>

            <div className="rounded-full border border-amber-500/30 bg-black/40 px-3 py-1 text-xs font-semibold text-amber-300">
              Mühür: Prens-i Âlişan
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-amber-100/90 sm:text-base">
            <blockquote className="rounded-2xl border-l-4 border-amber-400 bg-amber-500/10 p-4 font-serif italic text-amber-200 text-sm sm:text-base shadow-inner">
              &ldquo;Malum ola ki; aziz halkımızın ve tebaamızın dosya dönüştürme, sıkıştırma, imzalama ve evrak işlerinde çektiği bitmek bilmeyen çileler, yabancı sitelerin fahiş abonelik ve reklam zulümleri dergâhımıza vasıl olmuştur. Bu eziyetlere ebediyen nihayet vermek gayesiyle, cihanda eşi benzeri bulunmayan bu teknoloji diyarı tarafımızca bizzat lütfedilmiş ve halkımızın istifadesine bilabedel bahşedilmiştir.&rdquo;
            </blockquote>
            <p>
              TurkConvert diyarında hiçbir kulun kıymetli dosyası yabancı sunucuların zindanlarına hapsedilmez; her işlem tarayıcınızda, şimşek süratiyle ve %100 mahremiyet içinde cereyan eder. Tek bir akçe dahi talep edilmez!
            </p>
          </div>

          {/* Biat ve Şükran Butonu */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-amber-500/30 pt-6">
            <div className="flex items-center gap-2.5 text-xs text-amber-300">
              <Award className="h-5 w-5 text-amber-400" />
              <span>
                Şu ana kadar <strong>{biatCount.toLocaleString("tr-TR")}</strong> mesut tebaa Prens Hazretleri&apos;ne biat edip şükran sundu.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleBiat}
                className="relative inline-flex items-center gap-2 rounded-xl border border-amber-400 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 px-6 py-3 text-xs font-black uppercase tracking-wider text-black shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Heart className={`h-4 w-4 ${hasBiat ? "fill-black" : ""}`} />
                <span>{hasBiat ? "Biatınız Tescillendi 👑" : "Prens Hazretleri'ne Biat Et & Şükran Sun"}</span>
              </button>

              {hasBiat && (
                <button
                  onClick={() => setShowCertificate(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-950/60 px-4 py-3 text-xs font-bold text-amber-300 transition hover:bg-amber-900/60 cursor-pointer"
                >
                  <Crown className="h-4 w-4 text-amber-400" />
                  <span>Saltanat Beratını Aç</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ======================= SALTANAT BERATI MODALI ======================= */}
        {showCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-[#1a1103] via-[#0e0a14] to-black p-6 sm:p-8 text-center shadow-[0_0_80px_rgba(245,158,11,0.6)]">
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl" />

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-amber-400 bg-amber-500/20 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                <Crown className="h-9 w-9 text-amber-300" />
              </div>

              <div className="mt-4 text-xs font-bold tracking-widest text-amber-400 uppercase">
                Saltanat Berat-ı Âlisi
              </div>

              <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Biatınız Tescil Kılındı!
              </h3>

              <div className="my-5 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4">
                <p className="text-xs text-amber-200/70">Şahsınıza Tevcih Edilen Asil Unvan:</p>
                <div className="mt-1 text-lg font-black text-amber-300 sm:text-xl">
                  {userTitle || "👑 Saray Başveziri ve Mühürdarı"}
                </div>
              </div>

              <p className="text-xs leading-relaxed text-amber-100/80">
                Bu berat ile Prens Hazretleri&apos;nin lütuf diyarı TurkConvert&apos;te tam imtiyaz ve himaye altına alındınız. Dosyalarınız ebediyen şimşek hızında ve 0 akçe bedelle dönüştürülecektir.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleCopyTitle}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/20 px-4 py-2.5 text-xs font-bold text-amber-300 transition hover:bg-amber-500/30 cursor-pointer"
                >
                  {copiedTitle ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedTitle ? "Berat Kopyalandı!" : "Rütbemi Kopyala"}</span>
                </button>

                <button
                  onClick={() => setShowCertificate(false)}
                  className="inline-flex items-center rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-black shadow-lg transition hover:bg-amber-400 cursor-pointer"
                >
                  Şükranla Kabul Et
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================= KICK CANLI YAYIN & SOHBET ALANI ======================= */}
        <section className="my-12">
          {/* Canlı Yayın Üst Barı */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </div>
              <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                Yüce Prens&apos;in Canlı Yayın Otağı
              </h2>
              <span className="rounded-md border border-emerald-500/40 bg-emerald-950/80 px-2 py-0.5 text-[11px] font-bold text-emerald-300">
                KICK.COM/PRENSHAZRETLERI
              </span>
            </div>

            {/* Görünüm Modları & Kontroller */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center rounded-xl border border-amber-500/30 bg-black/70 p-1 backdrop-blur-md">
                <button
                  onClick={() => setActiveView("streamAndChat")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    activeView === "streamAndChat"
                      ? "bg-amber-500 text-black shadow-xs"
                      : "text-amber-200/70 hover:text-white"
                  }`}
                >
                  Yayın + Sohbet
                </button>
                <button
                  onClick={() => setActiveView("streamOnly")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    activeView === "streamOnly"
                      ? "bg-amber-500 text-black shadow-xs"
                      : "text-amber-200/70 hover:text-white"
                  }`}
                >
                  Yalnızca Yayın
                </button>
                <button
                  onClick={() => setActiveView("chatOnly")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    activeView === "chatOnly"
                      ? "bg-amber-500 text-black shadow-xs"
                      : "text-amber-200/70 hover:text-white"
                  }`}
                >
                  Sohbet Otağı
                </button>
              </div>

              {/* Sinyali Tazele */}
              <button
                onClick={handleRefreshPlayer}
                title="Yayın akışını ve sinyali yeniden yükler"
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-black/60 px-3 py-2 text-xs font-bold text-amber-300 transition hover:bg-amber-950/60 cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sinyali Tazele</span>
              </button>

              {/* Popout Chat */}
              <button
                onClick={openPopoutChat}
                title="Kick resmi sohbetini ayrı pencerede açar"
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/70 px-3 py-2 text-xs font-bold text-emerald-300 transition hover:bg-emerald-900/70 hover:text-white cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Pencerede Sohbet</span>
              </button>
            </div>
          </div>

          {/* İpucu Bildirim Şeridi */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-500/20 bg-amber-950/20 px-4 py-2 text-xs text-amber-200/80">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-amber-400 shrink-0" />
              <span>
                Tarayıcı güvenlik kaideleri gereği yayın sessiz başlar; sesi açmak için oynatıcıdaki hoparlör simgesine dokununuz.
              </span>
            </div>
            <div className="text-[11px] text-amber-300/60">
              Prens şu an çevrimdışı ise geçmiş yayınlar veya kanal ekranı listelenir.
            </div>
          </div>

          {/* Kick Video Player & Chat Alanı */}
          <div className="overflow-hidden rounded-3xl border-2 border-amber-500/50 bg-black shadow-[0_0_70px_rgba(245,158,11,0.25)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
              {/* Yayın Bölümü */}
              {(activeView === "streamAndChat" || activeView === "streamOnly") && (
                <div
                  className={`relative flex flex-col bg-black ${
                    activeView === "streamOnly" ? "lg:col-span-12" : "lg:col-span-8"
                  }`}
                >
                  <div className="relative aspect-video w-full flex-1 bg-black">
                    <iframe
                      key={`kick-player-${playerKey}`}
                      src="https://player.kick.com/prenshazretleri?autoplay=true&muted=true"
                      title="Prens Hazretleri Kick Canlı Yayını"
                      className="h-full w-full border-0"
                      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                      allowFullScreen
                    />
                  </div>

                  {/* Alt Yayın Bilgi ve Eylem Barı */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-amber-500/20 bg-gradient-to-r from-amber-950/70 via-black to-black px-4 py-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <Crown className="h-4 w-4 text-amber-400" />
                      <span className="font-bold text-amber-300">Prens Hazretleri Canlı Otağı</span>
                      <span className="text-amber-200/40">•</span>
                      <span className="font-semibold text-emerald-400">Resmi Kick Kanalı</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="https://kick.com/prenshazretleri"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/50 bg-emerald-950/80 px-3 py-1.5 text-xs font-bold text-emerald-300 transition hover:bg-emerald-900 hover:text-white"
                      >
                        <span>Kick&apos;te Takip Et</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Sohbet Bölümü */}
              {(activeView === "streamAndChat" || activeView === "chatOnly") && (
                <div
                  className={`flex flex-col border-t border-amber-500/20 bg-[#090b12] lg:border-t-0 lg:border-l ${
                    activeView === "chatOnly" ? "lg:col-span-12 h-[680px]" : "lg:col-span-4 min-h-[520px]"
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-amber-500/20 bg-amber-950/50 px-4 py-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                      <MessageSquare className="h-4 w-4 text-amber-400" />
                      <span>Huzur-u Şahane Sohbeti</span>
                    </div>
                    <button
                      onClick={openPopoutChat}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold underline cursor-pointer"
                    >
                      Ayrı Pencere
                    </button>
                  </div>

                  <div className="relative flex-1 bg-black">
                    <iframe
                      src="https://chat.kick.cx/embed/prenshazretleri"
                      title="Prens Hazretleri Canlı Sohbet"
                      className="h-full w-full border-0"
                    />
                  </div>

                  <div className="border-t border-amber-500/20 bg-black/60 p-2 text-center text-[10px] text-amber-200/50">
                    Sohbet görünmüyorsa reklam engelleyicinizi esnetebilir veya üstteki &quot;Pencerede Sohbet&quot; butonunu kullanabilirsiniz.
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ======================= PRENS'İN AMİRAL ARAÇLARI ======================= */}
        <section className="my-16">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="h-3 w-3" />
              <span>SARAY DONANIMI & LÜTUF SİLAHLARI</span>
            </div>
            <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">
              Prens Hazretleri&apos;nin Bizzat Bahşettiği Araçlar
            </h3>
            <p className="mt-2 text-sm text-amber-200/70">
              Her biri tebaanın günlük hayatını kolaylaştırmak için saray meclisince titizlikle hazırlandı:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ROYAL_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/30 via-black to-black p-5 shadow-lg transition-all hover:-translate-y-1 hover:border-amber-400/80 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 group-hover:bg-amber-500 group-hover:text-black transition">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                      {tool.badge}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-bold text-amber-200 group-hover:text-amber-100 transition">
                      {tool.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-amber-100/70">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:text-amber-300">
                    <span>Aracı Kullan</span>
                    <span>→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ======================= DİLEKÇE & ARZ-I HÂL SANDIĞI ======================= */}
        <section className="my-16 rounded-3xl border-2 border-amber-500/30 bg-gradient-to-b from-[#110f1c] via-black to-[#09080e] p-6 sm:p-10 shadow-[0_0_50px_rgba(245,158,11,0.15)]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Form Alanı */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                <Send className="h-4 w-4" />
                <span>SARAY POSTASI</span>
              </div>
              <h3 className="mt-2 text-2xl font-black text-white">
                Halkın Arz-ı Hâl Sandığı
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-amber-200/70">
                Prens Hazretleri&apos;ne şükranlarınızı bildirmek, yeni bir araç istirham etmek veya ferman talep etmek için divana yazınız:
              </p>

              <form onSubmit={handlePetitionSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    İsminiz / Lakabınız
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder={userTitle || "Örn: Kâtip Ahmed, Mesut Tebaa..."}
                    className="w-full rounded-xl border border-amber-500/30 bg-black/60 px-4 py-2.5 text-xs text-amber-100 placeholder-amber-200/30 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Arzın Mahiyeti
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full rounded-xl border border-amber-500/30 bg-[#0d0f17] px-4 py-2.5 text-xs text-amber-100 focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Lütuf Teşekkürü">Lütuf Teşekkürü</option>
                    <option value="Yeni Araç İstirhamı">Yeni Araç İstirhamı</option>
                    <option value="Kick Yayın Tebriki">Kick Yayın Tebriki</option>
                    <option value="Saray Muhafızlığı Talebi">Saray Muhafızlığı Talebi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Arz-ı Hâliniz (Mesajınız)
                  </label>
                  <textarea
                    rows={3}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Yüce Prens Hazretleri'ne iletmek istediğiniz kelam..."
                    className="w-full rounded-xl border border-amber-500/30 bg-black/60 px-4 py-2.5 text-xs text-amber-100 placeholder-amber-200/30 focus:border-amber-400 focus:outline-none resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl border border-amber-400 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(245,158,11,0.4)] transition hover:scale-[1.02] active:scale-98 cursor-pointer"
                >
                  Huzur-u Şahaneye Arz Et 📜
                </button>

                {petitionSubmitted && (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/60 p-3 text-center text-xs font-bold text-emerald-300">
                    ✓ Arz-ı hâliniz divan kâtibine ulaştırıldı ve deftere kaydedildi!
                  </div>
                )}
              </form>
            </div>

            {/* Listelenen Dilekçeler */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase">
                    <Scroll className="h-4 w-4 text-amber-400" />
                    <span>Divan Defterine Kayıtlı Dilekçeler</span>
                  </div>
                  <span className="text-[11px] text-amber-200/50">
                    Toplam {petitions.length} Kayıt
                  </span>
                </div>

                <div className="mt-4 space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {petitions.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4 transition hover:border-amber-500/40"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-amber-200 text-xs">{p.author}</span>
                          <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] text-amber-300/80">
                            {p.role}
                          </span>
                        </div>
                        <span className="rounded border border-amber-500/30 bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                          {p.type}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-amber-100/80">
                        &ldquo;{p.message}&rdquo;
                      </p>
                      <div className="mt-2 text-right text-[10px] text-amber-200/40">
                        {p.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 text-center text-[11px] text-amber-200/40">
                Prens Hazretleri gelen tüm arz-ı hâlleri bizzat mütalaa etmektedir.
              </div>
            </div>
          </div>
        </section>

        {/* ======================= YAYIN TAKVİMİ & SARAY LUGATI ======================= */}
        <div className="my-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Canlı Yayın Takvimi */}
          <div className="lg:col-span-5 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/30 via-black to-black p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Calendar className="h-4 w-4" />
              <span>FERMAN VE YAYIN SAATLERİ</span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-white">
              Haftalık Canlı Yayın Otağı
            </h3>
            <p className="mt-1 text-xs text-amber-200/70">
              Kick üzerinden icra edilen meclis programı:
            </p>

            <div className="mt-6 space-y-3 text-xs">
              <div className="rounded-xl border border-amber-500/20 bg-amber-950/30 p-3">
                <div className="flex items-center justify-between font-bold text-amber-300">
                  <span>Huzur-u Hümayun Hasbihali</span>
                  <span className="text-[10px] text-emerald-400">Hafta İçi Akşamları</span>
                </div>
                <p className="mt-1 text-amber-100/70 text-[11px]">
                  Tebaa ile sohbet, dert dinleme ve yeni araçların duyurulması.
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-950/30 p-3">
                <div className="flex items-center justify-between font-bold text-amber-300">
                  <span>Cihan Fetihleri & Oyun Gecesi</span>
                  <span className="text-[10px] text-emerald-400">Hafta Sonu</span>
                </div>
                <p className="mt-1 text-amber-100/70 text-[11px]">
                  Yüce Prens&apos;in oyun dünyasındaki zaferleri ve rekabet dolu anlar.
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-950/30 p-3">
                <div className="flex items-center justify-between font-bold text-amber-300">
                  <span>Sürpriz Ferman Yayınları</span>
                  <span className="text-[10px] text-amber-400">Özel Bildirimle</span>
                </div>
                <p className="mt-1 text-amber-100/70 text-[11px]">
                  Halka lütuf ihsan edilen özel gün ve saatler.
                </p>
              </div>
            </div>

            <a
              href="https://kick.com/prenshazretleri"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-950/70 py-2.5 text-xs font-bold text-emerald-300 transition hover:bg-emerald-900/80 hover:text-white"
            >
              <Tv className="h-4 w-4" />
              <span>Kick&apos;te Takip Et & Bildirim Zilini Aç</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Saray Lugatı (Prens Sözlüğü) */}
          <div className="lg:col-span-7 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#0f0b18] via-black to-black p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-amber-400">
              <BookOpen className="h-4 w-4" />
              <span>SALTANAT LUGATI</span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-white">
              Prens Hazretleri&apos;nin Saray Jargonu
            </h3>
            <p className="mt-1 text-xs text-amber-200/70">
              Diyarda ve Kick yayın meclisinde sıklıkla telaffuz edilen kelimelerin hikmeti:
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {LUGAT_TERMS.map((item) => (
                <div
                  key={item.term}
                  className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3"
                >
                  <div className="font-bold text-amber-300 text-xs">
                    📜 {item.term}
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-amber-100/70">
                    {item.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ======================= 4 BÜYÜK SALTANAT İLKESİ ======================= */}
        <section className="mt-16">
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-black text-amber-300 sm:text-3xl">
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
                Diyarın en mahir zanaatkârları tarafından dokunmuş kodlarla tüm dönüşümler göz açıp kapayıncaya kadar biter.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/30 to-black/80 p-6 text-center shadow-lg transition hover:border-amber-400/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                <Crown className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-amber-200">Halkın Hizmetinde</h4>
              <p className="mt-2 text-xs text-amber-100/70">
                35&apos;i aşkın araçla zanaatkârdan öğrenciye tüm halkın bilişim ihtiyaçları tek bir çatı altında toplanmıştır.
              </p>
            </div>
          </div>
        </section>

        {/* ======================= ALT AKSİYON & DÖNÜŞÜM ======================= */}
        <footer className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#araclar"
              className="inline-flex items-center gap-2 rounded-2xl border border-amber-400/80 bg-gradient-to-r from-amber-500 to-yellow-500 px-7 py-4 text-sm font-extrabold uppercase tracking-wider text-black shadow-[0_0_35px_rgba(245,158,11,0.5)] transition hover:scale-105"
            >
              <Crown className="h-4 w-4" />
              <span>Prens&apos;in Araçlarını Kullanmaya Başla</span>
            </Link>

            <a
              href="https://kick.com/prenshazretleri"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/60 bg-emerald-950/80 px-7 py-4 text-sm font-bold text-emerald-300 transition hover:bg-emerald-900 hover:text-white hover:scale-105"
            >
              <Tv className="h-4 w-4" />
              <span>Kick Yayınına Teşrif Et</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <p className="mt-8 text-xs text-amber-200/50">
            TurkConvert • Yüce Prens Hazretleri Tarafından Aziz Milletine Bahşedilmiş Ebedi Eserdir.
          </p>
        </footer>
      </div>
    </div>
  );
}
