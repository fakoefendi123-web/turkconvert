"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileImage,
  FileText,
  FileCode,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Minimize2,
  Layers,
  Scissors,
  Lock,
  PenTool,
  Zap,
  Clipboard,
  Camera,
  Stamp,
} from "lucide-react";

export function UniversalDropzone() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [detectedFile, setDetectedFile] = useState<{
    name: string;
    size: number;
    type: "image" | "heic" | "pdf" | "code" | "other";
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const analyzeFile = useCallback((file: File) => {
    const ext = file.name.toLowerCase().split(".").pop() || "";

    if (ext === "heic" || ext === "heif") {
      setDetectedFile({ name: file.name, size: file.size, type: "heic" });
    } else if (file.type === "application/pdf" || ext === "pdf") {
      setDetectedFile({ name: file.name, size: file.size, type: "pdf" });
    } else if (
      file.type.startsWith("image/") ||
      ["jpg", "jpeg", "png", "webp", "svg"].includes(ext)
    ) {
      setDetectedFile({ name: file.name, size: file.size, type: "image" });
    } else if (["json", "xml", "txt", "md", "js", "ts"].includes(ext)) {
      setDetectedFile({ name: file.name, size: file.size, type: "code" });
    } else {
      setDetectedFile({ name: file.name, size: file.size, type: "other" });
    }
  }, []);

  // Global Ctrl + V Panodan Yapıştırma Desteği
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            const pasteFile = new File(
              [blob],
              `Ekran_Goruntusu_${new Date().toISOString().slice(11, 19).replace(/:/g, "-")}.png`,
              { type: blob.type || "image/png" }
            );
            analyzeFile(pasteFile);
            e.preventDefault();
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [analyzeFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      analyzeFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      analyzeFile(e.target.files[0]);
    }
  };

  return (
    <div className="relative mx-auto my-8 w-full max-w-3xl">
      {/* Ambient background glow behind dropzone */}
      <div className="pointer-events-none absolute -inset-1 rounded-[32px] bg-gradient-to-r from-primary-500/20 via-violet-500/20 to-cyan-500/20 blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-100 dark:from-primary-600/30 dark:via-violet-600/20 dark:to-cyan-600/20" />

      {!detectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`group relative cursor-pointer overflow-hidden rounded-[28px] border-2 border-dashed p-8 text-center transition-all duration-300 sm:p-12 ${
            isDragging
              ? "scale-[1.01] border-primary-500 bg-primary-500/10 shadow-glow-md"
              : "border-slate-300/80 bg-white/80 shadow-lg shadow-slate-900/5 backdrop-blur-2xl hover:border-primary-500/60 hover:shadow-glow-sm dark:border-white/10 dark:bg-obsidian-900/75 dark:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.6)] dark:hover:border-primary-500/50 dark:hover:shadow-glow-md"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            onChange={handleSelect}
            className="hidden"
          />

          <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-600 to-violet-500 text-white shadow-lg shadow-primary-500/30 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-glow-sm">
            <Upload className="h-7 w-7" />
          </div>

          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            Herhangi bir dosyayı buraya bırakın
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
            Fotoğraf, iPhone HEIC, PDF veya kod... Dosyanız anında tanınır ve size en uygun dönüştürme araçları açılır.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/70 bg-slate-50/80 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-300">
              📸 JPG / PNG / WebP
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/70 bg-slate-50/80 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-300">
              📱 iPhone HEIC
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/70 bg-slate-50/80 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-300">
              📄 PDF Belgeleri
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/70 bg-slate-50/80 px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-300">
              💻 JSON / Base64
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>%100 Tarayıcıda İşlenir</span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-white/20">•</span>
            <div className="flex items-center gap-1.5 font-medium text-primary-600 dark:text-primary-400">
              <Clipboard className="h-3.5 w-3.5" />
              <span>Ekran görüntüsünü doğrudan <kbd className="rounded-md border border-primary-500/30 bg-primary-50/80 px-1.5 py-0.5 font-mono text-[10px] font-bold text-primary-700 dark:bg-primary-950 dark:text-primary-300">Ctrl + V</kbd> ile yapıştırabilirsiniz</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-[28px] border border-slate-200/80 bg-white/95 p-6 shadow-2xl backdrop-blur-2xl duration-200 animate-in fade-in zoom-in-95 dark:border-white/10 dark:bg-obsidian-900/90 sm:p-8">
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-400">
                {detectedFile.type === "image" && <FileImage className="h-6 w-6" />}
                {detectedFile.type === "heic" && <FileImage className="h-6 w-6 text-violet-500" />}
                {detectedFile.type === "pdf" && <FileText className="h-6 w-6 text-rose-500" />}
                {detectedFile.type === "code" && <FileCode className="h-6 w-6 text-amber-500" />}
                {detectedFile.type === "other" && <Sparkles className="h-6 w-6 text-primary-500" />}
              </div>
              <div>
                <h3 className="max-w-xs truncate text-base font-bold text-slate-900 dark:text-white sm:max-w-md">
                  {detectedFile.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Dosya algılandı. Bu dosya ile ne yapmak istersiniz?
                </p>
              </div>
            </div>
            <button
              onClick={() => setDetectedFile(null)}
              className="rounded-lg px-2.5 py-1 text-xs font-medium text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
            >
              Vazgeç
            </button>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {detectedFile.type === "heic" && (
              <>
                <button
                  onClick={() => router.push("/heic-to-jpg")}
                  className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-left transition-all hover:border-primary-500 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-obsidian-850/60 dark:hover:border-primary-500 dark:hover:bg-obsidian-800"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                    <span>JPG Formatına Çevir</span>
                    <ArrowRight className="h-4 w-4 text-primary-500 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Standart cihazlar ve web siteleri için hızlı JPG dönüşümü
                  </p>
                </button>
                <button
                  onClick={() => router.push("/heic-to-png")}
                  className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-left transition-all hover:border-violet-500 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-obsidian-850/60 dark:hover:border-violet-500 dark:hover:bg-obsidian-800"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                    <span>PNG Formatına Çevir</span>
                    <ArrowRight className="h-4 w-4 text-violet-500 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Kayıpsız ve en yüksek görsel kalitesinde dönüşüm
                  </p>
                </button>
              </>
            )}

            {detectedFile.type === "image" && (
              <>
                <button
                  onClick={() => router.push("/image-compressor")}
                  className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-left transition-all hover:border-primary-500 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-obsidian-850/60 dark:hover:border-primary-500 dark:hover:bg-obsidian-800"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <Minimize2 className="h-4 w-4 text-primary-500" /> Boyutunu Küçült (Sıkıştır)
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary-500 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Görsel kalitesinden ödün vermeden %80 dosya tasarrufu
                  </p>
                </button>
                <button
                  onClick={() => router.push("/exif-cleaner")}
                  className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-left transition-all hover:border-emerald-500 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-obsidian-850/60 dark:hover:border-emerald-500 dark:hover:bg-obsidian-800"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-emerald-500" /> EXIF / GPS Bilgisini Sil
                    </span>
                    <ArrowRight className="h-4 w-4 text-emerald-500 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Fotoğraftaki konum, kamera ve çekim saatini temizleyin
                  </p>
                </button>
                <button
                  onClick={() => router.push("/image-to-pdf")}
                  className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-left transition-all hover:border-rose-500 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-obsidian-850/60 dark:hover:border-rose-500 dark:hover:bg-obsidian-800"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-rose-500" /> PDF Belgesine Dönüştür
                    </span>
                    <ArrowRight className="h-4 w-4 text-rose-500 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Fotoğrafı yüksek kalitede A4 PDF sayfasına yerleştirin
                  </p>
                </button>
                <button
                  onClick={() => router.push("/biyometrik-foto")}
                  className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-left transition-all hover:border-emerald-500 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-obsidian-850/60 dark:hover:border-emerald-500 dark:hover:bg-obsidian-800"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-emerald-500" /> Biyometrik / Vesikalık Yap
                    </span>
                    <ArrowRight className="h-4 w-4 text-emerald-500 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    E-Devlet, pasaport veya vize için standart 50x60mm formatında kırpın
                  </p>
                </button>
                <button
                  onClick={() => router.push("/seffaf-imza")}
                  className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-left transition-all hover:border-indigo-500 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-obsidian-850/60 dark:hover:border-indigo-500 dark:hover:bg-obsidian-800"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <PenTool className="h-4 w-4 text-indigo-500" /> Arka Planı Şeffaf Yap
                    </span>
                    <ArrowRight className="h-4 w-4 text-indigo-500 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Beyaz kağıttaki ıslak imzayı veya logoyu saydam PNG yapın
                  </p>
                </button>
              </>
            )}

            {detectedFile.type === "pdf" && (
              <>
                <button
                  onClick={() => router.push("/pdf-watermark")}
                  className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-left transition-all hover:border-violet-500 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-obsidian-850/60 dark:hover:border-violet-500 dark:hover:bg-obsidian-800"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <Stamp className="h-4 w-4 text-violet-500" /> Sayfa No & Filigran Ekle
                    </span>
                    <ArrowRight className="h-4 w-4 text-violet-500 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Evraklara sayfa numarası basın veya TASLAK/GİZLİDİR damgası vurun
                  </p>
                </button>
                <button
                  onClick={() => router.push("/pdf-merge")}
                  className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-left transition-all hover:border-primary-500 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-obsidian-850/60 dark:hover:border-primary-500 dark:hover:bg-obsidian-800"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-primary-500" /> PDF&apos;leri Birleştir
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary-500 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Birden fazla PDF belgesini dilediğiniz sırayla birleştirin
                  </p>
                </button>
                <button
                  onClick={() => router.push("/pdf-split")}
                  className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-left transition-all hover:border-rose-500 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-obsidian-850/60 dark:hover:border-rose-500 dark:hover:bg-obsidian-800"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <Scissors className="h-4 w-4 text-rose-500" /> Sayfaları Ayır / Kes
                    </span>
                    <ArrowRight className="h-4 w-4 text-rose-500 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    İstediğiniz sayfa aralıklarını çıkarın veya sayfaları bölün
                  </p>
                </button>
              </>
            )}

            {(detectedFile.type === "code" || detectedFile.type === "other") && (
              <>
                <button
                  onClick={() => router.push("/json-formatter")}
                  className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-left transition-all hover:border-primary-500 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-obsidian-850/60 dark:hover:border-primary-500 dark:hover:bg-obsidian-800"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                    <span>JSON / Metin Formatlayıcı</span>
                    <ArrowRight className="h-4 w-4 text-primary-500 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Girintileri düzenleyin, kod yapısını doğrulayın
                  </p>
                </button>
                <button
                  onClick={() => router.push("/word-counter")}
                  className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 text-left transition-all hover:border-primary-500 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-obsidian-850/60 dark:hover:border-primary-500 dark:hover:bg-obsidian-800"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                    <span>Kelime & Karakter Sayacı</span>
                    <ArrowRight className="h-4 w-4 text-primary-500 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Okuma süresi ve metin yoğunluk analizi
                  </p>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
