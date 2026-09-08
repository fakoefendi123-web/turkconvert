"use client";

import { useState, useCallback } from "react";
import { FileUploader, FileInfo } from "@/components/ui/FileUploader";
import { Download, RefreshCw, Layers } from "lucide-react";
import { changeFileExtension } from "@/lib/utils";

export default function SvgToPngTool() {
  const [file, setFile] = useState<File | null>(null);
  const [scale, setScale] = useState<number>(2);
  const [background, setBackground] = useState<"transparent" | "white">("transparent");
  const [isConverting, setIsConverting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setErrorMsg("");
  }, []);

  const handleConvertAndDownload = async () => {
    if (!file) return;
    setIsConverting(true);
    setErrorMsg("");

    try {
      const svgText = await file.text();
      const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const naturalW = img.naturalWidth || 512;
        const naturalH = img.naturalHeight || 512;

        canvas.width = naturalW * scale;
        canvas.height = naturalH * scale;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(url);
          setIsConverting(false);
          setErrorMsg("Canvas oluÅŸturulamadÄ±.");
          return;
        }

        if (background === "white") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);

        canvas.toBlob((pngBlob) => {
          setIsConverting(false);
          if (!pngBlob) {
            setErrorMsg("PNG dÃ¶nÃ¼ÅŸtÃ¼rme baÅŸarÄ±sÄ±z oldu.");
            return;
          }
          const pngUrl = URL.createObjectURL(pngBlob);
          const a = document.createElement("a");
          a.href = pngUrl;
          a.download = changeFileExtension(file.name, "png");
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(pngUrl);
        }, "image/png");
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        setIsConverting(false);
        setErrorMsg("SVG dosyasÄ± iÅŸlenirken hata oluÅŸtu. LÃ¼tfen geÃ§erli bir SVG yÃ¼kleyin.");
      };

      img.src = url;
    } catch {
      setIsConverting(false);
      setErrorMsg("Dosya okunurken bir sorun oluÅŸtu.");
    }
  };

  const handleReset = () => {
    setFile(null);
    setErrorMsg("");
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader
          accept=".svg,image/svg+xml"
          acceptLabel="SVG"
          onFileSelect={handleFileSelect}
        />
      ) : (
        <div className="space-y-6">
          <FileInfo file={file} onRemove={handleReset} />

          {/* Ayarlar */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Ã‡Ã¶zÃ¼nÃ¼rlÃ¼k Ã‡arpanÄ± */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Ã‡Ã¶zÃ¼nÃ¼rlÃ¼k Kalitesi
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 4, 8].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setScale(s)}
                    className={`rounded-lg py-2 text-xs font-bold transition ${
                      scale === s
                        ? "bg-primary-600 text-white"
                        : "border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-gray-400">
                {scale === 1
                  ? "Orijinal boyut"
                  : scale === 2
                  ? "2 kat netlik (Ã–nerilen)"
                  : scale === 4
                  ? "4 kat ultra HD kalite"
                  : "8 kat maksimum baskÄ± kalitesi"}
              </p>
            </div>

            {/* Arka Plan */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Arka Plan Rengi
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBackground("transparent")}
                  className={`rounded-lg py-2 text-xs font-semibold transition ${
                    background === "transparent"
                      ? "border-2 border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300"
                      : "border border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  }`}
                >
                  Åeffaf (Saydam)
                </button>
                <button
                  type="button"
                  onClick={() => setBackground("white")}
                  className={`rounded-lg py-2 text-xs font-semibold transition ${
                    background === "white"
                      ? "border-2 border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300"
                      : "border border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  }`}
                >
                  Beyaz Arka Plan
                </button>
              </div>
              <p className="mt-2 text-[11px] text-gray-400">
                {background === "transparent"
                  ? "Saydam arka plan (logo ve ikonlar iÃ§in idealdir)"
                  : "Beyaz dolgu ile dÃ¼z zemin"}
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="rounded-lg bg-red-50 p-3 text-center text-xs text-red-600 dark:bg-red-950/30 dark:text-red-400">
              {errorMsg}
            </div>
          )}

          {/* DÃ¶nÃ¼ÅŸtÃ¼r Butonu */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleConvertAndDownload}
              disabled={isConverting}
              className="btn-primary gap-2"
            >
              <Download className="h-4 w-4" />
              {isConverting ? "DÃ¶nÃ¼ÅŸtÃ¼rÃ¼lÃ¼yor..." : "PNG Olarak Ä°ndir"}
            </button>
            <button onClick={handleReset} className="btn-secondary gap-2">
              <RefreshCw className="h-4 w-4" />
              Yeni SVG
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
