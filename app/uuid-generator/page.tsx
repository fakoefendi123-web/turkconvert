import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { UuidGeneratorTool } from "./UuidGeneratorTool";

export const metadata: Metadata = {
  title: "UUID Generator - UUID Oluşturucu",
  description:
    "Benzersiz UUID (v4) değerleri oluşturun. Tekli veya toplu UUID üretimi.",
  openGraph: {
    title: "UUID Generator - UUID Oluşturucu | turkconvert",
    description:
      "Benzersiz UUID (v4) değerleri oluşturun. Tekli veya toplu UUID üretimi.",
    type: "website",
    locale: "tr_TR",
    siteName: "turkconvert",
  },
};

export default function UuidGeneratorPage() {
  return (
    <ToolPageLayout
      title="UUID Generator - UUID Oluşturucu"
      description="Benzersiz UUID (v4) değerleri oluşturun. Tekli veya toplu UUID üretimi."
    >
      <UuidGeneratorTool />
    </ToolPageLayout>
  );
}

