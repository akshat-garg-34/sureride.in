import type { MetadataRoute } from "next";
import { routes } from "@/data/routes";
import { site } from "@/data/site";

// Required for `output: "export"` — this file is emitted at build time.
export const dynamic = "force-static";

/** Generated from the same routes array the pages are — the two cannot drift apart. */
export default function sitemap(): MetadataRoute.Sitemap {
  const statics = ["", "/routes/", "/fleet/", "/fares/", "/about/", "/contact/"];

  return [
    ...statics.map((p) => ({
      url: `${site.url}${p || "/"}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...routes.map((r) => ({
      url: `${site.url}/taxi/${r.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
