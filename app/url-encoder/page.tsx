import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import UrlEncoderTool from "./UrlEncoderTool";

export const metadata: Metadata = getToolMetadata("url-encoder");

export default function UrlEncoderPage() {
  return (
    <ToolPageLayout toolId="url-encoder">
      <UrlEncoderTool />
    </ToolPageLayout>
  );
}
