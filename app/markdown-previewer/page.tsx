import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import MarkdownPreviewerTool from "./MarkdownPreviewerTool";

export const metadata: Metadata = getToolMetadata("markdown-previewer");

export default function MarkdownPreviewerPage() {
  return (
    <ToolPageLayout toolId="markdown-previewer">
      <MarkdownPreviewerTool />
    </ToolPageLayout>
  );
}
