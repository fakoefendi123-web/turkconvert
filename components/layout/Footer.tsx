import Link from "next/link";

const footerLinks = [
  { href: "/#araclar", label: "Araçlar" },
  { href: "/gizlilik", label: "Gizlilik" },
  { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
  { href: "/iletisim", label: "İletişim" },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold text-gray-900 dark:text-white"
          >
            turk<span className="text-primary-600 dark:text-primary-400">convert</span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-6 text-center dark:border-gray-800">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            © 2026 turkconvert. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}

