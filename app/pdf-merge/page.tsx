import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import PdfMergeTool from "./PdfMergeTool";

export const metadata: Metadata = getToolMetadata("pdf-merge");

export default function PdfMergePage() {
  return (
    <ToolPageLayout toolId="pdf-merge">
      <PdfMergeTool />
    </ToolPageLayout>
  );
}
