"use client";

import { useState, useCallback, useRef } from "react";
import { FileUploader, FileInfo } from "@/components/ui/FileUploader";
import { Download, RefreshCw, Layers, Archive, Plus, Trash2, CheckCircle2, FileImage } from "lucide-react";
import { changeFileExtension, formatFileSize } from "@/lib/utils";
import JSZip from "jszip";

interface BatchSvgItem {
  id: string;
  file: File;
  resultBlob?: Blob;
  status: "idle" | "converting" | "done" | "error";
}

export default function SvgToPngTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [scale, setScale] = useState<number>(2);
  const [background, setBackground] = useState<"transparent" | "white">("transparent");
  const [isConverting, setIsConverting] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [batchItems, setBatchItems] = useState<BatchSvgItem[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  const isBatch = files.length > 1;

  const handleFilesSelect = useCallback((selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setFiles(selectedFiles);
    setErrorMsg("");

    const items: BatchSvgItem[] = selectedFiles.map((f, i) => ({
      id: `${f.name}-${i}-${Date.now()}`,
      file: f,
      status: "idle",
    }));
    setBatchItems(items);
  }, []);

  const handleAddMore = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      const newItems: BatchSvgItem[] = newFiles.map((f, i) => ({
        id: `${f.name}-${i}-${Date.now()}`,
        file: f,
        status: "idle",
      }));
      setBatchItems((prev) => [...prev, ...newItems]);
      e.target.value = "";
    }
  };

  const handleRemoveItem = (id: string) => {
    setBatchItems((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      setFiles(updated.map((u) => u.file));
      return updated;
    });
  };

  const convertSingleSvg = async (svgFile: File, s: number, bg: "transparent" | "white"): Promise<Blob> => {
    const svgText = await svgFile.text();
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const naturalW = img.naturalWidth || 512;
        const naturalH = img.naturalHeight || 512;

        canvas.width = naturalW * s;
        canvas.height = naturalH * s;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error("Canvas oluşturulamadı"));
          return;
        }

        if (bg === "white") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);

        canvas.toBlob((pngBlob) => {
          if (pngBlob) resolve(pngBlob);
          else reject(new Error("PNG oluşturulamadı"));
        }, "image/png");
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("SVG işlenemedi"));
      };

      img.src = url;
    });
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsConverting(true);
    setErrorMsg("");

    if (files.length === 1) {
      try {
        const blob = await convertSingleSvg(files[0], scale, background);
        const pngUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = changeFileExtension(files[0].name, "png");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(pngUrl);
      } catch {
        setErrorMsg("SVG dönüştürülürken bir hata oluştu.");
      } finally {
        setIsConverting(false);
      }
    } else {
      // Toplu
      const updated = [...batchItems];
      for (let i = 0; i < updated.length; i++) {
        updated[i].status = "converting";
        setBatchItems([...updated]);

        try {
          const blob = await convertSingleSvg(updated[i].file, scale, background);
          updated[i].resultBlob = blob;
          updated[i].status = "done";
        } catch {
          updated[i].status = "error";
        }
        setBatchItems([...updated]);
      }
      setIsConverting(false);
    }
  };

  const handleDownloadSingleItem = (item: BatchSvgItem) => {
    if (!item.resultBlob) return;
    const url = URL.createObjectURL(item.resultBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = changeFileExtension(item.file.name, "png");
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
          zip.file(changeFileExtension(item.file.name, "png"), item.resultBlob);
        }
      });
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `TurkConvert_SVG_PNG_${Date.now()}.zip`;
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

  const handleReset = () => {
    setFiles([]);
    setBatchItems([]);
    setErrorMsg("");
  };

  return (
    <div className="space-y-6">
      {files.length === 0 ? (
        <FileUploader
          accept=".svg,image/svg+xml"
          acceptLabel="SVG (Tekli veya Toplu)"
          multiple={true}
          onFileSelect={(f) => handleFilesSelect([f])}
          onFilesSelect={handleFilesSelect}
        />
      ) : (
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
                      Toplu SVG Dönüştürme Listesi
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Toplam {batchItems.length} SVG dosyası seçildi
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
                      <FileImage className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="truncate font-medium text-slate-800 dark:text-slate-200">
                        {item.file.name}
                      </span>
                      <span className="text-slate-400 text-[11px] shrink-0">
                        ({formatFileSize(item.file.size)})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.status === "done" && item.resultBlob && (
                        <button
                          onClick={() => handleDownloadSingleItem(item)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-primary-600 hover:bg-primary-50 dark:border-white/10 dark:bg-obsidian-850 dark:text-primary-400"
                        >
                          <Download className="h-3 w-3" />
                          <span>İndir</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <input
            ref={addMoreInputRef}
            type="file"
            multiple
            accept=".svg,image/svg+xml"
            onChange={handleAddMore}
            className="hidden"
          />

          {/* Ayarlar */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Çözünürlük Çarpanı */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Çözünürlük Kalitesi {isBatch && "(Tümüne Uygulanır)"}
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
                  ? "2 kat netlik (Önerilen)"
                  : scale === 4
                  ? "4 kat ultra HD kalite"
                  : "8 kat maksimum baskı kalitesi"}
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
                  Şeffaf (Saydam)
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
            </div>
          </div>

          {errorMsg && (
            <div className="rounded-lg bg-red-50 p-3 text-center text-xs text-red-600 dark:bg-red-950/30 dark:text-red-400">
              {errorMsg}
            </div>
          )}

          {/* Dönüştür Butonları */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleConvert}
              disabled={isConverting}
              className="btn-primary gap-2"
            >
              <Download className="h-4 w-4" />
              {isConverting
                ? "Dönüştürülüyor..."
                : isBatch
                ? `${batchItems.length} SVG'yi PNG'ye Dönüştür`
                : "PNG Olarak İndir"}
            </button>

            {isBatch && batchItems.some((i) => i.status === "done") && (
              <button
                onClick={handleDownloadAllZip}
                disabled={isZipping}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500"
              >
                <Archive className="h-4 w-4" />
                <span>{isZipping ? "ZIP Paketleniyor..." : "Tümünü ZIP İndir"}</span>
              </button>
            )}

            <button onClick={handleReset} className="btn-secondary gap-2">
              <RefreshCw className="h-4 w-4" />
              Yeni Dosyalar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
