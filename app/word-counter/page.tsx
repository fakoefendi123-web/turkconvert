import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import WordCounterTool from "./WordCounterTool";

export const metadata: Metadata = getToolMetadata("word-counter");

export default function WordCounterPage() {
  return (
    <ToolPageLayout toolId="word-counter">
      <WordCounterTool />
    </ToolPageLayout>
  );
}
