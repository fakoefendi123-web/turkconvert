"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Check, RefreshCw, ShieldCheck, Key, ListFilter } from "lucide-react";

export default function PasswordGeneratorTool() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [copied, setCopied] = useState(false);
  const [batchCount, setBatchCount] = useState(5);
  const [batchPasswords, setBatchPasswords] = useState<string[]>([]);
  const [batchCopied, setBatchCopied] = useState(false);

  const generateSinglePassword = useCallback(
    (len: number) => {
      let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let lowerChars = "abcdefghijklmnopqrstuvwxyz";
      let numberChars = "0123456789";
      let symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

      if (excludeSimilar) {
        upperChars = upperChars.replace(/[IO]/g, "");
        lowerChars = lowerChars.replace(/[lo]/g, "");
        numberChars = numberChars.replace(/[01]/g, "");
      }

      let charset = "";
      if (includeUpper) charset += upperChars;
      if (includeLower) charset += lowerChars;
      if (includeNumbers) charset += numberChars;
      if (includeSymbols) charset += symbolChars;

      if (!charset) charset = lowerChars; // fallback

      const randomValues = new Uint32Array(len);
      window.crypto.getRandomValues(randomValues);

      let result = "";
      for (let i = 0; i < len; i++) {
        result += charset[randomValues[i] % charset.length];
      }
      return result;
    },
    [includeUpper, includeLower, includeNumbers, includeSymbols, excludeSimilar]
  );

  const generateNewPassword = useCallback(() => {
    const pwd = generateSinglePassword(length);
    setPassword(pwd);
  }, [length, generateSinglePassword]);

  useEffect(() => {
    generateNewPassword();
  }, [generateNewPassword]);

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 14) score += 1;
    if (pwd.length >= 20) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { label: "Zayıf", color: "bg-red-500", width: "w-1/4" };
    if (score <= 4) return { label: "Orta", color: "bg-yellow-500", width: "w-2/4" };
    if (score <= 6) return { label: "Güçlü", color: "bg-green-500", width: "w-3/4" };
    return { label: "Kırılamaz / Çok Güçlü", color: "bg-emerald-600", width: "w-full" };
  };

  const strength = calculateStrength(password);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleGenerateBatch = () => {
    const list: string[] = [];
    for (let i = 0; i < batchCount; i++) {
      list.push(generateSinglePassword(length));
    }
    setBatchPasswords(list);
  };

  const handleCopyBatch = async () => {
    await navigator.clipboard.writeText(batchPasswords.join("\n"));
    setBatchCopied(true);
    setTimeout(() => setBatchCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Şifre Göstergesi */}
      <div className="relative rounded-2xl border border-gray-200 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-gray-900/60 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1 overflow-x-auto font-mono text-xl font-bold tracking-wider text-gray-900 dark:text-white sm:text-2xl">
            {password}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={generateNewPassword}
              className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-600 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              title="Yeni Şifre Üret"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="btn-primary gap-1.5 !px-3 !py-2 text-xs"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Kopyala</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Güç Göstergesi Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">Şifre Gücü:</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {strength.label}
            </span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
            <div
              className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`}
            />
          </div>
        </div>
      </div>

      {/* Şifre Ayarları */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 space-y-5">
        <div>
          <div className="flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-200">
            <span>Şifre Uzunluğu</span>
            <span className="font-mono text-base text-primary-600 dark:text-primary-400">
              {length} karakter
            </span>
          </div>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="mt-2 w-full accent-primary-600"
          />
          <div className="flex justify-between text-[10px] text-gray-400">
            <span>4</span>
            <span>16</span>
            <span>32</span>
            <span>64</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2 border-t border-gray-100 dark:border-gray-800">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span>Büyük Harfler (A-Z)</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span>Küçük Harfler (a-z)</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span>Rakamlar (0-9)</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span>Özel Karakterler (!@#$%^&*)</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300 sm:col-span-2">
            <input
              type="checkbox"
              checked={excludeSimilar}
              onChange={(e) => setExcludeSimilar(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span>Benzer karakterleri hariç tut (0, O, l, 1, I)</span>
          </label>
        </div>
      </div>

      {/* Toplu Üretim Bölümü */}
      <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-900/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
            <ListFilter className="h-4 w-4 text-primary-500" />
            <span>Toplu Şifre Üretimi</span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={batchCount}
              onChange={(e) => setBatchCount(Number(e.target.value))}
              className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value={5}>5 Adet</option>
              <option value={10}>10 Adet</option>
              <option value={20}>20 Adet</option>
            </select>
            <button
              type="button"
              onClick={handleGenerateBatch}
              className="btn-secondary !px-3 !py-1.5 text-xs"
            >
              Üret
            </button>
          </div>
        </div>

        {batchPasswords.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="max-h-48 overflow-y-auto rounded-xl border border-gray-200 bg-white p-3 font-mono text-xs text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 space-y-1">
              {batchPasswords.map((pwd, idx) => (
                <div key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/60 p-1 rounded">
                  {pwd}
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleCopyBatch}
                className="btn-secondary !px-3 !py-1.5 text-xs gap-1"
              >
                {batchCopied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                {batchCopied ? "Tümü Kopyalandı!" : "Tümünü Kopyala"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
