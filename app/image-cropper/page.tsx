import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import ImageCropperTool from "./ImageCropperTool";

export const metadata: Metadata = {
  title: "Görsel Kırpıcı - Ücretsiz Online",
  description:
    "Görsellerinizi istediğiniz oranda (1:1, 16:9, 4:3) veya serbest olarak kırpın ve yüksek kalitede indirin. Ücretsiz ve güvenli.",
  openGraph: {
    title: "Görsel Kırpıcı - Ücretsiz Online | turkconvert",
    description: "Görsellerinizi tarayıcınızda kolayca kırpın ve indirin.",
  },
};

export default function ImageCropperPage() {
  return (
    <ToolPageLayout
      title="Görsel Kırpıcı"
      description="Görsellerinizi 1:1, 16:9 veya serbest oranda kırparak istediğiniz alanı kesin."
    >
      <ImageCropperTool />
    </ToolPageLayout>
  );
}
