"use client";

import Link from "next/link";
import {
  Smartphone,
  Layers,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Sparkles,
  Zap,
  Minimize2,
  FileCheck2,
  Lock,
  Scissors,
  CheckCircle2,
} from "lucide-react";

export function BentoGridShowcase() {
  return (
    <section className="mt-16">
      <div className="mb-8 text-center sm:text-left sm:flex sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary-500/20 bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-600 dark:text-primary-400 mb-2">
            <Sparkles className="h-3 w-3" />
            <span>Öne Çıkan Güçlü Araçlar</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Her İşlem İçin Özelleştirilmiş Araçlar
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            İnternet bağlantınız kopsa bile tarayıcınızda çalışan yüksek performanslı stüdyo modülleri.
          </p>
        </div>
        <Link
          href="/#araclar"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-500 dark:text-primary-400"
        >
          <span>Tüm 40+ aracı gör</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Asimetrik Modern Bento Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Bento 1: iPhone HEIC Studio (2 Kolon Genişliğinde Dev Kart) */}
        <div className="group relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-sm transition-all hover:border-primary-500/50 hover:shadow-glow-sm dark:border-white/10 dark:from-obsidian-900/80 dark:to-obsidian-950/80 sm:col-span-2 lg:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl dark:bg-primary-500/15" />

          <div className="flex flex-col justify-between h-full relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-950/60 dark:text-primary-400">
                  <Smartphone className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-primary-100/80 px-2.5 py-0.5 text-[10px] font-bold text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                  Yeni Nesil Apple Çözümü
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                iPhone HEIC fotoğrafları artık engel değil
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm max-w-lg">
                Apple cihazların çektiği `.heic` uzantılı fotoğrafları WebAssembly motoruyla saniyeler içinde standart JPG veya kayıpsız PNG formatına çevirin. Toplu dönüştürme ve tek tıkla ZIP indirme desteğiyle.
              </p>
            </div>

            {/* İnteraktif Simülasyon Görseli */}
            <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/80 p-4 backdrop-blur-md dark:border-white/10 dark:bg-obsidian-850/80">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 font-bold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                    HEIC
                  </span>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">IMG_2026_Apple.heic</p>
                    <p className="text-[10px] text-slate-400">iOS 18 Yüksek Verimlilik (4.2 MB)</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-primary-500 font-bold">
                  <Zap className="h-4 w-4 animate-pulse" />
                  <span className="text-[11px]">0.3 sn • WASM</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    JPG
                  </span>
                  <div>
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">Dönüştürüldü (%100 Uyumlu)</p>
                    <p className="text-[10px] text-slate-400">Windows, Android & Web Hazır</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link
                href="/heic-to-jpg"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-primary-500/20 transition-all hover:bg-primary-500"
              >
                <span>HEIC to JPG Aç</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/heic-to-png"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-200"
              >
                <span>Kayıpsız PNG</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bento 2: PDF Güç İstasyonu */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-sm transition-all hover:border-primary-500/50 hover:shadow-glow-sm dark:border-white/10 dark:from-obsidian-900/80 dark:to-obsidian-950/80">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                <Layers className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                pdf-lib Motoru
              </span>
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              PDF Birleştir & Ayır
            </h3>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              Belgeleri sürükleyip istediğiniz sıraya dizin, tek dosya yapın veya istemediğiniz sayfaları kesip çıkarın.
            </p>

            {/* Mini Görsel Kart Yığını */}
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-white/60 px-3 py-1.5 text-[11px] dark:border-white/5 dark:bg-obsidian-850/60">
                <span className="font-medium text-slate-700 dark:text-slate-300">Rapor_Bolum_1.pdf</span>
                <span className="text-[10px] text-slate-400">12 Sayfa</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-white/60 px-3 py-1.5 text-[11px] dark:border-white/5 dark:bg-obsidian-850/60">
                <span className="font-medium text-slate-700 dark:text-slate-300">Ek_Belgeler.pdf</span>
                <span className="text-[10px] text-slate-400">5 Sayfa</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Link
              href="/pdf-merge"
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              <span>Birleştir</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/pdf-split"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
            >
              <Scissors className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Bento 3: Gizlilik & EXIF Kasası */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-sm transition-all hover:border-emerald-500/50 hover:shadow-glow-sm dark:border-white/10 dark:from-obsidian-900/80 dark:to-obsidian-950/80">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                <Lock className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                %100 Güvenlik
              </span>
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              EXIF & Konum Temizleyici
            </h3>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              Fotoğraflarınızdaki GPS enlem/boylam, telefon modeli ve çekim saati etiketlerini internete koymadan önce tek tıkla silin.
            </p>

            <div className="mt-4 rounded-xl border border-emerald-200/60 bg-emerald-50/50 p-3 text-[11px] text-emerald-800 dark:border-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-300">
              <div className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>GPS Konum Verisi Temizlendi</span>
              </div>
              <p className="mt-0.5 text-[10px] opacity-80">Enlem, boylam ve lens seri no arındırıldı.</p>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/exif-cleaner"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 py-2 text-xs font-semibold text-emerald-700 transition-all hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
            >
              <span>EXIF Temizleyiciyi Aç</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Bento 4: Akıllı Görsel Sıkıştırma Laboratuvarı */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-sm transition-all hover:border-primary-500/50 hover:shadow-glow-sm dark:border-white/10 dark:from-obsidian-900/80 dark:to-obsidian-950/80">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400">
                <Minimize2 className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-[10px] font-bold text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
                %80 Tasarruf
              </span>
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              Görsel Sıkıştırıcı
            </h3>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              Pikselleri bozmadan görsel boyutunu küçültün. İnteraktif Önce/Sonra sürgüsüyle kaliteyi anlık karşılaştırın.
            </p>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-100/80 p-3 text-xs dark:bg-obsidian-850">
              <span className="text-slate-400 line-through">4.8 MB</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">920 KB (-81%)</span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/image-compressor"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 transition-all hover:border-primary-400 hover:text-primary-600 dark:border-white/10 dark:bg-obsidian-850 dark:text-slate-200"
            >
              <span>Sıkıştırma Aracına Git</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Bento 5: Türk Finans & Fatura Standartları */}
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-sm transition-all hover:border-primary-500/50 hover:shadow-glow-sm dark:border-white/10 dark:from-obsidian-900/80 dark:to-obsidian-950/80">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                <Calculator className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                TR Standartları
              </span>
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
              KDV, Tevkifat & IBAN
            </h3>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              2026 güncel KDV oranları (%1, %10, %20), resmi tevkifat kesintileri ve ISO 7064 banka tespiti yapan IBAN kontrolü.
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5 text-[10px]">
              <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-slate-600 dark:bg-obsidian-850 dark:text-slate-400">
                KDV Dahil / Hariç
              </span>
              <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-slate-600 dark:bg-obsidian-850 dark:text-slate-400">
                22+ Türk Bankası
              </span>
              <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-slate-600 dark:bg-obsidian-850 dark:text-slate-400">
                Yazıyla Tutar Çevir
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Link
              href="/kdv-hesaplayici"
              className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-primary-600 py-2 text-xs font-semibold text-white hover:bg-primary-500"
            >
              <span>KDV Hesapla</span>
            </Link>
            <Link
              href="/iban-dogrulayici"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200"
            >
              <span>IBAN</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
