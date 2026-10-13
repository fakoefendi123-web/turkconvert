import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import TcValidatorTool from "./TcValidatorTool";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return getToolMetadata("tc-kimlik-dogrulayici");
}

export default function TcValidatorPage() {
  return (
    <ToolPageLayout toolId="tc-kimlik-dogrulayici">
      <TcValidatorTool />
    </ToolPageLayout>
  );
}
