"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function ResetPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.brand}>GBZQR</div>
          <h1 className={styles.title}>Yeni şifrenizi belirleyin</h1>
          <p className={styles.description}>
            Şifreniz en az 8 karakter olmalı, harf ve rakam içermeli. Güvenliğiniz için
            daha önce kullanmadığınız bir şifre seçin.
          </p>
        </header>

        {isSuccess ? (
          <div className={styles.success}>
            <h3>Şifre başarıyla değiştirildi</h3>
            <p>Yeni şifrenizle giriş yapabilirsiniz.</p>
            <Link href="/login">Giriş sayfasına dön</Link>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="newPassword">
                Yeni Şifre
              </label>
              <input
                id="newPassword"
                className={styles.input}
                type="password"
                autoComplete="new-password"
                placeholder="Yeni şifreniz"
                required
                minLength={8}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="confirmPassword">
                Şifreyi Doğrula
              </label>
              <input
                id="confirmPassword"
                className={styles.input}
                type="password"
                autoComplete="new-password"
                placeholder="Tekrar girin"
                required
                minLength={8}
              />
            </div>
            <button className={styles.button} type="submit">
              Save new password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

