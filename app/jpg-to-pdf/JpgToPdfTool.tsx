"use client";

import { useState, useCallback } from "react";
import { FileUploader, FileInfo } from "@/components/ui/FileUploader";
import { ConversionProgress } from "@/components/ui/ConversionProgress";
import { ConversionResult } from "@/components/ui/ConversionResult";
import { imagesToPdf } from "@/lib/converters/pdf";
import { changeFileExtension } from "@/lib/utils";
import { FileText, RefreshCw } from "lucide-react";

type ToolState = "idle" | "ready" | "converting" | "done" | "error";

export default function JpgToPdfTool() {
  const [state, setState] = useState<ToolState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [resultName, setResultName] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setErrorMsg("");
    setState("ready");
  }, []);

  const handleConvert = useCallback(async () => {
    if (!file) return;

    setState("converting");
    try {
      const blob = await imagesToPdf([file]);
      const newName = changeFileExtension(file.name, "pdf");
      setResult(blob);
      setResultName(newName);
      setState("done");
    } catch {
      setErrorMsg(
        "PDF oluÅŸturulurken bir sorun oluÅŸtu. LÃ¼tfen tekrar deneyin."
      );
      setState("error");
    }
  }, [file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setResult(null);
    setResultName("");
    setErrorMsg("");
    setState("idle");
  }, []);

  return (
    <div>
      {/* Dosya YÃ¼kleme */}
      {(state === "idle" || (state === "error" && !file)) && (
        <FileUploader
          accept="image/jpeg"
          acceptLabel="JPG"
          onFileSelect={handleFileSelect}
        />
      )}

      {/* Dosya Bilgisi + PDF OluÅŸtur Butonu */}
      {state === "ready" && file && (
        <div className="space-y-6">
          <FileInfo file={file} onRemove={handleReset} />

          <div className="flex justify-center pt-2">
            <button onClick={handleConvert} className="btn-primary gap-2">
              <FileText className="h-4 w-4" />
              PDF OluÅŸtur
            </button>
          </div>
        </div>
      )}

      {/* DÃ¶nÃ¼ÅŸtÃ¼rme SÃ¼reci */}
      {state === "converting" && (
        <ConversionProgress message="PDF belgeniz oluÅŸturuluyor..." />
      )}

      {/* SonuÃ§ */}
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
