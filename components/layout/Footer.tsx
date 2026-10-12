import Link from "next/link";
import { ShieldCheck, Sparkles, Terminal } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

const popularTools = [
  { href: "/heic-to-jpg", label: "HEIC to JPG (iPhone)" },
  { href: "/pdf-merge", label: "PDF Birleştirici" },
  { href: "/pdf-split", label: "PDF Sayfa Ayırıcı" },
  { href: "/image-compressor", label: "Görsel Sıkıştırıcı" },
  { href: "/kdv-hesaplayici", label: "KDV & Tevkifat Hesapla" },
  { href: "/iban-dogrulayici", label: "IBAN Doğrulayıcı" },
  { href: "/seffaf-imza", label: "Şeffaf İmza Oluşturucu" },
  { href: "/qr-code-generator", label: "QR Kod Stüdyosu" },
  { href: "/fatura-olusturucu", label: "PDF Fatura Oluşturucu" },
  { href: "/sayiyi-yaziya-cevir", label: "Yazıyla Sayı & Para" },
];

const legalLinks = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/gizlilik", label: "Gizlilik Politikası" },
  { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
  { href: "/iletisim", label: "İletişim" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-white/60 text-xs text-slate-500 backdrop-blur-xl dark:border-white/10 dark:bg-obsidian-950/80 dark:text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Marka & Misyon */}
          <div className="space-y-4 sm:col-span-2">
            <BrandLogo size="md" />
            <p className="max-w-sm text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Türkiye&apos;nin en kapsamlı, güvenli ve ücretsiz online dosya dönüştürme ve düzenleme stüdyosu. Dosyalarınız sunucuya gitmez, gizliliğiniz %100 yerel korunur.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Tüm Modüller Çevrimdışı Aktif</span>
              </div>
              <div className="inline-flex items-center gap-1 text-slate-400 dark:text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Sıfır Veritabanı • %100 İstemci Taraflı</span>
              </div>
            </div>
          </div>

          {/* Popüler Araçlar */}
          <div>
            <h4 className="mb-3 font-semibold uppercase tracking-wider text-slate-900 text-[11px] dark:text-white">
              Popüler Araçlar
            </h4>
            <ul className="space-y-2">
              {popularTools.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hızlı Bağlantılar & Kurumsal */}
          <div>
            <h4 className="mb-3 font-semibold uppercase tracking-wider text-slate-900 text-[11px] dark:text-white">
              Kurumsal & Yasal
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Telif & Alt Bar */}
        <div className="mt-12 border-t border-slate-200/80 pt-6 text-center dark:border-white/10">
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            © 2026 TurkConvert (turkconvert.online). Tüm hakları saklıdır. Üyeliksiz, güvenli ve ücretsiz.
          </p>
        </div>
      </div>
    </footer>
  );
}
