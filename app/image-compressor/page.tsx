import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import ImageCompressorTool from "./ImageCompressorTool";

export const metadata: Metadata = {
  title: "Görsel Sýkýþtýrýcý - Ücretsiz Online | turkconvert",
  description:
    "Görsellerinizin dosya boyutunu kalite kaybý yaþamadan ücretsiz küçültün. JPG, PNG ve WEBP sýkýþtýrma desteði.",
  openGraph: {
    title: "Görsel Sýkýþtýrýcý - Ücretsiz Online | turkconvert",
    description:
      "Görsellerinizin dosya boyutunu kalite kaybý yaþamadan ücretsiz küçültün.",
  },
};

export default function ImageCompressorPage() {
  return (
    <ToolPageLayout
      title="Görsel Sýkýþtýrýcý"
      description="Görsellerinizi kalite kaybý minimize ederek sýkýþtýrýn."
    >
      <ImageCompressorTool />
    </ToolPageLayout>
  );
}

