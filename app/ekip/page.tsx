import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";
import { TeamMembers } from "@/components/team/TeamMembers";

export const metadata: Metadata = {
  title: "Ekip Üyeleri & Yapımcılar | TurkConvert",
  description:
    "TurkConvert yapımcıları ve çekirdek geliştirici kadrosu. Canlı Discord durumları, rolleri ve profil bilgileri.",
  alternates: {
    canonical: "https://turkconvert.online/ekip",
  },
  openGraph: {
    title: "Ekip Üyeleri & Yapımcılar | TurkConvert",
    description:
      "TurkConvert yapımcıları ve çekirdek geliştirici kadrosu. Canlı Discord durumları, rolleri ve profil bilgileri.",
    url: "https://turkconvert.online/ekip",
    type: "website",
    locale: "tr_TR",
    siteName: "TurkConvert",
  },
};

export default function EkipPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Navigation Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-slate-600 shadow-xs backdrop-blur-md transition-all hover:border-slate-300 hover:bg-white hover:text-slate-900 dark:border-white/10 dark:bg-obsidian-900/80 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Ana Sayfaya Dön</span>
        </Link>

        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-zinc-500">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Doğrulanmış Discord Entegrasyonu</span>
        </div>
      </div>

      {/* Main Team Showcase Component */}
      <TeamMembers />

      {/* Bottom Info Banner */}
      <div className="mt-14 rounded-3xl border border-slate-200/80 bg-white/60 p-6 text-center backdrop-blur-md dark:border-white/10 dark:bg-zinc-900/40 sm:p-8">
        <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
          TurkConvert Geliştirici Topluluğuna Katılın
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-500 dark:text-zinc-400 sm:text-sm">
          TurkConvert; tamamen ücretsiz, reklamsız, açık fikirli ve %100 yerel tarayıcı mimarisiyle geliştirilen yeni nesil bir araç ekosistemidir.
        </p>
      </div>
    </div>
  );
}
