export interface TeamMemberConfig {
  id: string;
  displayName: string;
  username: string;
  serverRole: string;
  roleColor: "rose" | "amber" | "indigo" | "emerald" | "violet" | "cyan";
  categories: ("tum" | "kurucular" | "gelistiriciler" | "yonetim")[];
  bio: string;
  ringGlow: string; // CSS color or Tailwind ring
  accentColor: string;
  bannerStyle: string;
  defaultAvatarUrl: string;
}

export const TEAM_MEMBERS: TeamMemberConfig[] = [
  {
    id: "558972580367695882",
    displayName: "Prens Hazretleri",
    username: "yzftoprak",
    serverRole: "Lead Developer",
    roleColor: "rose",
    categories: ["tum", "kurucular", "gelistiriciler", "yonetim"],
    bio: "TurkConvert altyapı mimarisi, çekirdek sistemler ve ürün geliştirme lideri.",
    ringGlow: "border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.45)]",
    accentColor: "from-rose-500 to-red-600",
    bannerStyle: "from-rose-950/60 via-zinc-900 to-zinc-950",
    defaultAvatarUrl:
      "https://cdn.discordapp.com/avatars/558972580367695882/8cf9a1ac3818accbb7be7aa8e0579838.png?size=256",
  },
  {
    id: "1180521048517660734",
    displayName: "Fako Efendi",
    username: "fako1110",
    serverRole: "Lead Developer",
    roleColor: "amber",
    categories: ["tum", "kurucular", "gelistiriciler", "yonetim"],
    bio: "TurkConvert kurucu mimarı, full-stack sistemler ve web araçları geliştirme lideri.",
    ringGlow: "border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.45)]",
    accentColor: "from-amber-400 to-orange-500",
    bannerStyle: "from-amber-950/60 via-zinc-900 to-zinc-950",
    defaultAvatarUrl:
      "https://cdn.discordapp.com/avatars/1180521048517660734/bf2b1dda6dcdbcbf1dd66aa105bd0eea.png?size=256",
  },
];

export function getDiscordRegistrationDate(id: string): string {
  try {
    const epoch = BigInt("1420070400000");
    const ms = Number((BigInt(id) >> BigInt(22)) + epoch);
    return new Date(ms).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "Bilinmiyor";
  }
}
