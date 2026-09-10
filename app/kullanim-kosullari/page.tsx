import type { Metadata } from "next";
import Link from "next/link";
import {
  Scale,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | Hizmet ve Yasal Şartlar",
  description:
    "TurkConvert kullanım koşulları, fikri mülkiyet hakları, kabul edilebilir kullanım politikası ve yasal sorumluluk sınırları.",
  alternates: {
    canonical: "https://turkconvert.online/kullanim-kosullari",
  },
  openGraph: {
    title: "Kullanım Koşulları | TurkConvert",
    description:
      "TurkConvert kullanım koşulları, fikri mülkiyet hakları, kabul edilebilir kullanım politikası ve yasal sorumluluk sınırları.",
    url: "https://turkconvert.online/kullanim-kosullari",
    type: "website",
    locale: "tr_TR",
    siteName: "TurkConvert",
  },
};

export default function KullanimKosullariPage() {
  const highlights = [
    {
      icon: <Sparkles className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
      title: "Bireysel ve Ticari Kullanım Serbesttir",
      desc: "TurkConvert üzerindeki tüm dönüştürücü ve üretici araçları şahsi veya şirketinizin ticari faaliyetlerinde ücretsiz olarak kullanabilirsiniz.",
    },
    {
      icon: <FileCheck2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Çıktıların Tüm Mülkiyeti Size Aittir",
      desc: "Oluşturduğunuz faturalar, şeffaf imzalar, QR kodlar veya dönüştürdüğünüz görseller üzerinde hiçbir hak iddia etmeyiz; telif tamamen sizindir.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Cihazınızda Çalışır, Veri Saklanmaz",
      desc: "İşlemler tarayıcınızın kendi işlemcisinde yapıldığı için verilerinizin sunucuda kalıcı kopyası tutulmaz; yedekleme sorumluluğu kullanıcıya aittir.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50/80 px-3.5 py-1.5 text-xs font-semibold text-primary-700 backdrop-blur-sm dark:border-primary-800/60 dark:bg-primary-950/40 dark:text-primary-300">
          <Scale className="h-3.5 w-3.5" />
          <span>Şeffaf ve Adil Kullanım Sözleşmesi</span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Kullanım Koşulları ve{" "}
          <span className="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent dark:from-primary-400 dark:to-indigo-400">
            Hizmet Şartları
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
          TurkConvert web sitesini ziyaret ederek veya araçlarımızı kullanarak aşağıdaki şartları peşinen kabul etmiş sayılırsınız. Amacımız her iki taraf için de adil, güvenli ve şeffaf bir platform sunmaktır.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800">
              {item.icon}
            </div>
            <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400 sm:text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Structured Legal Terms */}
      <div className="mt-14 space-y-6 text-gray-600 dark:text-gray-300">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            1. Taraflar ve Hizmetin Tanımı
          </h2>
          <p className="mt-3 leading-relaxed text-sm">
            İşbu Kullanım Koşulları, <strong>TurkConvert</strong> (bundan böyle &quot;Site&quot; veya &quot;Platform&quot; olarak anılacaktır) ile siteyi ziyaret eden veya araçlardan faydalanan gerçek/tüzel kişiler (&quot;Kullanıcı&quot;) arasındaki hak ve yükümlülükleri düzenler. TurkConvert; dosya dönüştürme, sıkıştırma, şeffaf imza çıkarma, PDF fatura derleme, kod ve metin araçları gibi hizmetleri istemci taraflı (client-side) olarak sunan bağımsız bir dijital platformdur.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            2. Fikri Mülkiyet Hakları ve Kullanıcı İçerikleri
          </h2>
          <p className="mt-3 leading-relaxed text-sm">
            Kullanıcıların TurkConvert araçlarına yüklediği veya araçları kullanarak ürettiği tüm içeriklerin (görseller, PDF belgeleri, faturalar, imzalar, metinler vb.) telif ve fikri mülkiyet hakları münhasıran Kullanıcıya aittir. TurkConvert bu içerikler üzerinde herhangi bir hak, mülkiyet veya lisans iddiasında bulunmaz.
          </p>
          <p className="mt-2 leading-relaxed text-sm">
            Buna karşılık TurkConvert markası, logosu, arayüz tasarımı, özgün kaynak kodları ve web sitesi mimarisi telif hakları ve fikri mülkiyet kanunları kapsamında korunmaktadır.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            3. Kabul Edilebilir Kullanım Politikası
          </h2>
          <p className="mt-3 leading-relaxed text-sm">
            Kullanıcı, platformu yalnızca Türkiye Cumhuriyeti yasalarına, uluslararası hukuk kurallarına ve genel ahlaka uygun amaçlarla kullanmayı taahhüt eder. Aşağıdaki eylemler kesinlikle yasaktır:
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm">
            <li>Üçüncü şahısların telif, patent veya marka haklarını ihlal eden materyaller üretmek ya da işlemek.</li>
            <li>Başkalarına ait resmi belgeleri, imzaları veya faturaları izinsiz olarak taklit etmek veya tahrif etmek (dolandırıcılık ve resmi belgede sahtecilik suç teşkil eder).</li>
            <li>Platformun altyapısına, sunucularına veya kod tabanına yönelik kötü niyetli siber saldırı, tersine mühendislik veya DoS/DDoS girişimlerinde bulunmak.</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            4. Garanti Reddi ve Sorumluluk Sınırı
          </h2>
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs leading-relaxed text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300 sm:text-sm">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                <strong>Önemli Hatırlatma:</strong> TurkConvert üzerindeki tüm araçlar &quot;olduğu gibi&quot; (as-is) esasıyla sunulur. Dosyalarınız tamamen kendi cihazınızda işlendiğinden, işlem öncesinde kritik dosyalarınızın yedeğini almanız önemle tavsiye edilir.
              </span>
            </div>
          </div>
          <p className="mt-3 leading-relaxed text-sm">
            TurkConvert; tarayıcı uyumsuzlukları, cihazınızın donanımsal yetersizlikleri veya kullanıcının hatalı veri girişlerinden kaynaklanabilecek herhangi bir veri kaybı veya dolaylı zarardan yasal olarak sorumlu tutulamaz.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            5. Şartların Güncellenmesi ve Yürürlük
          </h2>
          <p className="mt-3 leading-relaxed text-sm">
            TurkConvert, sitede yer alan araçları, özellikleri ve işbu kullanım koşullarını önceden haber vermeksizin güncelleme veya revize etme hakkını saklı tutar. Güncellenmiş şartlar web sitesinde yayınlandığı andan itibaren yürürlüğe girer.
          </p>
          <p className="mt-3 leading-relaxed text-sm">
            Kullanım koşullarımızla ilgili her türlü hukuki ve teknik sorunuz için{" "}
            <Link
              href="/iletisim"
              className="font-semibold text-primary-600 hover:underline dark:text-primary-400"
            >
              İletişim sayfamızı
            </Link>{" "}
            ziyaret edebilirsiniz.
          </p>
        </section>

        <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-xs text-gray-400 dark:border-gray-800 dark:text-gray-500">
          <span>TurkConvert Hukuk ve Uyumluluk</span>
          <span>Son Güncelleme: Eylül 2026</span>
        </div>
      </div>
    </div>
  );
}
