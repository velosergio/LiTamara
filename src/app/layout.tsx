import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import { SITE_URL, site } from "./lib/site";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#c41e1e",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.title,
    template: "%s · Li Tamara",
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.legalName, url: SITE_URL }],
  creator: site.legalName,
  publisher: site.name,
  category: "art",
  applicationName: site.name,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: site.icon, type: "image/svg+xml" }],
    shortcut: site.icon,
    apple: [{ url: site.ogImage }],
  },
  openGraph: {
    type: "profile",
    locale: site.locale,
    url: SITE_URL,
    siteName: site.name,
    title: site.title,
    description: site.description,
    firstName: "Li Federica",
    lastName: "Támara Flórez",
    images: [
      {
        url: site.ogImage,
        alt: `${site.legalName}, artista plástica y visual`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [
      {
        url: site.ogImage,
        alt: `${site.legalName}, artista plástica y visual`,
      },
    ],
  },
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "llms.txt" },
        { url: "/llms-full.txt", title: "Texto completo" },
      ],
      "text/markdown": [
        { url: "/about.md", title: "Sobre la artista" },
        { url: "/obras.md", title: "Catálogo de obras" },
      ],
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
