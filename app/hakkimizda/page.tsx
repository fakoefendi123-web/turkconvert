import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Lock,
  Cpu,
  Sparkles,
  ServerOff,
  CheckCircle2,
  ArrowRight,
  Code2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda | Gizliliğe Saygılı Yeni Nesil Web Araçları",
  description:
    "TurkConvert hakkında bilgi edinin. Dosyalarınızı hiçbir sunucuya yüklemeden, doğrudan tarayıcınızda işleyen %100 istemci taraflı araçlar ekosistemi.",
  alternates: {
    canonical: "https://turkconvert.online/hakkimizda",
  },
  openGraph: {
    title: "Hakkımızda | TurkConvert",
    description:
      "TurkConvert hakkında bilgi edinin. Dosyalarınızı hiçbir sunucuya yüklemeden, doğrudan tarayıcınızda işleyen %100 istemci taraflı araçlar ekosistemi.",
    url: "https://turkconvert.online/hakkimizda",
    type: "website",
    locale: "tr_TR",
    siteName: "TurkConvert",
  },
};

export default function HakkimizdaPage() {
  const stats = [
    { label: "Ücretsiz Araç", value: "40+" },
    { label: "İstemci Taraflı İşleme", value: "%100" },
    { label: "Sunucuya Yüklenen Veri", value: "0 Bayt" },
    { label: "Üyelik / Gizli Ücret", value: "0 TL" },
  ];

  const pillars = [
    {
      icon: <Cpu className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
      title: "%100 İstemci Taraflı (Client-Side) Mimari",
      description:
        "Tüm görsel dönüştürmeler, metin analizleri, PDF fatura derlemeleri ve QR kod üretimleri doğrudan cihazınızın kendi işlemcisinde (CPU/GPU) gerçekleşir. Dosyalarınız hiçbir harici sunucuya yüklenmez.",
    },
    {
      icon: <ServerOff className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Sıfır Sunucu Depolaması & Sıfır Veritabanı",
      description:
        "TurkConvert bünyesinde kullanıcı dosyalarını tutan hiçbir veritabanı veya bulut depolama alanı yoktur. Verilerinizin çalınması, sızdırılması veya izinsiz kullanılması teknik olarak imkansızdır.",
    },
    {
      icon: <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Kayıt, Üyelik ve E-posta Zorunluluğu Yok",
      description:
        "Hesap oluşturmakla, şifre hatırlamakla veya e-posta doğrulamakla vakit kaybetmeyin. Tarayıcınızı açtığınız anda tüm araçları tam kapasiteyle ve anında kullanabilirsiniz.",
    },
    {
      icon: <Zap className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
      title: "Maksimum Hız & Sınırsız Kullanım",
      description:
        "Büyük dosyaları internete yükleyip saatlerce bekleme devri bitti. İşlemler yerel RAM belleğinizde gerçekleştiği için internet bağlantı hızınızdan bağımsız olarak anlık sonuç alırsınız.",
    },
  ];

  const technologies = [
    {
      name: "HTML5 Canvas & WebGL",
      desc: "Görsel format dönüşümleri, şeffaf imza ayıklama ve görsel karşılaştırma işlemleri için donanım hızlandırmalı grafik motoru.",
    },
    {
      name: "Web Cryptography API",
      desc: "Rastgele güvenli şifre üretimi, hash hesaplamaları ve metin şifreleme işlemlerinde W3C standartlarında yerel şifreleme.",
    },
    {
      name: "İstemci Taraflı PDF Motoru",
      desc: "Faturalar, fişler ve teklif belgeleri harici bir yazılıma ihtiyaç duymadan doğrudan tarayıcı belleğinde vektörel olarak üretilir.",
    },
    {
      name: "Web Workers & Local Storage",
      desc: "Ağır hesaplama gerektiren algoritmalar arayüzü dondurmadan arka planda çalışır; tercihleriniz sadece cihazınızda saklanır.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
      {/* Hero Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50/80 px-3.5 py-1.5 text-xs font-semibold text-primary-700 backdrop-blur-sm dark:border-primary-800/60 dark:bg-primary-950/40 dark:text-primary-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Yeni Nesil Web Ekosistemi</span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Gizliliğinize Saygılı,{" "}
          <span className="bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-500 bg-clip-text text-transparent dark:from-primary-400 dark:via-indigo-400 dark:to-primary-300">
            Tarayıcı Tabanlı
          </span>{" "}
          Araçlar
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
          TurkConvert; dosyalarınızı uzak sunuculara yüklemeden, tamamen cihazınızın kendi donanım gücüyle dönüştüren, optimize eden ve üreten bağımsız bir web araçları platformudur.
        </p>
      </div>

      {/* Stats Counter Bar */}
      <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50/70 to-white p-6 shadow-sm dark:border-gray-800 dark:from-gray-900/60 dark:to-gray-950 sm:grid-cols-4 sm:p-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className="text-2xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Core Mission & Story */}
      <div className="mt-16 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-950/60 dark:text-primary-400">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
              Neden TurkConvert?
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Klasik dosya dönüştürme sitelerinin ötesinde bir vizyon
            </p>
          </div>
        </div>

        <p className="mt-6 leading-relaxed text-gray-600 dark:text-gray-300">
          İnternetteki pek çok dosya dönüştürme ve ofis aracı, kullanıcıların özel fotoğraflarını, faturalarını veya gizli belgelerini kendi uzak sunucularına yüklemelerini zorunlu kılar. Bu durum hem ciddi bir gizlilik riski doğurur hem de internete yükleme süreleri nedeniyle vakit kaybettirir.
        </p>
        <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
          <strong>TurkConvert bu paradigmayı tamamen değiştirmek için kuruldu:</strong> Modern web tarayıcılarının sunduğu ileri seviye HTML5, Canvas, WebAssembly ve kriptografi API&apos;lerini kullanarak tüm hesaplamaları kullanıcının kendi tarayıcısında çalıştırıyoruz. Böylece dosyalarınız bilgisayarınızın RAM belleğinden asla dışarı çıkmaz.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="mt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Temel Değerlerimiz ve Taahhütlerimiz
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sizlere en güvenilir ve hızlı deneyimi sunmak için benimsediğimiz ilkeler
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-800/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800">
                {pillar.icon}
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white sm:text-lg">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack Section */}
      <div className="mt-16 rounded-2xl border border-gray-200 bg-gray-50/60 p-8 dark:border-gray-800 dark:bg-gray-900/40 sm:p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <Code2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
              Kaputun Altındaki Teknoloji
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sunucu ihtiyacını ortadan kaldıran modern tarayıcı standartları
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                <CheckCircle2 className="h-4 w-4 text-primary-500" />
                <span>{tech.name}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400 sm:text-sm">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="mt-16 rounded-3xl bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-700 p-8 text-center text-white shadow-lg sm:p-12">
        <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
          Hemen Güvenli ve Hızlı Araçları Deneyin
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-primary-100 sm:text-base">
          Dosyalarınızı hiçbir yere yüklemeden dönüştürmenin ve üretmenin rahatlığını yaşayın. TurkConvert tamamen ücretsizdir.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#araclar"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary-700 shadow-sm transition-all hover:bg-primary-50 hover:shadow"
          >
            <span>Tüm Araçları Keşfet</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/gizlilik"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Gizlilik İlkelerimizi İnceleyin</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
