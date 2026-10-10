"use client";

import { useState, useMemo } from "react";
import { Calculator, Copy, Check, Sparkles, Percent, RotateCcw } from "lucide-react";

export default function KdvCalculatorTool() {
  const [amount, setAmount] = useState<string>("1000");
  const [kdvRate, setKdvRate] = useState<number>(20);
  const [calculationMode, setCalculationMode] = useState<"haric" | "dahil">("haric");
  const [tevkifatRate, setTevkifatRate] = useState<string>("none");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parsedAmount = parseFloat(amount.replace(",", ".")) || 0;

  const results = useMemo(() => {
    let matrah = 0;
    let kdvAmount = 0;
    let total = 0;

    if (calculationMode === "haric") {
      matrah = parsedAmount;
      kdvAmount = (matrah * kdvRate) / 100;
      total = matrah + kdvAmount;
    } else {
      total = parsedAmount;
      matrah = total / (1 + kdvRate / 100);
      kdvAmount = total - matrah;
    }

    let tevkifatAmount = 0;
    if (tevkifatRate !== "none") {
      const [pay, payda] = tevkifatRate.split("/").map(Number);
      if (pay && payda) {
        tevkifatAmount = (kdvAmount * pay) / payda;
      }
    }

    const tahsilEdilecekKdv = kdvAmount - tevkifatAmount;
    const odenecekTutar = matrah + tahsilEdilecekKdv;

    return {
      matrah,
      kdvAmount,
      total,
      tevkifatAmount,
      tahsilEdilecekKdv,
      odenecekTutar,
    };
  }, [parsedAmount, kdvRate, calculationMode, tevkifatRate]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val) + " ₺";
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
          <Calculator className="w-3.5 h-3.5" /> 2026 Güncel Vergi Oranları & Tevkifat
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          KDV & Tevkifat Hesaplayıcı
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          KDV dahil veya hariç tutarları, tevkifat kesintilerini saniyeler içinde hatasız ve pratik şekilde hesaplayın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Giriş Formu */}
        <div className="lg:col-span-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-5">
          {/* Hesaplama Modu */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
              Hesaplama Yönü:
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
              <button
                type="button"
                onClick={() => setCalculationMode("haric")}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  calculationMode === "haric"
                    ? "bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                KDV Hariçten ➡️ Dahile
              </button>
              <button
                type="button"
                onClick={() => setCalculationMode("dahil")}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  calculationMode === "dahil"
                    ? "bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                KDV Dahilden ➡️ Hariçe
              </button>
            </div>
          </div>

          {/* Tutar */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              {calculationMode === "haric" ? "KDV Hariç Tutar (Matrah):" : "KDV Dahil Toplam Tutar:"}
            </label>
            <div className="relative">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-4 pr-10 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="absolute right-4 top-3.5 text-gray-400 font-bold">₺</span>
            </div>
          </div>

          {/* KDV Oranı */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
              KDV Oranı:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 10, 20].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setKdvRate(rate)}
                  className={`py-2.5 rounded-xl border-2 text-xs font-bold transition-all ${
                    kdvRate === rate
                      ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                      : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300"
                  }`}
                >
                  %{rate}
                </button>
              ))}
            </div>
          </div>

          {/* Tevkifat Oranı */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Tevkifat Oranı (Opsiyonel):
            </label>
            <select
              value={tevkifatRate}
              onChange={(e) => setTevkifatRate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="none">Tevkifat Yok</option>
              <option value="2/10">2/10 Tevkifat</option>
              <option value="3/10">3/10 Tevkifat</option>
              <option value="4/10">4/10 Tevkifat</option>
              <option value="5/10">5/10 Tevkifat (Yarı Yarıya)</option>
              <option value="7/10">7/10 Tevkifat</option>
              <option value="9/10">9/10 Tevkifat</option>
              <option value="10/10">Tam Tevkifat (10/10)</option>
            </select>
          </div>
        </div>

        {/* Sonuç Özeti Kartı */}
        <div className="lg:col-span-6 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-200/60 dark:border-emerald-900/40 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Percent className="w-4 h-4 text-emerald-600" /> Hesaplama Sonucu
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800">
                <span className="text-xs text-gray-500">KDV Matrahı (Net):</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {formatCurrency(results.matrah)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(results.matrah.toFixed(2), "matrah")}
                    className="text-gray-400 hover:text-emerald-600"
                  >
                    {copiedKey === "matrah" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800">
                <span className="text-xs text-gray-500">Hesaplanan KDV (%{kdvRate}):</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(results.kdvAmount)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(results.kdvAmount.toFixed(2), "kdv")}
                    className="text-gray-400 hover:text-emerald-600"
                  >
                    {copiedKey === "kdv" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {results.tevkifatAmount > 0 && (
                <>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800">
                    <span className="text-xs text-rose-500">Tevkif Edilen KDV ({tevkifatRate}):</span>
                    <span className="text-sm font-bold text-rose-600">
                      -{formatCurrency(results.tevkifatAmount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800">
                    <span className="text-xs text-gray-500">Tahsil Edilecek KDV:</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {formatCurrency(results.tahsilEdilecekKdv)}
                    </span>
                  </div>
                </>
              )}

              <div className="p-4 rounded-2xl bg-emerald-600 text-white flex items-center justify-between shadow-md">
                <div>
                  <span className="text-xs text-emerald-100 font-medium block">
                    {tevkifatRate !== "none" ? "Ödenecek / Tahsil Tutarı:" : "KDV Dahil Genel Toplam:"}
                  </span>
                  <span className="text-xl font-extrabold tracking-tight">
                    {formatCurrency(results.odenecekTutar)}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(results.odenecekTutar.toFixed(2), "total")}
                  className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
                  title="Toplamı Kopyala"
                >
                  {copiedKey === "total" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-400 text-center">
            Resmi mevzuat oranlarına uygundur. Fatura veya serbest meslek makbuzu düzenlerken teyit amaçlı kullanabilirsiniz.
          </div>
        </div>
      </div>
    </div>
  );
}
