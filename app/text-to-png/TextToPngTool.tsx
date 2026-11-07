"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Download,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  Type,
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  FileImage,
  Palette,
  Terminal,
  Quote,
  Layers,
  ShieldCheck,
  Eye,
} from "lucide-react";

type BgType = "transparent" | "solid" | "gradient";
type AspectRatio = "auto" | "1:1" | "16:9" | "9:16" | "banner";

interface GradientPreset {
  id: string;
  name: string;
  colors: string[];
  suggestedTextColor: string;
}

const GRADIENTS: GradientPreset[] = [
  {
    id: "violet-glow",
    name: "Mor Nebula",
    colors: ["#3b0764", "#6d28d9", "#db2777"],
    suggestedTextColor: "#ffffff",
  },
  {
    id: "sunset",
    name: "Gün Batımı",
    colors: ["#c2410c", "#e11d48", "#7c3aed"],
    suggestedTextColor: "#ffffff",
  },
  {
    id: "cyberpunk",
    name: "Siber Mavi",
    colors: ["#0e7490", "#2563eb", "#7e22ce"],
    suggestedTextColor: "#ffffff",
  },
  {
    id: "emerald-deep",
    name: "Zümrüt Derinlik",
    colors: ["#064e3b", "#047857", "#059669"],
    suggestedTextColor: "#ffffff",
  },
  {
    id: "obsidian-dark",
    name: "Gece Obsidyen",
    colors: ["#09090b", "#18181b", "#27272a"],
    suggestedTextColor: "#ffffff",
  },
  {
    id: "warm-paper",
    name: "Nostaljik Kitap",
    colors: ["#fef3c7", "#fde68a", "#fef9c3"],
    suggestedTextColor: "#451a03",
  },
];

const FONTS = [
  { id: "inter", name: "Modern Sans (Inter)", font: "'Inter', system-ui, -apple-system, sans-serif" },
  { id: "serif", name: "Zarif Serif (Playfair / Georgia)", font: "'Playfair Display', Georgia, Cambria, serif" },
  { id: "mono", name: "Kod / Terminal (Fira / Consolas)", font: "'Fira Code', Consolas, Monaco, monospace" },
  { id: "cursive", name: "El Yazısı / Cursive", font: "'Caveat', 'Brush Script MT', cursive" },
  { id: "impact", name: "Display / Kalın Başlık", font: "'Impact', 'Arial Black', sans-serif" },
];

const SAMPLE_TEXTS = [
  {
    text: "Hayatta en hakiki mürşit ilimdir, fendir.",
    author: "Mustafa Kemal Atatürk",
  },
  {
    text: "Güzelliğin on par'etmez\nBu bendeki aşk olmasa.",
    author: "Âşık Veysel",
  },
  {
    text: "const success = (effort, consistency) => {\n  return effort * Math.pow(consistency, 2);\n};",
    author: "developer.ts",
  },
  {
    text: "Sadelik, gelişmişliğin en üst noktasıdır.",
    author: "Leonardo da Vinci",
  },
  {
    text: "Yolun ucunun nereye varacağını düşünmek beyhude bir çabadan ibarettir.",
    author: "Şems-i Tebrîzî",
  },
];

