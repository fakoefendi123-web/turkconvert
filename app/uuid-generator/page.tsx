import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import { UuidGeneratorTool } from "./UuidGeneratorTool";

export const metadata: Metadata = getToolMetadata("uuid-generator");

export default function UuidGeneratorPage() {
  return (
    <ToolPageLayout toolId="uuid-generator">
      <UuidGeneratorTool />
    </ToolPageLayout>
  );
}

