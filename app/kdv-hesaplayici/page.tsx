import type { Metadata } from "next";
import KdvCalculatorTool from "./KdvCalculatorTool";

export const metadata: Metadata = {
  title: "KDV & Tevkifat Hesaplayıcı - KDV Dahil/Hariç Hesaplama | TurkConvert",
  description:
    "2026 güncel %1, %10, %20 oranlarıyla KDV dahil ve hariç hesaplayın, tevkifat oranlarını anında öğrenin. Ücretsiz, reklamsız ve hızlı finans aracı.",
  keywords: [
    "kdv hesaplama",
    "kdv dahil hesapla",
    "kdv hariç hesapla",
    "tevkifat hesaplama",
    "kdv hesaplayıcı online",
  ],
};

export default function KdvCalculatorPage() {
  return <KdvCalculatorTool />;
}
