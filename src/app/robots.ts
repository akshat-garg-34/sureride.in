import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Required for `output: "export"` — this file is emitted at build time.
export const dynamic = "force-static";

/**
 * Staging deploys (a cloudfront.net or preview URL) must never be indexed —
 * they would compete with the real domain for the same content. Set
 * NEXT_PUBLIC_NOINDEX=1 for any deploy that is not the production domain.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_NOINDEX === "1") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
