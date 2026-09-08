import type { Metadata } from "next";
import { categories, getToolsByCategory } from "@/lib/constants/tools";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { ToolCard } from "@/components/ui/ToolCard";
import { HeroSearchTrigger } from "@/components/ui/HeroSearchTrigger";
import { RecentToolsBar } from "@/components/ui/RecentToolsBar";
import { Zap, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Ãœcretsiz Online Dosya DÃ¶nÃ¼ÅŸtÃ¼rme AraÃ§larÄ±",
  description:
    "GÃ¶rsellerinizi, PDF dosyalarÄ±nÄ±zÄ± ve metinlerinizi tarayÄ±cÄ±nÄ±zda Ã¼cretsiz, hÄ±zlÄ± ve gÃ¼venle dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n. ReklamsÄ±z, Ã¼yelik ve kurulum gerektirmez.",
  openGraph: {
    title: "turkconvert â€” Ãœcretsiz Online Dosya DÃ¶nÃ¼ÅŸtÃ¼rme AraÃ§larÄ±",
    description:
      "Ãœcretsiz, hÄ±zlÄ± ve reklamsÄ±z dosya dÃ¶nÃ¼ÅŸtÃ¼rme araÃ§larÄ±. TarayÄ±cÄ±nÄ±zda gÃ¼venli dÃ¶nÃ¼ÅŸtÃ¼rme.",
  },
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Hero BÃ¶lÃ¼mÃ¼ */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold text-primary-700 dark:bg-primary-950/50 dark:text-primary-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>HÄ±zlÄ±, GÃ¼venli ve Tamamen Ãœcretsiz</span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          DosyalarÄ±nÄ±zÄ± kolayca dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg">
          Ãœcretsiz, hÄ±zlÄ± ve reklamsÄ±z dosya dÃ¶nÃ¼ÅŸtÃ¼rme araÃ§larÄ±.
        </p>

        {/* HÄ±zlÄ± Arama Kutusu */}
        <HeroSearchTrigger />

        {/* Son KullanÄ±lanlar */}
        <RecentToolsBar />

        {/* Ã–zellik Rozetleri */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-primary-500" />
            <span>AnÄ±nda Ä°ÅŸlem</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary-500" />
            <span>TarayÄ±cÄ±da GÃ¼venli DÃ¶nÃ¼ÅŸtÃ¼rme</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-primary-500" />
            <span>Ãœyelik Gerekmez</span>
          </div>
        </div>
      </section>

      {/* Kategori KartlarÄ± Grid */}
      <section id="araclar" className="mt-12 scroll-mt-20">
        <h2 className="sr-only">AraÃ§ Kategorileri</h2>
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

      {/* Kategori BazlÄ± AraÃ§ Listeleri */}
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
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
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
                name: "turkconvert",
                description:
                  "Ãœcretsiz, hÄ±zlÄ± ve reklamsÄ±z dosya dÃ¶nÃ¼ÅŸtÃ¼rme araÃ§larÄ±. GÃ¶rsel, PDF, metin ve yazÄ±lÄ±mcÄ± araÃ§larÄ±.",
                inLanguage: "tr-TR",
              },
              {
                "@type": "Organization",
                "@id": "https://turkconvert.online/#organization",
                name: "turkconvert",
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

