import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export function ToolCard({
  title,
  description,
  href,
  icon: Icon,
  badge,
}: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-xs backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-500/50 hover:bg-white hover:shadow-glow-sm dark:border-white/[0.08] dark:bg-obsidian-900/60 dark:hover:border-primary-500/40 dark:hover:bg-obsidian-850"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-all duration-300 group-hover:bg-gradient-to-tr group-hover:from-primary-600 group-hover:to-violet-500 group-hover:text-white group-hover:shadow-md group-hover:shadow-primary-500/25 dark:bg-obsidian-850 dark:text-slate-300 dark:group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-semibold text-slate-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
            {title}
          </h3>
          {badge && (
            <span className="shrink-0 rounded-full bg-primary-100/80 px-2 py-0.5 text-[9px] font-bold text-primary-700 dark:bg-primary-950/80 dark:text-primary-300">
              {badge}
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>

      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:bg-primary-50 group-hover:text-primary-600 dark:text-slate-600 dark:group-hover:bg-primary-950/50 dark:group-hover:text-primary-400">
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
