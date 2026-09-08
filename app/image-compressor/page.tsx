import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import ImageCompressorTool from "./ImageCompressorTool";

export const metadata: Metadata = {
  title: "Görsel Sıkıştırıcı - Ücretsiz Online | turkconvert",
  description:
    "Görsellerinizin dosya boyutunu kalite kaybı yaşamadan ücretsiz küçültün. JPG, PNG ve WEBP sıkıştırma desteği.",
  openGraph: {
    title: "Görsel Sıkıştırıcı - Ücretsiz Online | turkconvert",
    description:
      "Görsellerinizin dosya boyutunu kalite kaybı yaşamadan ücretsiz küçültün.",
  },
};

export default function ImageCompressorPage() {
  return (
    <ToolPageLayout
      title="Görsel Sıkıştırıcı"
      description="Görsellerinizi kalite kaybı minimize ederek sıkıştırın."
    >
      <ImageCompressorTool />
    </ToolPageLayout>
  );
}

