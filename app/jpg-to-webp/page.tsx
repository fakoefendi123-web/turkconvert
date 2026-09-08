import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import { ImageFormatConverter } from "@/components/ui/ImageFormatConverter";

export const metadata: Metadata = getToolMetadata("jpg-to-webp");

export default function JpgToWebpPage() {
  return (
    <ToolPageLayout toolId="jpg-to-webp">
      <ImageFormatConverter
        acceptTypes="image/jpeg,image/jpg,.jpg,.jpeg"
        sourceLabel="JPG"
        targetFormat="image/webp"
        targetExtension="webp"
        targetLabel="WEBP"
      />
    </ToolPageLayout>
  );
}
