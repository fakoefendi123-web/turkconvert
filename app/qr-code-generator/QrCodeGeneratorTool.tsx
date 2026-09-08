"use client";

import { useState, useRef, useCallback } from "react";
import QRCode from "qrcode";
import { QrCode as QrCodeIcon, Download, AlertCircle } from "lucide-react";

const QR_OPTIONS = {
  width: 300,
  margin: 2,
  color: {
    dark: "#000000",
    light: "#ffffff",
  },
};

export function QrCodeGeneratorTool() {
  const [text, setText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [error, setError] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleGenerate = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Lütfen QR kod oluşturmak için bir metin veya URL adresi girin.");
      return;
    }

    setError("");

    try {
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, trimmed, QR_OPTIONS);
        setGeneratedText(trimmed);
        setIsGenerated(true);
      }
    } catch {
      setError(
        "QR kod oluşturulurken bir hata oluştu. Lütfen girdiğiniz metni kontrol edip tekrar deneyin."
      );
      setIsGenerated(false);
    }
  }, [text]);

  const handleDownload = useCallback(async () => {
    if (!generatedText) return;

    try {
      const dataUrl = await QRCode.toDataURL(generatedText, QR_OPTIONS);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      setError("QR kod indirilirken bir sorun oluştu. Lütfen tekrar deneyin.");
    }
  }, [generatedText]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="space-y-6">
      {/* Giriş Alanı */}
      <div>
        <label
          htmlFor="qr-text-input"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Metin veya URL Adresi
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            id="qr-text-input"
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError("");
            }}
            onKeyDown={handleKeyDown}
            placeholder="Örn: https://example.com veya herhangi bir metin"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
          <button
            type="button"
            onClick={handleGenerate}
            className="btn-primary whitespace-nowrap gap-2"
          >
            <QrCodeIcon className="h-4 w-4" />
            <span>QR Kod Oluştur</span>
          </button>
        </div>
      </div>

      {/* Hata Mesajı */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* QR Kod Çıktısı (Canvas) */}
      <div
        className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-800/30 ${
          isGenerated ? "block" : "hidden"
        }`}
      >
        <div className="overflow-hidden rounded-lg bg-white p-3 shadow-md">
          <canvas ref={canvasRef} className="block" />
        </div>

        {isGenerated && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="max-w-xs truncate text-center text-xs text-gray-500 dark:text-gray-400 sm:max-w-md">
              {generatedText}
            </p>
            <button
              type="button"
              onClick={handleDownload}
              className="btn-primary gap-2"
            >
              <Download className="h-4 w-4" />
              <span>PNG Olarak İndir</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
