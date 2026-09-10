"use client";

import { useState, useCallback, useEffect } from "react";
import { FileUploader, FileInfo } from "@/components/ui/FileUploader";
import { ConversionProgress } from "@/components/ui/ConversionProgress";
import { ConversionResult } from "@/components/ui/ConversionResult";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import {
  compressImageAdvanced,
  CompressResult,
} from "@/lib/converters/image";
import { changeFileExtension } from "@/lib/utils";
import {
  RefreshCw,
  Sparkles,
  Sliders,
  CheckCircle2,
  Info,
  Maximize2,
} from "lucide-react";

type ToolState = "idle" | "ready" | "converting" | "done" | "error";

interface QualityPreset {
  value: number;
  label: string;
  badge: string;
  description: string;
}

const QUALITY_PRESETS: QualityPreset[] = [
  {
    value: 0.8,
    label: "Hafif Sıkıştırma",
    badge: "%80 Kalite",
    description: "Maksimum netlik, hafif boyut tasarrufu",
  },
  {
    value: 0.6,
    label: "Dengeli",
    badge: "Önerilen",
    description: "Optimum dosya boyutu ve yüksek görsel kalitesi",
  },
  {
    value: 0.35,
    label: "Yüksek Sıkıştırma",
    badge: "Maksimum Tasarruf",
    description: "Web siteleri ve e-posta için en küçük dosya boyutu",
  },
];

