"use client";

import { useState } from "react";
import { TEAM_MEMBERS } from "@/lib/constants/team";
import { useLanyard } from "@/lib/hooks/useLanyard";
import { TeamMemberCard } from "./TeamMemberCard";
import { Users, Radio } from "lucide-react";

type FilterTab = "tum" | "kurucular" | "gelistiriciler" | "yonetim";

export function TeamMembers() {
  const [activeTab, setActiveTab] = useState<FilterTab>("tum");

  const userIds = TEAM_MEMBERS.map((m) => m.id);
  const { data: lanyardMap, loading } = useLanyard(userIds);

  const tabs: { id: FilterTab; label: string }[] = [
    { id: "tum", label: "Tümü" },
    { id: "kurucular", label: "Kurucular" },
    { id: "gelistiriciler", label: "Geliştiriciler" },
    { id: "yonetim", label: "Yönetim" },
  ];

  const filteredMembers = TEAM_MEMBERS.filter((m) =>
    activeTab === "tum" ? true : m.categories.includes(activeTab)
  );

  return (
    <section className="relative w-full py-10">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-72 w-full max-w-4xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-violet-500/10 blur-3xl opacity-60" />

      {/* Header & Filter Controls Bar */}
      <div className="relative mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        {/* Left: Title & Subtitle */}
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400">
            <Radio className="h-3 w-3 animate-pulse text-rose-500" />
            <span>Canlı Discord Senkronizasyonu</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Ekip Üyeleri
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400 max-w-xl">
            Discord profilleri, rol renkleri ve canlı durumları ile listelenen kadromuz.
          </p>
        </div>

        {/* Right: Filter Tabs (Pill Bar as in screenshot) */}
        <div className="inline-flex self-start sm:self-end rounded-2xl border border-slate-200/80 bg-white/80 p-1.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/90">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md dark:bg-white dark:text-zinc-950"
                    : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Team Member Cards */}
      <div className="relative grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        {filteredMembers.map((member) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            lanyard={lanyardMap[member.id]}
          />
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="py-16 text-center text-sm text-slate-400 dark:text-zinc-500">
          Bu filtrede henüz üye bulunmuyor.
        </div>
      )}
    </section>
  );
}
