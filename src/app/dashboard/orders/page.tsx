"use client";

import {
  LayoutDashboard,
  ClipboardList,
  ChefHat,
  QrCode,
  BarChart3,
  FileText,
  Boxes,
  Settings,
  User,
  Users,
  Sun,
  Moon,
  ShoppingBag,
  ListOrdered,
  Clock,
  CheckCircle,
  XCircle,
  PanelLeft,
  CalendarDays,
  PhoneCall,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import layoutStyles from "../page.module.css";
import styles from "./page.module.css";

type OrderStatus = "Hazırlanıyor" | "Hazırlandı" | "Yolda";

type BoardOrder = {
  id: string;
  platform: "Yemeksepeti" | "Getir" | "Trendyol Yemek" | "Migros Yemek";
  name: string;
  customer: string;
  note: string;
  items: string[];
  status: OrderStatus;
  timestamp: string;
};

const orderPlatforms: BoardOrder["platform"][] = [
  "Yemeksepeti",
  "Getir",
  "Trendyol Yemek",
  "Migros Yemek",
];

const boardOrders: BoardOrder[] = [
  {
    id: "ys-001",
    platform: "Yemeksepeti",
    name: "Menü 1 + Ayran",
    customer: "Elif Kara",
    note: "Ayran buz gibi olsun.",
    items: ["Menü 1", "Ayran"],
    status: "Hazırlanıyor",
    timestamp: "12:43, 9 Kasım 2025",
  },
  {
    id: "ys-002",
    platform: "Yemeksepeti",
    name: "Çifte Burger Menü",
    customer: "Mert Öz",
    note: "Soğan istemiyor.",
    items: ["Double Burger", "Patates", "Kola"],
    status: "Hazırlandı",
    timestamp: "12:32, 9 Kasım 2025",
  },
  {
    id: "gt-001",
    platform: "Getir",
    name: "Vejetaryen Dürüm",
    customer: "Selin Arslan",
    note: "Yoğurt sosu ayrı olsun.",
    items: ["Vejetaryen Dürüm", "Elma Suyu"],
    status: "Hazırlanıyor",
    timestamp: "12:55, 9 Kasım 2025",
  },
  {
    id: "gt-002",
    platform: "Getir",
    name: "Izgara Somon",
    customer: "Kerem Demir",
    note: "Salata sosu kenarda.",
    items: ["Izgara Somon", "Mevsim Salata"],
    status: "Yolda",
    timestamp: "12:05, 9 Kasım 2025",
  },
  {
    id: "ty-001",
    platform: "Trendyol Yemek",
    name: "Çikolatalı Waffle",
    customer: "Ayşe Boz",
    note: "Bol çilek ve muz.",
    items: ["Waffle", "Latte"],
    status: "Hazırlanıyor",
    timestamp: "12:47, 9 Kasım 2025",
  },
  {
    id: "ty-002",
    platform: "Trendyol Yemek",
    name: "Sushi Combo",
    customer: "Can Işık",
    note: "Wasabi extra gönderin.",
    items: ["California Roll", "Nigiri Mix"],
    status: "Hazırlandı",
    timestamp: "12:20, 9 Kasım 2025",
  },
  {
    id: "mg-001",
    platform: "Migros Yemek",
    name: "Akdeniz Salata",
    customer: "Berk Yılmaz",
    note: "Zeytin olmasın.",
    items: ["Akdeniz Salata", "Soğuk Çay"],
    status: "Hazırlanıyor",
    timestamp: "12:33, 9 Kasım 2025",
  },
  {
    id: "mg-002",
    platform: "Migros Yemek",
    name: "Karışık Pizza",
    customer: "Ece Güneş",
    note: "Ekstra mantar.",
    items: ["Karışık Pizza", "Sarımsak Sos"],
    status: "Yolda",
    timestamp: "12:10, 9 Kasım 2025",
  },
];

const sidebarItems = [
  { label: "Pano", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Siparişler", icon: ClipboardList, href: "/dashboard/orders", active: true },
  { label: "Mutfak", icon: ChefHat, href: "/dashboard/kitchen" },
  { label: "QR Menü", icon: QrCode, href: "/dashboard/qr-menu" },
  { label: "Raporlar", icon: BarChart3, href: "/dashboard/reports" },
  { label: "Ön Muhasebe", icon: FileText, href: "/dashboard/accounting" },
  { label: "Stok", icon: Boxes, tag: "Çok yakında" },
  { label: "Call All", icon: PhoneCall, tag: "Çok yakında" },
  { label: "Rezervasyon", icon: CalendarDays, href: "/dashboard/reservation" },
  { label: "Garson", icon: Users, href: "/dashboard/garson" },
  { label: "Ayarlar", icon: Settings, href: "/dashboard/settings" },
  { label: "Profil", icon: User, href: "/dashboard/profile" },
];

export default function OrdersBoardPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<BoardOrder | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const initials = useMemo(() => {
    const name = "Ezgi Kaplan";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }, []);

  const groupedOrders = useMemo(
    () =>
      orderPlatforms.map((platform) => ({
        platform,
        orders: boardOrders.filter((order) => order.platform === platform),
      })),
    [],
  );

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!selectedOrder) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedOrder(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedOrder]);

  const totalOrders = boardOrders.length;

  const handleAccept = () => {
    if (selectedOrder) {
      setToast(`${selectedOrder.name} siparişi onaylandı`);
      setSelectedOrder(null);
    }
  };

  const handleReject = () => {
    if (selectedOrder) {
      setToast(`${selectedOrder.name} siparişi iptal edildi`);
      setSelectedOrder(null);
    }
  };

  return (
    <>
      <div
        className={layoutStyles.sidebarBackdrop}
        data-open={isSidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />
      <div
        className={clsx(layoutStyles.page, isSidebarCollapsed && layoutStyles.pageCollapsed)}
        data-theme={theme}
      >
        <aside
          className={clsx(
            layoutStyles.sidebar,
            isSidebarCollapsed && layoutStyles.sidebarCollapsed,
          )}
          data-open={isSidebarOpen}
        >
          <div className={layoutStyles.logo}>GBZQR</div>
          <button
            type="button"
            className={layoutStyles.toggleSidebar}
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            aria-label="Menüyü daralt"
          >
            <PanelLeft className={layoutStyles.toggleSidebarIcon} size={16} />
          </button>
          <nav className={layoutStyles.navList}>
            {sidebarItems.map((item) => (
              <a
                key={item.label}
                className={clsx(
                  layoutStyles.navItem,
                  item.active && layoutStyles.navItemActive,
                )}
                href={item.href ?? "#"}
              >
                <item.icon size={18} />
                <span className={layoutStyles.navLabel}>{item.label}</span>
                {item.tag && <span className={layoutStyles.navTag}>{item.tag}</span>}
              </a>
            ))}
          </nav>
        </aside>
        <section className={layoutStyles.content}>
          <header className={layoutStyles.header}>
            <button
              className={layoutStyles.sidebarToggle}
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Menüyü aç"
            >
              <LayoutDashboard size={20} />
            </button>
            <div className={layoutStyles.toggle}>
              <button
                type="button"
                data-active={theme === "light"}
                onClick={() => setTheme("light")}
              >
                <Sun size={16} />
                Aydınlık
              </button>
              <button
                type="button"
                data-active={theme === "dark"}
                onClick={() => setTheme("dark")}
              >
                <Moon size={16} />
                Karanlık
              </button>
            </div>
            <div className={layoutStyles.profile}>
              <div className={layoutStyles.avatar}>{initials}</div>
              <div>
                <strong>Ezgi Kaplan</strong>
                <p className={layoutStyles.profileMeta}>Yönetici</p>
              </div>
            </div>
          </header>
          <main className={layoutStyles.main}>
            <section className={layoutStyles.welcome}>
              <h1>Sipariş Kanalları</h1>
              <p>Şu an {totalOrders} aktif sipariş görüntüleniyor.</p>
            </section>
            <section className={styles.ordersWrapper}>
              <div className={styles.columns}>
                {groupedOrders.map((group) => (
                  <div key={group.platform} className={styles.column}>
                    <div className={styles.columnTitle}>
                      {group.platform}
                      <span className={styles.badge}>{group.orders.length}</span>
                    </div>
                    {group.orders.map((order) => (
                      <article
                        key={order.id}
                        className={styles.card}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div className={styles.cardHeader}>
                          <span className={styles.cardIcon}>
                            <ShoppingBag size={18} />
                          </span>
                          <div>
                            <h3 className={styles.cardTitle}>{order.name}</h3>
                            <span className={styles.orderMeta}>{order.customer}</span>
                          </div>
                        </div>
                        <div className={styles.cardRow}>
                          <ListOrdered className={styles.cardRowIcon} />
                          <span>{order.items.join(", ")}</span>
                        </div>
                        <div className={styles.cardRow}>
                          <FileText className={styles.cardRowIcon} />
                          <span>{order.note}</span>
                        </div>
                        <button type="button" className={styles.status}>
                          {order.status}
                        </button>
                      </article>
                    ))}
                    {group.orders.length === 0 && (
                      <p className={styles.empty}>Şu an sipariş bulunmuyor.</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </main>
        </section>
      </div>

      <div
        className={styles.modalBackdrop}
        data-open={Boolean(selectedOrder)}
        onClick={() => setSelectedOrder(null)}
        aria-hidden={!selectedOrder}
      >
        {selectedOrder && (
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalSection}>
              <span className={styles.modalIcon}>
                <ShoppingBag size={20} />
              </span>
              <div className={styles.modalText}>
                <span className={styles.modalLabel}>Sipariş Adı</span>
                <span className={styles.modalValue}>{selectedOrder.name}</span>
              </div>
            </div>
            <div className={styles.modalSection}>
              <span className={styles.modalIcon}>
                <ListOrdered size={20} />
              </span>
              <div className={styles.modalText}>
                <span className={styles.modalLabel}>Sipariş İçeriği</span>
                <div className={styles.modalItems}>
                  {selectedOrder.items.map((item) => (
                    <span key={item}>• {item}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.modalSection}>
              <span className={styles.modalIcon}>
                <FileText size={20} />
              </span>
              <div className={styles.modalText}>
                <span className={styles.modalLabel}>Sipariş Notu</span>
                <span>{selectedOrder.note}</span>
              </div>
            </div>
            <div className={styles.modalSection}>
              <span className={styles.modalIcon}>
                <User size={20} />
              </span>
              <div className={styles.modalText}>
                <span className={styles.modalLabel}>Müşteri</span>
                <span>{selectedOrder.customer}</span>
              </div>
            </div>
            <div className={styles.modalSection}>
              <span className={styles.modalIcon}>
                <Clock size={20} />
              </span>
              <div className={styles.modalText}>
                <span className={styles.modalLabel}>Zaman Damgası</span>
                <span>{selectedOrder.timestamp}</span>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={clsx(styles.modalButton, styles.modalAccept)}
                onClick={handleAccept}
              >
                <CheckCircle size={18} />
                Kabul Et
              </button>
              <button
                type="button"
                className={clsx(styles.modalButton, styles.modalReject)}
                onClick={handleReject}
              >
                <XCircle size={18} />
                İptal Et
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.toast} data-show={Boolean(toast)}>
        {toast && (
          <>
            <CheckCircle size={18} />
            <span>{toast}</span>
          </>
        )}
      </div>
    </>
  );
}

