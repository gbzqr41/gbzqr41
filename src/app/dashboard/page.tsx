"use client";

import {
  LayoutDashboard,
  ClipboardList,
  ChefHat,
  QrCode,
  BarChart,
  FileText,
  Boxes,
  Settings,
  User,
  Users,
  Sun,
  Moon,
  PanelLeft,
  CalendarDays,
  MoonStar,
  EyeOff,
  ArrowUpRight,
  Search,
  Bell,
  MessageCircle,
  Megaphone,
  LifeBuoy,
  Phone,
  Mail,
  MapPin,
  Check,
  PhoneCall,
  Receipt,
  Star,
  RefreshCw,
  MoreVertical,
  Lock,
} from "lucide-react";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";
import { useCallback } from "react";

const sidebarItems = [
  { label: "Pano", icon: LayoutDashboard, active: true, href: "/dashboard" },
  { label: "Siparişler", icon: ClipboardList, href: "/dashboard/orders" },
  { label: "Mutfak", icon: ChefHat, href: "/dashboard/kitchen" },
  { label: "QR Menü", icon: QrCode, href: "/dashboard/qr-menu" },
  { label: "Raporlar", icon: BarChart, href: "/dashboard/reports" },
  { label: "Ön Muhasebe", icon: FileText, href: "/dashboard/accounting" },
  { label: "Stok", icon: Boxes, tag: "Çok yakında" },
  { label: "Call All", icon: PhoneCall, tag: "Çok yakında" },
  { label: "Rezervasyon", icon: CalendarDays, href: "/dashboard/reservation" },
  { label: "Garson", icon: Users, href: "/dashboard/garson" },
  { label: "Ayarlar", icon: Settings, href: "/dashboard/settings" },
  { label: "Profil", icon: User, href: "/dashboard/profile" },
];

const stats = [
  {
    label: "Toplam Sipariş",
    value: "1.284",
    change: "+12% geçen aya göre",
    icon: ClipboardList,
  },
  {
    label: "Bugünkü Sipariş",
    value: "86",
    change: "+18% dünden",
    icon: LayoutDashboard,
  },
  {
    label: "En Fazla Sipariş Alınan Masa",
    value: "Masa 12",
    change: "Akşam seansı",
    icon: BarChart,
  },
  {
    label: "Bekleyen Siparişler",
    value: "9",
    change: "Hazırlanıyor",
    icon: ChefHat,
  },
];

const orderRanges = {
  daily: {
    label: "Günlük",
    value: "86",
    subtitle: "Bugünkü sipariş adedi",
    growth: "+%2 artış",
  },
  weekly: {
    label: "Haftalık",
    value: "512",
    subtitle: "Bu haftaki sipariş adedi",
    growth: "+%4 artış",
  },
  monthly: {
    label: "Aylık",
    value: "2.146",
    subtitle: "Bu ayki sipariş adedi",
    growth: "+%9 artış",
  },
  yearly: {
    label: "Yıllık",
    value: "24.380",
    subtitle: "Bu yılki sipariş adedi",
    growth: "+%18 artış",
  },
} as const;

type OrderRangeKey = keyof typeof orderRanges;

const featureCards = [
  {
    title: "Connect your Google Business Profile",
    description: "Easily import your business details. Keep your info up-to-date.",
    accent: "#9e8bff",
  },
  {
    title: "Ödemeyi Aktifleştir",
    description: "Ödeme entegrasyonunuzu sorunsuz kurun ve ödemeleri kabul etmeye başlayın.",
    accent: "#ff647c",
  },
  {
    title: "Rezervasyon Alın",
    description: "Online rezervasyonları yönetin ve masa yönetimini optimize edin.",
    accent: "#a283ff",
  },
  {
    title: "Mekan Logonu Ekle",
    description: "Menünüzü yansıtmak için logo ekleyin.",
    accent: "#31b6a1",
  },
  {
    title: "Tasarımını Kişiselleştir",
    description: "Kişiselleştirilmiş menü tasarımlarıyla işletme kimliğinizi vurgulayın.",
    accent: "#ff8570",
  },
];

const customers = [
  {
    name: "Ayça Akar",
    role: "Müşteri",
    avatar: "https://i.pravatar.cc/100?img=15",
  },
  {
    name: "Mehmet Yıldız",
    role: "Müşteri",
    avatar: "https://i.pravatar.cc/100?img=16",
  },
];

