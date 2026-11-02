import { site } from "@/data/site";
import type { Route } from "@/data/routes";
import { publicRouteFaqs, publishing } from "@/lib/publishing";
import { siteDescription } from "@/lib/seo";

/** Renders a JSON-LD block. Next inlines this into the static HTML. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Only the address fields that actually have a value — no invented ones. */
const postalAddress = Object.fromEntries(
  Object.entries({
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  }).filter(([, v]) => v),
);

/**
 * Declares the business as its own entity. `alternateName` helps distinguish
 * SureRide-the-Jaipur-cab-company from unrelated products with the same name.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: "SureRide Jaipur",
    ...(site.legalName ? { legalName: site.legalName } : {}),
    url: site.url,
    description: siteDescription,
    logo: `${site.url}/icon.png`,
    image: `${site.url}/opengraph-image.png`,
    telephone: site.phone,
    address: postalAddress,
    areaServed: site.areas.map((n) => ({ "@type": "AdministrativeArea", name: n })),
    slogan: site.triad.join(" · "),
    knowsLanguage: ["Hindi", "English"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "reservations and customer support",
      availableLanguage: ["Hindi", "English"],
      areaServed: "IN",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "06:00",
        closes: "23:00",
      },
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    alternateName: "SureRide Jaipur",
    description: siteDescription,
    inLanguage: ["en-IN", "hi-IN"],
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function webPageSchema({
  name,
  description,
  path,
  type = "WebPage",
}: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${site.url}${path}#webpage`,
    url: `${site.url}${path}`,
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
  };
}

export function routesListSchema(routes: Route[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SureRide taxi routes",
    numberOfItems: routes.length,
    itemListElement: routes.map((route, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${site.url}/taxi/${route.slug}/`,
      name: route.h1,
    })),
  };
}

export function routeSchema(route: Route) {
  const faqs = publicRouteFaqs(route.faqs);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${site.url}/taxi/${route.slug}/#service`,
        url: `${site.url}/taxi/${route.slug}/`,
        serviceType: "Taxi service",
        name: route.h1,
        description: `${route.h1} - ${route.sub}`,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: site.areas.map((n) => ({ "@type": "AdministrativeArea", name: n })),
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${site.url}/contact/`,
          servicePhone: {
            "@type": "ContactPoint",
            telephone: site.phone,
            contactType: "reservations",
            availableLanguage: ["Hindi", "English"],
          },
        },
        ...(publishing.faresConfirmed
          ? {
              offers: route.fares.map((f) => ({
                "@type": "Offer",
                name: `${route.label} — ${f.veh}`,
                priceCurrency: "INR",
                price: f.one.replace(/[^\d]/g, ""),
                availability: "https://schema.org/InStock",
              })),
            }
          : {}),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Routes", item: `${site.url}/routes/` },
          {
            "@type": "ListItem",
            position: 3,
            name: route.crumb,
            item: `${site.url}/taxi/${route.slug}/`,
          },
        ],
      },
    ],
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
