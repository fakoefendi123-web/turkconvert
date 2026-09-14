"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  Download,
  Shuffle,
  Palette,
  Share2,
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

// Hazır Ferman Şablonları (Görsel İçin)
const FERMAN_PRESETS = [
  {
    label: "Biat ve Sadakat Yemini",
    text: "Yüce Prens Hazretleri'nin sarsılmaz adaletine ve şanlı dijital saltanatına biat eder; TurkConvert diyarındaki lütufları için şükranlarımı sunarım. Varlığım saltanatına armağan olsun!",
  },
  {
    label: "0 Akçe Lütuf Teşekkürü",
    text: "Tüm dosya dönüştürme ve evrak işlerimizi hiçbir akçe ve vergi talep etmeden şimşek hızında çözen Prens Hazretleri'ne minnettarız. Lütfunuz ve saltanatınız daim olsun!",
  },
  {
    label: "Kick Otağı Cihan Meydanı",
    text: "Kick canlı yayın otağında fetihler yapan, düşmanlara göz açtırmayan Yüce Prens'in arkasında dağ gibi duran sadık tebaasıyız! Chat meclisi emrinizdedir.",
  },
  {
    label: "Devlet-i Bilişim Fermanı",
    text: "Bu ferman ile ilan olunur ki; TurkConvert'te yabancı sunucu zulmü yoktur. Tüm pikseller hür, tüm evraklar mahremdir. Halka hizmet Hakka hizmettir!",
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

  // Otomatik Ferman Görseli Durumları
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [authorName, setAuthorName] = useState("Kâtip Ahmed Efendi");
  const [selectedPreset, setSelectedPreset] = useState("Biat ve Sadakat Yemini");
  const [fermanMessage, setFermanMessage] = useState(FERMAN_PRESETS[0].text);
  const [parchmentTheme, setParchmentTheme] = useState<"royalGold" | "imperialPurple" | "antiqueScroll">("royalGold");
  const [copiedFermanText, setCopiedFermanText] = useState(false);
  const [downloading, setDownloading] = useState(false);

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

      if (savedCount) setBiatCount(parseInt(savedCount, 10));
      if (savedBiat === "true") setHasBiat(true);
      if (savedTitle) {
        setUserTitle(savedTitle);
        setAuthorName(savedTitle);
      }
    } catch {}
  }, []);

  // Biat Etme & Berat Alma İşlemi
  const handleBiat = () => {
    playFanfare();
    const newCount = biatCount + 1;
    setBiatCount(newCount);
    setHasBiat(true);

    let assignedTitle = userTitle;
    if (!assignedTitle) {
      const randomIdx = Math.floor(Math.random() * ROYAL_TITLES.length);
      assignedTitle = ROYAL_TITLES[randomIdx];
      setUserTitle(assignedTitle);
      setAuthorName(assignedTitle);
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

  // ======================= CANVAS FERMAN ÇİZİMİ =======================
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 1080;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;

    // 1. Arka Plan Gradyanı
    let bgGrad = ctx.createLinearGradient(0, 0, W, H);
    if (parchmentTheme === "royalGold") {
      bgGrad.addColorStop(0, "#0c0a12");
      bgGrad.addColorStop(0.35, "#171206");
      bgGrad.addColorStop(0.7, "#1e1605");
      bgGrad.addColorStop(1, "#0a0810");
    } else if (parchmentTheme === "imperialPurple") {
      bgGrad.addColorStop(0, "#0e0618");
      bgGrad.addColorStop(0.4, "#220c36");
      bgGrad.addColorStop(0.75, "#150722");
      bgGrad.addColorStop(1, "#08040d");
    } else {
      bgGrad.addColorStop(0, "#191309");
      bgGrad.addColorStop(0.45, "#271c0d");
      bgGrad.addColorStop(0.8, "#1f1609");
      bgGrad.addColorStop(1, "#110b04");
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Vinyet ve Işık Aurası
    const radial = ctx.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, 650);
    radial.addColorStop(0, "rgba(245, 158, 11, 0.18)");
    radial.addColorStop(0.6, "rgba(0, 0, 0, 0.2)");
    radial.addColorStop(1, "rgba(0, 0, 0, 0.75)");
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, W, H);

    // 3. Altın Varaklı Kenarlıklar
    // Dış Kalın Çerçeve
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#f59e0b";
    ctx.strokeRect(36, 36, W - 72, H - 72);

    // Orta İnce Çerçeve
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#d97706";
    ctx.strokeRect(52, 52, W - 104, H - 104);

    // İç Zarif Çerçeve
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#fbbf24";
    ctx.strokeRect(62, 62, W - 124, H - 124);

    // Köşe Süslemeleri (Altın Baklavalar)
    const corners = [
      { x: 52, y: 52 },
      { x: W - 52, y: 52 },
      { x: 52, y: H - 52 },
      { x: W - 52, y: H - 52 },
    ];
    ctx.fillStyle = "#f59e0b";
    corners.forEach((c) => {
      ctx.beginPath();
      ctx.moveTo(c.x, c.y - 12);
      ctx.lineTo(c.x + 12, c.y);
      ctx.lineTo(c.x, c.y + 12);
      ctx.lineTo(c.x - 12, c.y);
      ctx.closePath();
      ctx.fill();
    });

    // 4. Üst Taç & Başlık
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Taç İkonu (Büyük Altın Parıltı)
    ctx.shadowColor = "#f59e0b";
    ctx.shadowBlur = 24;
    ctx.font = "72px 'Segoe UI Emoji', 'Apple Color Emoji', serif";
    ctx.fillText("👑", W / 2, 140);
    ctx.shadowBlur = 0;

    // "PRENS HAZRETLERİ"
    const textGrad = ctx.createLinearGradient(W / 2 - 250, 0, W / 2 + 250, 0);
    textGrad.addColorStop(0, "#fef3c7");
    textGrad.addColorStop(0.5, "#fcd34d");
    textGrad.addColorStop(1, "#f59e0b");
    ctx.fillStyle = textGrad;
    ctx.font = "900 46px 'Times New Roman', Georgia, serif";
    ctx.fillText("PRENS HAZRETLERİ", W / 2, 220);

    // "F E R M A N - I   H Ü M A Y U N"
    ctx.fillStyle = "#fde68a";
    ctx.font = "bold 20px 'Times New Roman', Georgia, serif";
    ctx.fillText("✦  F E R M A N - I   H Ü M A Y U N  ✦", W / 2, 265);

    // Zarif Çizgi
    ctx.beginPath();
    ctx.moveTo(W / 2 - 240, 295);
    ctx.lineTo(W / 2 + 240, 295);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(245, 158, 11, 0.6)";
    ctx.stroke();

    // 5. Tebaa ve Muhatap Şeridi
    ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(130, 330, W - 260, 95, 16);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillStyle = "#f59e0b";
    ctx.font = "bold 15px sans-serif";
    ctx.fillText("TEBAA-İ SADIK VE DİVAN RÜTBESİ", W / 2, 360);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 25px 'Times New Roman', Georgia, serif";
    ctx.fillText(authorName || "👑 Sadık Bir Tebaa", W / 2, 395);

    // 6. Ferman Metni (Ortada Şık Parşömen Yazısı)
    ctx.fillStyle = "#fef3c7";
    ctx.font = "italic 32px 'Times New Roman', Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const textToWrap = `“ ${fermanMessage.trim()} ”`;
    const maxWidth = 800;
    const lineHeight = 50;

    // Metin Sarma Algoritması
    const words = textToWrap.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + words[i] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        lines.push(currentLine.trim());
        currentLine = words[i] + " ";
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine.trim()) {
      lines.push(currentLine.trim());
    }

    // Ortala ve Yazdır
    const startY = 560 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, idx) => {
      ctx.fillText(line, W / 2, startY + idx * lineHeight);
    });

    // 7. Sol Alt: Tarih ve TurConvert İmzası
    ctx.textAlign = "left";
    ctx.fillStyle = "#fbbf24";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("MÜHÜR VE TANZİM TARİHİ", 140, 895);

    const todayStr = new Date().toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    ctx.fillStyle = "#fde68a";
    ctx.font = "17px 'Times New Roman', Georgia, serif";
    ctx.fillText(todayStr + " • Cihan Meclisi", 140, 925);

    ctx.fillStyle = "rgba(254, 243, 199, 0.6)";
    ctx.font = "14px monospace";
    ctx.fillText("turkconvert.online/prens-hazretleri", 140, 955);

    // 8. Sağ Alt: Orijinal Kırmızı Saray Mührü (Tuğra Damgası)
    const sealX = W - 230;
    const sealY = 915;
    const sealR = 75;

    ctx.save();
    ctx.translate(sealX, sealY);
    ctx.rotate(-0.1); // Gerçek ıslak mühür gibi hafif eğik

    // Dış kırmızı halka
    ctx.beginPath();
    ctx.arc(0, 0, sealR, 0, Math.PI * 2);
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 4;
    ctx.shadowColor = "#dc2626";
    ctx.shadowBlur = 14;
    ctx.stroke();

    // İç kesikli halka
    ctx.beginPath();
    ctx.arc(0, 0, sealR - 8, 0, Math.PI * 2);
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = "#f87171";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);

    // Mühür Yazıları
    ctx.fillStyle = "#fca5a5";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("PRENS HAZRETLERİ", 0, -sealR + 24);
    ctx.fillText("TURKCONVERT", 0, sealR - 24);

    // Mühür Ortası
    ctx.font = "26px serif";
    ctx.fillText("👑", 0, -4);
    ctx.font = "bold 11px sans-serif";
    ctx.fillText("BİAT KILINDI", 0, 24);

    ctx.restore();

    // 9. En Alt Saltanat Sloganı
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(245, 158, 11, 0.75)";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText("✦ YÜCE PRENS HAZRETLERİ TARAFINDAN HALKINA BİLABEDEL BAHŞEDİLMİŞTİR ✦", W / 2, 1030);
  }, [authorName, fermanMessage, parchmentTheme]);

  // Her parametre değişiminde Canvas'ı yeniden çiz
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Şablon Seçimi
  const handleSelectPreset = (presetLabel: string) => {
    setSelectedPreset(presetLabel);
    const found = FERMAN_PRESETS.find((p) => p.label === presetLabel);
    if (found) {
      setFermanMessage(found.text);
    }
  };

  // Rastgele Ferman Üret
  const handleRandomizeFerman = () => {
    const randomPreset = FERMAN_PRESETS[Math.floor(Math.random() * FERMAN_PRESETS.length)];
    setSelectedPreset(randomPreset.label);
    setFermanMessage(randomPreset.text);
    const themes: ("royalGold" | "imperialPurple" | "antiqueScroll")[] = ["royalGold", "imperialPurple", "antiqueScroll"];
    setParchmentTheme(themes[Math.floor(Math.random() * themes.length)]);
    playFanfare();
  };

  // Fermanı Görsel Olarak İndir (PNG)
  const handleDownloadFerman = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDownloading(true);
    playFanfare();

    setTimeout(() => {
      const link = document.createElement("a");
      const safeAuthor = (authorName || "Tebaa").replace(/[^a-zA-Z0-9]/g, "_");
      link.download = `Prens-Hazretleri-Fermani-${safeAuthor}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setDownloading(false);
    }, 200);
  };

  // Metni Panoya Kopyala
  const handleCopyFermanText = () => {
    const fullText = `📜 [PRENS HAZRETLERİ FERMANI] 👑\nTebaa: ${authorName}\n"${fermanMessage}"\n(turkconvert.online/prens-hazretleri • Kick.com/prenshazretleri)`;
    navigator.clipboard?.writeText(fullText);
    setCopiedFermanText(true);
    setTimeout(() => setCopiedFermanText(false), 2500);
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

        {/* ======================= SARAY FERMANI MATBAASI (OTOMATİK RESİM ÜRETİCİ) ======================= */}
        <section className="my-16 rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-[#120e1f] via-black to-[#0a0810] p-6 sm:p-10 shadow-[0_0_60px_rgba(245,158,11,0.25)]">
          <div className="mb-8 text-center sm:text-left flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                <Scroll className="h-4 w-4 text-amber-400" />
                <span>SARAY FERMAN MATBAASI</span>
              </div>
              <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Kişiye Özel Fermanını Üret & İndir 🖼️
              </h3>
              <p className="mt-1 text-xs text-amber-200/70">
                Yazdığınız ferman anında altın mühürlü, yüksek çözünürlüklü (1080x1080) bir saltanat görseline dönüşür:
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleRandomizeFerman}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/15 px-3.5 py-2 text-xs font-bold text-amber-300 transition hover:bg-amber-500/25 cursor-pointer"
              >
                <Shuffle className="h-3.5 w-3.5" />
                <span>Rastgele Asil Ferman</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
            {/* Sol Sütun: Form Ayarları */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                  Ferman Sahibi (İsminiz veya Unvanınız)
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Örn: Kâtip Ahmed, Cihan Muhafızı Selim..."
                  className="w-full rounded-xl border border-amber-500/30 bg-black/70 px-4 py-2.5 text-xs text-amber-100 placeholder-amber-200/30 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                  Hazır Ferman Şablonu
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {FERMAN_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => handleSelectPreset(p.label)}
                      className={`rounded-xl border p-2.5 text-left text-xs font-medium transition cursor-pointer ${
                        selectedPreset === p.label
                          ? "border-amber-400 bg-amber-500/20 text-amber-200 shadow-sm"
                          : "border-amber-500/20 bg-black/40 text-amber-100/60 hover:bg-amber-950/40 hover:text-amber-200"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                  Ferman Metni (Görselde Görünecek Kelam)
                </label>
                <textarea
                  rows={4}
                  value={fermanMessage}
                  onChange={(e) => setFermanMessage(e.target.value)}
                  placeholder="Prens Hazretleri için beyan etmek istediğiniz ferman..."
                  className="w-full rounded-xl border border-amber-500/30 bg-black/70 p-4 text-xs text-amber-100 placeholder-amber-200/30 focus:border-amber-400 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-amber-300 mb-1.5 flex items-center gap-1.5">
                  <Palette className="h-3.5 w-3.5 text-amber-400" />
                  <span>Parşömen Teması</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setParchmentTheme("royalGold")}
                    className={`flex-1 rounded-xl border py-2 text-xs font-bold transition cursor-pointer ${
                      parchmentTheme === "royalGold"
                        ? "border-amber-400 bg-amber-500 text-black shadow-md"
                        : "border-amber-500/30 bg-black/50 text-amber-200 hover:bg-amber-950/40"
                    }`}
                  >
                    Altın Obsidyen
                  </button>
                  <button
                    type="button"
                    onClick={() => setParchmentTheme("imperialPurple")}
                    className={`flex-1 rounded-xl border py-2 text-xs font-bold transition cursor-pointer ${
                      parchmentTheme === "imperialPurple"
                        ? "border-purple-400 bg-purple-600 text-white shadow-md"
                        : "border-purple-500/30 bg-black/50 text-purple-200 hover:bg-purple-950/40"
                    }`}
                  >
                    Asil Mor
                  </button>
                  <button
                    type="button"
                    onClick={() => setParchmentTheme("antiqueScroll")}
                    className={`flex-1 rounded-xl border py-2 text-xs font-bold transition cursor-pointer ${
                      parchmentTheme === "antiqueScroll"
                        ? "border-amber-600 bg-amber-800 text-amber-100 shadow-md"
                        : "border-amber-700/30 bg-black/50 text-amber-200 hover:bg-amber-950/40"
                    }`}
                  >
                    Antik Parşömen
                  </button>
                </div>
              </div>

              {/* Aksiyon Butonları */}
              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleDownloadFerman}
                  disabled={downloading}
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 py-3.5 px-4 text-xs font-black uppercase tracking-wider text-black shadow-[0_0_25px_rgba(245,158,11,0.5)] transition hover:scale-102 active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  <span>{downloading ? "Ferman Basılıyor..." : "Fermanı Resim Olarak İndir (PNG)"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyFermanText}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-950/60 px-4 py-3.5 text-xs font-bold text-amber-300 transition hover:bg-amber-900/60 cursor-pointer"
                >
                  {copiedFermanText ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  <span>{copiedFermanText ? "Metin Kopyalandı!" : "Metni Kopyala"}</span>
                </button>

                <button
                  type="button"
                  onClick={openPopoutChat}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/60 px-4 py-3.5 text-xs font-bold text-emerald-300 transition hover:bg-emerald-900/60 cursor-pointer"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Kick&apos;te Paylaş</span>
                </button>
              </div>

              <p className="text-[11px] text-amber-200/50 leading-relaxed">
                İndirdiğiniz fermanı Kick canlı yayın sohbetinde, Discord sunucularında veya sosyal medyada paylaşarak Prens Hazretleri&apos;ne sadakatinizi ilan edebilirsiniz.
              </p>
            </div>

            {/* Sağ Sütun: Canlı Tuval Önizlemesi */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[460px] aspect-square rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.3)] bg-black">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-contain cursor-pointer transition hover:scale-[1.01]"
                  title="Ferman Önizlemesi - Tıklayarak İndirebilirsiniz"
                  onClick={handleDownloadFerman}
                />
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-amber-300 font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-spin" />
                <span>1080x1080 Yüksek Kalite Tuval • İndirmeye Hazır</span>
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