const orders = [
  {
    code: "SIP-1034",
    status: "Hazırlanıyor",
  },
  {
    code: "SIP-2042",
    status: "Teslim Edildi",
  },
  {
    code: "SIP-3088",
    status: "Hazırlanıyor",
  },
  {
    code: "SIP-4120",
    status: "Hazırlanıyor",
  },
  {
    code: "SIP-5093",
    status: "Teslim Edildi",
  },
];

const latestOrders = [
  { code: "SIP-6210", platform: "Getir", status: "Teslim Edildi" },
  { code: "SIP-6211", platform: "Yemeksepeti", status: "Hazırlanıyor" },
  { code: "SIP-6212", platform: "Trendyol", status: "Yolda" },
  { code: "SIP-6213", platform: "Migros", status: "Hazırlanıyor" },
  { code: "SIP-6214", platform: "Telefon", status: "Teslim Edildi" },
];

const latestFeedback = [
  { name: "Selin Kaya", message: "Servis çok hızlıydı, teşekkürler!" },
  { name: "Baran Usta", message: "Tatlılar harikaydı." },
  { name: "Ece Arı", message: "QR menü üzerinden sipariş çok kolaydı." },
  { name: "Gökhan Demir", message: "Masa rezervasyonu sorunsuzdu." },
  { name: "Seda Yıldız", message: "Garson ekibi çok ilgiliydi." },
];

const notifications = [
  { title: "Yeni sipariş", detail: "SIP-6215 • Getir", time: "2 dk önce" },
  { title: "Rezervasyon onaylandı", detail: "Masa 8 • 21:00", time: "15 dk önce" },
  { title: "Stok hatırlatıcısı", detail: "Mozzarella stoğu düşüyor", time: "1 saat önce" },
];

const messages = [
  { name: "Ayça Akar", snippet: "Şefin özel menüsünü çok beğendik", time: "3 dk önce" },
  { name: "Murat Yılmaz", snippet: "Öğle menüsü hakkında bilgi alabilir miyim?", time: "18 dk önce" },
  { name: "Derya Koç", snippet: "Rezervasyon değişikliği yapmak istiyorum", time: "32 dk önce" },
  { name: "Arda Keskin", snippet: "Ödeme slipini mail atabilir misiniz?", time: "1 saat önce" },
];

const announcements = [
  { title: "Yeni rapor hazır", body: "Haziran performans raporu oluşturuldu." },
  { title: "Varlık güncellemesi", body: "Mutfak POS entegrasyonu başarıyla tamamlandı." },
];

