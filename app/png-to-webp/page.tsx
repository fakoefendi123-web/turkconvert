import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = {
  title: "PNG WEBP Dönüştürücü - Ücretsiz Online",
  description:
    "PNG dosyalarınızı ücretsiz ve kolayca WEBP formatına dönüştürün. Üyelik ve reklam gerekmez.",
  openGraph: {
    title: "PNG WEBP Dönüştürücü - Ücretsiz Online",
    description:
      "PNG dosyalarınızı ücretsiz ve kolayca WEBP formatına dönüştürün. Üyelik ve reklam gerekmez.",
  },
};

export default function PngToWebpPage() {
  return (
    <ToolPageLayout
      title="PNG → WEBP"
      description="PNG görsellerinizi ücretsiz olarak WEBP formatına dönüştürün."
    >
      <ImageFormatConverter
        acceptTypes="image/png,.png"
        sourceLabel="PNG"
        targetFormat="image/webp"
        targetExtension="webp"
        targetLabel="WEBP"
      />
    </ToolPageLayout>
  );
}
