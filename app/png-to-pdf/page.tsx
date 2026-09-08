import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import PngToPdfTool from "./PngToPdfTool";

export const metadata: Metadata = {
  title: "PNG PDF Dönüştürücü - Ücretsiz Online | turkconvert",
  description:
    "PNG formatındaki görsellerinizi şeffaflık ve kalite kaybı olmadan ücretsiz olarak PDF belgesine dönüştürün.",
  openGraph: {
    title: "PNG PDF Dönüştürücü - Ücretsiz Online | turkconvert",
    description:
      "PNG formatındaki görsellerinizi hızlı ve ücretsiz olarak PDF belgesine dönüştürün.",
  },
};

export default function PngToPdfPage() {
  return (
    <ToolPageLayout
      title="PNG → PDF Dönüştürücü"
      description="PNG görsellerinizi PDF formatına dönüştürün."
    >
      <PngToPdfTool />
    </ToolPageLayout>
  );
}

