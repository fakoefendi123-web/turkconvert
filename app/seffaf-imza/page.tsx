import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import TransparentSignatureTool from "./TransparentSignatureTool";

export const metadata: Metadata = getToolMetadata("seffaf-imza");

export default function TransparentSignaturePage() {
  return (
    <ToolPageLayout toolId="seffaf-imza">
      <TransparentSignatureTool />
    </ToolPageLayout>
  );
}
