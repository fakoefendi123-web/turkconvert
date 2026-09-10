"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  tools,
  categories,
  getToolsByCategory,
  type ToolCategory,
} from "@/lib/constants/tools";
import { ToolCard } from "@/components/ui/ToolCard";
import {
  LayoutGrid,
  List,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Filter,
} from "lucide-react";

const NEW_TOOL_IDS = new Set([
  "seffaf-imza",
  "belge-sansurleyici",
  "fatura-olusturucu",
  "image-compare",
  "diff-checker",
  "qr-code-generator",
]);

const POPULAR_TOOL_IDS = new Set([
  "image-compressor",
  "qr-code-generator",
  "seffaf-imza",
  "fatura-olusturucu",
  "belge-sansurleyici",
  "image-to-pdf",
  "png-to-jpg",
  "json-formatter",
  "diff-checker",
]);

export function ToolsExplorer() {
  const [activeCategory, setActiveCategory] = useState<"all" | ToolCategory>("all");
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryOptions = useMemo(() => {
    return [
      {
        id: "all" as const,
        name: "Tüm Araçlar",
        count: tools.length,
        icon: Sparkles,
      },
      ...categories.map((c) => ({
        id: c.id,
        name: c.name,
        count: getToolsByCategory(c.id).length,
        icon: c.icon,
      })),
    ];
  }, []);

  const currentCategoryTools = useMemo(() => {
    if (activeCategory === "all") {
      // Prioritize popular tools at the top when in "all" view
      return [...tools].sort((a, b) => {
        const aPop = POPULAR_TOOL_IDS.has(a.id) ? 1 : 0;
        const bPop = POPULAR_TOOL_IDS.has(b.id) ? 1 : 0;
        return bPop - aPop;
      });
    }
    return getToolsByCategory(activeCategory);
  }, [activeCategory]);

  const COLLAPSED_LIMIT = activeCategory === "all" ? 9 : 6;
  const hasMore = currentCategoryTools.length > COLLAPSED_LIMIT;
  const displayedTools = isExpanded || !hasMore
    ? currentCategoryTools
    : currentCategoryTools.slice(0, COLLAPSED_LIMIT);

  const remainingCount = currentCategoryTools.length - COLLAPSED_LIMIT;

  return (
    <section id="araclar" className="mt-16 scroll-mt-20">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
              Araçlar Kitaplığı
            </h2>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            İhtiyacınız olan aracı kategoriye göre filtreleyin veya kompakt görünüme geçin.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 self-start rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-800 dark:bg-gray-900 sm:self-auto">
          <button
            onClick={() => setViewMode("grid")}
            aria-label="Kart Görünümü"
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
              viewMode === "grid"
                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Kart</span>
          </button>
          <button
            onClick={() => setViewMode("compact")}
            aria-label="Kompakt Liste Görünümü"
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
              viewMode === "compact"
                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <List className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Kompakt</span>
          </button>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoryOptions.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setIsExpanded(false); // Reset expansion on category change for cleanliness
              }}
              className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                isActive
                  ? "bg-primary-600 text-white shadow-md shadow-primary-500/20 dark:bg-primary-500"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{cat.name}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tools Content */}
      <div className="mt-6">
        {viewMode === "grid" ? (
          /* Grid View (Standard ToolCard) */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedTools.map((tool) => (
              <ToolCard
                key={tool.id}
                title={tool.name}
                description={tool.description}
                href={tool.href}
                icon={tool.icon}
                badge={
                  NEW_TOOL_IDS.has(tool.id)
                    ? "Yeni"
                    : POPULAR_TOOL_IDS.has(tool.id) && activeCategory === "all"
                    ? "Popüler"
                    : undefined
                }
              />
            ))}
          </div>
        ) : (
          /* Compact View (Minimalist List) */
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {displayedTools.map((tool) => {
              const Icon = tool.icon;
              const isNew = NEW_TOOL_IDS.has(tool.id);

              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 shadow-sm transition-all hover:border-primary-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-700"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-950/40 dark:text-primary-400 dark:group-hover:bg-primary-600 dark:group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-xs font-semibold text-gray-900 dark:text-white sm:text-sm">
                          {tool.name}
                        </span>
                        {isNew && (
                          <span className="rounded bg-primary-100 px-1 py-0.2 text-[9px] font-bold text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                            Yeni
                          </span>
                        )}
                      </div>
                      <span className="block truncate text-[11px] text-gray-400">
                        {tool.description}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-500 dark:text-gray-600 dark:group-hover:text-primary-400" />
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Expand / Collapse Action Button */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3 text-xs font-semibold text-gray-700 shadow-sm transition-all hover:border-primary-300 hover:bg-primary-50/50 hover:text-primary-700 hover:shadow dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-primary-700 dark:hover:bg-primary-950/30 dark:hover:text-primary-300 sm:text-sm"
          >
            {isExpanded ? (
              <>
                <span>Daha Az Göster</span>
                <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              </>
            ) : (
              <>
                <span>
                  {activeCategory === "all"
                    ? `Tüm ${tools.length} Aracı Keşfet (+${remainingCount} Araç)`
                    : `Kalan ${remainingCount} Aracı Göster`}
                </span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
