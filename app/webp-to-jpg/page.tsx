import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = {
  title: "WEBP JPG Dönüştürücü - Ücretsiz Online",
  description:
    "WEBP dosyalarınızı ücretsiz ve kolayca JPG formatına dönüştürün. Üyelik ve reklam gerekmez.",
  openGraph: {
    title: "WEBP JPG Dönüştürücü - Ücretsiz Online",
    description:
      "WEBP dosyalarınızı ücretsiz ve kolayca JPG formatına dönüştürün. Üyelik ve reklam gerekmez.",
  },
};

export default function WebpToJpgPage() {
  return (
    <ToolPageLayout
      title="WEBP → JPG"
      description="WEBP görsellerinizi ücretsiz olarak JPG formatına dönüştürün."
    >
      <ImageFormatConverter
        acceptTypes="image/webp,.webp"
        sourceLabel="WEBP"
        targetFormat="image/jpeg"
        targetExtension="jpg"
        targetLabel="JPG"
      />
    </ToolPageLayout>
  );
}
