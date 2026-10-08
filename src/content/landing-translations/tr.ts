import type { GamesPageCopy } from "@/content/games-page";
import type {
  IntentLandingPageCopy,
  IntentLandingPageLabels,
  IntentLandingPageSlug,
} from "@/content/intent-landing-pages";

/**
 * The landing pages in Turkish.
 *
 * Written for what people type into a search box in Turkish ("aynı anda film izleme",
 * "sevgiliyle uzaktan film izleme", "iki kişilik online oyunlar"), not word for word from the
 * English. The voice is the site's: "siz" in running text, the bare imperative on buttons.
 * Game names and buttons are the app's own Turkish ones (XOX, Yapboz, pul).
 */

export const intentLabels: IntentLandingPageLabels = {
  home: "Ana sayfa",
  bestFor: "En uygun",
  youNeed: "Gerekenler",
  worthKnowing: "Bilmeye değer",
  readGuide: "Rehberi oku",
  faqEyebrow: "SSS",
  faqTitle: "Kısa ve sade cevaplar.",
  openPage: "Sayfayı aç",
};

const watchTogether: IntentLandingPageCopy = {
  metadataTitle: "Arkadaşlarla Aynı Anda Film İzleme: Ücretsiz",
  metadataDescription:
    "Aynı anda film izleme sitesi: arkadaşlarınızla film ve dizileri senkron izleyin, ücretsiz. Özel oda açın, bağlantı yapıştırın ya da ekran paylaşın. İndirme yok.",
  breadcrumbName: "Birlikte İzleyin",
  schemaFeatures: [
    "Her izleyicide senkron oynatma",
    "Özel oda bağlantıları, misafir için hesap gerekmez",
    "Videonun yanında canlı sohbet ve tepkiler",
    "Gömülmeye izin vermeyen servisler için ekran paylaşımı",
    "Oda sahibinin bilgisayarından yerel dosya yayını",
    "Masaüstünde ve mobilde tarayıcıda çalışır",
  ],
  kicker: "Birlikte izleyin",
  title: "Aynı anda film izleyin,",
  titleAccent: "herkesle, her tarayıcıdan.",
  intro:
    "Movmash bir birlikte film izleme sitesidir: özel bir oda açın, tek bir bağlantı paylaşın ve filmleri, dizileri ya da videoları senkron oynatma, sohbet ve tepkilerle aynı anda izleyin. Misafirler tarayıcıdan katılır; kurulacak bir şey yok.",
  ctaLabel: "Birlikte İzlemeye Başla",
  secondaryCtaLabel: "Nasıl çalıştığını gör",
  heroSignals: ["Online birlikte izleme", "Özel oda bağlantıları", "Uygulama kurulumu yok"],
  media: {
    heroAlt: "İnternette birlikte film izlemeye hazırlanan arkadaşlar",
    heroCaption: "Önce arkadaş ortamının sıcaklığı; ardından herkesi kolayca içeri alan sade bir oda.",
    stepsAlt: "İnternette bir izleme partisine katılan arkadaşlar",
    featureAlt: "Online izleme partisinde bir araya gelen arkadaşlar",
  },

  overview: {
    eyebrow: "Ne anlama geliyor",
    title: "İnternette birlikte izlemek aslında ne demek?",
    paragraphs: [
      "Bir şeyi internette birlikte izlemek, deneyene kadar basit görünür. İki kişi aynı videoda birkaç saniye arayla Oynat'a basar ve gecenin geri kalanını birbirini yeniden aynı ana getirmeye çalışarak geçirir. Biri ekran paylaşır, ses gelmez. Bir başkası telefondadır, bağlantı açılmaz. Zor olan film değildir; aynı saniyede kalmaktır.",
      "Birlikte izleme sitesi bunu tek bir ortak saat tutarak çözer. Herkes kendi kopyasını yönetmek yerine oda tek bir oynatma konumu tutar. Biri duraklatınca herkeste durur. Biri yirmi dakika geç katılınca baştan değil, odanın o an olduğu yerden başlar. Aynı saatte izlemekle gerçekten aynı anda film izlemek arasındaki bütün fark budur.",
      "Movmash bu ortak saati tarayıcı sekmesinde açtığınız özel bir odaya koyar. Videonun oraya nasıl geleceğini siz seçersiniz: desteklenen bir bağlantı, ekranınız ya da bilgisayarınızdaki bir dosya. Gerisi hep aynıdır: tek oda, tek bağlantı, senkron oynatma; sohbet ve tepkiler de ayrı bir uygulamada değil, videonun yanında.",
      "Misafirlerin hesaba ihtiyacı yoktur ve kimse bir şey kurmaz. Bir bağlantı gönderirsiniz, açarlar ve oda çalışır. Oda oluşturmak için Google ile giriş yapılır, böylece oda sizin kalır; katılmak içinse hiçbir şey gerekmez.",
    ],
  },

  modesEyebrow: "İzlemenin üç yolu",
  modesTitle: "Videonun ekrana nasıl geleceğini seçin.",
  modesCopy:
    "Her gece aynı kurulumu istemez. Desteklenen bir bağlantı en pürüzsüz yoldur; ekran paylaşımı doğrudan gömülmeye izin vermeyen servisleri, yerel dosyalar ise internete hiç çıkmamış her şeyi kapsar.",
  modes: [
    {
      name: "Desteklenen bir bağlantı yapıştırın",
      summary:
        "Desteklenen bir platformdan bir adres bırakın, oda oynatmayı herkes için aynı anda yönetsin. En temiz seçenek budur: herkes videoyu kendi bağlantısından, kendi kalitesinde izler; oda ise zaman çizgisini ortak tutar.",
      bestFor: "YouTube, Vimeo, Twitch, Dailymotion ve doğrudan HLS yayınları",
      needs: "Yalnızca bağlantı",
      limit: "Yalnızca gömülü oynatmaya izin veren platformlarda çalışır",
    },
    {
      name: "Ekranınızı paylaşın",
      summary:
        "Videoyu kendi bilgisayarınızda oynatın ve odaya yayınlayın. Oda bir servisi gömmek yerine sizin ekranınızı gösterdiği için, doğrudan gömülmeyi engelleyen abonelikli platformları kapsayan yol budur.",
      bestFor: "Netflix, Disney+, Prime Video ve tarayıcıda açılan her şey",
      needs: "Paylaşılacak bir tarayıcı sekmesi, pencere ya da tam ekran",
      limit: "Sesin gelmesi için tarayıcı sekmesi paylaşın; pencere ve tam ekran paylaşımında ses çoğu zaman düşer",
    },
    {
      name: "Yerel bir dosya yayınlayın",
      summary:
        "Bir video dosyasını doğrudan bilgisayarınızdan odaya oynatın. Dosya oynarken odadaki kişilere yayınlanır; sunucularımıza hiçbir zaman yüklenmez ve orada saklanmaz.",
      bestFor: "İndirilenler, ev videoları, kurgular ve hiçbir yayın servisinde olmayan her şey",
      needs: "Oda sahibinin bilgisayarında bir video dosyası",
      limit: "Dosya oda sahibinin bilgisayarından oynadığı için oda sahibinin odada kalması gerekir",
    },
  ],

  benefitEyebrow: "Neden daha iyi işliyor",
  benefitTitle: "Herkes çabucak yerleşir.",
  benefitCopy: "Oda kısa sürede tanıdık gelir; böylece kimse bir şeyleri çözmeye uğraşmaz, izlemeye başlar.",
  benefits: [
    {
      title: "Aynı saniyede kalın",
      description:
        "Oda herkes için tek bir oynatma konumu tutar. Duraklatın, ileri sarın ya da geç katılın; konum ortak kalır ve kimse odanın henüz gelmediği bir sahneye tepki vermez.",
    },
    {
      title: "Misafirler hızlı katılır",
      description:
        "Tek bir bağlantı gönderin ve film gecesini kurulum saatine çevirmeden herkesi içeri alın. Hesap yok, indirme yok, kimseye izin ayarı anlatmak yok.",
    },
    {
      title: "Planlar değişince esnek",
      description:
        "Bir bağlantı gömülmüyorsa ekran paylaşımına geçin. Dosya internete hiç çıkmadıysa yerelden yayınlayın. Bütün gece tek bir yönteme bağlı kalmazsınız.",
    },
    {
      title: "Sohbet yakında kalır",
      description:
        "Sohbet ve tepkiler ayrı bir uygulamada değil, videonun hemen yanındadır; kimse bir pencerede izleyip diğerinde konuşmaz.",
    },
  ],

  scenarioEyebrow: "Ne için kullanılır",
  scenarioTitle: "Tek bir gece türü için yapılmadı.",
  scenarioCopy:
    "Aynı oda, aralarında üç saat dilimi olan iki kişi için de, yeni bölümü yayın gecesinde yakalayan bir grup için de çalışır.",
  scenarios: [
    {
      title: "Arkadaşlarla film gecesi",
      description:
        "Bir şey seçin, oda bağlantısını paylaşın ve grup sohbetinde geri sayıp herkesin aynı anda Oynat'a basmasını ummak yerine birlikte başlayın.",
    },
    {
      title: "Yeni bölümler ve yeniden izlemeler",
      description:
        "Dizileri çıktıkları gece birlikte izleyin ya da eski bir favoriye, repliklerini en iyi bilenlerle geri dönün.",
    },
    {
      title: "Uzak mesafe izlemeleri",
      description:
        "Başka bir ülkedeki sevgilinizle, kardeşinizle ya da arkadaşınızla sabit bir geceniz olsun; diğer seçenek aynı filmi ayrı ayrı izleyip mesajlaşmak.",
    },
  ],

  platformsEyebrow: "Neler izleyebilirsiniz",
  platformsTitle: "Zaten kullandığınız kaynaklarla çalışır.",
  platformsCopy:
    "Bazı platformlar doğrudan odada oynar. Bazıları ise hiçbir yerde gömülü oynatmaya izin vermez; ekran paylaşımı bunlar içindir ve tarayıcıda açabildiğiniz neredeyse her servisi kapsar.",
  platformGroups: [
    {
      label: "Doğrudan bağlantıdan oynar",
      items: ["YouTube", "Vimeo", "Twitch", "Dailymotion", "Doğrudan HLS yayınları"],
      note: "Adresi yapıştırın, oda oynatmayı herkes için senkronlasın.",
    },
    {
      label: "Ekran paylaşımıyla izlenir",
      items: ["Netflix", "Disney+", "Prime Video", "Max", "Hulu", "Crunchyroll"],
      note: "Bunlar gömülü oynatmayı engeller, bu yüzden sekmeyi paylaşırsınız. Herkesin kendi aboneliği olmalıdır.",
    },
    {
      label: "Doğrudan bilgisayarınızdan",
      items: ["MP4 ve MKV dosyaları", "İndirilenler", "Ev videoları", "Kişisel kurgular"],
      note: "Bilgisayarınızdan odaya yayınlanır. Hiçbir zaman yüklenmez, sunucularımızda saklanmaz.",
    },
  ],

  stepsEyebrow: "Nasıl çalışır",
  stepsTitle: "Movmash'i açın, tek bir bağlantı paylaşın, Oynat'a basın.",
  stepsCopy:
    "Üç adım; yalnızca ilki hesap ister. Sıfırdan başlayan odaların çoğu bir dakika içinde izlemeye geçer.",
  steps: [
    {
      title: "Bir oda açın",
      description:
        "Google ile giriş yapın ve bir oda oluşturun. Bağlantı mı yapıştıracağınızı, ekran mı paylaşacağınızı, yoksa yerel bir dosya mı oynatacağınızı seçin.",
    },
    {
      title: "Tek bir bağlantı paylaşın",
      description:
        "Oda bağlantısını zaten konuştuğunuz yerden gönderin: sohbet, özel mesaj, grup. Misafirler bağlantıyı herhangi bir tarayıcıda açar ve içeridedir; hesap da kurulum da gerekmez.",
    },
    {
      title: "Birlikte Oynat'a basın",
      description:
        "O andan sonra oynatma ortak kalır. Atıştırmalık için duraklatın, kimsenin duymadığı repliği geri sarın; bütün oda sizinle birlikte hareket eder.",
    },
  ],

  faqs: [
    {
      question: "Arkadaşlarımla internette birlikte nasıl film izlerim?",
      answer:
        "Movmash'te bir oda açın, kaynağınızı seçin ve oda bağlantısını katılacak kişilere gönderin. Bağlantıyı tarayıcıda açarlar ve sizin olduğunuz ana senkronlanmış olarak odaya girerler. Film gömülmeye izin vermeyen bir servisteyse bağlantı yapıştırmak yerine tarayıcı sekmenizi paylaşın; gerisi aynı şekilde çalışır.",
    },
    {
      question: "Birlikte izlemek için misafirlerin hesabı olması gerekir mi?",
      answer:
        "Hayır. Misafirler yalnızca oda bağlantısıyla tarayıcıdan katılır. Oda oluşturmak için Google ile giriş yapılır, böylece oda size bağlı kalır; davet ettiğiniz kişilerin ise kayıt olması hiç gerekmez.",
    },
    {
      question: "Birlikte film izlemek için ücretsiz bir site var mı?",
      answer:
        "Evet. Movmash, birlikte film izlemek için ücretsiz bir sitedir: ücretsiz bir planı vardır, tarayıcıda çalışır ve para ödemeden ya da bir şey indirmeden oda açabilirsiniz. Ücretsiz odalar iki kişi için tasarlanmıştır; bu da uzak mesafe izlemelerinin çoğunu karşılar. Ücretli planlar katılımcı sınırını bunun üzerine çıkarır; izleme süresini, görüntülü aramaları ve ekran paylaşımı kalitesini de artırır.",
    },
    {
      question: "Bir odada kaç kişi birlikte izleyebilir?",
      answer:
        "Ücretsiz odalar iki katılımcıyı destekler. Premium odalar elliden fazla kişilik büyük gruplar için tasarlanmıştır; böylece bütün bir arkadaş grubu aynı odada birlikte izleyebilir.",
    },
    {
      question: "Netflix ya da Disney+'ı birlikte izleyebilir miyiz?",
      answer:
        "Evet, ekran paylaşımıyla. Abonelikli servisler gömülü oynatmayı her yerde engeller; bu yüzden hiçbir izleme partisi aracı onları bir bağlantıdan çekemez. Tarayıcı sekmenizi paylaşın, oda sizin gördüğünüzü görsün. Yine de herkesin o servise kendi aboneliği olmalıdır.",
    },
    {
      question: "Bilgisayarımdaki video dosyalarını arkadaşlarımla izleyebilir miyim?",
      answer:
        "Evet. Bir video dosyasını doğrudan bilgisayarınızdan odaya yayınlayabilirsiniz; bu, indirilenleri, ev videolarını ve hiçbir yayın servisinde olmamış her şeyi kapsar. Dosya oynarken yayınlanır; onu sunucularımıza hiçbir zaman yüklemeyiz ve saklamayız.",
    },
    {
      question: "Uygulama indirmem gerekiyor mu?",
      answer:
        "Hayır. Movmash masaüstünde ve mobilde tarayıcıda çalışır. Ne oda sahibinin ne de misafirlerin kuracağı bir şey vardır; başlayan bir geceyle sorun gidermeye dönüşen bir gece arasındaki fark da çoğu zaman budur.",
    },
    {
      question: "Ekran paylaşımımda neden ses yok?",
      answer:
        "Neredeyse her zaman tarayıcı sekmesi yerine bir pencere ya da tam ekran paylaşıldığı için. Sesi güvenilir biçimde taşıyan tek yol sekme paylaşımıdır; insanlar videoyu görüp duyamıyorsa paylaşımı durdurun ve doğrudan o sekmeyi seçin.",
    },
    {
      question: "Oda gizli kalır mı?",
      answer:
        "Evet. Odalar varsayılan olarak özeldir ve yalnızca davet bağlantısına sahip kişiler ulaşabilir. Herkese açık bir dizin yoktur; hiçbir şey listelenmez ya da gezilemez.",
    },
    {
      question: "Telefondan birlikte izleyebilir miyiz?",
      answer:
        "Evet. Misafirler aynı bağlantıyla mobil tarayıcıdan katılıp izleyebilir. Oda sahipliği bilgisayarda daha rahattır; özellikle ekran paylaşıyor ya da yerel bir dosya yayınlıyorsanız.",
    },
    {
      question: "İzlemenin dışında ne yapabiliriz?",
      answer:
        "Her odada sohbet ve tepkiler vardır; ayrıca odadan çıkmadan aynı odada oynayabileceğiniz oyunlar da var: XOX, Connect 4 ve ortak yapboz. Hepsi ücretsiz plandadır; herkes gelene kadarki boşluğu doldurmanın iyi bir yoludur.",
    },
  ],

  guidesEyebrow: "Daha derine",
  guidesTitle: "Birlikte izleme rehberleri.",
  guidesCopy:
    "Doğru yapmaya değer konularda daha uzun yazılar: hangi araç ne yapar, gömülmeyi engelleyen platformlarla nasıl başa çıkılır ve kendi dosyalarınızı odaya nasıl oynatırsınız.",
  guides: [
    {
      title: "Uzaktan birlikte film izleme",
      description: "Altı yöntem, dürüstçe karşılaştırıldı: izleme odaları, senkron eklentileri, ekran paylaşımı ve fazlası.",
    },
    {
      title: "Birlikte film izleme siteleri, karşılaştırmalı",
      description: "Her tür nedir, izleyen herkesten ne ister ve Rabb.it'in yerini ne aldı.",
    },
    {
      title: "Bilgisayardaki filmi birlikte izleme",
      description: "Kendi bilgisayarınızdaki bir videoyu odaya senkron yayınlayın; yükleme yok, bekleme yok.",
    },
    {
      title: "YouTube'u birlikte izleme",
      description: "En basit başlangıç: desteklenen bir bağlantı, tek oda ve senkron oynatma.",
    },
    {
      title: "Movmash nasıl kullanılır",
      description: "Kaynak seçmekten bağlantı paylaşmaya ve senkron izlemeye, adım adım.",
    },
    {
      title: "Ücretsiz birlikte film izleme",
      description: "Ücretsiz plan gerçekte neleri kapsıyor ve ekran paylaşımı nerede devreye giriyor.",
    },
  ],
  exploreLinks: [
    {
      title: "Uzak mesafe buluşma gecesi",
      description: "Aynı oda akışının iki kişilik, daha sıcak hali.",
    },
    {
      title: "Birlikte oynanacak oyunlar",
      description: "Zaten içinde olduğunuz odada çalışan ücretsiz tarayıcı oyunları.",
    },
    {
      title: "Movmash blogu",
      description: "Pratik rehberlere ve birlikte izleme fikirlerine göz atın.",
    },
  ],
  finalTitle: "Bir oda açın ve bu akşam birlikte izleyin.",
  finalCopy: "Movmash birlikte izlemeyi ilk tıklamadan itibaren basit, anlaşılır ve başlaması kolay tutar.",
  finalSignals: ["Özel oda bağlantıları", "İndirme gerekmez", "Tarayıcıda çalışır"],
};

