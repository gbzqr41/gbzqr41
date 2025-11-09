import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://gbzqr.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GBZQR | Restoranlar için QR Menü Platformu",
    template: "%s | GBZQR",
  },
  description:
    "GBZQR ile restoranınızın dijital sipariş deneyimini güçlendirin. Yemeksepeti, Getir, Trendyol Yemek ve Migros Yemek entegrasyonları ile 7 gün ücretsiz deneyin.",
  keywords: [
    "QR menü",
    "restoran yönetimi",
    "dijital menü",
    "yemek entegrasyonu",
    "GBZQR",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "GBZQR",
    title: "GBZQR | Restoranlar için QR Menü Platformu",
    description:
      "Yemek platformları entegrasyonları ve modern QR menü deneyimiyle restoranınızı dijitalleştirin.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GBZQR | Restoranlar için QR Menü Platformu",
    description:
      "Yemeksepeti, Getir, Trendyol Yemek, Migros Yemek entegrasyonlu QR menü platformu.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GBZQR",
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
  sameAs: [
    "https://www.instagram.com/gbzqr",
    "https://www.linkedin.com/company/gbzqr",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@gbzqr.com",
    areaServed: "TR",
    availableLanguage: ["Turkish"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={plusJakarta.variable}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
