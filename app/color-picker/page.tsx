import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import ColorPickerTool from "./ColorPickerTool";

export const metadata: Metadata = {
  title: "Görsel Renk Seçici ve Palet Çıkarıcı - Ücretsiz Online",
  description:
    "Görsellerinizden damlalık aracıyla piksel renklerini HEX, RGB ve HSL olarak alın, otomatik renk paletini çıkarın. Ücretsiz ve reklamsız.",
  openGraph: {
    title: "Görsel Renk Seçici ve Palet Çıkarıcı | turkconvert",
    description: "Görsellerinizden renk kodlarını anında kopyalayın.",
  },
};

export default function ColorPickerPage() {
  return (
    <ToolPageLayout
      title="Renk Seçici & Palet"
      description="Görselinizden dilediğiniz rengi seçin, HEX/RGB kodlarını kopyalayın ve otomatik renk paletini keşfedin."
    >
      <ColorPickerTool />
    </ToolPageLayout>
  );
}