const longDistanceDateNight: IntentLandingPageCopy = {
  metadataTitle: "Sevgiliyle Uzaktan Film İzleme Uygulaması",
  metadataDescription:
    "Sevgiliyle uzaktan film izleme uygulaması: özel bir odada senkron oynatma ve sohbetle buluşma gecesi yapın. İki kişiye ücretsiz, kurulum yok.",
  breadcrumbName: "Uzak Mesafe Buluşma Gecesi",
  schemaFeatures: [
    "Ücretsiz planda iki kişilik özel odalar",
    "Tek bir ortak saatte tutulan senkron oynatma",
    "Videonun yanında canlı sohbet ve tepkiler",
    "Misafir için hesapsız, tarayıcıdan katılım",
    "Netflix, Disney+ ve Prime Video için ekran paylaşımı",
    "Oda sahibinin bilgisayarından yerel dosya yayını",
  ],
  kicker: "Uzak mesafe buluşma gecesi",
  title: "Sevgilinizle uzaktan film izleyin,",
  titleAccent: "gerçek bir buluşma gibi.",
  intro:
    "İki kişilik özel bir oda açın, tek bir bağlantı paylaşın ve senkron oynatma, sohbet ve tepkilerle uzaktan birlikte film izleyin. İki kişilik odalar ücretsizdir ve katılan kişinin hesaba ihtiyacı yoktur.",
  ctaLabel: "Buluşma Gecesi Odası Aç",
  secondaryCtaLabel: "Nasıl çalıştığını gör",
  heroSignals: ["İki kişilik özel oda", "İki kişiye ücretsiz", "Tarayıcıdan kolay katılım"],
  media: {
    heroAlt: "İnternette birlikte vakit geçiren uzak mesafe çifti",
    heroCaption: "Teknik değil, önce sakin hissettirmesi gereken geceler için daha yumuşak bir oda.",
    stepsAlt: "Film buluşması yapan uzak mesafe çifti",
    featureAlt: "Sıcak bir uzak mesafe buluşma gecesindeki çift",
  },
  insideRoom: {
    eyebrow: "Odanın içi",
    title: "İnsanların düzene değil geceye odaklanabileceği kadar sade.",
  },

  overview: {
    eyebrow: "Farkı ne",
    title: "Uzaktan izlemenin kendine özgü sorunları var.",
    paragraphs: [
      "Başka bir şehirdeki sevgilinizle bir şey izlemek, kalabalık bir izleme partisiyle aynı sorun değildir; gruplar için yapılmış araçlar da asıl aksayan şeyi çoğu zaman kaçırır. Ortada iki kişi vardır: genellikle uzun bir günün sonunda, çoğu zaman farklı saat dilimlerinde, bir saatliğine aynı odadaymış gibi hissetmeye çalışan iki kişi. Teknolojinin yapması gereken tek şey aradan çekilmektir.",
      "Aksayan şey nadiren videodur. Birinizin üç saat ileride ve çoktan yorgun olmasıdır. Ne izleneceğine karar vermekle geçen on dakika, ardından onu iki tarafta da çalıştırmak için geçen bir on dakika daha. Film oynarken tepkileri ayrı bir uygulamaya yazmaktır; yani kâğıt üzerinde birlikte, gerçekte tek başınıza izlersiniz. Her şey çalıştığında korumaya çalıştığınız akşamın çoğu gitmiştir.",
      "İki kişilik bir oda bunun mekanik yarısını çözer. Oynatma tek bir ortak saatte kalır; duraklatma ikiniz için de duraklatmadır ve kimse sessizce otuz saniye ileride olmaz. Sohbet ve tepkiler başka bir pencerede değil, videonun yanındadır. Katılmak ise bir bağlantıdır: karşı taraftaki kişi onu açar ve oradadır; hesap yok, kurulum yok, ona bir şey anlatmak yok.",
      "İki kişilik odalar ücretsiz plandadır; bunu açıkça söylemeye değer, çünkü izleme partisi araçlarının çoğu tam da bunun için ücret alır. Burada iki kişi bir deneme kademesi değildir. Ürünün biçimi budur; bu da tam olarak bir uzak mesafe ilişkisinin biçimidir.",
    ],
  },

  modesEyebrow: "Filmi ekrana getirmek",
  modesTitle: "Ne izlediğinize göre başlamanın üç yolu.",
  modesCopy:
    "Buluşma gecelerinin çoğu abonelikli bir servistir; yani öğrenilmesi gereken yol ekran paylaşımıdır. Diğer ikisi, daha basit bir şey ya da zaten elinizde olan bir şey içindir.",
  modes: [
    {
      name: "Ekranınızı paylaşın",
      summary:
        "Filmi kendi bilgisayarınızda oynatın ve odaya yayınlayın. Çiftlerin gerçekten kullandığı servislerin yolu budur, çünkü hiçbiri videonun başka bir yere gömülmesine izin vermez.",
      bestFor: "Netflix, Disney+, Prime Video, Max ve tarayıcıda açılan her şey",
      needs: "İkinizin de yine kendi aboneliği olmalı",
      limit: "Tüm ekranı değil, tarayıcı sekmesini paylaşın; sesin gelmesinin tek yolu budur",
    },
    {
      name: "Desteklenen bir bağlantı yapıştırın",
      summary:
        "Bir adres bırakın, oda oynatmayı ikiniz için senkronlasın. Ekran paylaşımından daha hafiftir, çünkü iki taraf da videoyu doğrudan izler; zayıf bağlantıda işe yarar.",
      bestFor: "YouTube, Vimeo, Twitch, Dailymotion ve doğrudan yayınlar",
      needs: "Yalnızca bağlantı",
      limit: "Yalnızca platformun gömülü oynatmaya izin verdiği yerde çalışır",
    },
    {
      name: "Yerel bir dosya oynatın",
      summary:
        "Bir videoyu doğrudan bilgisayarınızdan odaya yayınlayın. Hiçbir serviste olmamış şeyler için kullanışlıdır: bir indirme, eski bir favori, sizin yaptığınız bir şey.",
      bestFor: "İndirilenler, ev videoları, çevrimdışı her şey",
      needs: "Dosyanın oda sahibinde olması",
      limit: "Dosya oda sahibinin bilgisayarından oynadığı için oda sahibi odada kalmalıdır",
    },
  ],

  benefitEyebrow: "Buluşma gecesi rahatlığı için",
  benefitTitle: "Asıl buluşmaya daha çok yer.",
  benefitCopy: "Amaç yalnızca birlikte vakit geçirmekken hiçbir şey teknik hissettirmemeli.",
  benefits: [
    {
      title: "Film boyunca mesajlaşmaktan daha yakın",
      description:
        "Senkron oynatma ve hafif tepkiler geceyi bölünmüş değil, paylaşılmış hissettirir. Çoktan geçmiş bir sahneyle ilgili bir mesaja değil, aynı saniyeye tepki verirsiniz.",
    },
    {
      title: "Varsayılan olarak özel",
      description:
        "Odaya yalnızca gönderdiğiniz bağlantıyla ulaşılır. Dizin yok, herkese açık bir şey yok; davet edilmeyen kimse gelmez.",
    },
    {
      title: "İki taraf için de girmesi kolay",
      description:
        "Katılan kişi için kurulum da hesap da yok; böylece her şeyin nerede olduğunu anlatmakla geçen o tuhaf ilk on dakikadan kurtulursunuz.",
    },
    {
      title: "Planlar değişince esnek",
      description:
        "Bağlantı kullanın, ekran paylaşımına geçin ya da yerel bir dosya yayınlayın. Akşamın planı değişse de odanın değişmesi gerekmez.",
    },
  ],

  scenarioEyebrow: "Ne için kullanılır",
  scenarioTitle: "Korumaya değer geceler.",
  scenarioCopy:
    "Bunu sürdüren çiftler, her seferinde ayarlamak yerine onu sabit bir alışkanlığa çevirenlerdir.",
  scenarios: [
    {
      title: "Haftalık sabit gece",
      description:
        "Aynı akşam, aynı oda bağlantısı, pazarlık yok. Bir ritüel yoğun bir haftadan sağ çıkar; “bir ara bir şey izleyelim” ise asla çıkmaz.",
    },
    {
      title: "Sürpriz buluşmalar",
      description:
        "Habersizce bir bağlantı gönderin ve sıradan bir akşamı daha iyi bir şeye çevirin. İşe yarar, çünkü karşı tarafta kurulum zahmeti sıfırdır.",
    },
    {
      title: "İçinizi ısıtan tekrarlar",
      description:
        "Amaç film değil de yan yana olmaksa, ikinizin de iki kez izlediği bir şey doğru seçimdir. Yakın hissetmek için kimsenin dikkat kesilmesi gerekmez.",
    },
  ],

  guidesEyebrow: "Daha derine",
  guidesTitle: "Uzak mesafe çiftleri için rehberler.",
  guidesCopy:
    "Mesafeyi küçültmek üzerine daha uzun yazılar: buluşma gecesi fikirleri, edinmeye değer uygulamalar ve birlikte izlemenin neden işe yaradığı.",
  guides: [
    {
      title: "25 uzak mesafe buluşma fikri",
      description: "İlk haftadan sonra da işe yarayan sanal buluşma fikirleri; geçici heveslerin listesi değil.",
    },
    {
      title: "Netflix'i uzaktan birlikte izleme",
      description: "Netflix'in kendi birlikte izleme özelliği yok. 2026'da işe yarayanlar, dürüstçe karşılaştırıldı.",
    },
    {
      title: "Uzak mesafe ilişkisi uygulamaları",
      description: "Senkron film geceleri, günlük bağ ve oyun geceleri için on bir uygulama.",
    },
    {
      title: "Uzak mesafe ilişkisinde birlikte izlemek neden önemli",
      description: "Duygusal uyum, ortak anılar ve mesafenin yarattığı sessiz saatleri doldurmak.",
    },
    {
      title: "Uzak mesafe ilişkisi nasıl canlı tutulur",
      description: "Durum bildirmek yerine ortak etkinlikler, tekrarlanan küçük ritüeller ve saat dilimi planı.",
    },
    {
      title: "Ücretsiz birlikte film izleme",
      description: "Kurulumun genel hali; çiftler kadar arkadaşlar ve gruplar için de.",
    },
  ],

  stepsEyebrow: "Nasıl çalışır",
  stepsTitle: "Movmash'i açın, bağlantıyı gönderin, yerleşin.",
  stepsCopy:
    "Biriniz Movmash'i daha önce hiç kullanmamış ve bunu yarı uykulu yapıyor olsa bile kurulum sakin kalır.",
  steps: [
    {
      title: "Bir oda açın",
      description:
        "Google ile giriş yapın ve özel bir oda oluşturun. Ekran mı paylaşacağınızı, bağlantı mı yapıştıracağınızı, yoksa dosya mı oynatacağınızı seçin.",
    },
    {
      title: "Bağlantıyı gönderin",
      description:
        "Sevgiliniz bağlantıyı o an önünde hangi tarayıcı varsa onda açar; bilgisayarda ya da telefonda. Hesap yok, kurulum yok, sizden talimat yok.",
    },
    {
      title: "İzleyin ve tepki verin",
      description:
        "Oynat'a basın. Oynatma o andan sonra ortak kalır; konuşmak için duraklatmak, sonra yeniden senkronlamak anlamına gelmez.",
    },
  ],

  faqs: [
    {
      question: "Çiftler internette birlikte nasıl film izler?",
      answer:
        "Özel bir oda açın, filmin ekrana nasıl geleceğini seçin ve bağlantıyı sevgilinize gönderin. Netflix ya da Disney+ gibi abonelikli bir serviste tarayıcı sekmenizi paylaşırsınız, çünkü hiçbiri gömülü oynatmaya izin vermez. YouTube ya da doğrudan bir bağlantıda ise adresi yapıştırırsınız ve oda iki tarafı kendiliğinden senkronlar.",
    },
    {
      question: "İki kişi için ücretsiz mi?",
      answer:
        "Evet. İki kişilik odalar ücretsiz plandadır; bu da uzak mesafe izlemelerinin çoğunu karşılar. Ücretli planlar katılımcı sınırını, izleme süresini, görüntülü aramaları ve ekran paylaşımı kalitesini artırır; bunların hiçbiri bir çift için şart değildir.",
    },
    {
      question: "Sevgilimin hesabı olması gerekir mi?",
      answer:
        "Hayır. Oda bağlantısını tarayıcıda açar ve içeridedir. Yalnızca odayı oluşturan kişi Google ile giriş yapar; böylece oda ona bağlı kalır.",
    },
    {
      question: "Netflix'i uzaktan birlikte izleyebilir miyiz?",
      answer:
        "Evet, ekran paylaşımıyla. Netflix'in kendi birlikte izleme özelliği yoktur ve gömülü oynatmayı engeller; bu yüzden hiçbir araç onu bir bağlantıdan çekemez. Yolu sekmenizi paylaşmaktır. Yine de ikinizin de kendi Netflix hesabı olmalıdır.",
    },
    {
      question: "Farklı saat dilimlerindeysek ne olur?",
      answer:
        "Saati ortasını bularak değil, sabahı daha erken başlayan kişiye göre seçin ve haftadan haftaya sabit tutun; böylece kimse yeniden hesap yapmaz. Zor bir gecede daha kısa bir film, iptal etmekten iyidir: birlikte geçen bir saat, hiç gerçekleşmeyen kusursuz bir üç saatlik plandan değerlidir.",
    },
    {
      question: "Birimiz duraklatırsa video senkron kalır mı?",
      answer:
        "Evet. Oda ikiniz için tek bir oynatma konumu tutar; duraklatma ikiniz için de duraklatmadır. Konuşmak için durabilir ya da ikinizin de kaçırdığı repliği geri sarabilirsiniz; yeniden aynı ana gelmek için kimsenin geri sayması gerekmez.",
    },
    {
      question: "İzlerken konuşabilir miyiz?",
      answer:
        "Her odada videonun yanında yazılı sohbet ve tepkiler vardır. Ücretli planlar odaya görüntülü ve sesli arama ekler; bazı çiftler buluşma gecesi için bunu tercih eder, bazıları ise filmin önüne geçtiğini düşünür.",
    },
    {
      question: "Bunu telefondan yapabilir miyiz?",
      answer:
        "Evet. Katılmak aynı bağlantıyla mobil tarayıcıdan çalışır; birinizin bilgisayarda, diğerinizin telefonla yatakta olması fark etmez. Oda sahipliği bilgisayarda daha kolaydır, özellikle ekran paylaşımında.",
    },
    {
      question: "Oda özel mi?",
      answer:
        "Evet. Odalar varsayılan olarak özeldir ve yalnızca bağlantıya sahip biri ulaşabilir. Herkese açık bir liste yoktur; hiçbir şey gezilemez.",
    },
    {
      question: "Ne izlemeliyiz?",
      answer:
        "Buna görüşme sırasında değil, öncesinde karar verin; akşamı yiyen şey karar vermektir. İkinizin birlikte ilerlediği bir dizi seçimi tamamen ortadan kaldırır; haftalık sabit gecelerin çoğunlukla film değil dizi olmasının nedeni de budur.",
    },
    {
      question: "Bu yalnızca çiftler için mi?",
      answer:
        "Hiç de değil. Bu sayfa çiftler düşünülerek yazıldı, ama aynı oda arkadaşlar, kardeşler ya da farklı yerlerden bir filmi paylaşan herkes için çalışır. Grup hali için birlikte izleme sayfasına bakabilirsiniz.",
    },
  ],

  exploreLinks: [
    {
      title: "Online birlikte izleme",
      description: "Gruplar, yeni bölümler ve rahat akşamlar için daha geniş kurulum.",
    },
    {
      title: "Birlikte oynanacak oyunlar",
      description: "Film bittiğinde aynı odada çalışan ücretsiz tarayıcı oyunları.",
    },
    {
      title: "Movmash blogu",
      description: "Buluşma gecesi fikirleri ve birlikte izleme rehberleri.",
    },
  ],
  finalTitle: "Bir sonraki uzak mesafe film gecesini başlatmak daha kolay olsun.",
  finalCopy: "Movmash odayı sade, özel ve sıcak tutar; böylece asıl olay buluşmanın kendisi olur.",
  finalSignals: ["Özel oda bağlantıları", "İki kişiye ücretsiz", "Tarayıcıdan kolay katılım"],
};

