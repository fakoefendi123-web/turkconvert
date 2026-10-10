"use client";

import { useState, useRef } from "react";
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

  const analyzeFile = (file: File) => {
    const ext = file.name.toLowerCase().split(".").pop() || "";

    if (ext === "heic" || ext === "heif") {
      setDetectedFile({ name: file.name, size: file.size, type: "heic" });
    } else if (file.type === "application/pdf" || ext === "pdf") {
      setDetectedFile({ name: file.name, size: file.size, type: "pdf" });
    } else if (file.type.startsWith("image/") || ["jpg", "jpeg", "png", "webp", "svg"].includes(ext)) {
      setDetectedFile({ name: file.name, size: file.size, type: "image" });
    } else if (["json", "xml", "txt", "md", "js", "ts"].includes(ext)) {
      setDetectedFile({ name: file.name, size: file.size, type: "code" });
    } else {
      setDetectedFile({ name: file.name, size: file.size, type: "other" });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      {!detectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative overflow-hidden rounded-3xl border-2 border-dashed transition-all cursor-pointer p-8 sm:p-12 text-center ${
            isDragging
              ? "border-primary-500 bg-primary-500/10 scale-[1.01]"
              : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/60 hover:border-primary-500/70 hover:bg-gray-50/50 dark:hover:bg-gray-800/40 shadow-sm hover:shadow-md"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            onChange={handleSelect}
            className="hidden"
          />

          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-500/20 to-indigo-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
            <Upload className="w-8 h-8" />
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
            Herhangi bir dosyayı buraya bırakın
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Görsel, PDF, HEIC veya kod... Dosyanızı akıllıca tanır ve tek tıkla dönüştürme seçeneklerini sunar.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-gray-500">
            <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800">📸 JPG / PNG / WebP</span>
            <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800">📱 iPhone HEIC</span>
            <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800">📄 PDF</span>
            <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800">💻 JSON / Base64</span>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>%100 Cihazınızda İşlenir • Asla Sunucuya Gönderilmez</span>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-lg animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 mb-6">
            <div className="flex items-center gap-3">
              {detectedFile.type === "image" && <FileImage className="w-7 h-7 text-blue-500" />}
              {detectedFile.type === "heic" && <FileImage className="w-7 h-7 text-purple-500" />}
              {detectedFile.type === "pdf" && <FileText className="w-7 h-7 text-rose-500" />}
              {detectedFile.type === "code" && <FileCode className="w-7 h-7 text-amber-500" />}
              {detectedFile.type === "other" && <Sparkles className="w-7 h-7 text-primary-500" />}
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {detectedFile.name}
                </h3>
                <p className="text-xs text-gray-500">Dosya algılandı. Ne yapmak istersiniz?</p>
              </div>
            </div>
            <button
              onClick={() => setDetectedFile(null)}
              className="text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Vazgeç
            </button>
          </div>

          {/* Aksiyon Butonları */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {detectedFile.type === "heic" && (
              <>
                <button
                  onClick={() => router.push("/heic-to-jpg")}
                  className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-left hover:border-blue-500 transition-all group"
                >
                  <div className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-between">
                    JPG Formatına Çevir
                    <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Standart cihazlar için hızlı JPG dönüşümü</p>
                </button>
                <button
                  onClick={() => router.push("/heic-to-png")}
                  className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-left hover:border-purple-500 transition-all group"
                >
                  <div className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-between">
                    PNG Formatına Çevir
                    <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Kayıpsız ve en yüksek kalitede dönüşüm</p>
                </button>
              </>
            )}

            {detectedFile.type === "image" && (
              <>
                <button
                  onClick={() => router.push("/image-compressor")}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-left hover:border-primary-500 transition-all group"
                >
                  <div className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Minimize2 className="w-4 h-4 text-primary-500" /> Boyutunu Küçült (Sıkıştır)
                    </span>
                    <ArrowRight className="w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Kalite kaybı olmadan %80 tasarruf sağlayın</p>
                </button>
                <button
                  onClick={() => router.push("/exif-cleaner")}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-left hover:border-emerald-500 transition-all group"
                >
                  <div className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-500" /> EXIF / GPS Konumunu Sil
                    </span>
                    <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Fotoğraftaki gizli konum ve kamera bilgisini temizleyin</p>
                </button>
                <button
                  onClick={() => router.push("/image-to-pdf")}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-left hover:border-rose-500 transition-all group"
                >
                  <div className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-rose-500" /> PDF Belgesine Dönüştür
                    </span>
                    <ArrowRight className="w-4 h-4 text-rose-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Fotoğrafı A4 formatında PDF yapın</p>
                </button>
                <button
                  onClick={() => router.push("/seffaf-imza")}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-left hover:border-indigo-500 transition-all group"
                >
                  <div className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <PenTool className="w-4 h-4 text-indigo-500" /> Arka Planı Şeffaf Yap (İmza)
                    </span>
                    <ArrowRight className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Kağıttaki imzayı saydamlaştırın</p>
                </button>
              </>
            )}

            {detectedFile.type === "pdf" && (
              <>
                <button
                  onClick={() => router.push("/pdf-merge")}
                  className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-left hover:border-indigo-500 transition-all group"
                >
                  <div className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-500" /> Başka PDF ile Birleştir
                    </span>
                    <ArrowRight className="w-4 h-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Birden fazla PDF&apos;i tek dosya yapın</p>
                </button>
                <button
                  onClick={() => router.push("/pdf-split")}
                  className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-left hover:border-rose-500 transition-all group"
                >
                  <div className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-rose-500" /> Sayfaları Ayır / Böl
                    </span>
                    <ArrowRight className="w-4 h-4 text-rose-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">İstediğiniz sayfaları çıkarın veya bölün</p>
                </button>
                <button
                  onClick={() => router.push("/belge-sansurleyici")}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-left hover:border-rose-500 transition-all group"
                >
                  <div className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-between">
                    <span>Hassas Bilgileri Sansürle (TC / IBAN)</span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Belgedeki gizli kısımları siyah bantla kapatın</p>
                </button>
                <button
                  onClick={() => router.push("/fatura-olusturucu")}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-left hover:border-emerald-500 transition-all group"
                >
                  <div className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-between">
                    <span>Yeni PDF Fatura Oluştur</span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Kurumsal ve şık teklif veya fatura hazırlayın</p>
                </button>
              </>
            )}

            {(detectedFile.type === "code" || detectedFile.type === "other") && (
              <>
                <button
                  onClick={() => router.push("/json-formatter")}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-left hover:border-primary-500 transition-all group"
                >
                  <div className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-between">
                    <span>JSON / Metin Formatlayıcı</span>
                    <ArrowRight className="w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Girintileri düzenleyin ve doğrulayın</p>
                </button>
                <button
                  onClick={() => router.push("/word-counter")}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-left hover:border-primary-500 transition-all group"
                >
                  <div className="font-bold text-sm text-gray-900 dark:text-white flex items-center justify-between">
                    <span>Kelime & Karakter Sayacı</span>
                    <ArrowRight className="w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Okuma süresi ve metin analizleri</p>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
