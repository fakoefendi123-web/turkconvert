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

// â”€â”€â”€ Tipler â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ Kategoriler â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const categories: CategoryInfo[] = [
  {
    id: "image",
    name: "GÃ¶rsel AraÃ§larÄ±",
    description: "JPG, PNG ve WEBP dosyalarÄ±nÄ± kolayca dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    icon: Image,
    anchor: "gorsel",
  },
  {
    id: "pdf",
    name: "PDF AraÃ§larÄ±",
    description: "GÃ¶rsellerinizi PDF'e dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    icon: FileText,
    anchor: "pdf",
  },
  {
    id: "text",
    name: "Metin AraÃ§larÄ±",
    description: "Metinlerinizi dÃ¼zenleyin ve analiz edin.",
    icon: Type,
    anchor: "metin",
  },
  {
    id: "developer",
    name: "GeliÅŸtirici AraÃ§larÄ±",
    description: "JSON, Base64, URL ve diÄŸer geliÅŸtirici araÃ§larÄ±.",
    icon: Code,
    anchor: "gelistirici",
  },
  {
    id: "other",
    name: "DiÄŸer AraÃ§lar",
    description: "QR kod ve diÄŸer faydalÄ± araÃ§lar.",
    icon: QrCode,
    anchor: "diger",
  },
];

