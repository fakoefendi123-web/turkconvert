import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import Base64EncoderTool from "./Base64EncoderTool";

export const metadata: Metadata = {
  title: "Base64 Encoder - Base64 Kodlayıcı",
  description: "Metinlerinizi Base64 formatına dönüştürün.",
  openGraph: {
    title: "Base64 Encoder - Base64 Kodlayıcı",
    description: "Metinlerinizi Base64 formatına dönüştürün.",
  },
};

export default function Base64EncoderPage() {
  return (
    <ToolPageLayout
      title="Base64 Encoder"
      description="Metinlerinizi Base64 formatına dönüştürün."
    >
      <Base64EncoderTool />
    </ToolPageLayout>
  );
}
