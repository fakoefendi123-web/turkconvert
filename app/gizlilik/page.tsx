import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "turkconvert gizlilik politikası ve veri güvenliği ilkeleri.",
  openGraph: {
    title: "Gizlilik Politikası | turkconvert",
    description: "turkconvert gizlilik politikası ve veri güvenliği ilkeleri.",
    type: "website",
    locale: "tr_TR",
    siteName: "turkconvert",
  },
};

export default function GizlilikPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        Gizlilik Politikası
      </h1>

      <div className="mt-8 space-y-6 text-gray-600 dark:text-gray-300">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Verilerinizin Güvenliği
          </h2>
          <p className="mt-2 leading-relaxed">
            turkconvert olarak kullanıcı gizliliğine büyük önem veriyoruz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Dosya İşleme
          </h2>
          <p className="mt-2 leading-relaxed">
            Görsel dönüştürme, metin işleme ve geliştirici araçları gibi
            işlemler tamamen tarayıcınızda gerçekleştirilir. Dosyalarınız
            sunucularımıza gönderilmez.
          </p>
          <p className="mt-2 leading-relaxed">
            Sunucu tarafında işlenmesi gereken dosyalar, işlem tamamlandıktan
            sonra otomatik olarak silinir ve kalıcı olarak saklanmaz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Çerezler
          </h2>
          <p className="mt-2 leading-relaxed">
            Sitemiz yalnızca tema tercihinizi (açık/koyu mod) saklamak için yerel
            depolama kullanır. Takip amaçlı çerez kullanılmamaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Üçüncü Taraf Paylaşımı
          </h2>
          <p className="mt-2 leading-relaxed">
            Verileriniz hiçbir şekilde üçüncü taraflarla paylaşılmaz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            İletişim
          </h2>
          <p className="mt-2 leading-relaxed">
            Gizlilik politikamız hakkında sorularınız için{" "}
            <Link
              href="/iletisim"
              className="text-primary-600 hover:underline dark:text-primary-400"
            >
              iletişim sayfamızdan
            </Link>{" "}
            bize ulaşabilirsiniz.
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

