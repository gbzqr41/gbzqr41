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
  Sun,
  Moon,
  Plus,
  DownloadCloud,
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
  { label: "Stok", icon: Boxes, href: "/dashboard/stock", active: true },
  { label: "Ayarlar", icon: Settings, href: "/dashboard/settings" },
  { label: "Profil", icon: User, href: "/dashboard/profile" },
];

const inventoryRows = [
  { item: "Dana Bonfile", category: "Et Ürünleri", quantity: "42 kg", status: "Güvenli", supplier: "Et Tedarik A.Ş." },
  { item: "Avokado", category: "Sebze & Meyve", quantity: "18 kg", status: "Yeniden Sipariş", supplier: "Yeşil Hal" },
  { item: "Cheddar Peyniri", category: "Süt Ürünleri", quantity: "9 kg", status: "Düşük", supplier: "Sütçüoğlu" },
  { item: "Glütensiz Makarna", category: "Kuru Gıda", quantity: "24 paket", status: "Güvenli", supplier: "Makarnacı Ltd." },
  { item: "Espresso Çekirdeği", category: "İçecek", quantity: "14 kg", status: "Yeniden Sipariş", supplier: "Kahve Atölyesi" },
];

const restockItems = [
  { name: "Somon Fileto", amount: "12 kg", supplier: "SeaFresh", date: "12 Kas" },
  { name: "Organik Yumurta", amount: "8 koli", supplier: "Doğa Çiftliği", date: "11 Kas" },
  { name: "Taze Fesleğen", amount: "5 kg", supplier: "Yeşil Hal", date: "10 Kas" },
];

const deliveries = [
  { name: "Güneş Bakliyat", detail: "Mercimek, Nohut", date: "09 Kas" },
  { name: "Sütçüoğlu", detail: "Mozzarella, Krema", date: "08 Kas" },
  { name: "Kahve Atölyesi", detail: "Espresso çekirdeği", date: "07 Kas" },
];

export default function StockPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const initials = useMemo(() => {
    const name = "Ezgi Kaplan";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }, []);

  return (
    <>
      <div
        className={layoutStyles.sidebarBackdrop}
        data-open={isSidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />
      <div className={layoutStyles.page} data-theme={theme}>
        <aside className={layoutStyles.sidebar} data-open={isSidebarOpen}>
          <div className={layoutStyles.logo}>GBZQR</div>
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
                <item.icon />
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
            <section className={styles.stockWrapper}>
              <div className={styles.headerBar}>
                <div className={styles.headerInfo}>
                  <h1>Stok Yönetimi</h1>
                  <p>Tedarik süreçlerini yönetin, kritik seviyeleri takip edin ve yeniden sipariş planlayın.</p>
                </div>
                <div className={styles.headerActions}>
                  <button className={styles.headerButton} type="button">
                    <Plus size={16} />
                    Ürün Ekle
                  </button>
                  <button className={styles.headerButtonPrimary} type="button">
                    <DownloadCloud size={16} />
                    Dışa Aktar
                  </button>
                </div>
              </div>
              <div className={styles.divider} />
              <div className={styles.contentGrid}>
                <div className={styles.inventoryPanel}>
                  <div className={styles.inventoryHeader}>
                    <h2>Stok Listesi</h2>
                    <span>Son güncelleme: 09 Kasım 2025</span>
                  </div>
                  <table className={styles.inventoryTable}>
                    <thead>
                      <tr>
                        <th>Ürün</th>
                        <th>Kategori</th>
                        <th>Miktar</th>
                        <th>Durum</th>
                        <th>Tedarikçi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryRows.map((row) => (
                        <tr key={row.item}>
                          <td>{row.item}</td>
                          <td>{row.category}</td>
                          <td>{row.quantity}</td>
                          <td>
                            <span
                              className={clsx(
                                styles.statusPill,
                                row.status === "Güvenli" && styles.statusSafe,
                                row.status === "Düşük" && styles.statusLow,
                                row.status === "Yeniden Sipariş" && styles.statusReorder,
                              )}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td>{row.supplier}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <aside className={styles.sidePanel}>
                  <div className={styles.restockCard}>
                    <h3>Yeniden Sipariş</h3>
                    <div className={styles.restockList}>
                      {restockItems.map((item) => (
                        <div key={item.name} className={styles.restockItem}>
                          <span>{item.name}</span>
                          <span>
                            {item.amount} • {item.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.recentDeliveries}>
                    <h3>Son Teslimatlar</h3>
                    <div className={styles.deliveryList}>
                      {deliveries.map((delivery) => (
                        <div key={delivery.name} className={styles.deliveryEntry}>
                          <span>{delivery.name}</span>
                          <span>
                            {delivery.detail} • {delivery.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          </main>
        </section>
      </div>
    </>
  );
}

