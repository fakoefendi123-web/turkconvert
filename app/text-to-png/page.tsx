import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import TextToPngTool from "./TextToPngTool";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return getToolMetadata("text-to-png");
}

export default function TextToPngPage() {
  return (
    <ToolPageLayout toolId="text-to-png">
      <TextToPngTool />
    </ToolPageLayout>
  );
}
