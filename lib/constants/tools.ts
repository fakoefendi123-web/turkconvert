import {
  Image,
  FileText,
  Type,
  Code,
  QrCode,
  ArrowRightLeft,
  Maximize,
  Minimize2,
  FileImage,
  Images,
  Hash,
  CaseSensitive,
  Eraser,
  Braces,
  Binary,
  Link2,
  KeyRound,
  RotateCw,
  Crop,
  Pipette,
  Shield,
  Fingerprint,
  GitCompare,
  FileCode2,
  AlignLeft,
  PenTool,
  ShieldAlert,
  SplitSquareVertical,
  Receipt,
  Layers,
  Scissors,
  Lock,
  Calculator,
  Building2,
  Wallet,
  LayoutGrid,
  Camera,
  Stamp,
  BadgeCheck,
  Percent,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

// --- Tipler ---

export type ToolCategory = "image" | "pdf" | "text" | "developer" | "other";

export interface ToolInfo {
  id: string;
  name: string;
  description: string;
  href: string;
  category: ToolCategory;
  icon: LucideIcon;
}

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  icon: LucideIcon;
  anchor: string;
}

// --- Kategoriler ---

export const categories: CategoryInfo[] = [
  {
    id: "image",
    name: "Görsel Araçları",
    description: "JPG, PNG ve WEBP dosyalarını kolayca dönüştürün.",
    icon: Image,
    anchor: "gorsel",
  },
  {
    id: "pdf",
    name: "PDF Araçları",
    description: "Görsellerinizi PDF'e dönüştürün.",
    icon: FileText,
    anchor: "pdf",
  },
  {
    id: "text",
    name: "Metin Araçları",
    description: "Metinlerinizi düzenleyin ve analiz edin.",
    icon: Type,
    anchor: "metin",
  },
  {
    id: "developer",
    name: "Geliştirici Araçları",
    description: "JSON, Base64, URL ve diğer geliştirici araçları.",
    icon: Code,
    anchor: "gelistirici",
  },
  {
    id: "other",
    name: "Diğer Araçlar",
    description: "QR kod ve diğer faydalı araçlar.",
    icon: QrCode,
    anchor: "diger",
  },
];

// --- Araçlar ---

