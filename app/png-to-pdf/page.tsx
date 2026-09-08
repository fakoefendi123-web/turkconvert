import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import PngToPdfTool from "./PngToPdfTool";

export const metadata: Metadata = {
  title: "PNG PDF Dönüþtürücü - Ücretsiz Online | turkconvert",
  description:
    "PNG formatýndaki görsellerinizi þeffaflýk ve kalite kaybý olmadan ücretsiz olarak PDF belgesine dönüþtürün.",
  openGraph: {
    title: "PNG PDF Dönüþtürücü - Ücretsiz Online | turkconvert",
    description:
      "PNG formatýndaki görsellerinizi hýzlý ve ücretsiz olarak PDF belgesine dönüþtürün.",
  },
};

export default function PngToPdfPage() {
  return (
    <ToolPageLayout
      title="PNG › PDF Dönüþtürücü"
      description="PNG görsellerinizi PDF formatýna dönüþtürün."
    >
      <PngToPdfTool />
    </ToolPageLayout>
  );
}

