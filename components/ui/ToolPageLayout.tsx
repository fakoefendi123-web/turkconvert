"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { tools, categories } from "@/lib/constants/tools";
import { ToolCard } from "@/components/ui/ToolCard";

interface ToolPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ToolPageLayout({
  title,
  description,
  children,
}: ToolPageLayoutProps) {
  const pathname = usePathname();

  const currentTool = tools.find((t) => t.href === pathname);
  const currentCategory = currentTool
    ? categories.find((c) => c.id === currentTool.category)
    : null;

  const relatedTools = currentTool
    ? tools
        .filter((t) => t.category === currentTool.category && t.id !== currentTool.id)
        .slice(0, 3)
    : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-1 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
        >
          <Home className="h-3.5 w-3.5" />
          <span>Ana Sayfa</span>
        </Link>

        {currentCategory && (
          <>
            <ChevronRight className="mx-2 h-3.5 w-3.5 text-gray-400" />
            <Link
              href={`/#${currentCategory.anchor}`}
              className="transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            >
              {currentCategory.name}
            </Link>
          </>
        )}

        <ChevronRight className="mx-2 h-3.5 w-3.5 text-gray-400" />
        <span className="font-medium text-gray-900 dark:text-white">
          {title}
        </span>
      </nav>

      {/* Başlık */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
          {description}
        </p>
      </div>

      {/* Araç içeriği */}
      <div className="card p-6 sm:p-8">{children}</div>

      {/* Nasıl Kullanılır? (SEO & UX) */}
      <section className="mt-14 border-t border-gray-200 pt-10 dark:border-gray-800">
        <h2 className="mb-6 text-center text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
          {title} Nasıl Kullanılır?
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4 text-center dark:border-gray-800 dark:bg-gray-900/40">
            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-600 dark:bg-primary-950 dark:text-primary-400">
              1
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Dosyanızı Yükleyin
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Dosyanızı sürükleyin, seçin veya Ctrl+V ile panodan yapıştırın.
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4 text-center dark:border-gray-800 dark:bg-gray-900/40">
            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-600 dark:bg-primary-950 dark:text-primary-400">
              2
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Dönüştürün
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              İşlem saniyeler içinde doğrudan tarayıcınızda güvenle gerçekleşir.
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4 text-center dark:border-gray-800 dark:bg-gray-900/40">
            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-600 dark:bg-primary-950 dark:text-primary-400">
              3
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              İndirin
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Dönüştürülen dosyanızı anında veya toplu ZIP olarak cihazınıza kaydedin.
            </p>
          </div>
        </div>
      </section>

      {/* Sıkça Sorulan Sorular (FAQ) & Schema */}
      <section className="mt-12 border-t border-gray-200 pt-10 dark:border-gray-800">
        <h2 className="mb-6 text-center text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
          Sıkça Sorulan Sorular
        </h2>
        <div className="space-y-3">
          <details className="group rounded-xl border border-gray-200 bg-white p-4 open:shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <summary className="cursor-pointer font-medium text-sm text-gray-900 dark:text-gray-100">
              {title} işlemi sırasında dosyalarım güvende mi?
            </summary>
            <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
              Evet, kesinlikle güvende. turkconvert dosya dönüştürme ve işleme
              adımlarını doğrudan sizin cihazınızda (tarayıcınızda)
              gerçekleştirir. Dosyalarınız hiçbir uzak sunucuya aktarılmaz veya
              kaydedilmez.
            </p>
          </details>

          <details className="group rounded-xl border border-gray-200 bg-white p-4 open:shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <summary className="cursor-pointer font-medium text-sm text-gray-900 dark:text-gray-100">
              turkconvert kullanımı ücretsiz mi ve üyelik gerekli mi?
            </summary>
            <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
              turkconvert tamamen ücretsizdir. Herhangi bir üyelik, kayıt veya
              kart bilgisi gerektirmez ve reklamsız olarak hizmet verir.
            </p>
          </details>

          <details className="group rounded-xl border border-gray-200 bg-white p-4 open:shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <summary className="cursor-pointer font-medium text-sm text-gray-900 dark:text-gray-100">
              Dönüştürme sırasında kalite kaybı yaşanır mı?
            </summary>
            <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
              Gelişmiş algoritmalarımız sayesinde dönüştürme ve sıkıştırma
              işlemleri görsel ve metin kalitesini maksimum düzeyde koruyacak
              şekilde optimize edilir.
            </p>
          </details>
        </div>
      </section>

      {/* İlgili Araçlar */}
      {relatedTools.length > 0 && (
        <section className="mt-12 border-t border-gray-200 pt-10 dark:border-gray-800">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
              İlgili Araçlar
            </h2>
            {currentCategory && (
              <Link
                href={`/#${currentCategory.anchor}`}
                className="text-xs font-semibold text-primary-600 hover:underline dark:text-primary-400 sm:text-sm"
              >
                Tümünü Gör →
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {relatedTools.map((tool) => (
              <ToolCard
                key={tool.id}
                title={tool.name}
                description={tool.description}
                href={tool.href}
                icon={tool.icon}
              />
            ))}
          </div>
        </section>
      )}

      {/* Google Yapılandırılmış Veri (JSON-LD Schemas) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: `${title} | turkconvert`,
              url: `https://turkconvert.online${pathname}`,
              description: description,
              applicationCategory: "UtilityApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "TRY",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Ana Sayfa",
                  item: "https://turkconvert.online",
                },
                ...(currentCategory
                  ? [
                      {
                        "@type": "ListItem",
                        position: 2,
                        name: currentCategory.name,
                        item: `https://turkconvert.online/#${currentCategory.anchor}`,
                      },
                    ]
                  : []),
                {
                  "@type": "ListItem",
                  position: currentCategory ? 3 : 2,
                  name: title,
                  item: `https://turkconvert.online${pathname}`,
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: `${title} işlemi sırasında dosyalarım güvende mi?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Evet, kesinlikle güvende. turkconvert dosya dönüştürme ve işleme adımlarını doğrudan sizin cihazınızda (tarayıcınızda) gerçekleştirir. Dosyalarınız hiçbir uzak sunucuya aktarılmaz veya kaydedilmez.",
                  },
                },
                {
                  "@type": "Question",
                  name: "turkconvert kullanımı ücretsiz mi ve üyelik gerekli mi?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "turkconvert tamamen ücretsizdir. Herhangi bir üyelik, kayıt veya kart bilgisi gerektirmez ve reklamsız olarak hizmet verir.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Dönüştürme sırasında kalite kaybı yaşanır mı?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Gelişmiş algoritmalarımız sayesinde dönüştürme ve sıkıştırma işlemleri görsel ve metin kalitesini maksimum düzeyde koruyacak şekilde optimize edilir.",
                  },
                },
              ],
            },
          ]),
        }}
      />
    </div>
  );
}
