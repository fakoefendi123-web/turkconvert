import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import DiffCheckerTool from "./DiffCheckerTool";

export const metadata: Metadata = {
  title: "Metin KarÅŸÄ±laÅŸtÄ±rÄ±cÄ± - Diff Checker Online",
  description:
    "Ä°ki metin arasÄ±ndaki farklarÄ±, eklenen ve silinen satÄ±rlarÄ± renkli olarak anÄ±nda karÅŸÄ±laÅŸtÄ±rÄ±n. Kod, makale ve metinler iÃ§in Ã¼cretsiz araÃ§.",
  openGraph: {
    title: "Metin KarÅŸÄ±laÅŸtÄ±rÄ±cÄ± - Diff Checker | turkconvert",
    description: "Metinler arasÄ±ndaki farklarÄ± satÄ±r satÄ±r karÅŸÄ±laÅŸtÄ±rÄ±n.",
  },
};

export default function DiffCheckerPage() {
  return (
    <ToolPageLayout
      title="Metin KarÅŸÄ±laÅŸtÄ±rÄ±cÄ± (Diff)"
      description="Ä°ki metin arasÄ±ndaki tÃ¼m deÄŸiÅŸiklikleri, eklemeleri ve silinmeleri satÄ±r satÄ±r kolayca inceleyin."
    >
      <DiffCheckerTool />
    </ToolPageLayout>
  );
}
