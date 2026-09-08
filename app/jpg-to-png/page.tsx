import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = {
  title: "JPG PNG Dönüştürücü - Ücretsiz Online",
  description:
    "JPG dosyalarınızı ücretsiz ve kolayca PNG formatına dönüştürün. Üyelik ve reklam gerekmez.",
  openGraph: {
    title: "JPG PNG Dönüştürücü - Ücretsiz Online",
    description:
      "JPG dosyalarınızı ücretsiz ve kolayca PNG formatına dönüştürün. Üyelik ve reklam gerekmez.",
  },
};

export default function JpgToPngPage() {
  return (
    <ToolPageLayout
      title="JPG → PNG"
      description="JPG görsellerinizi ücretsiz olarak PNG formatına dönüştürün."
    >
      <ImageFormatConverter
        acceptTypes="image/jpeg,image/jpg,.jpg,.jpeg"
        sourceLabel="JPG"
        targetFormat="image/png"
        targetExtension="png"
        targetLabel="PNG"
      />
    </ToolPageLayout>
  );
}
