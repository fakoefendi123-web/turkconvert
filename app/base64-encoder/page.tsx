import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import Base64EncoderTool from "./Base64EncoderTool";

export const metadata: Metadata = {
  title: "Base64 Encoder - Base64 KodlayÄ±cÄ±",
  description: "Metinlerinizi Base64 formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
  openGraph: {
    title: "Base64 Encoder - Base64 KodlayÄ±cÄ±",
    description: "Metinlerinizi Base64 formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
  },
};

export default function Base64EncoderPage() {
  return (
    <ToolPageLayout
      title="Base64 Encoder"
      description="Metinlerinizi Base64 formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n."
    >
      <Base64EncoderTool />
    </ToolPageLayout>
  );
}
