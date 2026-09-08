"use client";

import { useState, useRef, useCallback } from "react";
import { FileUploader, FileInfo } from "@/components/ui/FileUploader";
import { Pipette, Copy, Check, Palette, RefreshCw } from "lucide-react";

interface ColorInfo {
  hex: string;
  rgb: string;
  hsl: string;
}

export default function ColorPickerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorInfo>({
    hex: "#2563EB",
    rgb: "rgb(37, 99, 235)",
    hsl: "hsl(221, 83%, 53%)",
  });
  const [palette, setPalette] = useState<string[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const rgbToHex = (r: number, g: number, b: number) =>
    "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const extractPalette = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    try {
      const imgData = ctx.getImageData(0, 0, width, height).data;
      const colorCounts: { [hex: string]: number } = {};
      const step = Math.max(1, Math.floor((width * height) / 2000)); // örnekleme adımı

      for (let i = 0; i < imgData.length; i += 4 * step) {
        const r = Math.round(imgData[i] / 16) * 16;
        const g = Math.round(imgData[i + 1] / 16) * 16;
        const b = Math.round(imgData[i + 2] / 16) * 16;
        const a = imgData[i + 3];
        if (a < 128) continue; // şeffafları atla

        const hex = rgbToHex(Math.min(255, r), Math.min(255, g), Math.min(255, b));
        colorCounts[hex] = (colorCounts[hex] || 0) + 1;
      }

      const sorted = Object.keys(colorCounts).sort(
        (a, b) => colorCounts[b] - colorCounts[a]
      );
      setPalette(sorted.slice(0, 6));
    } catch {
      setPalette([]);
    }
  };

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);

    const img = new Image();
    const url = URL.createObjectURL(selectedFile);
    img.onload = () => {
      imageRef.current = img;
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          extractPalette(ctx, canvas.width, canvas.height);
        }
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    const hex = rgbToHex(r, g, b);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    const hsl = rgbToHsl(r, g, b);

    setSelectedColor({ hex, rgb, hsl });
  };

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const handleReset = () => {
    setFile(null);
    setPalette([]);
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

          {/* Seçilen Renk Paneli */}
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div
              className="h-16 w-16 shrink-0 rounded-xl border border-gray-300 shadow-inner dark:border-gray-700"
              style={{ backgroundColor: selectedColor.hex }}
            />

            <div className="flex flex-1 flex-wrap items-center gap-4">
              <div>
                <p className="text-[11px] font-semibold text-gray-400">HEX</p>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                    {selectedColor.hex}
                  </span>
                  <button
                    onClick={() => copyToClipboard(selectedColor.hex, "hex")}
                    className="p-1 text-gray-400 hover:text-primary-600"
                    title="Kopyala"
                  >
                    {copiedKey === "hex" ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-gray-400">RGB</p>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-semibold text-gray-900 dark:text-white">
                    {selectedColor.rgb}
                  </span>
                  <button
                    onClick={() => copyToClipboard(selectedColor.rgb, "rgb")}
                    className="p-1 text-gray-400 hover:text-primary-600"
                    title="Kopyala"
                  >
                    {copiedKey === "rgb" ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-gray-400">HSL</p>
                <span className="font-mono text-xs text-gray-600 dark:text-gray-300">
                  {selectedColor.hsl}
                </span>
              </div>
            </div>
          </div>

          {/* Otomatik Çıkarılan Renk Paleti */}
          {palette.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4 dark:border-gray-800 dark:bg-gray-900/40">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <Palette className="h-4 w-4 text-primary-500" />
                <span>Görselin Baskın Renk Paleti (Kopyalamak için tıklayın):</span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {palette.map((hex, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedColor({
                        hex,
                        rgb: hex,
                        hsl: hex,
                      });
                      copyToClipboard(hex, `pal-${idx}`);
                    }}
                    className="group flex flex-col items-center gap-1.5 rounded-lg border border-gray-200 bg-white p-2 shadow-xs transition hover:scale-105 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div
                      className="h-8 w-full rounded-md border border-black/10"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="font-mono text-[11px] font-medium text-gray-700 dark:text-gray-300">
                      {copiedKey === `pal-${idx}` ? "Kopyalandı!" : hex}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Görsel Canvas Seçici */}
          <div className="space-y-2">
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              ğŸ’¡ Görselin üzerindeki herhangi bir piksele tıklayarak anında rengini alın.
            </p>
            <div className="flex max-h-[500px] cursor-crosshair items-center justify-center overflow-auto rounded-xl border border-gray-200 bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-900/50">
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="max-h-[460px] max-w-full rounded-lg object-contain shadow-sm"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button onClick={handleReset} className="btn-secondary gap-2">
              <RefreshCw className="h-4 w-4" />
              Yeni Görsel Seç
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
