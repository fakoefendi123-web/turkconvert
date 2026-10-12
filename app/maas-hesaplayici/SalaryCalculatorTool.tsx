"use client";

import { useState, useMemo } from "react";
import {
  Calculator,
  ArrowRightLeft,
  Copy,
  Check,
  Building2,
  TrendingDown,
  ShieldCheck,
  Calendar,
  Wallet,
  Receipt,
  Printer,
  ChevronRight,
  Info,
} from "lucide-react";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";

// 2026 Gelir Vergisi Dilimleri
const TAX_SLICES_2026 = [
  { limit: 158000, rate: 0.15 },
  { limit: 330000, rate: 0.20 },
  { limit: 800000, rate: 0.27 },
  { limit: 3000000, rate: 0.35 },
  { limit: Infinity, rate: 0.40 },
];

// 2026 Asgari Ücret Parametreleri (Tahmini / Yasal Baz)
const ASGARI_UCRET_BRUT_2026 = 26000; // 2026 tahmini / baz brüt asgari ücret
const SGK_TAVAN_2026 = ASGARI_UCRET_BRUT_2026 * 7.5;

const MONTH_NAMES = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

function calculateTaxFromSlices(prevCumMatrah: number, monthMatrah: number) {
  let remainingMatrah = monthMatrah;
  let currentCum = prevCumMatrah;
  let tax = 0;

  let sliceStart = 0;
  for (let i = 0; i < TAX_SLICES_2026.length; i++) {
    const slice = TAX_SLICES_2026[i];
    const sliceEnd = slice.limit;

    if (currentCum < sliceEnd) {
      const roomInSlice = sliceEnd - currentCum;
      const taxableInSlice = Math.min(remainingMatrah, roomInSlice);

      tax += taxableInSlice * slice.rate;
      remainingMatrah -= taxableInSlice;
      currentCum += taxableInSlice;

      if (remainingMatrah <= 0) break;
    }
    sliceStart = sliceEnd;
  }

  return tax;
}

interface MonthDetail {
  month: string;
  brut: number;
  sgkIsci: number;
  issizlikIsci: number;
  gelirVergisiMatrahi: number;
  kumulatifMatrah: number;
  gelirVergisi: number;
  damgaVergisi: number;
  asgariUcretGvIstisnasi: number;
  asgariUcretDvIstisnasi: number;
  odenecekGv: number;
  odenecekDv: number;
  kesintilerToplami: number;
  net: number;
  taxSliceRate: number;
  isverenMaliyeti: number;
}

