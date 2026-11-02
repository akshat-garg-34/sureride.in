import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routes, routeBySlug } from "@/data/routes";
import { site, waLink } from "@/data/site";
import FareTable from "@/components/FareTable";
import { Wrap, H1, H2, Card, Photo, TriadBar } from "@/components/ui";
import { JsonLd, routeSchema } from "@/lib/schema";
import { publicRouteFaqs, publicRouteProse, publishing } from "@/lib/publishing";
import { buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return routes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const route = routeBySlug(slug);
  if (!route) return {};
  const description = `${route.h1}: ${route.sub}. Get a written quote from SureRide Jaipur.`;
  return buildMetadata({
    title: route.h1,
    description,
    path: `/taxi/${route.slug}/`,
    keywords: [
      `${route.crumb} taxi`,
      `${route.crumb} cab`,
      `${route.crumb} one way taxi`,
      `${route.crumb} taxi fare`,
      `${route.crumb} distance`,
    ],
    // Per-route share card - route links are the most-shared surface.
    image: {
      url: `/og/${route.slug}.png`,
      width: 1200,
      height: 630,
      alt: route.h1,
      type: "image/png",
    },
  });
}

export default async function RoutePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const route = routeBySlug(slug);
  if (!route) notFound();

  const waMessage = `Namaste, I want to book ${route.crumb}. Please send the fare.`;
  const faqs = publicRouteFaqs(route.faqs);
  const prose = publicRouteProse(route.prose);

  return (
    <>
      <JsonLd data={routeSchema(route)} />

      <nav aria-label="Breadcrumb" className="border-b border-line bg-white">
        <Wrap className="py-2.5">
          <ol className="flex flex-wrap gap-1.5 text-[12.5px] text-faint">
            <li><Link href="/" className="text-faint no-underline hover:text-ink">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li><Link href="/routes/" className="text-faint no-underline hover:text-ink">Routes</Link></li>
            <li aria-hidden="true">›</li>
            <li className="font-semibold text-ink" aria-current="page">{route.crumb}</li>
          </ol>
        </Wrap>
      </nav>

      <Wrap className="pt-8 lg:pt-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
          {/* Main column */}
          <div>
            <H1 className="mb-2.5">{route.h1}</H1>
            <p className="tnum mb-5 text-[17px] font-medium leading-relaxed text-muted-2 lg:text-[19px]">
              {route.sub}
            </p>

            <TriadBar compact />

            <H2 className="mb-3 mt-9">
              {publishing.faresConfirmed ? "Fares for this route" : "Get the fare in writing"}
            </H2>
            {publishing.faresConfirmed ? (
              <FareTable fares={route.fares} routeLabel={route.crumb} />
            ) : (
              <div className="border-l-4 border-marigold bg-cream px-5 py-5">
                <p className="text-base font-bold leading-relaxed">
                  Request the current fare for your travel date and vehicle.
                </p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted-2">
                  Send the date, pickup point, passenger count and trip type. The written quote will
                  identify the vehicle and state whether toll, parking, state tax, driver allowance
                  or requested detours are additional.
                </p>
              </div>
            )}

            <H2 className="mb-3 mt-11">{route.driveHeading}</H2>
            <div className="flex max-w-[720px] flex-col gap-3.5">
              {prose.map((p, i) => (
                <p key={i} className="text-base leading-[1.7] text-body">{p.text}</p>
              ))}
            </div>

            <H2 className="mb-4 mt-11">{route.stopsHeading}</H2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {route.stops.map((s) => (
                <Card key={s.name} className="overflow-hidden">
                  <Photo
                    src={`photos/stops/${s.slug}`}
                    alt={s.name}
                    label="real photo of stop"
                    sizes="(min-width:1024px) 250px, (min-width:640px) 45vw, 90vw"
                    className="h-[110px]"
                  />
                  <div className="flex flex-col gap-1.5 p-4">
                    <span className="text-lg font-bold leading-tight">{s.name}</span>
                    <span className="tnum text-[13px] font-medium text-faint">{s.km}</span>
                    <span className="text-sm leading-relaxed text-muted">{s.note}</span>
                  </div>
                </Card>
              ))}
            </div>

            {faqs.length > 0 && (
              <>
                <H2 className="mb-4 mt-11">Questions we get asked</H2>
                <div className="flex flex-col gap-px border border-line bg-line">
                  {faqs.map((f) => (
                    <div key={f.q} className="flex flex-col gap-1.5 bg-white px-5 py-5">
                      <span className="text-lg font-bold leading-snug">{f.q}</span>
                      <span className="text-[15px] leading-relaxed text-muted-2">{f.a}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Hidden until real reviews exist — see scripts/reviews.config.mjs. */}
            {route.reviews.length > 0 && (
              <>
            <H2 className="mb-4 mt-11">From passengers on this route</H2>
            <div className="grid gap-4 sm:grid-cols-2">
              {route.reviews.map((v) => (
                <Card key={v.name} className="flex flex-col gap-3 p-5">
                  <span className="text-[15px] font-semibold tracking-[0.14em] text-marigold" aria-label="5 out of 5">
                    ★★★★★
                  </span>
                  <p className="text-[15px] leading-relaxed text-body">{v.text}</p>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold">{v.name}</span>
                    <span className="text-[12.5px] text-faint">{v.meta}</span>
                  </div>
                </Card>
              ))}
            </div>
              </>
            )}

            <H2 className="mb-4 mt-11">Related routes</H2>
            <div className="grid gap-3.5 pb-16 sm:grid-cols-2 lg:grid-cols-4">
              {route.related.map((r) =>
                r.exists ? (
                  <Link
                    key={r.slug}
                    href={`/taxi/${r.slug}/`}
                    className="flex flex-col gap-1 border border-line bg-white p-4 text-ink no-underline transition-colors hover:border-marigold"
                  >
                    <span className="text-base font-bold leading-tight">{r.title}</span>
                    <span className="tnum text-[13px] font-medium text-faint">{r.km}</span>
                  </Link>
                ) : (
                  /* Not built yet — send the enquiry to WhatsApp rather than a dead link. */
                  <a
                    key={r.slug}
                    href={waLink(`Namaste, do you run ${r.title}? Please send the fare.`)}
                    className="flex flex-col gap-1 border border-dashed border-line bg-white p-4 text-ink no-underline hover:border-whatsapp"
                  >
                    <span className="text-base font-bold leading-tight">{r.title}</span>
                    <span className="tnum text-[13px] font-medium text-faint">{r.km} · ask on WhatsApp</span>
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Booking rail */}
          <aside className="flex flex-col gap-4 lg:sticky lg:top-5">
            <Card className="overflow-hidden">
              <Photo
                src={`photos/routes/${route.slug}`}
                alt={route.photoLabel.replace(/^real fleet photo — /, "")}
                label={route.photoLabel}
                tone="dark"
                sizes="(min-width:1024px) 420px, 100vw"
                className="h-[150px]"
              />
              <div className="flex flex-col gap-3.5 p-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[22px] font-bold leading-tight tracking-[-0.01em]">{route.bookHeading}</span>
                  <span className="text-sm leading-relaxed text-muted">
                    Tell us the date and pickup address. We will send the quote in writing.
                  </span>
                </div>
                <a href={site.phoneHref} className="flex flex-col gap-1 bg-indigo px-4 py-3.5 text-white no-underline">
                  <span className="text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-on-indigo">
                    {route.callLabel}
                  </span>
                  <span className="tnum text-[22px] font-extrabold leading-none">{site.phone}</span>
                </a>
                <a
                  href={waLink(waMessage)}
                  className="bg-whatsapp px-4 py-4 text-center text-base font-bold text-white no-underline"
                >
                  {route.waLabel}
                </a>
                <div className="flex flex-col gap-1.5 border-t border-line-soft pt-3">
                  {[
                    "Fixed fare, quoted in writing",
                    "Driver's name and number before pickup",
                    "Vehicle and trip details included",
                  ].map((t) => (
                    <span key={t} className="text-[13px] font-semibold leading-snug text-body">✓ {t}</span>
                  ))}
                </div>
              </div>
            </Card>

            <div className="flex flex-col gap-1.5 border border-cream-line bg-cream px-5 py-4">
              <span className="text-base font-bold leading-snug">Hindi mein baat karein</span>
              <span className="hi text-[15px] font-medium leading-relaxed text-body">
                फोन पर हिंदी में बात कीजिए। बुकिंग से पहले लिखित किराया माँगिए।
              </span>
            </div>
          </aside>
        </div>
      </Wrap>
    </>
  );
}
