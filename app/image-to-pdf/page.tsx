import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import ImageToPdfTool from "./ImageToPdfTool";

export const metadata: Metadata = {
  title: "Görselleri PDF Yapma - Ücretsiz Online | turkconvert",
  description:
    "Birden fazla JPG, PNG veya WEBP görselini tek bir PDF belgesinde birleþtirin. Sayfa sýrasýný serbestçe belirleyin, tamamen ücretsiz ve güvenli.",
  openGraph: {
    title: "Görselleri PDF Yapma - Ücretsiz Online | turkconvert",
    description:
      "Birden fazla görseli tek bir PDF belgesinde birleþtirin.",
  },
};

export default function ImageToPdfPage() {
  return (
    <ToolPageLayout
      title="Görseller › PDF Dönüþtürücü"
      description="Birden fazla görseli tek bir PDF dosyasýnda birleþtirin."
    >
      <ImageToPdfTool />
    </ToolPageLayout>
  );
}

