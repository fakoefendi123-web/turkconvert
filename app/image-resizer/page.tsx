import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import ImageResizerTool from "./ImageResizerTool";

export const metadata: Metadata = {
  title: "Görsel Boyutlandýrýcý - Ücretsiz Online | turkconvert",
  description:
    "Görsellerinizi istediðiniz piksel boyutuna ücretsiz ve anýnda yeniden boyutlandýrýn. En-boy oranýný koruyarak veya özel boyutlarla boyutlandýrma yapýn.",
  openGraph: {
    title: "Görsel Boyutlandýrýcý - Ücretsiz Online | turkconvert",
    description:
      "Görsellerinizi istediðiniz boyuta ücretsiz olarak yeniden boyutlandýrýn.",
  },
};

export default function ImageResizerPage() {
  return (
    <ToolPageLayout
      title="Görsel Boyutlandýrýcý"
      description="Görsellerinizi istediðiniz boyuta yeniden boyutlandýrýn."
    >
      <ImageResizerTool />
    </ToolPageLayout>
  );
}

