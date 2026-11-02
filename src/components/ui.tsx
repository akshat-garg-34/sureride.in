import { images, hasImage } from "@/data/images";
import Link from "next/link";
import { site, waLink } from "@/data/site";
import { publishing } from "@/lib/publishing";

export const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-[1240px] px-5 md:px-10 ${className}`}>{children}</div>
);

export const H1 = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h1 className={`text-balance font-extrabold tracking-[-0.025em] leading-[1.08] text-[clamp(1.9rem,5vw,2.875rem)] ${className}`}>
    {children}
  </h1>
);

export const H2 = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`font-extrabold tracking-[-0.02em] leading-[1.12] text-[clamp(1.5rem,3.5vw,2.125rem)] ${className}`}>
    {children}
  </h2>
);

export const Eyebrow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${className}`}>{children}</span>
);

export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`border border-line bg-white ${className}`}>{children}</div>
);

/** Diagonal hatch standing in for a photograph the client has yet to supply. */
export const Photo = ({
  src,
  alt,
  label,
  className = "",
  tone = "light",
  sizes = "100vw",
  priority = false,
  scrim,
}: {
  /** Path under /public without extension, e.g. "photos/fleet/dzire-wide". */
  src?: string;
  alt?: string;
  /** Shown in the placeholder when the photo has not been supplied yet. */
  label: string;
  className?: string;
  tone?: "light" | "dark";
  sizes?: string;
  priority?: boolean;
  scrim?: "none" | "bottom" | "left";
}) => {
  // Nothing supplied for this slot yet — keep the hatch placeholder rather than
  // shipping a broken <img>. Dropping the file in and re-running `npm run
  // images` is all it takes for the real photo to appear.
  const photoCategoryApproved = src?.startsWith("photos/drivers/")
    ? publishing.driverPhotosApproved
    : publishing.sitePhotosApproved;

  if (!photoCategoryApproved || !hasImage(src)) {
    const status = "Photo coming soon";
    return (
      <div
        className={`flex items-end p-3 ${tone === "dark" ? "ph-dark" : "ph-light"} ${className}`}
        role="img"
        aria-label={`${status}: ${label}`}
      >
        <span
          className={`font-mono text-[9.5px] uppercase leading-snug tracking-[0.06em] ${
            tone === "dark" ? "text-[#a8aec9]" : "text-[#6b6255]"
          }`}
        >
          {status}
        </span>
      </div>
    );
  }

  const entry = images[src];
  const srcSet = (ext: string) => entry.widths.map((w) => `/${src}-${w}.${ext} ${w}w`).join(", ");
  const veil = scrim ?? (tone === "dark" ? "bottom" : "none");

  // The img and scrim are positioned against this wrapper, so it must be a
  // positioned ancestor — but callers sometimes position it themselves (the
  // hero passes `absolute inset-0`). Emitting both would leave Tailwind to
  // resolve `relative` vs `absolute` by stylesheet order, which is a coin flip.
  const selfPositioned = /\b(absolute|fixed|sticky)\b/.test(className);

  return (
    <div className={`${selfPositioned ? "" : "relative"} overflow-hidden ${className}`}>
      <picture>
        {/* AVIF first, WebP next, the original JPEG as the last resort. */}
        <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
        <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
        <img
          src={`/${src}.jpg`}
          alt={alt ?? ""}
          width={entry.w}
          height={entry.h}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : undefined}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {veil !== "none" && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 ${
            veil === "left"
              ? "bg-[linear-gradient(100deg,rgba(16,21,48,.88)_0%,rgba(16,21,48,.72)_45%,rgba(16,21,48,.34)_100%)]"
              : "bg-[linear-gradient(to_top,rgba(16,21,48,.78)_0%,rgba(16,21,48,.15)_55%,rgba(16,21,48,.05)_100%)]"
          }`}
        />
      )}
    </div>
  );
};

export const CallButton = ({ className = "" }: { className?: string }) => (
  <a
    href={site.phoneHref}
    className={`tnum block bg-marigold px-4 py-4 text-center text-[19px] font-extrabold text-ink transition-opacity hover:opacity-90 ${className}`}
  >
    {site.phone}
  </a>
);

export const WhatsAppButton = ({
  label = "WhatsApp us",
  message,
  className = "",
}: {
  label?: string;
  message?: string;
  className?: string;
}) => (
  <a
    href={waLink(message)}
    className={`block bg-whatsapp px-4 py-3.5 text-center text-base font-bold text-white transition-opacity hover:opacity-90 ${className}`}
  >
    {label}
  </a>
);

/** The Sure fare · Sure driver · Sure time band. */
export const TriadBar = ({ compact = false }: { compact?: boolean }) => (
  <div className={`bg-indigo text-white ${compact ? "px-4 py-3.5" : "py-5"}`}>
    <div className={compact ? "" : "mx-auto w-full max-w-[1240px] px-5 md:px-10"}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 md:gap-x-6">
          {site.triad.map((t, i) => (
            <span key={t} className="flex items-center gap-3">
              {i > 0 && <span className="text-marigold" aria-hidden="true">·</span>}
              <span className={`font-bold tracking-[-0.01em] ${compact ? "text-base" : "text-lg md:text-[22px]"}`}>{t}</span>
            </span>
          ))}
        </div>
        <span className={`hi font-medium text-marigold ${compact ? "text-sm" : "text-[15px] md:text-[17px]"}`}>
          {site.triadHi}
        </span>
      </div>
    </div>
  </div>
);

export const RouteCard = ({ slug, title, km, price }: { slug: string; title: string; km: string; price?: string }) => (
  <Link
    href={`/taxi/${slug}/`}
    className="flex flex-col gap-3.5 border border-line bg-white p-[18px] text-ink transition-colors hover:border-marigold"
  >
    <div className="h-1.5 w-[34px] rounded-t-full bg-marigold" />
    <div className="flex flex-col gap-1">
      <span className="text-[19px] font-bold leading-tight tracking-[-0.01em]">{title}</span>
      <span className="tnum text-[13px] font-medium text-muted">{km}</span>
    </div>
    {price && (
      <div className="mt-auto flex items-baseline gap-1.5">
        <span className="text-xs font-medium text-muted">from</span>
        <span className="tnum text-2xl font-extrabold tracking-[-0.02em]">{price}</span>
      </div>
    )}
  </Link>
);
