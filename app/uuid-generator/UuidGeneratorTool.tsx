"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Check, RefreshCw, Layers } from "lucide-react";
import { generateUUID } from "@/lib/tools/developer";

export function UuidGeneratorTool() {
  const [singleUuid, setSingleUuid] = useState("");
  const [copiedSingle, setCopiedSingle] = useState(false);

  const [bulkCount, setBulkCount] = useState<number>(5);
  const [bulkUuids, setBulkUuids] = useState<string>("");
  const [copiedBulk, setCopiedBulk] = useState(false);

  // Sayfa yÃ¼klendiÄŸinde bir adet UUID oluÅŸtur
  useEffect(() => {
    setSingleUuid(generateUUID());
  }, []);

  const handleGenerateSingle = useCallback(() => {
    setSingleUuid(generateUUID());
    setCopiedSingle(false);
  }, []);

  const handleCopySingle = useCallback(async () => {
    if (!singleUuid) return;
    try {
      await navigator.clipboard.writeText(singleUuid);
      setCopiedSingle(true);
      setTimeout(() => setCopiedSingle(false), 2000);
    } catch {
      // Hata durumunda sessizce geÃ§
    }
  }, [singleUuid]);

  const handleGenerateBulk = useCallback(() => {
    const count = Math.min(100, Math.max(1, bulkCount || 1));
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      list.push(generateUUID());
    }
    setBulkUuids(list.join("\n"));
    setCopiedBulk(false);
  }, [bulkCount]);

  const handleCopyBulk = useCallback(async () => {
    if (!bulkUuids) return;
    try {
      await navigator.clipboard.writeText(bulkUuids);
      setCopiedBulk(true);
      setTimeout(() => setCopiedBulk(false), 2000);
    } catch {
      // Hata durumunda sessizce geÃ§
    }
  }, [bulkUuids]);

  return (
    <div className="space-y-8">
      {/* Tekli UUID BÃ¶lÃ¼mÃ¼ */}
      <div>
        <label
          htmlFor="single-uuid"
          className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          OluÅŸturulan UUID (v4)
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              id="single-uuid"
              type="text"
              readOnly
              value={singleUuid}
              placeholder="UUID oluÅŸturuluyor..."
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 font-mono text-base text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCopySingle}
              disabled={!singleUuid}
              className="btn-secondary flex-1 gap-2 px-4 py-3 sm:flex-initial"
              title="Panoya Kopyala"
            >
              {copiedSingle ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  <span>KopyalandÄ±</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Kopyala</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleGenerateSingle}
              className="btn-primary flex-1 gap-2 px-4 py-3 sm:flex-initial"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Yeni UUID OluÅŸtur</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toplu UUID OluÅŸturma BÃ¶lÃ¼mÃ¼ */}
      <div className="border-t border-gray-200 pt-8 dark:border-gray-800">
        <div className="mb-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <Layers className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            Toplu OluÅŸtur
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            AynÄ± anda 1 ile 100 arasÄ±nda UUID oluÅŸturun.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <label
              htmlFor="bulk-count"
              className="whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Adet:
            </label>
            <input
              id="bulk-count"
              type="number"
              min={1}
              max={100}
              value={bulkCount}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setBulkCount(isNaN(val) ? 1 : val);
              }}
              className="w-24 rounded-lg border border-gray-300 bg-white px-3 py-2 text-center text-sm font-medium text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <button
            type="button"
            onClick={handleGenerateBulk}
            className="btn-primary gap-2 py-2.5"
          >
            <RefreshCw className="h-4 w-4" />
            <span>OluÅŸtur</span>
          </button>
        </div>

        {bulkUuids && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {bulkUuids.split("\n").length} adet UUID oluÅŸturuldu
              </span>
              <button
                type="button"
                onClick={handleCopyBulk}
                className="btn-secondary gap-2 px-3 py-1.5 text-xs"
              >
                {copiedBulk ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    <span>KopyalandÄ±</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>TÃ¼mÃ¼nÃ¼ Kopyala</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              readOnly
              rows={Math.min(10, Math.max(4, bulkUuids.split("\n").length))}
              value={bulkUuids}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-4 font-mono text-sm leading-relaxed text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
        )}
      </div>
    </div>
  );
}
