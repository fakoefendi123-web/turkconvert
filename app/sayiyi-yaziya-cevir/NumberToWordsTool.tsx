"use client";

import { useState, useMemo } from "react";
import { Type, Copy, Check, Sparkles, Receipt, FileText } from "lucide-react";

const BIRLER = ["", "Bir", "İki", "Üç", "Dört", "Beş", "Altı", "Yedi", "Sekiz", "Dokuz"];
const ONLAR = ["", "On", "Yirmi", "Otuz", "Kırk", "Elli", "Altmış", "Yetmiş", "Seksen", "Doksan"];
const BASAMAKLAR = ["", "Bin", "Milyon", "Milyar", "Trilyon", "Katrilyon"];

function threeDigitsToWords(n: number): string {
  let str = "";
  const yuzler = Math.floor(n / 100);
  const onlar = Math.floor((n % 100) / 10);
  const birler = n % 10;

  if (yuzler > 0) {
    str += (yuzler === 1 ? "" : BIRLER[yuzler] + " ") + "Yüz ";
  }
  if (onlar > 0) {
    str += ONLAR[onlar] + " ";
  }
  if (birler > 0) {
    str += BIRLER[birler] + " ";
  }

  return str.trim();
}

function parseTurkishNumber(input: string): { isNegative: boolean; tamStr: string; kesirStr: string } {
  let s = input.trim();
  const isNegative = s.startsWith("-");
  if (isNegative) s = s.substring(1).trim();

  s = s.replace(/\s+/g, "");

  const lastComma = s.lastIndexOf(",");
  const lastDot = s.lastIndexOf(".");

  let tamStr = "0";
  let kesirStr = "";

  if (lastComma !== -1 && lastDot !== -1) {
    if (lastComma > lastDot) {
      tamStr = s.substring(0, lastComma).replace(/\./g, "");
      kesirStr = s.substring(lastComma + 1);
    } else {
      tamStr = s.substring(0, lastDot).replace(/,/g, "");
      kesirStr = s.substring(lastDot + 1);
    }
  } else if (lastComma !== -1) {
    tamStr = s.substring(0, lastComma);
    kesirStr = s.substring(lastComma + 1);
  } else if (lastDot !== -1) {
    const afterDot = s.substring(lastDot + 1);
    if (afterDot.length <= 2) {
      tamStr = s.substring(0, lastDot);
      kesirStr = afterDot;
    } else {
      tamStr = s.replace(/\./g, "");
    }
  } else {
    tamStr = s;
  }

  tamStr = tamStr.replace(/[^0-9]/g, "") || "0";
  kesirStr = kesirStr.replace(/[^0-9]/g, "");

  return { isNegative, tamStr, kesirStr };
}

function numberToTurkishWords(numStr: string): { tamKisimYazi: string; kesirKisimYazi: string; isNegative: boolean } {
  const { isNegative, tamStr, kesirStr } = parseTurkishNumber(numStr);

  let tam: bigint;
  try {
    tam = BigInt(tamStr || "0");
  } catch {
    tam = BigInt(0);
  }

  let words = "";
  if (tam === BigInt(0)) {
    words = "Sıfır";
  } else {
    const groups: number[] = [];
    let temp = tam;
    const zeroBig = BigInt(0);
    const thousandBig = BigInt(1000);
    while (temp > zeroBig) {
      groups.push(Number(temp % thousandBig));
      temp = temp / thousandBig;
    }

    for (let i = groups.length - 1; i >= 0; i--) {
      const val = groups[i];
      if (val === 0) continue;

      if (i === 1 && val === 1) {
        words += "Bin ";
      } else {
        const gWords = threeDigitsToWords(val);
        if (gWords) {
          words += gWords + " " + BASAMAKLAR[i] + " ";
        }
      }
    }
    words = words.trim();
  }

  let kesirYazi = "";
  if (kesirStr) {
    const kVal = parseInt(kesirStr.substring(0, 2).padEnd(2, "0"), 10);
    if (kVal > 0) {
      kesirYazi = threeDigitsToWords(kVal);
    }
  }

  return { tamKisimYazi: words, kesirKisimYazi: kesirYazi.trim(), isNegative };
}

