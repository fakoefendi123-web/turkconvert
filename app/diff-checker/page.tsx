import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import DiffCheckerTool from "./DiffCheckerTool";

export const metadata: Metadata = getToolMetadata("diff-checker");

export default function DiffCheckerPage() {
  return (
    <ToolPageLayout toolId="diff-checker">
      <DiffCheckerTool />
    </ToolPageLayout>
  );
}
