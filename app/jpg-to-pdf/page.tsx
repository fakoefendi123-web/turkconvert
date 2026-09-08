import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import JpgToPdfTool from "./JpgToPdfTool";

export const metadata: Metadata = {
  title: "JPG PDF Dönüştürücü - Ücretsiz Online | turkconvert",
  description:
    "JPG formatındaki görsellerinizi hızlı ve ücretsiz olarak yüksek kaliteli PDF belgesine dönüştürün. Kurulum veya üyelik gerektirmez.",
  openGraph: {
    title: "JPG PDF Dönüştürücü - Ücretsiz Online | turkconvert",
    description:
      "JPG formatındaki görsellerinizi hızlı ve ücretsiz olarak PDF belgesine dönüştürün.",
  },
};

export default function JpgToPdfPage() {
  return (
    <ToolPageLayout
      title="JPG › PDF Dönüştürücü"
      description="JPG görsellerinizi PDF formatına dönüştürün."
    >
      <JpgToPdfTool />
    </ToolPageLayout>
  );
}

