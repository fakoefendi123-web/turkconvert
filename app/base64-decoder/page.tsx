import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import Base64DecoderTool from "./Base64DecoderTool";

export const metadata: Metadata = {
  title: "Base64 Decoder - Base64 Çözücü",
  description: "Base64 formatındaki verileri orijinal metne dönüştürün.",
  openGraph: {
    title: "Base64 Decoder - Base64 Çözücü",
    description: "Base64 formatındaki verileri orijinal metne dönüştürün.",
  },
};

export default function Base64DecoderPage() {
  return (
    <ToolPageLayout
      title="Base64 Decoder"
      description="Base64 formatındaki verileri orijinal metne dönüştürün."
    >
      <Base64DecoderTool />
    </ToolPageLayout>
  );
}
