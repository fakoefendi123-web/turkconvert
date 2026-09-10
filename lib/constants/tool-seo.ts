import type { Metadata } from "next";

export interface ToolStep {
  title: string;
  description: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolSeoInfo {
  id: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  aboutTitle: string;
  aboutContent: string;
  steps: ToolStep[];
  faqs: ToolFaq[];
}

export const toolsSeo: Record<string, ToolSeoInfo> = {
  "jpg-to-png": {
    id: "jpg-to-png",
    title: "JPG to PNG Dönüştürücü - Ücretsiz Online Çevirme",
    description: "JPG dosyalarınızı kalite kaybı olmadan anında PNG formatına dönüştürün. Şeffaf arka plan desteği ve ücretsiz tarayıcı tabanlı çevirme.",
    h1: "JPG to PNG Dönüştürücü",
    intro: "JPG formatındaki fotoğraflarınızı ve görsellerinizi saniyeler içinde şeffaflık destekleyen yüksek kaliteli PNG formatına dönüştürün.",
    aboutTitle: "JPG ve PNG Formatları Nedir?",
    aboutContent: "JPG (JPEG), fotoğraflar ve karmaşık renk geçişleri için sıkıştırma oranı yüksek popüler bir görsel formatıdır; ancak şeffaflık (transparency) desteği bulunmaz. PNG ise kayıpsız sıkıştırma (lossless) sunan, özellikle keskin hatlar, logolar ve şeffaf arka planlar için tercih edilen bir standarttır. TurkConvert ile JPG'lerinizi sunucuya yüklemeden tarayıcınızda doğrudan PNG'ye çevirebilirsiniz.",
    steps: [
      { title: "JPG Dosyalarını Seçin", description: "Görsellerinizi sürükleyip bırakın veya dosya seçici ile cihazınızdan yükleyin." },
      { title: "Dönüştürmeyi Başlatın", description: "Tarayıcınız resim verilerini kayıpsız PNG formatında anında işler." },
      { title: "PNG Olarak İndirin", description: "Tek tek veya tüm görselleri toplu ZIP arşivi olarak bilgisayarınıza kaydedin." }
    ],
    faqs: [
      {
        question: "JPG'den PNG'ye geçerken şeffaflık otomatik eklenir mi?",
        answer: "JPG formatı şeffaflık verisi içermez. Dönüştürme işlemi görselin arka planını koruyarak PNG kalıbına aktarır. Şeffaf arka plan oluşturmak için arka plan kaldırma veya kırpma işlemleri gerekebilir."
      },
      {
        question: "Dönüştürme sırasında dosyalarım sunucunuza yüklenir mi?",
        answer: "Hayır. TurkConvert tüm görsel dönüştürme işlemlerini modern HTML5 Canvas teknolojisiyle doğrudan tarayıcınızda (cihazınızda) gerçekleştirir. Dosyalarınız hiçbir uzak sunucuya aktarılmaz."
      },
      {
        question: "Birden fazla JPG görselini aynı anda çevirebilir miyim?",
        answer: "Evet, çoklu dosya seçimi ve toplu indirme özelliği sayesinde onlarca JPG görselini tek seferde PNG formatına dönüştürebilirsiniz."
      },
      {
        question: "Dönüştürme sırasında görsel kalitesi düşer mi?",
        answer: "Hayır, PNG kayıpsız bir format olduğu için orijinal JPG piksel verileri tam netliğiyle korunur."
      }
    ]
  },
  "png-to-jpg": {
    id: "png-to-jpg",
    title: "PNG to JPG Dönüştürücü - Hızlı ve Ücretsiz Çevirme",
    description: "PNG formatındaki görsellerinizi dosya boyutunu küçülterek JPG formatına dönüştürün. Hızlı, güvenli ve ücretsiz online araç.",
    h1: "PNG to JPG Dönüştürücü",
    intro: "Büyük boyutlu PNG görsellerinizi dosya boyutundan tasarruf etmek için evrensel JPG formatına anında dönüştürün.",
    aboutTitle: "PNG'den JPG'ye Neden Dönüştürülmeli?",
    aboutContent: "PNG dosyaları kayıpsız sıkıştırma kullandığı için özellikle detaylı grafik ve fotoğraflarda megabaytlarca yer kaplayabilir. Web sitelerinde hız kazanmak veya e-posta eklerinde boyut sınırına takılmamak için PNG'yi JPG formatına çevirmek dosya boyutunu %70'e varan oranlarda küçültür. Saydam arka plana sahip PNG'lerdeki şeffaf kısımlar JPG'ye dönüştürülürken temiz beyaz renkle tamamlanır.",
    steps: [
      { title: "PNG Dosyalarını Yükleyin", description: "Dönüştürmek istediğiniz PNG görsellerini seçin veya sürükleyin." },
      { title: "JPG Optimizasyonu", description: "Görsel pikselleri yüksek kaliteli JPEG standardıyla dönüştürülür." },
      { title: "JPG Olarak Kaydedin", description: "Hafifletilmiş JPG dosyanızı anında cihazınıza indirin." }
    ],
    faqs: [
      {
        question: "PNG'deki saydam (şeffaf) alanlara ne olur?",
        answer: "JPG formatı şeffaflığı desteklemediği için saydam alanlar standart temiz beyaz arka plan rengine dönüştürülür."
      },
      {
        question: "Dosya boyutu ne kadar küçülür?",
        answer: "Görsel içeriğine bağlı olarak dosya boyutunda ortalama %50 ile %80 arasında belirgin bir küçülme sağlanır."
      },
      {
        question: "Görsellerim güvende mi?",
        answer: "Tüm dönüştürme tarayıcınızın belleğinde gerçekleşir. İnternete veya yabancı bir sunucuya dosya transferi yapılmaz."
      },
      {
        question: "Mobil cihazlarda (iOS / Android) çalışır mı?",
        answer: "Evet, TurkConvert modern tüm akıllı telefon ve tablet tarayıcılarında sorunsuz çalışır."
      }
    ]
  },
  "jpg-to-webp": {
    id: "jpg-to-webp",
    title: "JPG to WEBP Dönüştürücü - Web İçin Görsel Optimize Et",
    description: "JPG resimlerinizi Google'ın modern WEBP formatına dönüştürün. Kalite kaybı olmadan %30 daha küçük dosya boyutu elde edin.",
    h1: "JPG to WEBP Dönüştürücü",
    intro: "JPG görsellerinizi yeni nesil WEBP formatına çevirerek web sitenizin açılış hızını ve SEO performansını artırın.",
    aboutTitle: "WEBP Formatı Nedir ve Avantajları Nelerdir?",
    aboutContent: "WEBP, Google tarafından web için özel olarak geliştirilmiş modern bir resim formatıdır. Geleneksel JPEG'e kıyasla aynı görsel kalitesinde yaklaşık %25-%35 oranında daha küçük dosya boyutu sunar. Bu durum web sitelerinin daha hızlı yüklenmesini, sunucu bant genişliği tasarrufunu ve Google PageSpeed Core Web Vitals skorlarının yükselmesini sağlar.",
    steps: [
      { title: "JPG Dosyalarını Ekleyin", description: "Dönüştürmek istediğiniz JPG veya JPEG dosyalarını alana bırakın." },
      { title: "WEBP Kodlaması", description: "Tarayıcınız modern WEBP sıkıştırma algoritmasıyla görselleri kodlar." },
      { title: "WEBP Formatında İndirin", description: "Hafifletilmiş görsellerinizi tek tıkla veya toplu arşiv olarak indirin." }
    ],
    faqs: [
      {
        question: "WEBP formatını tüm tarayıcılar destekliyor mu?",
        answer: "Evet; Chrome, Safari, Firefox, Edge ve tüm modern mobil tarayıcılar WEBP formatını eksiksiz destekler."
      },
      {
        question: "Görsel kalitesinde bozulma olur mu?",
        answer: "Gelişmiş sıkıştırma algoritması insan gözünün fark edemeyeceği detayları optimize ederek görsel kalitesini korur."
      },
      {
        question: "Web sitemin SEO'suna katkısı olur mu?",
        answer: "Evet, görsel boyutlarının küçülmesi sayfa açılış hızını artırır ve Google arama sıralamalarına pozitif etki eder."
      },
      {
        question: "İşlem ücretli mi?",
        answer: "Hayır, TurkConvert üzerindeki tüm dönüştürme araçları tamamen ücretsiz ve sınırsızdır."
      }
    ]
  },
  "png-to-webp": {
    id: "png-to-webp",
    title: "PNG to WEBP Dönüştürücü - Şeffaf ve Hafif Görseller",
    description: "PNG görsellerinizi şeffaflığı koruyarak modern WEBP formatına dönüştürün. Boyutu küçültün, sayfa hızını artırın.",
    h1: "PNG to WEBP Dönüştürücü",
    intro: "Şeffaf arka plana sahip PNG görsellerinizi kaliteden ödün vermeden çok daha küçük boyutlu WEBP formatına çevirin.",
    aboutTitle: "PNG'den WEBP'ye Geçiş Neden Önemlidir?",
    aboutContent: "PNG özellikle şeffaflık (alfa kanalı) gerektiren grafiklerde yaygındır; fakat dosya boyutu oldukça büyüktür. WEBP formatı hem kayıpsız hem kayıplı sıkıştırmada şeffaflık desteği sunarak PNG kalitesini %60'a varan boyut tasarrufuyla birleştirir. Web sitenizin logo ve ikonlarını WEBP formatına taşımak performansı ciddi ölçüde iyileştirir.",
    steps: [
      { title: "PNG Dosyasını Seçin", description: "Şeffaf veya standart PNG görsellerinizi yükleyin." },
      { title: "WEBP'ye Çevirin", description: "Alfa kanalı şeffaflığı korunarak WEBP formatına aktarılır." },
      { title: "İndirin", description: "Optimize edilmiş hafif WEBP dosyanızı hemen kullanın." }
    ],
    faqs: [
      {
        question: "Saydam (şeffaf) arka plan korunur mu?",
        answer: "Evet, WEBP şeffaflığı tam destekler; PNG dosyanızdaki saydam alanlar kayıpsız olarak korunur."
      },
      {
        question: "Dosya boyutunda ne kadar kazanç sağlanır?",
        answer: "Şeffaf PNG grafiklerinde genellikle %50 ile %70 arasında boyut küçülmesi elde edilir."
      },
      {
        question: "Toplu dönüştürme yapabilir miyim?",
        answer: "Evet, birden fazla PNG dosyasını aynı anda yükleyip topluca dönüştürebilirsiniz."
      },
      {
        question: "Dosyalarım sunucuda depolanıyor mu?",
        answer: "Hayır, dönüştürme istemci taraflı yapıldığından dosyalarınız bilgisayarınızdan dışarı aktarılmaz."
      }
    ]
  },
  "webp-to-jpg": {
    id: "webp-to-jpg",
    title: "WEBP to JPG Dönüştürücü - WEBP Dosyalarını JPG Yapma",
    description: "İnternetten indirdiğiniz WEBP görsellerini uyumlu JPG formatına dönüştürün. Ücretsiz, hızlı ve tarayıcı tabanlı çevirici.",
    h1: "WEBP to JPG Dönüştürücü",
    intro: "Eski yazılımlar veya fotoğraf editörleriyle açamadığınız WEBP resimlerini evrensel JPG formatına kolayca çevirin.",
    aboutTitle: "Neden WEBP'den JPG'ye Dönüştürme Gerekir?",
    aboutContent: "İnternetten indirilen modern görseller genellikle WEBP uzantılıdır. Ancak bazı eski fotoğraf görüntüleyicileri, grafik yazılımları veya e-ticaret yönetim panelleri WEBP formatını tanımayabilir. WEBP to JPG dönüştürücümüz ile bu dosyaları evrensel olarak her platformda açılabilen standart JPEG formatına anında dönüştürebilirsiniz.",
    steps: [
      { title: "WEBP Dosyasını Yükleyin", description: "Dönüştürmek istediğiniz WEBP görsellerini seçin." },
      { title: "JPG'ye Dönüştürün", description: "Tarayıcınız görseli saniyeler içinde JPEG olarak kodlar." },
      { title: "İndirin", description: "Evrensel uyumluluğa sahip JPG dosyanızı anında indirin." }
    ],
    faqs: [
      {
        question: "Photoshop veya eski programlar için uygun mu?",
        answer: "Evet, üretilen JPG dosyaları Photoshop, Word, Paint ve tüm işletim sistemleriyle %100 uyumludur."
      },
      {
        question: "Şeffaf kısımlar nasıl görünür?",
        answer: "JPG şeffaflık desteklemediği için saydam alanlar standart temiz beyaz dolguyla tamamlanır."
      },
      {
        question: "Dönüştürme işlemi ücretli mi?",
        answer: "Hayır, sınırsız sayıda WEBP dosyasını ücretsiz olarak dönüştürebilirsiniz."
      },
      {
        question: "Dosyalarım sunucuya yükleniyor mu?",
        answer: "Hayır, dönüştürme doğrudan tarayıcınızda gerçekleşir ve hiçbir sunucuya yüklenmez."
      }
    ]
  },
  "webp-to-png": {
    id: "webp-to-png",
    title: "WEBP to PNG Dönüştürücü - Şeffaflığı Koruyarak Çevir",
    description: "WEBP formatındaki resimleri şeffaflığı kaybetmeden yüksek kaliteli PNG formatına dönüştürün. Ücretsiz ve güvenli.",
    h1: "WEBP to PNG Dönüştürücü",
    intro: "WEBP görsellerinizi alfa kanalı ve şeffaflık detaylarını koruyarak yüksek çözünürlüklü PNG formatına dönüştürün.",
    aboutTitle: "WEBP'den PNG'ye Dönüştürmenin Faydaları",
    aboutContent: "WEBP görselleri sıkıştırılmış yapısıyla web için idealdir; ancak baskı, grafik tasarım ve detaylı piksel düzenleme işlerinde PNG formatı daha yaygın kabul görür. WEBP to PNG dönüştürme işlemi şeffaf pikselleri kayıpsız biçimde korur ve görseli tüm grafik yazılımlarında düzenlemeye hazır hale getirir.",
    steps: [
      { title: "WEBP Resmini Ekleyin", description: "Cihazınızdan dönüştürmek istediğiniz WEBP dosyasını seçin." },
      { title: "PNG Olarak Kodlayın", description: "Piksel verileri kayıpsız PNG standardına aktarılır." },
      { title: "PNG Dosyasını Alın", description: "Şeffaflığı korunmuş PNG dosyanızı hemen indirin." }
    ],
    faqs: [
      {
        question: "Şeffaf WEBP görselleri saydam kalır mı?",
        answer: "Evet, PNG alfa kanalını desteklediği için tüm şeffaflık eksiksiz korunur."
      },
      {
        question: "Maksimum dosya boyutu nedir?",
        answer: "Tarayıcı belleğiniz yettiği sürece yüksek çözünürlüklü görselleri rahatlıkla dönüştürebilirsiniz."
      },
      {
        question: "Toplu indirme yapabilir miyim?",
        answer: "Evet, birden fazla görseli tek seferde ZIP dosyası halinde indirebilirsiniz."
      },
      {
        question: "Güvenlik garantisi var mı?",
        answer: "Dönüştürme istemci taraflı yürütüldüğünden görselleriniz gizli kalır ve cihazınızdan ayrılmaz."
      }
    ]
  },
  "image-resizer": {
    id: "image-resizer",
    title: "Görsel Boyutlandırıcı - Resim Boyutlandırma ve Piksel Ayarlama",
    description: "Fotoğraflarınızın genişlik ve yükseklik piksel ölçülerini en-boy oranını koruyarak değiştirin. Ücretsiz online görsel boyutlandırma.",
    h1: "Görsel Boyutlandırıcı",
    intro: "Resimlerinizin piksel boyutlarını dilediğiniz ölçülere getirin, sosyal medya veya web siteniz için ideal ebatları yakalayın.",
    aboutTitle: "Görsel Boyutlandırma Neden Gereklidir?",
    aboutContent: "Büyük ebatlı fotoğraflar web sitelerinde yavaşlamaya, e-postalarda kota aşımına ve sosyal medya platformlarında istenmeyen otomatik kırpmalara yol açabilir. Görsel boyutlandırma aracı ile en-boy oranını (aspect ratio) bozmadan görsellerinizi tam hedeflediğiniz piksel ölçülerine ölçekleyebilirsiniz.",
    steps: [
      { title: "Resmi Yükleyin", description: "Boyutunu değiştirmek istediğiniz görseli seçin." },
      { title: "Ölçüleri Belirleyin", description: "İstediğiniz genişlik veya yükseklik piksel değerini girin." },
      { title: "Boyutlandırılmış Resmi İndirin", description: "Yeni ölçülerdeki görselinizi anında indirin." }
    ],
    faqs: [
      {
        question: "En-boy oranı (Aspect Ratio) bozulur mu?",
        answer: "Oran kilitli durumdayken genişliği değiştirdiğinizde yükseklik otomatik olarak orantılı hesaplanır."
      },
      {
        question: "Resim kalitesi bozulur mu?",
        answer: "Boyut küçültmede pikseller pürüzsüzleştirilir; boyut büyütmede ise orijinal çözünürlük sınırları dahilinde en yüksek netlik sağlanır."
      },
      {
        question: "Hangi formatlar desteklenir?",
        answer: "JPG, PNG, WEBP ve SVG formatları desteklenmektedir."
      },
      {
        question: "Sosyal medya boyutları için uygun mu?",
        answer: "Evet; Instagram, Twitter, LinkedIn ve YouTube kapak/profil boyutlarına kolayca ayarlayabilirsiniz."
      }
    ]
  },
  "image-compressor": {
    id: "image-compressor",
    title: "Görsel Sıkıştırıcı - Kalite Kaybı Olmadan Resim Küçültme",
    description: "JPG, PNG ve WEBP görsellerinizin dosya boyutunu kalite kaybı hissetmeden küçültün. Hızlı, güvenli ve ücretsiz online resim sıkıştırma.",
    h1: "Görsel Sıkıştırıcı",
    intro: "Görsellerinizi akıllı sıkıştırma algoritmalarıyla optimize edin, dosya boyutunu %80'e kadar küçülterek depolama ve bant genişliğinden tasarruf edin.",
    aboutTitle: "Görsel Sıkıştırma Nasıl Çalışır?",
    aboutContent: "Fotoğraflarda insan gözünün algılayamayacağı gereksiz renk detayları ve meta veriler (EXIF bilgileri) bulunur. Görsel sıkıştırıcı bu fazlalıkları optimize ederek resmin görünür kalitesini korurken KB ve MB cinsinden dosya ağırlığını dramatik biçimde azaltır.",
    steps: [
      { title: "Görselinizi Seçin", description: "Sıkıştırmak istediğiniz fotoğraf veya grafikleri yükleyin." },
      { title: "Kalite Düzeyini Ayarlayın", description: "İhtiyacınıza uygun sıkıştırma seviyesini belirleyin." },
      { title: "Hafifletilmiş Dosyayı İndirin", description: "Orijinal ve yeni boyut farkını görerek dosyanızı kaydedin." }
    ],
    faqs: [
      {
        question: "Sıkıştırma sonrası görüntü bulanıklaşır mı?",
        answer: "Akıllı sıkıştırma dengesi sayesinde normal ekranlarda gözle görülür bir kalite kaybı yaşanmaz."
      },
      {
        question: "Hangi görsel formatları sıkıştırılabilir?",
        answer: "JPG, JPEG, PNG ve WEBP formatları desteklenmektedir."
      },
      {
        question: "Dosya boyutu ne kadar küçülür?",
        answer: "Görsel tipine göre %40 ile %85 arasında belirgin bir boyut tasarrufu sağlanır."
      },
      {
        question: "Dosyalarım harici bir sunucuya yükleniyor mu?",
        answer: "Hayır, tüm sıkıştırma tarayıcınızın kendi işlem gücüyle yerel olarak yapılır."
      }
    ]
  },
  "image-rotate": {
    id: "image-rotate",
    title: "Görsel Döndürme & Çevirme - Resim Yönünü Değiştirme",
    description: "Fotoğraflarınızı 90°, 180° veya 270° döndürün, yatay veya dikey olarak aynalayın. Hızlı ve ücretsiz online resim çevirme aracı.",
    h1: "Görsel Döndürme & Çevirme",
    intro: "Yan veya ters çekilmiş fotoğraflarınızı kolayca doğru açıya getirin, yatay ya da dikey ayna efekti uygulayın.",
    aboutTitle: "Resim Döndürme ve Aynalama İşlemleri",
    aboutContent: "Akıllı telefonlarla çekilen fotoğraflar bazen oryantasyon sensörü hatası sebebiyle yatay veya baş aşağı görünebilir. Görsel döndürme aracı ile resimlerinizi saat yönünde veya tersinde 90 derece hassasiyetle çevirebilir, ayrıca simetri gerektiren tasarımlar için yatay/dikey yansıtma (flip) uygulayabilirsiniz.",
    steps: [
      { title: "Fotoğrafınızı Ekleyin", description: "Yönünü düzeltmek istediğiniz görseli yükleyin." },
      { title: "Döndürün veya Yansıtın", description: "90° döndürme veya ayna butonlarına tıklayın." },
      { title: "Kaydedin", description: "Doğru açıya getirilmiş görselinizi anında indirin." }
    ],
    faqs: [
      {
        question: "Döndürme işleminde çözünürlük düşer mi?",
        answer: "Hayır, görselin orijinal piksel boyutları ve çözünürlüğü tam olarak korunur."
      },
      {
        question: "Yatay ve dikey aynalama (flip) ne işe yarar?",
        answer: "Görselin ayna görüntüsünü oluşturur, özellikle özçekim (selfie) düzeltmelerinde çok kullanışlıdır."
      },
      {
        question: "İşlem ne kadar sürer?",
        answer: "Tarayıcıda anında, milisaniyeler içinde gerçekleşir."
      },
      {
        question: "Hangi formatları destekler?",
        answer: "JPG, PNG ve WEBP görsellerini destekler."
      }
    ]
  },
  "image-cropper": {
    id: "image-cropper",
    title: "Görsel Kırpıcı - Resim Kırpma ve Kesme Aracı",
    description: "Fotoğraflarınızı istediğiniz en-boy oranında (1:1, 16:9, 4:3) veya serbestçe kırpın. Kolay, hassas ve ücretsiz online görsel kırpma.",
    h1: "Görsel Kırpıcı",
    intro: "Görsellerinizdeki gereksiz alanları kesin, kare (1:1), hikaye (9:16) veya özel oranlarla mükemmel kadrajlar oluşturun.",
    aboutTitle: "Görsel Kırpma Nedir?",
    aboutContent: "Kırpma (cropping), bir görselin odak noktasını vurgulamak veya istenmeyen kenar detaylarını kaldırmak için çerçevesini yeniden belirleme işlemidir. Sosyal medya profil fotoğrafları, ürün çekimleri veya blog görselleri hazırlarken doğru en-boy oranını yakalamanın en pratik yoludur.",
    steps: [
      { title: "Görseli Yükleyin", description: "Kırpmak istediğiniz fotoğrafı alana aktarın." },
      { title: "Kırpma Alanını Seçin", description: "Önceden tanımlı oranları (1:1, 16:9 vb.) seçin veya serbestçe ayarlayın." },
      { title: "Kırpılmış Görseli İndirin", description: "Yeni kadrajdaki resminizi tam kalitede indirin." }
    ],
    faqs: [
      {
        question: "Instagram veya avatar için 1:1 kare kırpabilir miyim?",
        answer: "Evet, 1:1 oran kilidiyle kusursuz kare profil fotoğrafları oluşturabilirsiniz."
      },
      {
        question: "Kırpma yaparken orijinal fotoğrafım bozulur mu?",
        answer: "Cihazınızdaki orijinal dosya değişmez; sistem kırpılmış yeni bir dosya üretir."
      },
      {
        question: "Kırpılan alan şeffaf kalabilir mi?",
        answer: "PNG formatındaki görsellerde şeffaflık korunarak kırpma yapılır."
      },
      {
        question: "Ücretsiz mi?",
        answer: "Evet, herhangi bir sınır veya filigran (watermark) olmadan tamamen ücretsizdir."
      }
    ]
  },
  "color-picker": {
    id: "color-picker",
    title: "Renk Seçici & Palet Çıkarıcı - Görselden Renk Kodu Bulma",
    description: "Resimlerinizden HEX, RGB ve HSL renk kodlarını damlalıkla seçin ve otomatik renk paleti oluşturun. Ücretsiz online renk aracı.",
    h1: "Renk Seçici & Görselden Palet Çıkarıcı",
    intro: "Görsellerinizdeki piksellerden dilediğiniz rengi damlalıkla yakalayın, HEX/RGB kodlarını kopyalayın ve uyumlu renk paletleri türetin.",
    aboutTitle: "Görsellerden Renk Seçimi ve Palet Analizi",
    aboutContent: "Tasarımcılar, yazılımcılar ve içerik üreticileri için bir görseldeki doğru renk tonunu yakalamak kritik önem taşır. Renk Seçici aracı, fotoğraf üzerindeki herhangi bir noktayı büyüteç ve damlalıkla inceleyerek CSS ve web uyumlu HEX, RGB, HSL kodlarını tek tıkla panoya kopyalamanızı sağlar.",
    steps: [
      { title: "Görselinizi Ekleyin", description: "Renklerini incelemek istediğiniz görseli yükleyin." },
      { title: "Rengi Seçin", description: "İmleci görsel üzerinde gezdirerek istediğiniz pikselin üzerine tıklayın." },
      { title: "Kodu Kopyalayın", description: "HEX veya RGB kodunu tek tıkla kopyalayın ve projenizde kullanın." }
    ],
    faqs: [
      {
        question: "Hangi renk formatlarını destekler?",
        answer: "HEX (#ffffff), RGB (rgb(255,255,255)) ve HSL formatlarını gösterir."
      },
      {
        question: "Görseldeki baskın renkleri otomatik bulabilir mi?",
        answer: "Evet, görsel yüklendiğinde en çok kullanılan renklerden oluşan otomatik bir palet sunulur."
      },
      {
        question: "Kullanımı ücretsiz mi?",
        answer: "Evet, tamamen ücretsiz ve reklamsızdır."
      },
      {
        question: "Verilerim gizli kalır mı?",
        answer: "Resminiz sunucuya yüklenmez, tarayıcıda analiz edilir."
      }
    ]
  },
  "svg-to-png": {
    id: "svg-to-png",
    title: "SVG to PNG Dönüştürücü - Vektörel SVG'yi PNG Yapma",
    description: "Vektörel SVG çizimlerinizi yüksek çözünürlüklü ve şeffaf PNG formatına dönüştürün. Ücretsiz online SVG PNG çevirici.",
    h1: "SVG to PNG Dönüştürücü",
    intro: "SVG formatındaki logolarınızı, ikonlarınızı ve illüstrasyonlarınızı istediğiniz çözünürlükte şeffaf PNG formatına çevirin.",
    aboutTitle: "SVG ve PNG Arasındaki Fark Nedir?",
    aboutContent: "SVG (Scalable Vector Graphics), matematiksel formüllerle çizilen ve sonsuz ölçeklenebilen vektörel bir formattır. Ancak Word, PowerPoint, e-posta istemcileri veya bazı sosyal ağlar doğrudan SVG dosyasını gösteremez. SVG to PNG dönüştürücümüz vektörel çizimi netliğini kaybetmeden rasterize ederek şeffaf arka planlı bir PNG'ye çevirir.",
    steps: [
      { title: "SVG Dosyasını Yükleyin", description: "Cihazınızdan .svg uzantılı dosyanızı seçin." },
      { title: "PNG Çözünürlüğünü Belirleyin", description: "Vektör çizim keskin hatlarıyla piksele dönüştürülür." },
      { title: "PNG Olarak İndirin", description: "Şeffaf arka plana sahip PNG dosyanızı hemen indirin." }
    ],
    faqs: [
      {
        question: "Çizgiler ve kenarlar bulanıklaşır mı?",
        answer: "Hayır, vektör doğrudan istenen çözünürlükte çizildiğinden hatlar kristal netliğinde kalır."
      },
      {
        question: "Saydam arka plan korunur mu?",
        answer: "Evet, SVG'nin arka planı tanımsız veya şeffaf ise çıktı da şeffaf PNG olur."
      },
      {
        question: "Karmaşık SVG dosyalarını destekler mi?",
        answer: "Çoğu standart SVG grafiği, ikon ve illüstrasyon tam olarak desteklenir."
      },
      {
        question: "Ücretsiz mi?",
        answer: "Evet, kayıt olmadan sınırsızca kullanabilirsiniz."
      }
    ]
  },
  "jpg-to-pdf": {
    id: "jpg-to-pdf",
    title: "JPG to PDF Dönüştürücü - Resmi PDF Yapma Online",
    description: "JPG fotoğraflarınızı tek tıkla standart PDF belgesine dönüştürün. Hızlı, güvenli, filigransız ve ücretsiz online JPG PDF çevirici.",
    h1: "JPG to PDF Dönüştürücü",
    intro: "JPG veya JPEG fotoğraflarınızı resmi yazışmalar, ödevler veya arşivleme için yazdırmaya hazır PDF dökümanına dönüştürün.",
    aboutTitle: "JPG'den PDF'e Dönüştürmenin Önemi",
    aboutContent: "Faturalar, sözleşmeler, kimlik fotokopileri veya taranmış evraklar genellikle JPG formatında kaydedilir. Ancak resmi başvurularda ve kurumsal platformlarda belgelerin PDF formatında sunulması istenir. JPG to PDF aracımız görselinizi sayfa kenar boşluklarına ve boyutlarına göre otomatik hizalayarak standart bir PDF dokümanı oluşturur.",
    steps: [
      { title: "JPG Görselini Seçin", description: "PDF yapmak istediğiniz fotoğrafı ekleyin." },
      { title: "Sayfa Düzenini Kontrol Edin", description: "Görsel PDF sayfasına orantılı biçimde yerleştirilir." },
      { title: "PDF Belgesini İndirin", description: "Oluşturulan PDF dosyasını anında cihazınıza indirin." }
    ],
    faqs: [
      {
        question: "PDF dosyasında filigran (watermark) eklenir mi?",
        answer: "Hayır! TurkConvert belgelerinize kesinlikle filigran veya reklam logosu eklemez."
      },
      {
        question: "Resmi evraklarım güvende mi?",
        answer: "Dönüştürme işlemi tamamen tarayıcınızda (istemci tarafında) yapılır. Evraklarınız hiçbir sunucuya yüklenmez."
      },
      {
        question: "PDF sayfa boyutu ne olur?",
        answer: "Görsel boyutuna göre standart A4 veya orantılı sayfa yapısı otomatik uygulanır."
      },
      {
        question: "Mobil cihazlarda çalışır mı?",
        answer: "Evet, iPhone ve Android telefonlardan çektiğiniz fotoğrafları da PDF yapabilirsiniz."
      }
    ]
  },
  "png-to-pdf": {
    id: "png-to-pdf",
    title: "PNG to PDF Dönüştürücü - PNG Resimlerini PDF Yapma",
    description: "PNG formatındaki görsellerinizi yüksek kalitede PDF belgesine dönüştürün. Ücretsiz, reklamsız ve tarayıcı tabanlı çevirme.",
    h1: "PNG to PDF Dönüştürücü",
    intro: "Şeffaf veya yüksek çözünürlüklü PNG resimlerinizi kolayca taşınabilir ve yazdırılabilir PDF dokümanına çevirin.",
    aboutTitle: "PNG'den PDF'e Dönüştürme Özellikleri",
    aboutContent: "PNG yüksek çözünürlüklü ekran görüntüleri, tasarım paftaları ve taranmış belgeler için sıklıkla kullanılır. Bunları e-posta ile iletmek veya arşivlemek için tek bir PDF formatına getirmek evrensel uyumluluk sağlar. PNG to PDF aracımız pikselleri sıkıştırmadan orijinal kalitede PDF içerisine aktarır.",
    steps: [
      { title: "PNG Dosyasını Ekleyin", description: "PDF'e dönüştürmek istediğiniz PNG görselini yükleyin." },
      { title: "PDF'i Hazırlayın", description: "Görsel sayfa boyutlarına uygun şekilde PDF sayfasına entegre edilir." },
      { title: "İndirin", description: "Hazırlanan PDF belgesini kaydedin." }
    ],
    faqs: [
      {
        question: "Şeffaf alanlar PDF'te nasıl görünür?",
        answer: "Şeffaf kısımlar standart PDF dokümanı beyaz sayfa zemini üzerinde temiz görünür."
      },
      {
        question: "Görüntü kalitesi düşer mi?",
        answer: "Hayır, PNG'nin yüksek çözünürlüklü detayları PDF içinde korunur."
      },
      {
        question: "Üyelik veya ödeme gerekli mi?",
        answer: "Hayır, TurkConvert %100 ücretsizdir."
      },
      {
        question: "Dosya boyutu sınırı var mı?",
        answer: "Cihazınızın tarayıcı belleği yettiğince büyük PNG dosyalarını dönüştürebilirsiniz."
      }
    ]
  },
  "image-to-pdf": {
    id: "image-to-pdf",
    title: "Çoklu Görsellerden PDF Oluşturucu - Resimleri Tek PDF Yap",
    description: "Birden fazla JPG ve PNG resmini tek bir PDF dosyasında birleştirin. Sıralamayı ayarlayın ve anında indirin.",
    h1: "Görsellerden PDF Oluşturucu",
    intro: "Farklı fotoğrafları ve belgeleri tek bir PDF dosyasında bir araya getirin, sayfaları sıralayın ve tek dosya olarak paylaşın.",
    aboutTitle: "Birden Çok Resmi Tek PDF Dosyasında Birleştirme",
    aboutContent: "Birden fazla sayfadan oluşan ödevler, taranmış sözleşmeler, kitap sayfaları veya gezi fotoğraflarını tek tek göndermek yerine düzenli bir PDF kitapçığı haline getirebilirsiniz. Görsellerden PDF Oluşturucu ile dilediğiniz sayıda resmi yükleyebilir, sayfa sırasını belirleyebilir ve tek bir PDF çıktısı alabilirsiniz.",
    steps: [
      { title: "Resimleri Seçin", description: "PDF'e eklemek istediğiniz tüm görselleri topluca yükleyin." },
      { title: "Sıralamayı Düzenleyin", description: "Sayfa sıralamasını dilediğiniz gibi düzenleyin." },
      { title: "Tek PDF Olarak İndirin", description: "Tüm sayfaları içeren birleşik PDF dosyanızı indirin." }
    ],
    faqs: [
      {
        question: "Kaç adet resim yükleyebilirim?",
        answer: "Onlarca resmi aynı anda yükleyebilir ve tek bir PDF içinde birleştirebilirsiniz."
      },
      {
        question: "Farklı formatlardaki görseller birleştirilebilir mi?",
        answer: "Evet, JPG, PNG ve WEBP görsellerini aynı PDF dokümanı içinde birleştirebilirsiniz."
      },
      {
        question: "Belgelerim güvende mi?",
        answer: "Dosyalarınız sunucuya gönderilmez, PDF doğrudan tarayıcınızda üretilir."
      },
      {
        question: "Filigran ekleniyor mu?",
        answer: "Hayır, sayfalar tamamen temiz ve reklamsızdır."
      }
    ]
  },
  "word-counter": {
    id: "word-counter",
    title: "Kelime ve Karakter Sayacı - Detaylı Metin Analizi",
    description: "Metninizin kelime, karakter, cümle, satır ve tahmini okuma süresini anlık olarak hesaplayın. Ücretsiz online metin sayacı.",
    h1: "Kelime ve Karakter Sayacı",
    intro: "Yazılarınızın kelime ve karakter sayılarını canlı olarak takip edin; tez, makale, blog veya sosyal medya metin limitlerini kolayca denetleyin.",
    aboutTitle: "Kelime Sayacı Neden Önemlidir?",
    aboutContent: "Twitter/X (280 karakter), Instagram biyografileri (150 karakter), akademik tezler, SEO meta açıklamaları (160 karakter) ve çeviri projeleri gibi birçok alanda harf ve kelime sınırlamaları bulunur. Canlı kelime sayacımız boşluklu ve boşluksuz karakter sayısı, paragraf ve cümle adedi ile ortalama okuma süresini anlık olarak sunar.",
    steps: [
      { title: "Metni Yapıştırın veya Yazın", description: "Analiz etmek istediğiniz metni yazı alanına girin." },
      { title: "İstatistikleri İnceleyin", description: "Kelime, karakter ve okuma süresi anlık olarak güncellenir." },
      { title: "Kullanın", description: "İhtiyacınıza göre metninizi düzenleyin veya kopyalayın." }
    ],
    faqs: [
      {
        question: "Boşluklu ve boşluksuz karakter sayısı ayrı mı hesaplanır?",
        answer: "Evet, hem boşluklar dahil hem de boşluklar hariç toplam karakter sayısı gösterilir."
      },
      {
        question: "Okuma süresi nasıl hesaplanır?",
        answer: "Yetişkin bir bireyin dakikada ortalama 200 kelime okuduğu kabul edilerek doğru bir tahminleme yapılır."
      },
      {
        question: "Metnim sunucuda kaydediliyor mu?",
        answer: "Hayır, yazdığınız tüm metin yalnızca tarayıcınızın hafızasında kalır, hiçbir yere gönderilmez."
      },
      {
        question: "Uzun metinler için uygun mu?",
        answer: "Evet, binlerce kelimelik roman bölümleri ve makaleleri dahi kasmadan anında analiz eder."
      }
    ]
  },
  "text-case-converter": {
    id: "text-case-converter",
    title: "Harf Dönüştürücü - Büyük Küçük Harf Çevirme Aracı",
    description: "Metninizi büyük harfe, küçük harfe, baş harfleri büyük veya başlık düzenine Türkçe karakter desteğiyle çevirin.",
    h1: "Büyük Küçük Harf Dönüştürücü",
    intro: "Metinlerinizin harf boyutunu tek tıkla BÜYÜK HARF, küçük harf, Başlık Düzeni veya Cümle Düzenine Türkçe uyumlu olarak çevirin.",
    aboutTitle: "Türkçe Karakter Uyumlu Harf Dönüştürme",
    aboutContent: "Türkçede 'i' - 'İ' ve 'ı' - 'I' harf dönüşümleri standart yazılımlarda sıklıkla bozulur (Örn: 'istanbul' kelimesi 'ISTANBUL' yerine 'İSTANBUL' olmalıdır). Harf Dönüştürücümüz Türk alfabesindeki ç, ğ, ı, ö, ş, ü kurallarına tam riayet ederek metinlerinizi hatasız şekilde dönüştürür.",
    steps: [
      { title: "Metni Girin", description: "Değiştirmek istediğiniz metni kutucuğa yazın veya yapıştırın." },
      { title: "Dönüşüm Tipini Seçin", description: "Büyük harf, küçük harf, baş harfleri büyük veya alternatif stillerden birine tıklayın." },
      { title: "Sonucu Kopyalayın", description: "Düzenlenmiş metni tek tıkla kopyalayın." }
    ],
    faqs: [
      {
        question: "Türkçe 'I' ve 'İ' harfleri doğru çevriliyor mu?",
        answer: "Evet, Türkçe yerel kuralları (locale) dikkate alınarak 'ı' harfi 'I', 'i' harfi 'İ' olarak doğru dönüştürülür."
      },
      {
        question: "Hangi dönüşüm modları mevcut?",
        answer: "TÜMÜ BÜYÜK, tümü küçük, Her Kelimenin İlk Harfi Büyük, Cümle düzeni ve DeVe DüZeNi gibi modlar desteklenir."
      },
      {
        question: "Karakter sınırı var mı?",
        answer: "Hayır, dilediğiniz uzunluktaki metinleri dönüştürebilirsiniz."
      },
      {
        question: "Ücretsiz mi?",
        answer: "Evet, tamamen ücretsizdir."
      }
    ]
  },
  "text-cleaner": {
    id: "text-cleaner",
    title: "Metin Temizleyici - Fazla Boşluk ve Satır Temizleme",
    description: "Metinlerdeki çift boşlukları, boş satırları, HTML etiketlerini ve gereksiz karakterleri tek tıkla temizleyin.",
    h1: "Metin Temizleyici",
    intro: "Word, PDF veya web sayfalarından kopyalanan metinlerdeki biçimlendirme hatalarını, gereksiz boşlukları ve satır sonlarını arındırın.",
    aboutTitle: "Metin Temizleme Ne İşe Yarar?",
    aboutContent: "PDF belgelerinden veya web sitelerinden kopyalama yapıldığında satır sonlarında beklenmedik kopukluklar, çoklu boşluklar veya gereksiz karakterler kalır. Metin Temizleyici aracı tek tıkla fazla boşlukları siler, boş satırları kaldırır, satırları birleştirir veya HTML etiketlerini arındırarak tertemiz bir düz metin sunar.",
    steps: [
      { title: "Metni Yapıştırın", description: "Temizlemek istediğiniz dağınık metni alana yapıştırın." },
      { title: "Temizleme Seçeneklerini Belirleyin", description: "Fazla boşlukları kaldır, boş satırları sil gibi seçenekleri işaretleyin." },
      { title: "Temiz Metni Kopyalayın", description: "Düzenlenmiş pürüzsüz metni panonuza alın." }
    ],
    faqs: [
      {
        question: "Çoklu boşlukları tek boşluğa indirir mi?",
        answer: "Evet, kelimeler arasındaki ardışık boşlukları tek bir boşluk haline getirir."
      },
      {
        question: "Boş satırları silebilir mi?",
        answer: "Evet, paragraflar arasında oluşan gereksiz boş satırları anında yok eder."
      },
      {
        question: "Kod veya HTML etiketlerini ayıklar mı?",
        answer: "HTML temizleme özelliği ile <p>, <div> gibi etiketleri kaldırıp sadece düz metni bırakır."
      },
      {
        question: "Gizliliğim korunuyor mu?",
        answer: "Metinleriniz hiçbir sunucuya gönderilmez, tarayıcıda işlenir."
      }
    ]
  },
  "markdown-previewer": {
    id: "markdown-previewer",
    title: "Markdown Önizleyici - Canlı Markdown Düzenleyici ve Editör",
    description: "Markdown formatında yazın, anlık HTML çıktısını canlı önizleyin ve HTML veya MD olarak kopyalayın. Ücretsiz Markdown editörü.",
    h1: "Markdown Canlı Önizleyici",
    intro: "GitHub Flavored Markdown formatındaki notlarınızı ve belgelerinizi canlı olarak önizleyin, biçimlendirin ve dışa aktarın.",
    aboutTitle: "Markdown Nedir ve Nasıl Kullanılır?",
    aboutContent: "Markdown, düz metin yazımını kolaylaştıran ve başlıklar (#), listeler (-), kalın/italik yazılar (**bold**) gibi öğeleri sade sözdizimiyle sunan hafif bir biçimlendirme dilidir. Yazılımcılar, blog yazarları ve teknik doküman hazırlayanlar için vazgeçilmez bir araçtır. Markdown Önizleyicimiz ile yazdığınız her satırın görsel karşılığını eşzamanlı olarak takip edebilirsiniz.",
    steps: [
      { title: "Markdown Kodunu Yazın", description: "Sol panelde Markdown formatında metninizi oluşturun." },
      { title: "Canlı Önizlemeyi İzleyin", description: "Sağ panelde zengin metin ve HTML görünümünü anında inceleyin." },
      { title: "Çıktıyı Alın", description: "İster Markdown ister HTML çıktısını panonuza kopyalayın." }
    ],
    faqs: [
      {
        question: "GitHub Markdown (GFM) sözdizimini destekliyor mu?",
        answer: "Evet, tablolar, kontrol listeleri (checkbox) ve kod blokları desteklenir."
      },
      {
        question: "HTML olarak dışa aktarabilir miyim?",
        answer: "Evet, derlenen zengin HTML kodunu tek tıkla kopyalayabilirsiniz."
      },
      {
        question: "Yazdıklarım silinir mi?",
        answer: "Tarayıcı oturumunuz süresince metniniz korunur; işiniz bittiğinde cihazınıza kopyalamanız önerilir."
      },
      {
        question: "Ücretsiz mi?",
        answer: "Evet, herhangi bir sınır olmaksızın ücretsizdir."
      }
    ]
  },
  "lorem-ipsum-generator": {
    id: "lorem-ipsum-generator",
    title: "Lorem Ipsum Üretici - Yer Tutucu Metin Oluşturucu",
    description: "Web ve grafik tasarımlarınız için paragraf, cümle veya kelime bazında rastgele Lorem Ipsum yer tutucu metin üretin.",
    h1: "Lorem Ipsum Metin Üretici",
    intro: "Tasarım, tipografi ve web projelerinizde yer tutucu (dummy text) olarak kullanmak üzere standart Lorem Ipsum metinleri türetin.",
    aboutTitle: "Lorem Ipsum Nedir ve Neden Kullanılır?",
    aboutContent: "Lorem Ipsum, 1500'lü yıllardan beri matbaacılık ve dizgi sektöründe standart sahte metin olarak kullanılan Latince kökenli anlamsız bir metindir. Tasarımcılar gerçek içerik henüz hazır değilken sayfa düzeni, font seçimi ve tipografik hiyerarşiyi test etmek için Lorem Ipsum kullanır; böylece okuyucu anlamlı metne odaklanmak yerine tasarıma odaklanır.",
    steps: [
      { title: "Uzunluğu Seçin", description: "Kaç paragraf, cümle veya kelime üretmek istediğinizi belirtin." },
      { title: "Üretin", description: "İhtiyacınıza uygun yer tutucu metin saniyeler içinde oluşturulur." },
      { title: "Kopyalayın", description: "Üretilen metni tek tıkla panonuza aktarın ve tasarımınıza yapıştırın." }
    ],
    faqs: [
      {
        question: "Lorem Ipsum metninin bir anlamı var mı?",
        answer: "Çiçero'nun M.Ö. 45 yılında yazdığı 'De Finibus Bonorum et Malorum' eserinden türetilmiş olup günümüzde anlamsız yer tutucu olarak kullanılır."
      },
      {
        question: "HTML etiketleriyle (<p>) çıktı alabilir miyim?",
        answer: "Evet, paragrafları doğrudan HTML etiketli veya düz metin olarak kopyalayabilirsiniz."
      },
      {
        question: "Kaç paragrafa kadar üretilebilir?",
        answer: "İstediğiniz sayıda paragrafı anında oluşturabilirsiniz."
      },
      {
        question: "Ücretsiz mi?",
        answer: "Evet, sınırsız ve ücretsizdir."
      }
    ]
  },
  "json-formatter": {
    id: "json-formatter",
    title: "JSON Formatter - JSON Güzelleştirici ve Doğrulayıcı",
    description: "Karışık JSON verilerinizi okunabilir, girintili (beautify) formata dönüştürün ve sözdizimi hatalarını anında tespit edin.",
    h1: "JSON Formatter & Validator",
    intro: "JSON verilerinizi 2 veya 4 boşluklu girintilerle okunabilir hale getirin, sözdizimi (syntax) hatalarını anında bulun.",
    aboutTitle: "JSON Formatlama ve Doğrulama Neden Önemlidir?",
    aboutContent: "JSON (JavaScript Object Notation), web servisleri ve API'ler arasında veri iletiminde en yaygın standarttır. Ancak sunuculardan dönen veriler genellikle tek satır ve sıkışık haldedir. JSON Formatter, karmaşık JSON ağaçlarını renkli, hiyerarşik ve girintili bir yapıya kavuşturarak geliştiricilerin veriyi kolayca analiz etmesini ve hataları hızla çözmesini sağlar.",
    steps: [
      { title: "JSON Verisini Yapıştırın", description: "Formatlamak istediğiniz ham JSON metnini girin." },
      { title: "Formatla Butonuna Tıklayın", description: "Sözdizimi kontrol edilir ve girintili yapı oluşturulur." },
      { title: "Kopyalayın veya İndirin", description: "Düzenli JSON verisini tek tıkla kopyalayın." }
    ],
    faqs: [
      {
        question: "Geçersiz JSON girdiğimde hata yerini gösterir mi?",
        answer: "Evet, eksik virgül veya tırnak işareti gibi hatalı satırları belirterek sizi uyarır."
      },
      {
        question: "Hassas API verilerim güvende mi?",
        answer: "JSON veriniz hiçbir uzak sunucuya iletilmez, tarayıcınızda JavaScript motoru ile işlenir."
      },
      {
        question: "Girinti boşluk sayısını ayarlayabilir miyim?",
        answer: "Evet, 2 boşluk veya 4 boşluk girinti seçeneğini kullanabilirsiniz."
      },
      {
        question: "Büyük JSON dosyalarını destekler mi?",
        answer: "Megabaytlarca büyüklükteki JSON dosyalarını hızla işleyebilir."
      }
    ]
  },
  "json-minifier": {
    id: "json-minifier",
    title: "JSON Minifier - JSON Sıkıştırıcı ve Boşluk Temizleyici",
    description: "JSON verilerinizdeki tüm gereksiz boşlukları, satır atlamalarını temizleyerek dosya boyutunu küçültün ve bant genişliğinden tasarruf edin.",
    h1: "JSON Minifier (Sıkıştırıcı)",
    intro: "JSON verilerinizdeki satır başlarını ve boşlukları kaldırarak tek satıra sıkıştırın, API yükünü ve dosya boyutunu azaltın.",
    aboutTitle: "JSON Sıkıştırma (Minify) Nedir?",
    aboutContent: "Geliştirme aşamasında okunabilirlik için eklenen girintiler ve satır sonları prodüksiyon ortamında gereksiz bayt yükü oluşturur. JSON Minifier, veri bütünlüğüne dokunmadan tüm boşlukları kaldırır ve JSON yapısını tek satıra indirir. Bu işlem veri transfer hızını artırır ve sunucu maliyetlerini düşürür.",
    steps: [
      { title: "JSON Kodunu Yapıştırın", description: "Sıkıştırmak istediğiniz JSON içeriğini ekleyin." },
      { title: "Minify Edin", description: "Boşluklar ve satır sonları milisaniyeler içinde arındırılır." },
      { title: "Sonucu Kopyalayın", description: "Sıkıştırılmış tek satırlık JSON metnini panonuza alın." }
    ],
    faqs: [
      {
        question: "Veri kaybı veya bozulma yaşanır mı?",
        answer: "Hayır, string değerler içindeki gerekli boşluklar hariç yalnızca yapısal boşluklar silinir."
      },
      {
        question: "Ne kadar boyut tasarrufu sağlar?",
        answer: "Girintili büyük JSON dosyalarında ortalama %20-%40 boyut tasarrufu elde edilir."
      },
      {
        question: "JSON geçerliliği denetlenir mi?",
        answer: "Evet, sıkıştırma öncesinde verinin geçerli bir JSON olup olmadığı doğrulanır."
      },
      {
        question: "Ücretsiz mi?",
        answer: "Evet, TurkConvert üzerindeki tüm araçlar gibi tamamen ücretsizdir."
      }
    ]
  },
  "base64-encoder": {
    id: "base64-encoder",
    title: "Base64 Encoder - Metni Base64 Formatına Çevirme",
    description: "Düz metinlerinizi UTF-8 ve Türkçe karakter uyumlu olarak güvenli Base64 formatına kodlayın. Hızlı ve ücretsiz online araç.",
    h1: "Base64 Encoder",
    intro: "Metin, şifre ve veri dizgelerinizi ikili güvenli Base64 formatına anında dönüştürün.",
    aboutTitle: "Base64 Kodlaması Nedir?",
    aboutContent: "Base64, ikili (binary) verileri veya özel karakter içeren metinleri yalnızca 64 adet güvenli ASCII karakteri (A-Z, a-z, 0-9, +, /) kullanarak temsil etme yöntemidir. E-posta protokollerinde, API kimlik doğrulama başlıklarında ve veri depolamada karakter bozulmalarını önlemek amacıyla yaygın şekilde kullanılır.",
    steps: [
      { title: "Metni Girin", description: "Kodlamak istediğiniz metni alana yazın veya yapıştırın." },
      { title: "Base64'e Dönüştürün", description: "Metin anında Base64 karakter dizisine çevrilir." },
      { title: "Kodu Kopyalayın", description: "Üretilen Base64 metnini tek tıkla kopyalayın." }
    ],
    faqs: [
      {
        question: "Base64 bir şifreleme (encryption) yöntemi midir?",
        answer: "Hayır, Base64 bir şifreleme değil, veri kodlama (encoding) formatıdır. Herkes tarafından kolayca geri çözülebilir."
      },
      {
        question: "Türkçe karakterlerde (ç, ğ, ı, ö, ş, ü) bozulma olur mu?",
        answer: "Hayır, TurkConvert UTF-8 kodlamasını tam destekler; Türkçe harfler sorunsuz kodlanır."
      },
      {
        question: "İşlem güvenli mi?",
        answer: "Kodlama işlemi doğrudan tarayıcınızda yapılır, metniniz sunucuya aktarılmaz."
      },
      {
        question: "Ücretsiz mi?",
        answer: "Evet, limitsiz ve ücretsizdir."
      }
    ]
  },
  "base64-decoder": {
    id: "base64-decoder",
    title: "Base64 Decoder - Base64 Metnini Orijinal Haline Çevirme",
    description: "Base64 formatında kodlanmış verileri orijinal düz metne dönüştürün. Türkçe UTF-8 karakter desteğiyle anında çözümleme.",
    h1: "Base64 Decoder",
    intro: "Base64 kodlu dizgeleri saniyeler içinde okunabilir düz metne geri çözün, gizli parametreleri ve API yüklerini inceleyin.",
    aboutTitle: "Base64 Çözümleme (Decoding) Nasıl Yapılır?",
    aboutContent: "Web geliştirmede JWT token'ları, e-posta içerikleri veya web kancası (webhook) verileri sıklıkla Base64 olarak iletilir. Base64 Decoder, 64 karakterlik ASCII dizilimini orijinal baytlarına ve UTF-8 karakterlerine dönüştürerek içeriğin orijinal halini görmenizi sağlar.",
    steps: [
      { title: "Base64 Metnini Ekleyin", description: "Çözmek istediğiniz Base64 dizisini yapıştırın." },
      { title: "Çözümleyin", description: "Kod anında orijinal metne dönüştürülür." },
      { title: "Metni Alın", description: "Çözülen metni inceleyin ve kopyalayın." }
    ],
    faqs: [
      {
        question: "Geçersiz Base64 girdiğimde ne olur?",
        answer: "Sistem hatalı veya eksik karakterleri tespit ederek uyarı mesajı verir."
      },
      {
        question: "Türkçe harfler doğru çözülür mü?",
        answer: "Evet, UTF-8 uyumlu decode motorumuz sayesinde tüm Türkçe karakterler eksiksiz görüntülenir."
      },
      {
        question: "Gizli verilerim sunucuya gider mi?",
        answer: "Hayır, dönüştürme tamamen yerel tarayıcınızda çalışır."
      },
      {
        question: "Kullanım sınırı var mı?",
        answer: "Hayır, dilediğiniz sıklıkta kullanabilirsiniz."
      }
    ]
  },
  "url-encoder": {
    id: "url-encoder",
    title: "URL Encoder - URL Kodlama ve Karakter Dönüştürme",
    description: "URL parametrelerinizdeki boşluk ve özel karakterleri güvenli URL-encoded (%XX) formata dönüştürün. Ücretsiz web aracı.",
    h1: "URL Encoder",
    intro: "Web adreslerinde ve sorgu parametrelerinde (query string) sorunsuz çalışması için metinleri RFC 3986 uyumlu kodlayın.",
    aboutTitle: "URL Kodlama (Percent-Encoding) Nedir?",
    aboutContent: "Web adreslerinde boşluk, Türkçe harfler veya &, ?, = gibi özel işaretlerin doğrudan kullanılması sunucularda hatalara yol açabilir. URL Encoding (Yüzde Kodlama), bu karakterleri '%' ve ardından gelen iki onaltılık (hex) basamakla değiştirerek (örneğin boşluk için '%20') tüm tarayıcı ve sunucuların doğru iletişim kurmasını sağlar.",
    steps: [
      { title: "Metni veya URL'i Girin", description: "Kodlamak istediğiniz adresi ya da sorgu parametrelerini yazın." },
      { title: "Encode Edin", description: "Özel karakterler anında URL-safe formatına çevrilir." },
      { title: "Kopyalayın", description: "Güvenli URL bağlantınızı kopyalayıp kullanın." }
    ],
    faqs: [
      {
        question: "Hangi karakterler dönüştürülür?",
        answer: "Boşluklar, Türkçe karakterler (ç, ğ, ı, ö, ş, ü), noktalama işaretleri ve ayrılmış semboller kodlanır."
      },
      {
        question: "SEO dostu URL'ler için gerekli midir?",
        answer: "URL parametrelerinin bozulmadan iletilmesi ve 404 hatalarının önlenmesi için gereklidir."
      },
      {
        question: "İşlem ücretsiz mi?",
        answer: "Evet, herhangi bir sınır olmaksızın ücretsizdir."
      },
      {
        question: "Verilerim kaydediliyor mu?",
        answer: "Hayır, tüm işlemler cihazınızın tarayıcısında gerçekleşir."
      }
    ]
  },
  "url-decoder": {
    id: "url-decoder",
    title: "URL Decoder - URL Kodunu Çözme ve Okunabilir Yapma",
    description: "%20, %C3 gibi karmaşık URL kodlu karakterleri orijinal düz metne ve Türkçe harflere dönüştürün.",
    h1: "URL Decoder",
    intro: "Karmaşık yüzde kodlu (%XX) URL adreslerini ve parametrelerini tek tıkla okunabilir Türkçe metne dönüştürün.",
    aboutTitle: "URL Kod Çözme (URL Decoding) Ne İşe Yarar?",
    aboutContent: "İnternet tarayıcılarının adres çubuğundan kopyalanan linklerde Türkçe karakterler veya boşluklar genellikle '%C4%9F' veya '%20' gibi karmaşık sembollere bürünür. URL Decoder, bu kodlanmış metinleri çözümleyerek orijinal harfleri ve kelimeleri geri getirir, linklerin ve parametrelerin rahatça okunmasını sağlar.",
    steps: [
      { title: "URL Kodlu Metni Yapıştırın", description: "Çözmek istediğiniz karmaşık bağlantıyı kutucuğa ekleyin." },
      { title: "Kodu Çözün", description: "Yüzde sembolleri orijinal karakterlere dönüştürülür." },
      { title: "Okunabilir Metni Alın", description: "Temizlenmiş URL ve parametreleri kopyalayın." }
    ],
    faqs: [
      {
        question: "Türkçe karakterleri doğru çözer mi?",
        answer: "Evet, UTF-8 standardındaki tüm Türkçe harfler (%C3%BC -> ü, %C5%9F -> ş vb.) eksiksiz çözülür."
      },
      {
        question: "Parametreleri ayırabilir miyim?",
        answer: "Çözülen metin üzerinde GET sorgu parametrelerini kolayca inceleyebilirsiniz."
      },
      {
        question: "Kullanım ücreti var mı?",
        answer: "Hayır, tamamen ücretsizdir."
      },
      {
        question: "Sunucuya veri gönderilir mi?",
        answer: "Hayır, JavaScript motoru ile tarayıcınızda işlenir."
      }
    ]
  },
  "uuid-generator": {
    id: "uuid-generator",
    title: "UUID Generator - Benzersiz UUID v4 Oluşturucu",
    description: "Yazılım ve veritabanı projeleriniz için evrensel benzersiz tanımlayıcılar (UUID / GUID v4) oluşturun. Toplu üretim desteği.",
    h1: "UUID (GUID) Generator",
    intro: "Kriptografik olarak güvenli, çakışma ihtimali imkansıza yakın UUID v4 değerlerini tek tek veya topluca üretin.",
    aboutTitle: "UUID (GUID) Nedir ve Nerelerde Kullanılır?",
    aboutContent: "UUID (Universally Unique Identifier), bilgisayar sistemlerinde bilgileri benzersiz olarak tanımlamak için kullanılan 128 bitlik bir standarttır. Dağıtık sistemlerde, mikroservislerde, veritabanı birincil anahtarlarında (primary key) ve oturum yönetiminde merkezi bir koordinasyon gerekmeden benzersiz ID üretilmesini sağlar.",
    steps: [
      { title: "Adet Belirleyin", description: "Tek bir UUID veya toplu liste olarak kaç adet üretmek istediğinizi seçin." },
      { title: "Oluştur Butonuna Basın", description: "Rastgele ve güvenli UUID v4 değerleri üretilir." },
      { title: "Kopyalayın", description: "Üretilen ID'leri panonuza kopyalayın." }
    ],
    faqs: [
      {
        question: "Üretilen UUID'ler çakışabilir mi?",
        answer: "UUID v4 rastgelelik algoritmasında iki ID'nin çakışma ihtimali matematiksel olarak sıfıra yakındır."
      },
      {
        question: "Büyük veya küçük harf seçeneği var mı?",
        answer: "İhtiyacınıza göre büyük harf veya küçük harf formatında kopyalayabilirsiniz."
      },
      {
        question: "Tire (-) işaretleri olmadan alabilir miyim?",
        answer: "Evet, düz 32 karakterlik veya standart 36 karakterlik tireli formatta alabilirsiniz."
      },
      {
        question: "Kriptografik olarak güvenli mi?",
        answer: "Evet, modern tarayıcıların crypto.getRandomValues API'si kullanılır."
      }
    ]
  },
  "password-generator": {
    id: "password-generator",
    title: "Güçlü Şifre Oluşturucu - Güvenli ve Kırılmaz Parola Üretici",
    description: "Büyük-küçük harf, rakam ve özel karakterler içeren kırılması imkansız rastgele güçlü parolalar oluşturun. Ücretsiz ve güvenli.",
    h1: "Güçlü Şifre Oluşturucu",
    intro: "Hesaplarınızı siber saldırılara ve kaba kuvvet (brute-force) girişimlerine karşı korumak için yüksek güvenlikli parolalar üretin.",
    aboutTitle: "Güçlü Bir Parola Nasıl Olmalıdır?",
    aboutContent: "Güvenli bir şifre en az 12-16 karakter uzunluğunda olmalı; büyük harf, küçük harf, rakam ve özel sembollerin karmaşasından oluşmalıdır. Kişisel bilgiler veya tahmin edilebilir sözlük kelimeleri içermemelidir. Şifre Oluşturucumuz yerel cihazınızın kriptografik rastgelelik motorunu kullanarak kırılması trilyonlarca yıl sürecek şifreler üretir.",
    steps: [
      { title: "Uzunluk ve Kuralları Seçin", description: "Şifre uzunluğunu belirleyin; sembol ve rakam seçeneklerini ayarlayın." },
      { title: "Şifre Üretin", description: "Kriptografik olarak güvenli parolanız saniyeler içinde hazır hale gelir." },
      { title: "Güvenle Kopyalayın", description: "Parolayı kopyalayıp şifre yöneticinize kaydedin." }
    ],
    faqs: [
      {
        question: "Üretilen şifreler sisteminize kaydediliyor mu?",
        answer: "Kesinlikle hayır! Üretim tarayıcınızın donanımsal kripto modülünde yapılır, sunucuya hiçbir veri gitmez."
      },
      {
        question: "Önerilen şifre uzunluğu nedir?",
        answer: "Maksimum güvenlik için en az 14-16 karakter uzunluk ve sembol kombinasyonu önerilir."
      },
      {
        question: "Şifre gücü nasıl ölçülür?",
        answer: "Karakter çeşitliliği ve entropi seviyesi anlık renkli gösterge ile doğrulanır."
      },
      {
        question: "Ücretsiz mi?",
        answer: "Evet, sınırsız sayıda güvenli şifre oluşturabilirsiniz."
      }
    ]
  },
  "hash-generator": {
    id: "hash-generator",
    title: "Hash Oluşturucu - SHA-256, MD5, SHA-512 Hash Hesaplama",
    description: "Metinleriniz için anında MD5, SHA-1, SHA-256 ve SHA-512 kriptografik özet (hash) değerleri üretin. Ücretsiz online hash aracı.",
    h1: "Kriptografik Hash Oluşturucu",
    intro: "Verilerinizin bütünlüğünü doğrulamak ve dijital parmak izini almak için SHA-256, SHA-512 ve MD5 hash değerlerini hesaplayın.",
    aboutTitle: "Kriptografik Hash (Özet) Nedir?",
    aboutContent: "Hash fonksiyonları, herhangi bir uzunluktaki girdiyi sabit uzunlukta benzersiz bir karakter dizisine dönüştüren tek yönlü matematiksel algoritmalardır. Orijinal veride tek bir harf dahi değişse hash değeri tamamen değişir (çığ etkisi). Şifre saklama, veri bütünlüğü denetimi ve blokzincir teknolojilerinde temel yapı taşıdır.",
    steps: [
      { title: "Metni Girin", description: "Hash değerini almak istediğiniz metni veya veriyi yazın." },
      { title: "Algoritmaları İnceleyin", description: "SHA-256, MD5, SHA-512 ve SHA-1 değerleri anlık hesaplanır." },
      { title: "Hash Kodunu Kopyalayın", description: "İhtiyacınız olan hash değerini tek tıkla panoya alın." }
    ],
    faqs: [
      {
        question: "Hash geri döndürülebilir mi?",
        answer: "Hayır, hash fonksiyonları tek yönlüdür (one-way); özet değerinden orijinal metin matematiksel olarak geri türetilemez."
      },
      {
        question: "En güvenli hash algoritması hangisidir?",
        answer: "Günümüzde modern güvenlik standartları için SHA-256 ve SHA-512 algoritmaları önerilmektedir."
      },
      {
        question: "Metnim gizli kalır mı?",
        answer: "Evet, hesaplama Web Crypto API ile yerel tarayıcınızda gerçekleştirilir."
      },
      {
        question: "Kullanım ücreti var mı?",
        answer: "Hayır, tamamen ücretsizdir."
      }
    ]
  },
  "diff-checker": {
    id: "diff-checker",
    title: "Metin Karşılaştırıcı - İki Metin Arasındaki Farkları Bulma",
    description: "İki metin veya kod bloğu arasındaki eklenen, silinen ve değiştirilen satırları renkli fark analiziyle karşılaştırın.",
    h1: "Metin ve Kod Karşılaştırıcı (Diff Checker)",
    intro: "İki metin arasındaki değişiklikleri satır satır ve karakter bazında renkli vurgularla kolayca tespit edin.",
    aboutTitle: "Metin Karşılaştırma (Diff) Neden Kullanılır?",
    aboutContent: "Sözleşmelerin farklı versiyonları, makale taslakları veya yazılım kodları üzerinde çalışırken iki metin arasındaki ufak farkları gözle bulmak zordur. Diff Checker, iki metni karşılaştırarak silinen yerleri kırmızı, yeni eklenen kısımları yeşil renkle işaretler ve satır bazında net bir karşılaştırma raporu sunar.",
    steps: [
      { title: "Orijinal ve Yeni Metni Yapıştırın", description: "İki farklı kutucuğa karşılaştırmak istediğiniz metinleri ekleyin." },
      { title: "Farkları Görün", description: "Sistem anında satır ve karakter farklarını renklendirir." },
      { title: "Değişiklikleri İnceleyin", description: "Eklenen ve silinen kısımları adım adım gözden geçirin." }
    ],
    faqs: [
      {
        question: "Kod karşılaştırması için uygun mu?",
        answer: "Evet, JavaScript, Python, JSON, CSS gibi her türlü yazılım kodunu karşılaştırabilirsiniz."
      },
      {
        question: "Büyük/küçük harf duyarlılığı var mı?",
        answer: "Standart olarak karakter bazında tam eşleşme denetlenir."
      },
      {
        question: "Özel belgelerim sunucuya gider mi?",
        answer: "Hayır, karşılaştırma algoritması tamamen tarayıcınızda çalışır, gizliliğiniz güvendedir."
      },
      {
        question: "Ücretsiz mi?",
        answer: "Evet, TurkConvert'in tüm araçları gibi ücretsiz ve reklamsızdır."
      }
    ]
  },
  "qr-code-generator": {
    id: "qr-code-generator",
    title: "Gelişmiş QR Kod Stüdyosu - Wi-Fi, WhatsApp ve Logolu QR Kod Yapma",
    description: "Web sitesi, Wi-Fi ağı, WhatsApp mesajı, vCard veya metin için renkli, gradyanlı ve logolu QR kodlar oluşturun. Ücretsiz PNG ve SVG indirme.",
    h1: "Gelişmiş QR Kod Stüdyosu",
    intro: "Linkleriniz, Wi-Fi ağlarınız ve kurumsal iletişiminiz için süresiz, logolu ve yüksek çözünürlüklü QR kodlar tasarlayın.",
    aboutTitle: "QR Kod Stüdyosu ile Neler Yapabilirsiniz?",
    aboutContent: "Geleneksel siyah-beyaz kare kodların ötesine geçin! TurkConvert QR Kod Stüdyosu ile Wi-Fi şifrenizi karekoda gömüp misafirlerinizin tek tıkla bağlanmasını sağlayabilir, doğrudan WhatsApp sohbeti başlatan linkler üretebilir, ortasına özel logonuzu ekleyebilir ve iki renkli modern gradyan efektleri uygulayabilirsiniz.",
    steps: [
      { title: "İçerik Türünü Seçin", description: "URL, Wi-Fi, WhatsApp, Dijital Kartvizit (vCard) veya metin türünü belirleyin." },
      { title: "Tasarımı Özelleştirin", description: "Renkleri seçin, isterseniz gradyan ekleyin ve ortasına logonuzu yerleştirin." },
      { title: "PNG veya SVG Olarak İndirin", description: "Baskı ve dijital kullanım için süresiz geçerli QR kodunuzu kaydedin." }
    ],
    faqs: [
      {
        question: "Ortasına logo koyunca QR kodun okunması zorlaşır mı?",
        answer: "Hayır. Sistemimiz logo eklendiğinde otomatik olarak Seviye H (%30 hata toleransı) algoritmasına geçer. Bu sayede kodun üçte biri kapatılsa dahi telefon kameraları tarafından sorunsuz okunur."
      },
      {
        question: "Wi-Fi QR kodu nasıl çalışır?",
        answer: "Akıllı telefon kamerası veya barkod okuyucuyla taranan Wi-Fi QR kodu, şifre girmeye gerek kalmadan cihazın ağa otomatik bağlanmasını sağlar."
      },
      {
        question: "Oluşturulan kodların süresi dolar mı?",
        answer: "Hayır. Üretilen tüm QR kodlar doğrudan içeriği temsil eden statik kodlardır ve ömür boyu sınırsız olarak taranabilir."
      },
      {
        question: "Baskı ve tabela için vektörel SVG indirebilir miyim?",
        answer: "Evet, tek tıkla kayıpsız vektörel SVG veya ultra yüksek çözünürlüklü PNG formatında indirebilirsiniz."
      }
    ]
  },
  "seffaf-imza": {
    id: "seffaf-imza",
    title: "Şeffaf İmza Oluşturucu - Saydam Arka Planlı E-İmza Çizme",
    description: "Belgeleriniz, PDF sözleşmeleriniz ve dilekçeleriniz için arka planı saydam el yazısı imza oluşturun. Otomatik kırpma, şeffaf PNG ve SVG indirme.",
    h1: "Şeffaf İmza Oluşturucu",
    intro: "Sözleşmeleriniz ve resmi evraklarınız için fare veya dokunmatik ekran ile kolayca şeffaf arka planlı ıslak imza çizin.",
    aboutTitle: "Şeffaf Arka Planlı İmza Neden Tercih Edilir?",
    aboutContent: "Kağıda atılıp fotoğraflanan imzaların arkasındaki gri veya gölgeli zeminler, dijital belgelere yapıştırıldığında profesyonel olmayan bir görüntüye sebep olur. TurkConvert Şeffaf İmza Oluşturucu, pürüzsüz Bézier eğrileriyle gerçek mürekkep hissi verir ve otomatik kenar kırpma (auto-trim) ile imzanın çevresindeki gereksiz boşlukları silerek doğrudan şeffaf PNG veya vektörel SVG olarak kaydetmenizi sağlar.",
    steps: [
      { title: "İmzanızı Çizin", description: "Fare, parmak veya stylus kalem yardımıyla tuval üzerine imzanızı atın." },
      { title: "Mürekkep ve Kalınlığı Ayarlayın", description: "Siyah, kurumsal lacivert veya özel renk ve kalınlık seçin." },
      { title: "Şeffaf PNG Olarak İndirin", description: "Otomatik kenarları kırpılmış saydam imzanızı belgelerinizde kullanmak üzere indirin." }
    ],
    faqs: [
      {
        question: "İmzam internete veya bir sunucuya kaydediliyor mu?",
        answer: "Kesinlikle hayır. Çizim işlemi %100 yerel HTML5 Canvas üzerinde yapılır. Hiçbir çizim veya veri cihazınızdan dışarı aktarılmaz."
      },
      {
        question: "PDF ve Word belgelerine eklenebilir mi?",
        answer: "Evet, indirdiğiniz PNG dosyası şeffaf alfa kanalına sahip olduğundan belgedeki yazıların üzerine tam oturur ve beyaz çerçeve bırakmaz."
      },
      {
        question: "Otomatik kırpma (Auto-trim) nedir?",
        answer: "İmzanızın kapladığı alanı piksel piksel algılayarak etrafındaki geniş boşlukları otomatik siler. Böylece imza belgelere eklendiğinde devasa bir boş kutu oluşturmaz."
      },
      {
        question: "Telefondan veya tabletten çizebilir miyim?",
        answer: "Evet, tüm modern dokunmatik ekranlar, tabletler ve akıllı kalemler (Apple Pencil, S-Pen vb.) ile tam uyumludur."
      }
    ]
  },
  "belge-sansurleyici": {
    id: "belge-sansurleyici",
    title: "Gizli Belge Sansürleyici - T.C., IBAN ve Özel Bilgileri Gizleme",
    description: "Sözleşme, dekont ve belgelerinizdeki T.C. Kimlik No, IBAN ve hassas bilgileri siyah bant veya mozaik ile sansürleyin. %100 güvenli istemci taraflı araç.",
    h1: "Gizli Belge Sansürleyici",
    intro: "Kimlik kartı, dekont veya faturalarınızdaki gizli kişisel verileri siyah bant, bulanıklaştırma veya mozaik ile anında gizleyin.",
    aboutTitle: "KVKK Uyumlu Belge Sansürleme Neden Önemlidir?",
    aboutContent: "Sosyal medyada ödeme dekontu paylaşırken veya resmi kurumlara evrak iletirken T.C. Kimlik Numarası, banka hesap detayları ve açık adres gibi kişisel verilerin gizlenmesi KVKK ve siber güvenlik açısından kritiktir. TurkConvert Belge Sansürleyici, dosyalarınızı hiçbir uzak sunucuya göndermeden doğrudan tarayıcınızda işler.",
    steps: [
      { title: "Belgenizi Yükleyin", description: "Sansürlemek istediğiniz JPG, PNG veya WebP belgesini seçin." },
      { title: "Sansür Yöntemini Seçin", description: "Siyah bant, bulanıklaştırma (blur) veya piksel mozaik aracını seçip ilgili alanın üzerine kutu çizin." },
      { title: "Güvenli Belgeyi İndirin", description: "Hassas bilgileri geri döndürülemez şekilde gizlenmiş belgenizi kaydedin." }
    ],
    faqs: [
      {
        question: "Sansürlenen bilgiler sonradan geri açılabilir mi?",
        answer: "Hayır. Belge dışa aktarılırken sansür uygulanan alanlardaki pikseller tamamen yeni renklerle yeniden yazılır, katman bilgisi kalmaz ve geri döndürülemez."
      },
      {
        question: "Belgem sunucuya aktarılır mı?",
        answer: "Hayır. Tüm işlem cihazınızın tarayıcısında gerçekleşir. Gizli sözleşmeleriniz ve kişisel evraklarınız tamamen sizde kalır."
      },
      {
        question: "Hangi sansür yöntemleri var?",
        answer: "Klasik örtücü siyah bant, yumuşak bulanıklaştırma (blur), piksel mozaik efekti ve serbest fırça ile boyama modları mevcuttur."
      },
      {
        question: "İşlem ücretsiz mi?",
        answer: "Evet, TurkConvert üzerindeki tüm araçlar gibi tamamen ücretsiz ve sınırsızdır."
      }
    ]
  },
  "image-compare": {
    id: "image-compare",
    title: "Görsel Karşılaştırıcı - İki Resmi Yan Yana ve Kaydırıcı ile Kıyasla",
    description: "İki resim arasındaki kalite ve piksel farklarını interaktif Before/After (Önce/Sonra) kaydırıcısı ile canlı karşılaştırın. Ücretsiz online görsel kıyaslama.",
    h1: "Görsel Karşılaştırıcı (Before / After Slider)",
    intro: "Sıkıştırılmış, filtrelenmiş veya düzenlenmiş iki görseli etkileşimli kaydırıcı ve fark maskesiyle piksel piksel kıyaslayın.",
    aboutTitle: "Görsel Karşılaştırma Neden Kullanılır?",
    aboutContent: "Fotoğraf düzenleme, yapay zeka büyütme veya görsel sıkıştırma sonrasında orijinal kalite ile yeni kaliteyi yan yana görmek insan gözü için zordur. Etkileşimli Before/After slider sayesinde fareyi sağa sola kaydırarak en küçük detayları, renk değişimlerini ve piksel keskinliğini anında fark edebilirsiniz.",
    steps: [
      { title: "İki Görseli Yükleyin", description: "Önceki ve sonraki durumdaki iki fotoğrafınızı ekleyin." },
      { title: "Kaydırıcıyı Hareket Ettirin", description: "Çizgiyi sağa ve sola çekerek iki görsel arasındaki farkı canlı izleyin." },
      { title: "Görünüm Modunu Değiştirin", description: "Kaydırıcı, Yan Yana veya Piksel Fark Maskesi seçenekleriyle inceleme yapın." }
    ],
    faqs: [
      {
        question: "Fark maskesi modu ne işe yarar?",
        answer: "İki görsel arasındaki mutlak piksel farkını gösterir. Birebir aynı olan bölgeler siyah kalırken, değişen yerler renkli parlar."
      },
      {
        question: "Mobil cihazlarda kaydırıcı çalışır mı?",
        answer: "Evet, dokunmatik ekranlarda parmağınızla kaydırarak akıcı şekilde karşılaştırma yapabilirsiniz."
      },
      {
        question: "Farklı boyutlardaki resimler kıyaslanabilir mi?",
        answer: "En iyi sonuç aynı ebatlardaki görsellerde alınmakla birlikte farklı boyutlardaki görseller de orantılı olarak hizalanır."
      },
      {
        question: "Dosyalarım güvende mi?",
        answer: "Tüm analiz tarayıcınızın belleğinde çalışır; hiçbir görsel sunucuya yüklenmez."
      }
    ]
  },
  "fatura-olusturucu": {
    id: "fatura-olusturucu",
    title: "Ücretsiz PDF Fatura Oluşturucu - Kolay Fatura, Fiş ve Teklif Hazırlama",
    description: "Küçük işletmeler ve serbest çalışanlar için ücretsiz A4 PDF fatura, fiş ve teklif oluşturucu. Otomatik KDV hesabı, canlı önizleme ve anında indirme.",
    h1: "Ücretsiz PDF Fatura ve Teklif Oluşturucu",
    intro: "Müşterileriniz için dakikalar içinde şık, kurumsal ve hesaplamalı A4 PDF fatura veya fiyat teklifi hazırlayın.",
    aboutTitle: "Online Fatura Oluşturucu ile Neler Yapabilirsiniz?",
    aboutContent: "Karmaşık muhasebe programlarına ihtiyaç duymadan satıcı bilgilerinizi, müşteri detaylarını ve ürün kalemlerini girerek anında kurumsal A4 PDF çıktısı alabilirsiniz. Kalemlerin ara toplamı ve KDV oranları otomatik hesaplanır; 'Firma Bilgilerimi Hatırla' özelliği ile bir sonraki faturanızda bilgilerinizi tekrar yazmanız gerekmez.",
    steps: [
      { title: "Firma ve Müşteri Bilgilerini Girin", description: "Unvan, adres, vergi bilgileri ve dilerseniz şirket logonuzu ekleyin." },
      { title: "Kalemleri ve Fiyatları Belirleyin", description: "Hizmet açıklaması, miktar, birim fiyat ve KDV oranlarını girin; toplamlar anında hesaplansın." },
      { title: "A4 PDF Olarak İndirin", description: "Canlı önizlemede kusursuz görünen faturanızı tek tıkla PDF olarak kaydedin." }
    ],
    faqs: [
      {
        question: "Firma bilgilerimi her seferinde tekrar yazmam gerekir mi?",
        answer: "Hayır. 'Firma Bilgilerimi Hatırla' butonuna bastığınızda bilgileriniz tarayıcınızın yerel hafızasında (localStorage) saklanır ve sonraki ziyaretlerinizde hazır gelir."
      },
      {
        question: "KDV oranları nasıl hesaplanıyor?",
        answer: "Her ürün kalemi için %0, %1, %10 veya %20 KDV oranı seçebilirsiniz. Sistem ara toplamı, toplam KDV'yi ve genel toplamı otomatik hesaplar."
      },
      {
        question: "Hangi para birimleri destekleniyor?",
        answer: "Türk Lirası (₺), Amerikan Doları ($), Euro (€) ve İngiliz Sterlini (£) desteklenmektedir."
      },
      {
        question: "Oluşturulan PDF çıktıları yazdırmaya uygun mu?",
        answer: "Evet, vektörel A4 standartlarında yüksek çözünürlükle üretilir; hem dijital gönderim hem de yazıcıdan çıktı almak için kusursuzdur."
      }
    ]
  }
};

export function getToolSeo(toolId: string): ToolSeoInfo | undefined {
  return toolsSeo[toolId];
}

export function getToolMetadata(toolId: string): Metadata {
  const seo = toolsSeo[toolId];
  if (!seo) {
    return {
      title: "TurkConvert - Ücretsiz Online Dosya Dönüştürme Araçları",
      description: "Hızlı, güvenli ve ücretsiz online dosya dönüştürme araçları.",
    };
  }

  const canonicalUrl = `https://turkconvert.online/${seo.id}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${seo.title} | TurkConvert`,
      description: seo.description,
      url: canonicalUrl,
      siteName: "TurkConvert",
      type: "website",
      locale: "tr_TR",
    },
    twitter: {
      card: "summary_large_image",
      title: `${seo.title} | TurkConvert`,
      description: seo.description,
    },
  };
}
