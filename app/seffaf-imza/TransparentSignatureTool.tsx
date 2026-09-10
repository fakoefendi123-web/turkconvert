"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Download,
  RotateCcw,
  Trash2,
  Check,
  Sparkles,
  PenTool,
  FileImage,
  ShieldCheck,
  Maximize2,
} from "lucide-react";

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
}

const COLOR_PRESETS = [
  { label: "Siyah", value: "#111827" },
  { label: "Lacivert", value: "#1E3A8A" },
  { label: "Mavi", value: "#2563EB" },
  { label: "Kırmızı", value: "#DC2626" },
];

export default function TransparentSignatureTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#111827");
  const [lineWidth, setLineWidth] = useState(3.5);
  const [bgMode, setBgMode] = useState<"transparent" | "white">("transparent");
  const [autoTrim, setAutoTrim] = useState(true);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Canvas'ı yeniden çiz
  const redrawCanvas = useCallback(
    (strokeList: Stroke[], activeStroke: Point[] = []) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Temizle
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (bgMode === "white") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const drawStroke = (s: Stroke) => {
        if (s.points.length === 0) return;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.width;
        ctx.beginPath();

        if (s.points.length === 1) {
          ctx.arc(s.points[0].x, s.points[0].y, s.width / 2, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.fill();
          return;
        }

        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (let i = 1; i < s.points.length - 1; i++) {
          const midX = (s.points[i].x + s.points[i + 1].x) / 2;
          const midY = (s.points[i].y + s.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(s.points[i].x, s.points[i].y, midX, midY);
        }
        const last = s.points[s.points.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.stroke();
      };

      strokeList.forEach(drawStroke);

      if (activeStroke.length > 0) {
        drawStroke({
          points: activeStroke,
          color,
          width: lineWidth,
        });
      }
    },
    [bgMode, color, lineWidth]
  );

  useEffect(() => {
    redrawCanvas(strokes, currentStroke);
  }, [strokes, currentStroke, redrawCanvas]);

  // Koordinat alma
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      if (e.touches.length === 0) return null;
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

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const pt = getCoordinates(e);
    if (!pt) return;
    setIsDrawing(true);
    setCurrentStroke([pt]);
    setHasDrawn(true);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const pt = getCoordinates(e);
    if (!pt) return;
    setCurrentStroke((prev) => [...prev, pt]);
  };

  const handleEnd = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentStroke.length > 0) {
      setStrokes((prev) => [
        ...prev,
        {
          points: currentStroke,
          color,
          width: lineWidth,
        },
      ]);
      setCurrentStroke([]);
    }
  };

  const handleUndo = () => {
    setStrokes((prev) => {
      const next = prev.slice(0, -1);
      if (next.length === 0) setHasDrawn(false);
      return next;
    });
  };

  const handleClear = () => {
    setStrokes([]);
    setCurrentStroke([]);
    setHasDrawn(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // İmzayı kırp ve dışa aktar
  const getExportCanvas = (formatBg: "transparent" | "white"): HTMLCanvasElement | null => {
    const canvas = canvasRef.current;
    if (!canvas || strokes.length === 0) return null;

    // Geçici tam tuval
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return null;

    tempCtx.lineCap = "round";
    tempCtx.lineJoin = "round";

    // Tüm vuruşları çiz
    strokes.forEach((s) => {
      if (s.points.length === 0) return;
      tempCtx.strokeStyle = s.color;
      tempCtx.lineWidth = s.width;
      tempCtx.beginPath();
      if (s.points.length === 1) {
        tempCtx.arc(s.points[0].x, s.points[0].y, s.width / 2, 0, Math.PI * 2);
        tempCtx.fillStyle = s.color;
        tempCtx.fill();
        return;
      }
      tempCtx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length - 1; i++) {
        const midX = (s.points[i].x + s.points[i + 1].x) / 2;
        const midY = (s.points[i].y + s.points[i + 1].y) / 2;
        tempCtx.quadraticCurveTo(s.points[i].x, s.points[i].y, midX, midY);
      }
      const last = s.points[s.points.length - 1];
      tempCtx.lineTo(last.x, last.y);
      tempCtx.stroke();
    });

    if (!autoTrim) {
      // Kırpma yoksa arka plan rengini ekleyip dön
      if (formatBg === "white") {
        const finalCanvas = document.createElement("canvas");
        finalCanvas.width = canvas.width;
        finalCanvas.height = canvas.height;
        const finalCtx = finalCanvas.getContext("2d");
        if (!finalCtx) return null;
        finalCtx.fillStyle = "#FFFFFF";
        finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
        finalCtx.drawImage(tempCanvas, 0, 0);
        return finalCanvas;
      }
      return tempCanvas;
    }

    // Auto-trim: sınırlayıcı kutuyu hesapla
    const imgData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const pixels = imgData.data;
    let minX = tempCanvas.width;
    let minY = tempCanvas.height;
    let maxX = 0;
    let maxY = 0;
    let found = false;

    for (let y = 0; y < tempCanvas.height; y++) {
      for (let x = 0; x < tempCanvas.width; x++) {
        const alpha = pixels[(y * tempCanvas.width + x) * 4 + 3];
        if (alpha > 15) {
          found = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!found) return tempCanvas;

    const pad = 24; // Kenar boşluğu
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(tempCanvas.width, maxX + pad);
    maxY = Math.min(tempCanvas.height, maxY + pad);

    const cropW = maxX - minX;
    const cropH = maxY - minY;

    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = cropW;
    cropCanvas.height = cropH;
    const cropCtx = cropCanvas.getContext("2d");
    if (!cropCtx) return tempCanvas;

    if (formatBg === "white") {
      cropCtx.fillStyle = "#FFFFFF";
      cropCtx.fillRect(0, 0, cropW, cropH);
    }

    cropCtx.drawImage(tempCanvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
    return cropCanvas;
  };

  const handleDownloadPng = (transparent: boolean) => {
    const expCanvas = getExportCanvas(transparent ? "transparent" : "white");
    if (!expCanvas) return;

    const link = document.createElement("a");
    link.download = transparent ? "imza-seffaf.png" : "imza-beyaz.png";
    link.href = expCanvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSvg = () => {
    if (strokes.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let svgPaths = "";
    strokes.forEach((s) => {
      if (s.points.length === 0) return;
      let d = `M ${s.points[0].x} ${s.points[0].y}`;
      for (let i = 1; i < s.points.length - 1; i++) {
        const midX = (s.points[i].x + s.points[i + 1].x) / 2;
        const midY = (s.points[i].y + s.points[i + 1].y) / 2;
        d += ` Q ${s.points[i].x} ${s.points[i].y}, ${midX} ${midY}`;
      }
      const last = s.points[s.points.length - 1];
      d += ` L ${last.x} ${last.y}`;
      svgPaths += `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="${s.width}" stroke-linecap="round" stroke-linejoin="round" />`;
    });

    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvas.width} ${canvas.height}" width="${canvas.width}" height="${canvas.height}">${svgPaths}</svg>`;
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "imza.svg";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Gizlilik Güvencesi */}
      <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50/60 p-3 text-xs text-green-800 dark:border-green-900/40 dark:bg-green-950/30 dark:text-green-300">
        <ShieldCheck className="h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
        <span>
          <strong>%100 Güvenli & Gizli:</strong> Çizdiğiniz imza hiçbir sunucuya aktarılmaz veya kaydedilmez. Tamamen tarayıcınızın belleğinde oluşturulur.
        </span>
      </div>

      {/* Kontrol Paneli */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-900/40">
        {/* Renk Seçimi */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Mürekkep:
          </span>
          <div className="flex items-center gap-1.5">
            {COLOR_PRESETS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setColor(c.value)}
                className={`h-7 w-7 rounded-full border-2 transition-all ${
                  color === c.value
                    ? "scale-110 border-primary-500 ring-2 ring-primary-500/30"
                    : "border-gray-300 hover:scale-105 dark:border-gray-600"
                }`}
                style={{ backgroundColor: c.value }}
                title={c.label}
              />
            ))}
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-7 w-7 cursor-pointer rounded-full border-0 bg-transparent p-0"
              title="Özel Renk Seç"
            />
          </div>
        </div>

        {/* Fırça Kalınlığı */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Kalınlık:
          </span>
          <input
            type="range"
            min="1.5"
            max="8"
            step="0.5"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-24 accent-primary-600 sm:w-32"
          />
          <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
            {lineWidth}px
          </span>
        </div>

        {/* Araç Butonları */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleUndo}
            disabled={strokes.length === 0}
            className="btn-secondary !px-2.5 !py-1.5 text-xs gap-1 disabled:opacity-40"
            title="Geri Al"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Geri Al</span>
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={strokes.length === 0}
            className="btn-secondary !px-2.5 !py-1.5 text-xs gap-1 text-red-600 hover:text-red-700 disabled:opacity-40 dark:text-red-400"
            title="Temizle"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Temizle</span>
          </button>
        </div>
      </div>

      {/* Çizim Tuvali */}
      <div className="relative">
        <div
          className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 shadow-inner dark:border-gray-700 ${
            bgMode === "transparent"
              ? "bg-[linear-gradient(45deg,#f3f4f6_25%,transparent_25%),linear-gradient(-45deg,#f3f4f6_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f3f4f6_75%),linear-gradient(-45deg,transparent_75%,#f3f4f6_75%)] bg-[size:20px_20px] [background-position:0_0,0_10px,10px_-10px,-10px_0px] dark:bg-[linear-gradient(45deg,#1f2937_25%,transparent_25%),linear-gradient(-45deg,#1f2937_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1f2937_75%),linear-gradient(-45deg,transparent_75%,#1f2937_75%)]"
              : "bg-white dark:bg-white"
          }`}
        >
          <canvas
            ref={canvasRef}
            width={900}
            height={420}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            className="h-[320px] w-full touch-none cursor-crosshair sm:h-[400px]"
          />

          {!hasDrawn && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
              <PenTool className="mb-2 h-10 w-10 stroke-1 opacity-60 animate-bounce" />
              <p className="text-sm font-medium">
                İmzanızı buraya fare veya dokunmatik ekran ile çizin
              </p>
              <p className="mt-1 text-xs opacity-75">
                (Çizim bittikten sonra şeffaf PNG veya SVG olarak indirebilirsiniz)
              </p>
            </div>
          )}
        </div>

        {/* Seçenekler: Tuval Arka Planı ve Otomatik Kırpma */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 dark:text-gray-400">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoTrim}
              onChange={(e) => setAutoTrim(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span>
              <strong>Otomatik Kenar Kırpma (Auto-Trim):</strong> İmzanın etrafındaki gereksiz boşlukları temizle
            </span>
          </label>

          <div className="flex items-center gap-2">
            <span>Tuval Görünümü:</span>
            <button
              type="button"
              onClick={() => setBgMode("transparent")}
              className={`rounded px-2 py-1 font-medium transition ${
                bgMode === "transparent"
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              Şeffaf Zemin
            </button>
            <button
              type="button"
              onClick={() => setBgMode("white")}
              className={`rounded px-2 py-1 font-medium transition ${
                bgMode === "white"
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              Beyaz Zemin
            </button>
          </div>
        </div>
      </div>

      {/* İndirme Butonları */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h3 className="mb-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
          İmzanızı İndirin
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => handleDownloadPng(true)}
            disabled={strokes.length === 0}
            className="btn-primary gap-2 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>Şeffaf PNG Olarak İndir (Önerilen)</span>
          </button>
          <button
            type="button"
            onClick={() => handleDownloadPng(false)}
            disabled={strokes.length === 0}
            className="btn-secondary gap-2 disabled:opacity-50"
          >
            <FileImage className="h-4 w-4" />
            <span>Beyaz Zeminli PNG İndir</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadSvg}
            disabled={strokes.length === 0}
            className="btn-secondary gap-2 disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            <span>Vektörel SVG İndir</span>
          </button>
        </div>
        <p className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
          Şeffaf PNG imzanızı PDF sözleşmelerine, Word belgelerine ve e-postalara doğrudan ekleyebilirsiniz.
        </p>
      </div>
    </div>
  );
}
