"use client";

import { useState, useMemo, useCallback } from "react";
import {
  GitCompare,
  Sparkles,
  Trash2,
  ArrowRightLeft,
  Copy,
  Check,
  Columns,
  AlignJustify,
  FileText,
} from "lucide-react";

interface DiffItem {
  type: "added" | "removed" | "unchanged" | "modified";
  oldLine?: string;
  newLine?: string;
  oldNum?: number;
  newNum?: number;
  wordDiffs?: {
    oldWords: { text: string; changed: boolean }[];
    newWords: { text: string; changed: boolean }[];
  };
}

const SAMPLE_OLD = `TurkConvert v1.0
- Ücretsiz dosya dönüştürme platformu
- JPG, PNG ve WEBP görsel formatları
- Basit tarayıcı tabanlı dönüştürücü
- Standart QR kod aracı
- Manuel dosya indirme`;

const SAMPLE_NEW = `TurkConvert v2.0 - Yeni Nesil!
- Ücretsiz ve reklamsız dosya dönüştürme platformu
- JPG, PNG, WEBP ve SVG yüksek kaliteli formatlar
- Gelişmiş akıllı istemci taraflı sıkıştırma
- Gelişmiş Renkli & Logolu QR Kod Stüdyosu
- Şeffaf İmza ve Belge Sansürleme Araçları
- Toplu dönüştürme ve tek tıkla ZIP indirme`;

// Kelime düzeyinde diff hesaplayıcı
function computeWordDiff(oldStr: string, newStr: string) {
  const oldWords = oldStr.split(/(\s+)/);
  const newWords = newStr.split(/(\s+)/);

  const oldRes: { text: string; changed: boolean }[] = [];
  const newRes: { text: string; changed: boolean }[] = [];

  const oldSet = new Set(oldWords.map((w) => w.trim()).filter(Boolean));
  const newSet = new Set(newWords.map((w) => w.trim()).filter(Boolean));

  oldWords.forEach((w) => {
    const trimmed = w.trim();
    if (!trimmed) {
      oldRes.push({ text: w, changed: false });
    } else {
      oldRes.push({ text: w, changed: !newSet.has(trimmed) });
    }
  });

  newWords.forEach((w) => {
    const trimmed = w.trim();
    if (!trimmed) {
      newRes.push({ text: w, changed: false });
    } else {
      newRes.push({ text: w, changed: !oldSet.has(trimmed) });
    }
  });

  return { oldWords: oldRes, newWords: newRes };
}

// LCS tabanlı güvenilir satır diff algoritması
function computeLCSDiff(
  oldLines: string[],
  newLines: string[],
  ignoreWhitespace: boolean,
  caseInsensitive: boolean
): DiffItem[] {
  const normalize = (s: string) => {
    let res = s;
    if (ignoreWhitespace) res = res.replace(/\s+/g, " ").trim();
    if (caseInsensitive) res = res.toLocaleLowerCase("tr-TR");
    return res;
  };

  const M = oldLines.length;
  const N = newLines.length;

  // LCS Matrix
  const dp: number[][] = Array.from({ length: M + 1 }, () =>
    new Array(N + 1).fill(0)
  );

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (normalize(oldLines[i]) === normalize(newLines[j])) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  // Backtrack
  const items: DiffItem[] = [];
  let i = M;
  let j = N;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && normalize(oldLines[i - 1]) === normalize(newLines[j - 1])) {
      items.unshift({
        type: "unchanged",
        oldLine: oldLines[i - 1],
        newLine: newLines[j - 1],
        oldNum: i,
        newNum: j,
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      items.unshift({
        type: "added",
        newLine: newLines[j - 1],
        newNum: j,
      });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      items.unshift({
        type: "removed",
        oldLine: oldLines[i - 1],
        oldNum: i,
      });
      i--;
    }
  }

  // Peş peşe gelen silindi ve eklendi satırlarını "modified" olarak grupla
  const refined: DiffItem[] = [];
  for (let k = 0; k < items.length; k++) {
    const cur = items[k];
    const next = items[k + 1];

    if (cur.type === "removed" && next && next.type === "added") {
      const wordDiffs = computeWordDiff(cur.oldLine || "", next.newLine || "");
      refined.push({
        type: "modified",
        oldLine: cur.oldLine,
        newLine: next.newLine,
        oldNum: cur.oldNum,
        newNum: next.newNum,
        wordDiffs,
      });
      k++; // next'i atla
    } else {
      refined.push(cur);
    }
  }

  return refined;
}

