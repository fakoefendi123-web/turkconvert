"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { tools, categories } from "@/lib/constants/tools";

interface SearchCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchCommandPalette({
  isOpen,
  onClose,
}: SearchCommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global Ctrl + K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open triggered by parent state or custom event
          const event = new CustomEvent("open-search-palette");
          window.dispatchEvent(event);
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredTools = useMemo(() => {
    if (!query.trim()) {
      return tools.slice(0, 8); // varsayÄ±lan popÃ¼ler araÃ§lar
    }
    const q = query.toLowerCase().trim();
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSelect = (href: string) => {
    // Son kullanÄ±lanlara kaydet
    try {
      const recents: string[] = JSON.parse(
        localStorage.getItem("tc_recent_tools") || "[]"
      );
      const updated = [href, ...recents.filter((h) => h !== href)].slice(0, 5);
      localStorage.setItem("tc_recent_tools", JSON.stringify(updated));
    } catch {}

    onClose();
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredTools.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredTools.length - 1
      );
    } else if (e.key === "Enter" && filteredTools[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredTools[selectedIndex].href);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-16 backdrop-blur-sm sm:pt-24">
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Arama Input */}
        <div className="flex items-center border-b border-gray-200 px-4 py-3.5 dark:border-gray-800">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="AraÃ§ ara... (Ã–rn: JPG, PNG, PDF, JSON, QR)"
            className="flex-1 bg-transparent px-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none dark:text-white"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="hidden rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:inline-block">
              ESC
            </kbd>
          )}
        </div>

        {/* SonuÃ§ Listesi */}
        <div className="max-h-96 overflow-y-auto p-2">
          {!query.trim() && (
            <div className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500">
              <Sparkles className="h-3 w-3" />
              <span>Ã–NERÄ°LEN ARAÃ‡LAR</span>
            </div>
          )}

          {filteredTools.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
              &quot;{query}&quot; ile eÅŸleÅŸen bir araÃ§ bulunamadÄ±.
            </div>
          ) : (
            <div className="space-y-1">
              {filteredTools.map((tool, index) => {
                const isSelected = index === selectedIndex;
                const Icon = tool.icon;
                const categoryObj = categories.find(
                  (c) => c.id === tool.category
                );

                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelect(tool.href)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                      isSelected
                        ? "bg-primary-50 text-primary-900 dark:bg-primary-950/40 dark:text-primary-200"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/60"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isSelected
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                          {tool.name}
                        </span>
                        {categoryObj && (
                          <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                            {categoryObj.name}
                          </span>
                        )}
                      </div>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {tool.description}
                      </p>
                    </div>

                    <ArrowRight
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        isSelected
                          ? "translate-x-0.5 text-primary-600 dark:text-primary-400"
                          : "opacity-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Alt KÄ±sayol Bilgisi */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-2 text-[11px] text-gray-500 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-400">
          <span>
            Gezinmek iÃ§in <kbd className="font-semibold">â†‘</kbd>{" "}
            <kbd className="font-semibold">â†“</kbd>, seÃ§mek iÃ§in{" "}
            <kbd className="font-semibold">Enter</kbd>
          </span>
          <span>turkconvert</span>
        </div>
      </div>
    </div>
  );
}
