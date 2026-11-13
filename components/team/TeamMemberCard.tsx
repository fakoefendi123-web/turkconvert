"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Shield,
  Copy,
  Check,
  Calendar,
  ExternalLink,
  Gamepad2,
  Music2,
  Sparkles,
} from "lucide-react";
import {
  TeamMemberConfig,
  getDiscordRegistrationDate,
} from "@/lib/constants/team";
import { LanyardData } from "@/lib/hooks/useLanyard";

interface TeamMemberCardProps {
  member: TeamMemberConfig;
  lanyard?: LanyardData;
}

export function TeamMemberCard({ member, lanyard }: TeamMemberCardProps) {
  const [copied, setCopied] = useState(false);

  const discordUser = lanyard?.discord_user;
  const status = lanyard?.discord_status || "offline";

  // Display name & username
  const displayName =
    discordUser?.global_name ||
    discordUser?.display_name ||
    member.displayName;
  const username = discordUser?.username || member.username;

  // Avatar URL
  const avatarUrl = discordUser?.avatar
    ? `https://cdn.discordapp.com/avatars/${member.id}/${discordUser.avatar}.png?size=256`
    : member.defaultAvatarUrl;

  // Status mapping
  const statusConfig = {
    online: {
      label: "Çevrimiçi",
      color: "bg-emerald-500",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-500/30",
      bgBadge: "bg-emerald-500/10",
    },
    idle: {
      label: "Boşta",
      color: "bg-amber-400",
      textColor: "text-amber-400",
      borderColor: "border-amber-400/30",
      bgBadge: "bg-amber-400/10",
    },
    dnd: {
      label: "Rahatsız Etmeyin",
      color: "bg-rose-500",
      textColor: "text-rose-400",
      borderColor: "border-rose-500/30",
      bgBadge: "bg-rose-500/10",
    },
    offline: {
      label: "Çevrimdışı",
      color: "bg-zinc-500",
      textColor: "text-zinc-400",
      borderColor: "border-zinc-500/20",
      bgBadge: "bg-zinc-500/10",
    },
  }[status];

  // Activities (Game, Custom Status, Spotify)
  const spotify = lanyard?.spotify;
  const customStatus = lanyard?.activities?.find((a) => a.type === 4);
  const gameActivity = lanyard?.activities?.find((a) => a.type === 0);

  // Registration date from snowflake
  const joinDate = getDiscordRegistrationDate(member.id);

  // Shortened ID (e.g. 5589...5882)
  const shortId = `${member.id.slice(0, 5)}...${member.id.slice(-4)}`;

  const handleCopyId = () => {
    navigator.clipboard.writeText(member.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c0d12] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_15px_45px_-10px_rgba(0,0,0,0.9)]">
      {/* 1. Header Banner */}
      <div
        className={`relative h-28 sm:h-32 w-full bg-gradient-to-br ${member.bannerStyle} overflow-hidden border-b border-white/[0.06]`}
      >
        {/* Decorative Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Top Glow Spot */}
        <div
          className={`absolute -top-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-r ${member.accentColor} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`}
        />

        {/* Truncated ID Pill in Top-Right */}
        <div className="absolute right-3.5 top-3.5 z-10">
          <button
            onClick={handleCopyId}
            title="Discord ID'sini Kopyala"
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[11px] font-mono text-zinc-300 backdrop-blur-md transition-all hover:border-white/30 hover:bg-black/80 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Kopyalandı</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 text-zinc-400" />
                <span>{shortId}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Avatar & Live Status Row */}
      <div className="relative px-6">
        <div className="flex items-end justify-between">
          {/* Avatar with glowing colored ring */}
          <div className="relative -mt-12 sm:-mt-14">
            <div
              className={`relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border-2 bg-zinc-900 transition-transform duration-300 group-hover:scale-105 ${member.ringGlow}`}
            >
              <Image
                src={avatarUrl}
                alt={displayName}
                width={96}
                height={96}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>

            {/* Corner Status Dot */}
            <span
              className={`absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 h-5 w-5 rounded-full border-[3px] border-[#0c0d12] ${statusConfig.color}`}
            />
          </div>

          {/* Status Badge */}
          <div
            className={`mb-2 flex items-center gap-1.5 rounded-full border ${statusConfig.borderColor} ${statusConfig.bgBadge} px-3 py-1 text-xs font-medium ${statusConfig.textColor} backdrop-blur-md`}
          >
            <Shield className="h-3.5 w-3.5" />
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
            <span>{statusConfig.label}</span>
          </div>
        </div>

        {/* 3. Names & Subtitle */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {displayName}
            </h3>
            <span
              className={`inline-flex items-center rounded-md bg-gradient-to-r ${member.accentColor} px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-xs`}
            >
              Lider
            </span>
          </div>

          <p className="mt-0.5 text-xs text-zinc-400">
            <span className="font-medium text-zinc-300">@{username}</span>
            <span className="mx-1.5 text-zinc-600">•</span>
            <span>TurkConvert Ekibi</span>
          </p>
        </div>

        {/* 4. Server Role */}
        <div className="mt-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            SUNUCU ROLÜ
          </span>
          <div className="mt-1.5">
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                member.roleColor === "rose"
                  ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-300"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  member.roleColor === "rose" ? "bg-rose-500" : "bg-amber-400"
                }`}
              />
              <span>{member.serverRole}</span>
            </div>
          </div>
        </div>

        {/* 5. Hakkında (Bio & Live Activity) */}
        <div className="mt-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            HAKKINDA
          </span>
          <div className="mt-1.5 rounded-2xl border border-white/5 bg-zinc-900/50 p-3.5 text-xs leading-relaxed text-zinc-300">
            <p>{member.bio}</p>

            {/* Live Custom Status */}
            {customStatus?.state && (
              <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-white/5 bg-black/40 px-2.5 py-1.5 text-[11px] text-zinc-300">
                <Sparkles className="h-3 w-3 text-amber-400 shrink-0" />
                <span className="truncate">{customStatus.state}</span>
              </div>
            )}

            {/* Live Game Activity */}
            {gameActivity && (
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1.5 text-[11px] text-indigo-300">
                <Gamepad2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                <span className="truncate">
                  <strong className="font-semibold">{gameActivity.name}</strong>
                  {gameActivity.details ? `: ${gameActivity.details}` : ""}
                </span>
              </div>
            )}

            {/* Live Spotify Track */}
            {spotify && (
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5 text-[11px] text-emerald-300">
                <Music2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 animate-pulse" />
                <span className="truncate">
                  {spotify.song} — {spotify.artist}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 6. Discord Metadata */}
        <div className="mt-5 space-y-2 border-t border-white/[0.06] pt-4 text-xs">
          <div className="flex items-center justify-between text-zinc-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-zinc-400" />
              <span>Discord Üyeliği</span>
            </div>
            <span className="font-semibold text-zinc-200">{joinDate}</span>
          </div>

          <div className="flex items-center justify-between text-zinc-400">
            <span>Discord ID</span>
            <button
              onClick={handleCopyId}
              className="group/id flex items-center gap-1.5 font-mono text-[11px] text-zinc-300 transition-colors hover:text-white"
            >
              <span>{member.id}</span>
              <Copy className="h-3 w-3 text-zinc-400 transition-colors group-hover/id:text-white" />
            </button>
          </div>
        </div>

        {/* 7. Action Button: Discord Profili */}
        <div className="my-5">
          <a
            href={`https://discord.com/users/${member.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900/90 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:border-white/30 hover:bg-zinc-800 hover:shadow-lg active:scale-[0.99]"
          >
            <span>Discord Profili</span>
            <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