export default function ImageCompressorTool() {
  const [state, setState] = useState<ToolState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string>("");
  const [quality, setQuality] = useState<number>(0.6);
  const [targetFormat, setTargetFormat] = useState<"auto" | "image/webp" | "image/jpeg">("auto");
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);
  const [compressResult, setCompressResult] = useState<CompressResult | null>(null);
  const [resultName, setResultName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setOriginalPreviewUrl(url);
    setErrorMsg("");
    setState("ready");
  }, []);

  const handleCompress = useCallback(async () => {
    if (!file) return;

    setState("converting");
    try {
      const res = await compressImageAdvanced(file, {
        quality,
        targetFormat,
        maxWidth,
      });

      const newName = changeFileExtension(file.name, res.extension);
      setCompressResult(res);
      setResultName(newName);
      setState("done");
    } catch {
      setErrorMsg(
        "Görsel sıkıştırılırken bir sorun oluştu. Lütfen görseli kontrol edip tekrar deneyin."
      );
      setState("error");
    }
  }, [file, quality, targetFormat, maxWidth]);

  const handleReset = useCallback(() => {
    if (originalPreviewUrl) {
      URL.revokeObjectURL(originalPreviewUrl);
    }
    if (compressResult?.previewUrl) {
      URL.revokeObjectURL(compressResult.previewUrl);
    }
    setFile(null);
    setOriginalPreviewUrl("");
    setQuality(0.6);
    setTargetFormat("auto");
    setMaxWidth(undefined);
    setCompressResult(null);
    setResultName("");
    setErrorMsg("");
    setState("idle");
  }, [originalPreviewUrl, compressResult]);

  useEffect(() => {
    return () => {
      if (originalPreviewUrl) URL.revokeObjectURL(originalPreviewUrl);
      if (compressResult?.previewUrl) URL.revokeObjectURL(compressResult.previewUrl);
    };
  }, [originalPreviewUrl, compressResult]);

  return (
    <div className="space-y-6">
      {/* Dosya Yükleme */}
      {(state === "idle" || (state === "error" && !file)) && (
        <FileUploader
          accept="image/jpeg,image/png,image/webp"
          acceptLabel="JPG, PNG, WEBP"
          onFileSelect={handleFileSelect}
        />
      )}

      {/* Sıkıştırma Ayarları ve Başlatma */}
      {state === "ready" && file && (
        <div className="space-y-6">
          <FileInfo file={file} onRemove={handleReset} />

          {/* Kalite Hazır Ayarları */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Sıkıştırma Seviyesi
              </label>
              <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                %{Math.round(quality * 100)} Kalite
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {QUALITY_PRESETS.map((opt) => {
                const isSelected = Math.abs(quality - opt.value) < 0.05;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setQuality(opt.value)}
                    className={`relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-primary-500 bg-primary-50/50 ring-2 ring-primary-500/20 dark:border-primary-400 dark:bg-primary-950/20"
                        : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800/60 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {opt.label}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          isSelected
                            ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {opt.badge}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {opt.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Hassas Kalite Kaydırıcısı */}
            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50/60 p-4 dark:border-gray-800 dark:bg-gray-900/40">
              <div className="mb-2 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sliders className="h-3.5 w-3.5" />
                  Hassas Kalite Ayarı
                </span>
                <span className="font-mono font-bold text-gray-900 dark:text-white">
                  %{Math.round(quality * 100)}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                step="5"
                value={Math.round(quality * 100)}
                onChange={(e) => setQuality(Number(e.target.value) / 100)}
                className="w-full accent-primary-600"
              />
              <div className="mt-1 flex justify-between text-[11px] text-gray-400">
                <span>Daha Küçük Boyut (%10)</span>
                <span>Daha Yüksek Netlik (%95)</span>
              </div>
            </div>
          </div>

          {/* Gelişmiş Seçenekler: Format & Maksimum Çözünürlük */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Hedef Format
              </label>
              <select
                value={targetFormat}
                onChange={(e) =>
                  setTargetFormat(e.target.value as "auto" | "image/webp" | "image/jpeg")
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="auto">Otomatik (En Küçük Boyut & WebP)</option>
                <option value="image/webp">WEBP (En Yüksek Sıkıştırma)</option>
                <option value="image/jpeg">JPG (Geniş Uyumluluk)</option>
              </select>
              <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                WEBP formatı JPG&apos;ye kıyasla ortalama %35 daha küçük boyut sağlar.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Maksimum Çözünürlük (İsteğe Bağlı)
              </label>
              <select
                value={maxWidth || ""}
                onChange={(e) =>
                  setMaxWidth(e.target.value ? Number(e.target.value) : undefined)
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="">Orijinal Çözünürlüğü Koru</option>
                <option value="2560">Maks. 2560px (2K QHD)</option>
                <option value="1920">Maks. 1920px (Full HD - Web İçin İdeal)</option>
                <option value="1280">Maks. 1280px (HD)</option>
                <option value="800">Maks. 800px (Blog & Küçük Görseller)</option>
              </select>
              <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                Çok büyük fotoğrafların piksellerini orantılı küçülterek megabaytlarca tasarruf sağlar.
              </p>
            </div>
          </div>

          {/* Sıkıştır Butonu */}
          <div className="flex justify-center pt-2">
            <button onClick={handleCompress} className="btn-primary gap-2">
              <Sparkles className="h-4 w-4" />
              Görseli Sıkıştır
            </button>
          </div>
        </div>
      )}

      {/* Sıkıştırma Süreci */}
      {state === "converting" && (
        <ConversionProgress message="Görseliniz akıllı algoritma ile sıkıştırılıyor..." />
      )}

      {/* Sonuç Ekranı ve Canlı Before / After Slider */}
      {state === "done" && compressResult && file && (
        <div className="space-y-6">
          {/* Zaten Optimize Edilmiş Bildirimi */}
          {compressResult.alreadyOptimized && (
            <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-800 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300">
              <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-semibold">Görseliniz Zaten Optimize Edilmiş</p>
                <p className="mt-0.5 text-blue-700/90 dark:text-blue-300/90">
                  Bu görsel zaten maksimum düzeyde sıkıştırılmış bir formata sahipti. Kalite kaybı yaşamamanız için dosya boyutu büyütülmeden en ideal hali korundu.
                </p>
              </div>
            </div>
          )}

          {/* İndirme ve Boyut Bilgisi */}
          <ConversionResult
            fileName={resultName}
            blob={compressResult.blob}
            originalSize={file.size}
            onReset={handleReset}
          />

          {/* Canlı Önizleme & Before-After Slider */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Maximize2 className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Canlı Kalite Karşılaştırması (Önce / Sonra)
                </h4>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Kaydırıcıyı sağa-sola sürükleyerek netliği inceleyin
              </span>
            </div>

            <BeforeAfterSlider
              beforeImage={originalPreviewUrl}
              afterImage={compressResult.previewUrl}
              beforeLabel="Orijinal"
              afterLabel={`Sıkıştırılmış (%${compressResult.savingsPercent} Tasarruf)`}
            />
          </div>
        </div>
      )}

      {/* Hata */}
      {state === "error" && errorMsg && (
        <div className="mt-4 text-center">
          <p className="mb-4 text-sm text-red-600 dark:text-red-400">
            {errorMsg}
          </p>
          <button onClick={handleReset} className="btn-secondary gap-2">
            <RefreshCw className="h-4 w-4" />
            Tekrar Dene
          </button>
        </div>
      )}
    </div>
  );
}
