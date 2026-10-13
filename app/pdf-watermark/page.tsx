import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import PdfWatermarkTool from "./PdfWatermarkTool";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return getToolMetadata("pdf-watermark");
}

export default function PdfWatermarkPage() {
  return (
    <ToolPageLayout toolId="pdf-watermark">
      <PdfWatermarkTool />
    </ToolPageLayout>
  );
}
