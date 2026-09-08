"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Crown, Sparkles, Shield, Award } from "lucide-react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  fadeSpeed: number;
  baseColor: string;
}

export function RoyalNoticeBanner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const sparksRef = useRef<Spark[]>([]);

  // Patlama efekti (Burst)
  const triggerBurst = useCallback((originX: number, originY: number) => {
    const burstCount = 28;
    const colors = ["#fbbf24", "#f59e0b", "#fef08a", "#ffffff", "#d97706"];

    for (let i = 0; i < burstCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.5 + 1.2;
      sparksRef.current.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1.5,
        alpha: 1,
        decay: Math.random() * 0.025 + 0.015,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setClickCount((c) => c + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    triggerBurst(x, y);
  };

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

    const palette = [
      "rgba(251, 191, 36,", // gold-400
      "rgba(245, 158, 11,", // amber-500
      "rgba(253, 230, 138,", // yellow-200
      "rgba(217, 119, 6,", // amber-600
      "rgba(255, 255, 255,", // white diamond
    ];

    const particleCount = 42;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.35 - 0.15,
        size: Math.random() * 2.2 + 0.8,
        opacity: Math.random() * 0.7 + 0.2,
        fadeSpeed: (Math.random() * 0.012 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
        baseColor: palette[Math.floor(Math.random() * palette.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Takımyıldızı (Constellation) Altın Hatları
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 65) {
            const lineAlpha = (1 - dist / 65) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 2. Süzülen Asil Partiküller
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.fadeSpeed;

        if (p.opacity > 0.9 || p.opacity < 0.15) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.baseColor} ${Math.max(0, Math.min(1, p.opacity))})`;
        ctx.shadowBlur = p.size * 3.5;
        ctx.shadowColor = "rgba(245, 158, 11, 0.75)";
        ctx.fill();
      });

      // 3. Tıklama Havai Fişek Kıvılcımları (Sparks)
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const s = sparksRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05; // hafif yerçekimi
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparksRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

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
      ref={containerRef}
      onClick={handleClick}
      aria-label="Majestik Bildiri"
      title="Tıklayarak asil kıvılcımları başlatın"
      className="group relative mb-12 cursor-pointer select-none overflow-hidden rounded-3xl border border-amber-400/50 bg-gradient-to-b from-amber-500/[0.07] via-yellow-500/[0.04] to-amber-600/[0.09] p-6 shadow-2xl shadow-amber-500/10 backdrop-blur-xl transition-all duration-500 hover:border-amber-400/90 hover:shadow-amber-500/20 dark:border-amber-500/35 dark:from-amber-950/40 dark:via-neutral-950/50 dark:to-amber-950/30 dark:shadow-amber-950/30 sm:p-8"
    >
      {/* Tuval (Canvas) Animasyon Katmanı */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-85"
      />

      {/* Dört Köşe Asil Metalik Vurgular (Royal Filigree Corners) */}
      <div className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l-2 border-t-2 border-amber-400/70 transition-all duration-300 group-hover:scale-125 group-hover:border-amber-300" />
      <div className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 border-r-2 border-t-2 border-amber-400/70 transition-all duration-300 group-hover:scale-125 group-hover:border-amber-300" />
      <div className="pointer-events-none absolute bottom-3 left-3 h-3.5 w-3.5 border-b-2 border-l-2 border-amber-400/70 transition-all duration-300 group-hover:scale-125 group-hover:border-amber-300" />
      <div className="pointer-events-none absolute bottom-3 right-3 h-3.5 w-3.5 border-b-2 border-r-2 border-amber-400/70 transition-all duration-300 group-hover:scale-125 group-hover:border-amber-300" />

      {/* Sürekli Akan Altın Işık Hüzmesi (Sweep Shimmer Effect) */}
      <div className="pointer-events-none absolute -inset-full animate-[shimmer_7s_infinite_linear] bg-gradient-to-r from-transparent via-amber-300/[0.07] to-transparent opacity-60" />

      {/* Arka Plan Yumuşak Aura Işıltıları */}
      <div className="pointer-events-none absolute -left-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-amber-400/20 blur-3xl dark:bg-amber-500/15" />
      <div className="pointer-events-none absolute -right-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-yellow-400/20 blur-3xl dark:bg-yellow-500/15" />

      {/* Ana İçerik Gövdesi */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Üst Rozet: Kraliyet Mührü */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/60 bg-gradient-to-r from-amber-500/15 via-yellow-400/25 to-amber-500/15 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-800 shadow-sm transition-all duration-300 group-hover:border-amber-300 group-hover:shadow-amber-400/25 dark:border-amber-400/40 dark:text-amber-200 sm:text-xs">
          <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-spin [animation-duration:8s] dark:text-amber-300" />
          <span>✦ ROYAL EDITION • MAJESTİK İHSAN ✦</span>
          <Crown className="h-3.5 w-3.5 text-amber-500 dark:text-amber-300" />
        </div>

        {/* Taç İkonu ve Gövde Rozeti */}
        <div className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 p-0.5 shadow-lg shadow-amber-500/30 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 dark:shadow-amber-600/40">
          <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-neutral-900/90 backdrop-blur">
            <Crown className="h-6 w-6 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500" />
          </span>
        </div>

        {/* Asil Ana Metin */}
        <blockquote className="max-w-3xl">
          <p className="text-base font-semibold leading-relaxed tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-lg md:text-xl lg:text-2xl">
            <span className="text-amber-500 dark:text-amber-400 mr-1.5 font-serif text-2xl sm:text-3xl">&ldquo;</span>
            <span className="bg-gradient-to-r from-amber-700 via-amber-900 to-yellow-900 bg-clip-text font-serif italic text-transparent transition-all duration-300 group-hover:brightness-110 dark:from-amber-100 dark:via-yellow-200 dark:to-amber-300">
              Prens Hazretleri’nin yüksek tensipleriyle geliştirilmiş, halkının hizmetine vakfedilmiş asil bir dijital armağan.
            </span>
            <span className="text-amber-500 dark:text-amber-400 ml-1.5 font-serif text-2xl sm:text-3xl">&rdquo;</span>
          </p>
        </blockquote>

        {/* İnce Ayırıcı Hat */}
        <div className="my-3 flex items-center justify-center gap-2 opacity-60">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400 dark:to-amber-300" />
          <div className="h-1.5 w-1.5 rotate-45 border border-amber-500 bg-amber-400" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400 dark:to-amber-300" />
        </div>

        {/* Alt Asil Motto */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-medium tracking-widest text-amber-700/80 uppercase dark:text-amber-300/80 sm:text-xs">
          <span>Tavizsiz Hız</span>
          <span className="text-amber-400">◈</span>
          <span>Sonsuz Gizlilik</span>
          <span className="text-amber-400">◈</span>
          <span>Halkın İkbaline</span>
        </div>

        {/* Etkileşim İpucu */}
        {clickCount > 0 && (
          <div className="mt-2 text-[10px] text-amber-500/70 dark:text-amber-400/60 animate-fade-in">
            ✦ {clickCount} kez tebcil edildi ✦
          </div>
        )}
      </div>
    </aside>
  );
}
