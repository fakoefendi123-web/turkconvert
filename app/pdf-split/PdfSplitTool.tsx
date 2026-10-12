"use client";

import { useState, useRef, useEffect } from "react";
import {
  Upload,
  FileText,
  Download,
  Scissors,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  Archive,
  Layers,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { formatFileSize } from "@/lib/utils";

export default function PdfSplitTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [splitMode, setSplitMode] = useState<"range" | "all">("range");
  const [rangeInput, setRangeInput] = useState<string>("1");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadFilename, setDownloadFilename] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
      alert("Lütfen bir PDF dosyası seçin.");
      return;
    }

    try {
      const buffer = await selectedFile.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pages = doc.getPageCount();
      setFile(selectedFile);
      setPageCount(pages);
      setRangeInput(`1-${Math.min(pages, 3)}`);
      setDownloadUrl(null);
    } catch (err) {
      console.error(err);
      alert("PDF dosyası okunamadı veya şifreli.");
    }
  };

  const downloadUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (downloadUrlRef.current) {
        URL.revokeObjectURL(downloadUrlRef.current);
      }
    };
  }, []);

  const parseRange = (input: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const parts = input.split(",").map((p) => p.trim()).filter(Boolean);

    for (const part of parts) {
      if (part.includes("-")) {
        const segments = part.split("-").map((s) => s.trim());
        let start = parseInt(segments[0], 10);
        let end = parseInt(segments[1], 10);

        // Açık uçlu aralık desteği: "3-" veya "-4"
        if (segments[0] === "" && !isNaN(end)) {
          start = 1;
        } else if (segments[1] === "" && !isNaN(start)) {
          end = maxPages;
        }

        if (!isNaN(start) && !isNaN(end)) {
          const from = Math.max(1, Math.min(start, end));
          const to = Math.min(maxPages, Math.max(start, end));
          for (let i = from; i <= to; i++) pages.add(i);
        }
      } else {
        const page = parseInt(part, 10);
        if (!isNaN(page) && page >= 1 && page <= maxPages) {
          pages.add(page);
        }
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const executeSplit = async () => {
    if (!file || pageCount === 0) return;

    setIsProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      const baseDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const baseName = file.name.replace(/\.[^/.]+$/, "");

      if (splitMode === "range") {
        const selectedPages = parseRange(rangeInput, pageCount);
        if (selectedPages.length === 0) {
          alert("Lütfen geçerli sayfa numaraları girin (Örn: 1-3 veya 1, 4, 7).");
          setIsProcessing(false);
          return;
        }

        const newDoc = await PDFDocument.create();
        const indices = selectedPages.map((p) => p - 1);
        const copied = await newDoc.copyPages(baseDoc, indices);
        copied.forEach((p) => newDoc.addPage(p));

        const bytes = await newDoc.save();
        const blob = new Blob([bytes as any], { type: "application/pdf" });
        if (downloadUrlRef.current) URL.revokeObjectURL(downloadUrlRef.current);
        const url = URL.createObjectURL(blob);
        downloadUrlRef.current = url;

        setDownloadUrl(url);
        setDownloadFilename(`${baseName}-sayfalar-${selectedPages.join("_")}.pdf`);
      } else {
        // Tüm sayfaları tek tek ayır ve ZIP yap
        const zip = new JSZip();

        for (let i = 0; i < pageCount; i++) {
          const singleDoc = await PDFDocument.create();
          const [copiedPage] = await singleDoc.copyPages(baseDoc, [i]);
          singleDoc.addPage(copiedPage);
          const bytes = await singleDoc.save();
          zip.file(`${baseName}-sayfa-${i + 1}.pdf`, bytes as any);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        if (downloadUrlRef.current) URL.revokeObjectURL(downloadUrlRef.current);
        const url = URL.createObjectURL(zipBlob);
        downloadUrlRef.current = url;

        setDownloadUrl(url);
        setDownloadFilename(`${baseName}-ayrilmis-sayfalar.zip`);
      }
    } catch (err: any) {
      console.error(err);
      alert("Sayfalar ayrılırken bir hata oluştu.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">

      {!file ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
          }}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-rose-500 rounded-3xl p-10 text-center bg-gray-50/50 dark:bg-gray-900/50 hover:bg-rose-50/20 dark:hover:bg-rose-950/20 transition-all cursor-pointer group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
            className="hidden"
          />
          <div className="mx-auto w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Upload className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Ayırmak İstediğiniz PDF Belgesini Seçin
          </h3>
          <p className="text-xs text-gray-500 mt-1">Sürükleyip bırakabilir veya tıklayabilirsiniz</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-rose-500 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{file.name}</h4>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)} • Toplam <strong>{pageCount}</strong> Sayfa
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setDownloadUrl(null);
              }}
              className="text-xs text-gray-500 hover:text-rose-600 transition-colors"
            >
              Farklı Dosya Seç
            </button>
          </div>

          {/* Ayırma Seçenekleri */}
          <div className="py-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setSplitMode("range")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  splitMode === "range"
                    ? "border-rose-500 bg-rose-50/30 dark:bg-rose-950/20"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                }`}
              >
                <h5 className="text-sm font-bold text-gray-900 dark:text-white">Belirli Sayfaları Seç</h5>
                <p className="text-xs text-gray-500 mt-1">
                  Örn: 1-3 veya 1, 4, 7 gibi sayfa aralıklarını tek bir PDF olarak çıkarın.
                </p>
              </div>

              <div
                onClick={() => setSplitMode("all")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  splitMode === "all"
                    ? "border-rose-500 bg-rose-50/30 dark:bg-rose-950/20"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                }`}
              >
                <h5 className="text-sm font-bold text-gray-900 dark:text-white">Her Sayfayı Ayrı Dosya Yap</h5>
                <p className="text-xs text-gray-500 mt-1">
                  Tüm sayfaları ayrı ayrı PDF dosyalarına bölüp tek ZIP olarak indirin.
                </p>
              </div>
            </div>

            {splitMode === "range" && (
              <div className="pt-2">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Çıkarılacak Sayfa Numaraları (Maks: {pageCount}):
                </label>
                <input
                  type="text"
                  value={rangeInput}
                  onChange={(e) => setRangeInput(e.target.value)}
                  placeholder={`Örn: 1-${Math.min(pageCount, 3)} veya 1, 2, 5`}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>
            )}
          </div>

          {/* Ayırma ve İndirme Butonları */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {!downloadUrl ? (
              <button
                type="button"
                onClick={executeSplit}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Sayfalar Ayrılıyor...
                  </>
                ) : (
                  <>
                    <Scissors className="w-4 h-4" /> Sayfaları Ayır
                  </>
                )}
              </button>
            ) : (
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Sayfalar başarıyla ayrıldı!
                </span>
                <a
                  href={downloadUrl}
                  download={downloadFilename}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" /> {downloadFilename.endsWith(".zip") ? "ZIP Dosyasını İndir" : "Ayrılmış PDF'i İndir"}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-16 text-center text-xs text-gray-400">
        <ShieldCheck className="w-4 h-4 inline mr-1 text-emerald-500" />
        Belgeleriniz %100 tarayıcınızda işlenir, sunucuya hiçbir veri gönderilmez.
      </div>
    </div>
  );
}
