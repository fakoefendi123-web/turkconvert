import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import ImageCompressorTool from "./ImageCompressorTool";

export const metadata: Metadata = getToolMetadata("image-compressor");

export default function ImageCompressorPage() {
  return (
    <ToolPageLayout toolId="image-compressor">
      <ImageCompressorTool />
    </ToolPageLayout>
  );
}

