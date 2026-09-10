"use client";

import { CheckCircle2, Download, RefreshCw } from "lucide-react";
import { formatFileSize, calculateSavingsPercent } from "@/lib/utils";

interface ConversionResultProps {
  /** İndirilecek dosya adı */
  fileName: string;
  /** Dönüştürülen dosyanın Blob'u */
  blob: Blob;
  /** Orijinal dosya boyutu (sıkıştırıcı için) */
  originalSize?: number;
  /** Yeni dönüşüm başlatma callback'i */
  onReset: () => void;
}

export function ConversionResult({
  fileName,
  blob,
  originalSize,
  onReset,
}: ConversionResultProps) {
  const handleDownload = () => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const savingsPercent =
    originalSize !== undefined
      ? calculateSavingsPercent(originalSize, blob.size)
      : null;

  return (
    <div className="flex flex-col items-center gap-5 py-6">
      {/* Başarı ikonu */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <CheckCircle2 className="h-7 w-7 text-green-600 dark:text-green-400" />
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Dönüştürme tamamlandı!
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {fileName}
        </p>
      </div>

      {/* Boyut bilgileri */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        {originalSize !== undefined && (
          <div className="rounded-lg bg-gray-100 px-3 py-1.5 dark:bg-gray-800">
            <span className="text-gray-500 dark:text-gray-400">Orijinal: </span>
            <span className="font-medium text-gray-700 dark:text-gray-200">
              {formatFileSize(originalSize)}
            </span>
          </div>
        )}
        <div className="rounded-lg bg-gray-100 px-3 py-1.5 dark:bg-gray-800">
          <span className="text-gray-500 dark:text-gray-400">
            {originalSize !== undefined ? "Yeni: " : "Boyut: "}
          </span>
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {formatFileSize(blob.size)}
          </span>
        </div>
        {savingsPercent !== null && savingsPercent > 0 && (
          <div className="rounded-lg bg-green-100 px-3 py-1.5 dark:bg-green-900/30">
            <span className="font-medium text-green-700 dark:text-green-400">
              %{savingsPercent} tasarruf
            </span>
          </div>
        )}
        {savingsPercent !== null && savingsPercent === 0 && originalSize !== undefined && (
          <div className="rounded-lg bg-blue-100 px-3 py-1.5 dark:bg-blue-900/30">
            <span className="font-medium text-blue-700 dark:text-blue-400">
              Maksimum Optimizasyon
            </span>
          </div>
        )}
      </div>

      {/* Butonlar */}
      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={handleDownload} className="btn-primary gap-2">
          <Download className="h-4 w-4" />
          İndir
        </button>
        <button onClick={onReset} className="btn-secondary gap-2">
          <RefreshCw className="h-4 w-4" />
          Yeni Dosya Dönüştür
        </button>
      </div>
    </div>
  );
}
