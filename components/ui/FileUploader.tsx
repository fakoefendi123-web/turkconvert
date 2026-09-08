"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { Upload, File, AlertCircle } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

interface FileUploaderProps {
  /** Kabul edilen MIME tipleri, Ã¶r: "image/jpeg,image/png" */
  accept: string;
  /** KullanÄ±cÄ±ya gÃ¶sterilecek format etiketi, Ã¶r: "JPG" */
  acceptLabel: string;
  /** Maksimum dosya boyutu (byte). VarsayÄ±lan: 50MB */
  maxSize?: number;
  /** Dosya seÃ§ildiÄŸinde Ã§aÄŸrÄ±lÄ±r */
  onFileSelect: (file: File) => void;
  /** Ã‡oklu dosya seÃ§imi */
  multiple?: boolean;
  /** Ã‡oklu dosya seÃ§ildiÄŸinde Ã§aÄŸrÄ±lÄ±r */
  onFilesSelect?: (files: File[]) => void;
}

export function FileUploader({
  accept,
  acceptLabel,
  maxSize = 50 * 1024 * 1024, // 50MB
  onFileSelect,
  multiple = false,
  onFilesSelect,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = accept.split(",").map((t) => t.trim());

  const validateFile = useCallback(
    (file: File): string | null => {
      const fileNameLower = file.name.toLowerCase();
      const ext = "." + (fileNameLower.split(".").pop() || "");

      const matches = acceptedTypes.some((type) => {
        if (type === "*/*") return true;
        if (type.startsWith(".")) {
          return ext === type.toLowerCase();
        }
        if (type === "image/*") {
          return (
            file.type.startsWith("image/") ||
            /\.(jpg|jpeg|png|webp|gif|svg|bmp|ico)$/i.test(fileNameLower)
          );
        }
        if (type === "image/jpeg" || type === "image/jpg") {
          return (
            file.type === "image/jpeg" ||
            file.type === "image/jpg" ||
            file.type === "image/pjpeg" ||
            /\.(jpe?g)$/i.test(fileNameLower)
          );
        }
        if (type === "image/png") {
          return file.type === "image/png" || /\.png$/i.test(fileNameLower);
        }
        if (type === "image/webp") {
          return file.type === "image/webp" || /\.webp$/i.test(fileNameLower);
        }
        if (type === "image/svg+xml") {
          return file.type === "image/svg+xml" || /\.svg$/i.test(fileNameLower);
        }
        return file.type === type || ext === `.${type.split("/")[1]}`;
      });

      if (!matches) {
        return `"${file.name}" dosya tÃ¼rÃ¼ desteklenmiyor. LÃ¼tfen ${acceptLabel} formatÄ±nda bir dosya seÃ§in.`;
      }
      if (file.size > maxSize) {
        return `"${file.name}" dosya boyutu sÄ±nÄ±rÄ± aÅŸÄ±yor. Maksimum ${formatFileSize(maxSize)} boyutunda dosya yÃ¼kleyebilirsiniz.`;
      }
      return null;
    },
    [acceptedTypes, acceptLabel, maxSize]
  );

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      setError(null);
      const fileArray = Array.from(files);

      if (fileArray.length === 0) return;

      for (const file of fileArray) {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          return;
        }
      }

      if (multiple && onFilesSelect) {
        onFilesSelect(fileArray);
      } else {
        onFileSelect(fileArray[0]);
      }
    },
    [validateFile, multiple, onFileSelect, onFilesSelect]
  );

  // Panodan yapÄ±ÅŸtÄ±rma (Ctrl + V) desteÄŸi
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      // EÄŸer kullanÄ±cÄ± bir input/textarea iÃ§indeyse mÃ¼dahale etme
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
        handleFiles(pastedFiles);
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleFiles(e.target.files);
        // AynÄ± dosyayÄ± tekrar seÃ§ebilmek iÃ§in input deÄŸerini sÄ±fÄ±rla
        e.target.value = "";
      }
    },
    [handleFiles]
  );

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all sm:p-12 ${
          isDragging
            ? "border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-950/20"
            : "border-gray-300 bg-gray-50 hover:border-primary-400 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-500 dark:hover:bg-gray-800/50"
        }`}
      >
        <Upload
          className={`mb-3 h-10 w-10 ${
            isDragging
              ? "text-primary-500 dark:text-primary-400"
              : "text-gray-400 dark:text-gray-500"
          }`}
        />
        <p className="mb-1 text-base font-semibold text-gray-800 dark:text-gray-200">
          {multiple
            ? "DosyalarÄ±nÄ±zÄ± buraya sÃ¼rÃ¼kleyin"
            : "DosyanÄ±zÄ± buraya sÃ¼rÃ¼kleyin"}
        </p>
        <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">veya</p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="btn-primary text-sm">
            {multiple ? "DosyalarÄ± SeÃ§ (Ã‡oklu)" : "Dosya SeÃ§"}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500">
          <span>Desteklenen: {acceptLabel}</span>
          <span>â€¢</span>
          <span>Maks: {formatFileSize(maxSize)}</span>
          <span>â€¢</span>
          <span className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-[10px] text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            Ctrl + V
          </span>
          <span>ile yapÄ±ÅŸtÄ±r</span>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900 dark:bg-red-950/30">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}

/** SeÃ§ilen dosya bilgilerini gÃ¶steren bileÅŸen */
export function FileInfo({
  file,
  onRemove,
}: {
  file: File;
  onRemove?: () => void;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [file]);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
      {previewUrl ? (
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt={file.name}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-400">
          <File className="h-6 w-6" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
          {file.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatFileSize(file.size)} Â· {file.type || "Bilinmeyen tÃ¼r"}
        </p>
      </div>
      {onRemove && (
        <button
          onClick={onRemove}
          className="shrink-0 rounded p-1 text-sm text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800"
          aria-label="DosyayÄ± kaldÄ±r"
        >
          âœ•
        </button>
      )}
    </div>
  );
}
