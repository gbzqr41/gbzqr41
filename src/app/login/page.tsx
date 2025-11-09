import Link from "next/link";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <section className={styles.content}>
        <div className={styles.brand}>GBZQR</div>
        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              E-posta
            </label>
            <input
              className={styles.input}
              id="email"
              type="email"
              autoComplete="email"
              placeholder="ornek@gbzqr.com"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Şifre
            </label>
            <input
              className={styles.input}
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>
          <div className={styles.assist}>
            <Link href="/forgot-password">Şifremi Unuttum?</Link>
          </div>
          <div className={styles.actions}>
            <button className={styles.primary} type="button">
              Giriş Yap
            </button>
            <Link className={styles.secondary} href="/register">
              Kayıt Ol
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.visual} aria-hidden="true">
        <div className={styles.visualCard}>
          <h3>Dijital menülerin yeni standardı</h3>
          <p>
            Tüm sipariş platformlarını tek panelde toplayın, QR menünüzü
            saniyeler içinde güncelleyin ve işletme performansını artırın.
          </p>
        </div>
      </section>
    </div>
  );
}


