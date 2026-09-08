import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import SvgToPngTool from "./SvgToPngTool";

export const metadata: Metadata = {
  title: "SVG PNG Dönüştürücü - Ücretsiz Online",
  description:
    "Vektörel SVG dosyalarınızı yüksek çözünürlüklü (1x, 2x, 4x, 8x) şeffaf veya beyaz zeminli PNG formatına dönüştürün. Ücretsiz ve reklamsız.",
  openGraph: {
    title: "SVG PNG Dönüştürücü - Ücretsiz Online | turkconvert",
    description: "SVG vektörlerini anında yüksek kaliteli PNG'ye çevirin.",
  },
};

export default function SvgToPngPage() {
  return (
    <ToolPageLayout
      title="SVG → PNG Dönüştürücü"
      description="SVG vektör grafiklerinizi istediğiniz çözünürlükte ve arka plan tercihiyle net bir PNG formatına dönüştürün."
    >
      <SvgToPngTool />
    </ToolPageLayout>
  );
}
