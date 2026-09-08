import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export function ToolCard({ title, description, href, icon: Icon }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="card group flex items-center gap-4 p-4"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-primary-500 dark:text-gray-600 dark:group-hover:text-primary-400" />
    </Link>
  );
}
