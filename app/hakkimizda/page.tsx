import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "turkconvert hakkında bilgi edinin.",
  openGraph: {
    title: "Hakkımızda | turkconvert",
    description: "turkconvert hakkında bilgi edinin.",
    type: "website",
    locale: "tr_TR",
    siteName: "turkconvert",
  },
};

export default function HakkimizdaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        Hakkımızda
      </h1>

      <div className="mt-8 space-y-6 text-gray-600 dark:text-gray-300">
        <section>
          <p className="leading-relaxed">
            turkconvert, dosyalarınızı hızlı ve güvenli bir şekilde dönüştürmenizi
            sağlayan ücretsiz bir online araçtır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Misyonumuz
          </h2>
          <p className="mt-2 leading-relaxed">
            Amacımız, kullanıcılarımıza reklamsız, üyelik gerektirmeyen ve mümkün
            olduğunca basit bir deneyim sunmaktır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Gizlilik ve Güvenlik
          </h2>
          <p className="mt-2 leading-relaxed">
            Dosyalarınız mümkün olan durumlarda tarayıcınızda işlenir ve
            sunucularımıza gönderilmez. Kullanıcı gizliliği ve veri güvenliği en
            temel önceliğimizdir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Sürekli Gelişim
          </h2>
          <p className="mt-2 leading-relaxed">
            turkconvert sürekli olarak geliştirilmektedir. Yeni araçlar ve
            özellikler düzenli olarak eklenmektedir.
          </p>
        </section>
      </div>
    </div>
  );
}

