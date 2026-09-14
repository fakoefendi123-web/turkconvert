import { Metadata } from "next";
import PrensHazretleriClient from "./PrensHazretleriClient";

export const metadata: Metadata = {
  title: "Yüce ve Görkemli Prens Hazretleri | TurkConvert Hükümdarlık Otağı",
  description:
    "Görkemli Prens Hazretleri tarafından halkına bilabedel bahşedilmiş TurkConvert diyarı ve Yüce Prens'in resmi Kick canlı yayın otağı.",
  keywords: [
    "Prens Hazretleri",
    "prenshazretleri",
    "kick prenshazretleri",
    "TurkConvert",
    "Prens Hazretleri canlı yayın",
    "Kick Türkiye",
    "Prens Hazretleri Kick",
  ],
  alternates: {
    canonical: "https://turkconvert.online/prens-hazretleri",
  },
  openGraph: {
    title: "Yüce ve Görkemli Prens Hazretleri | TurkConvert Otağı",
    description:
      "Görkemli Prens Hazretleri tarafından halkına bahşedilmiş teknoloji ekosistemi ve canlı yayın otağı.",
    url: "https://turkconvert.online/prens-hazretleri",
    type: "website",
    siteName: "TurkConvert",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yüce ve Görkemli Prens Hazretleri | TurkConvert Otağı",
    description:
      "Görkemli Prens Hazretleri tarafından halkına bahşedilmiş teknoloji diyarı ve resmi Kick canlı yayını.",
  },
};

export default function PrensHazretleriPage() {
  return <PrensHazretleriClient />;
}
