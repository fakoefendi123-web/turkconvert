import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import PdfSplitTool from "./PdfSplitTool";

export const metadata: Metadata = getToolMetadata("pdf-split");

export default function PdfSplitPage() {
  return (
    <ToolPageLayout toolId="pdf-split">
      <PdfSplitTool />
    </ToolPageLayout>
  );
}
