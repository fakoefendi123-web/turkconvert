"use client";

import { useEffect, useRef } from "react";
import { Crown, Sparkles } from "lucide-react";

export function RoyalNoticeBanner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      color: string;
    }

    const colors = [
      "rgba(245, 158, 11, ",
      "rgba(234, 179, 8, ",
      "rgba(251, 191, 36, ",
      "rgba(217, 119, 6, ",
      "rgba(255, 255, 255, ",
    ];

    const particleCount = 40;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 1,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.4 - 0.2,
        opacity: Math.random() * 0.8 + 0.2,
        fadeSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.fadeSpeed;

        if (p.opacity > 0.95 || p.opacity < 0.15) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, Math.min(1, p.opacity))})`;
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = "rgba(245, 158, 11, 0.8)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <aside
      aria-label="Özel Bildiri"
      className="relative mb-10 overflow-hidden rounded-2xl border border-amber-300/70 bg-gradient-to-r from-amber-500/10 via-yellow-500/15 to-amber-500/10 p-4 shadow-xl shadow-amber-500/5 backdrop-blur-md transition-all duration-300 hover:border-amber-400 hover:shadow-amber-500/10 dark:border-amber-500/40 dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-amber-950/40 dark:shadow-amber-950/20 sm:p-5"
    >
      {/* Animasyonlu Partikül Tuvali (Canvas) */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
      />

      {/* Arka Plan Yumuşak Işıltıları */}
      <div className="pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-amber-400/20 blur-2xl dark:bg-amber-500/15" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-yellow-400/20 blur-2xl dark:bg-yellow-500/15" />

      {/* İçerik */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2.5 text-center sm:flex-row sm:gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-md shadow-amber-500/30 ring-2 ring-amber-300/50 dark:ring-amber-400/30">
          <Crown className="h-5 w-5 text-white drop-shadow" />
        </div>

        <p className="text-sm font-semibold tracking-wide sm:text-base md:text-lg">
          <span className="bg-gradient-to-r from-amber-700 via-amber-900 to-yellow-800 bg-clip-text font-bold text-transparent dark:from-amber-200 dark:via-yellow-300 dark:to-amber-100">
            &ldquo;Bu site prens hazretleri için özel olarak hazırlanmış ve onun halkına sunulmuştur&rdquo;
          </span>
        </p>

        <div className="hidden items-center sm:flex">
          <Sparkles className="h-4 w-4 animate-pulse text-amber-500 dark:text-amber-400" />
        </div>
      </div>
    </aside>
  );
}
