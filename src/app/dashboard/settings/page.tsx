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
  Save,
  Shield,
  Bell,
  ArrowUpRight,
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
  { label: "Ayarlar", icon: Settings, href: "/dashboard/settings", active: true },
  { label: "Profil", icon: User, href: "/dashboard/profile" },
];

const settingsSections = [
  "Genel Ayarlar",
  "Ekip ve Roller",
  "Bildirimler",
  "Güvenlik",
];

export default function SettingsPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeSection, setActiveSection] = useState(settingsSections[0]);
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
            <section className={styles.settingsWrapper}>
              <div className={styles.headerBar}>
                <div className={styles.headerInfo}>
                  <h1>Ayarlar</h1>
                  <p>Organizasyon bilgileri, ekip erişimleri ve bildirim tercihlerini yönetin.</p>
                </div>
                <div className={styles.headerActions}>
                  <button className={styles.headerButton} type="button">
                    <Shield size={16} />
                    Politikalar
                  </button>
                  <button className={styles.headerButtonPrimary} type="button">
                    <Save size={16} />
                    Kaydet
                  </button>
                </div>
              </div>
              <div className={styles.contentLayout}>
                <nav className={styles.sidebar}>
                  {settingsSections.map((section) => (
                    <button
                      key={section}
                      type="button"
                      className={clsx(
                        styles.sidebarButton,
                        section === activeSection && styles.sidebarButtonActive,
                      )}
                      onClick={() => setActiveSection(section)}
                    >
                      {section}
                      <ArrowUpRight size={16} />
                    </button>
                  ))}
                </nav>
                <div className={styles.panel}>
                  {activeSection === "Genel Ayarlar" && (
                    <div className={styles.panelSection}>
                      <h3>İşletme Bilgileri</h3>
                      <div className={styles.fieldGroup}>
                        <label className={styles.field}>
                          <span>İşletme Adı</span>
                          <input defaultValue="GBZQR Restoran" />
                        </label>
                        <label className={styles.field}>
                          <span>Subdomain</span>
                          <input defaultValue="gbzqr.com/ahmetbakkal" />
                        </label>
                        <label className={styles.field}>
                          <span>Adres</span>
                          <textarea defaultValue="Bağdat Caddesi No:45 Kadıköy / İstanbul" />
                        </label>
                      </div>
                    </div>
                  )}
                  {activeSection === "Ekip ve Roller" && (
                    <div className={styles.panelSection}>
                      <h3>Ekip Yönetimi</h3>
                      <div className={styles.fieldGroup}>
                        <label className={styles.field}>
                          <span>Ekip Üyesi</span>
                          <select>
                            <option>Yeni üye ekle...</option>
                            <option>Emre (Mutfak Şefi)</option>
                            <option>Selin (Şube Müdürü)</option>
                          </select>
                        </label>
                        <label className={styles.field}>
                          <span>Rol</span>
                          <select>
                            <option>Yönetici</option>
                            <option>Mutfak</option>
                            <option>Garson</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  )}
                  {activeSection === "Bildirimler" && (
                    <div className={styles.panelSection}>
                      <h3>Bildirim Tercihleri</h3>
                      <div className={styles.fieldGroup}>
                        <div className={styles.toggleRow}>
                          <span>Anlık sipariş bildirimleri</span>
                          <button className={styles.headerButton} type="button">
                            <Bell size={16} />
                            Aktif
                          </button>
                        </div>
                        <div className={styles.toggleRow}>
                          <span>Kritik stok uyarıları</span>
                          <button className={styles.headerButton} type="button">
                            Pasif
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeSection === "Güvenlik" && (
                    <div className={styles.panelSection}>
                      <h3>Güvenlik Ayarları</h3>
                      <div className={styles.fieldGroup}>
                        <label className={styles.field}>
                          <span>İki Aşamalı Doğrulama</span>
                          <select>
                            <option>SMS</option>
                            <option>E-posta</option>
                            <option>Authenticator Uygulaması</option>
                          </select>
                        </label>
                        <label className={styles.field}>
                          <span>API Anahtarı</span>
                          <input defaultValue="pk_live_2fd8****" />
                        </label>
                      </div>
                    </div>
                  )}
                  <div className={styles.saveActions}>
                    <button className={styles.saveButton} type="button">
                      Değişiklikleri Kaydet
                    </button>
                    <button className={styles.headerButton} type="button">
                      İptal
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </section>
      </div>
    </>
  );
}

