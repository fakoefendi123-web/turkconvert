"use client";

import { useState, useCallback, useRef } from "react";
import { FileUploader } from "@/components/ui/FileUploader";
import { ConversionProgress } from "@/components/ui/ConversionProgress";
import { ConversionResult } from "@/components/ui/ConversionResult";
import { imagesToPdf } from "@/lib/converters/pdf";
import { formatFileSize, changeFileExtension } from "@/lib/utils";
import {
  FileText,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  FileImage,
  RefreshCw,
} from "lucide-react";

type ToolState = "idle" | "ready" | "converting" | "done" | "error";

export default function ImageToPdfTool() {
  const [state, setState] = useState<ToolState>("idle");
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<Blob | null>(null);
  const [resultName, setResultName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const addFilesInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelect = useCallback((selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    setFiles(selectedFiles);
    setErrorMsg("");
    setState("ready");
  }, []);

  const handleAddMoreFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      e.target.value = "";
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setFiles((prev) => {
      const next = [...prev];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleMoveDown = (index: number) => {
    setFiles((prev) => {
      if (index >= prev.length - 1) return prev;
      const next = [...prev];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

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
    try {
      const blob = await imagesToPdf(files);
      const name =
        files.length === 1
          ? changeFileExtension(files[0].name, "pdf")
          : "birlestirilmis-gorseller.pdf";
      setResult(blob);
      setResultName(name);
      setState("done");
    } catch {
      setErrorMsg(
        "PDF oluşturulurken bir sorun oluştu. Lütfen tekrar deneyin."
      );
      setState("error");
    }
  }, [files]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setResult(null);
    setResultName("");
    setErrorMsg("");
    setState("idle");
  }, []);

  return (
    <div>
      {/* Dosya Yükleme */}
      {(state === "idle" || (state === "error" && files.length === 0)) && (
        <FileUploader
          accept="image/jpeg,image/png,image/webp"
          acceptLabel="JPG, PNG, WEBP"
          multiple
          onFileSelect={(f) => handleFilesSelect([f])}
          onFilesSelect={handleFilesSelect}
        />
      )}

      {/* Dosya Listesi ve Yönetimi */}
      {state === "ready" && files.length > 0 && (
        <div className="space-y-6">
          {/* Üst Bar: Dosya Sayısı ve Dosya Ekle Butonu */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Seçilen Görseller
              </span>
              <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
                {files.length} dosya
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={addFilesInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleAddMoreFiles}
              />
              <button
                type="button"
                onClick={() => addFilesInputRef.current?.click()}
                className="btn-secondary !px-3 !py-1.5 text-xs gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                Dosya Ekle
              </button>
            </div>
          </div>

          {/* Dosya Sıralama Listesi */}
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${index}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800/60"
              >
                {/* Sayfa No ve Görsel İkonu */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-gray-100 text-xs font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {index + 1}
                  </span>
                  <FileImage className="h-5 w-5 shrink-0 text-primary-500" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                {/* Sıralama ve Silme Butonları */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    title="Yukarı Taşı"
                    aria-label="Yukarı taşı"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === files.length - 1}
                    className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 disabled:hover:bg-transparent dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    title="Aşağı Taşı"
                    aria-label="Aşağı taşı"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                    title="Kaldır"
                    aria-label="Kaldır"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            PDF belgesindeki sayfa sırasını değiştirmek için yukarı/aşağı okları kullanabilirsiniz.
          </p>

          {/* PDF Oluştur Butonu */}
          <div className="flex justify-center pt-2">
            <button onClick={handleConvert} className="btn-primary gap-2">
              <FileText className="h-4 w-4" />
              PDF Oluştur ({files.length} Görsel)
            </button>
          </div>
        </div>
      )}

      {/* Dönüştürme Süreci */}
      {state === "converting" && (
        <ConversionProgress message="Görselleriniz birleştirilip PDF belgesi oluşturuluyor..." />
      )}

      {/* Sonuç */}
      {state === "done" && result && (
        <ConversionResult
          fileName={resultName}
          blob={result}
          onReset={handleReset}
        />
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
