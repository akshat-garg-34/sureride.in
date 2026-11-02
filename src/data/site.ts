// Business details.
//
// The registration fields below are intentionally EMPTY. The values that were
// here came from the design mock, not from the client, and publishing an
// invented GSTIN or transport permit is a legal problem rather than a typo.
// Fill any of them in with a real value and it appears on the site again —
// the footer, About and Contact pages all render these conditionally.

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL at build time — every canonical
 * tag, the sitemap and every og:image URL are built from it, so a wrong value
 * here is wrong sitewide. The fallback only exists so local dev works.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sureride.in"
).replace(/\/$/, "");

export const site = {
  name: "SureRide",
  descriptor: "Fixed fare. Named driver.",
  triad: ["Sure fare", "Sure driver", "Sure time"],
  triadHi: "किराया पक्का। ड्राइवर पक्का। टाइम पक्का।",
  url: SITE_URL,

  phone: "+91 94142 88199",
  phoneHref: "tel:+919414288199",
  whatsapp: "919414288199",
  hours: "6 am to 11 pm, every day including festivals",

  // --- Fill these in when the client supplies them -------------------------
  legalName: "", // registered entity name
  gstin: "",
  permit: "", // tourist vehicle permit number
  rto: "", // e.g. "Jaipur — RJ 14"
  address: {
    street: "", // e.g. "Plot 14, Transport Nagar"
    postalCode: "",
    city: "Jaipur",
    region: "Rajasthan",
    country: "IN",
  },
  // ------------------------------------------------------------------------

  areas: ["Rajasthan", "Delhi NCR", "Haryana", "Uttar Pradesh"],
} as const;

/** Street + postcode only once they exist; otherwise just the city. */
export const addressLines = (): string[] => {
  const { street, postalCode, city, region } = site.address;
  const tail = [city, postalCode].filter(Boolean).join(" ");
  return [street, [tail, region].filter(Boolean).join(", ")].filter(Boolean);
};

/**
 * Registration rows that actually have a value. Empty until the client supplies
 * real numbers, at which point the About page card renders itself.
 */
export const registrationRows = (): { k: string; v: string }[] =>
  [
    { k: "Registered name", v: site.legalName },
    { k: "GSTIN", v: site.gstin },
    { k: "Tourist permit", v: site.permit },
    { k: "RTO", v: site.rto },
  ].filter((r) => r.v);

/** Deep link into WhatsApp with the route pre-filled. */
export const waLink = (message?: string) =>
  `https://wa.me/${site.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const nav = [
  { href: "/routes/", label: "Routes" },
  { href: "/fleet/", label: "Fleet" },
  { href: "/fares/", label: "Fares" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];
