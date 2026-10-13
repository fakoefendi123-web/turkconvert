"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Upload,
  Camera,
  Download,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Sliders,
  CheckCircle2,
  Sparkles,
  Grid,
  Eye,
  FileImage,
  Layers,
} from "lucide-react";

interface Preset {
  id: string;
  name: string;
  widthMm: number;
  heightMm: number;
  widthPx: number;
  heightPx: number;
  description: string;
}

const PRESETS: Preset[] = [
  {
    id: "biometric-tr",
    name: "50x60 mm Biyometrik (TR)",
    widthMm: 50,
    heightMm: 60,
    widthPx: 591,
    heightPx: 709,
    description: "E-Devlet, Yeni Kimlik, Pasaport, Sürücü Belgesi, ÖSYM",
  },
  {
    id: "schengen-visa",
    name: "35x45 mm Vesikalık & Vize",
    widthMm: 35,
    heightMm: 45,
    widthPx: 413,
    heightPx: 531,
    description: "Schengen Vizesi, Pasaport (AB), Kurumsal Kimlik",
  },
  {
    id: "us-visa",
    name: "50x50 mm (ABD Vizesi)",
    widthMm: 50,
    heightMm: 50,
    widthPx: 591,
    heightPx: 591,
    description: "ABD Vizesi, Green Card (DS-160)",
  },
];