export const intentPages: Record<IntentLandingPageSlug, IntentLandingPageCopy> = {
  "watch-together": watchTogether,
  "long-distance-date-night": longDistanceDateNight,
};

export const gamesPage: GamesPageCopy = {
  metadataTitle: "İki Kişilik Online Oyunlar: Ücretsiz, İndirmeden",
  metadataDescription:
    "Arkadaşınızla tek bağlantıyla oynanan ücretsiz iki kişilik online oyunlar: XOX, Connect 4 ve ortak yapboz. Tarayıcıda, indirmeden, misafire kayıt yok.",
  breadcrumbHome: "Ana sayfa",
  breadcrumbName: "Oyunlar",
  listName: "Movmash'te arkadaşlarla oynanacak online oyunlar",
  kicker: "Oyunlar · Ücretsiz · İndirme yok",
  title: "Arkadaşınızla oynayacağınız online oyunlar,",
  titleAccent: "tek bağlantıyla.",
  intro:
    "Movmash odasının içinde çalışan iki kişilik online oyunlar ve ortak bir yapboz. Bağlantıyı gönderin, arkadaşınız herhangi bir tarayıcıda açsın ve oynayın. Uygulama yok, misafir için kayıt yok, ücret yok.",
  cta: "Bir oda aç ve oyna",
  videoLabel: "Movmash tanıtım videosu",
  cardLabel: "{name} oyununu Movmash'te oyna",
  liveTitle: "Üç oyun şimdi yayında,",
  liveTitleLink: "yenileri yolda",
  liveCopy: "Hepsi ücretsiz, tarayıcıda çalışıyor ve zaten içinde olduğunuz odada açılıyor.",
  overviewEyebrow: "Neden odanın içinde",
  overviewTitle: "İnternette birlikte oyun oynamak için aslında ne gerekir?",
  overview: [
    "Başka bir şehirdeki biriyle oyun oynamanın önündeki engel nadiren oyunun kendisidir; engel, etrafındaki her şeydir. Birinizin hesabı vardır, diğerinizin yoktur. Uygulama yanlış platformdadır. Bir indirme, sonra bir güncelleme, sonra bir giriş gelir; herkes nihayet içeri girdiğinde birlikte geçirecek yirmi dakikanız çoktan bitmiştir.",
    "Bu yük, pek çok uzak mesafe oyun gecesinin sessizce bitmesinin nedenidir. Movmash'teki oyunlar tersinden kuruldu: zaten içinde olduğunuz odada, tarayıcıda, bir şey izlemek için kullandığınız aynı bağlantıda çalışır. Kimse bir şey kurmaz ve misafirler hesap açmaz.",
    "Bu, izlemekle oynamak arasında seçim yapmadığınız anlamına da gelir. Oda ikisini de yapar. Bir şey açın, sıradaki bölüm yüklenirken bir el Connect 4 oynayın, filme dönün: aynı sekme, aynı kişiler; arada hiçbir şey kapanmaz ya da yeniden açılmaz.",
    "Üç oyun da ücretsiz plandadır. Ücretli planlar oda boyutunu, izleme süresini, görüntülü aramaları ve ekran paylaşımı kalitesini artırır; oyunları kilitlemez ve yeni oyun eklemez.",
  ],
  detailsTitle: "Her birine daha yakından bakın",
  detailsCopy: "Her oyunu oynamak gerçekte nasıl bir şey ve başlamadan önce bilmeye değer tek bir ipucu.",
  worthKnowing: "Bilmeye değer:",
  play: "{name} oyna",
  readGuide: "Rehberin tamamını oku",
  broader:
    "Daha geniş hali mi lazım? {guide} yazısı kurulumu baştan sona anlatıyor; {watch} sayfası ise aynı odanın video tarafını.",
  broaderWithoutGuide: "Aynı odanın video tarafı için {watch} sayfasına bakın.",
  broaderGuideLabel: "Arkadaşlarla oynanacak online oyunlar",
  broaderWatchLabel: "Birlikte izleyin",
  stepsTitle: "Bir oyunu başlatmak yaklaşık bir dakika sürer",
  steps: [
    {
      title: "Bir oda açın",
      description:
        "Google ile giriş yapın ve bir oda başlatın. İzlemekle oynamak arasında karar vermeniz gerekmez; oyunlar her iki durumda da aynı odadadır.",
    },
    {
      title: "Bağlantıyı gönderin",
      description:
        "Normalde nereden konuşuyorsanız oradan paylaşın. Bağlantıyı açan kişi telefonda ya da bilgisayarda, hesapsız ve kurulumsuz, tarayıcıdan katılır.",
    },
    {
      title: "Bir oyun seçin",
      description:
        "Odanın içindeki oyun alanını açın ve seçin. İkili oyunlar ikinci oyuncu girer girmez başlar; yapboz sekiz kişiye kadar alır.",
    },
  ],
  faqTitle: "Birlikte oynamakla ilgili sorular",
  faqs: [
    {
      question: "Oyunlar ücretsiz mi?",
      answer:
        "Evet, üçü de ücretsiz plandadır; deneme süresi ya da oyun başına ücret yoktur. Ücretli planlar oda boyutu, izleme süresi, görüntülü arama ve ekran paylaşımı kalitesi ekler; oyunların kilidini açmaz ve yeni oyun eklemez.",
    },
    {
      question: "Arkadaşlarımın oynamak için hesabı olması gerekir mi?",
      answer:
        "Hayır. Misafirler oda bağlantısıyla tarayıcıdan katılır ve hemen oynamaya başlar. Yalnızca odayı oluşturan kişi Google ile giriş yapar; böylece oda ona bağlı kalır.",
    },
    {
      question: "Bir şey indirmemiz gerekiyor mu?",
      answer:
        "Hayır. Her oyun masaüstünde ve mobilde tarayıcıda çalışır. Kurulacak, güncellenecek ya da yalnızca tek bir platformda çalışan hiçbir şey yoktur.",
    },
    {
      question: "Aynı anda kaç kişi oynayabilir?",
      answer:
        "XOX ve Connect 4 iki kişilik, sıra tabanlı oyunlardır. Yapboz ortak oynanır ve aynı tahtada aynı anda çalışan sekiz kişiye kadar alır.",
    },
    {
      question: "Aynı odada hem bir şey izleyip hem oynayabilir miyiz?",
      answer:
        "Evet; oyunları ayrı bir siteye değil odaya koymamızın nedeni de bu. Bölümler arasında ya da herkes gelene kadar oynayın, sonra hiçbir şeyi kapatmadan videoya dönün.",
    },
    {
      question: "Telefondan oynayabilir miyiz?",
      answer:
        "Evet. Oyunlar aynı oda bağlantısıyla mobil tarayıcıda çalışır; birinizin bilgisayarda, diğerinizin telefonda olması fark etmez.",
    },
    {
      question: "Sırada hangi oyunlar var?",
      answer:
        "Yenileri üzerinde çalışıyoruz. Buradaki üçü, bugün yayında ve sorunsuz olanlardır; henüz oynayamayacağınız bir yol haritası yerine gerçekten çalışanları listelemeyi tercih ediyoruz.",
    },
  ],
  games: {
    "tic-tac-toe": {
      shortBlurb: "Üç taş yan yana. Bir el yaklaşık bir dakika.",
      imageAlt: "Movmash odasında online XOX: X ve O işaretli 3'e 3 tahta",
      detail:
        "Herkesin zaten bildiği oyun; ısınma olarak işe yaramasının nedeni de tam olarak bu. Bir el yaklaşık bir dakika sürer; son kişi hâlâ bağlantıyı ararken boşluğu doldurur ve kimseye anlatmak gerekmez.",
      tip: "İlk siz oynuyorsanız köşeden açın. Rakibinize beraberliği koruyan tek bir cevap bırakır: orta. Bu yüzden dikkatsiz bir rakibe karşı diğer bütün ilk hamlelerden daha çok oyun kazandırır.",
    },
    "connect-4": {
      shortBlurb: "Pulları bırakın, dördü sıralayın. Uzun olan maç.",
      imageAlt: "Movmash'te çok oyunculu online Connect 4: kırmızı ve sarı pullu mavi tahta",
      detail:
        "İkili oyunların uzun olanı ve gerçekten derinliği olanı. Maçlar beş ila on dakika sürer; bu da onu iki bölüm arasındaki kısa boşluktan çok, bölümler arasındaki gerçek bir mola için uygun kılar.",
      tip: "Orta sütunu erken oynayın. Oradaki pullar diğer bütün sütunlardan daha fazla olası dörtlünün parçasıdır; ortayı tutmak rakibinizi maçın geri kalanında size cevap vermeye zorlar.",
    },
    jigsaw: {
      shortBlurb: "Tek resim, sekiz kişiye kadar birlikte çözülür.",
      imageAlt: "Movmash'te ortak online yapboz: solda dağınık parçalar, sağda kısmen çözülmüş tablo",
      detail:
        "Sakin olanı ve buradaki oyunlar içinde iki kişiyi aşan tek oyun. Zorluk seviyeleri ve resim seçeneğiyle aynı tahtada aynı anda sekiz kişiye kadar çalışılabilir; bu yüzden bir dakikada bitmek yerine uzun bir görüşmeyi doldurur.",
      tip: "Hep birlikte aynı yığını karıştırmak yerine tahtayı bölüşün. Bir kişi kenarlara bakarken diğerlerinin birer renk bölgesi alması, sekiz kişinin aynı parça için yarışmasından çok daha hızlıdır.",
    },
  },
};
