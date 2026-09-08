import type { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, Crown, Sparkles, ArrowRight } from "lucide-react";
import { RoyalNoticeBanner } from "@/components/ui/RoyalNoticeBanner";
import { KickStreamEmbed } from "@/components/ui/KickStreamEmbed";

export const metadata: Metadata = {
  title: "Yüce Efendimiz - Prens Hazretleri Canlı Yayını ve Bildirisi",
  description:
    "Yüce ve kutsal efendimiz Prens Hazretleri’nin kutlu emri üzerine açılan ve asil halkının hizmetine sunulan en üstün teknolojimiz ve resmi Kick canlı yayını.",
  alternates: {
    canonical: "https://turkconvert.online/yuce-efendimiz",
  },
  openGraph: {
    title: "Yüce Efendimiz - Prens Hazretleri Canlı Yayını | TurkConvert",
    description:
      "Yüce ve kutsal efendimiz Prens Hazretleri’nin kutlu emri üzerine açılan ve asil halkının hizmetine sunulan en üstün teknolojimiz.",
    url: "https://turkconvert.online/yuce-efendimiz",
    siteName: "TurkConvert",
    type: "website",
    locale: "tr_TR",
  },
};

export default function YuceEfendimizPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center text-xs text-gray-500 dark:text-gray-400 sm:text-sm"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
        >
          <Home className="h-3.5 w-3.5" />
          <span>Ana Sayfa</span>
        </Link>
        <ChevronRight className="mx-2 h-3.5 w-3.5 text-gray-400" />
        <span className="font-medium text-amber-600 dark:text-amber-400">
          Yüce Efendimiz
        </span>
      </nav>

      {/* Majestik Bildiri ve Partikül Panosu */}
      <RoyalNoticeBanner />

      {/* Canlı Yayın & Sohbet Bölümü */}
      <section className="mt-8">
        <KickStreamEmbed />
      </section>

      {/* Alt Hızlı Araçlar Bağlantısı */}
      <div className="mt-14 rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50 p-6 text-center shadow-sm dark:border-gray-800 dark:from-gray-900/50 dark:via-gray-900/80 dark:to-gray-900/50 sm:p-8">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
          <Sparkles className="h-5 w-5" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white sm:text-lg">
          Halkın Hizmetine Sunulan Ücretsiz Dönüştürme Araçları
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          Görsel, PDF, metin ve geliştirici araçlarını reklamsız, üyeliksiz ve tamamen tarayıcınızda güvenle kullanın.
        </p>
        <div className="mt-5">
          <Link
            href="/#araclar"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-primary-600/20 transition-all hover:bg-primary-700 hover:shadow-primary-600/30 sm:text-sm"
          >
            <span>Tüm Araçları Keşfet</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