function calculateSingleMonthFromBrut(
  brut: number,
  prevCumMatrah: number,
  prevAsgariCumMatrah: number,
  isRetired: boolean = false
): { detail: MonthDetail; nextCumMatrah: number; nextAsgariCumMatrah: number } {
  // SGK Tavan Kontrolü
  const sgkMatrah = Math.min(brut, SGK_TAVAN_2026);

  // SGK İşçi Payı (%14 normal, %7.5 emekli)
  const sgkIsciRate = isRetired ? 0.075 : 0.14;
  const issizlikIsciRate = isRetired ? 0.0 : 0.01;

  const sgkIsci = sgkMatrah * sgkIsciRate;
  const issizlikIsci = sgkMatrah * issizlikIsciRate;

  // Gelir Vergisi Matrahı
  const gvMatrah = brut - (sgkIsci + issizlikIsci);
  const nextCumMatrah = prevCumMatrah + gvMatrah;

  // Ham Gelir Vergisi
  const rawGv = calculateTaxFromSlices(prevCumMatrah, gvMatrah);

  // Asgari Ücret İstisnası
  const asgariSgkIsci = ASGARI_UCRET_BRUT_2026 * 0.14;
  const asgariIssizlikIsci = ASGARI_UCRET_BRUT_2026 * 0.01;
  const asgariGvMatrah = ASGARI_UCRET_BRUT_2026 - (asgariSgkIsci + asgariIssizlikIsci);
  const nextAsgariCumMatrah = prevAsgariCumMatrah + asgariGvMatrah;
  const asgariGvIstisna = calculateTaxFromSlices(prevAsgariCumMatrah, asgariGvMatrah);
  const asgariDvIstisna = ASGARI_UCRET_BRUT_2026 * 0.00759;

  // Damga Vergisi (%0.759)
  const rawDv = brut * 0.00759;

  // Ödenecek Vergiler
  const odenecekGv = Math.max(0, rawGv - asgariGvIstisna);
  const odenecekDv = Math.max(0, rawDv - asgariDvIstisna);

  // Toplam Kesinti ve Net
  const kesintilerToplami = sgkIsci + issizlikIsci + odenecekGv + odenecekDv;
  const net = brut - kesintilerToplami;

  // Hangi dilimde olduğunu tespit et
  let activeSliceRate = 0.15;
  for (const sl of TAX_SLICES_2026) {
    if (nextCumMatrah <= sl.limit) {
      activeSliceRate = sl.rate;
      break;
    }
  }

  // İşveren Maliyeti (SGK İşveren %15.5 veya %20.5 + İşsizlik %2)
  const sgkIsveren = sgkMatrah * (isRetired ? 0.245 : 0.175);
  const issizlikIsveren = isRetired ? 0 : sgkMatrah * 0.02;
  const isverenMaliyeti = brut + sgkIsveren + issizlikIsveren;

  return {
    detail: {
      month: "",
      brut,
      sgkIsci,
      issizlikIsci,
      gelirVergisiMatrahi: gvMatrah,
      kumulatifMatrah: nextCumMatrah,
      gelirVergisi: rawGv,
      damgaVergisi: rawDv,
      asgariUcretGvIstisnasi: asgariGvIstisna,
      asgariUcretDvIstisnasi: asgariDvIstisna,
      odenecekGv,
      odenecekDv,
      kesintilerToplami,
      net,
      taxSliceRate: activeSliceRate,
      isverenMaliyeti,
    },
    nextCumMatrah,
    nextAsgariCumMatrah,
  };
}

// 12 Aylık Bordro Hesaplama
function calculateAnnualPayrollFromBrut(brut: number, isRetired: boolean = false) {
  const months: MonthDetail[] = [];
  let cumMatrah = 0;
  let cumAsgariMatrah = 0;

  for (let i = 0; i < 12; i++) {
    const { detail, nextCumMatrah, nextAsgariCumMatrah } = calculateSingleMonthFromBrut(
      brut,
      cumMatrah,
      cumAsgariMatrah,
      isRetired
    );
    detail.month = MONTH_NAMES[i];
    months.push(detail);
    cumMatrah = nextCumMatrah;
    cumAsgariMatrah = nextAsgariCumMatrah;
  }

  return months;
}

// Net'ten Brüt'e Binary Solver (0.01 TL hassasiyet)
function solveBrutFromFirstMonthNet(targetNet: number, isRetired: boolean = false) {
  if (targetNet <= 0) return 0;

  let low = targetNet;
  let high = targetNet * 2.5;

  for (let iter = 0; iter < 45; iter++) {
    const mid = (low + high) / 2;
    const { detail } = calculateSingleMonthFromBrut(mid, 0, 0, isRetired);

    if (Math.abs(detail.net - targetNet) < 0.01) {
      return mid;
    }

    if (detail.net < targetNet) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return (low + high) / 2;
}

function formatTL(num: number) {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num) + " ₺";
}

