import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SureRide Jaipur Taxi Service",
    short_name: "SureRide",
    description: "Outstation, one-way, round-trip, airport and group taxi service from Jaipur.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F1EC",
    theme_color: "#1B2A6B",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
