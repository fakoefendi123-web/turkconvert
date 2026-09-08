import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import ImageToPdfTool from "./ImageToPdfTool";

export const metadata: Metadata = getToolMetadata("image-to-pdf");

export default function ImageToPdfPage() {
  return (
    <ToolPageLayout toolId="image-to-pdf">
      <ImageToPdfTool />
    </ToolPageLayout>
  );
}

