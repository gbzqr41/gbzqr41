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
  ArrowRight,
  Filter,
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
  { label: "Raporlar", icon: BarChart3, href: "/dashboard/reports", active: true },
  { label: "Ön Muhasebe", icon: FileText, href: "/dashboard/accounting" },
  { label: "Stok", icon: Boxes, href: "/dashboard/stock" },
  { label: "Ayarlar", icon: Settings, href: "/dashboard/settings" },
  { label: "Profil", icon: User, href: "/dashboard/profile" },
];

const filters = ["Bu Hafta", "Geçen Hafta", "Bu Ay", "Özel"];

const summaryCards = [
  { label: "Toplam Ciro", value: "₺186.240", growth: "+18%" },
  { label: "Online Sipariş", value: "1.284", growth: "+9%" },
  { label: "Masa Sipariş", value: "542", growth: "+12%" },
  { label: "İade Oranı", value: "%2.1", growth: "0%" },
];

const reportLinks = [
  { name: "Günlük Sipariş Raporu", action: "PDF indir" },
  { name: "Haftalık Ciro Özeti", action: "Excel indir" },
  { name: "Platform Karşılaştırması", action: "PDF indir" },
];

export default function ReportsPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeFilter, setActiveFilter] = useState(filters[0]);
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
            <section className={styles.reportsWrapper}>
              <div className={styles.headerBar}>
                <div className={styles.headerInfo}>
                  <h1>Raporlar</h1>
                  <p>Satış performansını, kanal bazlı büyümeyi ve sipariş dinamiklerini analiz edin.</p>
                </div>
                <div className={styles.headerActions}>
                  <button className={styles.headerButton} type="button">
                    <Filter size={16} />
                    Filtrele
                  </button>
                  <button className={styles.headerButtonPrimary} type="button">
                    <DownloadCloud size={16} />
                    Rapor İndir
                  </button>
                </div>
              </div>
              <div className={styles.divider} />
              <div className={styles.contentGrid}>
                <div className={styles.metricsPanel}>
                  <div className={styles.metricsHeader}>
                    <h2>Performans Özeti</h2>
                    <div className={styles.filters}>
                      {filters.map((filter) => (
                        <button
                          key={filter}
                          className={clsx(
                            styles.filterChip,
                            filter === activeFilter && styles.filterChipActive,
                          )}
                          type="button"
                          onClick={() => setActiveFilter(filter)}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className={styles.chartCard}>
                    <div className={styles.trendHeader}>
                      <div>
                        <div className={styles.trendValue}>₺42.560</div>
                        <div className={styles.trendMeta}>
                          Toplam ciro – {activeFilter.toLowerCase()}
                        </div>
                      </div>
                      <button className={styles.headerButton} type="button">
                        Detaylı Gör
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                    <div className={styles.chartPlaceholder}>Grafik verisi burada</div>
                  </div>
                  <div className={styles.summaryGrid}>
                    {summaryCards.map((card) => (
                      <div key={card.label} className={styles.summaryCard}>
                        <span className={styles.summaryLabel}>{card.label}</span>
                        <span className={styles.summaryValue}>{card.value}</span>
                        <span
                          className={
                            card.growth.startsWith("+")
                              ? styles.growthPositive
                              : styles.growthNeutral
                          }
                        >
                          {card.growth}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <aside className={styles.sidePanel}>
                  <div className={styles.reportCard}>
                    <div className={styles.reportHeader}>
                      <h3>Hazır Raporlar</h3>
                      <ArrowRight size={18} />
                    </div>
                    <div className={styles.reportList}>
                      {reportLinks.map((report) => (
                        <div key={report.name} className={styles.reportItem}>
                          <span>{report.name}</span>
                          <button type="button">{report.action}</button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.insightCard}>
                    <h3>Haftalık Öneriler</h3>
                    <p>
                      Getir ve Yemeksepeti kanallarında en yüksek dönüşüm saatleri 18:00 - 22:00
                      arası. Bu zaman aralığı için kampanya düzenleyin.
                    </p>
                    <div className={styles.insightActions}>
                      <button type="button">Hatırlat</button>
                      <button type="button">Not Ekle</button>
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

