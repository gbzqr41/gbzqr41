import Link from "next/link";
import styles from "./page.module.css";

const navLinks = [
  { label: "Özellikler", href: "#ozellikler" },
  { label: "Fiyatlar", href: "#fiyatlar" },
  { label: "SSS", href: "#sss" },
  { label: "Blog", href: "#blog" },
  { label: "İletişim", href: "#iletisim" },
];

const features = [
  {
    title: "Tek Panelden Sipariş Yönetimi",
    description:
      "Yemeksepeti, Getir, Trendyol Yemek ve Migros Yemek siparişlerini tek ekranda konsolide edin.",
  },
  {
    title: "QR Menü Tasarım Stüdyosu",
    description:
      "Dakikalar içinde markanıza özel, hızlı yüklenen ve çok dilli QR menüler oluşturun.",
  },
  {
    title: "Gerçek Zamanlı Entegrasyon",
    description:
      "Stok, mutfak ve kasa güncellemelerini anlık olarak tüm platformlara senkronlayın.",
  },
  {
    title: "Performans Analitiği",
    description:
      "Satış, kategori ve ürün bazlı raporlarla kararlarınızı veriye dayandırın.",
  },
  {
    title: "Çoklu Şube Yönetimi",
    description:
      "Farklı lokasyonları tek organizasyonda yönetin, yetkileri rol bazlı dağıtın.",
  },
  {
    title: "7/24 Destek ve Kurulum",
    description:
      "Uzman ekibimiz kurulumdan eğitimlere kadar tüm süreçte yanınızda.",
  },
];

const pricing = [
  {
    name: "Başlangıç",
    price: "₺0",
    frequency: "/ilk 7 gün",
    highlights: [
      "Sınırsız QR menü",
      "Tek platform entegrasyonu",
      "Temel analitik raporlar",
    ],
    cta: "Ücretsiz Deneyin",
  },
  {
    name: "Profesyonel",
    price: "₺2.499",
    frequency: "/ay",
    highlights: [
      "Tüm entegrasyonlar",
      "Gelişmiş mutfak paneli",
      "Günlük finans raporu",
      "Çoklu şube yönetimi",
    ],
    badge: "En Popüler",
    cta: "Planı Seç",
  },
  {
    name: "Kurumsal",
    price: "Özel",
    frequency: "fiyat",
    highlights: [
      "Sınırsız ekip üyesi",
      "Özel onboarding",
      "Özel entegrasyonlar",
      "Kurumsal SLA",
    ],
    cta: "Satış ile Görüşün",
  },
];

const faqs = [
  {
    question: "GBZQR entegrasyonları nasıl çalışır?",
    answer:
      "Platform hesaplarınızı bağlamanızın ardından siparişler otomatik olarak GBZQR paneline düşer, mutfak ve kasa modülleriyle senkron çalışır.",
  },
  {
    question: "7 günlük ücretsiz deneme süresinde kısıtlama var mı?",
    answer:
      "Hayır. Tüm özellikleri sınırsız şekilde deneyebilir, dilediğiniz an Profesyonel plana geçiş yapabilirsiniz.",
  },
  {
    question: "Subdomain kurulumu nasıl gerçekleşir?",
    answer:
      "Kayıt sürecinin üçüncü adımında işletme adınızı girersiniz ve gbzqr.com/isim formatında saniyeler içinde yayınlarız.",
  },
  {
    question: "Destek hizmetlerini hangi kanallardan alabilirim?",
    answer:
      "Canlı chat, e-posta ve dedike müşteri temsilcimizle 7/24 destek sağlıyoruz.",
  },
];

