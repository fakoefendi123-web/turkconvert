"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { tools, categories } from "@/lib/constants/tools";
import { ToolCard } from "@/components/ui/ToolCard";
import { getToolSeo } from "@/lib/constants/tool-seo";

interface ToolPageLayoutProps {
  toolId?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function ToolPageLayout({
  toolId,
  title,
  description,
  children,
}: ToolPageLayoutProps) {
  const pathname = usePathname();

  const pathSlug = pathname ? pathname.replace(/^\//, "").split("/")[0] : "";
  const resolvedToolId = toolId || pathSlug;
  const seo = getToolSeo(resolvedToolId);

  const currentTool = tools.find(
    (t) => t.id === resolvedToolId || t.href === pathname
  );
  const currentCategory = currentTool
    ? categories.find((c) => c.id === currentTool.category)
    : null;

  const displayTitle = seo?.h1 || title || currentTool?.name || "Araç";
  const displayDescription =
    seo?.intro || description || currentTool?.description || "";
  const canonicalUrl = `https://turkconvert.online/${resolvedToolId || (currentTool?.id ?? "")}`;

  const steps = seo?.steps || [
    {
      title: "Dosyanızı Yükleyin",
      description: "Dosyanızı sürükleyin, seçin veya panodan yapıştırın.",
    },
    {
      title: "Dönüştürün",
      description: "İşlem saniyeler içinde doğrudan tarayıcınızda güvenle gerçekleşir.",
    },
    {
      title: "İndirin",
      description: "Dönüştürülen dosyanızı anında cihazınıza kaydedin.",
    },
  ];

  const faqs = seo?.faqs || [
    {
      question: `${displayTitle} işlemi sırasında dosyalarım güvende mi?`,
      answer:
        "Evet, kesinlikle güvende. TurkConvert dosya dönüştürme ve işleme adımlarını doğrudan sizin cihazınızda (tarayıcınızda) gerçekleştirir. Dosyalarınız hiçbir uzak sunucuya aktarılmaz veya kaydedilmez.",
    },
    {
      question: "TurkConvert kullanımı ücretsiz mi ve üyelik gerekli mi?",
      answer:
        "TurkConvert tamamen ücretsizdir. Herhangi bir üyelik, kayıt veya kart bilgisi gerektirmez ve reklamsız olarak hizmet verir.",
    },
    {
      question: "Dönüştürme sırasında kalite kaybı yaşanır mı?",
      answer:
        "Gelişmiş algoritmalarımız sayesinde dönüştürme ve sıkıştırma işlemleri görsel ve metin kalitesini maksimum düzeyde koruyacak şekilde optimize edilir.",
    },
  ];

  const relatedTools = currentTool
    ? tools
        .filter(
          (t) => t.category === currentTool.category && t.id !== currentTool.id
        )
        .slice(0, 3)
    : [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
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
          {displayTitle}
        </span>
      </nav>

      {/* Başlık (H1) & Açıklama */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          {displayTitle}
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
          {displayDescription}
        </p>
      </div>

      {/* Araç içeriği */}
      <div className="card p-6 sm:p-8">{children}</div>

      {/* Format Hakkında / Nedir? (SEO & Bilgi Bölümü) */}
      {seo && seo.aboutTitle && seo.aboutContent && (
        <section className="mt-12 rounded-2xl border border-gray-200/80 bg-gradient-to-br from-gray-50/80 to-gray-50/30 p-6 dark:border-gray-800 dark:from-gray-900/40 dark:to-gray-900/10 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
            {seo.aboutTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
            {seo.aboutContent}
          </p>
        </section>
      )}

      {/* Nasıl Kullanılır? (Adım Adım Rehber) */}
      <section className="mt-12 border-t border-gray-200 pt-10 dark:border-gray-800">
        <h2 className="mb-6 text-center text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
          {displayTitle} Nasıl Kullanılır?
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 bg-gray-50/60 p-4 text-center dark:border-gray-800 dark:bg-gray-900/40"
            >
              <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                {index + 1}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sıkça Sorulan Sorular (FAQ) */}
      <section className="mt-12 border-t border-gray-200 pt-10 dark:border-gray-800">
        <h2 className="mb-6 text-center text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
          Sıkça Sorulan Sorular
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-xl border border-gray-200 bg-white p-4 open:shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <summary className="cursor-pointer font-medium text-sm text-gray-900 dark:text-gray-100">
                {faq.question}
              </summary>
              <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
                {faq.answer}
              </p>
            </details>
          ))}
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
              name: `${displayTitle} | TurkConvert`,
              url: canonicalUrl,
              description: seo?.description || displayDescription,
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
                  name: displayTitle,
                  item: canonicalUrl,
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]),
        }}
      />
    </div>
  );
}
