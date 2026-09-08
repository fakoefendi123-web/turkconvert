import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import SvgToPngTool from "./SvgToPngTool";

export const metadata: Metadata = getToolMetadata("svg-to-png");

export default function SvgToPngPage() {
  return (
    <ToolPageLayout toolId="svg-to-png">
      <SvgToPngTool />
    </ToolPageLayout>
  );
}
