import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import Base64DecoderTool from "./Base64DecoderTool";

export const metadata: Metadata = {
  title: "Base64 Decoder - Base64 Ã‡Ã¶zÃ¼cÃ¼",
  description: "Base64 formatÄ±ndaki verileri orijinal metne dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
  openGraph: {
    title: "Base64 Decoder - Base64 Ã‡Ã¶zÃ¼cÃ¼",
    description: "Base64 formatÄ±ndaki verileri orijinal metne dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
  },
};

export default function Base64DecoderPage() {
  return (
    <ToolPageLayout
      title="Base64 Decoder"
      description="Base64 formatÄ±ndaki verileri orijinal metne dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n."
    >
      <Base64DecoderTool />
    </ToolPageLayout>
  );
}
