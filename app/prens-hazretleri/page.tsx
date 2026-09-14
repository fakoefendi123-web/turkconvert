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
  ],
  openGraph: {
    title: "Yüce ve Görkemli Prens Hazretleri | TurkConvert",
    description:
      "Görkemli Prens Hazretleri tarafından halkına bahşedilmiş teknoloji ekosistemi ve canlı yayın otağı.",
    url: "https://turkconvert.online/prens-hazretleri",
    type: "website",
  },
};

export default function PrensHazretleriPage() {
  return <PrensHazretleriClient />;
}
