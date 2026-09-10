import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";

const popularTools = [
  { href: "/image-compressor", label: "Görsel Sıkıştırıcı" },
  { href: "/seffaf-imza", label: "Şeffaf İmza Oluşturucu" },
  { href: "/qr-code-generator", label: "QR Kod Stüdyosu" },
  { href: "/fatura-olusturucu", label: "PDF Fatura Oluşturucu" },
  { href: "/belge-sansurleyici", label: "Gizli Belge Sansürleyici" },
  { href: "/image-compare", label: "Görsel Karşılaştırıcı" },
  { href: "/jpg-to-png", label: "JPG to PNG" },
  { href: "/png-to-webp", label: "PNG to WEBP" },
  { href: "/image-to-pdf", label: "Görselleri PDF Yap" },
  { href: "/diff-checker", label: "Metin Farkı Bulucu" },
];

const legalLinks = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/gizlilik", label: "Gizlilik Politikası" },
  { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
  { href: "/iletisim", label: "İletişim" },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50/90 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-400">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Marka & Misyon */}
          <div className="space-y-3 sm:col-span-2">
            <Link
              href="/"
              className="text-lg font-bold text-gray-900 dark:text-white"
            >
              turk<span className="text-primary-600 dark:text-primary-400">convert</span>
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              Türkiye&apos;nin en kapsamlı, güvenli ve ücretsiz online dosya dönüştürme ve düzenleme platformu. Dosyalarınız sunucuya gitmez, gizliliğiniz %100 korunur.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-green-600 dark:text-green-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Sıfır Veritabanı • %100 İstemci Taraflı Gizlilik</span>
            </div>
          </div>

          {/* Popüler Araçlar */}
          <div>
            <h4 className="mb-3 font-semibold uppercase tracking-wider text-gray-900 dark:text-white text-[11px]">
              Popüler Araçlar
            </h4>
            <ul className="space-y-2">
              {popularTools.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hızlı Bağlantılar & Kurumsal */}
          <div>
            <h4 className="mb-3 font-semibold uppercase tracking-wider text-gray-900 dark:text-white text-[11px]">
              Kurumsal & Yasal
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Telif & Alt Bar */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center dark:border-gray-800">
          <p className="text-[11px] text-gray-400 dark:text-gray-500">
            © 2026 TurkConvert (turkconvert.online). Tüm hakları saklıdır. Reklamsız, üyeliksiz ve ücretsiz.
          </p>
        </div>
      </div>
    </footer>
  );
}
