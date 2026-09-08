"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { encodeBase64 } from "@/lib/tools/developer";

export default function Base64EncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    if (!input) {
      setError("Lütfen kodlamak için bir metin girin.");
      setOutput("");
      return;
    }

    try {
      setError("");
      const result = encodeBase64(input);
      setOutput(result);
    } catch {
      setError("Kodlama sırasında bir hata oluştu.");
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Metin Girdisi
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Base64 formatına dönüştürmek istediğiniz metni buraya yapıştırın..."
          className="w-full rounded-lg border border-gray-300 bg-white p-4 font-mono text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
          rows={6}
        />
      </div>

      <div>
        <button
          type="button"
          onClick={handleProcess}
          className="btn-primary"
        >
          Encode
        </button>
      </div>

      {error && (
        <p className="text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {output && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Base64 Çıktısı
          </label>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              className="w-full break-all rounded-lg border border-gray-300 bg-gray-50 p-4 pr-28 font-mono text-sm text-gray-900 focus:outline-none dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-100"
              rows={6}
            />
            <button
              type="button"
              onClick={handleCopy}
              className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              title="Kopyala"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  <span className="text-green-600 dark:text-green-400">
                    Kopyalandı!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Kopyala</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
