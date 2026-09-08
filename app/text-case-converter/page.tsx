import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import TextCaseConverterTool from "./TextCaseConverterTool";

export const metadata: Metadata = {
  title: "BÃ¼yÃ¼k KÃ¼Ã§Ã¼k Harf DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼",
  description:
    "Metinlerinizi bÃ¼yÃ¼k harf, kÃ¼Ã§Ã¼k harf veya baÅŸlÄ±k dÃ¼zenine dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
  openGraph: {
    title: "BÃ¼yÃ¼k KÃ¼Ã§Ã¼k Harf DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼",
    description:
      "Metinlerinizi bÃ¼yÃ¼k harf, kÃ¼Ã§Ã¼k harf veya baÅŸlÄ±k dÃ¼zenine dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.",
  },
};

export default function TextCaseConverterPage() {
  return (
    <ToolPageLayout
      title="BÃ¼yÃ¼k KÃ¼Ã§Ã¼k Harf DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼"
      description="Metinlerinizi bÃ¼yÃ¼k harf, kÃ¼Ã§Ã¼k harf veya baÅŸlÄ±k dÃ¼zenine dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n."
    >
      <TextCaseConverterTool />
    </ToolPageLayout>
  );
}
