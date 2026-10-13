"use client";

import { useState, useCallback, useRef } from "react";
import { FileUploader, FileInfo } from "@/components/ui/FileUploader";
import { ConversionProgress } from "@/components/ui/ConversionProgress";
import { ConversionResult } from "@/components/ui/ConversionResult";
import { resizeImage } from "@/lib/converters/image";
import { formatFileSize } from "@/lib/utils";
import {
  Lock,
  Unlock,
  RefreshCw,
  Layers,
  Plus,
  Trash2,
  Archive,
  Download,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import JSZip from "jszip";

type ToolState = "idle" | "ready" | "converting" | "done" | "error";

interface BatchResizeItem {
  id: string;
  file: File;
  resultBlob?: Blob;
  status: "idle" | "converting" | "done" | "error";
}

export default function ImageResizerTool() {
  const [state, setState] = useState<ToolState>("idle");
  const [files, setFiles] = useState<File[]>([]);

  // Tekil mod
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [maintainAspect, setMaintainAspect] = useState<boolean>(true);
  const [singleResult, setSingleResult] = useState<Blob | null>(null);

  // Toplu mod
  const [batchItems, setBatchItems] = useState<BatchResizeItem[]>([]);
  const [batchScale, setBatchScale] = useState<number>(50); // %50 varsayılan
  const [isZipping, setIsZipping] = useState(false);
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  const [errorMsg, setErrorMsg] = useState<string>("");

  const isBatch = files.length > 1;

  const handleFilesSelect = useCallback((selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setFiles(selectedFiles);
    setErrorMsg("");

    if (selectedFiles.length === 1) {
      const f = selectedFiles[0];
      const img = new Image();
      const url = URL.createObjectURL(f);
      img.onload = () => {
        setOriginalWidth(img.naturalWidth);
        setOriginalHeight(img.naturalHeight);
        setWidth(img.naturalWidth);
        setHeight(img.naturalHeight);
        URL.revokeObjectURL(url);
        setState("ready");
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        setErrorMsg("Görsel yüklenirken bir sorun oluştu.");
        setState("error");
      };
      img.src = url;
    } else {
      const items: BatchResizeItem[] = selectedFiles.map((f, i) => ({
        id: `${f.name}-${i}-${Date.now()}`,
        file: f,
        status: "idle",
      }));
      setBatchItems(items);
      setState("ready");
    }
  }, []);

  const handleAddMoreFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      const newItems: BatchResizeItem[] = newFiles.map((f, i) => ({
        id: `${f.name}-${i}-${Date.now()}`,
        file: f,
        status: "idle",
      }));
      setBatchItems((prev) => [...prev, ...newItems]);
      e.target.value = "";
    }
  };

  const handleRemoveBatchItem = (id: string) => {
    setBatchItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      if (updated.length <= 1) {
        if (updated.length === 1) {
          handleFilesSelect([updated[0].file]);
        } else {
          setFiles([]);
          setState("idle");
        }
      } else {
        setFiles(updated.map((u) => u.file));
      }
      return updated;
    });
  };

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
    if (files.length === 0) return;

    setState("converting");

    if (files.length === 1) {
      if (!width || !height) return;
      try {
        const blob = await resizeImage(
          files[0],
          Number(width),
          Number(height),
          maintainAspect
        );
        setSingleResult(blob);
        setState("done");
      } catch {
        setErrorMsg("Görsel boyutlandırılırken bir sorun oluştu.");
        setState("error");
      }
    } else {
      // Toplu Boyutlandırma
      const updated = [...batchItems];
      for (let i = 0; i < updated.length; i++) {
        updated[i].status = "converting";
        setBatchItems([...updated]);

        try {
          const f = updated[i].file;
          const img = new Image();
          const url = URL.createObjectURL(f);
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject();
            img.src = url;
          });
          URL.revokeObjectURL(url);

          const targetW = Math.max(1, Math.round((img.naturalWidth * batchScale) / 100));
          const targetH = Math.max(1, Math.round((img.naturalHeight * batchScale) / 100));

          const blob = await resizeImage(f, targetW, targetH, true);
          updated[i].resultBlob = blob;
          updated[i].status = "done";
        } catch {
          updated[i].status = "error";
        }
        setBatchItems([...updated]);
      }
      setState("done");
    }
  }, [files, width, height, maintainAspect, batchItems, batchScale]);

  const handleDownloadSingleItem = (item: BatchResizeItem) => {
    if (!item.resultBlob) return;
    const url = URL.createObjectURL(item.resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resized_${item.file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAllZip = async () => {
    const completed = batchItems.filter((i) => i.status === "done" && i.resultBlob);
    if (completed.length === 0) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();
      completed.forEach((item) => {
        if (item.resultBlob) {
          zip.file(`resized_${item.file.name}`, item.resultBlob);
        }
      });
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `TurkConvert_Boyutlandirilmis_Gorseller_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("ZIP dosyası oluşturulurken hata meydana geldi.");
    } finally {
      setIsZipping(false);
    }
  };

  const handleReset = useCallback(() => {
    setFiles([]);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setWidth("");
    setHeight("");
    setMaintainAspect(true);
    setSingleResult(null);
    setBatchItems([]);
    setErrorMsg("");
    setState("idle");
  }, []);

  return (
    <div className="space-y-6">
      {/* Dosya Yükleme */}
      {(state === "idle" || (state === "error" && files.length === 0)) && (
        <FileUploader
          accept="image/*"
          acceptLabel="Tüm Görsel Formatları (Tekli veya Toplu)"
          multiple={true}
          onFileSelect={(f) => handleFilesSelect([f])}
          onFilesSelect={handleFilesSelect}
        />
      )}

      {/* Hazırlık & Ayarlar Paneli */}
      {state === "ready" && files.length > 0 && (
        <div className="space-y-6">
          {!isBatch ? (
            <FileInfo file={files[0]} onRemove={handleReset} />
          ) : (
            <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/60">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Toplu Boyutlandırma Listesi
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Toplam {batchItems.length} görsel seçildi
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addMoreInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-200"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Daha Fazla Ekle</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100 dark:border-rose-950 dark:bg-rose-950/40 dark:text-rose-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Temizle</span>
                  </button>
                </div>
              </div>

              <div className="mt-4 max-h-52 overflow-y-auto space-y-2 pr-1">
                {batchItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-2 text-xs dark:border-white/5 dark:bg-obsidian-850/60"
                  >
                    <div className="flex items-center gap-2.5 truncate max-w-sm">
                      <ImageIcon className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="truncate font-medium text-slate-800 dark:text-slate-200">
                        {item.file.name}
                      </span>
                      <span className="text-slate-400 text-[11px] shrink-0">
                        ({formatFileSize(item.file.size)})
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemoveBatchItem(item.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <input
            ref={addMoreInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleAddMoreFiles}
            className="hidden"
          />

          {/* Boyutlandırma Ayarları */}
          {!isBatch ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Orijinal Boyut: {originalWidth} × {originalHeight} px
                </span>
                <div className="flex gap-2">
                  {[25, 50, 75, 150, 200].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => handlePreset(pct)}
                      className="rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      %{pct}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Genişlik (px)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className="input-field"
                    placeholder="Genişlik"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Yükseklik (px)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className="input-field"
                    placeholder="Yükseklik"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleMaintainAspectToggle(!maintainAspect)}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  {maintainAspect ? (
                    <Lock className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  ) : (
                    <Unlock className="h-4 w-4" />
                  )}
                  <span>En-boy oranını koru</span>
                </button>

                <button
                  onClick={handleResize}
                  disabled={!width || !height}
                  className="btn-primary"
                >
                  Boyutlandır
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 space-y-4">
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                Toplu Ölçeklendirme Oranı
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {[
                  { label: "%25 (Çok Küçük)", val: 25 },
                  { label: "%50 (Yarı Boyut)", val: 50 },
                  { label: "%75 (Hafif Küçült)", val: 75 },
                  { label: "%150 (Büyüt)", val: 150 },
                  { label: "%200 (2x Büyüt)", val: 200 },
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => setBatchScale(preset.val)}
                    className={`rounded-xl border p-3 text-center transition ${
                      batchScale === preset.val
                        ? "border-primary-500 bg-primary-50 text-primary-700 font-bold dark:border-primary-400 dark:bg-primary-950 dark:text-primary-300"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    <span className="block text-xs">{preset.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-center pt-3">
                <button onClick={handleResize} className="btn-primary gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>{batchItems.length} Görseli Topluca Boyutlandır</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Süreç */}
      {state === "converting" && (
        <ConversionProgress
          message={
            isBatch
              ? `${files.length} görseliniz toplu olarak boyutlandırılıyor...`
              : "Görseliniz boyutlandırılıyor..."
          }
        />
      )}

      {/* Tekli Sonuç */}
      {state === "done" && !isBatch && singleResult && files[0] && (
        <ConversionResult
          fileName={`resized_${files[0].name}`}
          blob={singleResult}
          originalSize={files[0].size}
          onReset={handleReset}
        />
      )}

      {/* Toplu Sonuç */}
      {state === "done" && isBatch && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-950 dark:bg-emerald-950/30">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  Toplu Boyutlandırma Tamamlandı!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  {batchItems.filter((i) => i.status === "done").length} görsel %{batchScale} oranında yeniden boyutlandırıldı.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleDownloadAllZip}
                disabled={isZipping}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500"
              >
                <Archive className="h-4 w-4" />
                <span>{isZipping ? "ZIP Hazırlanıyor..." : "Tümünü ZIP Olarak İndir"}</span>
              </button>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-200"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Yeni İşlem</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/70 space-y-3">
            <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider px-2">
              Boyutlandırılan Dosyalar:
            </h5>
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {batchItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 px-2 gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {item.file.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Orijinal: {formatFileSize(item.file.size)} • Ölçek: %{batchScale}
                    </p>
                  </div>

                  {item.status === "done" && item.resultBlob && (
                    <button
                      onClick={() => handleDownloadSingleItem(item)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-300"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>İndir</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
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
