import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import JpgToPdfTool from "./JpgToPdfTool";

export const metadata: Metadata = getToolMetadata("jpg-to-pdf");

export default function JpgToPdfPage() {
  return (
    <ToolPageLayout toolId="jpg-to-pdf">
      <JpgToPdfTool />
    </ToolPageLayout>
  );
}

