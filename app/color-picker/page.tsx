import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import ColorPickerTool from "./ColorPickerTool";

export const metadata: Metadata = getToolMetadata("color-picker");

export default function ColorPickerPage() {
  return (
    <ToolPageLayout toolId="color-picker">
      <ColorPickerTool />
    </ToolPageLayout>
  );
}
