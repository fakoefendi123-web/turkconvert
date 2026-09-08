import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description: "turkconvert kullanım koşulları ve hizmet şartları.",
  openGraph: {
    title: "Kullanım Koşulları | turkconvert",
    description: "turkconvert kullanım koşulları ve hizmet şartları.",
    type: "website",
    locale: "tr_TR",
    siteName: "turkconvert",
  },
};

export default function KullanimKosullariPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        Kullanım Koşulları
      </h1>

      <div className="mt-8 space-y-6 text-gray-600 dark:text-gray-300">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Genel
          </h2>
          <p className="mt-2 leading-relaxed">
            turkconvert&apos;yi kullanarak aşağıdaki koşulları kabul etmiş
            olursunuz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Hizmet Açıklaması
          </h2>
          <p className="mt-2 leading-relaxed">
            turkconvert, ücretsiz online dosya dönüştürme hizmeti sunar. Hizmet
            &quot;olduğu gibi&quot; sunulmaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Kullanım Kuralları
          </h2>
          <p className="mt-2 leading-relaxed">
            Hizmeti yasalara uygun şekilde kullanmalısınız. Kötüye kullanım
            durumunda erişim kısıtlanabilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Sorumluluk Sınırı
          </h2>
          <p className="mt-2 leading-relaxed">
            turkconvert, dosya dönüştürme işlemleri sırasında oluşabilecek veri
            kayıplarından sorumlu tutulamaz. Önemli dosyalarınızın yedeğini
            almanız önerilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Değişiklikler
          </h2>
          <p className="mt-2 leading-relaxed">
            Bu koşullar önceden haber verilmeksizin güncellenebilir.
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

