import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import InvoiceGeneratorTool from "./InvoiceGeneratorTool";

export const metadata: Metadata = getToolMetadata("fatura-olusturucu");

export default function InvoiceGeneratorPage() {
  return (
    <ToolPageLayout toolId="fatura-olusturucu">
      <InvoiceGeneratorTool />
    </ToolPageLayout>
  );
}
