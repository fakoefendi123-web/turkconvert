import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/constants/tool-seo";
import SalaryCalculatorTool from "./SalaryCalculatorTool";

export const metadata: Metadata = getToolMetadata("maas-hesaplayici");

export default function SalaryCalculatorPage() {
  return <SalaryCalculatorTool />;
}
