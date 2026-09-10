"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import QRCode from "qrcode";
import {
  QrCode as QrCodeIcon,
  Download,
  AlertCircle,
  Wifi,
  Globe,
  MessageSquare,
  Contact,
  Mail,
  Type,
  Sparkles,
  Upload,
  Palette,
  Check,
} from "lucide-react";

type QrType = "url" | "wifi" | "whatsapp" | "vcard" | "email" | "text";

const COLOR_PRESETS = [
  { label: "Siyah", dark: "#111827", light: "#ffffff" },
  { label: "Mavi", dark: "#2563EB", light: "#ffffff" },
  { label: "Lacivert", dark: "#1E3A8A", light: "#ffffff" },
  { label: "Zümrüt", dark: "#059669", light: "#ffffff" },
  { label: "Mor", dark: "#7C3AED", light: "#ffffff" },
  { label: "Kırmızı", dark: "#DC2626", light: "#ffffff" },
];

export function QrCodeGeneratorTool() {
  const [activeType, setActiveType] = useState<QrType>("url");

  // Inputs
  const [url, setUrl] = useState("https://turkconvert.online");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);

  const [waPhone, setWaPhone] = useState("");
  const [waMessage, setWaMessage] = useState("");

  const [vcardFirstName, setVcardFirstName] = useState("");
  const [vcardLastName, setVcardLastName] = useState("");
  const [vcardPhone, setVcardPhone] = useState("");
  const [vcardEmail, setVcardEmail] = useState("");
  const [vcardOrg, setVcardOrg] = useState("");

  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const [rawText, setRawText] = useState("");

  // Styling
  const [darkColor, setDarkColor] = useState("#111827");
  const [lightColor, setLightColor] = useState("#ffffff");
  const [isTransparentBg, setIsTransparentBg] = useState(false);
  const [useGradient, setUseGradient] = useState(false);
  const [gradientColor2, setGradientColor2] = useState("#2563EB");
  const [qrSize, setQrSize] = useState(600); // 300 to 1200
  const [centerLogo, setCenterLogo] = useState<string | null>(null);
  const [centerLogoType, setCenterLogoType] = useState<"none" | "wifi" | "wa" | "custom">("none");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  // Stringify content
  const getEncodedText = useCallback((): string => {
    switch (activeType) {
      case "url":
        return url.trim();
      case "wifi": {
        const ssid = wifiSsid.trim();
        const pass = wifiPassword.trim();
        return `WIFI:T:${wifiEncryption};S:${ssid};P:${pass};H:${wifiHidden ? "true" : "false"};;`;
      }
      case "whatsapp": {
        const cleanPhone = waPhone.replace(/[^\d]/g, "");
        const encodedMsg = encodeURIComponent(waMessage.trim());
        return `https://wa.me/${cleanPhone}${encodedMsg ? `?text=${encodedMsg}` : ""}`;
      }
      case "vcard": {
        return [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `N:${vcardLastName.trim()};${vcardFirstName.trim()}`,
          `FN:${vcardFirstName.trim()} ${vcardLastName.trim()}`.trim(),
          vcardOrg.trim() ? `ORG:${vcardOrg.trim()}` : "",
          vcardPhone.trim() ? `TEL:${vcardPhone.trim()}` : "",
          vcardEmail.trim() ? `EMAIL:${vcardEmail.trim()}` : "",
          "END:VCARD",
        ]
          .filter(Boolean)
          .join("\n");
      }
      case "email": {
        const to = emailTo.trim();
        const subj = encodeURIComponent(emailSubject.trim());
        const body = encodeURIComponent(emailBody.trim());
        return `mailto:${to}?subject=${subj}&body=${body}`;
      }
      case "text":
        return rawText;
      default:
        return "";
    }
  }, [
    activeType,
    url,
    wifiSsid,
    wifiPassword,
    wifiEncryption,
    wifiHidden,
    waPhone,
    waMessage,
    vcardFirstName,
    vcardLastName,
    vcardPhone,
    vcardEmail,
    vcardOrg,
    emailTo,
    emailSubject,
    emailBody,
    rawText,
  ]);

  // Generate QR Canvas
  const generateQr = useCallback(async () => {
    const textToEncode = getEncodedText();
    if (!textToEncode) {
      setError("Lütfen QR kod içeriği için gerekli alanları doldurun.");
      return;
    }
    setError("");

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const effectiveLight = isTransparentBg ? "#00000000" : lightColor;

      // 1. QR Kod matrisini geçici canvas'a çiz
      const tempCanvas = document.createElement("canvas");
      await QRCode.toCanvas(tempCanvas, textToEncode, {
        width: qrSize,
        margin: 2,
        errorCorrectionLevel: centerLogo ? "H" : "M",
        color: {
          dark: darkColor,
          light: effectiveLight,
        },
      });

      canvas.width = qrSize;
      canvas.height = qrSize;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, qrSize, qrSize);

      // Arka plan
      if (!isTransparentBg) {
        ctx.fillStyle = lightColor;
        ctx.fillRect(0, 0, qrSize, qrSize);
      }

      // Gradyan efekti varsa
      if (useGradient) {
        ctx.drawImage(tempCanvas, 0, 0);
        ctx.globalCompositeOperation = "source-in";
        const grad = ctx.createLinearGradient(0, 0, qrSize, qrSize);
        grad.addColorStop(0, darkColor);
        grad.addColorStop(1, gradientColor2);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, qrSize, qrSize);
        ctx.globalCompositeOperation = "source-over";
      } else {
        ctx.drawImage(tempCanvas, 0, 0);
      }

      // Ortaya Logo ekleme
      if (centerLogo) {
        const logoImg = new Image();
        logoImg.onload = () => {
          const logoSize = Math.round(qrSize * 0.22);
          const center = (qrSize - logoSize) / 2;
          const pad = Math.round(logoSize * 0.12);

          // Beyaz yuvarlak arka plan koruyucu
          ctx.beginPath();
          ctx.arc(
            qrSize / 2,
            qrSize / 2,
            logoSize / 2 + pad,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
          ctx.lineWidth = 3;
          ctx.strokeStyle = darkColor;
          ctx.stroke();

          // Logoyu çiz
          ctx.save();
          ctx.beginPath();
          ctx.arc(qrSize / 2, qrSize / 2, logoSize / 2, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(logoImg, center, center, logoSize, logoSize);
          ctx.restore();
          setIsGenerated(true);
        };
        logoImg.src = centerLogo;
      } else {
        setIsGenerated(true);
      }
    } catch {
      setError("QR kod oluşturulurken bir hata oluştu. Girdiğiniz veriyi kontrol edin.");
    }
  }, [
    getEncodedText,
    qrSize,
    darkColor,
    lightColor,
    isTransparentBg,
    useGradient,
    gradientColor2,
    centerLogo,
  ]);

  useEffect(() => {
    generateQr();
  }, [generateQr]);

  // Logo yükleme
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCenterLogo(url);
    setCenterLogoType("custom");
  };

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `qrcode-${activeType}.png`;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSvg = async () => {
    const textToEncode = getEncodedText();
    if (!textToEncode) return;
    try {
      const svgString = await QRCode.toString(textToEncode, {
        type: "svg",
        margin: 2,
        color: {
          dark: darkColor,
          light: isTransparentBg ? "#00000000" : lightColor,
        },
      });
      const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `qrcode-${activeType}.svg`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      setError("SVG oluşturulurken sorun oluştu.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Üst Tip Seçici */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { id: "url", label: "Web Sitesi / URL", icon: Globe },
          { id: "wifi", label: "Wi-Fi Ağı", icon: Wifi },
          { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
          { id: "vcard", label: "Kartvizit", icon: Contact },
          { id: "email", label: "E-Posta", icon: Mail },
          { id: "text", label: "Düz Metin", icon: Type },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeType === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveType(item.id as QrType);
                if (item.id === "wifi") setCenterLogoType("none");
              }}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-xs font-semibold transition ${
                isActive
                  ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm dark:border-primary-400 dark:bg-primary-950/40 dark:text-primary-300"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* İki Kolonlu Düzen: Form Alanları vs Canlı QR Önizleme */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Sol Kolon: Girdiler ve Tasarım */}
        <div className="space-y-5 lg:col-span-7">
          {/* İçerik Alanı */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              {activeType === "url" && "Web Sitesi Bağlantısı"}
              {activeType === "wifi" && "Wi-Fi Bağlantı Bilgileri"}
              {activeType === "whatsapp" && "WhatsApp Mesaj Bağlantısı"}
              {activeType === "vcard" && "Dijital Kartvizit Bilgileri"}
              {activeType === "email" && "E-Posta Şablonu"}
              {activeType === "text" && "Metin İçeriği"}
            </h3>

            {/* URL Input */}
            {activeType === "url" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Hedef Web Adresi (URL)
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            )}

            {/* Wi-Fi Inputs */}
            {activeType === "wifi" && (
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Ağ Adı (SSID)
                  </label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    placeholder="Örn: Ev_Wifi"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Wi-Fi Şifresi
                  </label>
                  <input
                    type="text"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    placeholder="Kablosuz ağ şifresi"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div className="flex flex-wrap gap-4 pt-1">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                      Şifreleme Türü
                    </label>
                    <select
                      value={wifiEncryption}
                      onChange={(e) => setWifiEncryption(e.target.value as "WPA" | "WEP" | "nopass")}
                      className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    >
                      <option value="WPA">WPA / WPA2 / WPA3 (Önerilen)</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">Şifresiz</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2 pt-5 text-xs text-gray-600 dark:text-gray-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wifiHidden}
                      onChange={(e) => setWifiHidden(e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span>Gizli Ağ (Hidden SSID)</span>
                  </label>
                </div>
              </div>
            )}

            {/* WhatsApp Inputs */}
            {activeType === "whatsapp" && (
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Telefon Numarası (Ülke kodu ile)
                  </label>
                  <input
                    type="tel"
                    value={waPhone}
                    onChange={(e) => setWaPhone(e.target.value)}
                    placeholder="Örn: 905551234567"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Hazır Mesaj (İsteğe Bağlı)
                  </label>
                  <textarea
                    value={waMessage}
                    onChange={(e) => setWaMessage(e.target.value)}
                    placeholder="Örn: Merhaba, ürünleriniz hakkında bilgi almak istiyorum."
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
            )}

            {/* VCard Inputs */}
            {activeType === "vcard" && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Ad
                  </label>
                  <input
                    type="text"
                    value={vcardFirstName}
                    onChange={(e) => setVcardFirstName(e.target.value)}
                    placeholder="Ahmet"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Soyad
                  </label>
                  <input
                    type="text"
                    value={vcardLastName}
                    onChange={(e) => setVcardLastName(e.target.value)}
                    placeholder="Yılmaz"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={vcardPhone}
                    onChange={(e) => setVcardPhone(e.target.value)}
                    placeholder="+90 555 123 4567"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    E-Posta
                  </label>
                  <input
                    type="email"
                    value={vcardEmail}
                    onChange={(e) => setVcardEmail(e.target.value)}
                    placeholder="ahmet@example.com"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Şirket / Kuruluş
                  </label>
                  <input
                    type="text"
                    value={vcardOrg}
                    onChange={(e) => setVcardOrg(e.target.value)}
                    placeholder="TurkConvert Teknoloji"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
            )}

            {/* Email Inputs */}
            {activeType === "email" && (
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Kime (E-Posta Adresi)
                  </label>
                  <input
                    type="email"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    placeholder="iletisim@turkconvert.online"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    Konu Başlığı
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Bilgi Talebi"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                    İçerik
                  </label>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="E-posta metnini girin..."
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>
            )}

            {/* Text Inputs */}
            {activeType === "text" && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-700 dark:text-gray-300">
                  Düz Metin
                </label>
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="QR koda dönüştürmek istediğiniz herhangi bir metin..."
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            )}
          </div>

          {/* Tasarım & Renk Özelleştirme */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-900 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Palette className="h-4 w-4 text-primary-600 dark:text-primary-400" />
              Tasarım ve Renkler
            </h3>

            {/* Hazır Renk Paletleri */}
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-600 dark:text-gray-400">
                Hazır Renkler
              </label>
              <div className="flex flex-wrap gap-2">
                {COLOR_PRESETS.map((p) => (
                  <button
                    key={p.dark}
                    type="button"
                    onClick={() => {
                      setDarkColor(p.dark);
                      setLightColor(p.light);
                      setIsTransparentBg(false);
                    }}
                    className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                      darkColor === p.dark
                        ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: p.dark }}
                    />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Özel Renkler & Gradyan */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-gray-600 dark:text-gray-400">
                  QR Rengi
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={darkColor}
                    onChange={(e) => setDarkColor(e.target.value)}
                    className="h-9 w-12 cursor-pointer rounded border border-gray-300 p-0.5 dark:border-gray-700"
                  />
                  <input
                    type="text"
                    value={darkColor}
                    onChange={(e) => setDarkColor(e.target.value)}
                    className="w-full rounded border border-gray-300 px-2 py-1.5 font-mono text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-600 dark:text-gray-400">
                  Arka Plan Rengi
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    disabled={isTransparentBg}
                    value={lightColor}
                    onChange={(e) => setLightColor(e.target.value)}
                    className="h-9 w-12 cursor-pointer rounded border border-gray-300 p-0.5 disabled:opacity-50 dark:border-gray-700"
                  />
                  <label className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isTransparentBg}
                      onChange={(e) => setIsTransparentBg(e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span>Şeffaf Zemin</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Gradyan Toggle */}
            <div className="border-t border-gray-100 pt-3 dark:border-gray-800">
              <label className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
                <span className="font-medium">İki Renkli Gradyan Efekti</span>
                <input
                  type="checkbox"
                  checked={useGradient}
                  onChange={(e) => setUseGradient(e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
              </label>
              {useGradient && (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="color"
                    value={gradientColor2}
                    onChange={(e) => setGradientColor2(e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border border-gray-300 p-0.5 dark:border-gray-700"
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Bitiş Rengi (İki renk arasında modern geçiş sağlar)
                  </span>
                </div>
              )}
            </div>

            {/* Ortaya Logo Ekleme */}
            <div className="border-t border-gray-100 pt-3 dark:border-gray-800">
              <label className="mb-2 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Ortaya Logo / İkon Ekle
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCenterLogo(null);
                    setCenterLogoType("none");
                  }}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                    centerLogoType === "none"
                      ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300"
                      : "border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  Logosuz
                </button>

                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Özel Logo Yükle (PNG/JPG)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Kolon: Canlı QR Önizleme & İndirme */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/70 p-6 dark:border-gray-800 dark:bg-gray-900/40 lg:col-span-5">
          <div className="sticky top-24 flex flex-col items-center gap-6 w-full">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Canlı QR Kod Önizlemesi
            </h4>

            {/* QR Canvas Çerçevesi */}
            <div
              className={`overflow-hidden rounded-2xl border border-gray-200 p-4 shadow-md dark:border-gray-700 ${
                isTransparentBg
                  ? "bg-[linear-gradient(45deg,#f3f4f6_25%,transparent_25%),linear-gradient(-45deg,#f3f4f6_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f3f4f6_75%),linear-gradient(-45deg,transparent_75%,#f3f4f6_75%)] bg-[size:16px_16px] [background-position:0_0,0_8px,8px_-8px,-8px_0px] dark:bg-[linear-gradient(45deg,#1f2937_25%,transparent_25%),linear-gradient(-45deg,#1f2937_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1f2937_75%),linear-gradient(-45deg,transparent_75%,#1f2937_75%)]"
                  : "bg-white"
              }`}
            >
              <canvas
                ref={canvasRef}
                className="max-h-[280px] max-w-[280px] rounded-lg object-contain sm:max-h-[320px] sm:max-w-[320px]"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 p-2.5 text-xs text-red-600 dark:bg-red-950/30 dark:text-red-400">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* İndirme Butonları */}
            <div className="flex flex-col gap-2.5 w-full max-w-xs">
              <button
                type="button"
                onClick={handleDownloadPng}
                disabled={!isGenerated}
                className="btn-primary gap-2 w-full"
              >
                <Download className="h-4 w-4" />
                <span>PNG Olarak İndir (Yüksek Çözünürlük)</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadSvg}
                disabled={!isGenerated}
                className="btn-secondary gap-2 w-full"
              >
                <Sparkles className="h-4 w-4" />
                <span>Vektörel SVG İndir</span>
              </button>
            </div>

            <p className="text-center text-[11px] text-gray-400 dark:text-gray-500">
              Oluşturulan QR kodlar statiktir, ömür boyu sınırsız çalışır ve asla kapanmaz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