export default function DashboardPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [orderRange, setOrderRange] = useState<OrderRangeKey>("daily");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setSearchOpen] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [isSupportOpen, setSupportOpen] = useState(false);
  const supportRef = useRef<HTMLDivElement>(null);
  const [isAnnouncementOpen, setAnnouncementOpen] = useState(false);
  const announcementRef = useRef<HTMLDivElement>(null);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isMessageOpen, setMessageOpen] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);
  const [isFeatureStripVisible, setFeatureStripVisible] = useState(true);
  const [featureList, setFeatureList] = useState(() =>
    featureCards.map((card, index) => ({
      ...card,
      id: index,
      completed: index % 2 === 0,
    })),
  );
  const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const [isLockScreenOpen, setLockScreenOpen] = useState(false);
  const [lockInput, setLockInput] = useState("");
  const [lockError, setLockError] = useState("");
  const [now, setNow] = useState(new Date());
  const initials = useMemo(() => {
    const name = "Ezgi Kaplan";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "f") return;
      const target = event.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      event.preventDefault();
      searchInputRef.current?.focus();
      setSearchOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
      if (supportRef.current && !supportRef.current.contains(event.target as Node)) {
        setSupportOpen(false);
      }
      if (announcementRef.current && !announcementRef.current.contains(event.target as Node)) {
        setAnnouncementOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
      if (messageRef.current && !messageRef.current.contains(event.target as Node)) {
        setMessageOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleSearchOutside = (event: MouseEvent) => {
      if (!searchWrapperRef.current) return;
      if (!searchWrapperRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleSearchOutside);
    return () => document.removeEventListener("mousedown", handleSearchOutside);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredCustomers = searchTerm
    ? customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const filteredOrders = searchTerm
    ? orders.filter((order) =>
        order.code.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const dismissFeature = (id: number) => {
    setFeatureList((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => undefined);
    } else {
      document.exitFullscreen().catch(() => undefined);
    }
  }, []);

  const handleLockSubmit = () => {
    if (lockInput === "123456") {
      setLockScreenOpen(false);
      setLockInput("");
      setLockError("");
    } else {
      setLockError("Şifre hatalı, tekrar deneyin.");
    }
  };

  return (
    <>
      <div
        className={styles.sidebarBackdrop}
        data-open={isSidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />
      <div
        className={clsx(styles.page, isSidebarCollapsed && styles.pageCollapsed)}
        data-theme={theme}
      >
        <aside
          className={clsx(
            styles.sidebar,
            isSidebarCollapsed && styles.sidebarCollapsed,
          )}
          data-open={isSidebarOpen}
        >
          <div className={styles.sidebarHeader}>
            <div className={styles.logo}>GBZQR</div>
            <button
              type="button"
              className={styles.toggleSidebar}
              onClick={() => setSidebarCollapsed((prev) => !prev)}
              aria-label="Menüyü daralt"
            >
              <PanelLeft className={styles.toggleSidebarIcon} size={16} />
            </button>
          </div>
          <nav className={styles.navList}>
            {sidebarItems.map((item) => (
              <a
                key={item.label}
                className={clsx(
                  styles.navItem,
                  item.active && styles.navItemActive,
                )}
                href={item.href ?? "#"}
              >
                <item.icon size={18} />
                <span className={styles.navLabel}>{item.label}</span>
                {item.tag && <span className={styles.navTag}>{item.tag}</span>}
              </a>
            ))}
          </nav>
        </aside>
        <section className={styles.content}>
          <header className={styles.header}>
            <button
              className={styles.sidebarToggle}
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Menüyü aç"
            >
              <LayoutDashboard size={20} />
            </button>
            <div className={styles.headerSearchWrapper} ref={searchWrapperRef}>
              <div className={styles.headerSearch}>
                <Search size={16} className={styles.headerSearchIcon} />
                <input
                  type="search"
                  placeholder="Panelde ara"
                  ref={searchInputRef}
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onFocus={() => setSearchOpen(true)}
                />
                <div className={styles.headerSearchKeys}>
                  <span className={styles.keycap}>⌘</span>
                  <span className={styles.keycap}>Ctrl</span>
                  <span className={styles.keycap}>F</span>
                </div>
              </div>
              {isSearchOpen && searchTerm && (
                <div className={styles.searchResults}>
                  {filteredCustomers.length > 0 && (
                    <div className={styles.searchSection}>
                      <span className={styles.searchSectionLabel}>Müşteriler</span>
                      {filteredCustomers.map((customer) => (
                        <div key={customer.name} className={styles.searchCustomer}>
                          <img src={customer.avatar} alt={customer.name} />
                          <div>
                            <strong>{customer.name}</strong>
                            <p>{customer.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {filteredOrders.length > 0 && (
                    <div className={styles.searchSection}>
                      <span className={styles.searchSectionLabel}>Siparişler</span>
                      {filteredOrders.map((order) => (
                        <div key={order.code} className={styles.searchOrder}>
                          <div>
                            <strong>{order.code}</strong>
                            <p>{order.status} sipariş</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {filteredCustomers.length === 0 && filteredOrders.length === 0 && (
                    <div className={styles.searchEmpty}>Sonuç bulunamadı.</div>
                  )}
                </div>
              )}
            </div>
            <div className={styles.headerActions}>
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => window.location.reload()}
                title="Sayfayı Yenile"
              >
                <RefreshCw size={18} />
              </button>
              <div className={styles.supportWrapper} ref={supportRef}>
                <button
                  type="button"
                  className={styles.supportButton}
                  onClick={() => setSupportOpen((prev) => !prev)}
                >
                  <LifeBuoy size={18} />
                  Destek
                </button>
                {isSupportOpen && (
                  <div className={styles.supportMenu}>
                    <span>Telefon</span>
                    <strong>0 (212) 555 00 99</strong>
                    <span>E-posta</span>
                    <strong>destek@gbzqr.com</strong>
                    <span>Adres</span>
                    <strong>Refik Kadın Sk. No:12, İstanbul</strong>
                  </div>
                )}
              </div>
              <div className={styles.announcementWrapper} ref={announcementRef}>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => setAnnouncementOpen((prev) => !prev)}
                >
                  <Megaphone size={18} />
                </button>
                {isAnnouncementOpen && (
                  <div className={styles.dropdownPanel}>
                    <header>
                      <strong>Duyurular</strong>
                    </header>
                    <div className={styles.dropdownList}>
                      {announcements.map((item) => (
                        <div key={item.title} className={styles.dropdownItem}>
                          <h4>{item.title}</h4>
                          <p>{item.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.announcementWrapper} ref={notificationRef}>
                <button
                  type="button"
                  className={clsx(styles.iconButton, styles.iconButtonDot)}
                  onClick={() => setNotificationOpen((prev) => !prev)}
                >
                  <Bell size={18} />
                </button>
                {isNotificationOpen && (
                  <div className={styles.dropdownPanel}>
                    <header>
                      <strong>Bildirimler</strong>
                    </header>
                    <div className={styles.dropdownList}>
                      {notifications.map((item) => (
                        <div key={item.title} className={styles.dropdownItem}>
                          <h4>{item.title}</h4>
                          <p>{item.detail}</p>
                          <span>{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.announcementWrapper} ref={messageRef}>
                <button
                  type="button"
                  className={clsx(styles.iconButton, styles.iconButtonDot)}
                  onClick={() => setMessageOpen((prev) => !prev)}
                >
                  <MessageCircle size={18} />
                </button>
                {isMessageOpen && (
                  <div className={styles.dropdownPanel}>
                    <header>
                      <strong>Mesajlar</strong>
                    </header>
                    <div className={styles.dropdownList}>
                      {messages.map((item) => (
                        <div key={item.name} className={styles.dropdownItem}>
                          <h4>{item.name}</h4>
                          <p>{item.snippet}</p>
                          <span>{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.moreWrapper} ref={moreMenuRef}>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={() => setMoreMenuOpen((prev) => !prev)}
                  title="Daha fazla"
                >
                  <MoreVertical size={18} />
                </button>
                {isMoreMenuOpen && (
                  <div className={styles.dropdownPanel}>
                    <div className={styles.dropdownList}>
                      <button
                        type="button"
                        className={styles.dropdownAction}
                        onClick={() => {
                          toggleFullscreen();
                          setMoreMenuOpen(false);
                        }}
                      >
                        Tam ekran
                      </button>
                      <button
                        type="button"
                        className={styles.dropdownAction}
                        onClick={() => {
                          setLockScreenOpen(true);
                          setMoreMenuOpen(false);
                        }}
                      >
                        Ekran kilidi
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.profileWrapper} ref={profileMenuRef}>
              <button
                type="button"
                className={styles.profile}
                onClick={() => setProfileMenuOpen((prev) => !prev)}
              >
                <div className={styles.avatar}>{initials}</div>
                <div className={styles.profileInfo}>
                  <strong>Ezgi Kaplan</strong>
                  <p className={styles.profileMeta}>Yönetici</p>
                  <span className={styles.profileBadge}>Premium+</span>
                </div>
              </button>
              {isProfileMenuOpen && (
                <div className={styles.profileMenu}>
                  <button type="button">Profil</button>
                  <button type="button">Ayarlar</button>
                  <button
                    type="button"
                    className={clsx(
                      styles.themeToggle,
                      theme === "dark" && styles.themeToggleDark,
                    )}
                    onClick={() =>
                      setTheme((prev) => (prev === "light" ? "dark" : "light"))
                    }
                  >
                    <span className={styles.themeIconWrap}>
                      <Sun size={14} />
                      <Moon size={14} />
                    </span>
                    {theme === "light" ? "Karanlık Mod" : "Aydınlık Mod"}
                  </button>
                  <button type="button">Çıkış</button>
                </div>
              )}
            </div>
          </header>
          <main className={styles.main}>
            <section className={styles.topRow}>
              <div className={styles.topMain}>
                <section className={styles.welcome}>
                  <h1 className={styles.welcomeTitle}>
                    <span className={styles.welcomeIcon}>
                      <MoonStar size={22} />
                    </span>
                    İyi Geceler, Ezgi
                  </h1>
                  <p>
                    Bugün restoranın performansı güçlü görünüyor. 4 bekleyen siparişi
                    takip etmeyi unutma.
                  </p>
                  <time className={styles.welcomeTime} dateTime={now.toISOString()}>
                    {now.toLocaleTimeString("tr-TR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                    {" • "}
                    {now.toLocaleDateString("tr-TR", {
                      weekday: "long",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </section>
                {isFeatureStripVisible && featureList.length > 0 && (
                  <div className={styles.featureStrip}>
                    <div className={styles.featureStripHeader}>
                      <span>DAHA İYİ BİR DENEYİM İÇİN TÜM ÖZELLİKLERİ KEŞFET</span>
                      <button
                        type="button"
                        className={styles.featureStripHide}
                        onClick={() => setFeatureStripVisible(false)}
                      >
                        <EyeOff size={16} /> Gizle
                      </button>
                    </div>
                    <div className={styles.featureStripGrid}>
                      {featureList.map((card) => (
                        <article
                          key={card.id}
                          className={styles.featureCard}
                          onClick={() => dismissFeature(card.id)}
                        >
                          <div className={styles.featureHeader}>
                            <span
                              className={clsx(
                                styles.featureCheck,
                                card.completed && styles.featureCheckActive,
                              )}
                            >
                              {card.completed && <Check size={12} />}
                            </span>
                            <h3>{card.title}</h3>
                          </div>
                          <p className={styles.featureText}>
                            {card.description}
                            <ArrowUpRight size={14} />
                          </p>
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <aside className={styles.topAside}>
                <article className={styles.latestCard}>
                  <header>
                    <span>Son 5 Sipariş</span>
                  </header>
                  <div className={styles.latestList}>
                    {latestOrders.map((item) => (
                      <div key={item.code} className={styles.latestItem}>
                        <span className={styles.latestIcon}>
                          <Receipt size={16} />
                        </span>
                        <div className={styles.latestBody}>
                          <strong>{item.code}</strong>
                          <p>{item.platform}</p>
                        </div>
                        <span>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </article>
                <article className={styles.latestCard}>
                  <header>
                    <span>Son 5 Geri Bildirim</span>
                  </header>
                  <div className={styles.latestList}>
                    {latestFeedback.map((item) => (
                      <div key={item.name} className={styles.latestItem}>
                        <span className={styles.latestIcon}>
                          <Star size={16} />
                        </span>
                        <div className={styles.latestBody}>
                          <strong>{item.name}</strong>
                          <p>{item.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </aside>
            </section>
            <section className={styles.statsGrid}>
              <article className={styles.highlightCard}>
                <div className={styles.highlightHeader}>
                  <div className={styles.highlightTitle}>
                    <span>Sipariş</span>
                    <span className={styles.highlightValue}>
                      {orderRanges[orderRange].value}
                    </span>
                  </div>
                  <div className={styles.highlightButtons}>
                    {(Object.keys(orderRanges) as OrderRangeKey[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        className={clsx(
                          styles.rangeButton,
                          orderRange === key && styles.rangeButtonActive,
                        )}
                        onClick={() => setOrderRange(key)}
                      >
                        {orderRanges[key].label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.highlightFooter}>
                  <span>{orderRanges[orderRange].subtitle}</span>
                  <strong>{orderRanges[orderRange].growth}</strong>
                </div>
              </article>
              {stats.map((stat) => (
                <article key={stat.label} className={styles.statCard}>
                  <div className={styles.statTop}>
                    <span className={styles.statIcon}>
                      <stat.icon size={20} />
                    </span>
                    <div className={styles.statMeta}>
                      <h3 className={styles.statValue}>{stat.value}</h3>
                      <p className={styles.statLabel}>{stat.label}</p>
                    </div>
                  </div>
                  <div className={styles.statFooter}>{stat.change}</div>
                </article>
              ))}
            </section>
          </main>
        </section>
      </div>
      {isLockScreenOpen && (
        <div className={styles.lockOverlay}>
          <div className={styles.lockCard}>
            <div className={styles.lockIcon}>
              <Lock size={24} />
            </div>
            <h2>Ekran kilitlendi</h2>
            <p>Devam etmek için şifreyi girin.</p>
            <input
              type="password"
              value={lockInput}
              onChange={(event) => {
                setLockInput(event.target.value);
                setLockError("");
              }}
              placeholder="Şifre"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleLockSubmit();
                }
              }}
            />
            {lockError && <span className={styles.lockError}>{lockError}</span>}
            <button type="button" onClick={handleLockSubmit}>
              Kilidi Aç
            </button>
          </div>
        </div>
      )}
    </>
  );
}

