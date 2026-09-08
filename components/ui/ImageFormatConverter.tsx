"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { FileUploader, FileInfo } from "@/components/ui/FileUploader";
import { ConversionProgress } from "@/components/ui/ConversionProgress";
import { ConversionResult } from "@/components/ui/ConversionResult";
import { convertImage } from "@/lib/converters/image";
import { changeFileExtension, formatFileSize } from "@/lib/utils";
import {
  CheckCircle2,
  Download,
  RefreshCw,
  Layers,
  Plus,
  Archive,
} from "lucide-react";
import JSZip from "jszip";

type ConversionState = "idle" | "ready" | "converting" | "done" | "error";

interface ConvertedFileItem {
  originalFile: File;
  newName: string;
  blob: Blob;
}

interface ImageFormatConverterProps {
  /** Kabul edilen MIME tipleri, ör: "image/jpeg" */
  acceptTypes: string;
  /** Kullanıcıya gösterilecek kaynak format etiketi, ör: "JPG" */
  sourceLabel: string;
  /** Hedef MIME tipi */
  targetFormat: "image/png" | "image/jpeg" | "image/webp";
  /** Hedef dosya uzantısı, ör: "png" */
  targetExtension: string;
  /** Hedef format etiketi, ör: "PNG" */
  targetLabel: string;
}

export function ImageFormatConverter({
  acceptTypes,
  sourceLabel,
  targetFormat,
  targetExtension,
  targetLabel,
}: ImageFormatConverterProps) {
  const [state, setState] = useState<ConversionState>("idle");
  const [files, setFiles] = useState<File[]>([]);
  const [convertedItems, setConvertedItems] = useState<ConvertedFileItem[]>([]);
  const [progressText, setProgressText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isZipping, setIsZipping] = useState(false);
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelect = useCallback((selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setFiles((prev) => [...prev, ...selectedFiles]);
    setState("ready");
    setErrorMsg("");
  }, []);

  const handleAddMoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      e.target.value = "";
    }
  };

  // Ready durumundayken de Ctrl + V ile ekleme yapabilme
  useEffect(() => {
    if (state !== "ready") return;

    const handlePaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (!e.clipboardData) return;
      const items = Array.from(e.clipboardData.items);
      const pastedFiles: File[] = [];

      for (const item of items) {
        if (item.kind === "file") {
          const f = item.getAsFile();
          if (f) pastedFiles.push(f);
        }
      }

      if (pastedFiles.length > 0) {
        setFiles((prev) => [...prev, ...pastedFiles]);
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [state]);

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (next.length === 0) {
        setState("idle");
      }
      return next;
    });
  };

  const handleConvert = useCallback(async () => {
    if (files.length === 0) return;

    setState("converting");
    const results: ConvertedFileItem[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const current = files[i];
        setProgressText(
          files.length > 1
            ? `Dönüştürülüyor (${i + 1}/${files.length}): ${current.name}...`
            : "Dosyanız dönüştürülüyor..."
        );

        const blob = await convertImage(current, targetFormat);
        const newName = changeFileExtension(current.name, targetExtension);
        results.push({
          originalFile: current,
          newName,
          blob,
        });
      }

      setConvertedItems(results);
      setState("done");
    } catch {
      setErrorMsg(
        "Dosya dönüştürülürken bir sorun oluştu. Lütfen tekrar deneyin."
      );
      setState("error");
    }
  }, [files, targetFormat, targetExtension]);

  const handleDownloadSingle = (item: ConvertedFileItem) => {
    const url = URL.createObjectURL(item.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = item.newName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    if (convertedItems.length === 0) return;
    setIsZipping(true);
    try {
      const zip = new JSZip();
      convertedItems.forEach((item) => {
        zip.file(item.newName, item.blob);
      });
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `turkconvert-${targetLabel.toLowerCase()}-gorseller.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setIsZipping(false);
    }
  };

  const handleReset = useCallback(() => {
    setFiles([]);
    setConvertedItems([]);
    setProgressText("");
    setErrorMsg("");
    setState("idle");
  }, []);

  return (
    <div>
      {/* Gizli çoklu dosya ekleme input'u */}
      <input
        ref={addMoreInputRef}
        type="file"
        multiple
        accept={acceptTypes}
        className="hidden"
        onChange={handleAddMoreChange}
      />

      {/* Dosya Yükleme */}
      {(state === "idle" || (state === "error" && files.length === 0)) && (
        <FileUploader
          accept={acceptTypes}
          acceptLabel={sourceLabel}
          multiple
          onFileSelect={(f) => handleFilesSelect([f])}
          onFilesSelect={handleFilesSelect}
        />
      )}

      {/* Dosya Bilgisi + Dönüştür Butonu */}
      {state === "ready" && files.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {files.length === 1
                  ? "1 dosya seçildi"
                  : `${files.length} dosya seçildi (Toplu)`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => addMoreInputRef.current?.click()}
                className="btn-secondary !px-3 !py-1.5 text-xs gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                Daha Fazla Ekle
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded px-2 py-1 text-xs text-gray-500 hover:text-red-500 dark:text-gray-400"
              >
                Temizle
              </button>
            </div>
          </div>

          <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {files.map((file, idx) => (
              <FileInfo
                key={`${file.name}-${idx}`}
                file={file}
                onRemove={() => handleRemoveFile(idx)}
              />
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <button onClick={handleConvert} className="btn-primary">
              {files.length > 1
                ? `Tümünü ${sourceLabel} → ${targetLabel} Dönüştür (${files.length} Dosya)`
                : `${sourceLabel} → ${targetLabel} Dönüştür`}
            </button>
          </div>
        </div>
      )}

      {/* Dönüştürme Süreci */}
      {state === "converting" && (
        <ConversionProgress message={progressText} />
      )}

      {/* Sonuç - Tek Dosya */}
      {state === "done" && convertedItems.length === 1 && (
        <ConversionResult
          fileName={convertedItems[0].newName}
          blob={convertedItems[0].blob}
          onReset={handleReset}
        />
      )}

      {/* Sonuç - Toplu Dosya */}
      {state === "done" && convertedItems.length > 1 && (
        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="h-7 w-7 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {convertedItems.length} dosya başarıyla dönüştürüldü!
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tüm dosyaları tek tıkla ZIP olarak indirebilir veya tek tek kaydedebilirsiniz.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadZip}
                disabled={isZipping}
                className="btn-primary gap-2"
              >
                <Archive className="h-4 w-4" />
                {isZipping
                  ? "ZIP Hazırlanıyor..."
                  : `Tümünü ZIP Olarak İndir (${convertedItems.length} Dosya)`}
              </button>
              <button onClick={handleReset} className="btn-secondary gap-2">
                <RefreshCw className="h-4 w-4" />
                Yeni Dosyalar Dönüştür
              </button>
            </div>
          </div>

          <div className="max-h-80 space-y-2 overflow-y-auto border-t border-gray-200 pt-4 dark:border-gray-800">
            {convertedItems.map((item, idx) => (
              <div
                key={`${item.newName}-${idx}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800/60"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.newName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(item.blob.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadSingle(item)}
                  className="btn-secondary !px-3 !py-1.5 text-xs gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  İndir
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hata */}
      {state === "error" && errorMsg && (
        <div className="mt-4 text-center">
          <p className="mb-4 text-sm text-red-600 dark:text-red-400">
            {errorMsg}
          </p>
          <button onClick={handleReset} className="btn-secondary">
            Tekrar Dene
          </button>
        </div>
      )}
    </div>
  );
}
