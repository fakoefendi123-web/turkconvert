import type { Metadata } from "next";
import SalaryCalculatorTool from "./SalaryCalculatorTool";

export const metadata: Metadata = {
  title: "2026 Net-Brüt Maaş ve Bordro Hesaplayıcı | TurkConvert",
  description:
    "2026 güncel gelir vergisi dilimleri, SGK işçi/işveren payı ve asgari ücret istisnasıyla brütten nete ve netten brüte maaş hesaplayın. 12 aylık kümülatif bordro dökümü.",
  keywords: [
    "maaş hesaplama",
    "netten brüte maaş hesaplama",
    "brütten nete maaş hesaplama 2026",
    "2026 maaş bordrosu",
    "gelir vergisi dilimleri 2026",
    "sgk primi hesaplama",
    "türkiye maaş hesaplayıcı",
  ],
};

export default function SalaryCalculatorPage() {
  return <SalaryCalculatorTool />;
}