// â”€â”€â”€ AraÃ§lar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const tools: ToolInfo[] = [
  // GÃ¶rsel AraÃ§larÄ±
  {
    id: "jpg-to-png",
    name: "JPG â†’ PNG",
    description: "JPG gÃ¶rsellerinizi PNG formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/jpg-to-png",
    category: "image",
    icon: ArrowRightLeft,
  },
  {
    id: "png-to-jpg",
    name: "PNG â†’ JPG",
    description: "PNG gÃ¶rsellerinizi JPG formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/png-to-jpg",
    category: "image",
    icon: ArrowRightLeft,
  },
  {
    id: "jpg-to-webp",
    name: "JPG â†’ WEBP",
    description: "JPG gÃ¶rsellerinizi WEBP formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/jpg-to-webp",
    category: "image",
    icon: ArrowRightLeft,
  },
  {
    id: "png-to-webp",
    name: "PNG â†’ WEBP",
    description: "PNG gÃ¶rsellerinizi WEBP formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/png-to-webp",
    category: "image",
    icon: ArrowRightLeft,
  },
  {
    id: "webp-to-jpg",
    name: "WEBP â†’ JPG",
    description: "WEBP gÃ¶rsellerinizi JPG formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/webp-to-jpg",
    category: "image",
    icon: ArrowRightLeft,
  },
  {
    id: "webp-to-png",
    name: "WEBP â†’ PNG",
    description: "WEBP gÃ¶rsellerinizi PNG formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/webp-to-png",
    category: "image",
    icon: ArrowRightLeft,
  },
  {
    id: "image-resizer",
    name: "GÃ¶rsel BoyutlandÄ±rÄ±cÄ±",
    description: "GÃ¶rsellerinizi istediÄŸiniz boyuta yeniden boyutlandÄ±rÄ±n.",
    href: "/image-resizer",
    category: "image",
    icon: Maximize,
  },
  {
    id: "image-compressor",
    name: "GÃ¶rsel SÄ±kÄ±ÅŸtÄ±rÄ±cÄ±",
    description: "GÃ¶rsellerinizi kalite kaybÄ± minimize ederek sÄ±kÄ±ÅŸtÄ±rÄ±n.",
    href: "/image-compressor",
    category: "image",
    icon: Minimize2,
  },
  {
    id: "image-rotate",
    name: "GÃ¶rsel DÃ¶ndÃ¼rme & Ã‡evirme",
    description: "GÃ¶rsellerinizi 90Â°/180Â° dÃ¶ndÃ¼rÃ¼n veya yatay/dikey aynalayÄ±n.",
    href: "/image-rotate",
    category: "image",
    icon: RotateCw,
  },
  {
    id: "image-cropper",
    name: "GÃ¶rsel KÄ±rpÄ±cÄ±",
    description: "GÃ¶rsellerinizi istediÄŸiniz oranda kÄ±rpÄ±n ve kesin.",
    href: "/image-cropper",
    category: "image",
    icon: Crop,
  },
  {
    id: "color-picker",
    name: "Renk SeÃ§ici & Palet",
    description: "GÃ¶rsellerden renk kodu seÃ§in ve renk paleti Ã§Ä±karÄ±n.",
    href: "/color-picker",
    category: "image",
    icon: Pipette,
  },
  {
    id: "svg-to-png",
    name: "SVG â†’ PNG",
    description: "VektÃ¶rel SVG dosyalarÄ±nÄ± yÃ¼ksek Ã§Ã¶zÃ¼nÃ¼rlÃ¼klÃ¼ PNG'ye dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/svg-to-png",
    category: "image",
    icon: FileImage,
  },

  // PDF AraÃ§larÄ±
  {
    id: "jpg-to-pdf",
    name: "JPG â†’ PDF",
    description: "JPG gÃ¶rsellerinizi PDF formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/jpg-to-pdf",
    category: "pdf",
    icon: FileImage,
  },
  {
    id: "png-to-pdf",
    name: "PNG â†’ PDF",
    description: "PNG gÃ¶rsellerinizi PDF formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/png-to-pdf",
    category: "pdf",
    icon: FileImage,
  },
  {
    id: "image-to-pdf",
    name: "GÃ¶rseller â†’ PDF",
    description: "Birden fazla gÃ¶rseli tek bir PDF'e dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/image-to-pdf",
    category: "pdf",
    icon: Images,
  },

  // Metin AraÃ§larÄ±
  {
    id: "word-counter",
    name: "Metin SayacÄ±",
    description: "Kelime, karakter ve satÄ±r sayÄ±sÄ±nÄ± hesaplayÄ±n.",
    href: "/word-counter",
    category: "text",
    icon: Hash,
  },
  {
    id: "text-case-converter",
    name: "Harf DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼",
    description: "Metni bÃ¼yÃ¼k veya kÃ¼Ã§Ã¼k harfe dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/text-case-converter",
    category: "text",
    icon: CaseSensitive,
  },
  {
    id: "text-cleaner",
    name: "Metin Temizleyici",
    description: "Fazla boÅŸluklarÄ± ve gereksiz karakterleri temizleyin.",
    href: "/text-cleaner",
    category: "text",
    icon: Eraser,
  },
  {
    id: "markdown-previewer",
    name: "Markdown Ã–nizleyici",
    description: "Markdown yazÄ±n, canlÄ± HTML Ã¶nizleyin ve dÄ±ÅŸa aktarÄ±n.",
    href: "/markdown-previewer",
    category: "text",
    icon: FileCode2,
  },
  {
    id: "lorem-ipsum-generator",
    name: "Lorem Ipsum Ãœretici",
    description: "TasarÄ±m ve testleriniz iÃ§in yer tutucu metin oluÅŸturun.",
    href: "/lorem-ipsum-generator",
    category: "text",
    icon: AlignLeft,
  },

  // GeliÅŸtirici AraÃ§larÄ±
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "JSON verilerinizi okunabilir formata dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/json-formatter",
    category: "developer",
    icon: Braces,
  },
  {
    id: "json-minifier",
    name: "JSON Minifier",
    description: "JSON verilerinizi sÄ±kÄ±ÅŸtÄ±rÄ±lmÄ±ÅŸ formata dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/json-minifier",
    category: "developer",
    icon: Braces,
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder",
    description: "Metni Base64 formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/base64-encoder",
    category: "developer",
    icon: Binary,
  },
  {
    id: "base64-decoder",
    name: "Base64 Decoder",
    description: "Base64 verisini orijinal metne dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/base64-decoder",
    category: "developer",
    icon: Binary,
  },
  {
    id: "url-encoder",
    name: "URL Encoder",
    description: "Metni URL-safe formata dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/url-encoder",
    category: "developer",
    icon: Link2,
  },
  {
    id: "url-decoder",
    name: "URL Decoder",
    description: "URL-encoded metni orijinal haline dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
    href: "/url-decoder",
    category: "developer",
    icon: Link2,
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Benzersiz UUID (v4) deÄŸerleri oluÅŸturun.",
    href: "/uuid-generator",
    category: "developer",
    icon: KeyRound,
  },
  {
    id: "password-generator",
    name: "Åifre OluÅŸturucu",
    description: "GÃ¼Ã§lÃ¼, kÄ±rÄ±lmasÄ± zor ve gÃ¼venli parolalar oluÅŸturun.",
    href: "/password-generator",
    category: "developer",
    icon: Shield,
  },
  {
    id: "hash-generator",
    name: "Hash OluÅŸturucu",
    description: "SHA-256, MD5 ve SHA-512 hash deÄŸerleri hesaplayÄ±n.",
    href: "/hash-generator",
    category: "developer",
    icon: Fingerprint,
  },
  {
    id: "diff-checker",
    name: "Metin KarÅŸÄ±laÅŸtÄ±rÄ±cÄ±",
    description: "Ä°ki metin arasÄ±ndaki farklarÄ± satÄ±r satÄ±r karÅŸÄ±laÅŸtÄ±rÄ±n.",
    href: "/diff-checker",
    category: "developer",
    icon: GitCompare,
  },

  // DiÄŸer
  {
    id: "qr-code-generator",
    name: "QR Kod OluÅŸturucu",
    description: "Metin veya URL'den QR kod oluÅŸturun.",
    href: "/qr-code-generator",
    category: "other",
    icon: QrCode,
  },
];

/**
 * Kategoriye gÃ¶re araÃ§larÄ± filtreler.
 */
export function getToolsByCategory(category: ToolCategory): ToolInfo[] {
  return tools.filter((t) => t.category === category);
}
