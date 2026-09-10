import type { Metadata } from "next";
import Link from "next/link";
import {
  HelpCircle,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  FileQuestion,
  Info,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim & Yardım Merkezi | TurkConvert",
  description:
    "TurkConvert iletişim durumu, sıkça sorulan sorular (S.S.S.) ve sistem bilgilendirmesi.",
  alternates: {
    canonical: "https://turkconvert.online/iletisim",
  },
  openGraph: {
    title: "İletişim & Yardım Merkezi | TurkConvert",
    description:
      "TurkConvert iletişim durumu, sıkça sorulan sorular (S.S.S.) ve sistem bilgilendirmesi.",
    url: "https://turkconvert.online/iletisim",
    type: "website",
    locale: "tr_TR",
    siteName: "TurkConvert",
  },
};

export default function IletisimPage() {
  const faqs = [
    {
      q: "Dosyalarım TurkConvert sunucularında saklanıyor mu?",
      a: "Hayır. TurkConvert %100 istemci taraflı (client-side) çalışır. Dosyalarınız hiçbir harici sunucuya iletilmez, yalnızca tarayıcınızın geçici RAM belleğinde işlenir ve sekme kapatıldığında tamamen silinir.",
    },
    {
      q: "Herhangi bir üyelik, kayıt veya gizli ücret var mı?",
      a: "Kesinlikle hayır. TurkConvert bünyesindeki 40'tan fazla araç tamamen ücretsizdir. Hesap açmanız, e-posta doğrulamanız veya kredi kartı bilgisi girmeniz gerekmez.",
    },
    {
      q: "Dosya boyutu veya dönüştürme sayısı sınırı var mı?",
      a: "Sunucu tarafında yapay kota veya günlük dönüştürme sınırı bulunmaz. İşlemler bilgisayarınızın donanımı üzerinde gerçekleştiğinden cihazınızın RAM kapasitesi yettiğince dilediğiniz kadar dosyayı işleyebilirsiniz.",
    },
    {
      q: "Ürettiğim faturalar ve belgeler ticari olarak geçerli midir?",
      a: "Evet. PDF Fatura ve Teklif Oluşturucu aracımızla hazırladığınız belgeler standart A4 formatında vektörel PDF olarak üretilir ve ticari yazışmalarınızda rahatlıkla kullanılabilir.",
    },
    {
      q: "Platformda neden veritabanı veya üyelik yok?",
      a: "TurkConvert, kullanıcı gizliliğini en üst düzeyde tutmak amacıyla statik mimaride geliştirilmiştir. Veritabanı tutulmadığı için kullanıcı verilerinin sızma riski sıfırdır.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/80 px-3.5 py-1.5 text-xs font-semibold text-amber-700 backdrop-blur-sm dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-300">
          <Clock className="h-3.5 w-3.5" />
          <span>Durum: İletişim Geçici Olarak Kapalı</span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Yardım ve{" "}
          <span className="bg-gradient-to-r from-amber-600 to-primary-600 bg-clip-text text-transparent dark:from-amber-400 dark:to-primary-400">
            Sıkça Sorulan Sorular
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
          TurkConvert ile ilgili en çok merak edilen konuların yanıtlarını aşağıda bulabilirsiniz.
        </p>
      </div>

      {/* Temporary Notice Box */}
      <div className="mt-12 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50/80 via-orange-50/40 to-amber-50/80 p-6 shadow-sm dark:border-amber-900/50 dark:from-amber-950/30 dark:via-orange-950/10 dark:to-amber-950/30 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
              Doğrudan İletişim Kanalları Geçici Olarak Kapalıdır
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200 sm:text-base">
              Kurumsal iletişim altyapımız yapılandırılma aşamasında olduğu için doğrudan e-posta veya destek bileti kanallarımız şu anda geçici bir süreyle kapalıdır.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              Platformumuzdaki tüm araçlar (%100 tarayıcı tabanlı olarak) herhangi bir kullanıcı desteğine veya yönetici onayına ihtiyaç duymadan 7/24 kesintisiz çalışmaya devam etmektedir.
            </p>
          </div>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
            <Zap className="h-4 w-4 text-primary-500" />
            <span>Kesintisiz 7/24 Kullanım</span>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Tüm dönüştürme ve ofis araçları tarayıcınızda bağımsız olarak çalışır.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>%100 Gizlilik Garantisi</span>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Dosyalarınız hiçbir sunucuya yüklenmez, verileriniz tamamen güvendedir.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
            <Layers className="h-4 w-4 text-indigo-500" />
            <span>Sıfır Kayıt & Üyelik</span>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Kullanım için hesap açmanıza veya e-posta onayına gerek yoktur.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-14">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-950/60 dark:text-primary-400">
            <FileQuestion className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
              Sıkça Sorulan Sorular (S.S.S.)
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Merak edilen teknik ve kullanım detayları
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Navigation Footer Box */}
      <div className="mt-14 rounded-2xl border border-gray-200 bg-gray-50/70 p-6 text-center dark:border-gray-800 dark:bg-gray-900/50 sm:p-8">
        <h3 className="text-base font-bold text-gray-900 dark:text-white sm:text-lg">
          TurkConvert Hakkında Daha Fazla Bilgi
        </h3>
        <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
          Platformumuzun mimarisini, veri güvenliği standartlarını ve yasal çerçevesini aşağıdaki sayfalardan inceleyebilirsiniz.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#araclar"
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-primary-700 sm:text-sm"
          >
            <span>Tüm Araçları Keşfet</span>
          </Link>
          <Link
            href="/hakkimizda"
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:text-sm"
          >
            <span>Hakkımızda</span>
          </Link>
          <Link
            href="/gizlilik"
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:text-sm"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Gizlilik Politikası</span>
          </Link>
          <Link
            href="/kullanim-kosullari"
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:text-sm"
          >
            <span>Kullanım Koşulları</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
