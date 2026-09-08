import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import UrlDecoderTool from "./UrlDecoderTool";

export const metadata: Metadata = getToolMetadata("url-decoder");

export default function UrlDecoderPage() {
  return (
    <ToolPageLayout toolId="url-decoder">
      <UrlDecoderTool />
    </ToolPageLayout>
  );
}
