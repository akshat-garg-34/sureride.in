import type { Metadata } from "next";
import { Archivo, Noto_Sans_Devanagari } from "next/font/google";
import { site } from "@/data/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyActions from "@/components/StickyActions";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema";
import { defaultSocialImage, siteDescription, siteKeywords } from "@/lib/seo";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: `${site.name} Jaipur | Outstation Taxi & One-Way Cabs`,
    // Brand is never published bare: it always carries category + place, so the
    // page is not competing with unrelated products for the word "SureRide".
    template: `%s | ${site.name} Jaipur`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "travel",
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: site.url,
    title: `${site.name} Jaipur | Outstation Taxi & One-Way Cabs`,
    description: siteDescription,
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} Jaipur | Outstation Taxi & One-Way Cabs`,
    description: siteDescription,
    images: [{ url: defaultSocialImage.url, alt: defaultSocialImage.alt }],
  },
  robots:
    process.env.NEXT_PUBLIC_NOINDEX === "1"
      ? { index: false, follow: false, nocache: true }
      : {
          googleBot: {
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${devanagari.variable}`}>
      <body className="min-h-screen">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyActions />
      </body>
    </html>
  );
}
