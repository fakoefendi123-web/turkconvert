import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import JsonMinifierTool from "./JsonMinifierTool";

export const metadata: Metadata = {
  title: "JSON Minifier - JSON SÄ±kÄ±ÅŸtÄ±rÄ±cÄ±",
  description: "JSON verilerinizi sÄ±kÄ±ÅŸtÄ±rÄ±lmÄ±ÅŸ formata dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
  openGraph: {
    title: "JSON Minifier - JSON SÄ±kÄ±ÅŸtÄ±rÄ±cÄ±",
    description: "JSON verilerinizi sÄ±kÄ±ÅŸtÄ±rÄ±lmÄ±ÅŸ formata dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
  },
};

export default function JsonMinifierPage() {
  return (
    <ToolPageLayout
      title="JSON Minifier"
      description="JSON verilerinizi sÄ±kÄ±ÅŸtÄ±rÄ±lmÄ±ÅŸ formata dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n."
    >
      <JsonMinifierTool />
    </ToolPageLayout>
  );
}
