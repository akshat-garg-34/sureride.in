import Link from "next/link";
import { routes } from "@/data/routes";
import { services } from "@/data/home";
import { site, waLink, addressLines } from "@/data/site";

const ColTitle = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[10px] font-semibold uppercase leading-none tracking-[0.16em] text-on-indigo-3">
    {children}
  </span>
);

export default function Footer() {
  return (
    <footer className="bg-indigo-deep pb-24 pt-14 text-on-indigo-2 lg:pb-7">
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-5 md:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div className="flex flex-col gap-3.5">
          <span className="text-2xl font-bold leading-none text-white">
            Sure<span className="text-marigold">R</span>ide
          </span>
          <p className="text-sm leading-relaxed">
            {addressLines().map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <div className="flex flex-col gap-1.5">
            <a href={site.phoneHref} className="tnum text-lg font-bold text-white no-underline">
              {site.phone}
            </a>
            <a href={waLink()} className="text-sm font-semibold text-whatsapp-soft no-underline">
              WhatsApp {site.phone}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <ColTitle>Routes</ColTitle>
          {routes.map((r) => (
            <Link key={r.slug} href={`/taxi/${r.slug}/`} className="text-sm text-on-indigo-2 no-underline hover:text-white">
              {r.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <ColTitle>Services</ColTitle>
          {services.map((s) => (
            <Link key={s.title} href="/fleet/" className="text-sm text-on-indigo-2 no-underline hover:text-white">
              {s.title}
            </Link>
          ))}
          <Link href="/fares/" className="text-sm text-on-indigo-2 no-underline hover:text-white">
            Fares &amp; charges
          </Link>
        </div>

        <div className="flex flex-col gap-3.5">
          <ColTitle>Operating area</ColTitle>
          <p className="text-sm leading-relaxed">{site.areas.join(" · ")}</p>
          <p className="hi text-[15px] font-medium leading-relaxed text-marigold">{site.triadHi}</p>
        </div>
      </div>

      <div className="mx-auto mt-9 flex w-full max-w-[1240px] flex-col gap-3 border-t border-indigo-rule px-5 pt-5 text-xs text-on-indigo-3 md:flex-row md:justify-between md:px-10">
        <span>© {new Date().getFullYear()} {site.name}. Jaipur taxi service.</span>
        <span className="italic">A family-run firm in Jaipur</span>
      </div>
    </footer>
  );
}
