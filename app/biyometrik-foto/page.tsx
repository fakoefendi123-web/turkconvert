import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import BiometricPhotoTool from "./BiometricPhotoTool";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return getToolMetadata("biyometrik-foto");
}

export default function BiometricPhotoPage() {
  return (
    <ToolPageLayout toolId="biyometrik-foto">
      <BiometricPhotoTool />
    </ToolPageLayout>
  );
}
