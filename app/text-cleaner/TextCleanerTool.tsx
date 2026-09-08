"use client";

import { useState } from "react";
import { cleanText } from "@/lib/tools/text";
import { Copy, Check, Trash2, Sparkles } from "lucide-react";

export default function TextCleanerTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const [trimLines, setTrimLines] = useState(true);
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true);
  const [removeLineBreaks, setRemoveLineBreaks] = useState(false);

  const handleClean = () => {
    const result = cleanText(input, {
      trimLines,
      removeExtraSpaces,
      removeEmptyLines,
      removeLineBreaks,
    });
    setOutput(result);
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
          placeholder="Temizlemek istediÄŸiniz metni buraya yazÄ±n veya yapÄ±ÅŸtÄ±rÄ±n..."
          className="w-full rounded-lg border border-gray-300 bg-white p-4 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
          rows={6}
        />
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/40">
        <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Temizleme SeÃ§enekleri
        </span>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(e) => setTrimLines(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            SatÄ±r baÅŸÄ±/sonu boÅŸluklarÄ±nÄ± temizle
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={removeExtraSpaces}
              onChange={(e) => setRemoveExtraSpaces(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            Fazla boÅŸluklarÄ± kaldÄ±r
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={removeEmptyLines}
              onChange={(e) => setRemoveEmptyLines(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            BoÅŸ satÄ±rlarÄ± kaldÄ±r
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={removeLineBreaks}
              onChange={(e) => setRemoveLineBreaks(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            TÃ¼m satÄ±r sonlarÄ±nÄ± kaldÄ±r
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleClean}
          disabled={!input}
          className="btn-primary gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Temizle
        </button>
        {(input || output) && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            title="Temizle"
          >
            <Trash2 className="h-4 w-4" />
            SÄ±fÄ±rla
          </button>
        )}
      </div>

      {output && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            TemizlenmiÅŸ Metin
          </label>
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
                    KopyalandÄ±!
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
