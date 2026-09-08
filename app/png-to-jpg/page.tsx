import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = {
  title: "PNG JPG Dönüştürücü - Ücretsiz Online",
  description:
    "PNG dosyalarınızı ücretsiz ve kolayca JPG formatına dönüştürün. Üyelik ve reklam gerekmez.",
  openGraph: {
    title: "PNG JPG Dönüştürücü - Ücretsiz Online",
    description:
      "PNG dosyalarınızı ücretsiz ve kolayca JPG formatına dönüştürün. Üyelik ve reklam gerekmez.",
  },
};

export default function PngToJpgPage() {
  return (
    <ToolPageLayout
      title="PNG → JPG"
      description="PNG görsellerinizi ücretsiz olarak JPG formatına dönüştürün."
    >
      <ImageFormatConverter
        acceptTypes="image/png,.png"
        sourceLabel="PNG"
        targetFormat="image/jpeg"
        targetExtension="jpg"
        targetLabel="JPG"
      />
    </ToolPageLayout>
  );
}
