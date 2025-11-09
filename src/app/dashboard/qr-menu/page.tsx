"use client";
import Image from "next/image";
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
  PlusCircle,
  Folder,
  Utensils,
  Edit3,
  Trash2,
  MoreVertical,
  Search,
  Copy,
  Palette,
} from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import layoutStyles from "../page.module.css";
import styles from "./page.module.css";

type Category = {
  id: string;
  name: string;
  productCount: number;
  subcategories: { id: string; name: string; productCount: number }[];
};

type Suggestion = {
  id: string;
  name: string;
  price: string;
  img: string;
};

type PreviewItem = {
  id: string;
  name: string;
  description: string;
  price: string;
};

type PreviewCategory = {
  id: string;
  name: string;
  items: PreviewItem[];
};

const sidebarItems = [
  { label: "Pano", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Siparişler", icon: ClipboardList, href: "/dashboard/orders" },
  { label: "Mutfak", icon: ChefHat, href: "/dashboard/kitchen" },
  { label: "QR Menü", icon: QrCode, href: "/dashboard/qr-menu", active: true },
  { label: "Raporlar", icon: BarChart, href: "/dashboard/reports" },
  { label: "Ön Muhasebe", icon: FileText, href: "/dashboard/accounting" },
  { label: "Stok", icon: Boxes, href: "/dashboard/stock" },
  { label: "Ayarlar", icon: Settings, href: "/dashboard/settings" },
  { label: "Profil", icon: User, href: "/dashboard/profile" },
];

const categories: Category[] = [
  {
    id: "cat-1",
    name: "Kahvaltı",
    productCount: 6,
    subcategories: [
      { id: "sub-1", name: "Serpme Kahvaltı", productCount: 3 },
      { id: "sub-2", name: "Omletler", productCount: 3 },
    ],
  },
  {
    id: "cat-2",
    name: "Ana Yemekler",
    productCount: 8,
    subcategories: [
      { id: "sub-3", name: "Izgaralar", productCount: 4 },
      { id: "sub-4", name: "Vejetaryen", productCount: 4 },
    ],
  },
  {
    id: "cat-3",
    name: "İçecekler",
    productCount: 5,
    subcategories: [
      { id: "sub-5", name: "Sıcak İçecekler", productCount: 2 },
      { id: "sub-6", name: "Soğuk İçecekler", productCount: 3 },
    ],
  },
];

const suggestions: Suggestion[] = [
  {
    id: "sg-1",
    name: "Trüflü Mantarlı Risotto",
    price: "₺320",
    img: "https://images.unsplash.com/photo-1543334935-6bb2fc871928?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "sg-2",
    name: "Çilekli Cheesecake",
    price: "₺150",
    img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "sg-3",
    name: "Matcha Latte",
    price: "₺95",
    img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "sg-4",
    name: "Fırınlanmış Somon",
    price: "₺280",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=60",
  },
];

const previewCategories: PreviewCategory[] = [
  {
    id: "p-cat-1",
    name: "Şefin Seçimi",
    items: [
      {
        id: "p-item-1",
        name: "Izgara Bonfile",
        description: "Kestane mantarı, demi glace sos, patates püresi ile servis edilir.",
        price: "₺340",
      },
      {
        id: "p-item-2",
        name: "Kremalı Linguine",
        description: "Trüf yağı, parmesan, taze fesleğen.",
        price: "₺260",
      },
    ],
  },
  {
    id: "p-cat-2",
    name: "Tatlılar",
    items: [
      {
        id: "p-item-3",
        name: "Lav Kek",
        description: "70% kakao, vanilyalı dondurma eşliğinde.",
        price: "₺145",
      },
    ],
  },
];

export default function QRMenuPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");
  const [activeTab, setActiveTab] = useState<"menu" | "design">("menu");
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [qrVisible, setQrVisible] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(suggestions);

  const initials = useMemo(() => {
    const name = "Ezgi Kaplan";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }, []);

  const previewToggleLabel =
    previewTheme === "light" ? "Açık Önizleme" : "Koyu Önizleme";

  const handleQrGenerate = () => {
    const url = "https://gbzqr.com/demo-menu";
    const qrSvg = encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="#111111"/><rect x="10" y="10" width="30" height="30" fill="#f9f9f9"/><rect x="80" y="10" width="30" height="30" fill="#f9f9f9"/><rect x="10" y="80" width="30" height="30" fill="#f9f9f9"/><rect x="45" y="45" width="30" height="30" fill="#f9f9f9"/><rect x="70" y="70" width="15" height="15" fill="#f9f9f9"/><rect x="35" y="70" width="10" height="10" fill="#f9f9f9"/></svg>`
    );
    setQrUrl(`data:image/svg+xml;utf8,${qrSvg}#${encodeURIComponent(url)}`);
    setQrVisible(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("https://gbzqr.com/demo-menu").then(() => {
      setToast("QR linki kopyalandı");
      setQrVisible(false);
      setTimeout(() => setToast(null), 2000);
    });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const normalized = value.trim().toLowerCase();
    if (!normalized) {
      setFilteredSuggestions(suggestions);
      return;
    }
    setFilteredSuggestions(
      suggestions.filter((item) => item.name.toLowerCase().includes(normalized)),
    );
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
              <h1>QR Menü Düzenleyici</h1>
              <p>Kategorileri oluştur, menüye ürün ekle ve sağ tarafta canlı önizlemeyi gör.</p>
            </section>
            <section className={styles.qrWrapper}>
              <div className={styles.pageHeader}>
                <div className={styles.pageIntro}>
                  <div className={styles.titleRow}>
                    <h1>QR Menü Düzenleyici</h1>
                    <div className={styles.tabs}>
                      <button
                        type="button"
                        className={clsx(styles.tabButton, activeTab === "menu" && styles.tabActive)}
                        onClick={() => setActiveTab("menu")}
                      >
                        <QrCode size={16} />
                        QR Menü
                      </button>
                      <button
                        type="button"
                        className={clsx(styles.tabButton, activeTab === "design" && styles.tabActive)}
                        onClick={() => setActiveTab("design")}
                      >
                        <Palette size={16} />
                        Tasarım & Düzenleme
                      </button>
                    </div>
                  </div>
                  <p>Kategorileri oluştur, menüye ürün ekle ve sağ tarafta canlı önizlemeyi gör.</p>
                </div>
                <div className={styles.headerActions}>
                  <button className={styles.headerCircle} type="button" onClick={() => setPreviewTheme((prev) => (prev === "light" ? "dark" : "light"))}>
                    <QrCode size={16} />
                  </button>
                  <button className={styles.headerCircle} type="button">
                    <Copy size={16} />
                  </button>
                  <button className={styles.headerActionGhost} type="button" onClick={handleQrGenerate}>
                    QR Oluştur
                  </button>
                  <button className={styles.headerActionOutline} type="button">
                    <Search size={16} />
                    Önizleme
                  </button>
                  <button className={styles.headerActionPrimary} type="button">
                    Kaydet ve Yayınla
                  </button>
                </div>
              </div>
              <div className={styles.divider} />
              <div className={styles.builderLayout}>
                <div className={styles.builderPanel}>
                  {activeTab === "menu" ? (
                    <>
                      <div className={styles.panelHeader}>
                        <h2>Kategoriler ve Alt Kategoriler</h2>
                        <button className={styles.panelButton} type="button">
                          <PlusCircle size={18} />
                          Yeni Kategori Ekle
                        </button>
                      </div>
                      <div className={styles.categoryList}>
                        {categories.map((category) => (
                          <div key={category.id} className={styles.categoryItem}>
                            <div className={styles.categoryHeader}>
                              <div className={styles.categoryTitle}>
                                <Folder size={18} />
                                <input defaultValue={category.name} />
                              </div>
                              <div className={styles.categoryActions}>
                                <span className={styles.badge}>
                                  {category.productCount} ürün
                                </span>
                                <button className={styles.iconButton} type="button">
                                  <Edit3 size={16} />
                                </button>
                                <button className={styles.iconButton} type="button">
                                  <Trash2 size={16} />
                                </button>
                                <button className={styles.iconButton} type="button">
                                  <MoreVertical size={16} />
                                </button>
                              </div>
                            </div>
                            <div className={styles.subcategories}>
                              {category.subcategories.map((subcategory) => (
                                <div key={subcategory.id} className={styles.subcategory}>
                                  <Utensils size={16} />
                                  <span>{subcategory.name}</span>
                                  <span className={styles.badge}>
                                    {subcategory.productCount} ürün
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className={styles.productBuilder}>
                        <h3>Ürün Ekle</h3>
                        <div className={styles.searchBar}>
                          <Search size={18} />
                          <input
                            placeholder="Ürün eklemek için ara..."
                            value={searchTerm}
                            onChange={(event) => handleSearch(event.target.value)}
                          />
                        </div>
                        <div className={styles.suggestions}>
                          <h4>Önerilen ürünler</h4>
                          <div className={styles.productGrid}>
                            {filteredSuggestions.map((product) => (
                              <div key={product.id} className={styles.productCard}>
                                <Image
                                  src={product.img}
                                  alt={product.name}
                                  className={styles.productImage}
                                  width={320}
                                  height={240}
                                  unoptimized
                                />
                                <div className={styles.productInfo}>
                                  <span className={styles.productName}>{product.name}</span>
                                  <span className={styles.productPrice}>{product.price}</span>
                                </div>
                              </div>
                            ))}
                            {filteredSuggestions.length === 0 && (
                              <p className={styles.empty}>Eşleşen ürün bulunamadı.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={styles.designPanel}>
                      <div className={styles.designGrid}>
                        <div className={styles.designSection}>
                          <h3>Giriş Alanı</h3>
                          <label className={styles.designField}>
                            <span>Giriş başlığı</span>
                            <select defaultValue="Plus Jakarta Sans">
                              <option>Plus Jakarta Sans</option>
                              <option>Inter</option>
                              <option>Poppins</option>
                            </select>
                          </label>
                        </div>
                        <div className={styles.designSection}>
                          <h3>Kapak Görseli</h3>
                          <label className={styles.designField}>
                            <span>Video / Görsel yükle</span>
                            <input type="file" accept="image/*,video/*" />
                          </label>
                        </div>
                        <div className={styles.designSection}>
                          <h3>Arkaplan Rengi</h3>
                          <div className={styles.colorRow}>
                            <div className={styles.colorInput}>
                              <input type="color" defaultValue="#f9f9f9" />
                              <span className={styles.colorHex}>#f9f9f9</span>
                            </div>
                            <div className={styles.colorSwatch} style={{ background: "#f9f9f9" }} />
                          </div>
                        </div>
                        <div className={styles.designSection}>
                          <h3>Metin Rengi</h3>
                          <div className={styles.colorRow}>
                            <div className={styles.colorInput}>
                              <input type="color" defaultValue="#111111" />
                              <span className={styles.colorHex}>#111111</span>
                            </div>
                            <div className={styles.colorSwatch} style={{ background: "#111111" }} />
                          </div>
                        </div>
                      </div>
                      <div className={styles.designToggle}>
                        <span>Önizleme</span>
                        <div className={styles.previewToggleGroup}>
                          <button
                            type="button"
                            className={clsx(
                              styles.previewToggleButton,
                              previewTheme === "light" && styles.previewToggleActive,
                            )}
                            onClick={() => setPreviewTheme("light")}
                          >
                            Açık
                          </button>
                          <button
                            type="button"
                            className={clsx(
                              styles.previewToggleButton,
                              previewTheme === "dark" && styles.previewToggleActive,
                            )}
                            onClick={() => setPreviewTheme("dark")}
                          >
                            Koyu
                          </button>
                        </div>
                      </div>
                      <button className={styles.designSave} type="button">
                        Kaydet Tasarımı
                      </button>
                    </div>
                  )}
                </div>
                <aside className={styles.previewPanel}>
                  <header className={styles.previewHeader}>
                    <h2>Canlı Önizleme</h2>
                    <button
                      className={styles.previewToggle}
                      type="button"
                      onClick={() =>
                        setPreviewTheme((prev) => (prev === "light" ? "dark" : "light"))
                      }
                    >
                      {previewToggleLabel}
                    </button>
                  </header>
                  <div className={styles.deviceMock} data-theme={previewTheme}>
                    <div className={styles.deviceNav}>GBZQR Menü</div>
                    <div className={styles.deviceCategories}>
                      {previewCategories.map((category) => (
                        <div key={category.id} className={styles.deviceCategory}>
                          <h3>{category.name}</h3>
                          {category.items.map((item) => (
                            <div key={item.id} className={styles.deviceItem}>
                              <div className={styles.deviceItemHeader}>
                                <span>{item.name}</span>
                                <span className={styles.deviceItemPrice}>{item.price}</span>
                              </div>
                              <p className={styles.deviceItemDescription}>
                                {item.description}
                              </p>
                            </div>
                          ))}
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
      <div
        className={styles.qrModalBackdrop}
        data-open={qrVisible}
        onClick={() => setQrVisible(false)}
      >
        {qrVisible && (
          <div
            className={styles.qrModal}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h3>Menü QR Kodunuz</h3>
            {qrUrl && (
              <Image src={qrUrl} alt="QR" width={160} height={160} unoptimized />
            )}
            <div className={styles.qrModalLink}>
              <span>https://gbzqr.com/demo-menu</span>
              <button type="button" onClick={handleCopy}>
                <Copy size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.toast} data-show={Boolean(toast)}>
        {toast && <span>{toast}</span>}
      </div>
    </>
  );
}

