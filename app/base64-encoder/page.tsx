import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import Base64EncoderTool from "./Base64EncoderTool";

export const metadata: Metadata = getToolMetadata("base64-encoder");

export default function Base64EncoderPage() {
  return (
    <ToolPageLayout toolId="base64-encoder">
      <Base64EncoderTool />
    </ToolPageLayout>
  );
}
