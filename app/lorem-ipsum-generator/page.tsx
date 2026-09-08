import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import LoremIpsumTool from "./LoremIpsumTool";

export const metadata: Metadata = getToolMetadata("lorem-ipsum-generator");

export default function LoremIpsumPage() {
  return (
    <ToolPageLayout toolId="lorem-ipsum-generator">
      <LoremIpsumTool />
    </ToolPageLayout>
  );
}
