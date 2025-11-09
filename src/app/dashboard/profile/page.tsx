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
  Edit3,
  Shield,
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
  { label: "Ayarlar", icon: Settings, href: "/dashboard/settings" },
  { label: "Profil", icon: User, href: "/dashboard/profile", active: true },
];

const preferenceSettings = [
  { name: "Yeni sipariş bildirimleri", value: "Aktif" },
  { name: "Haftalık rapor e-postası", value: "Aktif" },
  { name: "Kritik stok uyarısı", value: "Pasif" },
];

export default function ProfilePage() {
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
            <section className={styles.profileWrapper}>
              <div className={styles.headerBar}>
                <div className={styles.headerInfo}>
                  <h1>Profil</h1>
                  <p>Kişisel bilgilerinizi, güvenlik tercihlerinizi ve bildirim ayarlarınızı yönetin.</p>
                </div>
                <div className={styles.headerActions}>
                  <button className={styles.headerButton} type="button">
                    <Shield size={16} />
                    Güvenlik
                  </button>
                  <button className={styles.headerButtonPrimary} type="button">
                    <Edit3 size={16} />
                    Profili Düzenle
                  </button>
                </div>
              </div>
              <div className={styles.contentGrid}>
                <aside className={styles.profileCard}>
                  <div className={styles.avatar}>{initials}</div>
                  <div className={styles.profileMeta}>
                    <strong>Ezgi Kaplan</strong>
                    <span>Kurucu Ortak</span>
                    <span>ezgi@gbzqr.com</span>
                    <span>+90 555 555 55 55</span>
                  </div>
                  <div className={styles.profileStats}>
                    <div className={styles.statRow}>
                      <span>Katılım Tarihi</span>
                      <strong>12 Şubat 2021</strong>
                    </div>
                    <div className={styles.statRow}>
                      <span>İşletmeler</span>
                      <strong>3</strong>
                    </div>
                    <div className={styles.statRow}>
                      <span>Son Aktivite</span>
                      <strong>09 Kas 2025 • 12:34</strong>
                    </div>
                  </div>
                </aside>
                <div className={styles.detailPanel}>
                  <div className={styles.detailGrid}>
                    <div className={styles.sectionTitle}>Kişisel Bilgiler</div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>İsim Soyisim</span>
                      <span className={styles.detailValue}>Ezgi Kaplan</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>E-posta</span>
                      <span className={styles.detailValue}>ezgi@gbzqr.com</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Telefon</span>
                      <span className={styles.detailValue}>+90 555 555 55 55</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Lokasyon</span>
                      <span className={styles.detailValue}>İstanbul, Türkiye</span>
                    </div>
                  </div>
                  <div className={styles.preferences}>
                    <div className={styles.sectionTitle}>Tercihler</div>
                    {preferenceSettings.map((pref) => (
                      <div key={pref.name} className={styles.preferenceRow}>
                        <span>{pref.name}</span>
                        <span>{pref.value}</span>
                      </div>
                    ))}
                  </div>
                  <button className={styles.saveButton} type="button">
                    Değişiklikleri Kaydet
                  </button>
                </div>
              </div>
            </section>
          </main>
        </section>
      </div>
    </>
  );
}

