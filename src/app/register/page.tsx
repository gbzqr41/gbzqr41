"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

type Step = 0 | 1 | 2;

const stepContent = [
  {
    title: "Şirket Bilgileri",
    description: "İşletmenizi tanıyalım ve hesap başlangıç bilgilerini alalım.",
  },
  {
    title: "Kişisel Bilgiler",
    description: "Hesabınızı yönetecek kişi için temel bilgileri girin.",
  },
  {
    title: "Alt Alan Oluşturma",
    description:
      "Müşterilerinizin ziyaret edeceği benzersiz gbzqr.com adresinizi belirleyin.",
  },
];

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(0);
  const [formState, setFormState] = useState({
    companyName: "",
    taxNumber: "",
    phone: "",
    fullName: "",
    email: "",
    password: "",
    subdomain: "",
  });

  const progressWidth = useMemo(() => `${((step + 1) / stepContent.length) * 100}%`, [step]);

  const handleNext = () => {
    setStep((prev) => (prev < 2 ? ((prev + 1) as Step) : prev));
  };

  const handlePrev = () => {
    setStep((prev) => (prev > 0 ? ((prev - 1) as Step) : prev));
  };

  const handleChange =
    (key: keyof typeof formState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [key]: event.target.value }));
    };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <aside className={styles.aside}>
          <div>
            <div className={styles.brand}>GBZQR</div>
            <h3>Dijital menülerinizi dakikalar içinde yayına alın</h3>
            <p>
              Entegrasyonlu QR menü, sipariş yönetimi ve finansal takip modülleriyle
              operasyonlarınızı tek panelde toplayın.
            </p>
          </div>
          <div className={styles.progress}>
            <span className={styles.progressLabel}>{step + 1} / 3</span>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: progressWidth }} />
            </div>
          </div>
        </aside>

        <main className={styles.main}>
          <div className={styles.stepTitle}>
            <h1>{stepContent[step].title}</h1>
            <p>{stepContent[step].description}</p>
          </div>

          <form className={styles.form}>
            {step === 0 && (
              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="companyName">
                    Firma Adı
                  </label>
                  <input
                    id="companyName"
                    className={styles.input}
                    type="text"
                    placeholder="Örnek Restoran"
                    value={formState.companyName}
                    onChange={handleChange("companyName")}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="taxNumber">
                    Vergi No
                  </label>
                  <input
                    id="taxNumber"
                    className={styles.input}
                    type="text"
                    inputMode="numeric"
                    placeholder="1234567890"
                    value={formState.taxNumber}
                    onChange={handleChange("taxNumber")}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="phone">
                    Telefon
                  </label>
                  <input
                    id="phone"
                    className={styles.input}
                    type="tel"
                    placeholder="+90 5xx xxx xx xx"
                    value={formState.phone}
                    onChange={handleChange("phone")}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="fullName">
                    İsim Soyisim
                  </label>
                  <input
                    id="fullName"
                    className={styles.input}
                    type="text"
                    placeholder="Adınız Soyadınız"
                    value={formState.fullName}
                    onChange={handleChange("fullName")}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">
                    E-posta
                  </label>
                  <input
                    id="email"
                    className={styles.input}
                    type="email"
                    autoComplete="email"
                    placeholder="ornek@gbzqr.com"
                    value={formState.email}
                    onChange={handleChange("email")}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="password">
                    Şifre
                  </label>
                  <input
                    id="password"
                    className={styles.input}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Güçlü bir şifre seçin"
                    value={formState.password}
                    onChange={handleChange("password")}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.subdomain}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="subdomain">
                    Alt Alan Adı
                  </label>
                  <input
                    id="subdomain"
                    className={styles.input}
                    type="text"
                    placeholder="firmaniz"
                    value={formState.subdomain}
                    onChange={handleChange("subdomain")}
                  />
                </div>
                <div className={styles.domainPreview}>
                  gbzqr.com/{formState.subdomain || "firmaniz"}
                </div>
              </div>
            )}
          </form>

          <div className={styles.nav}>
            <Link className={styles.ghost} href="/login">
              Zaten hesabım var
            </Link>
            <div className={styles.navButtons}>
              <button
                className={styles.ghost}
                type="button"
                onClick={handlePrev}
                disabled={step === 0}
                style={step === 0 ? { opacity: 0.4, pointerEvents: "none" } : undefined}
              >
                Geri
              </button>
              {step < 2 ? (
                <button className={styles.primary} type="button" onClick={handleNext}>
                  Sonraki
                </button>
              ) : (
                <button className={styles.primary} type="button">
                  Kayıt Ol
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


