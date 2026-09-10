"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import {
  Maximize2,
  Upload,
  Columns,
  Sparkles,
  RefreshCw,
  Eye,
  Sliders,
} from "lucide-react";

export default function ImageCompareTool() {
  const [beforeImg, setBeforeImg] = useState<string>("");
  const [afterImg, setAfterImg] = useState<string>("");
  const [beforeName, setBeforeName] = useState<string>("Görsel 1 (Önce)");
  const [afterName, setAfterName] = useState<string>("Görsel 2 (Sonra)");
  const [compareMode, setCompareMode] = useState<"slider" | "sideBySide" | "difference">("slider");

  const diffCanvasRef = useRef<HTMLCanvasElement>(null);

  // Örnek görseller yükle
  useEffect(() => {
    // 1. Örnek görsel: Renkli gradyan canvas
    const canvas1 = document.createElement("canvas");
    canvas1.width = 800;
    canvas1.height = 500;
    const ctx1 = canvas1.getContext("2d");
    if (ctx1) {
      const grad1 = ctx1.createLinearGradient(0, 0, 800, 500);
      grad1.addColorStop(0, "#2563EB");
      grad1.addColorStop(0.5, "#7C3AED");
      grad1.addColorStop(1, "#DB2777");
      ctx1.fillStyle = grad1;
      ctx1.fillRect(0, 0, 800, 500);

      ctx1.fillStyle = "#FFFFFF";
      ctx1.font = "bold 36px sans-serif";
      ctx1.textAlign = "center";
      ctx1.fillText("TurkConvert Orijinal", 400, 240);
      ctx1.font = "20px sans-serif";
      ctx1.fillText("Yüksek Kaliteli Görsel Karşılaştırma", 400, 280);
      setBeforeImg(canvas1.toDataURL("image/jpeg", 0.95));
    }

    // 2. Örnek görsel: Hafif filtrelenmiş hali
    const canvas2 = document.createElement("canvas");
    canvas2.width = 800;
    canvas2.height = 500;
    const ctx2 = canvas2.getContext("2d");
    if (ctx2) {
      const grad2 = ctx2.createLinearGradient(0, 0, 800, 500);
      grad2.addColorStop(0, "#059669");
      grad2.addColorStop(0.5, "#0D9488");
      grad2.addColorStop(1, "#2563EB");
      ctx2.fillStyle = grad2;
      ctx2.fillRect(0, 0, 800, 500);

      ctx2.fillStyle = "#FFFFFF";
      ctx2.font = "bold 36px sans-serif";
      ctx2.textAlign = "center";
      ctx2.fillText("TurkConvert Düzenlenmiş", 400, 240);
      ctx2.font = "20px sans-serif";
      ctx2.fillText("Sıkıştırılmış / Optimize Edilmiş Hali", 400, 280);
      setAfterImg(canvas2.toDataURL("image/jpeg", 0.7));
    }
  }, []);

  // Fark Maskesi Çizimi
  useEffect(() => {
    if (compareMode !== "difference" || !beforeImg || !afterImg || !diffCanvasRef.current) return;

    const canvas = diffCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img1 = new Image();
    const img2 = new Image();

    img1.onload = () => {
      img2.onload = () => {
        canvas.width = Math.min(img1.naturalWidth, img2.naturalWidth, 1200);
        canvas.height = Math.min(img1.naturalHeight, img2.naturalHeight, 800);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img1, 0, 0, canvas.width, canvas.height);

        ctx.globalCompositeOperation = "difference";
        ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "source-over";
      };
      img2.src = afterImg;
    };
    img1.src = beforeImg;
  }, [compareMode, beforeImg, afterImg]);

  const handleUploadBefore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBeforeName(file.name);
    const url = URL.createObjectURL(file);
    setBeforeImg(url);
  };

  const handleUploadAfter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAfterName(file.name);
    const url = URL.createObjectURL(file);
    setAfterImg(url);
  };

  const handleReset = () => {
    setBeforeName("Görsel 1 (Önce)");
    setAfterName("Görsel 2 (Sonra)");
  };

  return (
    <div className="space-y-6">
      {/* Üst Yükleme ve Mod Kontrolleri */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-gray-900">
        {/* Dosya Yükleme Butonları */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-primary-400 bg-primary-50/60 px-3.5 py-2 text-xs font-semibold text-primary-700 hover:bg-primary-100/60 dark:border-primary-600 dark:bg-primary-950/30 dark:text-primary-300">
            <Upload className="h-4 w-4" />
            <span>1. Görseli Yükle (Önce)</span>
            <input type="file" accept="image/*" onChange={handleUploadBefore} className="hidden" />
          </label>

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-primary-400 bg-primary-50/60 px-3.5 py-2 text-xs font-semibold text-primary-700 hover:bg-primary-100/60 dark:border-primary-600 dark:bg-primary-950/30 dark:text-primary-300">
            <Upload className="h-4 w-4" />
            <span>2. Görseli Yükle (Sonra)</span>
            <input type="file" accept="image/*" onChange={handleUploadAfter} className="hidden" />
          </label>
        </div>

        {/* Görünüm Modu */}
        <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-0.5 dark:border-gray-700 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => setCompareMode("slider")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              compareMode === "slider"
                ? "bg-primary-600 text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Kaydırıcı</span>
          </button>

          <button
            type="button"
            onClick={() => setCompareMode("sideBySide")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              compareMode === "sideBySide"
                ? "bg-primary-600 text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            }`}
          >
            <Columns className="h-3.5 w-3.5" />
            <span>Yan Yana</span>
          </button>

          <button
            type="button"
            onClick={() => setCompareMode("difference")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              compareMode === "difference"
                ? "bg-primary-600 text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Fark Maskesi</span>
          </button>
        </div>
      </div>

      {/* Karşılaştırma Alanı */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Sol: <strong>{beforeName}</strong></span>
          <span>Sağ: <strong>{afterName}</strong></span>
        </div>

        {/* MOD 1: ETKİLEŞİMLİ KAYDIRICI */}
        {compareMode === "slider" && beforeImg && afterImg && (
          <div className="space-y-3">
            <BeforeAfterSlider
              beforeImage={beforeImg}
              afterImage={afterImg}
              beforeLabel={beforeName}
              afterLabel={afterName}
            />
            <p className="text-center text-xs text-gray-400">
              💡 Çizgiyi sağa ve sola sürükleyerek görseller arasındaki piksel netliğini ve sıkıştırma farkını anlık kıyaslayabilirsiniz.
            </p>
          </div>
        )}

        {/* MOD 2: YAN YANA GÖRÜNÜM */}
        {compareMode === "sideBySide" && beforeImg && afterImg && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-800 dark:bg-gray-800/40">
              <span className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                {beforeName}
              </span>
              <img
                src={beforeImg}
                alt="Önce"
                className="max-h-[500px] w-full rounded-lg object-contain mx-auto"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-2 text-center dark:border-gray-800 dark:bg-gray-800/40">
              <span className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                {afterName}
              </span>
              <img
                src={afterImg}
                alt="Sonra"
                className="max-h-[500px] w-full rounded-lg object-contain mx-auto"
              />
            </div>
          </div>
        )}

        {/* MOD 3: FARK MASKESİ */}
        {compareMode === "difference" && (
          <div className="space-y-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Siyah alanlar iki görselin tamamen aynı olduğunu, parlak/renkli alanlar ise değişen veya kalite farkı oluşan pikselleri gösterir.
            </p>
            <div className="flex max-h-[560px] items-center justify-center overflow-auto rounded-xl border border-gray-200 bg-black p-2 dark:border-gray-800">
              <canvas ref={diffCanvasRef} className="max-h-[520px] max-w-full rounded object-contain" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
