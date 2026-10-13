"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { FileUploader, FileInfo } from "@/components/ui/FileUploader";
import { ConversionProgress } from "@/components/ui/ConversionProgress";
import { ConversionResult } from "@/components/ui/ConversionResult";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import {
  compressImageAdvanced,
  CompressResult,
} from "@/lib/converters/image";
import { changeFileExtension, formatFileSize } from "@/lib/utils";
import {
  RefreshCw,
  Sparkles,
  Sliders,
  CheckCircle2,
  Info,
  Maximize2,
  Download,
  Archive,
  Layers,
  Plus,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import JSZip from "jszip";

type ToolState = "idle" | "ready" | "converting" | "done" | "error";

interface QualityPreset {
  value: number;
  label: string;
  badge: string;
  description: string;
}

const QUALITY_PRESETS: QualityPreset[] = [
  {
    value: 0.8,
    label: "Hafif Sıkıştırma",
    badge: "%80 Kalite",
    description: "Maksimum netlik, hafif boyut tasarrufu",
  },
  {
    value: 0.6,
    label: "Dengeli",
    badge: "Önerilen",
    description: "Optimum dosya boyutu ve yüksek görsel kalitesi",
  },
  {
    value: 0.35,
    label: "Yüksek Sıkıştırma",
    badge: "Maksimum Tasarruf",
    description: "Web siteleri ve e-posta için en küçük dosya boyutu",
  },
];

interface BatchItem {
  id: string;
  file: File;
  resultName?: string;
  result?: CompressResult;
  status: "idle" | "converting" | "done" | "error";
}

export default function ImageCompressorTool() {
  const [state, setState] = useState<ToolState>("idle");
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState<number>(0.6);
  const [targetFormat, setTargetFormat] = useState<"auto" | "image/webp" | "image/jpeg">("auto");
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);

  // Tekli dosya modu verileri
  const [singlePreviewUrl, setSinglePreviewUrl] = useState<string>("");
  const [singleCompressResult, setSingleCompressResult] = useState<CompressResult | null>(null);
  const [singleResultName, setSingleResultName] = useState<string>("");

  // Toplu dosya modu verileri
  const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
  const [isZipping, setIsZipping] = useState(false);
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  const [errorMsg, setErrorMsg] = useState<string>("");

  const isBatch = files.length > 1;

  // Dosya seçildiğinde
  const handleFilesSelect = useCallback((selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;

    setFiles(selectedFiles);
    setErrorMsg("");

    if (selectedFiles.length === 1) {
      const singleFile = selectedFiles[0];
      const url = URL.createObjectURL(singleFile);
      setSinglePreviewUrl(url);
      setSingleCompressResult(null);
    } else {
      const items: BatchItem[] = selectedFiles.map((f, i) => ({
        id: `${f.name}-${i}-${Date.now()}`,
        file: f,
        status: "idle",
      }));
      setBatchItems(items);
    }

    setState("ready");
  }, []);

  // Toplu modda daha fazla dosya ekleme
  const handleAddMoreFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      const newItems: BatchItem[] = newFiles.map((f, i) => ({
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
          setFiles([updated[0].file]);
          const url = URL.createObjectURL(updated[0].file);
          setSinglePreviewUrl(url);
          setSingleCompressResult(null);
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

  // Sıkıştırma İşlemi
  const handleCompress = useCallback(async () => {
    if (files.length === 0) return;

    setState("converting");

    if (files.length === 1) {
      const file = files[0];
      try {
        const res = await compressImageAdvanced(file, {
          quality,
          targetFormat,
          maxWidth,
        });

        const newName = changeFileExtension(file.name, res.extension);
        setSingleCompressResult(res);
        setSingleResultName(newName);
        setState("done");
      } catch {
        setErrorMsg("Görsel sıkıştırılırken bir sorun oluştu.");
        setState("error");
      }
    } else {
      // Toplu Sıkıştırma
      const updatedItems = [...batchItems];
      for (let i = 0; i < updatedItems.length; i++) {
        updatedItems[i].status = "converting";
        setBatchItems([...updatedItems]);

        try {
          const res = await compressImageAdvanced(updatedItems[i].file, {
            quality,
            targetFormat,
            maxWidth,
          });
          const newName = changeFileExtension(updatedItems[i].file.name, res.extension);
          updatedItems[i].result = res;
          updatedItems[i].resultName = newName;
          updatedItems[i].status = "done";
        } catch {
          updatedItems[i].status = "error";
        }
        setBatchItems([...updatedItems]);
      }
      setState("done");
    }
  }, [files, batchItems, quality, targetFormat, maxWidth]);

  // Tekil indirme (Toplu moddayken tek öğe)
  const handleDownloadItem = (item: BatchItem) => {
    if (!item.result?.blob || !item.resultName) return;
    const url = URL.createObjectURL(item.result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = item.resultName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Tümünü ZIP Olarak İndir
  const handleDownloadAllZip = async () => {
    const completed = batchItems.filter((i) => i.status === "done" && i.result?.blob);
    if (completed.length === 0) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();
      completed.forEach((item) => {
        if (item.result?.blob && item.resultName) {
          zip.file(item.resultName, item.result.blob);
        }
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `TurkConvert_Sikistirilmis_Gorseller_${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("ZIP dosyası oluşturulurken bir sorun çıktı.");
    } finally {
      setIsZipping(false);
    }
  };

  // Sıfırlama
  const handleReset = useCallback(() => {
    if (singlePreviewUrl) URL.revokeObjectURL(singlePreviewUrl);
    if (singleCompressResult?.previewUrl) URL.revokeObjectURL(singleCompressResult.previewUrl);
    batchItems.forEach((b) => {
      if (b.result?.previewUrl) URL.revokeObjectURL(b.result.previewUrl);
    });

    setFiles([]);
    setSinglePreviewUrl("");
    setSingleCompressResult(null);
    setSingleResultName("");
    setBatchItems([]);
    setQuality(0.6);
    setTargetFormat("auto");
    setMaxWidth(undefined);
    setErrorMsg("");
    setState("idle");
  }, [singlePreviewUrl, singleCompressResult, batchItems]);

  useEffect(() => {
    return () => {
      if (singlePreviewUrl) URL.revokeObjectURL(singlePreviewUrl);
      if (singleCompressResult?.previewUrl) URL.revokeObjectURL(singleCompressResult.previewUrl);
      batchItems.forEach((b) => {
        if (b.result?.previewUrl) URL.revokeObjectURL(b.result.previewUrl);
      });
    };
  }, [singlePreviewUrl, singleCompressResult, batchItems]);

  return (
    <div className="space-y-6">
      {/* Dosya Yükleme */}
      {(state === "idle" || (state === "error" && files.length === 0)) && (
        <FileUploader
          accept="image/jpeg,image/png,image/webp"
          acceptLabel="JPG, PNG, WEBP (Tekli veya Toplu)"
          multiple={true}
          onFileSelect={(f) => handleFilesSelect([f])}
          onFilesSelect={handleFilesSelect}
        />
      )}

      {/* Hazırlık & Ayarlar Paneli */}
      {state === "ready" && files.length > 0 && (
        <div className="space-y-6">
          {/* Tekli Dosya Bilgisi veya Toplu Dosya Listesi */}
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
                      Toplu Sıkıştırma Listesi
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Toplam {batchItems.length} görsel seçildi (
                      {formatFileSize(
                        batchItems.reduce((acc, curr) => acc + curr.file.size, 0)
                      )}
                      )
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

              {/* Liste Önizleme */}
              <div className="mt-4 max-h-60 overflow-y-auto space-y-2 pr-1">
                {batchItems.map((item, idx) => (
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

          {/* Gizli Dosya Ekleme Inputu */}
          <input
            ref={addMoreInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleAddMoreFiles}
            className="hidden"
          />

          {/* Kalite Hazır Ayarları */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Sıkıştırma Seviyesi {isBatch && "(Tüm Görsellere Uygulanır)"}
              </label>
              <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                %{Math.round(quality * 100)} Kalite
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {QUALITY_PRESETS.map((opt) => {
                const isSelected = Math.abs(quality - opt.value) < 0.05;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setQuality(opt.value)}
                    className={`relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-primary-500 bg-primary-50/50 ring-2 ring-primary-500/20 dark:border-primary-400 dark:bg-primary-950/20"
                        : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800/60 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {opt.label}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          isSelected
                            ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {opt.badge}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {opt.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Hassas Kalite Kaydırıcısı */}
            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50/60 p-4 dark:border-gray-800 dark:bg-gray-900/40">
              <div className="mb-2 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sliders className="h-3.5 w-3.5" />
                  Hassas Kalite Ayarı
                </span>
                <span className="font-mono font-bold text-gray-900 dark:text-white">
                  %{Math.round(quality * 100)}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                step="5"
                value={Math.round(quality * 100)}
                onChange={(e) => setQuality(Number(e.target.value) / 100)}
                className="w-full accent-primary-600"
              />
            </div>
          </div>

          {/* Gelişmiş Seçenekler: Format & Maksimum Çözünürlük */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Hedef Format
              </label>
              <select
                value={targetFormat}
                onChange={(e) =>
                  setTargetFormat(e.target.value as "auto" | "image/webp" | "image/jpeg")
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="auto">Otomatik (En Küçük Boyut & WebP)</option>
                <option value="image/webp">WEBP (En Yüksek Sıkıştırma)</option>
                <option value="image/jpeg">JPG (Geniş Uyumluluk)</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Maksimum Çözünürlük (İsteğe Bağlı)
              </label>
              <select
                value={maxWidth || ""}
                onChange={(e) =>
                  setMaxWidth(e.target.value ? Number(e.target.value) : undefined)
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="">Orijinal Çözünürlüğü Koru</option>
                <option value="2560">Maks. 2560px (2K QHD)</option>
                <option value="1920">Maks. 1920px (Full HD - Web İçin İdeal)</option>
                <option value="1280">Maks. 1280px (HD)</option>
                <option value="800">Maks. 800px (Blog & Küçük Görseller)</option>
              </select>
            </div>
          </div>

          {/* Sıkıştır Butonu */}
          <div className="flex justify-center pt-2">
            <button onClick={handleCompress} className="btn-primary gap-2">
              <Sparkles className="h-4 w-4" />
              {isBatch ? `${files.length} Görseli Topluca Sıkıştır` : "Görseli Sıkıştır"}
            </button>
          </div>
        </div>
      )}

      {/* Sıkıştırma Süreci */}
      {state === "converting" && (
        <ConversionProgress
          message={
            isBatch
              ? `${files.length} görseliniz toplu olarak sıkıştırılıyor...`
              : "Görseliniz akıllı algoritma ile sıkıştırılıyor..."
          }
        />
      )}

      {/* Tekli Dosya Sonuç Ekranı */}
      {state === "done" && !isBatch && singleCompressResult && files[0] && (
        <div className="space-y-6">
          {singleCompressResult.alreadyOptimized && (
            <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-800 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300">
              <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-semibold">Görseliniz Zaten Optimize Edilmiş</p>
                <p className="mt-0.5 text-blue-700/90 dark:text-blue-300/90">
                  Bu görsel zaten maksimum düzeyde sıkıştırılmış bir formata sahipti. Kalite kaybı yaşamamanız için dosya boyutu büyütülmeden en ideal hali korundu.
                </p>
              </div>
            </div>
          )}

          <ConversionResult
            fileName={singleResultName}
            blob={singleCompressResult.blob}
            originalSize={files[0].size}
            onReset={handleReset}
          />

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Maximize2 className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Canlı Kalite Karşılaştırması (Önce / Sonra)
                </h4>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Kaydırıcıyı sağa-sola sürükleyerek netliği inceleyin
              </span>
            </div>

            <BeforeAfterSlider
              beforeImage={singlePreviewUrl}
              afterImage={singleCompressResult.previewUrl}
              beforeLabel="Orijinal"
              afterLabel={`Sıkıştırılmış (%${singleCompressResult.savingsPercent} Tasarruf)`}
            />
          </div>
        </div>
      )}

      {/* Toplu Dosya Sonuç Ekranı */}
      {state === "done" && isBatch && (
        <div className="space-y-6">
          {/* Üst Özet Kartı */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-950 dark:bg-emerald-950/30">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                  Toplu Sıkıştırma Başarıyla Tamamlandı!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  Toplam {batchItems.filter((i) => i.status === "done").length} görsel optimize edildi.
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
                <span>{isZipping ? "ZIP Paketleniyor..." : "Tümünü ZIP Olarak İndir"}</span>
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

          {/* Bireysel Dosya Listesi */}
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/70 space-y-3">
            <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider px-2">
              Sıkıştırılan Dosyalar:
            </h5>
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {batchItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 px-2 gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {item.resultName || item.file.name}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-400">
                      <span>{formatFileSize(item.file.size)}</span>
                      <span>→</span>
                      {item.result ? (
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {formatFileSize(item.result.compressedSize)} (-%{item.result.savingsPercent})
                        </span>
                      ) : (
                        <span className="text-rose-500">Hata</span>
                      )}
                    </div>
                  </div>

                  {item.status === "done" && item.result && (
                    <button
                      onClick={() => handleDownloadItem(item)}
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