export default function TextToPngTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Metin Durumları
  const [text, setText] = useState<string>("Hayatta en hakiki mürşit ilimdir, fendir.");
  const [author, setAuthor] = useState<string>("Mustafa Kemal Atatürk");
  const [showAuthor, setShowAuthor] = useState<boolean>(true);
  const [showQuoteMarks, setShowQuoteMarks] = useState<boolean>(true);

  // Tipografi
  const [fontFamily, setFontFamily] = useState<string>(FONTS[0].font);
  const [fontSize, setFontSize] = useState<number>(36);
  const [fontWeight, setFontWeight] = useState<string>("700");
  const [fontStyle, setFontStyle] = useState<"normal" | "italic">("normal");
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("center");
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [lineHeight, setLineHeight] = useState<number>(1.4);

  // Arka Plan & Çerçeve
  const [bgType, setBgType] = useState<BgType>("gradient");
  const [solidColor, setSolidColor] = useState<string>("#0f172a");
  const [gradientId, setGradientId] = useState<string>("violet-glow");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("auto");
  const [padding, setPadding] = useState<number>(56);
  const [borderRadius, setBorderRadius] = useState<number>(24);
  const [showWindowHeader, setShowWindowHeader] = useState<boolean>(false);
  const [windowTitle, setWindowTitle] = useState<string>("turkconvert.png");

  // Dışa Aktarma
  const [exportScale, setExportScale] = useState<number>(2); // 1x, 2x Retina, 3x Ultra
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string>("");
  const [renderedDimensions, setRenderedDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  // Hazır Şablonlar (1 Tıkla Tarz Değiştirme)
  const applyPreset = (presetName: string) => {
    if (presetName === "transparent-sticker") {
      setBgType("transparent");
      setTextColor("#0f172a");
      setAspectRatio("auto");
      setPadding(28);
      setShowQuoteMarks(false);
      setShowAuthor(false);
      setShowWindowHeader(false);
      setFontFamily(FONTS[0].font);
      setFontWeight("800");
    } else if (presetName === "quote-card") {
      setBgType("gradient");
      setGradientId("violet-glow");
      setTextColor("#ffffff");
      setAspectRatio("1:1");
      setPadding(64);
      setShowQuoteMarks(true);
      setShowAuthor(true);
      setShowWindowHeader(false);
      setFontFamily(FONTS[1].font);
      setTextAlign("center");
      setFontWeight("700");
    } else if (presetName === "code-window") {
      setBgType("solid");
      setSolidColor("#090d16");
      setTextColor("#38bdf8");
      setAspectRatio("auto");
      setPadding(48);
      setShowQuoteMarks(false);
      setShowAuthor(false);
      setShowWindowHeader(true);
      setFontFamily(FONTS[2].font);
      setTextAlign("left");
      setFontWeight("500");
    } else if (presetName === "classic-book") {
      setBgType("gradient");
      setGradientId("warm-paper");
      setTextColor("#451a03");
      setAspectRatio("auto");
      setPadding(60);
      setShowQuoteMarks(true);
      setShowAuthor(true);
      setShowWindowHeader(false);
      setFontFamily(FONTS[1].font);
      setTextAlign("center");
      setFontWeight("600");
    } else if (presetName === "dark-minimal") {
      setBgType("solid");
      setSolidColor("#0a0a0c");
      setTextColor("#f8fafc");
      setAspectRatio("16:9");
      setPadding(56);
      setShowQuoteMarks(false);
      setShowAuthor(true);
      setShowWindowHeader(false);
      setFontFamily(FONTS[0].font);
      setTextAlign("center");
      setFontWeight("700");
    }
  };

  const handleRandomSample = () => {
    const random = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setText(random.text);
    setAuthor(random.author);
  };

  // Canvas Çizim Motoru
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = exportScale;
    const basePadding = padding;

    // Satır sarma algoritması
    const maxTextWidth = aspectRatio === "auto" ? 800 : (
      aspectRatio === "1:1" ? 900 :
      aspectRatio === "16:9" ? 1000 :
      aspectRatio === "9:16" ? 850 : 1000
    );

    ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;

    const rawLines = text.split("\n");
    const wrappedLines: string[] = [];

    rawLines.forEach((rawLine) => {
      if (rawLine.trim() === "") {
        wrappedLines.push("");
        return;
      }
      const words = rawLine.split(" ");
      let currentLine = "";

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
        const testWidth = ctx.measureText(testLine).width;

        if (testWidth > maxTextWidth && currentLine !== "") {
          wrappedLines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) {
        wrappedLines.push(currentLine);
      }
    });

    // Genişlik ve Yükseklik hesaplaması
    let longestLineWidth = 0;
    wrappedLines.forEach((l) => {
      const w = ctx.measureText(l).width;
      if (w > longestLineWidth) longestLineWidth = w;
    });

    const effectiveLineHeight = fontSize * lineHeight;
    const textBlockHeight = wrappedLines.length * effectiveLineHeight;

    const authorHeight = showAuthor && author.trim() ? fontSize * 1.2 : 0;
    const headerHeight = showWindowHeader ? 44 : 0;
    const quoteTopMargin = showQuoteMarks ? 28 : 0;

    let targetWidth: number;
    let targetHeight: number;

    if (aspectRatio === "auto") {
      targetWidth = Math.max(360, longestLineWidth + basePadding * 2);
      targetHeight = textBlockHeight + authorHeight + headerHeight + quoteTopMargin + basePadding * 2;
    } else if (aspectRatio === "1:1") {
      targetWidth = 1080;
      targetHeight = 1080;
    } else if (aspectRatio === "16:9") {
      targetWidth = 1200;
      targetHeight = 675;
    } else if (aspectRatio === "9:16") {
      targetWidth = 1080;
      targetHeight = 1920;
    } else {
      // Banner
      targetWidth = 1200;
      targetHeight = 400;
    }

    setRenderedDimensions({ width: targetWidth * scale, height: targetHeight * scale });

    // Canvas boyutlandırma
    canvas.width = targetWidth * scale;
    canvas.height = targetHeight * scale;

    ctx.save();
    ctx.scale(scale, scale);

    // 1. Arka Plan Çizimi
    ctx.clearRect(0, 0, targetWidth, targetHeight);

    if (bgType !== "transparent") {
      const radius = borderRadius;
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(targetWidth - radius, 0);
      ctx.quadraticCurveTo(targetWidth, 0, targetWidth, radius);
      ctx.lineTo(targetWidth, targetHeight - radius);
      ctx.quadraticCurveTo(targetWidth, targetHeight, targetWidth - radius, targetHeight);
      ctx.lineTo(radius, targetHeight);
      ctx.quadraticCurveTo(0, targetHeight, 0, targetHeight - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();

      if (bgType === "solid") {
        ctx.fillStyle = solidColor;
      } else {
        const activeGrad = GRADIENTS.find((g) => g.id === gradientId) || GRADIENTS[0];
        const gradient = ctx.createLinearGradient(0, 0, targetWidth, targetHeight);
        const count = activeGrad.colors.length;
        activeGrad.colors.forEach((col, idx) => {
          gradient.addColorStop(idx / (count - 1), col);
        });
        ctx.fillStyle = gradient;
      }
      ctx.fill();
    }

    // 2. macOS Pencere Başlığı (Terminal / Kod Modu)
    let contentStartY = basePadding;
    if (showWindowHeader) {
      const barY = 24;
      // Kırmızı, Sarı, Yeşil butonlar
      const dotRadius = 6;
      const dots = ["#ff5f56", "#ffbd2e", "#27c93f"];
      dots.forEach((dotColor, idx) => {
        ctx.beginPath();
        ctx.arc(basePadding + idx * 18, barY, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      });

      if (windowTitle) {
        ctx.font = `500 12px ${FONTS[2].font}`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.textAlign = "center";
        ctx.fillText(windowTitle, targetWidth / 2, barY + 4);
      }

      contentStartY += headerHeight;
    }

    // 3. İçerik Konumlandırma
    const availableHeight = targetHeight - contentStartY - basePadding;
    const contentTotalHeight = textBlockHeight + authorHeight + quoteTopMargin;

    let startY = contentStartY + (aspectRatio === "auto" ? 0 : Math.max(0, (availableHeight - contentTotalHeight) / 2));

    // 4. Tırnak İşareti
    if (showQuoteMarks) {
      ctx.font = `italic 700 48px ${FONTS[1].font}`;
      ctx.fillStyle = textColor;
      ctx.globalAlpha = 0.25;
      const quoteX = textAlign === "center" ? targetWidth / 2 : (textAlign === "left" ? basePadding : targetWidth - basePadding);
      ctx.textAlign = textAlign;
      ctx.fillText("“", quoteX, startY + 24);
      ctx.globalAlpha = 1.0;
      startY += quoteTopMargin;
    }

    // 5. Metin Çizimi
    ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = textColor;
    ctx.textAlign = textAlign;

    let textX = basePadding;
    if (textAlign === "center") textX = targetWidth / 2;
    if (textAlign === "right") textX = targetWidth - basePadding;

    let currentY = startY + fontSize;

    wrappedLines.forEach((line) => {
      if (line) {
        ctx.fillText(line, textX, currentY);
      }
      currentY += effectiveLineHeight;
    });

    // 6. Yazar / Alt Satır Çizimi
    if (showAuthor && author.trim()) {
      currentY += 12;
      ctx.font = `italic 500 ${Math.max(14, fontSize * 0.45)}px ${fontFamily}`;
      ctx.fillStyle = textColor;
      ctx.globalAlpha = 0.75;
      ctx.textAlign = textAlign;
      ctx.fillText(`— ${author.trim()}`, textX, currentY);
      ctx.globalAlpha = 1.0;
    }

    ctx.restore();
  }, [
    text,
    author,
    showAuthor,
    showQuoteMarks,
    fontFamily,
    fontSize,
    fontWeight,
    fontStyle,
    textAlign,
    textColor,
    lineHeight,
    bgType,
    solidColor,
    gradientId,
    aspectRatio,
    padding,
    borderRadius,
    showWindowHeader,
    windowTitle,
    exportScale,
  ]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // PNG İndirme Fonksiyonu
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const safeTitle = (author || "metin").toLowerCase().replace(/[^a-z0-9]/g, "_").slice(0, 15);
      a.download = `turkconvert_${safeTitle}_${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  // Panoya Kopyalama Fonksiyonu
  const handleCopyClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          // Modern Clipboard Item API
          const item = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([item]);
          setIsCopied(true);
          setCopyFeedback("Resim panoya kopyalandı!");
          setTimeout(() => {
            setIsCopied(false);
            setCopyFeedback("");
          }, 2500);
        } catch {
          // Desteklenmeyen tarayıcılar için indirme fallback'i
          handleDownload();
          setCopyFeedback("Panoya kopyalama desteklenmedi, dosya indirildi.");
          setTimeout(() => setCopyFeedback(""), 3000);
        }
      }, "image/png");
    } catch {
      handleDownload();
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Hızlı Şablon Butonları (1 Tıkla Tarz Değiştir) */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur-md dark:border-white/10 dark:bg-obsidian-900/60">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
            <Sparkles className="h-4 w-4 text-primary-500" />
            <span>Hazır Stil Şablonları</span>
          </span>
          <button
            onClick={handleRandomSample}
            className="flex items-center gap-1 text-[11px] font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Örnek Söz Yükle</span>
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {[
            { id: "transparent-sticker", label: "🌟 Şeffaf Çıkartma", desc: "Arka plansız PNG" },
            { id: "quote-card", label: "📱 Instagram Alıntı", desc: "1:1 Modern gradyan" },
            { id: "code-window", label: "💻 Terminal / Kod", desc: "macOS pencere stili" },
            { id: "classic-book", label: "📜 Edebi Alıntı", desc: "Sıcak nostaljik kağıt" },
            { id: "dark-minimal", label: "🖤 Minimal Koyu", desc: "16:9 Mat karanlık" },
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset.id)}
              className="rounded-xl border border-slate-200/70 bg-white/80 p-2.5 text-left transition hover:border-primary-400 hover:bg-primary-50/30 hover:shadow-2xs dark:border-white/10 dark:bg-obsidian-850 dark:hover:border-primary-500/50"
            >
              <span className="block text-xs font-bold text-slate-900 dark:text-white">
                {preset.label}
              </span>
              <span className="mt-0.5 block text-[10px] text-slate-400">
                {preset.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2 Kolonlu Ana Çalışma Alanı: Sol Ayarlar, Sağ Canlı Önizleme */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Sol Kolon: Kontroller (7 Kolon) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Metin Giriş Kartı */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/70 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Type className="h-4 w-4 text-primary-500" />
                  <span>Dönüştürülecek Metin</span>
                </span>
                <span className="text-[11px] font-normal text-slate-400">
                  {text.length} karakter • {text.trim() ? text.trim().split(/\s+/).length : 0} kelime
                </span>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                placeholder="Resme dönüştürmek istediğiniz yazıyı buraya yazın veya yapıştırın..."
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white/90 p-3.5 text-sm text-slate-900 shadow-2xs transition focus:border-primary-500 focus:outline-hidden dark:border-white/10 dark:bg-obsidian-850 dark:text-white"
              />
            </div>

            {/* Yazar / Alt Satır */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showAuthor}
                    onChange={(e) => setShowAuthor(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span>Yazar / Kaynak / İmza Satırı Ekle</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={showQuoteMarks}
                    onChange={(e) => setShowQuoteMarks(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span>Tırnak İşareti (“ ”)</span>
                </label>
              </div>

              {showAuthor && (
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Örn: Mustafa Kemal Atatürk veya @kullaniciadi"
                  className="w-full rounded-xl border border-slate-200 bg-white/90 px-3.5 py-2 text-xs text-slate-900 shadow-2xs transition focus:border-primary-500 focus:outline-hidden dark:border-white/10 dark:bg-obsidian-850 dark:text-white"
                />
              )}
            </div>
          </div>

          {/* Tipografi ve Font Ayarları */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/70 space-y-4">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Sliders className="h-4 w-4 text-primary-500" />
              <span>Tipografi ve Yazı Stili</span>
            </span>

            {/* Font Ailesi */}
            <div>
              <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Font Ailesi:
              </label>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-2xs focus:border-primary-500 focus:outline-hidden dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
              >
                {FONTS.map((f) => (
                  <option key={f.id} value={f.font}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Boyut ve Hizalama */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                  <span>Yazı Boyutu:</span>
                  <span>{fontSize} px</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="84"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="mt-2 w-full accent-primary-600"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Metin Hizalama:
                </label>
                <div className="mt-1 flex rounded-xl border border-slate-200 bg-slate-50/70 p-1 dark:border-white/10 dark:bg-obsidian-850">
                  {(["left", "center", "right"] as const).map((align) => (
                    <button
                      key={align}
                      onClick={() => setTextAlign(align)}
                      className={`flex-1 py-1 flex items-center justify-center rounded-lg transition ${
                        textAlign === align
                          ? "bg-white text-primary-600 shadow-2xs dark:bg-obsidian-950 dark:text-primary-400"
                          : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
                      }`}
                    >
                      {align === "left" && <AlignLeft className="h-3.5 w-3.5" />}
                      {align === "center" && <AlignCenter className="h-3.5 w-3.5" />}
                      {align === "right" && <AlignRight className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Yazı Rengi & Kalınlık */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Yazı Rengi:
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded-lg border border-slate-200 bg-white p-0.5 dark:border-white/10"
                  />
                  <div className="flex gap-1">
                    {["#ffffff", "#0f172a", "#38bdf8", "#f59e0b", "#ec4899"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setTextColor(c)}
                        style={{ backgroundColor: c }}
                        className="h-6 w-6 rounded-full border border-slate-300 dark:border-white/20 shadow-xs"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Yazı Kalınlığı:
                </label>
                <div className="mt-1 flex gap-1">
                  {[
                    { label: "Normal", val: "400" },
                    { label: "Kalın", val: "700" },
                    { label: "Siyah", val: "900" },
                  ].map((w) => (
                    <button
                      key={w.val}
                      onClick={() => setFontWeight(w.val)}
                      className={`flex-1 rounded-lg border py-1.5 text-[11px] font-medium transition ${
                        fontWeight === w.val
                          ? "border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-950 dark:text-primary-300"
                          : "border-slate-200 bg-white text-slate-600 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-300"
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Arka Plan ve En-Boy Oranı */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/70 space-y-4">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Palette className="h-4 w-4 text-primary-500" />
              <span>Arka Plan & Çerçeve</span>
            </span>

            {/* Arka Plan Modu */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "transparent", label: "Şeffaf (Saydam)" },
                { id: "gradient", label: "Modern Gradyan" },
                { id: "solid", label: "Düz Tek Renk" },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBgType(b.id as BgType)}
                  className={`rounded-xl border py-2 text-xs font-semibold transition ${
                    bgType === b.id
                      ? "border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-950 dark:text-primary-300"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-300"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {/* Gradyan Seçimi */}
            {bgType === "gradient" && (
              <div className="space-y-2 pt-1">
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Gradyan Paleti Seçin:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {GRADIENTS.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => {
                        setGradientId(g.id);
                        setTextColor(g.suggestedTextColor);
                      }}
                      className={`h-11 rounded-xl border p-1 text-left relative overflow-hidden transition ${
                        gradientId === g.id
                          ? "ring-2 ring-primary-500 ring-offset-2"
                          : "border-slate-200 dark:border-white/10"
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${g.colors.join(", ")})`,
                      }}
                    >
                      <span className="absolute bottom-1 left-2 text-[9px] font-bold text-white drop-shadow-md">
                        {g.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Düz Renk Seçimi */}
            {bgType === "solid" && (
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="color"
                  value={solidColor}
                  onChange={(e) => setSolidColor(e.target.value)}
                  className="h-9 w-12 cursor-pointer rounded-lg border border-slate-200 bg-white p-0.5 dark:border-white/10"
                />
                <div className="flex gap-1.5">
                  {["#0f172a", "#09090b", "#ffffff", "#1e293b", "#dc2626", "#047857"].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSolidColor(c);
                        if (c === "#ffffff") setTextColor("#0f172a");
                        else setTextColor("#ffffff");
                      }}
                      style={{ backgroundColor: c }}
                      className="h-7 w-7 rounded-full border border-slate-300 dark:border-white/20 shadow-xs"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* En-Boy Oranı & Boşluk */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-white/5">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  En-Boy Oranı:
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-2xs focus:border-primary-500 focus:outline-hidden dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
                >
                  <option value="auto">Otomatik Sığdır (Metin Boyutunda)</option>
                  <option value="1:1">1:1 Kare (Instagram Post)</option>
                  <option value="16:9">16:9 Yatay (X / Twitter Post)</option>
                  <option value="9:16">9:16 Dikey (Hikaye / Reels / TikTok)</option>
                  <option value="banner">Geniş Banner (1200x400)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                  <span>Kenar Boşluğu (Padding):</span>
                  <span>{padding} px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="96"
                  value={padding}
                  onChange={(e) => setPadding(parseInt(e.target.value))}
                  className="mt-2 w-full accent-primary-600"
                />
              </div>
            </div>

            {/* macOS Pencere Başlığı Seçeneği */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Terminal className="h-4 w-4 text-slate-400" />
                <span>macOS Terminal Başlığı Göster (Kırmızı/Sarı/Yeşil)</span>
              </label>
              <input
                type="checkbox"
                checked={showWindowHeader}
                onChange={(e) => setShowWindowHeader(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Sağ Kolon: Yapışkan Canlı Önizleme ve İndirme (6 Kolon) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="sticky top-20 rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-obsidian-900/80 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Canlı Önizleme
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <span>{renderedDimensions.width} × {renderedDimensions.height} px</span>
                <span className="rounded-md bg-primary-100/80 px-1.5 py-0.5 text-[10px] font-bold text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                  {exportScale}x Retina
                </span>
              </div>
            </div>

            {/* Önizleme Kutusu (Şeffaflık Damalı Deseni İle) */}
            <div className="flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200/60 p-4 min-h-[300px] max-h-[500px] bg-[linear-gradient(45deg,#f1f5f9_25%,transparent_25%),linear-gradient(-45deg,#f1f5f9_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f1f5f9_75%),linear-gradient(-45deg,transparent_75%,#f1f5f9_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px] dark:border-white/5 dark:bg-[linear-gradient(45deg,#18181b_25%,transparent_25%),linear-gradient(-45deg,#18181b_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#18181b_75%),linear-gradient(-45deg,transparent_75%,#18181b_75%)]">
              <canvas
                ref={canvasRef}
                className="max-h-[440px] max-w-full rounded-xl object-contain shadow-2xl transition-all"
              />
            </div>

            {/* Çözünürlük Çarpanı Seçici */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 pt-1">
              <span>Dışa Aktarma Çözünürlüğü:</span>
              <div className="flex gap-1.5">
                {[
                  { scale: 1, label: "1x Standart" },
                  { scale: 2, label: "2x Retina (Önerilen)" },
                  { scale: 3, label: "3x Ultra HD" },
                ].map((s) => (
                  <button
                    key={s.scale}
                    onClick={() => setExportScale(s.scale)}
                    className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold transition ${
                      exportScale === s.scale
                        ? "border-primary-500 bg-primary-600 text-white shadow-xs"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-300"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* İndirme & Panoya Kopyalama Butonları */}
            <div className="space-y-2 pt-2">
              <div className="flex gap-2.5">
                <button
                  onClick={handleDownload}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-primary-500/25 transition hover:bg-primary-500 active:scale-98"
                >
                  <Download className="h-4 w-4" />
                  <span>PNG Olarak İndir</span>
                </button>

                <button
                  onClick={handleCopyClipboard}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-xs font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100 dark:hover:bg-obsidian-800 active:scale-98"
                >
                  {isCopied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  <span>{isCopied ? "Kopyalandı!" : "Panoya Kopyala"}</span>
                </button>
              </div>

              {copyFeedback && (
                <p className="text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {copyFeedback}
                </p>
              )}
            </div>

            {/* Güvenlik & Gizlilik Bilgilendirmesi */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-white/5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>%100 Tarayıcı Tabanlı: Yazdığınız hiçbir metin sunucuya aktarılmaz.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
