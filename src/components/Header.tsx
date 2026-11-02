import Link from "next/link";
import { site, nav, waLink } from "@/data/site";
import SosButton from "@/components/SosButton";

const Wordmark = ({ size = "desktop" }: { size?: "desktop" | "mobile" }) => (
  <Link href="/" className="flex flex-col gap-0.5 text-white no-underline">
    <span
      className={`font-bold leading-none tracking-[-0.015em] ${
        size === "desktop" ? "text-[27px]" : "text-[19px]"
      }`}
    >
      Sure<span className="text-marigold">R</span>ide
    </span>
    <span
      className={`font-medium uppercase leading-none text-on-indigo ${
        size === "desktop" ? "text-[9.5px] tracking-[0.16em]" : "text-[8.5px] tracking-[0.14em]"
      }`}
    >
      {site.descriptor}
    </span>
  </Link>
);

export default function Header() {
  return (
    <header className="bg-indigo text-white">
      {/* Mobile */}
      <div className="flex items-center justify-between gap-2.5 px-3.5 py-2.5 lg:hidden">
        <Wordmark size="mobile" />
        <div className="flex items-center gap-1.5">
          <a
            href={site.phoneHref}
            className="rounded-[3px] bg-marigold px-2.5 py-2.5 text-xs font-bold leading-none text-ink"
          >
            Call
          </a>
          <a
            href={waLink()}
            className="rounded-[3px] bg-whatsapp px-2.5 py-2.5 text-xs font-bold leading-none text-white"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <nav
        className="flex gap-5 overflow-x-auto border-t border-indigo-line px-3.5 py-2.5 lg:hidden"
        aria-label="Main"
      >
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="shrink-0 whitespace-nowrap text-xs font-semibold text-on-indigo-2 no-underline"
          >
            {n.label}
          </Link>
        ))}
      </nav>

      {/* Desktop */}
      <div className="mx-auto hidden h-[76px] w-full max-w-[1240px] items-center justify-between gap-5 px-10 lg:flex">
        <Wordmark />
        <nav className="flex min-w-0 shrink items-center gap-4 xl:gap-6" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="whitespace-nowrap text-sm font-semibold text-white no-underline hover:text-marigold"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2.5">
          <a href={site.phoneHref} className="flex shrink-0 flex-col gap-0.5 no-underline">
            <span className="whitespace-nowrap text-[9.5px] font-semibold uppercase leading-none tracking-[0.14em] text-on-indigo">
              Call SureRide
            </span>
            <span className="tnum whitespace-nowrap text-[17px] font-bold leading-none text-white">{site.phone}</span>
          </a>
          <a
            href={waLink()}
            className="whitespace-nowrap rounded-[3px] bg-whatsapp px-3.5 py-3 text-sm font-bold leading-none text-white"
          >
            WhatsApp
          </a>
          <SosButton />
        </div>
      </div>
    </header>
  );
}
