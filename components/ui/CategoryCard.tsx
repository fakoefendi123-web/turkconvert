import Link from "next/link";
import { type LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export function CategoryCard({
  title,
  description,
  icon: Icon,
  href,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="card group flex flex-col items-start gap-4 p-6"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-900/30 dark:text-primary-400 dark:group-hover:bg-primary-500 dark:group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </Link>
  );
}
