import Link from "next/link";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function BrandLogo({
  size = "md",
  showText = true,
  className = "",
}: BrandLogoProps) {
  const iconDimensions = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  }[size];

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }[size];

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 transition-transform active:scale-95 ${className}`}
    >
      {/* Geometrik Modern Monogram SVG */}
      <div
        className={`relative ${iconDimensions} flex items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 via-indigo-600 to-violet-500 p-0.5 shadow-md shadow-primary-500/25 transition-all group-hover:shadow-glow-sm`}
      >
        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-900 dark:bg-obsidian-950">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
          >
            {/* Minimalist T & C interlocking conversion arcs */}
            <path
              d="M5 8.5C5 6.567 6.567 5 8.5 5H17M17 5L14.5 2.5M17 5L14.5 7.5"
              stroke="url(#brand-grad-1)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 15.5C19 17.433 17.433 19 15.5 19H7M7 19L9.5 16.5M7 19L9.5 21.5"
              stroke="url(#brand-grad-2)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="8.5" cy="8.5" r="1.5" fill="#818cf8" />
            <circle cx="15.5" cy="15.5" r="1.5" fill="#38bdf8" />
            <defs>
              <linearGradient
                id="brand-grad-1"
                x1="5"
                y1="5"
                x2="17"
                y2="5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#818cf8" />
                <stop offset="1" stopColor="#c084fc" />
              </linearGradient>
              <linearGradient
                id="brand-grad-2"
                x1="19"
                y1="19"
                x2="7"
                y2="19"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#818cf8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {showText && (
        <span
          className={`font-extrabold tracking-tight text-slate-900 dark:text-white ${textSizes}`}
        >
          turk
          <span className="bg-gradient-to-r from-primary-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-primary-400 dark:via-indigo-300 dark:to-violet-400">
            convert
          </span>
        </span>
      )}
    </Link>
  );
}
