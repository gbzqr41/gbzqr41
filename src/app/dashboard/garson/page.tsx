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
  Plus,
  Minus,
  PanelLeft,
  CalendarDays,
} from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import layoutStyles from "../page.module.css";
import styles from "./page.module.css";

const sidebarItems = [
  { label: "Pano", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Siparişler", icon: ClipboardList, href: "/dashboard/orders" },
  { label: "Mutfak", icon: ChefHat, href: "/dashboard/kitchen" },
  { label: "QR Menü", icon: QrCode, href: "/dashboard/qr-menu" },
  { label: "Raporlar", icon: BarChart3, href: "/dashboard/reports" },
  { label: "Ön Muhasebe", icon: FileText, href: "/dashboard/accounting" },
  { label: "Stok", icon: Boxes, href: "/dashboard/stock" },
  { label: "Rezervasyon", icon: CalendarDays, href: "/dashboard/reservation" },
  { label: "Garson", icon: Users, href: "/dashboard/garson", active: true },
  { label: "Ayarlar", icon: Settings, href: "/dashboard/settings" },
  { label: "Profil", icon: User, href: "/dashboard/profile" },
];

const menuCategories = [
  { name: "Kahvaltı", items: 12, color: "#d7f4ff" },
  { name: "Çorbalar", items: 8, color: "#ffe4f2" },
  { name: "Makarna", items: 9, color: "#f6f2ff" },
  { name: "Sushi", items: 15, color: "#fdf3d4" },
  { name: "Ana Yemek", items: 11, color: "#f1f7ff" },
  { name: "Tatlılar", items: 7, color: "#fde6d8" },
  { name: "İçecekler", items: 9, color: "#e9f9f7" },
  { name: "Kokteyl", items: 5, color: "#f6d8ff" },
];

const orders = [
  { name: "Rosto Tavuk", quantity: 2, price: 36.9 },
  { name: "Somon Izgara", quantity: 1, price: 42.5 },
  { name: "Irish Cream Kahve", quantity: 1, price: 12.4 },
];

export default function GarsonPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isPrintOpen, setPrintOpen] = useState(false);
  const initials = useMemo(() => {
    const name = "Ezgi Kaplan";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }, []);

  const subtotal = orders.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

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
        {isPrintOpen && (
          <>
            <div
              className={styles.modalBackdrop}
              onClick={() => setPrintOpen(false)}
            />
            <div className={styles.modalCard}>
              <div className={styles.receiptHeader}>
                <h3>GBZQR Restoran</h3>
                <span>Fiş #T5-234</span>
              </div>
              <div className={styles.receiptMeta}>
                <span>Masa 5 • Leslie K.</span>
                <span>Garson: Cameron W.</span>
                <span>17 Aralık 2023 • 20:15</span>
              </div>
              <div className={styles.receiptList}>
                {orders.map((item) => (
                  <div key={item.name} className={styles.receiptItem}>
                    <div className={styles.receiptItemDetails}>
                      <strong>{item.name}</strong>
                      <span>{item.quantity} × ₺{item.price.toFixed(2)}</span>
                    </div>
                    <strong className={styles.receiptAmount}>
                      ₺{(item.price * item.quantity).toFixed(2)}
                    </strong>
                  </div>
                ))}
              </div>
              <div className={styles.receiptTotals}>
                <div className={styles.receiptTotalsRow}>
                  <span>Ara Toplam</span>
                  <span>₺{subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.receiptTotalsRow}>
                  <span>Vergi (10%)</span>
                  <span>₺{tax.toFixed(2)}</span>
                </div>
                <div className={styles.receiptTotalsRow}>
                  <strong>Genel Toplam</strong>
                  <strong>₺{total.toFixed(2)}</strong>
                </div>
              </div>
              <p className={styles.receiptNote}>Bizi tercih ettiğiniz için teşekkür ederiz.</p>
            </div>
          </>
        )}
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
                <span>{item.label}</span>
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
            <section className={styles.garsonWrapper}>
              <div className={styles.menuPanel}>
                <div className={styles.menuHeader}>
                  <div>
                    <h2>Masa 5</h2>
                    <span>Leslie K. • 4 kişi</span>
                  </div>
                  <button className={styles.searchButton} type="button">
                    Arama
                  </button>
                </div>
                <div className={styles.menuGrid}>
                  {menuCategories.map((item) => (
                    <div
                      key={item.name}
                      className={styles.menuCard}
                      style={{ background: `${item.color}` }}
                    >
                      <div className={styles.menuCardHeader}>
                        <strong>{item.name}</strong>
                        <span className={styles.menuBadge}>{item.items} ürün</span>
                      </div>
                      <span className={styles.menuDescription}>
                        Şef önerileriyle seçilmiş {item.name.toLowerCase()} kategorisi.
                      </span>
                      <div className={styles.counter}>
                        <button type="button">
                          <Minus size={16} />
                        </button>
                        <span>1</span>
                        <button type="button">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <aside className={styles.orderPanel}>
                <div className={styles.orderHeader}>
                  <h3>Sipariş Özeti</h3>
                  <span>Garson: Cameron W.</span>
                </div>
                <div className={styles.orderList}>
                  {orders.map((item) => (
                    <div key={item.name} className={styles.orderItem}>
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <strong>₺{(item.price * item.quantity).toFixed(2)}</strong>
                    </div>
                  ))}
                </div>
                <div className={styles.totals}>
                  <span>Ara Toplam: ₺{subtotal.toFixed(2)}</span>
                  <span>Vergi (10%): ₺{tax.toFixed(2)}</span>
                  <strong>Toplam: ₺{total.toFixed(2)}</strong>
                </div>
                <div className={styles.paymentMethods}>
                  <span>Ödeme Metodu</span>
                  <div className={styles.methodButtons}>
                    <button type="button">Nakit</button>
                    <button type="button">Kart</button>
                    <button type="button">QR</button>
                  </div>
                </div>
                <button
                  className={styles.printButton}
                  type="button"
                  onClick={() => setPrintOpen(true)}
                >
                  Yazdır
                </button>
                <button className={styles.placeOrder} type="button">
                  Siparişi Onayla
                </button>
              </aside>
            </section>
          </main>
        </section>
      </div>
    </>
  );
}
