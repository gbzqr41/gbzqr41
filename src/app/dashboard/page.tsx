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
  Search,
  Bell,
  MessageCircle,
  Megaphone,
  LifeBuoy,
  Phone,
  Mail,
  MapPin,
  PhoneCall,
  Receipt,
  Star,
  RefreshCw,
  MoreVertical,
  Lock,
  X,
} from "lucide-react";
import clsx from "clsx";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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

type OrderStep = {
  label: string;
  time: string;
};

type LatestOrder = {
  code: string;
  platform: string;
  status: string;
  progress: number;
  steps: OrderStep[];
  customer: string;
  table?: string;
  channel: string;
  total: number;
  items: Array<{ name: string; qty: number }>;
  notes?: string;
  address?: string;
  phone?: string;
  eta?: string;
};

const latestOrders: LatestOrder[] = [
  {
    code: "SIP-6210",
    platform: "Getir",
    status: "Teslim Edildi",
    progress: 3,
    steps: [
      { label: "Sipariş Alındı", time: "21:05" },
      { label: "Hazırlanıyor", time: "21:08" },
      { label: "Kuryede", time: "21:22" },
      { label: "Teslim Edildi", time: "21:36" },
    ],
    customer: "Ayça Akar",
    channel: "Getir",
    total: 482.5,
    items: [
      { name: "Izgara Somon", qty: 1 },
      { name: "Cheesecake", qty: 1 },
      { name: "Limonata", qty: 2 },
    ],
    notes: "Tatlıyı fındıksız gönderin.",
    phone: "+90 555 123 45 67",
    eta: "Teslim edildi",
  },
  {
    code: "SIP-6211",
    platform: "Yemeksepeti",
    status: "Hazırlanıyor",
    progress: 1,
    steps: [
      { label: "Sipariş Alındı", time: "21:42" },
      { label: "Hazırlanıyor", time: "21:44" },
      { label: "Kuryede", time: "-" },
      { label: "Teslim Edildi", time: "-" },
    ],
    customer: "Mert Çelik",
    channel: "Yemeksepeti",
    total: 236.75,
    items: [
      { name: "GBZ Burger", qty: 2 },
      { name: "Patates Kızartması", qty: 2 },
      { name: "Kola", qty: 2 },
    ],
    notes: "Ekstra ketçap.",
    phone: "+90 531 456 23 11",
    eta: "Teslimat 20 dk",
  },
  {
    code: "SIP-6212",
    platform: "Trendyol Yemek",
    status: "Kuryede",
    progress: 2,
    steps: [
      { label: "Sipariş Alındı", time: "21:18" },
      { label: "Hazırlanıyor", time: "21:21" },
      { label: "Kuryede", time: "21:35" },
      { label: "Teslim Edilecek", time: "21:52" },
    ],
    customer: "Selin Kaya",
    channel: "Trendyol Yemek",
    total: 318.4,
    items: [
      { name: "Tavuk Fajita", qty: 1 },
      { name: "Nachos", qty: 1 },
      { name: "Soğuk Çay", qty: 2 },
    ],
    notes: "Acısız olsun.",
    phone: "+90 533 777 88 22",
    eta: "Teslimat 12 dk",
  },
  {
    code: "SIP-6213",
    platform: "Migros Yemek",
    status: "Hazırlanıyor",
    progress: 1,
    steps: [
      { label: "Sipariş Alındı", time: "21:30" },
      { label: "Hazırlanıyor", time: "21:33" },
      { label: "Kuryede", time: "-" },
      { label: "Teslim Edilecek", time: "-" },
    ],
    customer: "Berkay Demir",
    channel: "Migros Yemek",
    total: 198.2,
    items: [
      { name: "Kremalı Makarna", qty: 1 },
      { name: "Tiramisu", qty: 1 },
    ],
    phone: "+90 555 111 22 38",
    eta: "Teslimat 28 dk",
  },
  {
    code: "SIP-6214",
    platform: "QR Sipariş",
    status: "Teslim Edildi",
    progress: 3,
    steps: [
      { label: "Sipariş Alındı", time: "21:10" },
      { label: "Hazırlanıyor", time: "21:12" },
      { label: "Serviste", time: "21:19" },
      { label: "Teslim Edildi", time: "21:20" },
    ],
    customer: "Masa 12",
    table: "Masa 12",
    channel: "QR Masa",
    total: 156.0,
    items: [
      { name: "Mercimek Çorbası", qty: 2 },
      { name: "Izgara Köfte", qty: 2 },
    ],
    notes: "Çorba sıcak olsun.",
  },
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

const salesChannels = [
  { id: "yemeksepeti", label: "Yemeksepeti", color: "#1f2937", baseShare: 0.26 },
  { id: "getir", label: "Getir", color: "#374151", baseShare: 0.18 },
  { id: "trendyol", label: "Trendyol Yemek", color: "#4b5563", baseShare: 0.16 },
  { id: "migros", label: "Migros Yemek", color: "#6b7280", baseShare: 0.12 },
  { id: "qr", label: "QR Sipariş", color: "#9ca3af", baseShare: 0.15 },
  { id: "masa", label: "Masa Sipariş", color: "#d1d5db", baseShare: 0.13 },
] as const;

type SalesChannelId = (typeof salesChannels)[number]["id"];

const salesChannelMap = salesChannels.reduce<
  Record<SalesChannelId, (typeof salesChannels)[number]>
>((acc, channel) => {
  acc[channel.id] = channel;
  return acc;
}, {} as Record<SalesChannelId, (typeof salesChannels)[number]>);

const hourlySalesTotals = [
  420.75, 315.2, 280.4, 198.6, 165.3, 210.8, 340.5, 455.9, 612.35, 745.6, 890.2,
  1045.75, 1280.4, 1405.9, 1324.6, 1188.3, 1265.45, 1390.1, 1524.8, 1660.25,
  1745.6, 1885.35, 1720.15, 1488.7,
] as const;

const salesData: Array<{
  hour: string;
  total: number;
  breakdown: Array<{ id: SalesChannelId; amount: number }>;
}> = hourlySalesTotals.map((total, index) => {
  const hour = `${String(index).padStart(2, "0")}:00`;
  const variations = salesChannels.map((channel, channelIndex) => {
    const wave = Math.sin((index + channelIndex * 2.3) * 0.55);
    return Math.max(channel.baseShare + wave * 0.035, 0.06);
  });
  const variationSum = variations.reduce((sum, value) => sum + value, 0);
  const rawAmounts = variations.map((value) => (value / variationSum) * total);
  const roundedAmounts = rawAmounts.map((value) => Math.round(value * 100) / 100);
  const roundedSum = roundedAmounts.reduce((sum, value) => sum + value, 0);
  const diff = Math.round((total - roundedSum) * 100) / 100;
  if (diff !== 0) {
    roundedAmounts[0] = Math.round((roundedAmounts[0] + diff) * 100) / 100;
  }
  const breakdown = salesChannels.map((channel, idx) => ({
    id: channel.id,
    amount: roundedAmounts[idx],
  }));
  const totalRounded = Math.round(total * 100) / 100;
  return {
    hour,
    total: totalRounded,
    breakdown,
  };
});

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
  const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const [isLockScreenOpen, setLockScreenOpen] = useState(false);
  const [lockInput, setLockInput] = useState("");
  const [lockError, setLockError] = useState("");
  const [now, setNow] = useState(new Date());
  const welcomeRef = useRef<HTMLElement>(null);
  const latestOrdersRef = useRef<HTMLElement>(null);
  const [welcomeHeight, setWelcomeHeight] = useState<number>(400);
  const [activeOrder, setActiveOrder] = useState<LatestOrder | null>(null);
  const maxSales = useMemo(
    () => Math.max(...salesData.map((item) => item.total)),
    [],
  );
  const totalSales = useMemo(
    () =>
      salesData
        .reduce((sum, item) => sum + item.total, 0)
        .toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
    [],
  );
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

  useLayoutEffect(() => {
    const updateWelcomeHeight = () => {
      setWelcomeHeight(400);
    };

    updateWelcomeHeight();
    window.addEventListener("resize", updateWelcomeHeight);
    return () => window.removeEventListener("resize", updateWelcomeHeight);
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
                <section
                  className={styles.welcome}
                  ref={welcomeRef}
                  style={
                    welcomeHeight
                      ? {
                          height: `${welcomeHeight}px`,
                        }
                      : undefined
                  }
                >
                  <div className={styles.welcomeTop}>
                    <h1 className={styles.welcomeTitle}>
                      <span className={styles.welcomeIcon}>
                        <MoonStar size={22} />
                      </span>
                      İyi Geceler, Ezgi
                    </h1>
                    <button type="button" className={styles.profileEditButton}>
                      Profili Düzenle
                    </button>
                  </div>
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
                <section className={styles.statsCard}>
                  <div className={styles.statsGrid}>
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
                    {stats.map((stat, index) => (
                      <article
                        key={stat.label}
                        className={clsx(
                          styles.statCard,
                          styles.statCardDivider,
                          index % 2 === 1 && styles.statCardDividerLeft,
                        )}
                      >
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
                  </div>
                </section>
              </div>
              <aside className={styles.topAside}>
                <article className={styles.latestCard} ref={latestOrdersRef}>
                  <header>
                    <span>Son 5 Sipariş</span>
                  </header>
                  <div className={styles.latestList}>
                    {latestOrders.map((order) => (
                      <button
                        key={order.code}
                        type="button"
                        className={styles.latestItem}
                        onClick={() => setActiveOrder(order)}
                      >
                        <div className={styles.latestStepTrack}>
                          {order.steps.map((step, stepIndex) => (
                            <div key={step.label} className={styles.latestStepNode}>
                              <span
                                className={clsx(
                                  styles.latestStepPoint,
                                  stepIndex <= order.progress && styles.latestStepPointActive,
                                )}
                              />
                              {stepIndex < order.steps.length - 1 && (
                                <span className={styles.latestStepConnector} />
                              )}
                              <span className={styles.latestStepLabel}>{step.label}</span>
                              <span className={styles.latestStepTime}>{step.time}</span>
                            </div>
                          ))}
                        </div>
                        <div className={styles.latestBody}>
                          <div className={styles.latestBodyHeader}>
                            <span className={styles.latestIcon}>
                              <Receipt size={16} />
                            </span>
                            <div>
                              <strong>{order.code}</strong>
                              <p>{order.platform}</p>
                            </div>
                          </div>
                          <div className={styles.latestBodyFooter}>
                            <span className={styles.latestStatus}>{order.status}</span>
                            <span className={styles.latestTotal}>
                              {order.total.toLocaleString("tr-TR", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}{" "}
                              TL
                            </span>
                          </div>
                        </div>
                      </button>
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
            <section className={styles.salesCard}>
              <div className={styles.salesHeader}>
                <div>
                  <span className={styles.salesLabel}>24 Saatlik Satış</span>
                  <strong className={styles.salesTotal}>{totalSales} TL</strong>
                </div>
                <a className={styles.salesLink} href="/dashboard/reports">
                  Raporları görüntüle
                </a>
              </div>
              <div className={styles.salesChart}>
                {salesData.map((item, index) => {
                  const isPeak = item.total === maxSales;
                  return (
                    <div
                      key={item.hour}
                      className={clsx(
                        styles.salesBar,
                        index >= salesData.length - 4 && styles.salesBarReverseTooltip,
                      )}
                    >
                      <span className={styles.salesAmount}>
                        {item.total.toLocaleString("tr-TR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        TL
                      </span>
                      <div
                        className={clsx(
                          styles.salesBarStack,
                          isPeak && styles.salesBarStackPeak,
                        )}
                        style={{
                          height: `${Math.round((item.total / maxSales) * 100)}%`,
                        }}
                      >
                        {item.breakdown.map((segment) => {
                          const channel = salesChannelMap[segment.id];
                          if (!channel) return null;
                          const segmentHeight =
                            item.total > 0 ? (segment.amount / item.total) * 100 : 0;
                          return (
                            <div
                              key={segment.id}
                              className={styles.salesBarSegment}
                              style={{
                                height: `${segmentHeight}%`,
                                backgroundColor: channel.color,
                              }}
                            />
                          );
                        })}
                      </div>
                      <span className={styles.salesHour}>{item.hour}</span>
                      <div className={styles.salesDetails}>
                        {item.breakdown.map((segment) => {
                          const channel = salesChannelMap[segment.id];
                          return (
                            <div key={segment.id} className={styles.salesDetailRow}>
                              <span
                                className={styles.salesDetailDot}
                                style={{ backgroundColor: channel.color }}
                              />
                              <div>
                                <strong>{channel.label}</strong>
                                <p>
                                  {segment.amount.toLocaleString("tr-TR", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}{" "}
                                  TL
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.salesLegend}>
                {salesChannels.map((channel) => (
                  <div key={channel.id} className={styles.salesLegendItem}>
                    <span
                      className={styles.salesLegendDot}
                      style={{ backgroundColor: channel.color }}
                    />
                    <span>{channel.label}</span>
                  </div>
                ))}
              </div>
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
      {activeOrder && (
        <div
          className={styles.orderModalOverlay}
          onClick={() => setActiveOrder(null)}
          role="presentation"
        >
          <div
            className={styles.orderModal}
            onClick={(event) => event.stopPropagation()}
          >
            <header className={styles.orderModalHeader}>
              <div>
                <span className={styles.orderModalLabel}>Sipariş Özeti</span>
                <h2>{activeOrder.code}</h2>
              </div>
              <button
                type="button"
                className={styles.orderModalClose}
                onClick={() => setActiveOrder(null)}
                aria-label="Siparişi kapat"
              >
                <X size={16} />
              </button>
            </header>
            <div className={styles.orderModalBody}>
              <div className={styles.orderModalSection}>
                <span className={styles.orderModalSectionLabel}>Durum</span>
                <div className={styles.orderModalSteps}>
                  {activeOrder.steps.map((step, index) => (
                    <div key={step.label} className={styles.orderModalStep}>
                      <span
                        className={clsx(
                          styles.orderModalStepPoint,
                          index <= activeOrder.progress && styles.orderModalStepPointActive,
                        )}
                      />
                      {index < activeOrder.steps.length - 1 && (
                        <span className={styles.orderModalStepConnector} />
                      )}
                      <div>
                        <strong>{step.label}</strong>
                        <p>{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.orderModalSectionGrid}>
                <div>
                  <span className={styles.orderModalSectionLabel}>Müşteri</span>
                  <strong>{activeOrder.customer}</strong>
                  {activeOrder.phone && <p>{activeOrder.phone}</p>}
                </div>
                <div>
                  <span className={styles.orderModalSectionLabel}>Kanal</span>
                  <strong>{activeOrder.channel}</strong>
                  {activeOrder.table && <p>{activeOrder.table}</p>}
                  {activeOrder.eta && <p>{activeOrder.eta}</p>}
                </div>
                <div>
                  <span className={styles.orderModalSectionLabel}>Tutar</span>
                  <strong>
                    {activeOrder.total.toLocaleString("tr-TR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    TL
                  </strong>
                  {activeOrder.notes && <p>{activeOrder.notes}</p>}
                </div>
              </div>
              <div className={styles.orderModalSection}>
                <span className={styles.orderModalSectionLabel}>Ürünler</span>
                <ul className={styles.orderModalItems}>
                  {activeOrder.items.map((item) => (
                    <li key={item.name}>
                      <span>{item.name}</span>
                      <span>×{item.qty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <footer className={styles.orderModalFooter}>
              <button type="button">Yazdır</button>
              <button type="button">PDF Aktar</button>
              <button type="button">Excel Aktar</button>
              <button type="button">WhatsApp</button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

