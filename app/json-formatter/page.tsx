import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import JsonFormatterTool from "./JsonFormatterTool";

export const metadata: Metadata = getToolMetadata("json-formatter");

export default function JsonFormatterPage() {
  return (
    <ToolPageLayout toolId="json-formatter">
      <JsonFormatterTool />
    </ToolPageLayout>
  );
}