export default function SalaryCalculatorTool() {
  const [calculationType, setCalculationType] = useState<"brut-to-net" | "net-to-brut">("brut-to-net");
  const [amountInput, setAmountInput] = useState<string>("50000");
  const [isRetired, setIsRetired] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const parsedAmount = useMemo(() => {
    const clean = amountInput.replace(/\s+/g, "").replace(/\./g, "").replace(",", ".");
    const val = parseFloat(clean);
    return isNaN(val) || val <= 0 ? 0 : val;
  }, [amountInput]);

  const effectiveBrut = useMemo(() => {
    if (calculationType === "brut-to-net") {
      return parsedAmount;
    } else {
      return solveBrutFromFirstMonthNet(parsedAmount, isRetired);
    }
  }, [calculationType, parsedAmount, isRetired]);

  const annualPayroll = useMemo(() => {
    return calculateAnnualPayrollFromBrut(effectiveBrut, isRetired);
  }, [effectiveBrut, isRetired]);

  const firstMonth = annualPayroll[0] || null;
  const avgNet = useMemo(() => {
    if (!annualPayroll.length) return 0;
    const sum = annualPayroll.reduce((acc, m) => acc + m.net, 0);
    return sum / annualPayroll.length;
  }, [annualPayroll]);

  const handleCopySummary = () => {
    if (!firstMonth) return;
    const text = `TurkConvert 2026 Maaş Bordrosu Özeti:
Brüt Maaş: ${formatTL(firstMonth.brut)}
İlk Ay Net Maaş: ${formatTL(firstMonth.net)}
Yıllık Ortalama Net: ${formatTL(avgNet)}
SGK İşçi Primi: ${formatTL(firstMonth.sgkIsci)}
İşsizlik Primi: ${formatTL(firstMonth.issizlikIsci)}
Ödenecek Gelir Vergisi: ${formatTL(firstMonth.odenecekGv)}
Ödenecek Damga Vergisi: ${formatTL(firstMonth.odenecekDv)}
Toplam İşveren Maliyeti: ${formatTL(firstMonth.isverenMaliyeti)}
Hesaplandı: https://turkconvert.online/maas-hesaplayici`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      toolId="maas-hesaplayici"
      title="2026 Net-Brüt Maaş ve Bordro Hesaplayıcı"
      description="2026 güncel vergi dilimleri, SGK ve asgari ücret istisnasıyla Brüt'ten Net'e ve Net'ten Brüt'e maaşınızı ve 12 aylık bordro dökümünüzü anında hesaplayın."
    >
      <div className="space-y-8">
        {/* Kontrol ve Giriş Kartı */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/60">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Hesaplama Türü Seçici */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Hesaplama Yönü
              </label>
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1 dark:bg-obsidian-850">
                <button
                  type="button"
                  onClick={() => setCalculationType("brut-to-net")}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition-all ${
                    calculationType === "brut-to-net"
                      ? "bg-white text-slate-900 shadow-sm dark:bg-primary-600 dark:text-white"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  <span>Brüt &rarr; Net</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCalculationType("net-to-brut")}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition-all ${
                    calculationType === "net-to-brut"
                      ? "bg-white text-slate-900 shadow-sm dark:bg-primary-600 dark:text-white"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  <span>Net &rarr; Brüt</span>
                </button>
              </div>
            </div>

            {/* Tutar Girişi */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {calculationType === "brut-to-net" ? "Aylık Brüt Maaş (TL)" : "Aylık Hedef Net Maaş (TL)"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  placeholder="50.000"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base font-bold text-slate-900 shadow-xs transition-colors focus:border-primary-500 focus:outline-hidden dark:border-white/10 dark:bg-obsidian-850 dark:text-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                  ₺
                </span>
              </div>
            </div>
          </div>

          {/* Hızlı Ön Ayarlar & Çalışan Tipi */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-slate-400">Hızlı Tutarlar:</span>
              {[30000, 45000, 60000, 85000, 120000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmountInput(amt.toString())}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-primary-400 hover:bg-white dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-300 dark:hover:bg-obsidian-800"
                >
                  {amt.toLocaleString("tr-TR")} ₺
                </button>
              ))}
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={isRetired}
                onChange={(e) => setIsRetired(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 dark:border-slate-700"
              />
              <span>Emekli Çalışan (SGDP %7.5)</span>
            </label>
          </div>
        </div>

        {/* Özet Gösterge Kartları */}
        {firstMonth && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 p-5 backdrop-blur-md dark:border-white/10 dark:from-obsidian-900/80 dark:to-obsidian-950/80">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                <span>İlk Ay Net Maaş</span>
                <Wallet className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="mt-2 text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {formatTL(firstMonth.net)}
              </p>
              <p className="mt-1 text-[11px] text-slate-400">Ocak ayı net elinize geçen tutar</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 p-5 backdrop-blur-md dark:border-white/10 dark:from-obsidian-900/80 dark:to-obsidian-950/80">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                <span>Yıllık Ortalama Net</span>
                <TrendingDown className="h-4 w-4 text-primary-500" />
              </div>
              <p className="mt-2 text-2xl font-black text-primary-600 dark:text-primary-400">
                {formatTL(avgNet)}
              </p>
              <p className="mt-1 text-[11px] text-slate-400">12 ayın vergi dilimleri sonrası ortalaması</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 p-5 backdrop-blur-md dark:border-white/10 dark:from-obsidian-900/80 dark:to-obsidian-950/80">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                <span>Brüt Maaş</span>
                <Receipt className="h-4 w-4 text-indigo-500" />
              </div>
              <p className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                {formatTL(firstMonth.brut)}
              </p>
              <p className="mt-1 text-[11px] text-slate-400">Sözleşme / bordro brüt tutarı</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 p-5 backdrop-blur-md dark:border-white/10 dark:from-obsidian-900/80 dark:to-obsidian-950/80">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                <span>İşveren Maliyeti</span>
                <Building2 className="h-4 w-4 text-violet-500" />
              </div>
              <p className="mt-2 text-2xl font-black text-violet-600 dark:text-violet-400">
                {formatTL(firstMonth.isverenMaliyeti)}
              </p>
              <p className="mt-1 text-[11px] text-slate-400">Brüt + İşveren SGK & İşsizlik</p>
            </div>
          </div>
        )}

        {/* İlk Ay Kesinti Kalemleri & Kopyalama */}
        {firstMonth && (
          <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/60">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-white/10">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Ocak Ayı Kesinti Dağılımı
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Brüt maaşınızdan kesilen yasal kalemlerin ayrıntılı dökümü
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-200"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Kopyalandı!" : "Bordroyu Kopyala"}</span>
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-obsidian-850">
                <span className="text-xs text-slate-400">SGK İşçi Payı ({isRetired ? "%7.5" : "%14"})</span>
                <p className="mt-1 font-bold text-slate-900 dark:text-white">{formatTL(firstMonth.sgkIsci)}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-obsidian-850">
                <span className="text-xs text-slate-400">İşsizlik Sigortası ({isRetired ? "%0" : "%1"})</span>
                <p className="mt-1 font-bold text-slate-900 dark:text-white">{formatTL(firstMonth.issizlikIsci)}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-obsidian-850">
                <span className="text-xs text-slate-400">Gelir Vergisi (İstisna Sonrası)</span>
                <p className="mt-1 font-bold text-rose-600 dark:text-rose-400">{formatTL(firstMonth.odenecekGv)}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-obsidian-850">
                <span className="text-xs text-slate-400">Damga Vergisi (İstisna Sonrası)</span>
                <p className="mt-1 font-bold text-rose-600 dark:text-rose-400">{formatTL(firstMonth.odenecekDv)}</p>
              </div>
            </div>
          </div>
        )}

        {/* 12 Aylık Bordro Tablosu (Kümülatif Vergi Değişimi) */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/60">
          <div className="border-b border-slate-100 p-5 dark:border-white/10">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              12 Aylık Net Maaş ve Vergi Dilimi Değişimi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Yıl içinde kümülatif vergi matrahınız arttıkça maaşınızdaki değişim (Ocak &rarr; Aralık)
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:bg-obsidian-850 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3">Ay</th>
                  <th className="px-4 py-3">Brüt</th>
                  <th className="px-4 py-3">SGK + İşsizlik</th>
                  <th className="px-4 py-3">Küm. Matrah</th>
                  <th className="px-4 py-3">Dilim</th>
                  <th className="px-4 py-3">Gelir Vergisi</th>
                  <th className="px-4 py-3 font-bold text-slate-900 dark:text-white">Net Maaş</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {annualPayroll.map((m) => (
                  <tr
                    key={m.month}
                    className="transition-colors hover:bg-slate-50/60 dark:hover:bg-obsidian-850/50"
                  >
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                      {m.month}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {formatTL(m.brut)}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {formatTL(m.sgkIsci + m.issizlikIsci)}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {formatTL(m.kumulatifMatrah)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          m.taxSliceRate === 0.15
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : m.taxSliceRate === 0.20
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                            : m.taxSliceRate === 0.27
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                        }`}
                      >
                        %{m.taxSliceRate * 100}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-rose-600 dark:text-rose-400">
                      {formatTL(m.odenecekGv)}
                    </td>
                    <td className="px-4 py-3 text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                      {formatTL(m.net)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
