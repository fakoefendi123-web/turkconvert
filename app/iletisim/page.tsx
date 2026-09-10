import type { Metadata } from "next";
import Link from "next/link";
import {
  HelpCircle,
  Mail,
  Github,
  MessageSquare,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  FileQuestion,
} from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim & Yardım Merkezi | TurkConvert",
  description:
    "TurkConvert iletişim bilgileri, sıkça sorulan sorular (S.S.S.) ve teknik destek rehberi.",
  alternates: {
    canonical: "https://turkconvert.online/iletisim",
  },
  openGraph: {
    title: "İletişim & Destek | TurkConvert",
    description:
      "TurkConvert iletişim bilgileri, sıkça sorulan sorular (S.S.S.) ve teknik destek rehberi.",
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
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50/80 px-3.5 py-1.5 text-xs font-semibold text-primary-700 backdrop-blur-sm dark:border-primary-800/60 dark:bg-primary-950/40 dark:text-primary-300">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Yardım & Destek Merkezi</span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Nasıl{" "}
          <span className="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent dark:from-primary-400 dark:to-indigo-400">
            Yardımcı Olabiliriz?
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
          TurkConvert hakkında en çok merak edilen soruların yanıtlarını aşağıda bulabilir, yeni araç önerileriniz veya hata bildirimleriniz için bize doğrudan ulaşabilirsiniz.
        </p>
      </div>

      {/* Contact Options Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-400">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
            E-Posta İletişim
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            İş birliği, kurumsal geri bildirim veya teknik sorularınız için bize e-posta ile ulaşabilirsiniz.
          </p>
          <div className="mt-4">
            <a
              href="mailto:destek@turkconvert.online"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400"
            >
              <span>destek@turkconvert.online</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            <Github className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
            Geri Bildirim & Hata Bildirimi
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Yeni bir araç önermek veya karşılaştığınız teknik bir hatayı bildirmek için topluluk kanallarımızı kullanabilirsiniz.
          </p>
          <div className="mt-4">
            <a
              href="https://github.com/fakoefendi123-web/turkconvert/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400"
            >
              <span>GitHub Issues Üzerinden Bildir</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <FileQuestion className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
              Sıkça Sorulan Sorular (S.S.S.)
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Kullanıcılarımızın en çok merak ettiği konular
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
          Aklınıza Takılan Başka Bir Konu Var mı?
        </h3>
        <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
          Platformumuzun çalışma prensiplerini ve veri güvenliği standartlarını detaylıca incelemek için diğer kurumsal sayfalarımıza göz atabilirsiniz.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
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
