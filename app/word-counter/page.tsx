import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import WordCounterTool from "./WordCounterTool";

export const metadata: Metadata = {
  title: "Metin Sayacı - Kelime ve Karakter Sayacı",
  description:
    "Metninizin kelime, karakter, satır, cümle ve paragraf sayısını anında hesaplayın.",
  openGraph: {
    title: "Metin Sayacı - Kelime ve Karakter Sayacı",
    description:
      "Metninizin kelime, karakter, satır, cümle ve paragraf sayısını anında hesaplayın.",
  },
};

export default function WordCounterPage() {
  return (
    <ToolPageLayout
      title="Metin Sayacı"
      description="Metninizin kelime, karakter, satır, cümle ve paragraf sayısını anında hesaplayın."
    >
      <WordCounterTool />
    </ToolPageLayout>
  );
}
