"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SearchCommandPalette } from "@/components/ui/SearchCommandPalette";

const navLinks = [
  { href: "/#araclar", label: "Tüm Araçlar" },
  { href: "/heic-to-jpg", label: "HEIC to JPG", isNew: true },
  { href: "/pdf-merge", label: "PDF Birleştir", isNew: true },
  { href: "/seffaf-imza", label: "Şeffaf İmza" },
  { href: "/kdv-hesaplayici", label: "KDV Hesapla" },
  { href: "/hakkimizda", label: "Hakkımızda" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsSearchOpen(true);
    window.addEventListener("open-search-palette", handleOpen);
    return () => window.removeEventListener("open-search-palette", handleOpen);
  }, []);

  return (
    <>
      <header className="sticky top-3 z-50 w-full px-3 sm:px-6 transition-all">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border border-slate-200/80 bg-white/75 px-4 shadow-lg shadow-slate-900/5 backdrop-blur-2xl transition-all dark:border-white/10 dark:bg-obsidian-900/80 dark:shadow-[0_10px_35px_-5px_rgba(0,0,0,0.5)]">
          {/* Logo */}
          <BrandLogo size="sm" />

          {/* Desktop Navigation & Search */}
          <div className="hidden items-center gap-1.5 md:flex">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="group flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3 py-1.5 text-xs text-slate-500 transition-all hover:border-primary-400 hover:bg-white hover:text-slate-800 dark:border-white/10 dark:bg-obsidian-850/80 dark:text-slate-400 dark:hover:border-primary-500/50 dark:hover:bg-obsidian-800 dark:hover:text-white"
            >
              <Search className="h-3.5 w-3.5 transition-colors group-hover:text-primary-500" />
              <span>Araç ara...</span>
              <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 shadow-xs dark:border-white/10 dark:bg-obsidian-950 dark:text-slate-500">
                Ctrl K
              </kbd>
            </button>

            <div className="mx-1 h-4 w-px bg-slate-200 dark:bg-white/10" />

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-white"
              >
                <span>{link.label}</span>
                {link.isNew && (
                  <span className="flex items-center gap-0.5 rounded-full bg-gradient-to-r from-primary-500/15 to-violet-500/15 px-1.5 py-0.2 text-[9px] font-bold text-primary-600 border border-primary-500/20 dark:from-primary-400/20 dark:to-violet-400/20 dark:text-primary-300">
                    <Sparkles className="h-2 w-2" />
                    Yeni
                  </span>
                )}
              </Link>
            ))}

            <div className="ml-1 border-l border-slate-200 pl-2 dark:border-white/10">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
              aria-label="Ara"
            >
              <Search className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
              aria-label="Menüyü aç"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-3 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-obsidian-900/95 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <span>{link.label}</span>
                  {link.isNew && (
                    <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-bold text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                      Yeni
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <SearchCommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
