import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullaným Koþullarý",
  description: "turkconvert kullaným koþullarý ve hizmet þartlarý.",
  openGraph: {
    title: "Kullaným Koþullarý | turkconvert",
    description: "turkconvert kullaným koþullarý ve hizmet þartlarý.",
    type: "website",
    locale: "tr_TR",
    siteName: "turkconvert",
  },
};

export default function KullanimKosullariPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        Kullaným Koþullarý
      </h1>

      <div className="mt-8 space-y-6 text-gray-600 dark:text-gray-300">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Genel
          </h2>
          <p className="mt-2 leading-relaxed">
            turkconvert&apos;yi kullanarak aþaðýdaki koþullarý kabul etmiþ
            olursunuz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Hizmet Açýklamasý
          </h2>
          <p className="mt-2 leading-relaxed">
            turkconvert, ücretsiz online dosya dönüþtürme hizmeti sunar. Hizmet
            &quot;olduðu gibi&quot; sunulmaktadýr.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Kullaným Kurallarý
          </h2>
          <p className="mt-2 leading-relaxed">
            Hizmeti yasalara uygun þekilde kullanmalýsýnýz. Kötüye kullaným
            durumunda eriþim kýsýtlanabilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Sorumluluk Sýnýrý
          </h2>
          <p className="mt-2 leading-relaxed">
            turkconvert, dosya dönüþtürme iþlemleri sýrasýnda oluþabilecek veri
            kayýplarýndan sorumlu tutulamaz. Önemli dosyalarýnýzýn yedeðini
            almanýz önerilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Deðiþiklikler
          </h2>
          <p className="mt-2 leading-relaxed">
            Bu koþullar önceden haber verilmeksizin güncellenebilir.
          </p>
        </section>

        <section className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Son güncelleme: Eylül 2026
          </p>
        </section>
      </div>
    </div>
  );
}

