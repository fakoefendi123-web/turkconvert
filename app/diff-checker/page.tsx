import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import DiffCheckerTool from "./DiffCheckerTool";

export const metadata: Metadata = {
  title: "Metin Karşılaştırıcı - Diff Checker Online",
  description:
    "İki metin arasındaki farkları, eklenen ve silinen satırları renkli olarak anında karşılaştırın. Kod, makale ve metinler için ücretsiz araç.",
  openGraph: {
    title: "Metin Karşılaştırıcı - Diff Checker | turkconvert",
    description: "Metinler arasındaki farkları satır satır karşılaştırın.",
  },
};

export default function DiffCheckerPage() {
  return (
    <ToolPageLayout
      title="Metin Karşılaştırıcı (Diff)"
      description="İki metin arasındaki tüm değişiklikleri, eklemeleri ve silinmeleri satır satır kolayca inceleyin."
    >
      <DiffCheckerTool />
    </ToolPageLayout>
  );
}
