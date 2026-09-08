import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = {
  title: "WEBP PNG Dönüştürücü - Ücretsiz Online",
  description:
    "WEBP dosyalarınızı ücretsiz ve kolayca PNG formatına dönüştürün. Üyelik ve reklam gerekmez.",
  openGraph: {
    title: "WEBP PNG Dönüştürücü - Ücretsiz Online",
    description:
      "WEBP dosyalarınızı ücretsiz ve kolayca PNG formatına dönüştürün. Üyelik ve reklam gerekmez.",
  },
};

export default function WebpToPngPage() {
  return (
    <ToolPageLayout
      title="WEBP → PNG"
      description="WEBP görsellerinizi ücretsiz olarak PNG formatına dönüştürün."
    >
      <ImageFormatConverter
        acceptTypes="image/webp,.webp"
        sourceLabel="WEBP"
        targetFormat="image/png"
        targetExtension="png"
        targetLabel="PNG"
      />
    </ToolPageLayout>
  );
}
