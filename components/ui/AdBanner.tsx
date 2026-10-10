"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal";
  responsive?: boolean;
  className?: string;
}

export function AdBanner({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: AdBannerProps) {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;
    try {
      // @ts-expect-error window.adsbygoogle is injected by Google script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch {
      // Ignore error if blocked by client or already pushed
    }
  }, []);

  return (
    <div
      className={`my-8 mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/60 p-3 text-center dark:border-gray-800/80 dark:bg-gray-900/40 ${className}`}
    >
      <div className="mb-1.5 text-[10px] font-medium tracking-wider text-gray-400 dark:text-gray-500 uppercase">
        Sponsorlu Bağlantı
      </div>
      <div className="min-h-[90px] flex items-center justify-center">
        <ins
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client="ca-pub-3795286161515157"
          data-ad-slot={slot || "auto"}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
}
