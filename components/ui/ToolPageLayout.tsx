import Link from "next/link";
import { ChevronRight, Home, ChevronDown } from "lucide-react";
import { tools, categories } from "@/lib/constants/tools";
import { getToolSeo } from "@/lib/constants/tool-seo";
import { ToolCard } from "@/components/ui/ToolCard";

interface ToolPageLayoutProps {
  toolId: string;
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
  const currentTool = tools.find((t) => t.id === toolId);
  const currentCategory = categories.find(
    (c) => c.id === currentTool?.category
  );
  const seo = getToolSeo(toolId);

  const displayTitle = title || seo?.h1 || currentTool?.name || "Araç";
  const displayDescription =
    description || seo?.intro || currentTool?.description || "";

  const steps = seo?.steps || [
    {
      title: "Dosyanızı Seçin",
      description: "İşlem yapmak istediğiniz dosyayı yükleyin veya sürükleyip bırakın.",
    },
    {
      title: "Ayarları Belirleyin",
      description: "İhtiyacınıza göre kalite, format veya seçenekleri ayarlayın.",
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
        "TurkConvert tamamen ücretsizdir. Herhangi bir üyelik, kayıt veya kart bilgisi gerektirmez; tüm araçlara doğrudan ve sınırsız erişebilirsiniz.",
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
    <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center text-xs font-medium text-slate-500 dark:text-slate-400"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <Home className="h-3.5 w-3.5" />
          <span>Ana Sayfa</span>
        </Link>

        {currentCategory && (
          <>
            <ChevronRight className="mx-1 h-3.5 w-3.5 text-slate-400" />
            <Link
              href="/#araclar"
              className="rounded-lg px-2 py-1 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {currentCategory.name}
            </Link>
          </>
        )}

        <ChevronRight className="mx-1 h-3.5 w-3.5 text-slate-400" />
        <span className="rounded-lg bg-slate-100 px-2 py-1 font-semibold text-slate-900 dark:bg-obsidian-850 dark:text-white">
          {displayTitle}
        </span>
      </nav>

      {/* Başlık (H1) & Açıklama */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {displayTitle}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
          {displayDescription}
        </p>
      </div>

      {/* Ana Araç Stüdyo Çalışma Alanı (Studio Canvas) */}
      <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/85 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-2xl dark:border-white/10 dark:bg-obsidian-900/75 dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] sm:p-10">
        {children}
      </div>

      {/* Format Hakkında / Nedir? (SEO & Bilgi Bölümü) */}
      {seo && seo.aboutTitle && seo.aboutContent && (
        <section className="mt-14 rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 p-6 dark:border-white/10 dark:from-obsidian-900/60 dark:to-obsidian-950/60 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
            {seo.aboutTitle}
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
            {seo.aboutContent}
          </p>
        </section>
      )}

      {/* Nasıl Kullanılır? (Adım Adım Rehber) */}
      <section className="mt-14 border-t border-slate-200/80 pt-10 dark:border-white/10">
        <h2 className="mb-6 text-center text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
          {displayTitle} Nasıl Kullanılır?
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 text-center backdrop-blur-md dark:border-white/10 dark:bg-obsidian-900/50"
            >
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-violet-500 text-xs font-bold text-white shadow-md shadow-primary-500/30">
                {index + 1}
              </div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sıkça Sorulan Sorular (FAQ) */}
      <section className="mt-14 border-t border-slate-200/80 pt-10 dark:border-white/10">
        <h2 className="mb-6 text-center text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
          Sıkça Sorulan Sorular
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-2xl border border-slate-200/80 bg-white/80 p-4 transition-all open:border-primary-500/40 open:shadow-xs dark:border-white/10 dark:bg-obsidian-900/60"
            >
              <summary className="cursor-pointer font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center justify-between list-none">
                <span>{faq.question}</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* İlgili Araçlar */}
      {relatedTools.length > 0 && (
        <section className="mt-14 border-t border-slate-200/80 pt-10 dark:border-white/10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
              İlgili Araçlar
            </h2>
            {currentCategory && (
              <Link
                href="/#araclar"
                className="text-xs font-semibold text-primary-600 hover:underline dark:text-primary-400"
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

      {/* Schema.org FAQ structured data */}
      {seo && seo.faqs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: seo.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
      )}
    </div>
  );
}
