"use client";

import { useState, useRef } from "react";
import {
  Upload,
  ShieldCheck,
  ShieldAlert,
  Download,
  Trash2,
  CheckCircle2,
  Sparkles,
  MapPin,
  Camera,
  Calendar,
  Lock,
} from "lucide-react";
import { formatFileSize } from "@/lib/utils";

export default function ExifCleanerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cleanedUrl, setCleanedUrl] = useState<string | null>(null);
  const [cleanedSize, setCleanedSize] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      alert("Lütfen bir görsel dosyası seçin.");
      return;
    }

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    setCleanedUrl(null);

    cleanExif(selectedFile);
  };

  const cleanExif = (imgFile: File) => {
    setIsProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // EXIF verilerini tamamen temizlemek için canvas üzerine saf pikselleri çiz
      ctx.drawImage(img, 0, 0);

      const isPng = imgFile.type === "image/png";
      const mime = isPng ? "image/png" : "image/jpeg";

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCleanedUrl(url);
            setCleanedSize(blob.size);
          }
          setIsProcessing(false);
        },
        mime,
        0.95
      );
    };
    img.src = URL.createObjectURL(imgFile);
  };

  const reset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (cleanedUrl) URL.revokeObjectURL(cleanedUrl);
    setFile(null);
    setPreviewUrl(null);
    setCleanedUrl(null);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
          <Lock className="w-3.5 h-3.5" /> GPS & Konum Koruması • %100 Gizlilik
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Fotoğraf EXIF & Metadata Temizleyici
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Fotoğraflarınızdaki evinizin GPS konumu, çekildiği saat, telefon/kamera modeli gibi gizli bilgileri tek tıkla silin. İnternette güvenle paylaşın.
        </p>
      </div>

      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
          }}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-emerald-500 rounded-3xl p-10 text-center bg-gray-50/50 dark:bg-gray-900/50 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 transition-all cursor-pointer group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
            className="hidden"
          />
          <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Upload className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Meta Verilerini Temizlemek İstediğiniz Fotoğrafı Seçin
          </h3>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG veya WebP formatları desteklenir</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Önizleme"
                className="w-40 h-40 object-cover rounded-2xl border border-gray-200 dark:border-gray-800 shrink-0"
              />
            )}

            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white truncate max-w-xs">
                    {file.name}
                  </h4>
                  <p className="text-xs text-gray-500">Orijinal Boyut: {formatFileSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs text-gray-500 hover:text-rose-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Kaldır
                </button>
              </div>

              {/* Temizlenen Veri Rozetleri */}
              <div className="grid grid-cols-2 gap-2 my-4">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  <MapPin className="w-4 h-4 text-emerald-600" /> GPS Konum Bilgisi Silindi
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  <Camera className="w-4 h-4 text-emerald-600" /> Cihaz & Lens Modeli Silindi
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  <Calendar className="w-4 h-4 text-emerald-600" /> Çekim Tarihi & Saati Silindi
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Yazılım & Seri No Temizlendi
                </div>
              </div>

              {cleanedUrl && (
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-gray-500 font-medium">
                    Temizlenmiş Boyut: <strong className="text-emerald-600">{formatFileSize(cleanedSize)}</strong>
                  </span>
                  <a
                    href={cleanedUrl}
                    download={`temiz_${file.name}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <Download className="w-4 h-4" /> Temiz Fotoğrafı İndir
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bilgilendirme */}
      <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-xs text-gray-500 max-w-lg mx-auto">
        Sahibinden, Letgo gibi ikinci el ilan sitelerine veya sosyal medyaya fotoğraf yüklerken evinizin tam konumunun çalınmaması için fotoğraflarınızı her zaman EXIF temizleyiciden geçirin.
      </div>
    </div>
  );
}