const blogPosts = [
  {
    category: "ÜRÜN GÜNCELLEMESİ",
    title: "Yeni mutfak ekranı ile hazırlık süreçlerinizi hızlandırın",
    description:
      "Sipariş özetleri, hazırlık adımları ve statü yönetimi tek ekranda. Mutfak ekipleri için özel tasarlandı.",
  },
  {
    category: "OPERASYON",
    title: "Fiyat güncellemelerini tüm platformlarda eşleştirin",
    description:
      "Merkezden fiyat, stok ve kategori yönetimi ile manuel iş yükünü %70 azaltın.",
  },
  {
    category: "PAYLAŞIM",
    title: "GBZQR müşterilerinin büyüme hikayeleri",
    description:
      "Aylık sipariş hacmini ikiye katlayan işletmelerin gerçek deneyimlerini okuyun.",
  },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.infoBar}>
        Yemeksepeti, Getir, Trendyol Yemek, Migros Yemek entegrasyonu – 7 gün
        ücretsiz dene
      </div>
      <header className={styles.navbar} aria-label="Ana navigasyon">
        <div className={`container ${styles.navContent}`}>
          <div className={styles.logo}>GBZQR</div>
          <nav className={styles.navLinks}>
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className={styles.navActions}>
            <Link className={styles.ctaGhost} href="#iletisim">
              7 Gün Ücretsiz Dene
            </Link>
            <Link className={styles.ctaPrimary} href="/login">
              Giriş Yap
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroIntro}>
              <span className={styles.heroBadge}>
                Entegrasyonlu QR Menü Platformu
              </span>
              <h1 className={styles.heroTitle}>
                Tek panelde tüm sipariş kanallarını yönetin, müşteriye premium
                QR deneyimi sunun.
              </h1>
              <p className={styles.heroDescription}>
                GBZQR, restoranınızın dijital operasyonunu uçtan uca
                yönetmenizi sağlar. Kayıt olup 7 gün boyunca tüm entegrasyonları
                ücretsiz deneyin.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.ctaPrimary} href="#iletisim">
                  7 Gün Ücretsiz Dene
                </Link>
                <Link className={styles.ctaGhost} href="#ozellikler">
                  Özellikleri Keşfet
                </Link>
              </div>
              <div className={styles.heroMeta}>
                <span>• 500+ restoran tarafından güveniliyor</span>
                <span>• Ortalama 2 haftada canlı yayın</span>
              </div>
            </div>
            <div className={styles.heroVisual} aria-hidden="true">
              <div className={styles.heroCard}>
                <div className={styles.heroCardHeader}>
                  <strong>Canlı Sipariş Akışı</strong>
                  <span>Bugün</span>
                </div>
                <div className={styles.heroStatList}>
                  <div className={styles.heroStat}>
                    <span>Yemeksepeti</span>
                    <strong>47 sipariş</strong>
                  </div>
                  <div className={styles.heroStat}>
                    <span>Getir Yemek</span>
                    <strong>36 sipariş</strong>
                  </div>
                  <div className={styles.heroStat}>
                    <span>Migros Yemek</span>
                    <strong>22 sipariş</strong>
                  </div>
                  <div className={styles.heroStat}>
                    <span>QR Menü</span>
                    <strong>18 masa</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="ozellikler" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Modern restoran deneyimi</h2>
              <p className={styles.sectionDescription}>
                Tüm sipariş kanallarınızı merkezi bir sistemde birleştirirken
                misafirleriniz için hızlı, etkileyici ve hatasız bir deneyim
                oluşturun.
              </p>
            </div>
            <div className={styles.featuresGrid}>
              {features.map((feature) => (
                <article key={feature.title} className={styles.featureCard}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="fiyatlar" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Her ölçeğe uygun şeffaf fiyatlandırma
              </h2>
              <p className={styles.sectionDescription}>
                İşletmenizin ihtiyaçlarına göre aylık veya yıllık planlar.
                Dilerseniz özel paketler için bizimle iletişime geçin.
              </p>
            </div>
            <div className={styles.pricingGrid}>
              {pricing.map((plan) => (
                <article key={plan.name} className={styles.pricingCard}>
                  {plan.badge && (
                    <span className={styles.pricingBadge}>{plan.badge}</span>
                  )}
                  <header>
                    <h3>{plan.name}</h3>
                    <p className={styles.pricingValue}>
                      {plan.price} <span>{plan.frequency}</span>
                    </p>
                  </header>
                  <div className={styles.pricingList}>
                    {plan.highlights.map((highlight) => (
                      <span key={highlight}>• {highlight}</span>
                    ))}
                  </div>
                  <Link className={styles.ctaPrimary} href="#iletisim">
                    {plan.cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sss" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                En sık sorulan sorulara hızlı yanıtlar
              </h2>
              <p className={styles.sectionDescription}>
                Platform hakkında merak ettiğiniz tüm detayları destek ekibimiz
                anında yanıtlamaya hazır.
              </p>
            </div>
            <div className={styles.faqList}>
              {faqs.map((item) => (
                <details key={item.question} className={styles.faqItem}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="blog" className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Blogdan öne çıkanlar</h2>
              <p className={styles.sectionDescription}>
                Güncel ürün gelişmeleri, restoran yönetimi ipuçları ve müşteri
                başarı hikayeleri.
              </p>
            </div>
            <div className={styles.blogGrid}>
              {blogPosts.map((post) => (
                <article key={post.title} className={styles.blogCard}>
                  <span className={styles.blogMeta}>{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <Link className={styles.ctaGhost} href="/blog">
                    Yazıyı oku
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="iletisim" className={styles.section}>
          <div className="container">
            <div className={styles.contactCard}>
              <div>
                <h2 className={styles.sectionTitle}>Hızlıca başlayalım</h2>
                <p className={styles.sectionDescription}>
                  15 dakikalık demo ile ihtiyaçlarınızı anlayalım, işletmenize
                  özel onboarding planı oluşturalım.
                </p>
              </div>
              <form
                className={styles.contactForm}
                action="https://formsubmit.co/hello@gbzqr.com"
                method="POST"
              >
                <div className={styles.formRow}>
                  <input
                    className={styles.inputField}
                    type="text"
                    name="company"
                    placeholder="İşletme adı"
                    required
                    aria-label="İşletme adı"
                  />
                  <input
                    className={styles.inputField}
                    type="text"
                    name="name"
                    placeholder="Adınız Soyadınız"
                    required
                    aria-label="Adınız Soyadınız"
                  />
                </div>
                <div className={styles.formRow}>
                  <input
                    className={styles.inputField}
                    type="email"
                    name="email"
                    placeholder="E-posta"
                    required
                    aria-label="E-posta adresiniz"
                  />
                  <input
                    className={styles.inputField}
                    type="tel"
                    name="phone"
                    placeholder="Telefon"
                    aria-label="Telefon numaranız"
                  />
                </div>
                <textarea
                  className={styles.textArea}
                  name="message"
                  placeholder="İhtiyaçlarınızı anlatın..."
                  aria-label="Mesajınız"
                />
                <button className={styles.ctaPrimary} type="submit">
                  Demo Talebi Gönder
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} GBZQR. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}

