import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import ColorPickerTool from "./ColorPickerTool";

export const metadata: Metadata = {
  title: "GÃ¶rsel Renk SeÃ§ici ve Palet Ã‡Ä±karÄ±cÄ± - Ãœcretsiz Online",
  description:
    "GÃ¶rsellerinizden damlalÄ±k aracÄ±yla piksel renklerini HEX, RGB ve HSL olarak alÄ±n, otomatik renk paletini Ã§Ä±karÄ±n. Ãœcretsiz ve reklamsÄ±z.",
  openGraph: {
    title: "GÃ¶rsel Renk SeÃ§ici ve Palet Ã‡Ä±karÄ±cÄ± | turkconvert",
    description: "GÃ¶rsellerinizden renk kodlarÄ±nÄ± anÄ±nda kopyalayÄ±n.",
  },
};

export default function ColorPickerPage() {
  return (
    <ToolPageLayout
      title="Renk SeÃ§ici & Palet"
      description="GÃ¶rselinizden dilediÄŸiniz rengi seÃ§in, HEX/RGB kodlarÄ±nÄ± kopyalayÄ±n ve otomatik renk paletini keÅŸfedin."
    >
      <ColorPickerTool />
    </ToolPageLayout>
  );
}
