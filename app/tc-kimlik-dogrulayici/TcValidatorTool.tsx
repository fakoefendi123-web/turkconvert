"use client";

import { useState, useMemo } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  Hash,
} from "lucide-react";

interface ValidationResult {
  isValid: boolean;
  isComplete: boolean;
  lengthOk: boolean;
  firstDigitOk: boolean;
  rule10Ok: boolean;
  rule11Ok: boolean;
  calculated10: number | null;
  calculated11: number | null;
  message: string;
}

function validateTc(raw: string): ValidationResult {
  const digits = raw.replace(/\D/g, "");

  if (digits.length === 0) {
    return {
      isValid: false,
      isComplete: false,
      lengthOk: false,
      firstDigitOk: false,
      rule10Ok: false,
      rule11Ok: false,
      calculated10: null,
      calculated11: null,
      message: "Lütfen 11 haneli T.C. kimlik numaranızı girin.",
    };
  }

  const lengthOk = digits.length === 11;
  const firstDigitOk = digits[0] !== "0";

  if (!lengthOk || digits.length < 11) {
    return {
      isValid: false,
      isComplete: false,
      lengthOk: false,
      firstDigitOk,
      rule10Ok: false,
      rule11Ok: false,
      calculated10: null,
      calculated11: null,
      message: `Eksik hane: ${digits.length} / 11 hane girildi.`,
    };
  }

  const d = digits.split("").map(Number);

  // Kural 1 (10. basamak kontrolü)
  // 1, 3, 5, 7, 9. basamakların toplamı
  const oddSum = d[0] + d[2] + d[4] + d[6] + d[8];
  // 2, 4, 6, 8. basamakların toplamı
  const evenSum = d[1] + d[3] + d[5] + d[7];

  const calculated10 = ((oddSum * 7 - evenSum) % 10 + 10) % 10;
  const rule10Ok = calculated10 === d[9];

  // Kural 2 (11. basamak kontrolü)
  // İlk 10 basamağın toplamı mod 10
  const first10Sum = d.slice(0, 10).reduce((a, b) => a + b, 0);
  const calculated11 = first10Sum % 10;
  const rule11Ok = calculated11 === d[10];

  const isValid = firstDigitOk && rule10Ok && rule11Ok;

  let message = "T.C. Kimlik Numarası algoritmik olarak geçerlidir.";
  if (!firstDigitOk) {
    message = "T.C. Kimlik Numarası '0' ile başlayamaz.";
  } else if (!rule10Ok) {
    message = `10. hane uyuşmuyor: Beklenen ${calculated10}, girilen ${d[9]}.`;
  } else if (!rule11Ok) {
    message = `11. hane sağlama toplamı uyuşmuyor: Beklenen ${calculated11}, girilen ${d[10]}.`;
  }

  return {
    isValid,
    isComplete: true,
    lengthOk,
    firstDigitOk,
    rule10Ok,
    rule11Ok,
    calculated10,
    calculated11,
    message,
  };
}

// Yazılım testleri için geçerli rastgele T.C. üretici
function generateValidTc(): string {
  const d: number[] = [];
  // 1. hane 1-9 arası
  d[0] = Math.floor(Math.random() * 9) + 1;
  // 2-9. haneler 0-9 arası
  for (let i = 1; i < 9; i++) {
    d[i] = Math.floor(Math.random() * 10);
  }

  const oddSum = d[0] + d[2] + d[4] + d[6] + d[8];
  const evenSum = d[1] + d[3] + d[5] + d[7];

  // 10. hane
  d[9] = ((oddSum * 7 - evenSum) % 10 + 10) % 10;

  // 11. hane
  const first10Sum = d.reduce((a, b) => a + b, 0);
  d[10] = first10Sum % 10;

  return d.join("");
}

