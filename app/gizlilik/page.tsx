import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  ServerOff,
  Terminal,
  FileCheck2,
  CheckCircle2,
  Info,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Sıfır Veri Toplama Taahhüdü",
  description:
    "TurkConvert gizlilik politikası ve %100 tarayıcı tabanlı veri güvenliği ilkeleri. Dosyalarınız asla sunuculara yüklenmez.",
  alternates: {
    canonical: "https://turkconvert.online/gizlilik",
  },
  openGraph: {
    title: "Gizlilik Politikası | TurkConvert",
    description:
      "TurkConvert gizlilik politikası ve %100 tarayıcı tabanlı veri güvenliği ilkeleri. Dosyalarınız asla sunuculara yüklenmez.",
    url: "https://turkconvert.online/gizlilik",
    type: "website",
    locale: "tr_TR",
    siteName: "TurkConvert",
  },
};

export default function GizlilikPage() {
  const pillars = [
    {
      icon: <ServerOff className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Dosyalarınız Asla Sunucuya Yüklenmez",
      desc: "Görselleriniz, PDF belgeleriniz, metinleriniz ve parolalarınız tarayıcınızın geçici RAM belleğinde işlenir. Sunucularımıza tek bir bayt dosya dahi gönderilmez.",
    },
    {
      icon: <EyeOff className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Sıfır Takipçi & Sıfır Reklam Çerezi",
      desc: "Sitemizde kullanıcıları izleyen reklam pikselleri, davranışsal analitik kodları veya pazarlama çerezleri yer almaz. Yalnızca karanlık/aydınlık tema tercihiniz tarayıcınızda (localStorage) saklanır.",
    },
    {
      icon: <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "KVKK ve GDPR Tam Uyumluluk",
      desc: "E-posta, telefon, kimlik veya IP adresi gibi kişisel verileri toplamıyoruz. Toplanmayan ve saklanmayan veri çalınamaz veya sızdırılamaz.",
    },
    {
      icon: <Terminal className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
      title: "Kullanıcı Tarafından Denetlenebilir",
      desc: "Gizlilik vaadimize körü körüne inanmak zorunda değilsiniz. Tarayıcınızın Ağ (Network) sekmesini açarak tüm araçlarımızın çevrimdışı dahi çalıştığını görebilirsiniz.",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Geliştirici Araçlarını Açın",
      text: "Klavyenizden F12 tuşuna basın veya sağ tıklayıp 'İncele' (Inspect) deyin, ardından 'Ağ' (Network) sekmesine gelin.",
    },
    {
      step: "2",
      title: "Herhangi Bir Dosya Dönüştürün",
      text: "Görsel sıkıştırma, şeffaf imza veya PDF fatura aracımızda işlem yapın.",
    },
    {
      step: "3",
      title: "Ağ Trafiğini İnceleyin",
      text: "Ağ sekmesinde hiçbir dosya yükleme (POST/PUT) isteği oluşmadığını, tüm işlemin 0 ms ağ süresiyle cihazınızda tamamlandığını gözlemleyin.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 backdrop-blur-sm dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Sıfır Veri Toplama Politikası</span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Verileriniz Cihazınızda Kalır.{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
            Asla Sunucuya Yüklenmez.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
          TurkConvert, gizliliği sonradan eklenen bir özellik olarak değil, mimarisinin temeli olarak kabul eder. Web sitemizdeki tüm işlemler %100 istemci taraflı (client-side) çalışır.
        </p>
      </div>

      {/* Official Guarantee Box */}
      <div className="mt-12 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-emerald-50/70 p-6 shadow-sm dark:border-emerald-900/50 dark:from-emerald-950/20 dark:via-teal-950/10 dark:to-emerald-950/20 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
              Resmi Gizlilik Taahhüdümüz
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200 sm:text-base">
              TurkConvert üzerinde işlem yaptığınız hiçbir dosya (özel fotoğraflarınız, belgeleriniz, taranmış imzalarınız, faturalarınız veya metinleriniz) sunucularımıza yüklenmez, saklanmaz, taranmaz ve hiçbir yapay zeka eğitiminde kullanılmaz. İşlemler bilgisayarınızın yerel işlemcisi tarafından anlık olarak icra edilir.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800">
              {pillar.icon}
            </div>
            <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Verification Guide */}
      <div className="mt-14 rounded-2xl border border-gray-200 bg-gray-50/70 p-6 dark:border-gray-800 dark:bg-gray-900/50 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-950/60 dark:text-primary-400">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
              Gizliliğimizi 3 Adımda Bizzat Test Edin
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sözlerimize güvenmek yerine kendi gözlerinizle doğrulayın
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-xs font-bold text-white dark:bg-primary-500">
                {s.step}
              </div>
              <h4 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
                {s.title}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Legal & Policy Sections */}
      <div className="mt-14 space-y-8 text-gray-600 dark:text-gray-300">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            1. İşlenen Veriler ve İstemci Taraflı Çalışma Prensibi
          </h2>
          <p className="mt-3 leading-relaxed text-sm">
            TurkConvert; görsel dönüştürme, sıkıştırma, PDF fatura oluşturma, QR kod üretimi ve metin analizi gibi 40&apos;tan fazla aracı tamamen <strong>HTML5 Canvas, Web Cryptography API, Web Workers ve jsPDF</strong> motorlarıyla kullanıcının yerel tarayıcısında çalıştırır. Yüklediğiniz dosyalar sunucularımıza gitmez; tarayıcı sekmesini kapattığınızda RAM belleğinden tamamen silinir.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            2. Çerezler (Cookies) ve Yerel Depolama (Local Storage)
          </h2>
          <p className="mt-3 leading-relaxed text-sm">
            Web sitemiz reklam hedeflemesi, üçüncü taraf analitik takibi veya kullanıcı kimliklendirme amaçlı çerez (cookie) kullanmamaktadır. Yalnızca aşağıdaki kullanıcı dostu tercihler tarayıcınızın kendi yerel hafızasında (localStorage) saklanır:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm">
            <li><strong>Açık / Koyu Tema Tercihi:</strong> Sitenin renk modunu hatırlamak için.</li>
            <li><strong>Fatura Şablon Bilgileri:</strong> Fatura oluşturucu aracında şirket adı veya IBAN gibi alanları her defasında baştan girmemeniz için (isteğe bağlı).</li>
            <li><strong>Son Kullanılan Araçlar:</strong> Ana sayfada size hız kazandıran son araçlar çubuğu için.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            3. Kişisel Verilerin Korunması (KVKK & GDPR)
          </h2>
          <p className="mt-3 leading-relaxed text-sm">
            6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) kapsamında, TurkConvert kullanıcılarına ait herhangi bir kişisel veri (ad, soyad, telefon numarası, e-posta, T.C. kimlik numarası vb.) talep etmemekte, işlememekte ve veritabanında saklamamaktadır.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            4. Dış Bağlantılar ve Güvenlik
          </h2>
          <p className="mt-3 leading-relaxed text-sm">
            Web sitemiz HTTPS (SSL/TLS) şifreleme protokolü altında güvenle sunulmaktadır. Web sitemizden harici sitelere verilen bağlantılarda (sosyal medya, resmi kurumlar vb.) o sitelerin kendi gizlilik ilkeleri geçerlidir.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            5. İletişim ve Haklarınız
          </h2>
          <p className="mt-3 leading-relaxed text-sm">
            Gizlilik politikamız ve veri güvenliği uygulamalarımız hakkında her türlü soru, geri bildirim veya teknik görüşleriniz için{" "}
            <Link
              href="/iletisim"
              className="font-semibold text-primary-600 hover:underline dark:text-primary-400"
            >
              İletişim & Destek sayfamızdan
            </Link>{" "}
            bize ulaşabilirsiniz.
          </p>
        </section>

        <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-xs text-gray-400 dark:border-gray-800 dark:text-gray-500">
          <span>TurkConvert Gizlilik ve Güvenlik Departmanı</span>
          <span>Son Güncelleme: Eylül 2026</span>
        </div>
      </div>
    </div>
  );
}
