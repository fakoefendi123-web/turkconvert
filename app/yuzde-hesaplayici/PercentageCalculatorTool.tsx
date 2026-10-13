"use client";

import { useState } from "react";
import {
  Percent,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Tag,
  DollarSign,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";

function formatNumber(num: number): string {
  if (isNaN(num) || !isFinite(num)) return "0";
  return new Intl.NumberFormat("tr-TR", {
    maximumFractionDigits: 2,
  }).format(num);
}

export default function PercentageCalculatorTool() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Kart 1: A sayısının %B'si kaçtır?
  const [c1A, setC1A] = useState<string>("500");
  const [c1B, setC1B] = useState<string>("20");

  // Kart 2: A sayısı B sayısının yüzde kaçıdır?
  const [c2A, setC2A] = useState<string>("25");
  const [c2B, setC2B] = useState<string>("100");

  // Kart 3: A sayısından B sayısına yüzde değişim?
  const [c3A, setC3A] = useState<string>("200");
  const [c3B, setC3B] = useState<string>("250");

  // Kart 4: A sayısına %B ekle (Zam / KDV)
  const [c4A, setC4A] = useState<string>("1000");
  const [c4B, setC4B] = useState<string>("20");

  // Kart 5: A sayısından %B çıkar (İskonto / İndirim)
  const [c5A, setC5A] = useState<string>("1500");
  const [c5B, setC5B] = useState<string>("15");

  const handleCopy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Hesaplamalar
  // C1
  const num1A = parseFloat(c1A) || 0;
  const num1B = parseFloat(c1B) || 0;
  const res1 = (num1A * num1B) / 100;

  // C2
  const num2A = parseFloat(c2A) || 0;
  const num2B = parseFloat(c2B) || 0;
  const res2 = num2B !== 0 ? (num2A / num2B) * 100 : 0;

  // C3
  const num3A = parseFloat(c3A) || 0;
  const num3B = parseFloat(c3B) || 0;
  const diff3 = num3B - num3A;
  const res3 = num3A !== 0 ? (diff3 / Math.abs(num3A)) * 100 : 0;
  const isIncrease3 = diff3 >= 0;

  // C4
  const num4A = parseFloat(c4A) || 0;
  const num4B = parseFloat(c4B) || 0;
  const addedVal4 = (num4A * num4B) / 100;
  const total4 = num4A + addedVal4;

  // C5
  const num5A = parseFloat(c5A) || 0;
  const num5B = parseFloat(c5B) || 0;
  const discountVal5 = (num5A * num5B) / 100;
  const total5 = num5A - discountVal5;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* 2 Sütunlu Kart Izgarası */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* KART 1: A'nın %B'si kaçtır? */}
        <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/70">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                <Percent className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                A sayısının %B&apos;si kaçtır?
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Belirli bir tutarın belirtilen yüzdesini hesaplar.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500">Sayı (A):</label>
                <input
                  type="number"
                  value={c1A}
                  onChange={(e) => setC1A(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500">Yüzde (%B):</label>
                <input
                  type="number"
                  value={c1B}
                  onChange={(e) => setC1B(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Hızlı Kapsüller */}
            <div className="mt-2.5 flex gap-1.5">
              {["10", "18", "20", "50"].map((p) => (
                <button
                  key={p}
                  onClick={() => setC1B(p)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-300"
                >
                  %{p}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4 dark:border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400">Sonuç ({num1A} sayısının %{num1B}&apos;si):</p>
                <p className="text-xl font-black text-primary-600 dark:text-primary-400">
                  {formatNumber(res1)}
                </p>
              </div>
              <button
                onClick={() => handleCopy(res1.toString(), "c1")}
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
              >
                {copiedKey === "c1" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === "c1" ? "Kopyalandı" : "Kopyala"}</span>
              </button>
            </div>
            <p className="mt-1 text-[10px] text-slate-400 font-mono">
              Formül: ({num1A} × {num1B}) ÷ 100 = {formatNumber(res1)}
            </p>
          </div>
        </div>

        {/* KART 2: A sayısı B'nin yüzde kaçıdır? */}
        <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/70">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <Tag className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                A sayısı B sayısının yüzde kaçıdır?
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              İki sayı arasındaki yüzdelik oranı bulur.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500">Parça (A):</label>
                <input
                  type="number"
                  value={c2A}
                  onChange={(e) => setC2A(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500">Toplam (B):</label>
                <input
                  type="number"
                  value={c2B}
                  onChange={(e) => setC2B(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4 dark:border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400">Yüzde Oranı:</p>
                <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                  %{formatNumber(res2)}
                </p>
              </div>
              <button
                onClick={() => handleCopy(`%${formatNumber(res2)}`, "c2")}
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
              >
                {copiedKey === "c2" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === "c2" ? "Kopyalandı" : "Kopyala"}</span>
              </button>
            </div>
            <p className="mt-1 text-[10px] text-slate-400 font-mono">
              Formül: ({num2A} ÷ {num2B}) × 100 = %{formatNumber(res2)}
            </p>
          </div>
        </div>

        {/* KART 3: Yüzde Değişim (Artış / Azalış) */}
        <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/70">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                {isIncrease3 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Yüzde Değişim (Artış / Azalış)
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Başlangıç değerinden son değere gerçekleşen değişim yüzdesi.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500">İlk Değer (A):</label>
                <input
                  type="number"
                  value={c3A}
                  onChange={(e) => setC3A(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500">Son Değer (B):</label>
                <input
                  type="number"
                  value={c3B}
                  onChange={(e) => setC3B(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4 dark:border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400">Değişim Miktarı:</p>
                <p className={`text-xl font-black ${isIncrease3 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  {isIncrease3 ? `+ %${formatNumber(res3)} Artış` : `- %${formatNumber(Math.abs(res3))} Azalış`}
                </p>
              </div>
              <button
                onClick={() => handleCopy(`%${formatNumber(res3)}`, "c3")}
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
              >
                {copiedKey === "c3" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === "c3" ? "Kopyalandı" : "Kopyala"}</span>
              </button>
            </div>
            <p className="mt-1 text-[10px] text-slate-400 font-mono">
              Fark: {diff3 >= 0 ? `+${formatNumber(diff3)}` : formatNumber(diff3)}
            </p>
          </div>
        </div>

        {/* KART 4: Yüzde Ekleme (Zam / KDV) */}
        <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/70">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400">
                <Plus className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Yüzde Ekleme (Zam / KDV)
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Bir tutara yüzde oranında artış veya KDV ekler.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500">Tutar:</label>
                <input
                  type="number"
                  value={c4A}
                  onChange={(e) => setC4A(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-500">Eklenecek Yüzde (%):</label>
                <input
                  type="number"
                  value={c4B}
                  onChange={(e) => setC4B(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="mt-2.5 flex gap-1.5">
              {["1", "10", "20", "25"].map((p) => (
                <button
                  key={p}
                  onClick={() => setC4B(p)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-300"
                >
                  +%{p}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4 dark:border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400">Yeni Toplam (+{formatNumber(addedVal4)}):</p>
                <p className="text-xl font-black text-cyan-600 dark:text-cyan-400">
                  {formatNumber(total4)}
                </p>
              </div>
              <button
                onClick={() => handleCopy(total4.toString(), "c4")}
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
              >
                {copiedKey === "c4" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === "c4" ? "Kopyalandı" : "Kopyala"}</span>
              </button>
            </div>
            <p className="mt-1 text-[10px] text-slate-400 font-mono">
              Eklenen: {formatNumber(addedVal4)} • Toplam: {formatNumber(total4)}
            </p>
          </div>
        </div>
      </div>

      {/* KART 5: Yüzde Çıkarma (İskonto / İndirim) - Tam Genişlik */}
      <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/70">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                <Minus className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Yüzde Çıkarma (İskonto & İndirimli Fiyat)
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Etiket fiyatından yüzde indirim düştükten sonra ödenecek nihai tutarı hesaplar.
            </p>
          </div>

          <div className="flex gap-2">
            {["10", "15", "25", "30", "50"].map((p) => (
              <button
                key={p}
                onClick={() => setC5B(p)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-200"
              >
                -%{p}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-[11px] font-semibold text-slate-500">Etiket Fiyatı (TL / Döviz):</label>
            <input
              type="number"
              value={c5A}
              onChange={(e) => setC5A(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-500">İndirim Oranı (%):</label>
            <input
              type="number"
              value={c5B}
              onChange={(e) => setC5B(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-white/5">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[10px] text-slate-400">Yapılan İndirim Tutarı:</p>
              <p className="text-base font-bold text-rose-500">
                - {formatNumber(discountVal5)}
              </p>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-white/10" />
            <div>
              <p className="text-[10px] text-slate-400">Ödenecek İndirimli Fiyat:</p>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {formatNumber(total5)}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleCopy(total5.toString(), "c5")}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            {copiedKey === "c5" ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedKey === "c5" ? "Kopyalandı" : "Fiyatı Kopyala"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
