"use client";

import { useState, useCallback } from "react";
import { FileUploader, FileInfo } from "@/components/ui/FileUploader";
import { ConversionProgress } from "@/components/ui/ConversionProgress";
import { ConversionResult } from "@/components/ui/ConversionResult";
import { compressImage } from "@/lib/converters/image";
import { changeFileExtension } from "@/lib/utils";
import { RefreshCw } from "lucide-react";

type ToolState = "idle" | "ready" | "converting" | "done" | "error";

interface QualityOption {
  value: number;
  label: string;
  badge: string;
  description: string;
}

const QUALITY_OPTIONS: QualityOption[] = [
  {
    value: 0.8,
    label: "Yüksek",
    badge: "%80 Kalite",
    description: "Daha az sıkıştırma, maksimum görsel netliği",
  },
  {
    value: 0.6,
    label: "Orta",
    badge: "Önerilen",
    description: "Optimum dosya boyutu ve yüksek görsel kalitesi",
  },
  {
    value: 0.3,
    label: "Düşük",
    badge: "En Küçük Boyut",
    description: "Maksimum dosya boyutu tasarrufu",
  },
];

export default function ImageCompressorTool() {
  const [state, setState] = useState<ToolState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(0.6);
  const [result, setResult] = useState<Blob | null>(null);
  const [resultName, setResultName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setErrorMsg("");
    setState("ready");
  }, []);

  const handleCompress = useCallback(async () => {
    if (!file) return;

    setState("converting");
    try {
      const blob = await compressImage(file, quality);
      const targetExt = file.type === "image/webp" ? "webp" : "jpg";
      const newName = changeFileExtension(file.name, targetExt);
      setResult(blob);
      setResultName(newName);
      setState("done");
    } catch {
      setErrorMsg(
        "Görsel sıkıştırılırken bir sorun oluştu. Lütfen tekrar deneyin."
      );
      setState("error");
    }
  }, [file, quality]);

  const handleReset = useCallback(() => {
    setFile(null);
    setQuality(0.6);
    setResult(null);
    setResultName("");
    setErrorMsg("");
    setState("idle");
  }, []);

  return (
    <div>
      {/* Dosya Yükleme */}
      {(state === "idle" || (state === "error" && !file)) && (
        <FileUploader
          accept="image/jpeg,image/png,image/webp"
          acceptLabel="JPG, PNG, WEBP"
          onFileSelect={handleFileSelect}
        />
      )}

      {/* Sıkıştırma Ayarları ve Buton */}
      {state === "ready" && file && (
        <div className="space-y-6">
          <FileInfo file={file} onRemove={handleReset} />

          {/* Kalite Seçimi */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Sıkıştırma Seviyesi
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {QUALITY_OPTIONS.map((opt) => {
                const isSelected = quality === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={`relative flex cursor-pointer flex-col justify-between rounded-xl border p-4 transition-all ${
                      isSelected
                        ? "border-primary-500 bg-primary-50/50 ring-2 ring-primary-500/20 dark:border-primary-400 dark:bg-primary-950/20"
                        : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800/60 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="compression-quality"
                          value={opt.value}
                          checked={isSelected}
                          onChange={() => setQuality(opt.value)}
                          className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800"
                        />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {opt.label}
                        </span>
                      </div>
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
                  </label>
                );
              })}
            </div>
          </div>

          {/* Sıkıştır Butonu */}
          <div className="flex justify-center pt-2">
            <button onClick={handleCompress} className="btn-primary">
              Sıkıştır
            </button>
          </div>
        </div>
      )}

      {/* Sıkıştırma Süreci */}
      {state === "converting" && (
        <ConversionProgress message="Görseliniz sıkıştırılıyor..." />
      )}

      {/* Sonuç */}
      {state === "done" && result && file && (
        <ConversionResult
          fileName={resultName}
          blob={result}
          originalSize={file.size}
          onReset={handleReset}
        />
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
