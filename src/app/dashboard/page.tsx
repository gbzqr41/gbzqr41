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
  Plus,
  Grid3x3,
  Check,
} from "lucide-react";
import clsx from "clsx";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";
import { useCallback } from "react";
import { Icon } from "@iconify/react";

const sidebarItems: Array<{
  label: string;
  icon: string | React.ComponentType<any>;
  active?: boolean;
  href?: string;
  useIconify?: boolean;
}> = [
  { label: "Pano", icon: "mdi:view-dashboard", active: true, href: "/dashboard", useIconify: true },
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

const stepIcons: Record<string, typeof ClipboardList> = {
  "Sipariş Alındı": ClipboardList,
  Hazırlanıyor: ChefHat,
  Kuryede: Boxes,
  Serviste: Users,
  "Teslim Edildi": Star,
  "Teslim Edilecek": CalendarDays,
  "Teslim edildi": Star,
};

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
  const [isRestaurantPopupOpen, setRestaurantPopupOpen] = useState(false);
  const restaurantPopupRef = useRef<HTMLDivElement>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState("Örnek Et");
  const [activeReservation, setActiveReservation] = useState<any>(null);
  const [hoveredTablePercentage, setHoveredTablePercentage] = useState<number | null>(null);
  const [isLockScreenOpen, setLockScreenOpen] = useState(false);
  const [lockInput, setLockInput] = useState("");
  const [lockError, setLockError] = useState("");
  const [now, setNow] = useState(new Date());
  const welcomeRef = useRef<HTMLElement>(null);
  const latestOrdersRef = useRef<HTMLElement>(null);
  const [welcomeHeight, setWelcomeHeight] = useState<number>(360);
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

  const greeting = useMemo(() => {
    const hour = now.getHours();
    if (hour >= 0 && hour < 12) return "Günaydın";
    if (hour >= 12 && hour < 18) return "İyi günler";
    if (hour >= 18 && hour < 21) return "İyi akşamlar";
    return "İyi geceler";
  }, [now]);

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
      if (restaurantPopupRef.current && !restaurantPopupRef.current.contains(event.target as Node)) {
        setRestaurantPopupOpen(false);
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
      setWelcomeHeight(360);
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
          <div className={styles.restaurantSection} ref={restaurantPopupRef}>
            <button
              type="button"
              className={styles.restaurantButton}
              onClick={() => setRestaurantPopupOpen((prev) => !prev)}
            >
              <span className={styles.restaurantName}>{selectedRestaurant}</span>
            </button>
            {isRestaurantPopupOpen && (
              <div className={styles.restaurantPopup}>
                <button type="button" className={styles.restaurantAddButton}>
                  Ekle
                </button>
                <div className={styles.restaurantList}>
                  <div 
                    className={clsx(styles.restaurantItem, selectedRestaurant === "Örnek Et" && styles.restaurantItemSelected)}
                    onClick={() => setSelectedRestaurant("Örnek Et")}
                  >
                    Örnek Et
                    {selectedRestaurant === "Örnek Et" && (
                      <span className={styles.restaurantCheck}>
                        <Check size={14} />
                      </span>
                    )}
                  </div>
                  <div 
                    className={clsx(styles.restaurantItem, selectedRestaurant === "Örnek Et 2" && styles.restaurantItemSelected)}
                    onClick={() => setSelectedRestaurant("Örnek Et 2")}
                  >
                    Örnek Et 2
                    {selectedRestaurant === "Örnek Et 2" && (
                      <span className={styles.restaurantCheck}>
                        <Check size={14} />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
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
                <span className={styles.navItemIcon}>
                  {item.useIconify ? (
                    <Icon icon={item.icon as string} width={18} height={18} />
                  ) : (
                    <item.icon size={18} strokeWidth={1.5} />
                  )}
                </span>
                <span className={styles.navLabel}>{item.label}</span>
              </a>
            ))}
          </nav>
          <button type="button" className={styles.addSectionButton}>
            <span className={styles.addSectionIcon}>
              <Grid3x3 size={18} strokeWidth={1.5} />
              <Plus size={12} strokeWidth={2.5} className={styles.addSectionPlus} />
            </span>
            <span className={styles.addSectionLabel}>Add a section</span>
          </button>
        </aside>
        <section className={styles.content}>
          <div className={styles.contentInner}>
            <div className={styles.pageHeader}>
              <div>
                <div className={styles.breadcrumb}>
                  <span>Anasayfa /</span>
                  <span className={styles.breadcrumbCurrent}>Pano</span>
                </div>
                <div className={styles.pageTitle}>Gösterge Tablosu</div>
              </div>
              <button type="button" className={styles.searchIconButton}>
                <Search size={18} />
              </button>
            </div>
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
                      <span className={styles.welcomeGreeting}>{greeting}</span>, <span className={styles.welcomeNameSmall}>Ezgi</span>
                    </h1>
                  </div>
                  <div className={styles.welcomeFullName}>Ezgi AKÇABAT</div>
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
                  <div style={{
                    position: "absolute",
                    right: "1.5rem",
                    bottom: "-40px",
                    width: "210px",
                    height: "360px",
                    background: "linear-gradient(135deg, #8e8e93 0%, #636366 100%)",
                    borderRadius: "40px 40px 0 0",
                    padding: "10px",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                    zIndex: 0,
                  }}>
                    <div style={{
                      width: "100%",
                      height: "100%",
                      background: "#ffffff",
                      borderRadius: "32px 32px 0 0",
                      padding: "15px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <div style={{
                        width: "140px",
                        height: "140px",
                        background: "#ffffff",
                        border: "2px solid #e0e0e0",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px",
                      }}>
                        <div style={{
                          width: "100%",
                          height: "100%",
                          background: "repeating-conic-gradient(#000 0% 25%, #fff 0% 50%) 50% / 20px 20px",
                          borderRadius: "8px",
                        }} />
                      </div>
                    </div>
                  </div>
                </section>
                <section className={styles.topMain} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                  <article className={styles.latestCard}>
                    <header>
                      <span>Günün En Yoğun Saatleri</span>
                    </header>
                    <div style={{ padding: "1rem" }}>
                      <div style={{ marginBottom: "1rem" }}>
                        <strong style={{ fontSize: "1.5rem" }}>Toplam Müşteri</strong>
                        <p style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "0.5rem" }}>127</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", height: "200px", marginTop: "1rem" }}>
                        {[
                          { hour: "12:00", value: 35, height: "80%" },
                          { hour: "13:00", value: 45, height: "100%" },
                          { hour: "14:00", value: 30, height: "67%" },
                          { hour: "19:00", value: 42, height: "93%" },
                          { hour: "20:00", value: 38, height: "84%" },
                        ].map((item, index) => (
                          <div key={index} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
                              <div style={{ width: "100%", background: "linear-gradient(180deg, #111111 0%, #3d3d3d 100%)", borderRadius: "8px 8px 0 0", height: item.height, minHeight: "40px", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "0.5rem" }}>
                                <span style={{ color: "#ffffff", fontWeight: "600", fontSize: "0.85rem" }}>{item.value}</span>
                              </div>
                              <span style={{ fontSize: "0.75rem", color: "var(--dash-text-muted)" }}>{item.hour}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                  <article className={styles.latestCard}>
                    <header>
                      <span>En Yoğun Masalar</span>
                    </header>
                    <div style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {[
                          { table: "Masa 8", orders: 24, customers: 48 },
                          { table: "Masa 12", orders: 19, customers: 38 },
                          { table: "Masa 5", orders: 17, customers: 34 },
                          { table: "Masa 15", orders: 15, customers: 30 },
                          { table: "Masa 3", orders: 14, customers: 28 },
                        ].map((item, index) => (
                          <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", background: "var(--dash-surface)", borderRadius: "12px", border: "1px solid var(--dash-border)" }}>
                            <div>
                              <strong style={{ display: "block", marginBottom: "0.25rem" }}>{item.table}</strong>
                              <span style={{ fontSize: "0.85rem", color: "var(--dash-text-muted)" }}>{item.orders} Sipariş</span>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <strong style={{ display: "block", fontSize: "1.1rem" }}>{item.customers}</strong>
                              <span style={{ fontSize: "0.75rem", color: "var(--dash-text-muted)" }}>Müşteri</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                  <article className={styles.latestCard}>
                    <header>
                      <span>En Çok Tüketilen Ürünler</span>
                    </header>
                    <div style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {[
                          { product: "Adana Kebap", count: 89, unit: "adet" },
                          { product: "Lahmacun", count: 76, unit: "adet" },
                          { product: "Çorba", count: 65, unit: "porsiyon" },
                          { product: "Pide", count: 54, unit: "adet" },
                          { product: "Salata", count: 48, unit: "porsiyon" },
                        ].map((item, index) => (
                          <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", background: "var(--dash-surface)", borderRadius: "12px", border: "1px solid var(--dash-border)" }}>
                            <div>
                              <strong style={{ display: "block", marginBottom: "0.25rem" }}>{item.product}</strong>
                              <span style={{ fontSize: "0.85rem", color: "var(--dash-text-muted)" }}>{item.unit}</span>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <strong style={{ display: "block", fontSize: "1.1rem" }}>{item.count}</strong>
                              <span style={{ fontSize: "0.75rem", color: "var(--dash-text-muted)" }}>Toplam</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                  <article className={styles.latestCard}>
                    <header>
                      <span>Masa Durumu</span>
                    </header>
                    <div style={{ padding: "1rem", position: "relative", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                      <div
                        style={{
                          position: "relative",
                          width: "150px",
                          height: "150px",
                          cursor: "pointer",
                        }}
                        onMouseEnter={() => setHoveredTablePercentage(10)}
                        onMouseLeave={() => setHoveredTablePercentage(null)}
                      >
                        <svg width="150" height="150" style={{ transform: "rotate(-90deg)" }}>
                          <circle
                            cx="75"
                            cy="75"
                            r="65"
                            fill="none"
                            stroke="#e0e0e0"
                            strokeWidth="10"
                          />
                          <circle
                            cx="75"
                            cy="75"
                            r="65"
                            fill="none"
                            stroke="#ff6b35"
                            strokeWidth="10"
                            strokeDasharray={2 * Math.PI * 65}
                            strokeDashoffset={2 * Math.PI * 65 - (10 / 100) * 2 * Math.PI * 65}
                            style={{ transition: "all 0.3s ease" }}
                          />
                        </svg>
                        <div style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "center",
                        }}>
                          <strong style={{ fontSize: "1.8rem", fontWeight: "700" }}>10%</strong>
                        </div>
                        {hoveredTablePercentage === 10 && (
                          <div style={{
                            position: "absolute",
                            top: "110%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "var(--dash-surface)",
                            border: "1px solid var(--dash-border)",
                            borderRadius: "12px",
                            padding: "0.75rem",
                            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                            zIndex: 10,
                            minWidth: "120px",
                            whiteSpace: "nowrap",
                          }}>
                            <div style={{ fontSize: "0.85rem", fontWeight: "600", marginBottom: "0.5rem", color: "var(--dash-text-muted)" }}>
                              Masalar
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                              {["Masa 3", "Masa 7"].map((table, tableIndex) => (
                                <span key={tableIndex} style={{ fontSize: "0.8rem", color: "var(--dash-text)" }}>
                                  {table}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </section>
                <article className={styles.latestCard} ref={latestOrdersRef}>
                  <header>
                    <span>Son Sipariş</span>
                  </header>
                  <div className={styles.latestList}>
                    {latestOrders.slice(0, 1).map((order) => (
                      <button
                        key={order.code}
                        type="button"
                        className={styles.latestItem}
                        onClick={() => setActiveOrder(order)}
                      >
                        <div className={styles.latestItemContent}>
                          <div className={styles.latestInfo}>
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
                            <div className={styles.latestInfoDetails}>
                              <div>
                                <span className={styles.latestDetailLabel}>Müşteri</span>
                                <strong>{order.customer}</strong>
                                {order.phone && <p>{order.phone}</p>}
                              </div>
                              <div>
                                <span className={styles.latestDetailLabel}>Kanal</span>
                                <strong>{order.platform}</strong>
                                {order.table && <p>{order.table}</p>}
                                {order.eta && <p>{order.eta}</p>}
                              </div>
                              <div>
                                <span className={styles.latestDetailLabel}>Sipariş</span>
                                <strong>{order.channel}</strong>
                                {order.address && <p>{order.address}</p>}
                              </div>
                            </div>
                            <div className={styles.latestItemsWrapper}>
                              <span className={styles.latestDetailLabel}>Sipariş Menüsü</span>
                              <ul className={styles.latestItems}>
                                {order.items.map((item) => (
                                  <li key={item.name}>
                                    <span>{item.name}</span>
                                    <span>×{item.qty}</span>
                                  </li>
                                ))}
                              </ul>
                              {order.notes && (
                                <p className={styles.latestNote}>{order.notes}</p>
                              )}
                            </div>
                          </div>
                          <div className={styles.latestStepsColumn}>
                            <div className={styles.latestStepTrack} style={{ background: "linear-gradient(135deg, #ff6b35 0%, #ffa500 50%, #ff4757 100%)", borderRadius: "12px", padding: "1rem" }}>
                              {order.steps.filter(step => step.label === "Sipariş Alındı" || step.label === "Hazırlanıyor").map((step, stepIndex) => {
                                const originalIndex = order.steps.findIndex(s => s.label === step.label);
                                const isStepActive = originalIndex <= order.progress;
                                return (
                                  <div
                                    key={step.label}
                                    style={{
                                      color: isStepActive ? "#000000" : "#808080",
                                      fontWeight: isStepActive ? "600" : "400",
                                      fontSize: "0.95rem",
                                      marginBottom: stepIndex < 1 ? "0.5rem" : "0",
                                    }}
                                  >
                                    {step.label}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </article>
              </div>
              <aside className={styles.topAside}>
                <article className={styles.latestCard} style={{ height: "360px", display: "flex", flexDirection: "column" }}>
                  <header>
                    <span>Yaklaşan Rezervasyon</span>
                  </header>
                  <div className={styles.latestList} style={{ flex: 1, overflow: "hidden" }}>
                    {[
                      { 
                        id: "REZ-1001", 
                        customer: "Ahmet Yılmaz", 
                        date: now.toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" }),
                        time: `${String(now.getHours()).padStart(2, "0")}:00`,
                        status: "Onaylandı", 
                        guests: 4, 
                        phone: "+90 555 123 45 67",
                        table: "Masa 8",
                        notes: "Pencere kenarı tercih ediyor",
                        email: "ahmet.yilmaz@example.com"
                      },
                    ].map((reservation) => (
                      <button
                        key={reservation.id}
                        type="button"
                        className={styles.latestItem}
                        onClick={() => setActiveReservation(reservation)}
                      >
                        <div className={styles.latestItemContent}>
                          <div className={styles.latestInfo}>
                            <div className={styles.latestBody}>
                              <div className={styles.latestBodyHeader}>
                                <span className={styles.latestIcon}>
                                  <CalendarDays size={16} />
                                </span>
                                <div>
                                  <strong>{reservation.id}</strong>
                                  <p>{reservation.customer}</p>
                                </div>
                              </div>
                              <div className={styles.latestBodyFooter}>
                                <span className={styles.latestStatus}>{reservation.status}</span>
                                <span className={styles.latestTotal}>{reservation.time}</span>
                              </div>
                            </div>
                            <div className={styles.latestInfoDetails}>
                              <div>
                                <span className={styles.latestDetailLabel}>Müşteri</span>
                                <strong>{reservation.customer}</strong>
                                <p>{reservation.phone}</p>
                              </div>
                              <div>
                                <span className={styles.latestDetailLabel}>Tarih</span>
                                <strong>{reservation.date}</strong>
                                <p>{reservation.guests} Kişi</p>
                              </div>
                              <div>
                                <span className={styles.latestDetailLabel}>Durum</span>
                                <strong>{reservation.status}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
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
          </div>
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
      {activeReservation && (
        <div
          className={styles.orderModal}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 100,
          }}
        >
            <header className={styles.orderModalHeader}>
              <div>
                <span className={styles.orderModalLabel}>Rezervasyon Detayı</span>
                <h2>{activeReservation.id}</h2>
              </div>
              <button
                type="button"
                className={styles.orderModalClose}
                onClick={() => setActiveReservation(null)}
                aria-label="Rezervasyonu kapat"
              >
                <X size={16} />
              </button>
            </header>
            <div className={styles.orderModalBody}>
              <div className={styles.orderModalSectionGrid}>
                <div>
                  <span className={styles.orderModalSectionLabel}>Müşteri</span>
                  <strong>{activeReservation.customer}</strong>
                  {activeReservation.phone && <p>{activeReservation.phone}</p>}
                  {activeReservation.email && <p>{activeReservation.email}</p>}
                </div>
                <div>
                  <span className={styles.orderModalSectionLabel}>Tarih & Saat</span>
                  <strong>{activeReservation.date}</strong>
                  <p>{activeReservation.time}</p>
                </div>
                <div>
                  <span className={styles.orderModalSectionLabel}>Durum</span>
                  <strong>{activeReservation.status}</strong>
                  {activeReservation.table && <p>{activeReservation.table}</p>}
                </div>
                <div>
                  <span className={styles.orderModalSectionLabel}>Kişi Sayısı</span>
                  <strong>{activeReservation.guests} Kişi</strong>
                </div>
              </div>
              {activeReservation.notes && (
                <div className={styles.orderModalSection}>
                  <span className={styles.orderModalSectionLabel}>Notlar</span>
                  <p>{activeReservation.notes}</p>
                </div>
              )}
            </div>
            <footer className={styles.orderModalFooter}>
              <button type="button">Onayla</button>
              <button type="button">İptal Et</button>
              <button type="button">Düzenle</button>
            </footer>
        </div>
      )}
    </>
  );
}

