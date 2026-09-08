"use client";

import { useState, useCallback } from "react";
import { FileUploader, FileInfo } from "@/components/ui/FileUploader";
import { ConversionProgress } from "@/components/ui/ConversionProgress";
import { ConversionResult } from "@/components/ui/ConversionResult";
import { resizeImage } from "@/lib/converters/image";
import { Lock, Unlock, RefreshCw } from "lucide-react";

type ToolState = "idle" | "ready" | "converting" | "done" | "error";

export default function ImageResizerTool() {
  const [state, setState] = useState<ToolState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [maintainAspect, setMaintainAspect] = useState<boolean>(true);
  const [result, setResult] = useState<Blob | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setErrorMsg("");

    const img = new Image();
    const url = URL.createObjectURL(selectedFile);
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      setOriginalWidth(w);
      setOriginalHeight(h);
      setWidth(w);
      setHeight(h);
      URL.revokeObjectURL(url);
      setState("ready");
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setErrorMsg(
        "Görsel yüklenirken bir sorun oluştu. Lütfen geçerli bir görsel seçin."
      );
      setState("error");
    };
    img.src = url;
  }, []);

  const handleWidthChange = (val: string) => {
    if (val === "") {
      setWidth("");
      return;
    }
    const num = parseInt(val, 10);
    if (isNaN(num)) return;
    setWidth(num);
    if (maintainAspect && originalWidth > 0 && originalHeight > 0) {
      const calculatedHeight = Math.max(
        1,
        Math.round((num * originalHeight) / originalWidth)
      );
      setHeight(calculatedHeight);
    }
  };

  const handleHeightChange = (val: string) => {
    if (val === "") {
      setHeight("");
      return;
    }
    const num = parseInt(val, 10);
    if (isNaN(num)) return;
    setHeight(num);
    if (maintainAspect && originalWidth > 0 && originalHeight > 0) {
      const calculatedWidth = Math.max(
        1,
        Math.round((num * originalWidth) / originalHeight)
      );
      setWidth(calculatedWidth);
    }
  };

  const handleMaintainAspectToggle = (checked: boolean) => {
    setMaintainAspect(checked);
    if (checked && width && originalWidth > 0 && originalHeight > 0) {
      const calculatedHeight = Math.max(
        1,
        Math.round((Number(width) * originalHeight) / originalWidth)
      );
      setHeight(calculatedHeight);
    }
  };

  const handlePreset = (percent: number) => {
    if (originalWidth <= 0 || originalHeight <= 0) return;
    const newWidth = Math.round((originalWidth * percent) / 100);
    const newHeight = Math.round((originalHeight * percent) / 100);
    setWidth(newWidth);
    setHeight(newHeight);
  };

  const handleResize = useCallback(async () => {
    if (!file || !width || !height) return;

    setState("converting");
    try {
      const blob = await resizeImage(
        file,
        Number(width),
        Number(height),
        maintainAspect
      );
      setResult(blob);
      setState("done");
    } catch {
      setErrorMsg(
        "Görsel boyutlandırılırken bir sorun oluştu. Lütfen tekrar deneyin."
      );
      setState("error");
    }
  }, [file, width, height, maintainAspect]);

  const handleReset = useCallback(() => {
    setFile(null);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setWidth("");
    setHeight("");
    setMaintainAspect(true);
    setResult(null);
    setErrorMsg("");
    setState("idle");
  }, []);

  const isValidDimensions =
    typeof width === "number" &&
    width > 0 &&
    typeof height === "number" &&
    height > 0;

  return (
    <div>
      {/* Dosya Yükleme */}
      {(state === "idle" || (state === "error" && !file)) && (
        <FileUploader
          accept="image/*"
          acceptLabel="JPG, PNG, WEBP"
          onFileSelect={handleFileSelect}
        />
      )}

      {/* Boyutlandırma Ayarları ve Buton */}
      {state === "ready" && file && (
        <div className="space-y-6">
          <FileInfo file={file} onRemove={handleReset} />

          {/* Orijinal Boyut Göstergesi */}
          <div className="rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800/50">
            <span className="text-gray-500 dark:text-gray-400">
              Orijinal Boyut:{" "}
            </span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {originalWidth} × {originalHeight} px
            </span>
          </div>

          {/* Boyut Girdileri */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="width-input"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Genişlik (piksel)
              </label>
              <input
                id="width-input"
                type="number"
                min="1"
                max="10000"
                value={width}
                onChange={(e) => handleWidthChange(e.target.value)}
                placeholder="Genişlik"
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="height-input"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Yükseklik (piksel)
              </label>
              <input
                id="height-input"
                type="number"
                min="1"
                max="10000"
                value={height}
                onChange={(e) => handleHeightChange(e.target.value)}
                placeholder="Yükseklik"
                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Oranı Koru Onay Kutusu ve Hızlı Butonlar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-800">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={maintainAspect}
                onChange={(e) => handleMaintainAspectToggle(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800"
              />
              <span className="inline-flex items-center gap-1.5">
                {maintainAspect ? (
                  <Lock className="h-3.5 w-3.5 text-primary-600 dark:text-primary-400" />
                ) : (
                  <Unlock className="h-3.5 w-3.5 text-gray-400" />
                )}
                Oranı koru
              </span>
            </label>

            {/* Hızlı Yüzde Butonları */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Hızlı:
              </span>
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => handlePreset(pct)}
                  className="rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  %{pct}
                </button>
              ))}
            </div>
          </div>

          {/* Boyutlandır Butonu */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleResize}
              disabled={!isValidDimensions}
              className="btn-primary"
            >
              Boyutlandır
            </button>
          </div>
        </div>
      )}

      {/* Boyutlandırma Süreci */}
      {state === "converting" && (
        <ConversionProgress message="Görseliniz boyutlandırılıyor..." />
      )}

      {/* Sonuç */}
      {state === "done" && result && file && (
        <ConversionResult
          fileName={file.name}
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
