"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Upload,
  FileImage,
  Download,
  Trash2,
  RefreshCw,
  Archive,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Sliders,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import JSZip from "jszip";
import { formatFileSize } from "@/lib/utils";

interface ConvertedItem {
  id: string;
  originalName: string;
  originalSize: number;
  convertedBlob: Blob | null;
  convertedUrl: string | null;
  convertedSize: number;
  status: "pending" | "processing" | "done" | "error";
  errorMessage?: string;
  targetFormat: "image/jpeg" | "image/png";
}

interface HeicConverterToolProps {
  defaultFormat?: "image/jpeg" | "image/png";
  title?: string;
  description?: string;
}

export default function HeicConverterTool({
  defaultFormat = "image/jpeg",
  title = "HEIC Fotoğraf Dönüştürücü",
  description = "iPhone (.heic / .heif) fotoğraflarınızı tarayıcınızda saniyeler içinde JPG veya PNG formatına dönüştürün. Dosyalarınız sunucuya yüklenmez, %100 güvenlidir.",
}: HeicConverterToolProps) {
  const [items, setItems] = useState<ConvertedItem[]>([]);
  const [targetFormat, setTargetFormat] = useState<"image/jpeg" | "image/png">(defaultFormat);
  const [quality, setQuality] = useState<number>(0.9);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processHeicFiles = useCallback(
    async (files: File[]) => {
      const validFiles = files.filter((f) => {
        const ext = f.name.toLowerCase().split(".").pop();
        return ext === "heic" || ext === "heif" || f.type.includes("heic") || f.type.includes("heif");
      });

      if (validFiles.length === 0) {
        alert("Lütfen en az bir adet .HEIC veya .HEIF formatında fotoğraf seçin.");
        return;
      }

      // Dinamik heic2any import (SSR korumalı)
      let heic2any: any;
      try {
        const mod = await import("heic2any");
        heic2any = mod.default || mod;
      } catch (err) {
        console.error("heic2any yüklenemedi:", err);
        alert("Dönüştürücü kütüphanesi yüklenirken bir sorun oluştu.");
        return;
      }

      const newItems: ConvertedItem[] = validFiles.map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        originalName: file.name,
        originalSize: file.size,
        convertedBlob: null,
        convertedUrl: null,
        convertedSize: 0,
        status: "pending",
        targetFormat,
      }));

      setItems((prev) => [...prev, ...newItems]);
      setIsProcessing(true);

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        const itemId = newItems[i].id;

        setItems((prev) =>
          prev.map((item) => (item.id === itemId ? { ...item, status: "processing" } : item))
        );

        try {
          const result = await heic2any({
            blob: file,
            toType: targetFormat,
            quality: targetFormat === "image/jpeg" ? quality : undefined,
          });

          const blobResult = Array.isArray(result) ? result[0] : (result as Blob);
          const url = URL.createObjectURL(blobResult);

          setItems((prev) =>
            prev.map((item) =>
              item.id === itemId
                ? {
                    ...item,
                    convertedBlob: blobResult,
                    convertedUrl: url,
                    convertedSize: blobResult.size,
                    status: "done",
                  }
                : item
            )
          );
        } catch (error: any) {
          console.error("Dönüştürme hatası:", error);
          setItems((prev) =>
            prev.map((item) =>
              item.id === itemId
                ? {
                    ...item,
                    status: "error",
                    errorMessage: error?.message || "Dönüştürme başarısız oldu.",
                  }
                : item
            )
          );
        }
      }

      setIsProcessing(false);
    },
    [targetFormat, quality]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processHeicFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processHeicFiles(Array.from(e.target.files));
    }
  };

  const downloadSingle = (item: ConvertedItem) => {
    if (!item.convertedUrl) return;
    const ext = item.targetFormat === "image/jpeg" ? "jpg" : "png";
    const baseName = item.originalName.replace(/\.[^/.]+$/, "");
    const a = document.createElement("a");
    a.href = item.convertedUrl;
    a.download = `${baseName}.${ext}`;
    a.click();
  };

  const downloadAllAsZip = async () => {
    const doneItems = items.filter((i) => i.status === "done" && i.convertedBlob);
    if (doneItems.length === 0) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();
      doneItems.forEach((item) => {
        const ext = item.targetFormat === "image/jpeg" ? "jpg" : "png";
        const baseName = item.originalName.replace(/\.[^/.]+$/, "");
        zip.file(`${baseName}.${ext}`, item.convertedBlob!);
      });

      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `turkconvert-heic-${Date.now()}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("ZIP oluşturma hatası:", err);
      alert("ZIP dosyası oluşturulamadı.");
    } finally {
      setIsZipping(false);
    }
  };

  useEffect(() => {
    return () => {
      items.forEach((i) => {
        if (i.convertedUrl) URL.revokeObjectURL(i.convertedUrl);
      });
    };
  }, [items]);

  const removeItem = (id: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item?.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    items.forEach((i) => {
      if (i.convertedUrl) URL.revokeObjectURL(i.convertedUrl);
    });
    setItems([]);
  };

  const doneCount = items.filter((i) => i.status === "done").length;

  return (
    <div className="space-y-6">
      {/* Kontrol Çubuğu (Format ve Kalite Ayarları) */}
      <div className="mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Sliders className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hedef Format:</span>
            <div className="inline-flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
              <button
                type="button"
                onClick={() => setTargetFormat("image/jpeg")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  targetFormat === "image/jpeg"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
                }`}
              >
                JPG (Önerilen)
              </button>
              <button
                type="button"
                onClick={() => setTargetFormat("image/png")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  targetFormat === "image/png"
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
                }`}
              >
                PNG (Kayıpsız)
              </button>
            </div>
          </div>

          {targetFormat === "image/jpeg" && (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs text-gray-500">Kalite (%{Math.round(quality * 100)}):</span>
              <input
                type="range"
                min="0.4"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-32 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" /> Dosyalar sunucuya iletilmez
          </div>
        </div>
      </div>

      {/* Yükleme Alanı (Dropzone) */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="group relative border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-3xl p-8 sm:p-12 text-center bg-gray-50/50 dark:bg-gray-900/50 hover:bg-blue-50/20 dark:hover:bg-blue-950/20 transition-all cursor-pointer"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".heic,.heif,image/heic,image/heif"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Upload className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          HEIC veya HEIF fotoğraflarınızı buraya sürükleyin
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          veya cihazınızdan seçmek için tıklayın (Tek veya toplu seçim desteklenir)
        </p>
      </div>

      {/* Dosya Listesi ve Aksiyonlar */}
      {items.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              Dönüştürülen Dosyalar ({items.length})
            </h2>
            <div className="flex items-center gap-3">
              {doneCount > 1 && (
                <button
                  type="button"
                  onClick={downloadAllAsZip}
                  disabled={isZipping}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50"
                >
                  <Archive className="w-4 h-4" />
                  {isZipping ? "ZIP Hazırlanıyor..." : "Tümünü ZIP Olarak İndir"}
                </button>
              )}
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-medium transition-all"
              >
                <Trash2 className="w-4 h-4" /> Listeyi Temizle
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-3.5 w-full sm:w-auto">
                  {item.convertedUrl ? (
                    <img
                      src={item.convertedUrl}
                      alt={item.originalName}
                      className="w-12 h-12 rounded-xl object-cover border border-gray-200 dark:border-gray-800 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 text-gray-500">
                      <FileImage className="w-6 h-6" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-xs sm:max-w-md">
                      {item.originalName}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                      <span>{formatFileSize(item.originalSize)}</span>
                      {item.convertedSize > 0 && (
                        <>
                          <ChevronRight className="w-3 h-3 text-gray-400" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                            {formatFileSize(item.convertedSize)} ({item.targetFormat === "image/jpeg" ? "JPG" : "PNG"})
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  {item.status === "processing" && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-medium">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> İşleniyor...
                    </span>
                  )}
                  {item.status === "done" && (
                    <button
                      type="button"
                      onClick={() => downloadSingle(item)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      <Download className="w-3.5 h-3.5" /> İndir
                    </button>
                  )}
                  {item.status === "error" && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" /> {item.errorMessage || "Hata"}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                    title="Kaldır"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
