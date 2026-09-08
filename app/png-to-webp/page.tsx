import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = getToolMetadata("png-to-webp");

export default function PngToWebpPage() {
  return (
    <ToolPageLayout toolId="png-to-webp">
      <ImageFormatConverter
        acceptTypes="image/png,.png"
        sourceLabel="PNG"
        targetFormat="image/webp"
        targetExtension="webp"
        targetLabel="WEBP"
      />
    </ToolPageLayout>
  );
}
