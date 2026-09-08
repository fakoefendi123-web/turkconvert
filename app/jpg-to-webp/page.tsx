import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = {
  title: "JPG WEBP Dönüştürücü - Ücretsiz Online",
  description:
    "JPG dosyalarınızı ücretsiz ve kolayca WEBP formatına dönüştürün. Üyelik ve reklam gerekmez.",
  openGraph: {
    title: "JPG WEBP Dönüştürücü - Ücretsiz Online",
    description:
      "JPG dosyalarınızı ücretsiz ve kolayca WEBP formatına dönüştürün. Üyelik ve reklam gerekmez.",
  },
};

export default function JpgToWebpPage() {
  return (
    <ToolPageLayout
      title="JPG → WEBP"
      description="JPG görsellerinizi ücretsiz olarak WEBP formatına dönüştürün."
    >
      <ImageFormatConverter
        acceptTypes="image/jpeg,image/jpg,.jpg,.jpeg"
        sourceLabel="JPG"
        targetFormat="image/webp"
        targetExtension="webp"
        targetLabel="WEBP"
      />
    </ToolPageLayout>
  );
}
