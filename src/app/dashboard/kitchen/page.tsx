"use client";

import type { LucideIcon } from "lucide-react";
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
  CookingPot,
  Flame,
  Timer,
  ListOrdered,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import layoutStyles from "../page.module.css";
import styles from "./page.module.css";

type KitchenStatus = "Hazırlanıyor" | "Pişiyor" | "Servise Hazır";

type KitchenTicket = {
  id: string;
  status: KitchenStatus;
  table: string;
  order: string;
  items: string[];
  notes: string;
  chef: string;
  elapsed: string;
};

const sidebarItems = [
  { label: "Pano", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Siparişler", icon: ClipboardList, href: "/dashboard/orders" },
  { label: "Mutfak", icon: ChefHat, href: "/dashboard/kitchen", active: true },
  { label: "QR Menü", icon: QrCode, href: "/dashboard/qr-menu" },
  { label: "Raporlar", icon: BarChart, href: "/dashboard/reports" },
  { label: "Ön Muhasebe", icon: FileText, href: "/dashboard/accounting" },
  { label: "Stok", icon: Boxes, href: "/dashboard/stock" },
  { label: "Ayarlar", icon: Settings, href: "/dashboard/settings" },
  { label: "Profil", icon: User, href: "/dashboard/profile" },
];

const kitchenTickets: KitchenTicket[] = [
  {
    id: "kt-001",
    status: "Hazırlanıyor",
    table: "Masa 8",
    order: "Izgara Köfte Menü",
    items: ["Izgara Köfte", "Patates Püresi", "Mevsim Salata"],
    notes: "Sos kenarda, acısız",
    chef: "Emre",
    elapsed: "06 dk",
  },
  {
    id: "kt-002",
    status: "Hazırlanıyor",
    table: "Masa 3",
    order: "Vegan Bowl",
    items: ["Kinoa", "Fırın Sebze", "Humus"],
    notes: "Tahinsiz",
    chef: "Selin",
    elapsed: "04 dk",
  },
  {
    id: "kt-003",
    status: "Pişiyor",
    table: "Getir #4581",
    order: "Margarita Pizza",
    items: ["İnce Hamur", "Buffalo Mozzarella", "Taze Fesleğen"],
    notes: "Ekstra peynir",
    chef: "Murat",
    elapsed: "09 dk",
  },
  {
    id: "kt-004",
    status: "Pişiyor",
    table: "Yemeksepeti #9214",
    order: "Dana Rosto",
    items: ["Dana Rosto", "Patates Gratin"],
    notes: "Sos ekstra",
    chef: "Ece",
    elapsed: "11 dk",
  },
  {
    id: "kt-005",
    status: "Servise Hazır",
    table: "Masa 12",
    order: "Günün Çorbası",
    items: ["Kabak Çorbası", "Izgara Ekmek"],
    notes: "Masaya servis",
    chef: "Emre",
    elapsed: "14 dk",
  },
  {
    id: "kt-006",
    status: "Servise Hazır",
    table: "Trendyol #7320",
    order: "Tavuk Fajita",
    items: ["Tavuk Fajita", "Tortilla", "Guacamole"],
    notes: "Paket hazırlanıyor",
    chef: "Selin",
    elapsed: "12 dk",
  },
];

const statusOrder: KitchenStatus[] = ["Hazırlanıyor", "Pişiyor", "Servise Hazır"];

const statusIcons: Record<KitchenStatus, LucideIcon> = {
  Hazırlanıyor: CookingPot,
  Pişiyor: Flame,
  "Servise Hazır": Timer,
};

export default function KitchenPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedTicket, setSelectedTicket] = useState<KitchenTicket | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const initials = useMemo(() => {
    const name = "Ezgi Kaplan";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }, []);

  const groupedTickets = useMemo(
    () =>
      statusOrder.map((status) => ({
        status,
        tickets: kitchenTickets.filter((ticket) => ticket.status === status),
      })),
    [],
  );

  useEffect(() => {
    if (!selectedTicket) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedTicket(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedTicket]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleComplete = () => {
    if (selectedTicket) {
      setToast(`${selectedTicket.table} siparişi servise iletildi`);
      setSelectedTicket(null);
    }
  };

  const handleHold = () => {
    if (selectedTicket) {
      setToast(`${selectedTicket.table} siparişi beklemeye alındı`);
      setSelectedTicket(null);
    }
  };

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
            <section className={layoutStyles.welcome}>
              <h1>Mutfak Paneli</h1>
              <p>Hazırlık, pişirme ve servis adımlarındaki siparişleri kolayca yönetin.</p>
            </section>
            <section className={styles.kitchenWrapper}>
              <div className={styles.boardHeader}>
                <h2>Hazırlık Süreçleri</h2>
                <p>Toplam {kitchenTickets.length} aktif mutfak bileti</p>
              </div>
              <div className={styles.stations}>
                {groupedTickets.map((group) => {
                  const Icon = statusIcons[group.status];
                  return (
                    <div key={group.status} className={styles.station}>
                      <div className={styles.stationTitle}>
                        <span>
                          <Icon size={18} style={{ marginRight: "0.5rem" }} />
                          {group.status}
                        </span>
                        <span className={styles.stationBadge}>{group.tickets.length}</span>
                      </div>
                      {group.tickets.map((ticket) => (
                        <article
                          key={ticket.id}
                          className={styles.card}
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <div className={styles.cardHeader}>
                            <span className={styles.cardIcon}>
                              <CookingPot size={18} />
                            </span>
                            <div>
                              <h3 className={styles.cardTitle}>{ticket.order}</h3>
                              <span className={styles.ticket}>{ticket.table} • {ticket.elapsed}</span>
                            </div>
                          </div>
                          <div className={styles.cardRow}>
                            <ListOrdered className={styles.cardRowIcon} />
                            <span>{ticket.items.join(", ")}</span>
                          </div>
                          <div className={styles.cardRow}>
                            <FileText className={styles.cardRowIcon} />
                            <span>{ticket.notes}</span>
                          </div>
                          <div className={styles.tags}>
                            <span className={styles.tag}>Şef: {ticket.chef}</span>
                            <span className={styles.tag}>{ticket.status}</span>
                          </div>
                        </article>
                      ))}
                      {group.tickets.length === 0 && (
                        <p className={styles.empty}>Bu adımda bekleyen sipariş yok.</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </main>
        </section>
      </div>

      <div
        className={styles.modalBackdrop}
        data-open={Boolean(selectedTicket)}
        onClick={() => setSelectedTicket(null)}
        aria-hidden={!selectedTicket}
      >
        {selectedTicket && (
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalSection}>
              <span className={styles.modalIcon}>
                <CookingPot size={20} />
              </span>
              <div className={styles.modalText}>
                <span className={styles.modalLabel}>Sipariş</span>
                <span className={styles.modalValue}>{selectedTicket.order}</span>
                <span className={styles.ticket}>{selectedTicket.table}</span>
              </div>
            </div>
            <div className={styles.modalSection}>
              <span className={styles.modalIcon}>
                <ListOrdered size={20} />
              </span>
              <div className={styles.modalText}>
                <span className={styles.modalLabel}>İçerik</span>
                <div className={styles.modalItems}>
                  {selectedTicket.items.map((item) => (
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
                <span className={styles.modalLabel}>Not</span>
                <span>{selectedTicket.notes}</span>
              </div>
            </div>
            <div className={styles.modalSection}>
              <span className={styles.modalIcon}>
                <Clock size={20} />
              </span>
              <div className={styles.modalText}>
                <span className={styles.modalLabel}>Geçen Süre</span>
                <span>{selectedTicket.elapsed}</span>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button
                type="button"
                className={clsx(styles.modalButton, styles.modalAccept)}
                onClick={handleComplete}
              >
                <CheckCircle size={18} />
                Servise Gönder
              </button>
              <button
                type="button"
                className={clsx(styles.modalButton, styles.modalReject)}
                onClick={handleHold}
              >
                <XCircle size={18} />
                Beklet
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

