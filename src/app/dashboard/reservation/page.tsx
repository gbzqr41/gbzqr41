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
  PanelLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import clsx from "clsx";
import { useMemo, useState } from "react";
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
  { label: "Rezervasyon", icon: CalendarDays, href: "/dashboard/reservation", active: true },
  { label: "Garson", icon: Users, href: "/dashboard/garson" },
  { label: "Ayarlar", icon: Settings, href: "/dashboard/settings" },
  { label: "Profil", icon: User, href: "/dashboard/profile" },
];

const weekdays = ["P", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
const days = Array.from({ length: 31 }, (_, index) => index + 1);

const schedule = [
  {
    time: "07:30",
    title: "Booking taxi app",
    details: "06:00 - 07:30",
    color: "#b6c0ff",
  },
  {
    time: "08:40",
    title: "Development meet",
    details: "08:40 - 10:00",
    color: "#d7c8ff",
  },
  {
    time: "10:45",
    title: "Yeni proje",
    details: "10:45 - 12:30",
    color: "#bde7ff",
  },
  {
    time: "13:30",
    title: "Planlama",
    details: "13:30 - 14:30",
    color: "#ffd7ec",
  },
];

export default function ReservationPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [view, setView] = useState<"month" | "week" | "day">("week");
  const [range, setRange] = useState<"today" | "tomorrow" | "upcoming">("today");

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
            <section className={styles.reservationWrapper}>
              <aside className={styles.calendarPanel}>
                <div className={styles.profileSection}>
                  <img
                    src="https://i.pravatar.cc/100?img=12"
                    alt="Antonio"
                    className={styles.profileImage}
                  />
                  <div>
                    <h3>Antonio Larentio</h3>
                    <span>Ürün Tasarımcısı</span>
                  </div>
                </div>
                <div className={styles.monthSwitcher}>
                  <button type="button">
                    <ChevronLeft size={16} />
                  </button>
                  <strong>Aralık 2023</strong>
                  <button type="button">
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className={styles.monthGrid}>
                  {weekdays.map((day) => (
                    <div key={day} className={styles.weekdayCell}>
                      {day}
                    </div>
                  ))}
                  {days.map((day) => (
                    <div
                      key={day}
                      className={clsx(
                        styles.dayCell,
                        day === 18 && styles.dayCellActive,
                      )}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className={styles.eventPreview}>
                  <strong>Gabriel ile buluş</strong>
                  <span>12:00 - 13:30 • International Library</span>
                  <button className={styles.eventButton} type="button">
                    <Clock size={16} />
                    {"14 dk"}
                  </button>
                </div>
                <div className={styles.calendarLegend}>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: "#ffd7ec" }} />
                    Kişisel
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: "#bde7ff" }} />
                    İş
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: "#d7c8ff" }} />
                    Sağlık
                  </div>
                </div>
              </aside>
              <section className={styles.schedulePanel}>
                <div className={styles.scheduleHeader}>
                  <div className={styles.rangeTabs}>
                    {["today", "tomorrow", "upcoming"].map((key) => (
                      <button
                        key={key}
                        type="button"
                        className={clsx(
                          styles.rangeButton,
                          range === key && styles.rangeButtonActive,
                        )}
                        onClick={() => setRange(key as typeof range)}
                      >
                        {key === "today"
                          ? "Bugün"
                          : key === "tomorrow"
                          ? "Yarın"
                          : "Yaklaşan"}
                      </button>
                    ))}
                  </div>
                  <div className={styles.viewTabs}>
                    {["month", "week", "day"].map((key) => (
                      <button
                        key={key}
                        type="button"
                        className={clsx(
                          styles.viewButton,
                          view === key && styles.viewButtonActive,
                        )}
                        onClick={() => setView(key as typeof view)}
                      >
                        {key === "month" ? "Ay" : key === "week" ? "Hafta" : "Gün"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.timeline}>
                  <div className={styles.timeColumn}>
                    {Array.from({ length: 14 }, (_, idx) => (
                      <span key={idx}>{6 + idx}:00</span>
                    ))}
                  </div>
                  <div className={styles.eventsColumn}>
                    {schedule.map((item) => (
                      <div
                        key={item.title}
                        className={styles.eventCard}
                        style={{ borderLeftColor: item.color, background: `${item.color}33` }}
                      >
                        <strong>{item.title}</strong>
                        <span className={styles.eventMeta}>{item.details}</span>
                        <div className={styles.participantList}>
                          {[1, 2, 3].map((index) => (
                            <img
                              key={index}
                              src={`https://i.pravatar.cc/100?img=${10 + index}`}
                              alt="Katılımcı"
                              className={styles.participantAvatar}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </section>
          </main>
        </section>
      </div>
    </>
  );
}
