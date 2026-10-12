"use client";

import { useState, useRef } from "react";
import {
  Upload,
  FileText,
  RotateCw,
  Trash2,
  Undo2,
  ArrowLeft,
  ArrowRight,
  Download,
  Copy,
  Layers,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { PDFDocument, degrees } from "pdf-lib";

interface PageItem {
  id: string;
  originalIndex: number;
  rotation: number; // 0, 90, 180, 270
  isDeleted: boolean;
  width: number;
  height: number;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

export default function PdfOrganizeTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [outputSize, setOutputSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (selectedFile: File) => {
    if (!selectedFile || selectedFile.type !== "application/pdf") return;

    setFile(selectedFile);
    setDownloadUrl(null);
    setIsLoading(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const pageCount = pdfDoc.getPageCount();

      const newPages: PageItem[] = [];
      for (let i = 0; i < pageCount; i++) {
        const page = pdfDoc.getPage(i);
        const { width, height } = page.getSize();
        const initialRotation = page.getRotation().angle || 0;

        newPages.push({
          id: `page-${i}-${Date.now()}`,
          originalIndex: i,
          rotation: initialRotation,
          isDeleted: false,
          width: Math.round(width),
          height: Math.round(height),
        });
      }

      setPages(newPages);
    } catch (err) {
      console.error("PDF yükleme hatası:", err);
      alert("PDF belgesi yüklenirken bir hata oluştu. Şifresiz geçerli bir PDF seçtiğinizden emin olun.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRotatePage = (index: number) => {
    setPages((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        rotation: (copy[index].rotation + 90) % 360,
      };
      return copy;
    });
  };

  const handleRotateAll = () => {
    setPages((prev) =>
      prev.map((p) => ({
        ...p,
        rotation: (p.rotation + 90) % 360,
      }))
    );
  };

  const handleDeletePage = (index: number) => {
    setPages((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], isDeleted: !copy[index].isDeleted };
      return copy;
    });
  };

  const handleMovePage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= pages.length) return;
    setPages((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  const handleDuplicatePage = (index: number) => {
    setPages((prev) => {
      const copy = [...prev];
      const target = copy[index];
      const duplicated: PageItem = {
        ...target,
        id: `dup-${Date.now()}-${Math.random()}`,
      };
      copy.splice(index + 1, 0, duplicated);
      return copy;
    });
  };

  const handleGeneratePdf = async () => {
    if (!file) return;

    const activePages = pages.filter((p) => !p.isDeleted);
    if (activePages.length === 0) {
      alert("Lütfen en az 1 sayfa bırakın.");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const newDoc = await PDFDocument.create();

      for (const item of activePages) {
        const [copiedPage] = await newDoc.copyPages(srcDoc, [item.originalIndex]);
        copiedPage.setRotation(degrees(item.rotation));
        newDoc.addPage(copiedPage);
      }

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setOutputSize(blob.size);
    } catch (err) {
      console.error("PDF oluşturma hatası:", err);
      alert("Düzenlenmiş PDF kaydedilirken bir hata oluştu.");
    } finally {
      setIsProcessing(false);
    }
  };

  const activeCount = pages.filter((p) => !p.isDeleted).length;
  const deletedCount = pages.length - activeCount;

  return (
    <ToolPageLayout
      toolId="pdf-organize"
      title="Görsel PDF Sayfa Düzenleyici"
      description="PDF sayfalarınızı görsel kartlar olarak inceleyin, sürükleyerek sıralayın, ters sayfaları 90° döndürün veya istemediğiniz sayfaları tek tıkla silip yeni PDF oluşturun."
    >
      <div className="space-y-8">
        {!file ? (
          /* Yükleme Alanı */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed border-slate-300/80 bg-white/70 p-10 text-center backdrop-blur-xl transition-all duration-300 hover:border-primary-500 hover:shadow-glow-sm dark:border-white/10 dark:bg-obsidian-900/60 dark:hover:border-primary-500/50"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
            />

            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-600 text-white shadow-lg shadow-primary-500/30 transition-transform group-hover:scale-105">
              <Upload className="h-7 w-7" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Düzenlemek İstediğiniz PDF Dosyasını Seçin
            </h3>
            <p className="mx-auto mt-2 max-w-md text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              Sayfaları görsel olarak sıralamak, döndürmek veya silmek için PDF dosyanızı buraya bırakın.
            </p>

            <span className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:bg-obsidian-850 dark:text-slate-300">
              <FileText className="h-3.5 w-3.5 text-primary-500" /> %100 Güvenli • Tarayıcınızda İşlenir
            </span>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center p-14 text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary-500" />
            <p className="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
              PDF Sayfaları Ayrıştırılıyor...
            </p>
          </div>
        ) : (
          /* Çalışma Masası */
          <div className="space-y-6">
            {/* Araç Çubuğu */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/60">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-950/60 dark:text-primary-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="max-w-xs truncate text-sm font-bold text-slate-900 dark:text-white sm:max-w-md">
                    {file.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Toplam {pages.length} sayfa ({activeCount} aktif, {deletedCount} silinmiş) • {formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleRotateAll}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-300"
                >
                  <RotateCw className="h-3.5 w-3.5" /> Tümünü 90° Döndür
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPages([]);
                    setDownloadUrl(null);
                  }}
                  className="rounded-xl px-3 py-1.5 text-xs font-medium text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"
                >
                  Farklı Dosya Seç
                </button>
              </div>
            </div>

            {/* Sayfa Kartları Izgarası */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {pages.map((p, idx) => {
                const isLandscape = p.width > p.height;
                const effectiveRot = p.rotation;

                return (
                  <div
                    key={p.id}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-3 transition-all ${
                      p.isDeleted
                        ? "border-rose-200 bg-rose-50/50 opacity-40 dark:border-rose-950 dark:bg-rose-950/20"
                        : "border-slate-200/80 bg-white/80 shadow-xs hover:border-primary-400 hover:shadow-md dark:border-white/10 dark:bg-obsidian-850/80"
                    }`}
                  >
                    {/* Sayfa Kartı Başlığı */}
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        Sayfa #{idx + 1}
                      </span>
                      {p.rotation !== 0 && (
                        <span className="rounded bg-indigo-50 px-1 text-[10px] text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                          {p.rotation}°
                        </span>
                      )}
                    </div>

                    {/* Görsel Sayfa Temsili (Minyatür Kağıt) */}
                    <div className="my-2 flex min-h-[140px] items-center justify-center rounded-xl bg-slate-100 p-3 dark:bg-obsidian-900">
                      <div
                        style={{
                          transform: `rotate(${effectiveRot}deg)`,
                          transition: "transform 0.25s ease-out",
                        }}
                        className={`flex items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 ${
                          isLandscape ? "h-16 w-24" : "h-24 w-16"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <FileText className="h-4 w-4 opacity-40" />
                          <span className="text-[10px] font-bold opacity-60">P.{p.originalIndex + 1}</span>
                        </div>
                      </div>
                    </div>

                    {/* Eylem Düğmeleri */}
                    <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 dark:border-white/5">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMovePage(idx, idx - 1)}
                          title="Sola Taşı"
                          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 dark:hover:bg-white/10"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === pages.length - 1}
                          onClick={() => handleMovePage(idx, idx + 1)}
                          title="Sağa Taşı"
                          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 dark:hover:bg-white/10"
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleRotatePage(idx)}
                          title="90° Döndür"
                          className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-primary-600 dark:text-slate-400 dark:hover:bg-white/10"
                        >
                          <RotateCw className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDuplicatePage(idx)}
                          title="Sayfayı Çoğalt"
                          className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-white/10"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePage(idx)}
                          title={p.isDeleted ? "Geri Al" : "Sayfayı Sil"}
                          className={`rounded p-1 transition-colors ${
                            p.isDeleted
                              ? "text-emerald-600 hover:bg-emerald-50"
                              : "text-rose-500 hover:bg-rose-50"
                          }`}
                        >
                          {p.isDeleted ? (
                            <Undo2 className="h-3.5 w-3.5" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* İndirme & Dışa Aktarma Çubuğu */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/90">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {activeCount} Sayfalık Yeni PDF Hazırla
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Sıralanmış ve döndürülmüş sayfalar tek bir temiz belge olarak birleştirilir.
                </p>
              </div>

              {!downloadUrl ? (
                <button
                  type="button"
                  disabled={isProcessing || activeCount === 0}
                  onClick={handleGeneratePdf}
                  className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>PDF Hazırlanıyor...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>Düzenlenmiş PDF&apos;i Oluştur</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={downloadUrl}
                    download={`duzenlenmis_${file.name}`}
                    className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-500"
                  >
                    <Download className="h-4 w-4" />
                    <span>Yeni PDF&apos;i İndir ({formatFileSize(outputSize)})</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setDownloadUrl(null)}
                    className="text-xs text-slate-400 hover:underline"
                  >
                    Tekrar Düzenle
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
