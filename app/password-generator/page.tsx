import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import PasswordGeneratorTool from "./PasswordGeneratorTool";

export const metadata: Metadata = getToolMetadata("password-generator");

export default function PasswordGeneratorPage() {
  return (
    <ToolPageLayout toolId="password-generator">
      <PasswordGeneratorTool />
    </ToolPageLayout>
  );
}
