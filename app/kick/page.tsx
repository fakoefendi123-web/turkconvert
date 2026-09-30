import type { Metadata } from "next";
import KickDashboardClient from "./KickDashboardClient";

export const metadata: Metadata = {
  title: "Kick Bot Kontrol Merkezi | TurkConvert",
  description:
    "Kick.com yayıncı botu, dinamik komut yönetimi, event bildirimleri, XP/Level sistemi, Minecraft sunucu entegrasyonu ve tam kapsamlı yayıncı kontrol paneli.",
  keywords: [
    "Kick bot",
    "Kick.com botu",
    "Kick yayıncı botu",
    "Kick komut yönetimi",
    "Kick XP sistemi",
    "Kick Minecraft IP botu",
    "TurkConvert Kick Bot",
  ],
  openGraph: {
    title: "Kick Bot Kontrol Merkezi | TurkConvert",
    description:
      "Kick.com yayıncıları için web tabanlı dinamik bot yönetim paneli, event alerts ve komut sistemi.",
    type: "website",
  },
};

export default function KickBotPage() {
  return <KickDashboardClient />;
}
