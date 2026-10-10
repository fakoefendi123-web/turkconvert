import type { Metadata } from "next";
import IbanValidatorTool from "./IbanValidatorTool";

export const metadata: Metadata = {
  title: "IBAN Doğrulayıcı & Banka Bulucu - TR IBAN Kontrolü | TurkConvert",
  description:
    "Türkiye IBAN numarasını matematiksel Mod-97 algoritmasıyla doğrulayın, banka ve şube bilgilerini öğrenin. Ücretsiz, reklamsız ve güvenli.",
  keywords: [
    "iban doğrulama",
    "iban kontrol",
    "iban banka bulma",
    "tr iban doğrulayıcı",
    "iban geçerlilik kontrolü",
  ],
};

export default function IbanValidatorPage() {
  return <IbanValidatorTool />;
}
