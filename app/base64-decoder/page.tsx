import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import Base64DecoderTool from "./Base64DecoderTool";

export const metadata: Metadata = getToolMetadata("base64-decoder");

export default function Base64DecoderPage() {
  return (
    <ToolPageLayout toolId="base64-decoder">
      <Base64DecoderTool />
    </ToolPageLayout>
  );
}
