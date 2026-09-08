import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = getToolMetadata("webp-to-png");

export default function WebpToPngPage() {
  return (
    <ToolPageLayout toolId="webp-to-png">
      <ImageFormatConverter
        acceptTypes="image/webp,.webp"
        sourceLabel="WEBP"
        targetFormat="image/png"
        targetExtension="png"
        targetLabel="PNG"
      />
    </ToolPageLayout>
  );
}
