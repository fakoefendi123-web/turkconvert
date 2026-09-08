import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import TextCleanerTool from "./TextCleanerTool";

export const metadata: Metadata = getToolMetadata("text-cleaner");

export default function TextCleanerPage() {
  return (
    <ToolPageLayout toolId="text-cleaner">
      <TextCleanerTool />
    </ToolPageLayout>
  );
}
