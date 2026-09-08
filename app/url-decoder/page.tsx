import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import UrlDecoderTool from "./UrlDecoderTool";

export const metadata: Metadata = {
  title: "URL Decoder - URL Ã‡Ã¶zÃ¼cÃ¼",
  description: "URL kodlu metinlerinizi Ã§Ã¶zerek orijinal haline dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
  openGraph: {
    title: "URL Decoder - URL Ã‡Ã¶zÃ¼cÃ¼",
    description: "URL kodlu metinlerinizi Ã§Ã¶zerek orijinal haline dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
  },
};

export default function UrlDecoderPage() {
  return (
    <ToolPageLayout
      title="URL Decoder"
      description="URL kodlu metinlerinizi Ã§Ã¶zerek orijinal haline dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n."
    >
      <UrlDecoderTool />
    </ToolPageLayout>
  );
}