export default function DiffCheckerTool() {
  const [oldText, setOldText] = useState(SAMPLE_OLD);
  const [newText, setNewText] = useState(SAMPLE_NEW);
  const [viewMode, setViewMode] = useState<"split" | "unified">("unified");
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [caseInsensitive, setCaseInsensitive] = useState(false);
  const [copied, setCopied] = useState(false);

  // Diff hesaplama
  const diffResults = useMemo(() => {
    if (!oldText && !newText) return null;
    const oldLines = oldText.split(/\r?\n/);
    const newLines = newText.split(/\r?\n/);
    return computeLCSDiff(oldLines, newLines, ignoreWhitespace, caseInsensitive);
  }, [oldText, newText, ignoreWhitespace, caseInsensitive]);

  // İstatistikler
  const stats = useMemo(() => {
    if (!diffResults) return { added: 0, removed: 0, modified: 0, unchanged: 0 };
    let added = 0;
    let removed = 0;
    let modified = 0;
    let unchanged = 0;

    diffResults.forEach((d) => {
      if (d.type === "added") added++;
      else if (d.type === "removed") removed++;
      else if (d.type === "modified") modified++;
      else unchanged++;
    });

    return { added, removed, modified, unchanged };
  }, [diffResults]);

  const handleSwap = () => {
    const temp = oldText;
    setOldText(newText);
    setNewText(temp);
  };

  const handleClear = () => {
    setOldText("");
    setNewText("");
  };

  const handleCopyReport = async () => {
    if (!diffResults) return;
    const lines = diffResults.map((d) => {
      if (d.type === "added") return `+ ${d.newLine}`;
      if (d.type === "removed") return `- ${d.oldLine}`;
      if (d.type === "modified") return `~ -: ${d.oldLine}\n  +: ${d.newLine}`;
      return `  ${d.oldLine}`;
    });

    const report = `TurkConvert Metin Karşılaştırma Raporu\nFarklar:\n${lines.join("\n")}`;
    await navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Üst Eylem ve Ayar Çubuğu */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-900/40">
        <div className="flex flex-wrap items-center gap-2">
          {/* Görünüm Modu */}
          <div className="flex items-center rounded-lg border border-gray-200 bg-white p-0.5 dark:border-gray-700 dark:bg-gray-800">
            <button
              type="button"
              onClick={() => setViewMode("unified")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                viewMode === "unified"
                  ? "bg-primary-600 text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              <AlignJustify className="h-3.5 w-3.5" />
              <span>Satır İçi</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                viewMode === "split"
                  ? "bg-primary-600 text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              <Columns className="h-3.5 w-3.5" />
              <span>Yan Yana</span>
            </button>
          </div>

          {/* Filtre Anahtarları */}
          <label className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={ignoreWhitespace}
              onChange={(e) => setIgnoreWhitespace(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span>Boşlukları Yoksay</span>
          </label>

          <label className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={caseInsensitive}
              onChange={(e) => setCaseInsensitive(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span>Büyük/Küçük Harf Yoksay</span>
          </label>
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSwap}
            className="btn-secondary !px-2.5 !py-1.5 text-xs gap-1"
            title="Metinleri Yer Değiştir"
          >
            <ArrowRightLeft className="h-3.5 w-3.5" />
            <span>Yer Değiştir</span>
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="btn-secondary !px-2.5 !py-1.5 text-xs gap-1 text-red-600 dark:text-red-400"
            title="Temizle"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Temizle</span>
          </button>
          <button
            type="button"
            onClick={handleCopyReport}
            className="btn-primary !px-3 !py-1.5 text-xs gap-1"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Kopyalandı!" : "Raporu Kopyala"}</span>
          </button>
        </div>
      </div>

      {/* İki Metin Giriş Alanı */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Orijinal (Eski) Metin
            </label>
            <span className="text-[11px] text-gray-400">
              {oldText.split(/\r?\n/).length} satır
            </span>
          </div>
          <textarea
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
            placeholder="Karşılaştırmak istediğiniz eski metni buraya yapıştırın..."
            rows={10}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 font-mono text-xs text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              Güncel (Yeni) Metin
            </label>
            <span className="text-[11px] text-gray-400">
              {newText.split(/\r?\n/).length} satır
            </span>
          </div>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Değişiklikleri içeren yeni metni buraya yapıştırın..."
            rows={10}
            className="w-full rounded-xl border border-gray-300 bg-white p-3 font-mono text-xs text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Canlı İstatistik Çubuğu */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span className="font-semibold text-gray-700 dark:text-gray-300">Fark Özeti:</span>
        <span className="rounded-md bg-green-100 px-2.5 py-1 font-medium text-green-700 dark:bg-green-950/40 dark:text-green-300">
          +{stats.added} Eklendi
        </span>
        <span className="rounded-md bg-red-100 px-2.5 py-1 font-medium text-red-700 dark:bg-red-950/40 dark:text-red-300">
          -{stats.removed} Silindi
        </span>
        <span className="rounded-md bg-amber-100 px-2.5 py-1 font-medium text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
          ~{stats.modified} Değiştirildi
        </span>
        <span className="rounded-md bg-gray-100 px-2.5 py-1 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
          ={stats.unchanged} Eşleşen
        </span>
      </div>

      {/* Canlı Diff Sonuç Tablosu */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-200 bg-gray-50/80 px-4 py-3 dark:border-gray-800 dark:bg-gray-900/80">
          <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            Karşılaştırma Sonuçları
          </h4>
        </div>

        {diffResults && diffResults.length > 0 ? (
          <div className="max-h-[600px] overflow-auto font-mono text-xs">
            {viewMode === "unified" ? (
              /* SATIR İÇİ (UNIFIED) GÖRÜNÜM */
              <table className="w-full text-left">
                <tbody>
                  {diffResults.map((item, idx) => {
                    if (item.type === "unchanged") {
                      return (
                        <tr
                          key={idx}
                          className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40"
                        >
                          <td className="w-12 select-none border-r border-gray-100 px-2 py-1 text-right text-[11px] text-gray-400 dark:border-gray-800">
                            {item.oldNum}
                          </td>
                          <td className="w-12 select-none border-r border-gray-100 px-2 py-1 text-right text-[11px] text-gray-400 dark:border-gray-800">
                            {item.newNum}
                          </td>
                          <td className="w-6 select-none px-2 py-1 text-gray-400"> </td>
                          <td className="whitespace-pre-wrap px-3 py-1 text-gray-700 dark:text-gray-300">
                            {item.oldLine || " "}
                          </td>
                        </tr>
                      );
                    }

                    if (item.type === "added") {
                      return (
                        <tr
                          key={idx}
                          className="bg-green-50/80 text-green-900 dark:bg-green-950/30 dark:text-green-200"
                        >
                          <td className="w-12 select-none border-r border-green-200/40 px-2 py-1 text-right text-[11px] text-green-600/60 dark:border-green-900/40">
                            {" "}
                          </td>
                          <td className="w-12 select-none border-r border-green-200/40 px-2 py-1 text-right text-[11px] text-green-600/70 dark:border-green-900/40">
                            {item.newNum}
                          </td>
                          <td className="w-6 select-none px-2 py-1 font-bold text-green-600 dark:text-green-400">
                            +
                          </td>
                          <td className="whitespace-pre-wrap px-3 py-1 font-medium">
                            {item.newLine}
                          </td>
                        </tr>
                      );
                    }

                    if (item.type === "removed") {
                      return (
                        <tr
                          key={idx}
                          className="bg-red-50/80 text-red-900 dark:bg-red-950/30 dark:text-red-200"
                        >
                          <td className="w-12 select-none border-r border-red-200/40 px-2 py-1 text-right text-[11px] text-red-600/70 dark:border-red-900/40">
                            {item.oldNum}
                          </td>
                          <td className="w-12 select-none border-r border-red-200/40 px-2 py-1 text-right text-[11px] text-red-600/60 dark:border-red-900/40">
                            {" "}
                          </td>
                          <td className="w-6 select-none px-2 py-1 font-bold text-red-600 dark:text-red-400">
                            -
                          </td>
                          <td className="whitespace-pre-wrap px-3 py-1 font-medium">
                            {item.oldLine}
                          </td>
                        </tr>
                      );
                    }

                    if (item.type === "modified") {
                      return (
                        <>
                          {/* Eski Hal */}
                          <tr
                            key={`${idx}-old`}
                            className="bg-red-50/70 text-red-900 dark:bg-red-950/30 dark:text-red-200"
                          >
                            <td className="w-12 select-none border-r border-red-200/40 px-2 py-1 text-right text-[11px] text-red-600/70 dark:border-red-900/40">
                              {item.oldNum}
                            </td>
                            <td className="w-12 select-none border-r border-red-200/40 px-2 py-1 text-right text-[11px] text-red-600/50 dark:border-red-900/40">
                              {" "}
                            </td>
                            <td className="w-6 select-none px-2 py-1 font-bold text-red-600 dark:text-red-400">
                              -
                            </td>
                            <td className="whitespace-pre-wrap px-3 py-1">
                              {item.wordDiffs ? (
                                item.wordDiffs.oldWords.map((w, wIdx) => (
                                  <span
                                    key={wIdx}
                                    className={
                                      w.changed
                                        ? "rounded bg-red-200/80 px-1 font-semibold dark:bg-red-900/70"
                                        : ""
                                    }
                                  >
                                    {w.text}
                                  </span>
                                ))
                              ) : (
                                item.oldLine
                              )}
                            </td>
                          </tr>

                          {/* Yeni Hal */}
                          <tr
                            key={`${idx}-new`}
                            className="bg-green-50/70 text-green-900 dark:bg-green-950/30 dark:text-green-200"
                          >
                            <td className="w-12 select-none border-r border-green-200/40 px-2 py-1 text-right text-[11px] text-green-600/50 dark:border-green-900/40">
                              {" "}
                            </td>
                            <td className="w-12 select-none border-r border-green-200/40 px-2 py-1 text-right text-[11px] text-green-600/70 dark:border-green-900/40">
                              {item.newNum}
                            </td>
                            <td className="w-6 select-none px-2 py-1 font-bold text-green-600 dark:text-green-400">
                              +
                            </td>
                            <td className="whitespace-pre-wrap px-3 py-1">
                              {item.wordDiffs ? (
                                item.wordDiffs.newWords.map((w, wIdx) => (
                                  <span
                                    key={wIdx}
                                    className={
                                      w.changed
                                        ? "rounded bg-green-200/80 px-1 font-semibold dark:bg-green-900/70"
                                        : ""
                                    }
                                  >
                                    {w.text}
                                  </span>
                                ))
                              ) : (
                                item.newLine
                              )}
                            </td>
                          </tr>
                        </>
                      );
                    }

                    return null;
                  })}
                </tbody>
              </table>
            ) : (
              /* YAN YANA (SPLIT) GÖRÜNÜM */
              <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-800">
                {/* Sol Taraf (Eski) */}
                <div>
                  <div className="sticky top-0 bg-gray-100/90 px-3 py-1 text-[11px] font-bold text-gray-500 dark:bg-gray-800/90">
                    Orijinal (Eski)
                  </div>
                  {diffResults.map((item, idx) => {
                    if (item.type === "added") {
                      return (
                        <div
                          key={idx}
                          className="min-h-[24px] bg-gray-50/50 px-2 py-1 text-gray-400 dark:bg-gray-800/20"
                        >
                          {" "}
                        </div>
                      );
                    }
                    const isRem = item.type === "removed" || item.type === "modified";
                    return (
                      <div
                        key={idx}
                        className={`flex items-start px-2 py-1 ${
                          isRem
                            ? "bg-red-50/70 text-red-900 dark:bg-red-950/30 dark:text-red-200"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span className="w-8 select-none text-[11px] text-gray-400">
                          {item.oldNum}
                        </span>
                        <span className="whitespace-pre-wrap flex-1">
                          {item.wordDiffs ? (
                            item.wordDiffs.oldWords.map((w, wIdx) => (
                              <span
                                key={wIdx}
                                className={
                                  w.changed
                                    ? "rounded bg-red-200/80 px-1 font-semibold dark:bg-red-900/70"
                                    : ""
                                }
                              >
                                {w.text}
                              </span>
                            ))
                          ) : (
                            item.oldLine || " "
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Sağ Taraf (Yeni) */}
                <div>
                  <div className="sticky top-0 bg-gray-100/90 px-3 py-1 text-[11px] font-bold text-gray-500 dark:bg-gray-800/90">
                    Güncel (Yeni)
                  </div>
                  {diffResults.map((item, idx) => {
                    if (item.type === "removed") {
                      return (
                        <div
                          key={idx}
                          className="min-h-[24px] bg-gray-50/50 px-2 py-1 text-gray-400 dark:bg-gray-800/20"
                        >
                          {" "}
                        </div>
                      );
                    }
                    const isAdd = item.type === "added" || item.type === "modified";
                    return (
                      <div
                        key={idx}
                        className={`flex items-start px-2 py-1 ${
                          isAdd
                            ? "bg-green-50/70 text-green-900 dark:bg-green-950/30 dark:text-green-200"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span className="w-8 select-none text-[11px] text-gray-400">
                          {item.newNum}
                        </span>
                        <span className="whitespace-pre-wrap flex-1">
                          {item.wordDiffs ? (
                            item.wordDiffs.newWords.map((w, wIdx) => (
                              <span
                                key={wIdx}
                                className={
                                  w.changed
                                    ? "rounded bg-green-200/80 px-1 font-semibold dark:bg-green-900/70"
                                    : ""
                                }
                              >
                                {w.text}
                              </span>
                            ))
                          ) : (
                            item.newLine || " "
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-gray-400">
            Karşılaştırma yapmak için metin girin.
          </div>
        )}
      </div>
    </div>
  );
}
