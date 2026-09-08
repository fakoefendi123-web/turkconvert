import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import JsonMinifierTool from "./JsonMinifierTool";

export const metadata: Metadata = getToolMetadata("json-minifier");

export default function JsonMinifierPage() {
  return (
    <ToolPageLayout toolId="json-minifier">
      <JsonMinifierTool />
    </ToolPageLayout>
  );
}
