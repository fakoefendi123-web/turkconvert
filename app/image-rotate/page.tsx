import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import ImageRotateTool from "./ImageRotateTool";

export const metadata: Metadata = {
  title: "Görsel Döndürme ve Çevirme - Ücretsiz Online",
  description:
    "Görsellerinizi 90°, 180° veya 270° döndürün, yatay ve dikey olarak aynalayın. Tarayıcınızda ücretsiz, hızlı ve güvenli.",
  openGraph: {
    title: "Görsel Döndürme ve Çevirme - Ücretsiz Online | turkconvert",
    description:
      "Görsellerinizi ücretsiz olarak döndürün ve aynalayın. Üyelik gerekmez.",
  },
};

export default function ImageRotatePage() {
  return (
    <ToolPageLayout
      title="Görsel Döndürme & Çevirme"
      description="Görsellerinizi istediğiniz açıda döndürün veya yatay/dikey olarak aynalayın."
    >
      <ImageRotateTool />
    </ToolPageLayout>
  );
}
