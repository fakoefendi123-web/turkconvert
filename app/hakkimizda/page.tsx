import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkýmýzda",
  description: "turkconvert hakkýnda bilgi edinin.",
  openGraph: {
    title: "Hakkýmýzda | turkconvert",
    description: "turkconvert hakkýnda bilgi edinin.",
    type: "website",
    locale: "tr_TR",
    siteName: "turkconvert",
  },
};

export default function HakkimizdaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        Hakkýmýzda
      </h1>

      <div className="mt-8 space-y-6 text-gray-600 dark:text-gray-300">
        <section>
          <p className="leading-relaxed">
            turkconvert, dosyalarýnýzý hýzlý ve güvenli bir þekilde dönüþtürmenizi
            saðlayan ücretsiz bir online araçtýr.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Misyonumuz
          </h2>
          <p className="mt-2 leading-relaxed">
            Amacýmýz, kullanýcýlarýmýza reklamsýz, üyelik gerektirmeyen ve mümkün
            olduðunca basit bir deneyim sunmaktýr.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Gizlilik ve Güvenlik
          </h2>
          <p className="mt-2 leading-relaxed">
            Dosyalarýnýz mümkün olan durumlarda tarayýcýnýzda iþlenir ve
            sunucularýmýza gönderilmez. Kullanýcý gizliliði ve veri güvenliði en
            temel önceliðimizdir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Sürekli Geliþim
          </h2>
          <p className="mt-2 leading-relaxed">
            turkconvert sürekli olarak geliþtirilmektedir. Yeni araçlar ve
            özellikler düzenli olarak eklenmektedir.
          </p>
        </section>
      </div>
    </div>
  );
}

