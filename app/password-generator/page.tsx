import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/ui/ToolPageLayout";
import PasswordGeneratorTool from "./PasswordGeneratorTool";

export const metadata: Metadata = {
  title: "GÃ¼Ã§lÃ¼ Åifre OluÅŸturucu - GÃ¼venli Parola Ãœretici",
  description:
    "KÄ±rÄ±lmasÄ± zor, gÃ¼Ã§lÃ¼ ve gÃ¼venli ÅŸifreler Ã¼retin. BÃ¼yÃ¼k-kÃ¼Ã§Ã¼k harf, rakam ve sembol seÃ§enekleriyle tekli veya toplu ÅŸifre oluÅŸturucu.",
  openGraph: {
    title: "GÃ¼Ã§lÃ¼ Åifre OluÅŸturucu | turkconvert",
    description: "KÄ±rÄ±lmasÄ± imkansÄ±z gÃ¼Ã§lÃ¼ ÅŸifreler Ã¼retin ve kopyalayÄ±n.",
  },
};

export default function PasswordGeneratorPage() {
  return (
    <ToolPageLayout
      title="Åifre OluÅŸturucu"
      description="HesaplarÄ±nÄ±z ve gÃ¼venliÄŸiniz iÃ§in kÄ±rÄ±lmasÄ± imkansÄ±z, gÃ¼Ã§lÃ¼ ve rastgele parolalar Ã¼retin."
    >
      <PasswordGeneratorTool />
    </ToolPageLayout>
  );
}
