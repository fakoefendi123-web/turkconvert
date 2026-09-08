import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import HashGeneratorTool from "./HashGeneratorTool";

export const metadata: Metadata = getToolMetadata("hash-generator");

export default function HashGeneratorPage() {
  return (
    <ToolPageLayout toolId="hash-generator">
      <HashGeneratorTool />
    </ToolPageLayout>
  );
}
