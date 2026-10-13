"use client";

import { useState, useRef, useEffect } from "react";
import {
  Upload,
  FileText,
  Download,
  Stamp,
  Hash,
  RefreshCw,
  CheckCircle2,
  Sliders,
  Sparkles,
  Layers,
  ShieldAlert,
} from "lucide-react";
import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";
import { formatFileSize } from "@/lib/utils";

type ToolMode = "page-numbers" | "watermark";

export default function PdfWatermarkTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [mode, setMode] = useState<ToolMode>("page-numbers");

  // Sayfa Numaralandırma Ayarları
  const [numFormat, setNumFormat] = useState<string>("Sayfa {n} / {total}");
  const [numPosition, setNumPosition] = useState<"bottom-right" | "bottom-center" | "bottom-left" | "top-right">("bottom-right");
  const [startPage, setStartPage] = useState<number>(1);
  const [fontSize, setFontSize] = useState<number>(10);

  // Filigran Ayarları
  const [watermarkText, setWatermarkText] = useState<string>("GİZLİDİR");
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(0.2);
  const [watermarkAngle, setWatermarkAngle] = useState<number>(45);
  const [watermarkColor, setWatermarkColor] = useState<"gray" | "red" | "blue">("gray");
  const [watermarkSize, setWatermarkSize] = useState<number>(48);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadFilename, setDownloadFilename] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const downloadUrlRef = useRef<string | null>(null);

  // Bellek temizliği
  useEffect(() => {
    return () => {
      if (downloadUrlRef.current) {
        URL.revokeObjectURL(downloadUrlRef.current);
      }
    };
  }, []);

  const handleFile = async (selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith(".pdf")) {
      alert("Lütfen geçerli bir PDF belgesi yükleyin.");
      return;
    }

    try {
      const buffer = await selectedFile.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pages = doc.getPageCount();

      setFile(selectedFile);
      setPageCount(pages);
      if (downloadUrlRef.current) {
        URL.revokeObjectURL(downloadUrlRef.current);
        downloadUrlRef.current = null;
      }
      setDownloadUrl(null);
    } catch {
      alert("Bu PDF belgesi açılamadı veya şifrelenmiş olabilir.");
    }
  };

  const handleProcessPdf = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const boldFont = await doc.embedFont(StandardFonts.HelveticaBold);
      const pages = doc.getPages();
      const total = pages.length;

      if (mode === "page-numbers") {
        pages.forEach((page, idx) => {
          const pageNum = idx + 1;
          if (pageNum < startPage) return;

          const { width, height } = page.getSize();
          const text = numFormat
            .replace("{n}", pageNum.toString())
            .replace("{total}", total.toString());

          const textWidth = font.widthOfTextAtSize(text, fontSize);
          const textHeight = font.heightAtSize(fontSize);

          let x = width - textWidth - 40;
          let y = 30;

          if (numPosition === "bottom-center") {
            x = (width - textWidth) / 2;
            y = 30;
          } else if (numPosition === "bottom-left") {
            x = 40;
            y = 30;
          } else if (numPosition === "top-right") {
            x = width - textWidth - 40;
            y = height - textHeight - 30;
          }

          page.drawText(text, {
            x,
            y,
            size: fontSize,
            font,
            color: rgb(0.35, 0.35, 0.4),
          });
        });
      } else {
        // Filigran Modu
        let colorVal = rgb(0.5, 0.5, 0.5);
        if (watermarkColor === "red") {
          colorVal = rgb(0.85, 0.15, 0.15);
        } else if (watermarkColor === "blue") {
          colorVal = rgb(0.15, 0.35, 0.85);
        }

        pages.forEach((page) => {
          const { width, height } = page.getSize();
          const cleanText = watermarkText
            .replace(/İ/g, "I")
            .replace(/ı/g, "i")
            .replace(/Ş/g, "S")
            .replace(/ş/g, "s")
            .replace(/Ğ/g, "G")
            .replace(/ğ/g, "g");

          const textWidth = boldFont.widthOfTextAtSize(cleanText, watermarkSize);
          const textHeight = boldFont.heightAtSize(watermarkSize);

          const centerX = (width - textWidth) / 2;
          const centerY = (height - textHeight) / 2;

          page.drawText(cleanText, {
            x: centerX,
            y: centerY,
            size: watermarkSize,
            font: boldFont,
            color: colorVal,
            opacity: watermarkOpacity,
            rotate: degrees(watermarkAngle),
          });
        });
      }

      const pdfBytes = await doc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });

      if (downloadUrlRef.current) {
        URL.revokeObjectURL(downloadUrlRef.current);
      }
      const url = URL.createObjectURL(blob);
      downloadUrlRef.current = url;
      setDownloadUrl(url);

      const baseName = file.name.replace(/\.pdf$/i, "");
      const suffix = mode === "page-numbers" ? "Numaralandirilmis" : "Filigranli";
      setDownloadFilename(`${baseName}_${suffix}.pdf`);
    } catch {
      alert("PDF belgesi işlenirken bir hata meydana geldi.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAll = () => {
    if (downloadUrlRef.current) {
      URL.revokeObjectURL(downloadUrlRef.current);
      downloadUrlRef.current = null;
    }
    setFile(null);
    setPageCount(0);
    setDownloadUrl(null);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const dropped = e.dataTransfer.files[0];
            if (dropped) handleFile(dropped);
          }}
          className="flex flex-col items-center justify-center cursor-pointer rounded-3xl border-2 border-dashed border-slate-300 bg-white/70 p-12 text-center transition hover:border-primary-500 hover:bg-primary-50/20 dark:border-white/20 dark:bg-obsidian-900/60 dark:hover:border-primary-400"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
            <FileText className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-800 dark:text-slate-100">
            PDF Dosyanızı Seçin veya Buraya Bırakın
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-md">
            Sayfa numarası eklemek veya filigran damgası basmak istediğiniz PDF belgesini yükleyin.
          </p>
          <button className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary-500/20 hover:bg-primary-500">
            <Upload className="h-3.5 w-3.5" />
            <span>PDF Dosyası Seç</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Yüklenen Belge Kartı */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4 backdrop-blur-md dark:border-white/10 dark:bg-obsidian-900/70">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {file.name}
                </p>
                <p className="text-xs text-slate-400">
                  {formatFileSize(file.size)} • <span className="font-semibold text-primary-600 dark:text-primary-400">{pageCount} Sayfa</span>
                </p>
              </div>
            </div>

            <button
              onClick={resetAll}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Başka Belge Seç</span>
            </button>
          </div>

          {/* Mod Seçimi: Sayfa No vs Filigran */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setMode("page-numbers");
                setDownloadUrl(null);
              }}
              className={`flex items-center justify-center gap-2 rounded-2xl border p-4 text-xs font-bold transition ${
                mode === "page-numbers"
                  ? "border-primary-500 bg-primary-50/60 text-primary-700 dark:border-primary-400 dark:bg-primary-950/40 dark:text-primary-300 shadow-xs"
                  : "border-slate-200 bg-white/70 text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-obsidian-900/60 dark:text-slate-400"
              }`}
            >
              <Hash className="h-4 w-4" />
              <span>Sayfa Numaralandırıcı</span>
            </button>

            <button
              onClick={() => {
                setMode("watermark");
                setDownloadUrl(null);
              }}
              className={`flex items-center justify-center gap-2 rounded-2xl border p-4 text-xs font-bold transition ${
                mode === "watermark"
                  ? "border-primary-500 bg-primary-50/60 text-primary-700 dark:border-primary-400 dark:bg-primary-950/40 dark:text-primary-300 shadow-xs"
                  : "border-slate-200 bg-white/70 text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-obsidian-900/60 dark:text-slate-400"
              }`}
            >
              <Stamp className="h-4 w-4" />
              <span>Metin Filigranı & Damga</span>
            </button>
          </div>

          {/* Ayarlar Paneli */}
          <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/70">
            {mode === "page-numbers" ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Numara Formatı:
                  </label>
                  <select
                    value={numFormat}
                    onChange={(e) => setNumFormat(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-2xs focus:border-primary-500 focus:outline-hidden dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
                  >
                    <option value="Sayfa {n} / {total}">Sayfa 1 / {pageCount}</option>
                    <option value="Sayfa {n}">Sayfa 1</option>
                    <option value="{n} / {total}">1 / {pageCount}</option>
                    <option value="{n}">Yalnızca 1</option>
                    <option value="- {n} -">- 1 -</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Sayfadaki Konumu:
                  </label>
                  <select
                    value={numPosition}
                    onChange={(e) => setNumPosition(e.target.value as any)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-2xs focus:border-primary-500 focus:outline-hidden dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
                  >
                    <option value="bottom-right">Alt Sağ (Standart)</option>
                    <option value="bottom-center">Alt Orta</option>
                    <option value="bottom-left">Alt Sol</option>
                    <option value="top-right">Üst Sağ</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Başlangıç Sayfası:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={pageCount}
                    value={startPage}
                    onChange={(e) => setStartPage(Math.max(1, parseInt(e.target.value) || 1))}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-2xs focus:border-primary-500 focus:outline-hidden dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
                  />
                  <p className="mt-1 text-[10px] text-slate-400">
                    Kapak sayfasını atlamak için 2 yapabilirsiniz.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Yazı Boyutu: ({fontSize} pt)
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="16"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="mt-3 w-full accent-primary-600"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Filigran Metni:
                  </label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="Örn: GİZLİDİR, TASLAK"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 shadow-2xs focus:border-primary-500 focus:outline-hidden dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
                  />
                  {/* Hazır Butonlar */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {["GİZLİDİR", "TASLAK", "KOPYALANAMAZ", "ÖZEL BELGE"].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setWatermarkText(preset)}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-300"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Damga Rengi:
                  </label>
                  <div className="mt-1.5 flex gap-2">
                    {[
                      { id: "gray", label: "Gri (Hafif)" },
                      { id: "red", label: "Kırmızı (Güvenlik)" },
                      { id: "blue", label: "Mavi (Kurumsal)" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setWatermarkColor(c.id as any)}
                        className={`flex-1 rounded-xl border py-2 text-xs font-semibold transition ${
                          watermarkColor === c.id
                            ? "border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-950 dark:text-primary-300"
                            : "border-slate-200 bg-white text-slate-600 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-300"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Opaklık (Şeffaflık):</span>
                    <span>%{Math.round(watermarkOpacity * 100)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.08"
                    max="0.6"
                    step="0.02"
                    value={watermarkOpacity}
                    onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                    className="mt-2 w-full accent-primary-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Açı & Eğim:</span>
                    <span>{watermarkAngle}°</span>
                  </div>
                  <div className="mt-1.5 flex gap-2">
                    <button
                      onClick={() => setWatermarkAngle(45)}
                      className={`flex-1 rounded-xl border py-1.5 text-xs font-semibold ${
                        watermarkAngle === 45
                          ? "border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-950"
                          : "border-slate-200 dark:border-white/10"
                      }`}
                    >
                      45° Çapraz (Tavsiye)
                    </button>
                    <button
                      onClick={() => setWatermarkAngle(0)}
                      className={`flex-1 rounded-xl border py-1.5 text-xs font-semibold ${
                        watermarkAngle === 0
                          ? "border-primary-500 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-950"
                          : "border-slate-200 dark:border-white/10"
                      }`}
                    >
                      0° Yatay
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* İşlem Tetikleme Butonu */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleProcessPdf}
                disabled={isProcessing}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary-600 py-3 text-xs font-bold text-white shadow-md shadow-primary-500/20 transition hover:bg-primary-500 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>PDF İşleniyor...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>{mode === "page-numbers" ? "Sayfa Numaralarını Ekle" : "Filigranı Uygula"}</span>
                  </>
                )}
              </button>

              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download={downloadFilename}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-emerald-500/20 transition hover:bg-emerald-500"
                >
                  <Download className="h-4 w-4" />
                  <span>İndir ({downloadFilename})</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected) handleFile(selected);
        }}
        className="hidden"
      />
    </div>
  );
}
