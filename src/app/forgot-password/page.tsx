"use client";

import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phone.length !== 10) {
      return;
    }
    router.push("/verify-otp");
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = event.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(cleaned);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.brand}>GBZQR</div>
          <h1 className={styles.title}>Şifreni mi unuttun?</h1>
          <p className={styles.description}>
            Telefon numaranı gir, sana 6 haneli doğrulama kodu gönderelim.
          </p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="phone">
              Telefon Numarası
            </label>
            <div className={styles.inputWrapper}>
              <Phone className={styles.icon} strokeWidth={1.5} />
              <input
                className={styles.input}
                id="phone"
                type="tel"
                inputMode="numeric"
                placeholder="5XX XXX XX XX"
                required
                maxLength={10}
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
          </div>
          <button className={styles.button} type="submit">
            OTP Gönder
          </button>
        </form>

        <div className={styles.helper}>
          <Link href="/login">Giriş ekranına dön</Link>
        </div>
      </div>
    </div>
  );
}

