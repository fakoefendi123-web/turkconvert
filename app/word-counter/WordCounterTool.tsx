"use client";

import { useState, useMemo } from "react";
import { analyzeText } from "@/lib/tools/text";
import { Trash2, BookOpen, Mic } from "lucide-react";

function formatDuration(words: number, wordsPerMinute: number): string {
  if (words === 0) return "0 sn";
  const minutes = words / wordsPerMinute;
  if (minutes < 1) {
    const seconds = Math.max(1, Math.ceil(minutes * 60));
    return `~${seconds} sn`;
  }
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  return secs > 10 ? `~${mins} dk ${secs} sn` : `~${mins} dk`;
}

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => analyzeText(text), [text]);

  const readingTime = useMemo(
    () => formatDuration(stats.words, 200),
    [stats.words]
  );
  const speakingTime = useMemo(
    () => formatDuration(stats.words, 130),
    [stats.words]
  );

  const statItems = [
    { label: "Kelime", value: stats.words },
    { label: "Karakter", value: stats.characters },
    { label: "Boşluksuz Karakter", value: stats.charactersNoSpaces },
    { label: "Satır", value: stats.lines },
    { label: "Cümle", value: stats.sentences },
    { label: "Paragraf", value: stats.paragraphs },
  ];

  return (
    <div className="space-y-6">
      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Metninizi buraya yazın veya yapıştırın..."
          className="w-full rounded-lg border border-gray-300 bg-white p-4 text-sm text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
          rows={8}
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={() => setText("")}
            disabled={!text}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <Trash2 className="h-4 w-4" />
            Temizle
          </button>
        </div>
      </div>

      {/* Tahmini Süreler */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800/80">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Tahmini Okuma Süresi (200 kelime/dk)
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {readingTime}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800/80">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
            <Mic className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Tahmini Konuşma Süresi (130 kelime/dk)
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {speakingTime}
            </p>
          </div>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-gray-800/50"
          >
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 sm:text-3xl">
              {item.value.toLocaleString("tr-TR")}
            </div>
            <div className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
