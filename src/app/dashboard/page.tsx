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
  UserPlus,
  LogOut,
  ChevronDown,
  ChevronUp,
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
  const profileButtonRef = useRef<HTMLButtonElement>(null);
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
  const [isTodosVisible, setIsTodosVisible] = useState<boolean>(true);
  const [isStatsVisible, setIsStatsVisible] = useState<boolean>(true);
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
      const target = event.target as Node;
      const isClickInsideMenu = profileMenuRef.current?.contains(target);
      const isClickInsideButton = profileButtonRef.current?.contains(target);
      
      if (!isClickInsideMenu && !isClickInsideButton) {
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
          <div style={{ marginTop: "auto", paddingTop: "1rem", paddingBottom: "20px", position: "relative" }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <Search size={16} strokeWidth={1.5} style={{ position: "absolute", left: "0.75rem", color: "rgba(255, 255, 255, 0.6)", pointerEvents: "none", zIndex: 1 }} />
              <input
                type="text"
                placeholder="Ara..."
                style={{
                  padding: "0.75rem 5rem 0.75rem 2.5rem",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  width: "100%",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }}
              />
              <button
                type="button"
                style={{
                  position: "absolute",
                  right: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  padding: "0.4rem 0.6rem",
                  borderRadius: "8px",
                  border: "none",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "0.7rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                  zIndex: 2,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                }}
              >
                <span>CTRL</span>
                <span style={{ color: "rgba(255, 255, 255, 0.6)" }}>+</span>
                <span>F</span>
              </button>
            </div>
            <div style={{ display: "flex", gap: "15px", marginBottom: "1rem" }}>
              <button
                type="button"
                onClick={() => {}}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1rem",
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  cursor: "pointer",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <LifeBuoy size={16} strokeWidth={1.5} />
                <span>Yardım</span>
              </button>
              <button
                type="button"
                onClick={() => {}}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1rem",
                  background: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  cursor: "pointer",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Phone size={16} strokeWidth={1.5} />
                <span>Destek</span>
              </button>
            </div>
            <button
              ref={profileButtonRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setProfileMenuOpen(!isProfileMenuOpen);
              }}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: "0.75rem", background: "transparent", border: "none", cursor: "pointer", padding: "0.5rem", borderRadius: "12px", transition: "background 0.2s ease", pointerEvents: "auto" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontWeight: "600", fontSize: "0.9rem", flexShrink: 0, pointerEvents: "none" }}>
                EA
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1, minWidth: 0, textAlign: "left", pointerEvents: "none" }}>
                <span style={{ color: "#ffffff", fontWeight: "600", fontSize: "0.85rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", pointerEvents: "none" }}>Ezgi AKÇABAT</span>
                <span style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.75rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", pointerEvents: "none" }}>Yönetici</span>
              </div>
            </button>
            {isProfileMenuOpen && (
              <div
                ref={profileMenuRef}
                style={{
                  position: "fixed",
                  bottom: "30px",
                  left: "300px",
                  width: "240px",
                  background: "var(--dash-surface)",
                  borderRadius: "16px",
                  boxShadow: "0 20px 48px rgba(17, 17, 17, 0.25)",
                  border: "1px solid var(--dash-border)",
                  padding: "0.5rem",
                  zIndex: 1000,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.25rem",
                  overflow: "hidden",
                }}
              >
                <div style={{ width: "calc(100% + 1rem)", height: "80px", background: "#000000", margin: "-0.5rem -0.5rem 0 -0.5rem", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(255, 255, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontWeight: "600", fontSize: "1.2rem" }}>
                    EA
                  </div>
                </div>
                <div style={{ width: "100%", height: "1px", background: "var(--dash-border)", margin: "0.5rem 0" }} />
                <div style={{ display: "flex", gap: "15px", padding: "0.5rem 0" }}>
                  <button
                    type="button"
                    onClick={() => setProfileMenuOpen(false)}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1rem",
                      background: "transparent",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      color: "var(--dash-text)",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--dash-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <LifeBuoy size={18} strokeWidth={1.5} />
                    <span>Yardım</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfileMenuOpen(false)}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1rem",
                      background: "transparent",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      color: "var(--dash-text)",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--dash-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <Phone size={18} strokeWidth={1.5} />
                    <span>Destek</span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen(false)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    background: "transparent",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    color: "var(--dash-text)",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--dash-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <User size={18} strokeWidth={1.5} />
                  <span>Profil</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen(false)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    background: "transparent",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    color: "var(--dash-text)",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--dash-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <Settings size={18} strokeWidth={1.5} />
                  <span>Ayarlar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen(false)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    background: "transparent",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    color: "var(--dash-text)",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--dash-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <LifeBuoy size={18} strokeWidth={1.5} />
                  <span>Yardım</span>
                </button>
                <div
                  style={{
                    height: "1px",
                    background: "var(--dash-border)",
                    margin: "0.5rem 0",
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setTheme(theme === "light" ? "dark" : "light");
                    setProfileMenuOpen(false);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    background: "transparent",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    color: "var(--dash-text)",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--dash-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {theme === "light" ? <Moon size={18} strokeWidth={1.5} /> : <Sun size={18} strokeWidth={1.5} />}
                  <span>{theme === "light" ? "Gece Modu" : "Gündüz Modu"}</span>
                </button>
                <div
                  style={{
                    height: "1px",
                    background: "var(--dash-border)",
                    margin: "0.5rem 0",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen(false)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.75rem 1rem",
                    background: "transparent",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    color: "#ff4757",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--dash-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <LogOut size={18} strokeWidth={1.5} />
                  <span>Çıkış Yap</span>
                </button>
              </div>
            )}
          </div>
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
            </div>
            <main className={styles.main}>
            <div style={{ padding: "30px", background: "rgba(17, 17, 17, 0.05)", borderRadius: "12px", marginBottom: "1.5rem", position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--dash-text)" }}>YAPILACAKLAR</div>
                <button type="button" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", background: "transparent", border: "none", color: "var(--dash-text)", fontSize: "0.9rem", fontWeight: "500", cursor: "pointer", transition: "all 0.2s ease" }} onClick={() => setIsTodosVisible(!isTodosVisible)}>
                  <span>{isTodosVisible ? "Gizle" : "Aç"}</span>
                  {isTodosVisible ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
              </div>
              {isTodosVisible && (
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ width: "250px", height: "250px", background: "var(--dash-surface)", border: "1px solid var(--dash-border)", borderRadius: "12px", padding: "1rem", position: "relative", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--dash-text)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--dash-border)"; }}>
                  <div style={{ width: "30px", height: "30px", border: "2px solid var(--dash-border)", borderRadius: "50%", position: "absolute", top: "1rem", left: "1rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s ease" }} onClick={(e) => { e.stopPropagation(); const circle = e.currentTarget; if (circle.style.background === "var(--dash-text)") { circle.style.background = "transparent"; circle.querySelector("svg")?.remove(); } else { circle.style.background = "var(--dash-text)"; const check = document.createElementNS("http://www.w3.org/2000/svg", "svg"); check.setAttribute("width", "16"); check.setAttribute("height", "16"); check.setAttribute("viewBox", "0 0 24 24"); check.setAttribute("fill", "none"); check.setAttribute("stroke", "white"); check.setAttribute("stroke-width", "2.5"); check.setAttribute("stroke-linecap", "round"); check.setAttribute("stroke-linejoin", "round"); const path = document.createElementNS("http://www.w3.org/2000/svg", "path"); path.setAttribute("d", "M20 6L9 17l-5-5"); check.appendChild(path); circle.appendChild(check); } }}>
                  </div>
                  <div style={{ marginTop: "2.5rem" }}>
                    <strong style={{ fontSize: "1rem", color: "var(--dash-text)" }}>Sipariş Oluştur</strong>
                  </div>
                </div>
                <div style={{ width: "250px", height: "250px", background: "var(--dash-surface)", border: "1px solid var(--dash-border)", borderRadius: "12px", padding: "1rem", position: "relative", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--dash-text)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--dash-border)"; }}>
                  <div style={{ width: "30px", height: "30px", border: "2px solid var(--dash-border)", borderRadius: "50%", position: "absolute", top: "1rem", left: "1rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s ease" }} onClick={(e) => { e.stopPropagation(); const circle = e.currentTarget; if (circle.style.background === "var(--dash-text)") { circle.style.background = "transparent"; circle.querySelector("svg")?.remove(); } else { circle.style.background = "var(--dash-text)"; const check = document.createElementNS("http://www.w3.org/2000/svg", "svg"); check.setAttribute("width", "16"); check.setAttribute("height", "16"); check.setAttribute("viewBox", "0 0 24 24"); check.setAttribute("fill", "none"); check.setAttribute("stroke", "white"); check.setAttribute("stroke-width", "2.5"); check.setAttribute("stroke-linecap", "round"); check.setAttribute("stroke-linejoin", "round"); const path = document.createElementNS("http://www.w3.org/2000/svg", "path"); path.setAttribute("d", "M20 6L9 17l-5-5"); check.appendChild(path); circle.appendChild(check); } }}>
                  </div>
                  <div style={{ marginTop: "2.5rem" }}>
                    <strong style={{ fontSize: "1rem", color: "var(--dash-text)" }}>QR Oluştur</strong>
                  </div>
                </div>
                <div style={{ width: "250px", height: "250px", background: "var(--dash-surface)", border: "1px solid var(--dash-border)", borderRadius: "12px", padding: "1rem", position: "relative", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--dash-text)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--dash-border)"; }}>
                  <div style={{ width: "30px", height: "30px", border: "2px solid var(--dash-border)", borderRadius: "50%", position: "absolute", top: "1rem", left: "1rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s ease" }} onClick={(e) => { e.stopPropagation(); const circle = e.currentTarget; if (circle.style.background === "var(--dash-text)") { circle.style.background = "transparent"; circle.querySelector("svg")?.remove(); } else { circle.style.background = "var(--dash-text)"; const check = document.createElementNS("http://www.w3.org/2000/svg", "svg"); check.setAttribute("width", "16"); check.setAttribute("height", "16"); check.setAttribute("viewBox", "0 0 24 24"); check.setAttribute("fill", "none"); check.setAttribute("stroke", "white"); check.setAttribute("stroke-width", "2.5"); check.setAttribute("stroke-linecap", "round"); check.setAttribute("stroke-linejoin", "round"); const path = document.createElementNS("http://www.w3.org/2000/svg", "path"); path.setAttribute("d", "M20 6L9 17l-5-5"); check.appendChild(path); circle.appendChild(check); } }}>
                  </div>
                  <div style={{ marginTop: "2.5rem" }}>
                    <strong style={{ fontSize: "1rem", color: "var(--dash-text)" }}>İlk Ürünü Ekle</strong>
                  </div>
                </div>
              </div>
              )}
            </div>
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
              </div>
              <aside className={styles.topAside}>
                <article className={styles.latestCard} style={{ height: welcomeHeight ? `${welcomeHeight}px` : "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                  <header>
                    <span>Hızlı Linkler</span>
                  </header>
                  <div style={{ padding: "1rem", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "repeat(4, 1fr)", gap: "0.75rem", flex: 1, overflow: "auto", minHeight: 0 }}>
                    <button type="button" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem", padding: "1rem", background: "var(--dash-surface)", border: "1px solid var(--dash-border)", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--dash-hover)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "var(--dash-surface)"; }}>
                      <ClipboardList size={20} strokeWidth={1.5} />
                      <span style={{ fontSize: "0.9rem", fontWeight: "500", color: "var(--dash-text)" }}>Sipariş Oluştur</span>
                    </button>
                    <button type="button" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem", padding: "1rem", background: "var(--dash-surface)", border: "1px solid var(--dash-border)", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--dash-hover)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "var(--dash-surface)"; }}>
                      <CalendarDays size={20} strokeWidth={1.5} />
                      <span style={{ fontSize: "0.9rem", fontWeight: "500", color: "var(--dash-text)" }}>Rezervasyon Al</span>
                    </button>
                    <button type="button" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem", padding: "1rem", background: "var(--dash-surface)", border: "1px solid var(--dash-border)", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--dash-hover)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "var(--dash-surface)"; }}>
                      <QrCode size={20} strokeWidth={1.5} />
                      <span style={{ fontSize: "0.9rem", fontWeight: "500", color: "var(--dash-text)" }}>QR Oluştur</span>
                    </button>
                    <button type="button" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem", padding: "1rem", background: "var(--dash-surface)", border: "1px solid var(--dash-border)", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--dash-hover)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "var(--dash-surface)"; }}>
                      <FileText size={20} strokeWidth={1.5} />
                      <span style={{ fontSize: "0.9rem", fontWeight: "500", color: "var(--dash-text)" }}>Menü Ekle</span>
                    </button>
                    <button type="button" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem", padding: "1rem", background: "var(--dash-surface)", border: "1px solid var(--dash-border)", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--dash-hover)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "var(--dash-surface)"; }}>
                      <BarChart size={20} strokeWidth={1.5} />
                      <span style={{ fontSize: "0.9rem", fontWeight: "500", color: "var(--dash-text)" }}>Ürün Ekle</span>
                    </button>
                    <button type="button" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem", padding: "1rem", background: "var(--dash-surface)", border: "1px solid var(--dash-border)", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--dash-hover)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "var(--dash-surface)"; }}>
                      <Receipt size={20} strokeWidth={1.5} />
                      <span style={{ fontSize: "0.9rem", fontWeight: "500", color: "var(--dash-text)" }}>Ödeme Al</span>
                    </button>
                    <button type="button" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem", padding: "1rem", background: "var(--dash-surface)", border: "1px solid var(--dash-border)", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--dash-hover)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "var(--dash-surface)"; }}>
                      <Boxes size={20} strokeWidth={1.5} />
                      <span style={{ fontSize: "0.9rem", fontWeight: "500", color: "var(--dash-text)" }}>Stok Ekle</span>
                    </button>
                    <button type="button" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem", padding: "1rem", background: "var(--dash-surface)", border: "1px solid var(--dash-border)", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--dash-hover)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "var(--dash-surface)"; }}>
                      <UserPlus size={20} strokeWidth={1.5} />
                      <span style={{ fontSize: "0.9rem", fontWeight: "500", color: "var(--dash-text)" }}>Müşteri Ekle</span>
                    </button>
                  </div>
                </article>
              </aside>
            </section>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
                <article className={styles.latestCard} ref={latestOrdersRef} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <header>
                    <span>Son Sipariş</span>
                  </header>
                  <div className={styles.latestList} style={{ flex: 1, overflow: "auto" }}>
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
                          <div className={styles.latestStepsColumn} style={{ height: "100%" }}>
                            <div className={styles.latestStepTrack} style={{ background: "linear-gradient(135deg, #ff6b35 0%, #ffa500 50%, #ff4757 100%)", borderRadius: "12px", padding: "1rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.5rem", position: "relative" }}>
                              {[
                                "Sipariş Alındı",
                                "Hazırlanıyor",
                                "Paketleniyor",
                                "Kurye Yolda",
                                "Teslim Edildi",
                                "İptal Edildi"
                              ].map((stepLabel, stepIndex) => {
                                const isStepActive = stepIndex <= order.progress;
                                return (
                                  <div
                                    key={stepLabel}
                                    style={{
                                      color: isStepActive ? "#000000" : "#808080",
                                      fontWeight: isStepActive ? "600" : "400",
                                      fontSize: "0.95rem",
                                    }}
                                  >
                                    {stepLabel}
                                  </div>
                                );
                              })}
                              <div style={{ position: "absolute", bottom: "1rem", right: "1rem" }}>
                                <Boxes size={64} color="#ffffff" strokeWidth={1} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </article>
                <article className={styles.latestCard} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
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
                </div>
                <div style={{ padding: "30px", background: "rgba(17, 17, 17, 0.05)", borderRadius: "12px", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--dash-text)" }}>İSTATİSTİKLER</div>
                    <button type="button" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", background: "transparent", border: "none", color: "var(--dash-text)", fontSize: "0.9rem", fontWeight: "500", cursor: "pointer", transition: "all 0.2s ease" }} onClick={() => setIsStatsVisible(!isStatsVisible)}>
                      <span>{isStatsVisible ? "Gizle" : "Aç"}</span>
                      {isStatsVisible ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                    </button>
                  </div>
                  <div style={{ overflow: "hidden", transition: "max-height 0.3s ease-out, opacity 0.3s ease-out", maxHeight: isStatsVisible ? "2000px" : "0", opacity: isStatsVisible ? 1 : 0 }}>
                  <section className={styles.topMain} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
                    <article className={styles.latestCard}>
                      <header>
                        <span>Günlük Özet</span>
                      </header>
                      <div style={{ padding: "1rem" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", background: "var(--dash-surface)", borderRadius: "12px", border: "1px solid var(--dash-border)" }}>
                            <div>
                              <strong style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.9rem" }}>Bugünkü Toplam Satış Tutarı</strong>
                              <span style={{ fontSize: "0.85rem", color: "var(--dash-text-muted)" }}>Satış</span>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <strong style={{ display: "block", fontSize: "1.2rem" }}>12.450 TL</strong>
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", background: "var(--dash-surface)", borderRadius: "12px", border: "1px solid var(--dash-border)" }}>
                            <div>
                              <strong style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.9rem" }}>Bugün Ağırlanan Misafir Sayısı</strong>
                              <span style={{ fontSize: "0.85rem", color: "var(--dash-text-muted)" }}>Misafir</span>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <strong style={{ display: "block", fontSize: "1.2rem" }}>127</strong>
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", background: "var(--dash-surface)", borderRadius: "12px", border: "1px solid var(--dash-border)" }}>
                            <div>
                              <strong style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.9rem" }}>Bugün Açık Sipariş Toplamı</strong>
                              <span style={{ fontSize: "0.85rem", color: "var(--dash-text-muted)" }}>Sipariş</span>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <strong style={{ display: "block", fontSize: "1.2rem" }}>23</strong>
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", background: "var(--dash-surface)", borderRadius: "12px", border: "1px solid var(--dash-border)" }}>
                            <div>
                              <strong style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.9rem" }}>Bugünkü Toplam Gider Tutarı</strong>
                              <span style={{ fontSize: "0.85rem", color: "var(--dash-text-muted)" }}>Gider</span>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <strong style={{ display: "block", fontSize: "1.2rem" }}>3.250 TL</strong>
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", background: "var(--dash-surface)", borderRadius: "12px", border: "1px solid var(--dash-border)" }}>
                            <div>
                              <strong style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.9rem" }}>Masa Doluluk Oranı</strong>
                              <span style={{ fontSize: "0.85rem", color: "var(--dash-text-muted)" }}>Doluluk</span>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <strong style={{ display: "block", fontSize: "1.2rem" }}>%68</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
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
                        {(() => {
                          const data = [
                            { hour: "12:00", value: 35 },
                            { hour: "13:00", value: 45 },
                            { hour: "14:00", value: 30 },
                            { hour: "19:00", value: 42 },
                            { hour: "20:00", value: 38 },
                          ];
                          const maxValue = Math.max(...data.map(d => d.value));
                          const maxHeight = 160;
                          return data.map((item, index) => {
                            const barHeight = (item.value / maxValue) * maxHeight;
                            return (
                              <div key={index} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", height: "100%" }}>
                                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem", height: "100%", justifyContent: "flex-end" }}>
                                  <div style={{ width: "100%", background: "linear-gradient(180deg, #111111 0%, #3d3d3d 100%)", borderRadius: "8px 8px 0 0", height: `${barHeight}px`, minHeight: "40px", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "0.5rem" }}>
                                    <span style={{ color: "#ffffff", fontWeight: "600", fontSize: "0.85rem" }}>{item.value}</span>
                                  </div>
                                  <span style={{ fontSize: "0.75rem", color: "var(--dash-text-muted)" }}>{item.hour}</span>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  </article>
                  <article className={styles.latestCard} style={{ position: "relative" }}>
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
                  </section>
                  </div>
                </div>
                <div style={{ padding: "30px", background: "rgba(17, 17, 17, 0.05)", borderRadius: "12px", marginBottom: "1.5rem", minWidth: 0, maxWidth: "100%", boxSizing: "border-box" }}>
                  <div style={{ marginBottom: "1rem", fontSize: "1.1rem", fontWeight: "600", color: "var(--dash-text)" }}>Zaman Çizelgesi</div>
                  <div style={{ overflowX: "auto", overflowY: "hidden", paddingBottom: "0.5rem", minWidth: 0, maxWidth: "100%" }} onScroll={(e) => { e.stopPropagation(); }}>
                    <div style={{ display: "flex", gap: "1rem", minWidth: "max-content" }}>
                      {[
                        { name: "Masa 4", role: "Müşteri", action: "Garson çağırıyor hesap istiyor", time: "14:35" },
                        { name: "Ahmet", role: "Garson", action: "Masa 2 adisyon açtı", time: "14:30" },
                        { name: "Mehmet", role: "Yönetici", action: "Ödeme aldı 500 TL", time: "14:25" },
                        { name: "Ayşe", role: "Garson", action: "Masa 5 sipariş aldı", time: "14:20" },
                        { name: "Fatma", role: "Kasiyer", action: "Nakit ödeme 250 TL", time: "14:15" },
                        { name: "Ali", role: "Garson", action: "Masa 8 rezervasyon yaptı", time: "14:10" },
                        { name: "Zeynep", role: "Yönetici", action: "Stok güncellemesi yaptı", time: "14:05" },
                        { name: "Can", role: "Garson", action: "Masa 3 sipariş iptal etti", time: "14:00" },
                        { name: "Elif", role: "Kasiyer", action: "Kredi kartı ödeme 180 TL", time: "13:55" },
                        { name: "Burak", role: "Garson", action: "Masa 12 adisyon kapattı", time: "13:50" },
                        { name: "Selin", role: "Yönetici", action: "Menü güncellemesi yaptı", time: "13:45" },
                        { name: "Emre", role: "Garson", action: "Masa 7 sipariş aldı", time: "13:40" },
                        { name: "Deniz", role: "Kasiyer", action: "Nakit ödeme 320 TL", time: "13:35" },
                        { name: "Cem", role: "Garson", action: "Masa 1 rezervasyon yaptı", time: "13:30" },
                        { name: "Aslı", role: "Yönetici", action: "Rapor oluşturdu", time: "13:25" },
                        { name: "Kemal", role: "Garson", action: "Masa 9 adisyon açtı", time: "13:20" },
                      ].map((item, index) => {
                        const getRoleIcon = (role: string) => {
                          if (role === "Garson") return "carbon:user";
                          if (role === "Yönetici") return "carbon:user-star";
                          if (role === "Kasiyer") return "carbon:receipt";
                          if (role === "Müşteri") return "carbon:user-multiple";
                          return "carbon:user";
                        };
                        const getActionIcon = (action: string) => {
                          if (action.includes("ödeme") || action.includes("Ödeme")) return "carbon:money";
                          if (action.includes("masa") || action.includes("Masa")) return "carbon:table";
                          if (action.includes("rezervasyon")) return "carbon:calendar";
                          if (action.includes("sipariş")) return "carbon:clipboard";
                          if (action.includes("stok") || action.includes("Stok")) return "carbon:box";
                          if (action.includes("menü") || action.includes("Menü")) return "carbon:book";
                          if (action.includes("rapor") || action.includes("Rapor")) return "carbon:document";
                          if (action.includes("hesap") || action.includes("Hesap")) return "carbon:receipt";
                          if (action.includes("çağırıyor")) return "carbon:notification";
                          return "carbon:information";
                        };
                        const isLatest = index === 0;
                        return (
                        <div key={index} style={{ 
                          minWidth: "280px", 
                          minHeight: "180px", 
                          background: isLatest ? "rgba(239, 68, 68, 0.25)" : "var(--dash-surface)", 
                          border: isLatest ? "2px solid rgba(239, 68, 68, 0.6)" : "1px solid var(--dash-border)", 
                          borderRadius: "12px", 
                          padding: "1rem", 
                          flexShrink: 0,
                          position: "relative",
                          animation: isLatest ? "pulse 1.5s ease-in-out infinite" : "none"
                        }}>
                          <style>{`
                            @keyframes pulse {
                              0%, 100% { 
                                background: rgba(239, 68, 68, 0.25);
                                border-color: rgba(239, 68, 68, 0.6);
                              }
                              50% { 
                                background: rgba(239, 68, 68, 0.4);
                                border-color: rgba(239, 68, 68, 0.9);
                              }
                            }
                          `}</style>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <Icon icon={getRoleIcon(item.role)} width={20} height={20} style={{ color: "var(--dash-text)" }} />
                              <div>
                                <strong style={{ fontSize: "0.95rem", color: "var(--dash-text)" }}>{item.name}</strong>
                                <span style={{ fontSize: "0.85rem", color: "var(--dash-text-muted)", marginLeft: "0.5rem" }}>{item.role}</span>
                              </div>
                            </div>
                            <span style={{ fontSize: "0.8rem", color: "var(--dash-text-muted)" }}>{item.time}</span>
                          </div>
                          <p style={{ fontSize: "0.9rem", color: "var(--dash-text)", margin: 0 }}>{item.action}</p>
                          <div style={{ position: "absolute", bottom: "15px", right: "15px" }}>
                            <Icon icon={getActionIcon(item.action)} width={64} height={64} style={{ color: "rgba(128, 128, 128, 0.3)", opacity: 0.5 }} />
                          </div>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
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

