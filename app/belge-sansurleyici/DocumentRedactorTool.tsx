"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { FileUploader, FileInfo } from "@/components/ui/FileUploader";
import {
  ShieldAlert,
  ShieldCheck,
  Download,
  RotateCcw,
  Trash2,
  Square,
  Paintbrush,
  Sparkles,
  EyeOff,
  Grid,
  RefreshCw,
} from "lucide-react";

type RedactMode = "blackout" | "blur" | "pixelate" | "brush";

interface RectArea {
  mode: RedactMode;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface BrushStroke {
  points: { x: number; y: number }[];
  size: number;
}

export default function DocumentRedactorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [mode, setMode] = useState<RedactMode>("blackout");
  const [brushSize, setBrushSize] = useState(20);

  // History stack for Undo
  const [history, setHistory] = useState<ImageData[]>([]);

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [activeBrush, setActiveBrush] = useState<{ x: number; y: number }[]>([]);

  // Load Image
  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    const img = new Image();
    const url = URL.createObjectURL(selectedFile);
    img.onload = () => {
      setImage(img);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  // Initialize Canvas
  useEffect(() => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.drawImage(image, 0, 0);
    const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialData]);
  }, [image]);

  const saveHistoryState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev, data]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const newHistory = history.slice(0, -1);
    const previousState = newHistory[newHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setHistory(newHistory);
  };

  const handleReset = () => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(image, 0, 0);
    const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialData]);
  };

  const handleNewFile = () => {
    setFile(null);
    setImage(null);
    setHistory([]);
  };

  // Canvas coordinates
  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  // Sansür Efektleri
  const applyRedaction = (
    ctx: CanvasRenderingContext2D,
    m: RedactMode,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    const normX = Math.max(0, Math.min(x, x + w));
    const normY = Math.max(0, Math.min(y, y + h));
    const normW = Math.abs(w);
    const normH = Math.abs(h);

    if (normW < 2 || normH < 2) return;

    if (m === "blackout") {
      ctx.fillStyle = "#000000";
      ctx.fillRect(normX, normY, normW, normH);
    } else if (m === "blur") {
      // Piksel bloklarını bulanıklaştırma
      const imgData = ctx.getImageData(normX, normY, normW, normH);
      const data = imgData.data;
      const blockSize = 8;

      for (let by = 0; by < normH; by += blockSize) {
        for (let bx = 0; bx < normW; bx += blockSize) {
          let r = 0,
            g = 0,
            b = 0,
            count = 0;

          for (let dy = 0; dy < blockSize && by + dy < normH; dy++) {
            for (let dx = 0; dx < blockSize && bx + dx < normW; dx++) {
              const idx = ((by + dy) * normW + (bx + dx)) * 4;
              r += data[idx];
              g += data[idx + 1];
              b += data[idx + 2];
              count++;
            }
          }

          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);

          for (let dy = 0; dy < blockSize && by + dy < normH; dy++) {
            for (let dx = 0; dx < blockSize && bx + dx < normW; dx++) {
              const idx = ((by + dy) * normW + (bx + dx)) * 4;
              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
            }
          }
        }
      }
      ctx.putImageData(imgData, normX, normY);
    } else if (m === "pixelate") {
      // Mozaik Sansür
      const imgData = ctx.getImageData(normX, normY, normW, normH);
      const data = imgData.data;
      const blockSize = 14;

      for (let by = 0; by < normH; by += blockSize) {
        for (let bx = 0; bx < normW; bx += blockSize) {
          const sampleIdx = (by * normW + bx) * 4;
          const r = data[sampleIdx];
          const g = data[sampleIdx + 1];
          const b = data[sampleIdx + 2];

          for (let dy = 0; dy < blockSize && by + dy < normH; dy++) {
            for (let dx = 0; dx < blockSize && bx + dx < normW; dx++) {
              const idx = ((by + dy) * normW + (bx + dx)) * 4;
              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
            }
          }
        }
      }
      ctx.putImageData(imgData, normX, normY);
    }
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    setStartPos(coords);

    if (mode === "brush") {
      setActiveBrush([coords]);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(coords.x, coords.y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !startPos) return;
    e.preventDefault();
    const currentPos = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    if (mode === "brush") {
      // Fırça ile kesintisiz çiz
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      const last = activeBrush[activeBrush.length - 1] || startPos;
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.stroke();
      setActiveBrush((prev) => [...prev, currentPos]);
    } else {
      // Dikdörtgen önizleme için önceki durumu geri yükle ve geçici çiz
      if (history.length > 0) {
        ctx.putImageData(history[history.length - 1], 0, 0);
      }
      ctx.strokeStyle = "#DC2626";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(
        startPos.x,
        startPos.y,
        currentPos.x - startPos.x,
        currentPos.y - startPos.y
      );
      ctx.setLineDash([]);
    }
  };

  const handleEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !startPos) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    if (mode === "brush") {
      setActiveBrush([]);
      saveHistoryState();
    } else {
      const endPos = getCanvasCoords(e);
      // Önceki durumu geri yükle
      if (history.length > 0) {
        ctx.putImageData(history[history.length - 1], 0, 0);
      }
      // Sansür efektini uygula
      applyRedaction(
        ctx,
        mode,
        startPos.x,
        startPos.y,
        endPos.x - startPos.x,
        endPos.y - startPos.y
      );
      saveHistoryState();
    }
    setStartPos(null);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !file) return;
    const link = document.createElement("a");
    link.download = `sansurlu-${file.name}`;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Güvenlik Rozeti */}
      <div className="flex items-center gap-2.5 rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 text-xs text-blue-900 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-200">
        <ShieldCheck className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
        <div>
          <span className="font-semibold">%100 İstemci Taraflı Güvenlik:</span> Belgeniz (T.C. Kimlik, Sözleşme, Dekont veya Fatura) hiçbir sunucuya yüklenmez. Tüm sansürleme işlemi doğrudan bilgisayarınızın veya telefonunuzun tarayıcısında gerçekleşir.
        </div>
      </div>

      {/* Dosya Yükleme */}
      {!file && (
        <FileUploader
          accept="image/jpeg,image/png,image/webp"
          acceptLabel="JPG, PNG, WEBP Belge veya Fotoğraf"
          onFileSelect={handleFileSelect}
        />
      )}

      {file && image && (
        <div className="space-y-4">
          <FileInfo file={file} onRemove={handleNewFile} />

          {/* Araç Çubuğu */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-3.5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
            {/* Sansür Modları */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "blackout", label: "Siyah Bant", icon: Square },
                { id: "blur", label: "Bulanıklaştır", icon: EyeOff },
                { id: "pixelate", label: "Mozaik / Piksel", icon: Grid },
                { id: "brush", label: "Fırça ile Boya", icon: Paintbrush },
              ].map((m) => {
                const Icon = m.icon;
                const isActive = mode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id as RedactMode)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      isActive
                        ? "bg-primary-600 text-white shadow-xs"
                        : "border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{m.label}</span>
                  </button>
                );
              })}

              {/* Fırça Kalınlığı (Sadece Fırça Modunda) */}
              {mode === "brush" && (
                <div className="ml-2 flex items-center gap-2 border-l border-gray-200 pl-3 dark:border-gray-700">
                  <span className="text-[11px] text-gray-500">Boyut:</span>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-20 accent-primary-600"
                  />
                  <span className="font-mono text-xs text-gray-500">{brushSize}px</span>
                </div>
              )}
            </div>

            {/* Aksiyonlar: Geri Al & Temizle */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleUndo}
                disabled={history.length <= 1}
                className="btn-secondary !px-2.5 !py-1.5 text-xs gap-1 disabled:opacity-40"
                title="Son sansürü geri al"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Geri Al</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={history.length <= 1}
                className="btn-secondary !px-2.5 !py-1.5 text-xs gap-1 text-red-600 disabled:opacity-40 dark:text-red-400"
                title="Tüm sansürleri sıfırla"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Temizle</span>
              </button>

              <button onClick={handleDownload} className="btn-primary !px-3 !py-1.5 text-xs gap-1.5">
                <Download className="h-3.5 w-3.5" />
                <span>Sansürlü İndir (PNG)</span>
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            {mode === "brush"
              ? "💡 Gizlemek istediğiniz T.C., IBAN veya metinlerin üzerini fareyle serbestçe boyayın."
              : "💡 Gizlemek istediğiniz alanın üzerine fareyi tıklayıp sürükleyerek bir kutu çizin."}
          </p>

          {/* Belge Düzenleme Tuvali */}
          <div className="relative flex max-h-[680px] cursor-crosshair items-center justify-center overflow-auto rounded-2xl border border-gray-200 bg-gray-100/70 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <canvas
              ref={canvasRef}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              className="max-h-[640px] max-w-full rounded-lg object-contain shadow-md"
            />
          </div>

          {/* Alt Butonlar */}
          <div className="flex justify-center gap-3 pt-2">
            <button onClick={handleDownload} className="btn-primary gap-2">
              <Download className="h-4 w-4" />
              <span>Güvenli Belgeyi İndir</span>
            </button>
            <button onClick={handleNewFile} className="btn-secondary gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Yeni Belge Yükle</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
