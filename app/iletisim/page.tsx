import type { Metadata } from "next";
import { Clock, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim",
  description: "turkconvert iletişim bilgileri.",
  openGraph: {
    title: "İletişim | turkconvert",
    description: "turkconvert iletişim bilgileri.",
    type: "website",
    locale: "tr_TR",
    siteName: "turkconvert",
  },
};

export default function IletisimPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        İletişim
      </h1>

      <div className="mt-8 space-y-6">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 dark:border-amber-900/40 dark:bg-amber-950/20">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                İletişim Geçici Olarak Kapalıdır
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                Şu anda iletişim kanallarımız geçici bir süre için kapalıdır.
                Kurumsal iletişim altyapımız tamamlandığında buradan yeni
                iletişim kanallarımız paylaşılacaktır.
              </p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Anlayışınız ve sabrınız için teşekkür ederiz.
              </p>
            </div>
          </div>
        </div>

        <section className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          <p>
            turkconvert üzerinde dosya dönüştürme ve araç kullanımlarınızı
            herhangi bir üyelik veya e-posta doğrulaması olmadan 7/24 kesintisiz
            olarak sürdürebilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
}
