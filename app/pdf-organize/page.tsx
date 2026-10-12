import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import PdfOrganizeTool from "./PdfOrganizeTool";

export const metadata: Metadata = getToolMetadata("pdf-organize");

export default function PdfOrganizePage() {
  return <PdfOrganizeTool />;
}
