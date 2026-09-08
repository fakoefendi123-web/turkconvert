"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { FileUploader, FileInfo } from "@/components/ui/FileUploader";
import { Crop, Download, RefreshCw, Square } from "lucide-react";
import { changeFileExtension } from "@/lib/utils";

export default function ImageCropperTool() {
  const [file, setFile] = useState<File | null>(null);
  const [aspect, setAspect] = useState<"free" | "1:1" | "16:9" | "4:3" | "9:16">("free");
  const [cropX, setCropX] = useState(10); // %
  const [cropY, setCropY] = useState(10); // %
  const [cropWidth, setCropWidth] = useState(80); // %
  const [cropHeight, setCropHeight] = useState(80); // %

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setCropX(10);
    setCropY(10);
    setCropWidth(80);
    setCropHeight(80);

    const img = new Image();
    const url = URL.createObjectURL(selectedFile);
    img.onload = () => {
      imageRef.current = img;
      renderPreview(img, 10, 10, 80, 80);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  const renderPreview = (
    img: HTMLImageElement,
    xPct: number,
    yPct: number,
    wPct: number,
    hPct: number
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0);

    // Kırpma alanı dışını karart
    const rx = (xPct / 100) * canvas.width;
    const ry = (yPct / 100) * canvas.height;
    const rw = (wPct / 100) * canvas.width;
    const rh = (hPct / 100) * canvas.height;

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    // Üst
    ctx.fillRect(0, 0, canvas.width, ry);
    // Alt
    ctx.fillRect(0, ry + rh, canvas.width, canvas.height - (ry + rh));
    // Sol
    ctx.fillRect(0, ry, rx, rh);
    // Sağ
    ctx.fillRect(rx + rw, ry, canvas.width - (rx + rw), rh);

    // Kırpma çerçevesi çizgisi
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = Math.max(3, canvas.width * 0.003);
    ctx.strokeRect(rx, ry, rw, rh);

    // Köşelere tutamaçlar
    const handleSize = Math.max(8, canvas.width * 0.01);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(rx - handleSize / 2, ry - handleSize / 2, handleSize, handleSize);
    ctx.fillRect(rx + rw - handleSize / 2, ry - handleSize / 2, handleSize, handleSize);
    ctx.fillRect(rx - handleSize / 2, ry + rh - handleSize / 2, handleSize, handleSize);
    ctx.fillRect(rx + rw - handleSize / 2, ry + rh - handleSize / 2, handleSize, handleSize);
  };

  useEffect(() => {
    if (imageRef.current) {
      renderPreview(imageRef.current, cropX, cropY, cropWidth, cropHeight);
    }
  }, [cropX, cropY, cropWidth, cropHeight]);

  const applyAspectRatio = (ratio: "free" | "1:1" | "16:9" | "4:3" | "9:16") => {
    setAspect(ratio);
    if (!imageRef.current || ratio === "free") return;

    const img = imageRef.current;
    const imgAspect = img.naturalWidth / img.naturalHeight;

    let targetRatio = 1;
    if (ratio === "16:9") targetRatio = 16 / 9;
    if (ratio === "4:3") targetRatio = 4 / 3;
    if (ratio === "9:16") targetRatio = 9 / 16;

    if (imgAspect > targetRatio) {
      // Görsel daha geniş, yüksekliği baz al
      const newHeight = 80;
      const pixelHeight = (newHeight / 100) * img.naturalHeight;
      const pixelWidth = pixelHeight * targetRatio;
      const newWidth = Math.min(100, Math.round((pixelWidth / img.naturalWidth) * 100));
      setCropWidth(newWidth);
      setCropHeight(newHeight);
      setCropX(Math.round((100 - newWidth) / 2));
      setCropY(10);
    } else {
      // Görsel daha dar, genişliği baz al
      const newWidth = 80;
      const pixelWidth = (newWidth / 100) * img.naturalWidth;
      const pixelHeight = pixelWidth / targetRatio;
      const newHeight = Math.min(100, Math.round((pixelHeight / img.naturalHeight) * 100));
      setCropWidth(newWidth);
      setCropHeight(newHeight);
      setCropX(10);
      setCropY(Math.round((100 - newHeight) / 2));
    }
  };

  const handleDownloadCrop = () => {
    if (!imageRef.current || !file) return;
    const img = imageRef.current;

    const cropCanvas = document.createElement("canvas");
    const rx = Math.round((cropX / 100) * img.naturalWidth);
    const ry = Math.round((cropY / 100) * img.naturalHeight);
    const rw = Math.round((cropWidth / 100) * img.naturalWidth);
    const rh = Math.round((cropHeight / 100) * img.naturalHeight);

    cropCanvas.width = rw;
    cropCanvas.height = rh;

    const ctx = cropCanvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, rx, ry, rw, rh, 0, 0, rw, rh);

    cropCanvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = changeFileExtension(file.name, "png");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const handleReset = () => {
    setFile(null);
    imageRef.current = null;
    setAspect("free");
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <FileUploader
          accept="image/*"
          acceptLabel="JPG, PNG, WEBP"
          onFileSelect={handleFileSelect}
        />
      ) : (
        <div className="space-y-6">
          <FileInfo file={file} onRemove={handleReset} />

          {/* En-Boy Oranı Butonları */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Oran:
            </span>
            {(["free", "1:1", "16:9", "4:3", "9:16"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => applyAspectRatio(r)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  aspect === r
                    ? "bg-primary-600 text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                }`}
              >
                {r === "free" ? "Serbest" : r}
              </button>
            ))}
          </div>

          {/* Slider Ayarları */}
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs dark:border-gray-800 dark:bg-gray-900/50 sm:grid-cols-4">
            <div>
              <label className="text-gray-500 dark:text-gray-400">Genişlik: %{cropWidth}</label>
              <input
                type="range"
                min="10"
                max={100 - cropX}
                value={cropWidth}
                onChange={(e) => setCropWidth(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
            </div>
            <div>
              <label className="text-gray-500 dark:text-gray-400">Yükseklik: %{cropHeight}</label>
              <input
                type="range"
                min="10"
                max={100 - cropY}
                value={cropHeight}
                onChange={(e) => setCropHeight(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
            </div>
            <div>
              <label className="text-gray-500 dark:text-gray-400">Yatay Konum: %{cropX}</label>
              <input
                type="range"
                min="0"
                max={100 - cropWidth}
                value={cropX}
                onChange={(e) => setCropX(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
            </div>
            <div>
              <label className="text-gray-500 dark:text-gray-400">Dikey Konum: %{cropY}</label>
              <input
                type="range"
                min="0"
                max={100 - cropHeight}
                value={cropY}
                onChange={(e) => setCropY(Number(e.target.value))}
                className="w-full accent-primary-600"
              />
            </div>
          </div>

          {/* Canlı Kırpma Önizleme */}
          <div className="flex max-h-[500px] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
            <canvas
              ref={canvasRef}
              className="max-h-[460px] max-w-full rounded-lg object-contain shadow-sm"
            />
          </div>

          {/* Kırp ve İndir Butonu */}
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={handleDownloadCrop} className="btn-primary gap-2">
              <Crop className="h-4 w-4" />
              Kırp ve İndir (PNG)
            </button>
            <button onClick={handleReset} className="btn-secondary gap-2">
              <RefreshCw className="h-4 w-4" />
              Yeni Görsel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
