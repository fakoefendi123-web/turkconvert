import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import IbanValidatorTool from "./IbanValidatorTool";

export const metadata: Metadata = getToolMetadata("iban-dogrulayici");

export default function IbanValidatorPage() {
  return (
    <ToolPageLayout toolId="iban-dogrulayici">
      <IbanValidatorTool />
    </ToolPageLayout>
  );
}
