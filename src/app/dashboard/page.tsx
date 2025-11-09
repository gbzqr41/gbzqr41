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
  Sun,
  Moon,
} from "lucide-react";
import clsx from "clsx";
import { useMemo, useState } from "react";
import styles from "./page.module.css";

const sidebarItems = [
  { label: "Pano", icon: LayoutDashboard, active: true, href: "/dashboard" },
  { label: "Siparişler", icon: ClipboardList, href: "/dashboard/orders" },
  { label: "Mutfak", icon: ChefHat, href: "/dashboard/kitchen" },
  { label: "QR Menü", icon: QrCode, href: "/dashboard/qr-menu" },
  { label: "Raporlar", icon: BarChart },
  { label: "Ön Muhasebe", icon: FileText },
  { label: "Stok", icon: Boxes },
  { label: "Ayarlar", icon: Settings },
  { label: "Profil", icon: User },
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

export default function DashboardPage() {
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
        className={styles.sidebarBackdrop}
        data-open={isSidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />
      <div className={styles.page} data-theme={theme}>
        <aside className={styles.sidebar} data-open={isSidebarOpen}>
          <div className={styles.logo}>GBZQR</div>
          <nav className={styles.navList}>
            {sidebarItems.map((item) => (
              <a
                key={item.label}
                className={clsx(styles.navItem, item.active && styles.navItemActive)}
                href={item.href ?? "#"}
              >
                <item.icon />
                <span>{item.label}</span>
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
            <div className={styles.toggle}>
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
            <div className={styles.profile}>
              <div className={styles.avatar}>{initials}</div>
              <div>
                <strong>Ezgi Kaplan</strong>
                <p className={styles.profileMeta}>Yönetici</p>
              </div>
            </div>
          </header>
          <main className={styles.main}>
            <section className={styles.welcome}>
              <h1>Tekrar hoş geldin, Ezgi</h1>
              <p>
                Bugün restoranın performansı güçlü görünüyor. 4 bekleyen siparişi takip
                etmeyi unutma.
              </p>
            </section>
            <section className={styles.statsGrid}>
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
    </>
  );
}

