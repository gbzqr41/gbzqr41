"use client";

import { KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import styles from "./page.module.css";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    if (!inputValue) {
      setOtp((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
      return;
    }

    setOtp((prev) => {
      const next = [...prev];
      next[index] = inputValue[0] ?? "";
      return next;
    });

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      event.preventDefault();
    }

    if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
      event.preventDefault();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const next = Array(6)
      .fill("")
      .map((_, i) => pasted[i] ?? "");
    setOtp(next);

    const filledLength = next.filter(Boolean).length;
    inputRefs.current[Math.min(filledLength, 5)]?.focus();
  };

  const handleVerify = () => {
    router.push("/reset-password");
  };

  const handleResend = () => {
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.brand}>GBZQR</div>
          <div className={styles.titleGroup}>
            <span className={styles.titleIcon}>
              <KeyRound size={20} strokeWidth={1.6} />
            </span>
            <h1 className={styles.title}>Doğrulama Kodu</h1>
          </div>
          <p className={styles.description}>SMS ile gelen 6 haneli kodu gir.</p>
        </header>

        <div className={styles.otpGroup}>
          {otp.map((value, index) => (
            <input
              key={index}
              className={styles.otpInput}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={handleChange(index)}
              onKeyDown={handleKeyDown(index)}
              onPaste={handlePaste}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
            />
          ))}
        </div>

        <button className={styles.button} type="button" onClick={handleVerify}>
          Doğrula
        </button>

        <div className={styles.helper}>
          Kod gelmedi mi?{" "}
          <button type="button" onClick={handleResend}>
            Yeniden gönder
          </button>
        </div>
      </div>
    </div>
  );
}

