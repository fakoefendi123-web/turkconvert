"use client";

import { Search } from "lucide-react";

export function HeroSearchTrigger() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("open-search-palette"));
  };

  return (
    <div className="mx-auto mt-8 max-w-lg">
      <button
        onClick={handleClick}
        className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm text-gray-400 shadow-sm transition-all hover:border-primary-400 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/80 dark:hover:border-primary-500"
      >
        <div className="flex items-center gap-3">
          <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          <span>DÃ¶nÃ¼ÅŸtÃ¼rmek istediÄŸiniz aracÄ± arayÄ±n...</span>
        </div>
        <kbd className="hidden rounded-md border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:inline-block">
          Ctrl K
        </kbd>
      </button>
    </div>
  );
}
