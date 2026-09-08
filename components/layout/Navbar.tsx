"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchCommandPalette } from "@/components/ui/SearchCommandPalette";

const navLinks = [
  { href: "/#araclar", label: "Araçlar" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/gizlilik", label: "Gizlilik" },
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
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            turk<span className="text-primary-600 dark:text-primary-400">convert</span>
          </Link>

          {/* Desktop Navigation & Search */}
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/80 px-3 py-1.5 text-xs text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-gray-700"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Araç ara...</span>
              <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                Ctrl K
              </kbd>
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <div className="ml-1 border-l border-gray-200 pl-2 dark:border-gray-800">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Ara"
            >
              <Search className="h-5 w-5" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
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
