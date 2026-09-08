import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import JsonFormatterTool from "./JsonFormatterTool";

export const metadata: Metadata = {
  title: "JSON Formatter - JSON BiÃ§imlendirici",
  description: "JSON verilerinizi okunabilir formata dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
  openGraph: {
    title: "JSON Formatter - JSON BiÃ§imlendirici",
    description: "JSON verilerinizi okunabilir formata dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
  },
};

export default function JsonFormatterPage() {
  return (
    <ToolPageLayout
      title="JSON Formatter"
      description="JSON verilerinizi okunabilir formata dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n."
    >
      <JsonFormatterTool />
    </ToolPageLayout>
  );
}
