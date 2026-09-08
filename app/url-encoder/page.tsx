import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import UrlEncoderTool from "./UrlEncoderTool";

export const metadata: Metadata = {
  title: "URL Encoder - URL KodlayÄ±cÄ±",
  description:
    "Metinlerinizi veya parametrelerinizi gÃ¼venli URL formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
  openGraph: {
    title: "URL Encoder - URL KodlayÄ±cÄ±",
    description:
      "Metinlerinizi veya parametrelerinizi gÃ¼venli URL formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
  },
};

export default function UrlEncoderPage() {
  return (
    <ToolPageLayout
      title="URL Encoder"
      description="Metinlerinizi veya parametrelerinizi gÃ¼venli URL formatÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n."
    >
      <UrlEncoderTool />
    </ToolPageLayout>
  );
}
