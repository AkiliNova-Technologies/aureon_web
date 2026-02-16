import type { Metadata } from "next";
import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import ClientShell from "@/components/layout/ClientShell";

/* ============================
   Fonts
============================ */

const cormorant_garamond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-body",
  display: "swap",
});

/* ============================
   SEO Metadata (SERVER ONLY)
============================ */

export const metadata: Metadata = {
  metadataBase: new URL("https://aureon-store.netlify.app"),

  title: {
    default: "AUREON — Elevated Living. Thoughtfully Curated.",
    template: "%s | AUREON",
  },

  description:
    "AUREON is a premium global online store offering carefully curated products that elevate modern living through timeless design and everyday functionality.",

  keywords: [
    "premium online store",
    "modern lifestyle products",
    "designer home essentials",
    "minimalist workspace tools",
    "timeless product design",
    "global lifestyle brand",
    "curated everyday essentials",
  ],

  openGraph: {
    title: "AUREON — Elevated Living. Thoughtfully Curated.",
    description:
      "Discover a curated selection of premium products designed to enhance modern living through clarity, purpose, and timeless form.",
    url: "https://aureon-store.netlify.app",
    siteName: "AUREON",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AUREON premium lifestyle store",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AUREON",
    description:
      "Premium, thoughtfully curated products designed to elevate modern living.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* ============================
   Root Layout
============================ */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant_garamond.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-[#F5F3EF] text-[#1C1C1C] font-body">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
