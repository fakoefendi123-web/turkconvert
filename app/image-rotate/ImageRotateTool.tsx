"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { FileUploader, FileInfo } from "@/components/ui/FileUploader";
import {
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Download,
  RefreshCw,
} from "lucide-react";
import { changeFileExtension } from "@/lib/utils";

export default function ImageRotateTool() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);

    const img = new Image();
    const url = URL.createObjectURL(selectedFile);
    img.onload = () => {
      imageRef.current = img;
      renderCanvas(img, 0, false, false);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  const renderCanvas = (
    img: HTMLImageElement,
    rot: number,
    fH: boolean,
    fV: boolean
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isVertical = rot === 90 || rot === 270;
    canvas.width = isVertical ? img.naturalHeight : img.naturalWidth;
    canvas.height = isVertical ? img.naturalWidth : img.naturalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Merkeze taÅŸÄ±
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // DÃ¶ndÃ¼r
    ctx.rotate((rot * Math.PI) / 180);

    // Aynala
    ctx.scale(fH ? -1 : 1, fV ? -1 : 1);

    // Ã‡iz
    ctx.drawImage(
      img,
      -img.naturalWidth / 2,
      -img.naturalHeight / 2,
      img.naturalWidth,
      img.naturalHeight
    );

    ctx.restore();
  };

  useEffect(() => {
    if (imageRef.current) {
      renderCanvas(imageRef.current, rotation, flipH, flipV);
    }
  }, [rotation, flipH, flipV]);

  const handleRotateLeft = () => {
    setRotation((prev) => (prev - 90 + 360) % 360);
  };

  const handleRotateRight = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleRotate180 = () => {
    setRotation((prev) => (prev + 180) % 360);
  };

  const handleToggleFlipH = () => setFlipH((prev) => !prev);
  const handleToggleFlipV = () => setFlipV((prev) => !prev);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !file) return;

    canvas.toBlob((blob) => {
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
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    imageRef.current = null;
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

          {/* Kontrol ButonlarÄ± */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleRotateLeft}
              className="btn-secondary gap-1.5 !px-3 !py-2 text-xs"
            >
              <RotateCcw className="h-4 w-4" />
              90Â° Sola
            </button>
            <button
              type="button"
              onClick={handleRotateRight}
              className="btn-secondary gap-1.5 !px-3 !py-2 text-xs"
            >
              <RotateCw className="h-4 w-4" />
              90Â° SaÄŸa
            </button>
            <button
              type="button"
              onClick={handleRotate180}
              className="btn-secondary gap-1.5 !px-3 !py-2 text-xs"
            >
              180Â° Ã‡evir
            </button>
            <button
              type="button"
              onClick={handleToggleFlipH}
              className={`btn-secondary gap-1.5 !px-3 !py-2 text-xs ${
                flipH ? "!border-primary-500 !bg-primary-50 text-primary-700 dark:!bg-primary-950/40 dark:text-primary-300" : ""
              }`}
            >
              <FlipHorizontal className="h-4 w-4" />
              Yatay Aynala
            </button>
            <button
              type="button"
              onClick={handleToggleFlipV}
              className={`btn-secondary gap-1.5 !px-3 !py-2 text-xs ${
                flipV ? "!border-primary-500 !bg-primary-50 text-primary-700 dark:!bg-primary-950/40 dark:text-primary-300" : ""
              }`}
            >
              <FlipVertical className="h-4 w-4" />
              Dikey Aynala
            </button>
            <button
              type="button"
              onClick={() => {
                setRotation(0);
                setFlipH(false);
                setFlipV(false);
              }}
              className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              SÄ±fÄ±rla
            </button>
          </div>

          {/* CanlÄ± Canvas Ã–nizleme */}
          <div className="flex max-h-[500px] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
            <canvas
              ref={canvasRef}
              className="max-h-[460px] max-w-full rounded-lg object-contain shadow-sm"
            />
          </div>

          {/* Ä°ndir & Yeni Dosya */}
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={handleDownload} className="btn-primary gap-2">
              <Download className="h-4 w-4" />
              DÃ¶ndÃ¼rÃ¼lmÃ¼ÅŸ GÃ¶rseli Ä°ndir (PNG)
            </button>
            <button onClick={handleReset} className="btn-secondary gap-2">
              <RefreshCw className="h-4 w-4" />
              Yeni GÃ¶rsel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
