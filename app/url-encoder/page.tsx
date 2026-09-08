import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import UrlEncoderTool from "./UrlEncoderTool";

export const metadata: Metadata = {
  title: "URL Encoder - URL Kodlayıcı",
  description:
    "Metinlerinizi veya parametrelerinizi güvenli URL formatına dönüştürün.",
  openGraph: {
    title: "URL Encoder - URL Kodlayıcı",
    description:
      "Metinlerinizi veya parametrelerinizi güvenli URL formatına dönüştürün.",
  },
};

export default function UrlEncoderPage() {
  return (
    <ToolPageLayout
      title="URL Encoder"
      description="Metinlerinizi veya parametrelerinizi güvenli URL formatına dönüştürün."
    >
      <UrlEncoderTool />
    </ToolPageLayout>
  );
}
