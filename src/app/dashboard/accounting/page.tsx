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
  DownloadCloud,
  ArrowUpRight,
  Filter,
  Wallet,
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
  { label: "Ön Muhasebe", icon: FileText, href: "/dashboard/accounting", active: true },
  { label: "Stok", icon: Boxes, href: "/dashboard/stock" },
  { label: "Ayarlar", icon: Settings, href: "/dashboard/settings" },
  { label: "Profil", icon: User, href: "/dashboard/profile" },
];

const ledgerRows = [
  { date: "09 Kas 2025", description: "Getir - Gün Sonu", type: "Gelir", amount: "₺12.450" },
  { date: "09 Kas 2025", description: "Yemeksepeti - Gün Sonu", type: "Gelir", amount: "₺9.380" },
  { date: "09 Kas 2025", description: "Eleman Maaşları", type: "Gider", amount: "₺6.200" },
  { date: "08 Kas 2025", description: "Gıda Tedarikçisi", type: "Gider", amount: "₺4.150" },
  { date: "08 Kas 2025", description: "Trendyol Yemek - Gün Sonu", type: "Gelir", amount: "₺7.960" },
];

const summaryItems = [
  { name: "Toplam Gelir", value: "₺186.240" },
  { name: "Toplam Gider", value: "₺92.540" },
  { name: "Net Kar", value: "₺93.700" },
];

const upcomingPayments = [
  { name: "Kira", due: "15 Kas", amount: "₺35.000" },
  { name: "Elektrik", due: "12 Kas", amount: "₺8.600" },
  { name: "Su", due: "12 Kas", amount: "₺2.300" },
];

export default function AccountingPage() {
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
            <section className={styles.accountingWrapper}>
              <div className={styles.headerBar}>
                <div className={styles.headerInfo}>
                  <h1>Ön Muhasebe</h1>
                  <p>Gelir-gider hareketlerini, bekleyen ödemeleri ve nakit akışını takip edin.</p>
                </div>
                <div className={styles.headerActions}>
                  <button className={styles.headerButton} type="button">
                    <Filter size={16} />
                    Filtrele
                  </button>
                  <button className={styles.headerButtonPrimary} type="button">
                    <DownloadCloud size={16} />
                    Dışa Aktar
                  </button>
                </div>
              </div>
              <div className={styles.divider} />
              <div className={styles.contentGrid}>
                <div className={styles.ledgerPanel}>
                  <div className={styles.ledgerHeader}>
                    <h2>Gelir & Gider Defteri</h2>
                    <div className={styles.headerActions}>
                      <button className={styles.headerButton} type="button">
                        <Wallet size={16} />
                        Hızlı Kayıt
                      </button>
                    </div>
                  </div>
                  <div className={styles.balanceCard}>
                    <span className={styles.balanceLabel}>Güncel Bakiye</span>
                    <span className={styles.balanceValue}>₺94.120</span>
                    <span className={styles.growthPositive}>+₺6.480 bugün</span>
                  </div>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Tarih</th>
                        <th>Açıklama</th>
                        <th>Tür</th>
                        <th>Tutar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ledgerRows.map((row) => (
                        <tr key={row.description}>
                          <td>{row.date}</td>
                          <td>{row.description}</td>
                          <td>{row.type}</td>
                          <td>{row.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <aside className={styles.sidePanel}>
                  <div className={styles.summaryCard}>
                    <h3>Özet</h3>
                    <div className={styles.summaryList}>
                      {summaryItems.map((item) => (
                        <div key={item.name} className={styles.summaryItem}>
                          <span>{item.name}</span>
                          <span>{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <button className={styles.headerButtonPrimary} type="button">
                      Detaylı Rapor
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                  <div className={styles.upcomingCard}>
                    <h3>Yaklaşan Ödemeler</h3>
                    <div className={styles.upcomingList}>
                      {upcomingPayments.map((payment) => (
                        <div key={payment.name} className={styles.upcomingEntry}>
                          <span>{payment.name}</span>
                          <span>
                            {payment.amount} • {payment.due}
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

