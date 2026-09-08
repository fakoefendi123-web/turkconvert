import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import ImageResizerTool from "./ImageResizerTool";

export const metadata: Metadata = {
  title: "Görsel Boyutlandırıcı - Ücretsiz Online | turkconvert",
  description:
    "Görsellerinizi istediğiniz piksel boyutuna ücretsiz ve anında yeniden boyutlandırın. En-boy oranını koruyarak veya özel boyutlarla boyutlandırma yapın.",
  openGraph: {
    title: "Görsel Boyutlandırıcı - Ücretsiz Online | turkconvert",
    description:
      "Görsellerinizi istediğiniz boyuta ücretsiz olarak yeniden boyutlandırın.",
  },
};

export default function ImageResizerPage() {
  return (
    <ToolPageLayout
      title="Görsel Boyutlandırıcı"
      description="Görsellerinizi istediğiniz boyuta yeniden boyutlandırın."
    >
      <ImageResizerTool />
    </ToolPageLayout>
  );
}

