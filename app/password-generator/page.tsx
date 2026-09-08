import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import PasswordGeneratorTool from "./PasswordGeneratorTool";

export const metadata: Metadata = {
  title: "Güçlü Şifre Oluşturucu - Güvenli Parola Üretici",
  description:
    "Kırılması zor, güçlü ve güvenli şifreler üretin. Büyük-küçük harf, rakam ve sembol seçenekleriyle tekli veya toplu şifre oluşturucu.",
  openGraph: {
    title: "Güçlü Şifre Oluşturucu | turkconvert",
    description: "Kırılması imkansız güçlü şifreler üretin ve kopyalayın.",
  },
};

export default function PasswordGeneratorPage() {
  return (
    <ToolPageLayout
      title="Şifre Oluşturucu"
      description="Hesaplarınız ve güvenliğiniz için kırılması imkansız, güçlü ve rastgele parolalar üretin."
    >
      <PasswordGeneratorTool />
    </ToolPageLayout>
  );
}
