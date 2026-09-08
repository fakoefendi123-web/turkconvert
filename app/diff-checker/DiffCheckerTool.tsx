"use client";

import { useState } from "react";
import { GitCompare, Sparkles, Trash2, ArrowRight } from "lucide-react";

interface DiffLine {
  type: "added" | "removed" | "unchanged";
  text: string;
  oldLineNum?: number;
  newLineNum?: number;
}

export default function DiffCheckerTool() {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [diffResults, setDiffResults] = useState<DiffLine[] | null>(null);
  const [stats, setStats] = useState({ added: 0, removed: 0, unchanged: 0 });

  const computeDiff = () => {
    const oldLines = oldText.split("\n");
    const newLines = newText.split("\n");

    const result: DiffLine[] = [];
    let addedCount = 0;
    let removedCount = 0;
    let unchangedCount = 0;

    let i = 0;
    let j = 0;
    let oldNum = 1;
    let newNum = 1;

    // Basit ve etkili LCS tabanlÄ± satÄ±r karÅŸÄ±laÅŸtÄ±rmasÄ±
    while (i < oldLines.length || j < newLines.length) {
      if (i < oldLines.length && j < newLines.length && oldLines[i] === newLines[j]) {
        result.push({
          type: "unchanged",
          text: oldLines[i],
          oldLineNum: oldNum++,
          newLineNum: newNum++,
        });
        unchangedCount++;
        i++;
        j++;
      } else if (
        j < newLines.length &&
        (!oldLines.includes(newLines[j], i) || (i < oldLines.length && oldLines[i] !== newLines[j]))
      ) {
        // Yeni eklenen satÄ±r
        if (i < oldLines.length && !newLines.includes(oldLines[i], j)) {
          // Eski satÄ±r silinmiÅŸ
          result.push({
            type: "removed",
            text: oldLines[i],
            oldLineNum: oldNum++,
          });
          removedCount++;
          i++;
        } else {
          result.push({
            type: "added",
            text: newLines[j],
            newLineNum: newNum++,
          });
          addedCount++;
          j++;
        }
      } else if (i < oldLines.length) {
        result.push({
          type: "removed",
          text: oldLines[i],
          oldLineNum: oldNum++,
        });
        removedCount++;
        i++;
      } else if (j < newLines.length) {
        result.push({
          type: "added",
          text: newLines[j],
          newLineNum: newNum++,
        });
        addedCount++;
        j++;
      }
    }

    setDiffResults(result);
    setStats({ added: addedCount, removed: removedCount, unchanged: unchangedCount });
  };

  const loadSample = () => {
    const sampleOld = `ConvertTR Projesi
- Ãœcretsiz dosya dÃ¶nÃ¼ÅŸtÃ¼rme
- Sadece tekli dosya dÃ¶nÃ¼ÅŸtÃ¼rme
- Temel arayÃ¼z
- E-posta desteÄŸi`;

    const sampleNew = `turkconvert Projesi
- Ãœcretsiz ve hÄ±zlÄ± dosya dÃ¶nÃ¼ÅŸtÃ¼rme
- Toplu gÃ¶rsel ve ZIP indirme desteÄŸi
- GeliÅŸmiÅŸ modern arayÃ¼z ve arama
- E-posta desteÄŸi
- 7/24 kesintisiz hizmet`;

    setOldText(sampleOld);
    setNewText(sampleNew);
  };

  const handleClear = () => {
    setOldText("");
    setNewText("");
    setDiffResults(null);
  };

  return (
    <div className="space-y-6">
      {/* Ãœst Eylemler */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Ä°ki metni yapÄ±ÅŸtÄ±rÄ±p farklarÄ± satÄ±r satÄ±r karÅŸÄ±laÅŸtÄ±rÄ±n.
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadSample}
            className="btn-secondary !px-3 !py-1.5 text-xs gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary-500" />
            Ã–rnek YÃ¼kle
          </button>
          {(oldText || newText) && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-lg p-1.5 text-gray-400 hover:text-red-500"
              title="Temizle"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Ä°ki Metin AlanÄ± */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
            Orijinal Metin (Eski Versiyon)
          </label>
          <textarea
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
            placeholder="Eski veya orijinal metni buraya yapÄ±ÅŸtÄ±rÄ±n..."
            className="w-full rounded-xl border border-gray-300 bg-white p-3.5 font-mono text-xs text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            rows={8}
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
            DeÄŸiÅŸtirilmiÅŸ Metin (Yeni Versiyon)
          </label>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Yeni veya gÃ¼ncellenmiÅŸ metni buraya yapÄ±ÅŸtÄ±rÄ±n..."
            className="w-full rounded-xl border border-gray-300 bg-white p-3.5 font-mono text-xs text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            rows={8}
          />
        </div>
      </div>

      {/* KarÅŸÄ±laÅŸtÄ±r Butonu */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={computeDiff}
          disabled={!oldText && !newText}
          className="btn-primary gap-2"
        >
          <GitCompare className="h-4 w-4" />
          Metinleri KarÅŸÄ±laÅŸtÄ±r
        </button>
      </div>

      {/* SonuÃ§ AlanÄ± */}
      {diffResults !== null && (
        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {/* Ä°statistikler */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 dark:border-gray-800">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              KarÅŸÄ±laÅŸtÄ±rma Sonucu
            </h3>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="text-green-600 dark:text-green-400">
                +{stats.added} SatÄ±r Eklendi
              </span>
              <span className="text-red-600 dark:text-red-400">
                -{stats.removed} SatÄ±r Silindi
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {stats.unchanged} DeÄŸiÅŸmedi
              </span>
            </div>
          </div>

          {/* Diff SatÄ±rlarÄ± */}
          <div className="max-h-96 overflow-x-auto overflow-y-auto rounded-xl border border-gray-200 font-mono text-xs dark:border-gray-800">
            {diffResults.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                Herhangi bir fark bulunamadÄ±. Metinler birebir aynÄ±.
              </div>
            ) : (
              <table className="w-full text-left">
                <tbody>
                  {diffResults.map((line, idx) => {
                    const isAdd = line.type === "added";
                    const isRem = line.type === "removed";

                    return (
                      <tr
                        key={idx}
                        className={`${
                          isAdd
                            ? "bg-green-50/80 text-green-900 dark:bg-green-950/40 dark:text-green-200"
                            : isRem
                            ? "bg-red-50/80 text-red-900 dark:bg-red-950/40 dark:text-red-200"
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/40"
                        }`}
                      >
                        <td className="w-12 select-none border-r border-black/5 px-2 py-1 text-right text-[11px] text-gray-400 dark:border-white/5">
                          {line.oldLineNum || ""}
                        </td>
                        <td className="w-12 select-none border-r border-black/5 px-2 py-1 text-right text-[11px] text-gray-400 dark:border-white/5">
                          {line.newLineNum || ""}
                        </td>
                        <td className="w-6 select-none px-2 py-1 font-bold">
                          {isAdd ? "+" : isRem ? "-" : " "}
                        </td>
                        <td className="whitespace-pre-wrap px-2 py-1">
                          {line.text || "\u00A0"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
