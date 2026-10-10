"use client";

import { useState, useMemo } from "react";
import { Building2, CheckCircle2, AlertCircle, Copy, Check, ShieldCheck, Sparkles } from "lucide-react";

// Türkiye Banka Kodları Eşlemesi
const TR_BANKS: Record<string, string> = {
  "00001": "Türkiye Cumhuriyet Merkez Bankası",
  "00010": "T.C. Ziraat Bankası",
  "00012": "Türkiye Halk Bankası",
  "00015": "Türkiye Vakıflar Bankası",
  "00032": "Türk Ekonomi Bankası (TEB)",
  "00046": "Akbank T.A.Ş.",
  "00059": "Şekerbank T.A.Ş.",
  "00062": "Türkiye Garanti Bankası (Garanti BBVA)",
  "00064": "Türkiye İş Bankası",
  "00067": "Yapı ve Kredi Bankası",
  "00099": "ING Bank A.Ş.",
  "00111": "QNB Finansbank (Enpara)",
  "00123": "HSBC Bank A.Ş.",
  "00134": "Denizbank A.Ş.",
  "00135": "Anadolubank A.Ş.",
  "00146": "Odea Bank A.Ş.",
  "00203": "Albaraka Türk Katılım Bankası",
  "00205": "Kuveyt Türk Katılım Bankası",
  "00206": "Türkiye Finans Katılım Bankası",
  "00209": "Ziraat Katılım Bankası",
  "00210": "Vakıf Katılım Bankası",
  "00211": "Emlak Katılım Bankası",
  "00801": "Papara Elektronik Para A.Ş.",
};

// ISO 7064 MOD 97-10 IBAN Kontrol Algoritması
function validateIbanMod97(cleanIban: string): boolean {
  if (cleanIban.length !== 26 || !cleanIban.startsWith("TR")) return false;

  // Harfleri (T=29, R=27) sona taşı: 2927
  const rearranged = cleanIban.substring(4) + "2927" + cleanIban.substring(2, 4);

  // Büyük sayı bölme işlemi için parça parça mod al
  let remainder = 0;
  for (let i = 0; i < rearranged.length; i++) {
    remainder = (remainder * 10 + parseInt(rearranged[i], 10)) % 97;
  }

  return remainder === 1;
}

export default function IbanValidatorTool() {
  const [inputIban, setInputIban] = useState<string>("TR330006100511123456789012");
  const [copied, setCopied] = useState<boolean>(false);

  // IBAN'ı temizle
  const cleanIban = useMemo(() => {
    let raw = inputIban.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (/^[0-9]/.test(raw) && !raw.startsWith("TR")) {
      raw = "TR" + raw;
    }
    return raw;
  }, [inputIban]);

  // Biçimlendirilmiş IBAN (4'erli gruplar)
  const formattedIban = useMemo(() => {
    return cleanIban.replace(/(.{4})/g, "$1 ").trim();
  }, [cleanIban]);

  // Doğrulama ve Çözümleme
  const analysis = useMemo(() => {
    if (cleanIban.length < 5) return null;

    const isValidLength = cleanIban.length === 26;
    const isValidFormat = cleanIban.startsWith("TR");
    const isModValid = isValidLength && isValidFormat && validateIbanMod97(cleanIban);

    const bankCode = cleanIban.length >= 9 ? cleanIban.substring(4, 9) : "";
    const bankName = TR_BANKS[bankCode] || (bankCode ? "Diğer / Bilinmeyen Banka" : "");
    const branchCode = cleanIban.length >= 14 ? cleanIban.substring(9, 14) : "";
    const accountNumber = cleanIban.length === 26 ? cleanIban.substring(14) : "";

    return {
      isValid: isModValid,
      isValidLength,
      bankCode,
      bankName,
      branchCode,
      accountNumber,
    };
  }, [cleanIban]);

  const copyIban = () => {
    navigator.clipboard.writeText(formattedIban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
          <Building2 className="w-3.5 h-3.5" /> ISO 7064 Algoritmik Doğrulama
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          IBAN Doğrulayıcı & Banka Bulucu
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Türkiye IBAN numarasının geçerliliğini doğrulayın, hangi banka ve hesaba ait olduğunu saniyeler içinde öğrenin.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
            IBAN Numarasını Girin veya Yapıştırın:
          </label>
          <div className="relative">
            <input
              type="text"
              value={inputIban}
              onChange={(e) => setInputIban(e.target.value)}
              placeholder="TR00 0000 0000 0000 0000 0000 00"
              maxLength={32}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-base sm:text-lg font-mono font-bold tracking-wider text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Boşluksuz veya &apos;TR&apos; olmadan yapıştırsanız bile otomatik olarak düzeltilir.
          </p>
        </div>

        {/* Sonuç Alanı */}
        {analysis && (
          <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            {/* Durum Göstergesi */}
            <div
              className={`p-4 rounded-2xl flex items-center justify-between gap-3 ${
                analysis.isValid
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                  : "bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300"
              }`}
            >
              <div className="flex items-center gap-3">
                {analysis.isValid ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
                )}
                <div>
                  <h4 className="text-sm font-bold">
                    {analysis.isValid ? "Geçerli Türkiye IBAN Numarası" : "Geçersiz veya Hatalı IBAN"}
                  </h4>
                  <p className="text-xs opacity-80">
                    {analysis.isValid
                      ? "Matematiksel Mod-97 kontrolünden başarıyla geçti."
                      : "Girdiğiniz IBAN numarası kontrol hanesi algoritmasıyla eşleşmiyor."}
                  </p>
                </div>
              </div>

              {analysis.isValid && (
                <button
                  type="button"
                  onClick={copyIban}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold shadow-sm hover:bg-gray-50 shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Kopyalandı" : "Formatlı Kopyala"}
                </button>
              )}
            </div>

            {/* Detay Kartı */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800">
                <span className="text-xs text-gray-500 block mb-0.5">Tespit Edilen Banka:</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {analysis.bankName || "—"}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800">
                <span className="text-xs text-gray-500 block mb-0.5">Banka Kodu:</span>
                <span className="text-sm font-mono font-bold text-gray-900 dark:text-white">
                  {analysis.bankCode || "—"}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800">
                <span className="text-xs text-gray-500 block mb-0.5">Hesap Numarası:</span>
                <span className="text-sm font-mono font-bold text-gray-900 dark:text-white truncate block">
                  {analysis.accountNumber || "—"}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800">
                <span className="text-xs text-gray-500 block mb-0.5">Uzunluk:</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {cleanIban.length} / 26 Karakter
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-16 text-center text-xs text-gray-400">
        <ShieldCheck className="w-4 h-4 inline mr-1 text-emerald-500" />
        IBAN sorgulamaları tarayıcınızda yerel olarak çalışır, hiçbir banka bilgisi sunucuya iletilmez veya kaydedilmez.
      </div>
    </div>
  );
}
