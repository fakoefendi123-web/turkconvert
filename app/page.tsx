import type { Metadata } from "next";
import { categories, getToolsByCategory, tools } from "@/lib/constants/tools";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { ToolCard } from "@/components/ui/ToolCard";
import { HeroSearchTrigger } from "@/components/ui/HeroSearchTrigger";
import { RecentToolsBar } from "@/components/ui/RecentToolsBar";
import {
  Zap,
  ShieldCheck,
  Sparkles,
  Flame,
  PenTool,
  Minimize2,
  QrCode,
  Receipt,
  ShieldAlert,
  SplitSquareVertical,
} from "lucide-react";

export const metadata: Metadata = {
  title: "TurkConvert - Ücretsiz Online Dosya Dönüştürme, Sıkıştırma ve Düzenleme Araçları",
  description:
    "Görsel sıkıştırma, şeffaf imza oluşturucu, gelişmiş QR kod stüdyosu, PDF fatura ve belge sansürleme araçları dahil %100 güvenli, ücretsiz ve reklamsız online araçlar.",
  alternates: {
    canonical: "https://turkconvert.online/",
  },
  openGraph: {
    title: "TurkConvert - Ücretsiz Online Dosya Dönüştürme ve Düzenleme Araçları",
    description:
      "Görsel sıkıştırma, şeffaf imza oluşturucu, gelişmiş QR kod stüdyosu, PDF fatura ve belge sansürleme araçları dahil %100 güvenli, ücretsiz ve reklamsız online araçlar.",
    url: "https://turkconvert.online/",
    siteName: "TurkConvert",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "TurkConvert - Ücretsiz Online Dosya Dönüştürme ve Düzenleme Araçları",
    description:
      "Görsel sıkıştırma, şeffaf imza, QR stüdyosu, PDF fatura ve sansürleme araçları dahil %100 güvenli, ücretsiz ve reklamsız online araçlar.",
  },
};

const FEATURED_TOOLS = [
  {
    id: "image-compressor",
    title: "Görsel Sıkıştırıcı",
    description: "Kalite kaybı olmadan dosya boyutunu küçültün (Önce/Sonra karşılaştırmalı).",
    href: "/image-compressor",
    icon: Minimize2,
    badge: "Yenilendi",
  },
  {
    id: "seffaf-imza",
    title: "Şeffaf İmza Oluşturucu",
    description: "Belgeleriniz için arka planı saydam ıslak imza çizin ve indirin.",
    href: "/seffaf-imza",
    icon: PenTool,
    badge: "Yeni",
  },
  {
    id: "qr-code-generator",
    title: "Gelişmiş QR Kod Stüdyosu",
    description: "Wi-Fi, WhatsApp, vCard, renkli gradyan ve logolu QR kodlar oluşturun.",
    href: "/qr-code-generator",
    icon: QrCode,
    badge: "Popüler",
  },
  {
    id: "fatura-olusturucu",
    title: "PDF Fatura Oluşturucu",
    description: "Hesaplamalı, şık ve kurumsal A4 PDF fatura veya teklif hazırlayın.",
    href: "/fatura-olusturucu",
    icon: Receipt,
    badge: "Yeni",
  },
  {
    id: "belge-sansurleyici",
    title: "Gizli Belge Sansürleyici",
    description: "T.C., IBAN ve hassas bilgileri siyah bant veya mozaik ile gizleyin.",
    href: "/belge-sansurleyici",
    icon: ShieldAlert,
    badge: "Güvenlik",
  },
  {
    id: "image-compare",
    title: "Görsel Karşılaştırıcı",
    description: "İki resim arasındaki farkı interaktif Before/After sürgüsüyle inceleyin.",
    href: "/image-compare",
    icon: SplitSquareVertical,
    badge: "Yeni",
  },
];

const NEW_TOOL_IDS = new Set([
  "seffaf-imza",
  "belge-sansurleyici",
  "fatura-olusturucu",
  "image-compare",
]);

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Hero Bölümü */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold text-primary-700 dark:bg-primary-950/50 dark:text-primary-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>%100 Tarayıcı Tabanlı, Reklamsız ve Ücretsiz</span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Dosyalarınızı güvenle dönüştürün ve düzenleyin
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg">
          Görsel dönüştürme, sıkıştırma, şeffaf imza, QR stüdyosu ve PDF araçları. Dosyalarınız sunucuya yüklenmez, gizliliğiniz tamamen korunur.
        </p>

        {/* Hızlı Arama Kutusu */}
        <HeroSearchTrigger />

        {/* Son Kullanılanlar */}
        <RecentToolsBar />

        {/* Özellik Rozetleri */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-primary-500" />
            <span>Sıfır Bekleme, Anında İşlem</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary-500" />
            <span>%100 İstemci Taraflı Gizlilik</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-primary-500" />
            <span>Üyelik ve Reklam Yok</span>
          </div>
        </div>
      </section>

      {/* Öne Çıkan & Yeni Araçlar Vitrini */}
      <section className="mt-14">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
              Öne Çıkan ve Yeni Araçlar
            </h2>
          </div>
          <span className="text-xs text-gray-400">En popüler araçlar</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_TOOLS.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              href={tool.href}
              icon={tool.icon}
              badge={tool.badge}
            />
          ))}
        </div>
      </section>

      {/* Kategori Kartları Grid */}
      <section id="araclar" className="mt-16 scroll-mt-20">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
            Tüm Araç Kategorileri ({tools.length} Araç)
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.name}
              description={category.description}
              icon={category.icon}
              href={`#${category.anchor}`}
            />
          ))}
        </div>
      </section>

      {/* Kategori Bazlı Araç Listeleri */}
      <div className="mt-16 space-y-16">
        {categories.map((category) => {
          const categoryTools = getToolsByCategory(category.id);
          const Icon = category.icon;

          return (
            <section
              key={category.id}
              id={category.anchor}
              className="scroll-mt-24"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    title={tool.name}
                    description={tool.description}
                    href={tool.href}
                    icon={tool.icon}
                    badge={NEW_TOOL_IDS.has(tool.id) ? "Yeni" : undefined}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Structured Data for Google (WebSite & Organization) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://turkconvert.online/#website",
                url: "https://turkconvert.online",
                name: "TurkConvert",
                description:
                  "Görsel sıkıştırma, şeffaf imza, QR stüdyosu, PDF fatura ve dönüştürme araçları dahil ücretsiz ve güvenli online platform.",
                inLanguage: "tr-TR",
              },
              {
                "@type": "Organization",
                "@id": "https://turkconvert.online/#organization",
                name: "TurkConvert",
                url: "https://turkconvert.online",
                logo: "https://turkconvert.online/icon.svg",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
