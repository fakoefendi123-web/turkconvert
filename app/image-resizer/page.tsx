import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import ImageResizerTool from "./ImageResizerTool";

export const metadata: Metadata = getToolMetadata("image-resizer");

export default function ImageResizerPage() {
  return (
    <ToolPageLayout toolId="image-resizer">
      <ImageResizerTool />
    </ToolPageLayout>
  );
}

