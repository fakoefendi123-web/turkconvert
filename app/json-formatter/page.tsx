import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import JsonFormatterTool from "./JsonFormatterTool";

export const metadata: Metadata = {
  title: "JSON Formatter - JSON Biçimlendirici",
  description: "JSON verilerinizi okunabilir formata dönüştürün.",
  openGraph: {
    title: "JSON Formatter - JSON Biçimlendirici",
    description: "JSON verilerinizi okunabilir formata dönüştürün.",
  },
};

export default function JsonFormatterPage() {
  return (
    <ToolPageLayout
      title="JSON Formatter"
      description="JSON verilerinizi okunabilir formata dönüştürün."
    >
      <JsonFormatterTool />
    </ToolPageLayout>
  );
}
