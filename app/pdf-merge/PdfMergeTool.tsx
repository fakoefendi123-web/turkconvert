"use client";

import { useState, useRef } from "react";
import {
  Upload,
  FileText,
  Download,
  Trash2,
  ArrowUp,
  ArrowDown,
  Layers,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { formatFileSize } from "@/lib/utils";

interface PdfFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount?: number;
}

export default function PdfMergeTool() {
  const [items, setItems] = useState<PdfFileItem[]>([]);
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [mergedBlobUrl, setMergedBlobUrl] = useState<string | null>(null);
  const [mergedSize, setMergedSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: File[]) => {
    const validFiles = files.filter(
      (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
    );
    if (validFiles.length === 0) {
      alert("Lütfen geçerli PDF dosyaları seçin.");
      return;
    }

    const newItems: PdfFileItem[] = [];
    for (const file of validFiles) {
      let pageCount: number | undefined = undefined;
      try {
        const buffer = await file.arrayBuffer();
        const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        pageCount = doc.getPageCount();
      } catch {
        // ignore
      }

      newItems.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        name: file.name,
        size: file.size,
        pageCount,
      });
    }

    setItems((prev) => [...prev, ...newItems]);
    setMergedBlobUrl(null);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    setItems((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
    setMergedBlobUrl(null);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setMergedBlobUrl(null);
  };

  const clearAll = () => {
    if (mergedBlobUrl) URL.revokeObjectURL(mergedBlobUrl);
    setItems([]);
    setMergedBlobUrl(null);
  };

  const mergePdfs = async () => {
    if (items.length < 2) {
      alert("Birleştirmek için en az 2 adet PDF dosyası eklemelisiniz.");
      return;
    }

    setIsMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of items) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setMergedBlobUrl(url);
      setMergedSize(blob.size);
    } catch (err: any) {
      console.error("PDF birleştirme hatası:", err);
      alert("PDF dosyaları birleştirilirken hata oluştu. Şifreli veya bozuk dosya olabilir.");
    } finally {
      setIsMerging(false);
    }
  };

  const totalPages = items.reduce((acc, curr) => acc + (curr.pageCount || 0), 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
          <Layers className="w-3.5 h-3.5" /> Limitsiz Sayfa • %100 Güvenli & Yerel İşlem
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          PDF Birleştirici (PDF Merge)
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Birden fazla PDF belgesini dilediğiniz sırayla tek bir PDF dosyasında birleştirin. Belgeleriniz sunucuya yüklenmez, cihazınızda anında oluşturulur.
        </p>
      </div>

      {/* Dropzone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files) handleFiles(Array.from(e.dataTransfer.files));
        }}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 rounded-3xl p-8 sm:p-10 text-center bg-gray-50/50 dark:bg-gray-900/50 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 transition-all cursor-pointer group"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          onChange={(e) => {
            if (e.target.files) handleFiles(Array.from(e.target.files));
          }}
          className="hidden"
        />
        <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <Upload className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          PDF Belgelerinizi Buraya Sürükleyin veya Seçin
        </h3>
        <p className="text-xs text-gray-500 mt-1">İstediğiniz kadar PDF dosyasını aynı anda ekleyebilirsiniz</p>
      </div>

      {/* PDF Dosya Listesi ve Sıralama */}
      {items.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>Sıralama Listesi ({items.length} Dosya)</span>
              {totalPages > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                  Toplam {totalPages} Sayfa
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-gray-500 hover:text-rose-600 transition-colors"
            >
              Tümünü Temizle
            </button>
          </div>

          <div className="space-y-2.5">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-xs sm:max-w-md">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(item.size)} {item.pageCount ? `• ${item.pageCount} Sayfa` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => moveItem(index, "up")}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30"
                    title="Yukarı Taşı"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, "down")}
                    disabled={index === items.length - 1}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30"
                    title="Aşağı Taşı"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-gray-100 dark:hover:bg-gray-800 ml-1"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Birleştirme Butonu & İndirme Kartı */}
          <div className="mt-6 flex flex-col items-center gap-4">
            {!mergedBlobUrl ? (
              <button
                type="button"
                onClick={mergePdfs}
                disabled={isMerging || items.length < 2}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isMerging ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> PDF&apos;ler Birleştiriliyor...
                  </>
                ) : (
                  <>
                    <Layers className="w-4 h-4" /> {items.length} PDF&apos;i Tek Dosya Olarak Birleştir
                  </>
                )}
              </button>
            ) : (
              <div className="w-full p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      PDF Başarıyla Birleştirildi!
                    </h4>
                    <p className="text-xs text-gray-500">
                      Yeni Dosya Boyutu: {formatFileSize(mergedSize)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={mergedBlobUrl}
                    download={`turkconvert-birlestirilmis-${Date.now()}.pdf`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    <Download className="w-4 h-4" /> Birleştirilmiş PDF&apos;i İndir
                  </a>
                  <button
                    type="button"
                    onClick={() => setMergedBlobUrl(null)}
                    className="text-xs text-gray-500 hover:underline"
                  >
                    Yeniden Düzenle
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Güvenlik & SSS */}
      <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          <ShieldCheck className="w-4 h-4" /> Sıfır Sunucu Yüklemesi • Belgeleriniz Sadece Sizin Cihazınızda
        </div>
        <p className="text-xs text-gray-500 max-w-lg mx-auto">
          TurkConvert, PDF birleştirme işlemlerini tarayıcınızın WebAssembly motorunda yapar. Şirket evrakları, diplomalar veya kişisel belgeleriniz asla internete aktarılmaz.
        </p>
      </div>
    </div>
  );
}
