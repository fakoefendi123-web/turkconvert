import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik Politikasý",
  description: "turkconvert gizlilik politikasý ve veri güvenliði ilkeleri.",
  openGraph: {
    title: "Gizlilik Politikasý | turkconvert",
    description: "turkconvert gizlilik politikasý ve veri güvenliði ilkeleri.",
    type: "website",
    locale: "tr_TR",
    siteName: "turkconvert",
  },
};

export default function GizlilikPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        Gizlilik Politikasý
      </h1>

      <div className="mt-8 space-y-6 text-gray-600 dark:text-gray-300">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Verilerinizin Güvenliði
          </h2>
          <p className="mt-2 leading-relaxed">
            turkconvert olarak kullanýcý gizliliðine büyük önem veriyoruz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Dosya Ýþleme
          </h2>
          <p className="mt-2 leading-relaxed">
            Görsel dönüþtürme, metin iþleme ve geliþtirici araçlarý gibi
            iþlemler tamamen tarayýcýnýzda gerçekleþtirilir. Dosyalarýnýz
            sunucularýmýza gönderilmez.
          </p>
          <p className="mt-2 leading-relaxed">
            Sunucu tarafýnda iþlenmesi gereken dosyalar, iþlem tamamlandýktan
            sonra otomatik olarak silinir ve kalýcý olarak saklanmaz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Çerezler
          </h2>
          <p className="mt-2 leading-relaxed">
            Sitemiz yalnýzca tema tercihinizi (açýk/koyu mod) saklamak için yerel
            depolama kullanýr. Takip amaçlý çerez kullanýlmamaktadýr.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Üçüncü Taraf Paylaþýmý
          </h2>
          <p className="mt-2 leading-relaxed">
            Verileriniz hiçbir þekilde üçüncü taraflarla paylaþýlmaz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Ýletiþim
          </h2>
          <p className="mt-2 leading-relaxed">
            Gizlilik politikamýz hakkýnda sorularýnýz için{" "}
            <Link
              href="/iletisim"
              className="text-primary-600 hover:underline dark:text-primary-400"
            >
              iletiþim sayfamýzdan
            </Link>{" "}
            bize ulaþabilirsiniz.
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