export default function TcValidatorTool() {
  const [tcInput, setTcInput] = useState<string>("");
  const [generatedList, setGeneratedList] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const validation = useMemo(() => validateTc(tcInput), [tcInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 11);
    setTcInput(val);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGenerate = () => {
    const list = Array.from({ length: 5 }, () => generateValidTc());
    setGeneratedList(list);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Ana Giriş Kutusu */}
      <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/70 sm:p-8">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          T.C. Kimlik Numarası (11 Hane)
        </label>

        <div className="mt-3 relative">
          <input
            type="text"
            inputMode="numeric"
            value={tcInput}
            onChange={handleInputChange}
            placeholder="Örn: 10000000146"
            className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3.5 text-xl sm:text-2xl font-mono tracking-widest text-slate-900 shadow-2xs transition focus:border-primary-500 focus:outline-hidden dark:border-white/10 dark:bg-obsidian-850 dark:text-white"
          />

          {tcInput.length > 0 && (
            <button
              onClick={() => setTcInput("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Canlı Durum Bildirimi */}
        {tcInput.length > 0 && (
          <div
            className={`mt-4 flex items-center gap-2.5 rounded-2xl border p-4 text-xs font-semibold transition ${
              validation.isValid
                ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-300"
                : validation.isComplete
                ? "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-950 dark:bg-rose-950/40 dark:text-rose-300"
                : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-950 dark:bg-amber-950/40 dark:text-amber-300"
            }`}
          >
            {validation.isValid ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            ) : validation.isComplete ? (
              <XCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            )}
            <span>{validation.message}</span>
          </div>
        )}

        {/* Hane Analiz Izgarası */}
        {tcInput.length > 0 && (
          <div className="mt-6 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Basamak Ayrıştırması:
            </span>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {tcInput.split("").map((digit, i) => {
                const is10 = i === 9;
                const is11 = i === 10;
                let bgClass = "bg-slate-100 text-slate-800 dark:bg-obsidian-850 dark:text-slate-200";
                if (is10) bgClass = "bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300";
                if (is11) bgClass = "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300";

                return (
                  <div
                    key={i}
                    className={`flex flex-col items-center justify-center rounded-xl px-2.5 py-1.5 font-mono text-xs font-bold border border-slate-200/60 dark:border-white/5 ${bgClass}`}
                  >
                    <span>{digit}</span>
                    <span className="text-[9px] font-normal text-slate-400">{i + 1}.</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Kural Kontrol Listesi */}
        {tcInput.length === 11 && (
          <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-5 dark:border-white/5">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Resmi Algoritma Kural Sağlaması:
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 dark:border-white/5 dark:bg-obsidian-850/60">
                <span className="text-slate-600 dark:text-slate-300">
                  1. İlk basamak 0 olamaz
                </span>
                {validation.firstDigitOk ? (
                  <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> Geçerli
                  </span>
                ) : (
                  <span className="flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400">
                    <XCircle className="h-4 w-4" /> Hatalı (0 ile başladı)
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 dark:border-white/5 dark:bg-obsidian-850/60">
                <span className="text-slate-600 dark:text-slate-300">
                  2. 10. Hane Kuralı: ((Tekler × 7) - Çiftler) mod 10
                </span>
                {validation.rule10Ok ? (
                  <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> Doğru ({validation.calculated10})
                  </span>
                ) : (
                  <span className="flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400">
                    <XCircle className="h-4 w-4" /> Beklenen: {validation.calculated10}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 dark:border-white/5 dark:bg-obsidian-850/60">
                <span className="text-slate-600 dark:text-slate-300">
                  3. 11. Hane Kuralı: (İlk 10 Basamak Toplamı) mod 10
                </span>
                {validation.rule11Ok ? (
                  <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> Doğru ({validation.calculated11})
                  </span>
                ) : (
                  <span className="flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400">
                    <XCircle className="h-4 w-4" /> Beklenen: {validation.calculated11}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Yazılım Testleri İçin Geçerli Test TC Üretici */}
      <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-900/70">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Yazılım & Test İçin Geçerli T.C. Üretici
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Form validasyonlarınızı test etmek için algoritmik olarak geçerli rastgele test numaraları üretin.
            </p>
          </div>

          <button
            onClick={handleGenerate}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Test Numarası Üret</span>
          </button>
        </div>

        {generatedList.length > 0 && (
          <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 dark:border-white/5">
            <span className="text-[11px] font-semibold text-slate-400">
              Üretilen Geçerli Test Numaraları (Tıklayarak Kopyalayın):
            </span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {generatedList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    handleCopy(item, `gen-${idx}`);
                    setTcInput(item);
                  }}
                  className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 font-mono text-xs font-bold text-slate-800 transition hover:border-primary-400 hover:bg-white dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-200"
                >
                  <span>{item}</span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {copiedId === `gen-${idx}` ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-600">Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Kopyala & Test Et</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Güvenlik Hatırlatması */}
      <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        <span>
          %100 İstemci Taraflı: Girdiğiniz hiçbir kimlik numarası sunucuya gönderilmez veya kaydedilmez.
        </span>
      </div>
    </div>
  );
}
