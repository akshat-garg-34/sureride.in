import type { Metadata } from "next";
import { site } from "@/data/site";

export const siteDescription =
  "SureRide is a Jaipur taxi service for outstation, one-way, round-trip, airport and group travel across Rajasthan, Delhi NCR, Haryana and Uttar Pradesh.";

export const siteKeywords = [
  "taxi service in Jaipur",
  "Jaipur taxi service",
  "outstation taxi Jaipur",
  "one way taxi Jaipur",
  "Jaipur airport taxi",
  "Rajasthan taxi service",
  "Tempo Traveller Jaipur",
  "SureRide Jaipur",
];

export type SocialImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
  type?: string;
};

export const defaultSocialImage: SocialImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "SureRide Jaipur taxi service - fixed fare and named driver",
  type: "image/png",
};

type SeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: SocialImage;
  absoluteTitle?: boolean;
};

/**
 * Keeps canonical, Open Graph and Twitter metadata synchronized. Page titles
 * remain short; the root layout adds the SureRide Jaipur suffix on inner pages.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  image = defaultSocialImage,
  absoluteTitle = false,
}: SeoInput): Metadata {
  const canonical = path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
  const socialTitle = absoluteTitle ? title : `${title} | ${site.name} Jaipur`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...new Set([...keywords, ...siteKeywords])],
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      title: socialTitle,
      description,
      url: canonical,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