export const tools: ToolInfo[] = [
  // Görsel Araçları
  {
    id: "jpg-to-png",
    name: "JPG → PNG",
    description: "JPG görsellerinizi PNG formatına dönüştürün.",
    href: "/jpg-to-png",
    category: "image",
    icon: ArrowRightLeft,
  },
  {
    id: "png-to-jpg",
    name: "PNG → JPG",
    description: "PNG görsellerinizi JPG formatına dönüştürün.",
    href: "/png-to-jpg",
    category: "image",
    icon: ArrowRightLeft,
  },
  {
    id: "jpg-to-webp",
    name: "JPG → WEBP",
    description: "JPG görsellerinizi WEBP formatına dönüştürün.",
    href: "/jpg-to-webp",
    category: "image",
    icon: ArrowRightLeft,
  },
  {
    id: "png-to-webp",
    name: "PNG → WEBP",
    description: "PNG görsellerinizi WEBP formatına dönüştürün.",
    href: "/png-to-webp",
    category: "image",
    icon: ArrowRightLeft,
  },
  {
    id: "webp-to-jpg",
    name: "WEBP → JPG",
    description: "WEBP görsellerinizi JPG formatına dönüştürün.",
    href: "/webp-to-jpg",
    category: "image",
    icon: ArrowRightLeft,
  },
  {
    id: "webp-to-png",
    name: "WEBP → PNG",
    description: "WEBP görsellerinizi PNG formatına dönüştürün.",
    href: "/webp-to-png",
    category: "image",
    icon: ArrowRightLeft,
  },
  {
    id: "image-resizer",
    name: "Görsel Boyutlandırıcı",
    description: "Görsellerinizi istediğiniz boyuta yeniden boyutlandırın.",
    href: "/image-resizer",
    category: "image",
    icon: Maximize,
  },
  {
    id: "image-compressor",
    name: "Görsel Sıkıştırıcı",
    description: "Görsellerinizi kalite kaybı minimize ederek sıkıştırın.",
    href: "/image-compressor",
    category: "image",
    icon: Minimize2,
  },
  {
    id: "image-rotate",
    name: "Görsel Döndürme & Çevirme",
    description: "Görsellerinizi 90°/180° döndürün veya yatay/dikey aynalayın.",
    href: "/image-rotate",
    category: "image",
    icon: RotateCw,
  },
  {
    id: "image-cropper",
    name: "Görsel Kırpıcı",
    description: "Görsellerinizi istediğiniz oranda kırpın ve kesin.",
    href: "/image-cropper",
    category: "image",
    icon: Crop,
  },
  {
    id: "color-picker",
    name: "Renk Seçici & Palet",
    description: "Görsellerden renk kodu seçin ve renk paleti çıkarın.",
    href: "/color-picker",
    category: "image",
    icon: Pipette,
  },
  {
    id: "svg-to-png",
    name: "SVG → PNG",
    description: "Vektörel SVG dosyalarını yüksek çözünürlüklü PNG'ye dönüştürün.",
    href: "/svg-to-png",
    category: "image",
    icon: FileImage,
  },
  {
    id: "seffaf-imza",
    name: "Şeffaf İmza Oluşturucu",
    description: "Belgeleriniz için arka planı şeffaf el yazısı imza çizin ve indirin.",
    href: "/seffaf-imza",
    category: "image",
    icon: PenTool,
  },
  {
    id: "belge-sansurleyici",
    name: "Gizli Belge Sansürleyici",
    description: "T.C., IBAN ve hassas bilgileri siyah bant veya mozaik ile gizleyin.",
    href: "/belge-sansurleyici",
    category: "image",
    icon: ShieldAlert,
  },
  {
    id: "image-compare",
    name: "Görsel Karşılaştırıcı",
    description: "İki görsel arasındaki farkı ve kaliteyi interaktif kaydırıcı ile inceleyin.",
    href: "/image-compare",
    category: "image",
    icon: SplitSquareVertical,
  },
  {
    id: "heic-to-jpg",
    name: "HEIC → JPG",
    description: "iPhone (.heic) fotoğraflarınızı anında JPG formatına dönüştürün.",
    href: "/heic-to-jpg",
    category: "image",
    icon: FileImage,
  },
  {
    id: "heic-to-png",
    name: "HEIC → PNG",
    description: "iPhone (.heic) fotoğraflarınızı kayıpsız PNG formatına dönüştürün.",
    href: "/heic-to-png",
    category: "image",
    icon: FileImage,
  },
  {
    id: "exif-cleaner",
    name: "EXIF & Konum Temizleyici",
    description: "Fotoğraflardaki GPS konumu, çekim saati ve cihaz bilgilerini silin.",
    href: "/exif-cleaner",
    category: "image",
    icon: Lock,
  },
  {
    id: "biyometrik-foto",
    name: "Biyometrik & Vesikalık Fotoğraf",
    description: "E-Devlet, Pasaport, Vize ve ÖSYM için 50x60mm ve 35x45mm şablonuyla fotoğraf oluşturun.",
    href: "/biyometrik-foto",
    category: "image",
    icon: Camera,
  },

  // PDF Araçları
  {
    id: "jpg-to-pdf",
    name: "JPG → PDF",
    description: "JPG görsellerinizi PDF formatına dönüştürün.",
    href: "/jpg-to-pdf",
    category: "pdf",
    icon: FileImage,
  },
  {
    id: "png-to-pdf",
    name: "PNG → PDF",
    description: "PNG görsellerinizi PDF formatına dönüştürün.",
    href: "/png-to-pdf",
    category: "pdf",
    icon: FileImage,
  },
  {
    id: "image-to-pdf",
    name: "Görseller → PDF",
    description: "Birden fazla görseli tek bir PDF'e dönüştürün.",
    href: "/image-to-pdf",
    category: "pdf",
    icon: Images,
  },
  {
    id: "fatura-olusturucu",
    name: "PDF Fatura Oluşturucu",
    description: "Hızlı, kurumsal ve hesaplamalı A4 PDF fatura veya teklif belgesi hazırlayın.",
    href: "/fatura-olusturucu",
    category: "pdf",
    icon: Receipt,
  },
  {
    id: "pdf-merge",
    name: "PDF Birleştirici",
    description: "Birden fazla PDF belgesini sırasını belirleyerek tek dosya yapın.",
    href: "/pdf-merge",
    category: "pdf",
    icon: Layers,
  },
  {
    id: "pdf-split",
    name: "PDF Sayfa Ayırıcı",
    description: "PDF belgelerinizden dilediğiniz sayfaları çıkarın veya bölün.",
    href: "/pdf-split",
    category: "pdf",
    icon: Scissors,
  },
  {
    id: "pdf-organize",
    name: "Görsel PDF Sayfa Düzenleyici",
    description: "PDF sayfalarını görsel kartlar olarak inceleyin, sıralayın, döndürün veya silin.",
    href: "/pdf-organize",
    category: "pdf",
    icon: LayoutGrid,
  },
  {
    id: "pdf-watermark",
    name: "PDF Sayfa Numaralandırıcı & Filigran",
    description: "PDF belgelerinize sayfa numarası ekleyin veya TASLAK/GİZLİDİR filigranı basın.",
    href: "/pdf-watermark",
    category: "pdf",
    icon: Stamp,
  },

  // Metin Araçları
  {
    id: "word-counter",
    name: "Metin Sayacı",
    description: "Kelime, karakter ve satır sayısını hesaplayın.",
    href: "/word-counter",
    category: "text",
    icon: Hash,
  },
  {
    id: "text-case-converter",
    name: "Harf Dönüştürücü",
    description: "Metni büyük veya küçük harfe dönüştürün.",
    href: "/text-case-converter",
    category: "text",
    icon: CaseSensitive,
  },
  {
    id: "text-cleaner",
    name: "Metin Temizleyici",
    description: "Fazla boşlukları ve gereksiz karakterleri temizleyin.",
    href: "/text-cleaner",
    category: "text",
    icon: Eraser,
  },
  {
    id: "markdown-previewer",
    name: "Markdown Önizleyici",
    description: "Markdown yazın, canlı HTML önizleyin ve dışa aktarın.",
    href: "/markdown-previewer",
    category: "text",
    icon: FileCode2,
  },
  {
    id: "lorem-ipsum-generator",
    name: "Lorem Ipsum Üretici",
    description: "Tasarım ve testleriniz için yer tutucu metin oluşturun.",
    href: "/lorem-ipsum-generator",
    category: "text",
    icon: AlignLeft,
  },
  {
    id: "sayiyi-yaziya-cevir",
    name: "Yazıyla Sayı & Para",
    description: "Rakamları fatura, çek veya dilekçe için Türkçe yazıya çevirin.",
    href: "/sayiyi-yaziya-cevir",
    category: "text",
    icon: Type,
  },

  // Geliştirici Araçları
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "JSON verilerinizi okunabilir formata dönüştürün.",
    href: "/json-formatter",
    category: "developer",
    icon: Braces,
  },
  {
    id: "json-minifier",
    name: "JSON Minifier",
    description: "JSON verilerinizi sıkıştırılmış formata dönüştürün.",
    href: "/json-minifier",
    category: "developer",
    icon: Braces,
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder",
    description: "Metni Base64 formatına dönüştürün.",
    href: "/base64-encoder",
    category: "developer",
    icon: Binary,
  },
  {
    id: "base64-decoder",
    name: "Base64 Decoder",
    description: "Base64 verisini orijinal metne dönüştürün.",
    href: "/base64-decoder",
    category: "developer",
    icon: Binary,
  },
  {
    id: "url-encoder",
    name: "URL Encoder",
    description: "Metni URL-safe formata dönüştürün.",
    href: "/url-encoder",
    category: "developer",
    icon: Link2,
  },
  {
    id: "url-decoder",
    name: "URL Decoder",
    description: "URL-encoded metni orijinal haline dönüştürün.",
    href: "/url-decoder",
    category: "developer",
    icon: Link2,
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Benzersiz UUID (v4) değerleri oluşturun.",
    href: "/uuid-generator",
    category: "developer",
    icon: KeyRound,
  },
  {
    id: "password-generator",
    name: "Şifre Oluşturucu",
    description: "Güçlü, kırılması zor ve güvenli parolalar oluşturun.",
    href: "/password-generator",
    category: "developer",
    icon: Shield,
  },
  {
    id: "hash-generator",
    name: "Hash Oluşturucu",
    description: "SHA-256, MD5 ve SHA-512 hash değerleri hesaplayın.",
    href: "/hash-generator",
    category: "developer",
    icon: Fingerprint,
  },
  {
    id: "diff-checker",
    name: "Metin Farkı Bulucu (Diff)",
    description: "İki metin arasındaki farkları satır içi ve kelime düzeyinde karşılaştırın.",
    href: "/diff-checker",
    category: "developer",
    icon: GitCompare,
  },

  // Diğer
  {
    id: "qr-code-generator",
    name: "Gelişmiş QR Kod Stüdyosu",
    description: "Wi-Fi, WhatsApp, vCard, renkli gradyan ve logolu QR kodlar oluşturun.",
    href: "/qr-code-generator",
    category: "other",
    icon: QrCode,
  },
  {
    id: "kdv-hesaplayici",
    name: "KDV & Tevkifat Hesaplayıcı",
    description: "KDV dahil/hariç tutarları ve tevkifat oranlarını anında hesaplayın.",
    href: "/kdv-hesaplayici",
    category: "other",
    icon: Calculator,
  },
  {
    id: "iban-dogrulayici",
    name: "IBAN Doğrulayıcı & Banka Bulucu",
    description: "TR IBAN numarasını matematiksel Mod-97 ile doğrulayın ve bankayı öğrenin.",
    href: "/iban-dogrulayici",
    category: "other",
    icon: Building2,
  },
  {
    id: "maas-hesaplayici",
    name: "2026 Maaş Hesaplayıcı",
    description: "Brüt'ten Net'e ve Net'ten Brüt'e maaşınızı ve 12 aylık bordronuzu hesaplayın.",
    href: "/maas-hesaplayici",
    category: "other",
    icon: Wallet,
  },
  {
    id: "tc-kimlik-dogrulayici",
    name: "T.C. Kimlik Doğrulayıcı & Üretici",
    description: "T.C. Kimlik numarasını resmi mod-10 algoritması ile doğrulayın ve test kimlik üretin.",
    href: "/tc-kimlik-dogrulayici",
    category: "other",
    icon: BadgeCheck,
  },
  {
    id: "yuzde-hesaplayici",
    name: "Yüzde & İskonto Hesaplayıcı",
    description: "Yüzde bulma, artış/azalış, KDV/zam ve indirim/iskonto hesaplamalarını anında yapın.",
    href: "/yuzde-hesaplayici",
    category: "other",
    icon: Percent,
  },
];

/**
 * Kategoriye göre araçları filtreler.
 */
export function getToolsByCategory(category: ToolCategory): ToolInfo[] {
  return tools.filter((t) => t.category === category);
}
