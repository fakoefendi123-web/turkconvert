import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import ExifCleanerTool from "./ExifCleanerTool";

export const metadata: Metadata = getToolMetadata("exif-cleaner");

export default function ExifCleanerPage() {
  return (
    <ToolPageLayout toolId="exif-cleaner">
      <ExifCleanerTool />
    </ToolPageLayout>
  );
}