export default function NumberToWordsTool() {
  const [inputVal, setInputVal] = useState<string>("12500,50");
  const [currency, setCurrency] = useState<"TL" | "USD" | "EUR" | "NONE">("TL");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const { tamKisimYazi, kesirKisimYazi, isNegative } = useMemo(() => {
    return numberToTurkishWords(inputVal);
  }, [inputVal]);

  // Fatura / Çek Resmi Formatı
  const invoiceFormat = useMemo(() => {
    if (!tamKisimYazi) return "";
    const prefix = isNegative ? "Eksi" : "";
    const cleanTam = tamKisimYazi.replace(/\s+/g, "");
    const cleanKesir = kesirKisimYazi.replace(/\s+/g, "");

    if (currency === "TL") {
      if (cleanTam === "Sıfır" && cleanKesir) {
        return `#${prefix}${cleanKesir}Kr#`;
      }
      return `#${prefix}${cleanTam}TL${cleanKesir ? cleanKesir + "Kr" : ""}#`;
    } else if (currency === "USD") {
      if (cleanTam === "Sıfır" && cleanKesir) {
        return `#${prefix}${cleanKesir}Cent#`;
      }
      return `#${prefix}${cleanTam}USD${cleanKesir ? cleanKesir + "Cent" : ""}#`;
    } else if (currency === "EUR") {
      if (cleanTam === "Sıfır" && cleanKesir) {
        return `#${prefix}${cleanKesir}Cent#`;
      }
      return `#${prefix}${cleanTam}EUR${cleanKesir ? cleanKesir + "Cent" : ""}#`;
    }
    return `#${prefix}${cleanTam}${cleanKesir ? "Virgül" + cleanKesir : ""}#`;
  }, [tamKisimYazi, kesirKisimYazi, isNegative, currency]);

  // Normal Okunuş
  const formalText = useMemo(() => {
    if (!tamKisimYazi) return "";
    const prefix = isNegative ? "Eksi " : "";
    let res = "";

    if (currency === "TL") {
      if (tamKisimYazi === "Sıfır" && kesirKisimYazi) {
        res = `Yalnızca ${prefix}${kesirKisimYazi} Kuruş`;
      } else {
        res = `Yalnızca ${prefix}${tamKisimYazi} Türk Lirası`;
        if (kesirKisimYazi) res += ` ${kesirKisimYazi} Kuruş`;
      }
    } else if (currency === "USD") {
      if (tamKisimYazi === "Sıfır" && kesirKisimYazi) {
        res = `Yalnızca ${prefix}${kesirKisimYazi} Cent`;
      } else {
        res = `Yalnızca ${prefix}${tamKisimYazi} Dolar`;
        if (kesirKisimYazi) res += ` ${kesirKisimYazi} Cent`;
      }
    } else if (currency === "EUR") {
      if (tamKisimYazi === "Sıfır" && kesirKisimYazi) {
        res = `Yalnızca ${prefix}${kesirKisimYazi} Cent`;
      } else {
        res = `Yalnızca ${prefix}${tamKisimYazi} Euro`;
        if (kesirKisimYazi) res += ` ${kesirKisimYazi} Cent`;
      }
    } else {
      res = `${prefix}${tamKisimYazi}`;
      if (kesirKisimYazi) res += ` virgül ${kesirKisimYazi}`;
      return res;
    }
    return res + "tur.";
  }, [tamKisimYazi, kesirKisimYazi, isNegative, currency]);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
            Sayı veya Para Tutarını Girin:
          </label>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Örn: 14500,75"
            className="w-full px-4 py-3.5 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-xl font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Para Birimi Seçimi */}
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
            Format / Para Birimi:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: "TL", label: "Türk Lirası (₺)" },
              { id: "USD", label: "Amerikan Doları ($)" },
              { id: "EUR", label: "Euro (€)" },
              { id: "NONE", label: "Sadece Sayı" },
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCurrency(c.id as any)}
                className={`py-2 px-3 rounded-xl border-2 text-xs font-bold transition-all ${
                  currency === c.id
                    ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                    : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sonuç Kartları */}
        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          {/* Fatura / Çek Formatı */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/50">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5" /> Çek / Senet & Fatura Formatı (Bitişik & Güvenli):
              </span>
              <button
                type="button"
                onClick={() => copy(invoiceFormat, "invoice")}
                className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                {copiedKey === "invoice" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === "invoice" ? "Kopyalandı" : "Kopyala"}
              </button>
            </div>
            <p className="text-base font-mono font-bold text-gray-900 dark:text-white break-all">
              {invoiceFormat}
            </p>
          </div>

          {/* Resmi Dilekçe / Cümle Formatı */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Resmi Yazışma & Dilekçe Formatı:
              </span>
              <button
                type="button"
                onClick={() => copy(formalText, "formal")}
                className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 font-bold hover:underline"
              >
                {copiedKey === "formal" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedKey === "formal" ? "Kopyalandı" : "Kopyala"}
              </button>
            </div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
              {formalText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
