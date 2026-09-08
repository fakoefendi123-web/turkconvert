import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import UrlDecoderTool from "./UrlDecoderTool";

export const metadata: Metadata = {
  title: "URL Decoder - URL Çözücü",
  description: "URL kodlu metinlerinizi çözerek orijinal haline dönüştürün.",
  openGraph: {
    title: "URL Decoder - URL Çözücü",
    description: "URL kodlu metinlerinizi çözerek orijinal haline dönüştürün.",
  },
};

export default function UrlDecoderPage() {
  return (
    <ToolPageLayout
      title="URL Decoder"
      description="URL kodlu metinlerinizi çözerek orijinal haline dönüştürün."
    >
      <UrlDecoderTool />
    </ToolPageLayout>
  );
}
