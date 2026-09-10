"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { jsPDF } from "jspdf";
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Building2,
  User,
  Calendar,
  DollarSign,
  Save,
  RotateCcw,
  Sparkles,
  Upload,
  Check,
} from "lucide-react";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number; // 0, 1, 10, 20
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  TRY: "₺",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const DEFAULT_ITEMS: InvoiceItem[] = [
  {
    id: "1",
    description: "Web Tasarım ve Arayüz Geliştirme Hizmeti",
    quantity: 1,
    unitPrice: 15000,
    vatRate: 20,
  },
  {
    id: "2",
    description: "SEO Optimizasyonu ve Performans İyileştirme",
    quantity: 1,
    unitPrice: 5000,
    vatRate: 20,
  },
];

export default function InvoiceGeneratorTool() {
  const [docType, setDocType] = useState<string>("Fatura");
  const [currency, setCurrency] = useState<string>("TRY");
  const [invoiceNo, setInvoiceNo] = useState<string>("TRK-2026-001");
  const [issueDate, setIssueDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState<string>(
    new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0]
  );

  // Satıcı Bilgileri
  const [sellerName, setSellerName] = useState("TurkConvert Dijital Hizmetler Ltd.");
  const [sellerAddress, setSellerAddress] = useState("Levent Mah. Teknoloji Cad. No: 42, Beşiktaş / İstanbul");
  const [sellerTax, setSellerTax] = useState("Boğaziçi V.D. - 1234567890");
  const [sellerPhone, setSellerPhone] = useState("+90 212 555 0100");
  const [sellerEmail, setSellerEmail] = useState("fatura@turkconvert.online");
  const [sellerLogo, setSellerLogo] = useState<string | null>(null);

  // Alıcı Bilgileri
  const [buyerName, setBuyerName] = useState("Örnek Müşteri A.Ş.");
  const [buyerAddress, setBuyerAddress] = useState("Büyükdere Cad. No: 18, Şişli / İstanbul");
  const [buyerTax, setBuyerTax] = useState("Mecidiyeköy V.D. - 9876543210");

  // Kalemler
  const [items, setItems] = useState<InvoiceItem[]>(DEFAULT_ITEMS);

  // Banka & Notlar
  const [bankInfo, setBankInfo] = useState("Garanti BBVA - TR12 0006 2000 0001 2345 6789 01");
  const [notes, setNotes] = useState("Ödemenin fatura tarihinden itibaren 14 gün içinde yukarıdaki IBAN numarasına yapılması rica olunur.");

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // LocalStorage'dan firma bilgilerini yükle
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tc_seller_profile");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.sellerName) setSellerName(data.sellerName);
        if (data.sellerAddress) setSellerAddress(data.sellerAddress);
        if (data.sellerTax) setSellerTax(data.sellerTax);
        if (data.sellerPhone) setSellerPhone(data.sellerPhone);
        if (data.sellerEmail) setSellerEmail(data.sellerEmail);
        if (data.bankInfo) setBankInfo(data.bankInfo);
        if (data.sellerLogo) setSellerLogo(data.sellerLogo);
      }
    } catch {
      // ignore
    }
  }, []);

  // Firma bilgilerini hatırla
  const handleSaveProfile = () => {
    try {
      const profile = {
        sellerName,
        sellerAddress,
        sellerTax,
        sellerPhone,
        sellerEmail,
        bankInfo,
        sellerLogo,
      };
      localStorage.setItem("tc_seller_profile", JSON.stringify(profile));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch {
      // ignore
    }
  };

  // Logo yükleme
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSellerLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Kalem İşlemleri
  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      vatRate: 20,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  // Hesaplamalar
  const totals = useMemo(() => {
    let subtotal = 0;
    let totalVat = 0;

    items.forEach((it) => {
      const lineTotal = it.quantity * it.unitPrice;
      const vat = lineTotal * (it.vatRate / 100);
      subtotal += lineTotal;
      totalVat += vat;
    });

    const grandTotal = subtotal + totalVat;
    return { subtotal, totalVat, grandTotal };
  }, [items]);

  const currSymbol = CURRENCY_SYMBOLS[currency] || "₺";

  const formatMoney = (amount: number) => {
    return (
      amount.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) +
      " " +
      currSymbol
    );
  };

  // PDF İndir (jsPDF ile Vektörel A4)
  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;

      // Üst Başlık & Logo
      doc.setFillColor(37, 99, 235); // Primary Blue
      doc.rect(0, 0, pageWidth, 5, "F");

      let startY = 20;

      if (sellerLogo) {
        try {
          doc.addImage(sellerLogo, "PNG", margin, startY, 30, 15);
          startY += 18;
        } catch {
          // ignore logo error
        }
      }

      // Belge Başlığı
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(30, 41, 59);
      doc.text(docType.toUpperCase(), pageWidth - margin, 25, { align: "right" });

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text(`No: ${invoiceNo}`, pageWidth - margin, 32, { align: "right" });
      doc.text(`Tarih: ${issueDate}`, pageWidth - margin, 37, { align: "right" });
      if (dueDate) {
        doc.text(`Vade: ${dueDate}`, pageWidth - margin, 42, { align: "right" });
      }

      // Satıcı Bilgileri
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text(sellerName, margin, startY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      const splitAddr = doc.splitTextToSize(sellerAddress, 80);
      doc.text(splitAddr, margin, startY + 5);
      const addrHeight = splitAddr.length * 4;
      doc.text(`Vergi: ${sellerTax}`, margin, startY + 6 + addrHeight);
      doc.text(`Tel: ${sellerPhone} | ${sellerEmail}`, margin, startY + 11 + addrHeight);

      // Alıcı Bilgileri Kutusu
      const buyerY = Math.max(startY + 20 + addrHeight, 52);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, buyerY, pageWidth - margin * 2, 26, 2, 2, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text("SAYIN / SAYIN YETKİLİ:", margin + 5, buyerY + 6);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(buyerName, margin + 5, buyerY + 12);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      doc.text(buyerAddress, margin + 5, buyerY + 17);
      doc.text(`Vergi Bilgisi: ${buyerTax}`, margin + 5, buyerY + 22);

      // Kalem Tablosu Başlığı
      let tableY = buyerY + 34;
      doc.setFillColor(30, 41, 59);
      doc.rect(margin, tableY, pageWidth - margin * 2, 8, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(255, 255, 255);
      doc.text("AÇIKLAMA", margin + 4, tableY + 5.5);
      doc.text("MİKTAR", margin + 95, tableY + 5.5, { align: "right" });
      doc.text("BİRİM FİYAT", margin + 128, tableY + 5.5, { align: "right" });
      doc.text("KDV", margin + 148, tableY + 5.5, { align: "right" });
      doc.text("TUTAR", pageWidth - margin - 4, tableY + 5.5, { align: "right" });

      tableY += 8;

      // Kalem Satırları
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      items.forEach((it, idx) => {
        const lineTotal = it.quantity * it.unitPrice;
        if (idx % 2 === 1) {
          doc.setFillColor(248, 250, 252);
          doc.rect(margin, tableY, pageWidth - margin * 2, 7.5, "F");
        }

        doc.setTextColor(15, 23, 42);
        const desc = it.description || "Hizmet / Ürün";
        doc.text(desc.length > 50 ? desc.substring(0, 50) + "..." : desc, margin + 4, tableY + 5);
        doc.text(String(it.quantity), margin + 95, tableY + 5, { align: "right" });
        doc.text(`${it.unitPrice.toLocaleString("tr-TR")} ${currSymbol}`, margin + 128, tableY + 5, { align: "right" });
        doc.text(`%${it.vatRate}`, margin + 148, tableY + 5, { align: "right" });
        doc.setFont("helvetica", "bold");
        doc.text(`${lineTotal.toLocaleString("tr-TR")} ${currSymbol}`, pageWidth - margin - 4, tableY + 5, { align: "right" });
        doc.setFont("helvetica", "normal");

        tableY += 7.5;
      });

      // Toplamlar Alanı
      tableY += 4;
      const totalBoxX = pageWidth - margin - 75;
      doc.setFontSize(9);

      doc.setTextColor(100, 116, 139);
      doc.text("Ara Toplam:", totalBoxX, tableY);
      doc.setTextColor(15, 23, 42);
      doc.text(`${totals.subtotal.toLocaleString("tr-TR")} ${currSymbol}`, pageWidth - margin - 4, tableY, { align: "right" });

      tableY += 5.5;
      doc.setTextColor(100, 116, 139);
      doc.text("Toplam KDV:", totalBoxX, tableY);
      doc.setTextColor(15, 23, 42);
      doc.text(`${totals.totalVat.toLocaleString("tr-TR")} ${currSymbol}`, pageWidth - margin - 4, tableY, { align: "right" });

      tableY += 6.5;
      doc.setFillColor(37, 99, 235);
      doc.roundedRect(totalBoxX - 4, tableY - 4.5, 79, 10, 1.5, 1.5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(255, 255, 255);
      doc.text("GENEL TOPLAM:", totalBoxX, tableY + 2.5);
      doc.text(`${totals.grandTotal.toLocaleString("tr-TR")} ${currSymbol}`, pageWidth - margin - 4, tableY + 2.5, { align: "right" });

      // Banka & Alt Notlar
      const bottomY = 245;
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, bottomY, pageWidth - margin, bottomY);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      doc.text("Banka ve Ödeme Bilgileri:", margin, bottomY + 6);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text(bankInfo, margin, bottomY + 11);

      if (notes) {
        doc.setFont("helvetica", "bold");
        doc.text("Notlar & Şartlar:", margin, bottomY + 18);
        doc.setFont("helvetica", "normal");
        const splitNotes = doc.splitTextToSize(notes, pageWidth - margin * 2);
        doc.text(splitNotes, margin, bottomY + 23);
      }

      // Footer
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text(
        "Bu belge TurkConvert Ücretsiz Belge Oluşturucu ile güvenle hazırlanmıştır.",
        pageWidth / 2,
        287,
        { align: "center" }
      );

      doc.save(`${docType.toLowerCase()}-${invoiceNo}.pdf`);
    } catch {
      alert("PDF oluşturulurken bir hata oluştu. Lütfen bilgileri kontrol edin.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Üst Eylemler & Hatırla Butonu */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-gray-500 dark:text-gray-400">
              Belge Türü
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="Fatura">Fatura</option>
              <option value="Fiyat Teklifi">Fiyat Teklifi</option>
              <option value="Proforma Fatura">Proforma Fatura</option>
              <option value="Makbuz">Makbuz / Fiş</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold text-gray-500 dark:text-gray-400">
              Para Birimi
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="TRY">₺ TRY (Türk Lirası)</option>
              <option value="USD">$ USD (Amerikan Doları)</option>
              <option value="EUR">€ EUR (Euro)</option>
              <option value="GBP">£ GBP (İngiliz Sterlini)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveProfile}
            className="btn-secondary !px-3 !py-1.5 text-xs gap-1.5"
            title="Firma bilgilerinizi tarayıcınıza kaydeder"
          >
            {savedSuccess ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Save className="h-3.5 w-3.5" />}
            <span>{savedSuccess ? "Kaydedildi!" : "Firma Bilgilerimi Hatırla"}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="btn-primary !px-4 !py-1.5 text-xs gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{isGeneratingPdf ? "Oluşturuluyor..." : "PDF İndir (A4)"}</span>
          </button>
        </div>
      </div>

      {/* Ana Form & Canlı Önizleme */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Sol Kolon: Form Bilgileri */}
        <div className="space-y-6 lg:col-span-6">
          {/* Satıcı Bilgileri */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 dark:border-gray-800">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                Satıcı / Sizin Bilgileriniz
              </h3>
              <label className="cursor-pointer text-[11px] font-medium text-primary-600 hover:underline dark:text-primary-400 flex items-center gap-1">
                <Upload className="h-3 w-3" />
                <span>{sellerLogo ? "Logoyu Değiştir" : "Logo Ekle"}</span>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              </label>
            </div>

            <div>
              <label className="mb-1 block text-[11px] text-gray-600 dark:text-gray-400">Şirket / Kişi Adı</label>
              <input
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] text-gray-600 dark:text-gray-400">Adres</label>
              <input
                type="text"
                value={sellerAddress}
                onChange={(e) => setSellerAddress(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-[11px] text-gray-600 dark:text-gray-400">Vergi Dairesi / No</label>
                <input
                  type="text"
                  value={sellerTax}
                  onChange={(e) => setSellerTax(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-gray-600 dark:text-gray-400">Telefon / E-Posta</label>
                <input
                  type="text"
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Alıcı & Fatura Detayları */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900 space-y-3">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5 border-b border-gray-100 pb-2.5 dark:border-gray-800">
              <User className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              Müşteri / Alıcı Bilgileri
            </h3>

            <div>
              <label className="mb-1 block text-[11px] text-gray-600 dark:text-gray-400">Müşteri / Firma Adı</label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] text-gray-600 dark:text-gray-400">Müşteri Adresi</label>
              <input
                type="text"
                value={buyerAddress}
                onChange={(e) => setBuyerAddress(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="mb-1 block text-[11px] text-gray-600 dark:text-gray-400">Belge No</label>
                <input
                  type="text"
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-gray-600 dark:text-gray-400">Tarih</label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-gray-600 dark:text-gray-400">Vade Tarihi</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Kalemler Tablosu */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900 space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 dark:border-gray-800">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white">
                Ürün ve Hizmet Kalemleri
              </h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="btn-secondary !px-2.5 !py-1 text-xs gap-1"
              >
                <Plus className="h-3 w-3" />
                <span>Kalem Ekle</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {items.map((it, idx) => (
                <div
                  key={it.id}
                  className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-gray-50/60 p-3 dark:border-gray-700 dark:bg-gray-800/40"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-gray-400">#{idx + 1}</span>
                    <input
                      type="text"
                      placeholder="Ürün / Hizmet Açıklaması"
                      value={it.description}
                      onChange={(e) => handleUpdateItem(it.id, "description", e.target.value)}
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-xs text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(it.id)}
                      disabled={items.length <= 1}
                      className="text-gray-400 hover:text-red-500 disabled:opacity-30"
                      title="Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] text-gray-500">Miktar</label>
                      <input
                        type="number"
                        min="1"
                        value={it.quantity}
                        onChange={(e) => handleUpdateItem(it.id, "quantity", Number(e.target.value))}
                        className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500">Birim Fiyat ({currSymbol})</label>
                      <input
                        type="number"
                        min="0"
                        value={it.unitPrice}
                        onChange={(e) => handleUpdateItem(it.id, "unitPrice", Number(e.target.value))}
                        className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-500">KDV Oranı</label>
                      <select
                        value={it.vatRate}
                        onChange={(e) => handleUpdateItem(it.id, "vatRate", Number(e.target.value))}
                        className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs dark:border-gray-600 dark:bg-gray-800"
                      >
                        <option value={0}>%0 KDV</option>
                        <option value={1}>%1 KDV</option>
                        <option value={10}>%10 KDV</option>
                        <option value={20}>%20 KDV</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Banka & Şartlar */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900 space-y-3">
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                Banka ve IBAN Bilgisi
              </label>
              <input
                type="text"
                value={bankInfo}
                onChange={(e) => setBankInfo(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                Açıklama / Fatura Notu
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Sağ Kolon: Canlı A4 Fatura Kağıdı Önizlemesi */}
        <div className="lg:col-span-6">
          <div className="sticky top-24 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Canlı A4 Fatura Önizlemesi
              </span>
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="btn-primary !px-3 !py-1 text-xs gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span>PDF İndir</span>
              </button>
            </div>

            {/* A4 Kağıt Simülasyonu */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-md text-gray-900 font-sans text-xs dark:border-gray-700">
              {/* Üst Şerit */}
              <div className="h-1.5 -mx-6 -mt-6 bg-primary-600 mb-5" />

              <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                <div>
                  {sellerLogo && (
                    <img src={sellerLogo} alt="Logo" className="mb-2 h-8 max-w-[120px] object-contain" />
                  )}
                  <h4 className="font-bold text-sm text-gray-900">{sellerName}</h4>
                  <p className="text-[11px] text-gray-500 max-w-xs">{sellerAddress}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Vergi: {sellerTax}</p>
                </div>

                <div className="text-right">
                  <span className="text-lg font-extrabold uppercase tracking-wide text-gray-900 block">
                    {docType}
                  </span>
                  <p className="font-mono text-[11px] text-gray-500">No: {invoiceNo}</p>
                  <p className="text-[10px] text-gray-400">Tarih: {issueDate}</p>
                  {dueDate && <p className="text-[10px] text-gray-400">Vade: {dueDate}</p>}
                </div>
              </div>

              {/* Alıcı */}
              <div className="my-4 rounded-lg bg-gray-50 p-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Sayın / Alıcı:
                </span>
                <p className="font-bold text-gray-900 mt-0.5">{buyerName}</p>
                <p className="text-[11px] text-gray-600">{buyerAddress}</p>
                <p className="text-[10px] text-gray-500">Vergi: {buyerTax}</p>
              </div>

              {/* Kalemler */}
              <table className="w-full my-4 text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-100/60 font-semibold text-gray-700">
                    <th className="py-1.5 px-2">Açıklama</th>
                    <th className="py-1.5 px-2 text-right">Miktar</th>
                    <th className="py-1.5 px-2 text-right">Birim Fiyat</th>
                    <th className="py-1.5 px-2 text-right">KDV</th>
                    <th className="py-1.5 px-2 text-right">Tutar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((it) => {
                    const lineTotal = it.quantity * it.unitPrice;
                    return (
                      <tr key={it.id}>
                        <td className="py-1.5 px-2 font-medium">{it.description || "Hizmet"}</td>
                        <td className="py-1.5 px-2 text-right font-mono">{it.quantity}</td>
                        <td className="py-1.5 px-2 text-right font-mono">
                          {it.unitPrice.toLocaleString("tr-TR")} {currSymbol}
                        </td>
                        <td className="py-1.5 px-2 text-right text-gray-500">%{it.vatRate}</td>
                        <td className="py-1.5 px-2 text-right font-bold font-mono">
                          {lineTotal.toLocaleString("tr-TR")} {currSymbol}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Toplamlar */}
              <div className="flex justify-end border-t border-gray-100 pt-3">
                <div className="w-48 space-y-1 text-right text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Ara Toplam:</span>
                    <span className="font-mono">{totals.subtotal.toLocaleString("tr-TR")} {currSymbol}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Toplam KDV:</span>
                    <span className="font-mono">{totals.totalVat.toLocaleString("tr-TR")} {currSymbol}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-1 font-bold text-primary-600 text-sm">
                    <span>Genel Toplam:</span>
                    <span className="font-mono">{totals.grandTotal.toLocaleString("tr-TR")} {currSymbol}</span>
                  </div>
                </div>
              </div>

              {/* Alt Bilgi */}
              <div className="mt-6 border-t border-gray-100 pt-3 text-[10px] text-gray-500 space-y-1">
                <p><strong>Banka Bilgisi:</strong> {bankInfo}</p>
                {notes && <p><strong>Not:</strong> {notes}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
