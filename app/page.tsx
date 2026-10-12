import type { Metadata } from "next";
import Link from "next/link";
import { HeroSearchTrigger } from "@/components/ui/HeroSearchTrigger";
import { RecentToolsBar } from "@/components/ui/RecentToolsBar";
import { ToolsExplorer } from "@/components/ui/ToolsExplorer";
import { UniversalDropzone } from "@/components/ui/UniversalDropzone";
import { BentoGridShowcase } from "@/components/ui/BentoGridShowcase";
import {
  Zap,
  ShieldCheck,
  Sparkles,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "TurkConvert - Ücretsiz Online Dosya Dönüştürme, Sıkıştırma ve Düzenleme Araçları",
  description:
    "Görsel sıkıştırma, HEIC to JPG, PDF birleştirme ve ayırma, şeffaf imza, KDV hesaplayıcı, IBAN doğrulayıcı dahil %100 güvenli ve ücretsiz online araçlar.",
  alternates: {
    canonical: "https://turkconvert.online/",
  },
  openGraph: {
    title: "TurkConvert - Ücretsiz Online Dosya Dönüştürme ve Düzenleme Araçları",
    description:
      "Görsel sıkıştırma, HEIC to JPG, PDF birleştirme ve ayırma, şeffaf imza, KDV hesaplayıcı, IBAN doğrulayıcı dahil %100 güvenli ve ücretsiz online araçlar.",
    url: "https://turkconvert.online/",
    siteName: "TurkConvert",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "TurkConvert - Ücretsiz Online Dosya Dönüştürme ve Düzenleme Araçları",
    description:
      "Görsel sıkıştırma, HEIC to JPG, PDF birleştirme ve ayırma, şeffaf imza, KDV hesaplayıcı ve IBAN kontrolü dahil %100 güvenli, ücretsiz araçlar.",
  },
};

const QUICK_ACTIONS = [
  { label: "📱 HEIC to JPG", href: "/heic-to-jpg" },
  { label: "📑 PDF Birleştir", href: "/pdf-merge" },
  { label: "✂️ PDF Ayır", href: "/pdf-split" },
  { label: "📸 Boyut Küçült", href: "/image-compressor" },
  { label: "💰 KDV Hesapla", href: "/kdv-hesaplayici" },
  { label: "🏦 IBAN Kontrol", href: "/iban-dogrulayici" },
  { label: "✍️ Şeffaf İmza", href: "/seffaf-imza" },
  { label: "🧾 PDF Fatura", href: "/fatura-olusturucu" },
];

export default function HomePage() {
  return (
    <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-14">
      {/* Hero Bölümü */}
      <section className="relative text-center">
        {/* Ambient Hero Glow */}
        <div className="pointer-events-none absolute left-1/2 -top-20 -translate-x-1/2 h-72 w-full max-w-2xl rounded-full bg-gradient-to-tr from-primary-500/15 via-violet-500/15 to-cyan-500/10 blur-3xl opacity-75 dark:opacity-60" />

        <div className="relative inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-50/70 px-4 py-1.5 text-xs font-semibold text-primary-700 backdrop-blur-md dark:border-primary-400/20 dark:bg-primary-950/40 dark:text-primary-300">
          <Sparkles className="h-3.5 w-3.5 text-primary-500" />
          <span>%100 Tarayıcı Tabanlı • Hızlı & Ücretsiz • Sıfır Sunucu Yüklemesi</span>
        </div>

        <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
          <span className="gradient-heading block">Tüm Dosyalarınız İçin</span>
          <span className="gradient-text block mt-1">Ultra Hızlı Tarayıcı Stüdyosu</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
          Görseller, PDF belgeleri, metinler ve finansal araçlar tek platformda. Hiçbir dosyanız sunucuya gitmez, tüm dönüşümler anında cihazınızda gerçekleşir.
        </p>

        {/* Akıllı Evrensel Dosya Bırakma Alanı (Universal Dropzone) */}
        <UniversalDropzone />

        {/* Hızlı Arama Kutusu */}
        <HeroSearchTrigger />

        {/* Hızlı İhtiyaç Kapsülleri (Quick Actions) */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="flex items-center gap-1 text-xs font-medium text-slate-400 dark:text-slate-500">
            <Compass className="h-3 w-3" />
            <span>Hızlı Çözümler:</span>
          </span>
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="inline-flex items-center rounded-xl border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-2xs backdrop-blur-md transition-all hover:border-primary-400 hover:bg-primary-50/40 hover:text-primary-600 dark:border-white/10 dark:bg-obsidian-900/70 dark:text-slate-300 dark:hover:border-primary-500/50 dark:hover:bg-obsidian-850 dark:hover:text-primary-300"
            >
              {action.label}
            </Link>
          ))}
        </div>

        {/* Son Kullanılanlar Barı */}
        <RecentToolsBar />

        {/* Özellik Rozetleri */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 font-medium">
            <Zap className="h-4 w-4 text-primary-500" />
            <span>Sıfır Bekleme, Anında İşlem</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>%100 İstemci Taraflı Gizlilik</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="h-4 w-4 text-violet-500" />
            <span>Üyelik ve Kayıt Zorunluluğu Yok</span>
          </div>
        </div>
      </section>

      {/* Asimetrik Bento Grid Vitrini */}
      <BentoGridShowcase />

      {/* Tüm Araçlar Kitaplığı & Filtreleme (Tools Explorer) */}
      <ToolsExplorer />

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
