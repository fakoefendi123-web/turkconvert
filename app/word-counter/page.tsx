import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import WordCounterTool from "./WordCounterTool";

export const metadata: Metadata = {
  title: "Metin SayacÄ± - Kelime ve Karakter SayacÄ±",
  description:
    "Metninizin kelime, karakter, satÄ±r, cÃ¼mle ve paragraf sayÄ±sÄ±nÄ± anÄ±nda hesaplayÄ±n.",
  openGraph: {
    title: "Metin SayacÄ± - Kelime ve Karakter SayacÄ±",
    description:
      "Metninizin kelime, karakter, satÄ±r, cÃ¼mle ve paragraf sayÄ±sÄ±nÄ± anÄ±nda hesaplayÄ±n.",
  },
};

export default function WordCounterPage() {
  return (
    <ToolPageLayout
      title="Metin SayacÄ±"
      description="Metninizin kelime, karakter, satÄ±r, cÃ¼mle ve paragraf sayÄ±sÄ±nÄ± anÄ±nda hesaplayÄ±n."
    >
      <WordCounterTool />
    </ToolPageLayout>
  );
}
