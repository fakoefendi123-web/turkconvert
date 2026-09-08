import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import JsonMinifierTool from "./JsonMinifierTool";

export const metadata: Metadata = {
  title: "JSON Minifier - JSON Sıkıştırıcı",
  description: "JSON verilerinizi sıkıştırılmış formata dönüştürün.",
  openGraph: {
    title: "JSON Minifier - JSON Sıkıştırıcı",
    description: "JSON verilerinizi sıkıştırılmış formata dönüştürün.",
  },
};

export default function JsonMinifierPage() {
  return (
    <ToolPageLayout
      title="JSON Minifier"
      description="JSON verilerinizi sıkıştırılmış formata dönüştürün."
    >
      <JsonMinifierTool />
    </ToolPageLayout>
  );
}
