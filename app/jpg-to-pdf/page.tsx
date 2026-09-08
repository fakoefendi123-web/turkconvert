import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import JpgToPdfTool from "./JpgToPdfTool";

export const metadata: Metadata = {
  title: "JPG PDF Dönüþtürücü - Ücretsiz Online | turkconvert",
  description:
    "JPG formatýndaki görsellerinizi hýzlý ve ücretsiz olarak yüksek kaliteli PDF belgesine dönüþtürün. Kurulum veya üyelik gerektirmez.",
  openGraph: {
    title: "JPG PDF Dönüþtürücü - Ücretsiz Online | turkconvert",
    description:
      "JPG formatýndaki görsellerinizi hýzlý ve ücretsiz olarak PDF belgesine dönüþtürün.",
  },
};

export default function JpgToPdfPage() {
  return (
    <ToolPageLayout
      title="JPG › PDF Dönüþtürücü"
      description="JPG görsellerinizi PDF formatýna dönüþtürün."
    >
      <JpgToPdfTool />
    </ToolPageLayout>
  );
}

