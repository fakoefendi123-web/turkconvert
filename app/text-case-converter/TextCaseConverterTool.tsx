"use client";

import { useState } from "react";
import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
} from "@/lib/tools/text";
import { Copy, Check, Trash2 } from "lucide-react";

export default function TextCaseConverterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = (converter: (val: string) => string) => {
    setOutput(converter(input));
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Girdi Metni
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Dönüştürmek istediğiniz metni buraya yazın veya yapıştırın..."
          className="w-full rounded-lg border border-gray-300 bg-white p-4 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
          rows={6}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => handleConvert(toUpperCase)}
          disabled={!input}
          className="btn-primary"
        >
          BÜYÜK HARF
        </button>
        <button
          type="button"
          onClick={() => handleConvert(toLowerCase)}
          disabled={!input}
          className="btn-secondary"
        >
          küçük harf
        </button>
        <button
          type="button"
          onClick={() => handleConvert(toTitleCase)}
          disabled={!input}
          className="btn-secondary"
        >
          Başlık Düzeni
        </button>
        <button
          type="button"
          onClick={() => handleConvert(toSentenceCase)}
          disabled={!input}
          className="btn-secondary"
        >
          Cümle düzeni
        </button>
        {(input || output) && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            title="Temizle"
          >
            <Trash2 className="h-4 w-4" />
            Temizle
          </button>
        )}
      </div>

      {output && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Dönüştürülen Metin
            </label>
          </div>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pr-28 text-sm text-gray-900 focus:outline-none dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-100"
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
