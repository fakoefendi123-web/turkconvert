import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import PngToPdfTool from "./PngToPdfTool";

export const metadata: Metadata = getToolMetadata("png-to-pdf");

export default function PngToPdfPage() {
  return (
    <ToolPageLayout toolId="png-to-pdf">
      <PngToPdfTool />
    </ToolPageLayout>
  );
}