export default function BiometricPhotoTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<Preset>(PRESETS[0]);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showGuidelines, setShowGuidelines] = useState<boolean>(true);

  // Filtreler
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [whitenBg, setWhitenBg] = useState<boolean>(false);

  const [isExporting, setIsExporting] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageObjRef = useRef<HTMLImageElement | null>(null);

  // Bellek temizliği
  useEffect(() => {
    return () => {
      if (imageSrc && imageSrc.startsWith("blob:")) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imageSrc && imageSrc.startsWith("blob:")) {
      URL.revokeObjectURL(imageSrc);
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      imageObjRef.current = img;
      setImageSrc(url);
      setZoom(1);
      setPan({ x: 0, y: 0 });
    };
    img.src = url;
  };

  // Canvas Önizleme Çizimi
  const drawPreview = useCallback(() => {
    const canvas = previewCanvasRef.current;
    const img = imageObjRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = activePreset.widthPx;
    const h = activePreset.heightPx;
    canvas.width = w;
    canvas.height = h;

    // Arka planı temizle
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    // Filtreleri uygula
    let filterStr = `brightness(${brightness}%) contrast(${contrast}%)`;
    if (whitenBg) {
      filterStr += " grayscale(15%)";
    }
    ctx.filter = filterStr;

    // Fotoğrafı orantılı ve pan/zoom ile çiz
    const scale = Math.max(w / img.width, h / img.height) * zoom;
    const drawW = img.width * scale;
    const drawH = img.height * scale;

    const centerX = (w - drawW) / 2 + pan.x;
    const centerY = (h - drawH) / 2 + pan.y;

    ctx.drawImage(img, centerX, centerY, drawW, drawH);
    ctx.restore();

    // Arka plan beyazlatma filtresi
    if (whitenBg) {
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // Açık tonları tam beyaza çek
        if (r > 195 && g > 195 && b > 195) {
          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }
  }, [activePreset, zoom, pan, brightness, contrast, whitenBg]);

  useEffect(() => {
    drawPreview();
  }, [drawPreview]);

  // Pan (Sürükleme) Kontrolleri
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageSrc) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Tekli Fotoğraf İndir
  const handleDownloadSingle = () => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    setIsExporting(true);
    canvas.toBlob((blob) => {
      setIsExporting(false);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Biyometrik_Foto_${activePreset.widthMm}x${activePreset.heightMm}mm.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, "image/jpeg", 0.98);
  };

  // 4'lü Baskı Tabakası İndir (10x15 cm / 1181x1772 px @ 300 DPI)
  const handleDownloadSheet = () => {
    const srcCanvas = previewCanvasRef.current;
    if (!srcCanvas) return;

    setIsExporting(true);
    const sheetCanvas = document.createElement("canvas");
    // 10x15 cm @ 300 DPI: 1181 x 1772 px
    sheetCanvas.width = 1772;
    sheetCanvas.height = 1181;
    const ctx = sheetCanvas.getContext("2d");
    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // Beyaz zemin
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, sheetCanvas.width, sheetCanvas.height);

    // 4 adet fotoğraf yerleşimi (2 sütun x 2 satır)
    const photoW = activePreset.widthPx;
    const photoH = activePreset.heightPx;

    const gapX = 100;
    const gapY = 80;
    const totalW = photoW * 2 + gapX;
    const totalH = photoH * 2 + gapY;

    const startX = (sheetCanvas.width - totalW) / 2;
    const startY = (sheetCanvas.height - totalH) / 2;

    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 2; col++) {
        const x = startX + col * (photoW + gapX);
        const y = startY + row * (photoH + gapY);

        ctx.drawImage(srcCanvas, x, y, photoW, photoH);

        // İnce kesim kılavuz çerçevesi
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, photoW, photoH);
      }
    }

    sheetCanvas.toBlob((blob) => {
      setIsExporting(false);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Biyometrik_Baski_Tabakasi_10x15cm_${activePreset.widthMm}x${activePreset.heightMm}mm.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, "image/jpeg", 0.98);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Şablon Seçici Butonları */}
      <div className="flex flex-wrap gap-2.5">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setActivePreset(p);
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className={`flex-1 min-w-[200px] rounded-2xl border p-3.5 text-left transition-all ${
              activePreset.id === p.id
                ? "border-primary-500 bg-primary-50/60 shadow-xs dark:border-primary-400 dark:bg-primary-950/40"
                : "border-slate-200 bg-white/70 hover:border-slate-300 dark:border-white/10 dark:bg-obsidian-900/60"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                {p.name}
              </span>
              {activePreset.id === p.id && (
                <CheckCircle2 className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              )}
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              {p.description}
            </p>
          </button>
        ))}
      </div>

      {/* Ana Çalışma Alanı */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Sol / Üst: Fotoğraf Tuvali ve Kılavuz */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-slate-50/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/50">
          {!imageSrc ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center transition hover:border-primary-500 hover:bg-primary-50/30 dark:border-white/20 dark:hover:border-primary-400"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                <Camera className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-800 dark:text-slate-100">
                Portre Fotoğrafınızı Seçin veya Sürükleyin
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                Kameranızla veya telefonunuzla çekilmiş net, karşıdan bakan bir fotoğraf yükleyin.
              </p>
              <button className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-500">
                <Upload className="h-3.5 w-3.5" />
                <span>Fotoğraf Seç</span>
              </button>
            </div>
          ) : (
            <div className="relative select-none">
              {/* Canvas Kutusu */}
              <div
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="relative overflow-hidden rounded-2xl border border-slate-300 shadow-xl cursor-grab active:cursor-grabbing bg-white dark:border-white/20"
                style={{
                  width: `${activePreset.widthMm * 5.2}px`,
                  height: `${activePreset.heightMm * 5.2}px`,
                }}
              >
                <canvas
                  ref={previewCanvasRef}
                  className="h-full w-full object-contain"
                />

                {/* Yüz Hizalama Kılavuz Katmanı */}
                {showGuidelines && (
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between p-4">
                    {/* Baş Üstü Kılavuzu */}
                    <div className="w-full border-b border-dashed border-primary-500/80 pt-4 text-center">
                      <span className="rounded bg-primary-500/80 px-1 py-0.2 text-[8px] font-bold text-white uppercase">
                        Baş Tepe Noktası
                      </span>
                    </div>

                    {/* Yüz / Göz Ovali */}
                    <div className="relative h-3/5 w-3/4 rounded-[50%] border-2 border-emerald-500/70">
                      {/* Göz Hizası Çizgisi */}
                      <div className="absolute top-[42%] w-full border-b border-dashed border-emerald-500/80" />
                    </div>

                    {/* Çene Altı Kılavuzu */}
                    <div className="w-full border-t border-dashed border-primary-500/80 pb-3 text-center">
                      <span className="rounded bg-primary-500/80 px-1 py-0.2 text-[8px] font-bold text-white uppercase">
                        Çene Çizgisi
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Alt Bilgi */}
              <p className="mt-3 text-center text-[11px] text-slate-500 dark:text-slate-400">
                💡 Fotoğrafı sürükleyerek çerçeve içinde ortalayabilirsiniz.
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Sağ: Ayarlar, Kılavuz ve İndirme */}
        <div className="lg:col-span-5 space-y-4">
          {imageSrc && (
            <>
              {/* Zoom ve Konum Kontrolleri */}
              <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur-md dark:border-white/10 dark:bg-obsidian-900/60 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <ZoomIn className="h-4 w-4 text-primary-500" />
                    <span>Yakınlaştırma (Boyut): %{Math.round(zoom * 100)}</span>
                  </span>
                  <button
                    onClick={() => {
                      setZoom(1);
                      setPan({ x: 0, y: 0 });
                    }}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Sıfırla</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300"
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-1 accent-primary-600"
                  />
                  <button
                    onClick={() => setZoom((z) => Math.min(2.5, z + 0.1))}
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Kılavuz Çizgileri Toggle */}
                <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300">
                    <Grid className="h-3.5 w-3.5 text-slate-400" />
                    <span>Yüz Kılavuz Çizgilerini Göster</span>
                  </label>
                  <input
                    type="checkbox"
                    checked={showGuidelines}
                    onChange={(e) => setShowGuidelines(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Renk ve Arka Plan Filtreleri */}
              <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur-md dark:border-white/10 dark:bg-obsidian-900/60 space-y-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <Sliders className="h-4 w-4 text-primary-500" />
                  <span>Işık & Netlik Ayarları</span>
                </span>

                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Parlaklık:</span>
                    <span>%{brightness}</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="140"
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="w-full accent-primary-600"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Kontrast:</span>
                    <span>%{contrast}</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="140"
                    value={contrast}
                    onChange={(e) => setContrast(parseInt(e.target.value))}
                    className="w-full accent-primary-600"
                  />
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Beyaz Arka Planı Güçlendir
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Açık gri gölgeleri beyaza yaklaştırır
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={whitenBg}
                    onChange={(e) => setWhitenBg(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* İndirme Butonları */}
              <div className="space-y-2.5">
                <button
                  onClick={handleDownloadSingle}
                  disabled={isExporting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-600 py-3 text-xs font-bold text-white shadow-md shadow-primary-500/20 transition hover:bg-primary-500 active:scale-98"
                >
                  <Download className="h-4 w-4" />
                  <span>Tekli Biyometrik Fotoğrafı İndir (JPG)</span>
                </button>

                <button
                  onClick={handleDownloadSheet}
                  disabled={isExporting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 text-xs font-bold text-slate-800 shadow-xs transition hover:bg-slate-50 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100 dark:hover:bg-obsidian-800 active:scale-98"
                >
                  <Layers className="h-4 w-4 text-primary-500" />
                  <span>4&apos;lü Baskı Tabakası İndir (10x15 cm Kart)</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full text-center text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 pt-1"
                >
                  Farklı bir fotoğraf yükle
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
