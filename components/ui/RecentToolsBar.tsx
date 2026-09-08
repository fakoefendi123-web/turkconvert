"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { tools } from "@/lib/constants/tools";

export function RecentToolsBar() {
  const [recentHrefs, setRecentHrefs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("tc_recent_tools") || "[]"
      );
      if (Array.isArray(stored)) {
        setRecentHrefs(stored);
      }
    } catch {}
  }, []);

  const matchedTools = recentHrefs
    .map((href) => tools.find((t) => t.href === href))
    .filter(Boolean);

  if (matchedTools.length === 0) return null;

  return (
    <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-xs">
      <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
        <Clock className="h-3.5 w-3.5" />
        <span>Son Kullanılanlar:</span>
      </div>
      {matchedTools.map((tool) => (
        <Link
          key={tool!.id}
          href={tool!.href}
          className="rounded-full border border-gray-200 bg-white px-3 py-1 font-medium text-gray-700 shadow-sm transition hover:border-primary-400 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-primary-400"
        >
          {tool!.name}
        </Link>
      ))}
    </div>
  );
}
