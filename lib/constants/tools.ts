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
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

// ─── Tipler ──────────────────────────────────────────────────────

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

// ─── Kategoriler ─────────────────────────────────────────────────

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

// ─── Araçlar ─────────────────────────────────────────────────────

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
    name: "Metin Karşılaştırıcı",
    description: "İki metin arasındaki farkları satır satır karşılaştırın.",
    href: "/diff-checker",
    category: "developer",
    icon: GitCompare,
  },

  // Diğer
  {
    id: "qr-code-generator",
    name: "QR Kod Oluşturucu",
    description: "Metin veya URL'den QR kod oluşturun.",
    href: "/qr-code-generator",
    category: "other",
    icon: QrCode,
  },
];

/**
 * Kategoriye göre araçları filtreler.
 */
export function getToolsByCategory(category: ToolCategory): ToolInfo[] {
  return tools.filter((t) => t.category === category);
}
