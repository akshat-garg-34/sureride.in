import { site, registrationRows } from "@/data/site";
import { Wrap, H1, H2, Card, Photo } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "About SureRide - Jaipur Taxi Service",
  description:
    "Learn how SureRide Jaipur confirms the route, vehicle, driver details and applicable charges in writing before an outstation taxi booking.",
  path: "/about/",
  keywords: ["about SureRide Jaipur", "Jaipur taxi company", "family run taxi service Jaipur"],
});

const PROOFS = [
  { title: "Vehicle confirmed", label: "The vehicle type and passenger capacity are written into the quote." },
  { title: "Driver details shared", label: "The assigned driver's name and phone number are sent before pickup." },
  { title: "One contact number", label: "Bookings, changes and trip support use the same SureRide number." },
];

const PILLARS = [
  {
    title: "The right vehicle for the trip",
    body: "Tell us the passengers, bags and route. We confirm the vehicle category before you book so capacity is not left to guesswork.",
  },
  {
    title: "Driver details before pickup",
    body: "The assigned driver's name and phone number are shared before pickup, giving you a direct contact for the journey.",
  },
  {
    title: "One number for booking and support",
    body: "Call or WhatsApp the number published on this site for a quote, a booking change or help during a trip.",
  },
];

export default function AboutPage() {
  const papers = registrationRows();

  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "About SureRide Jaipur",
          description: "How SureRide confirms taxi routes, vehicles, drivers and charges before booking.",
          path: "/about/",
          type: "AboutPage",
        })}
      />
      <Wrap className="py-10 lg:py-12">
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-faint">
        Family-run in Jaipur
      </span>
      <H1 className="mb-4 mt-3 max-w-[920px]">
        A Jaipur taxi business you can contact directly.
      </H1>
      <p className="mb-6 max-w-[780px] text-[17px] leading-relaxed text-muted-2 lg:text-[19px]">
        {site.name} is a family-run taxi business. We confirm the route, vehicle and applicable
        charges in writing before you book.
      </p>

      <Photo
        src="photos/about-yard"
        alt="SureRide yard photograph pending client approval"
        label="real yard photograph"
        tone="dark"
        sizes="(min-width:1240px) 1160px, 100vw"
        className="mb-8 h-[220px] lg:h-[300px]"
      />

      <div className="mb-10 flex max-w-[760px] flex-col gap-4">
        <p className="text-base leading-[1.7] text-body">
          The booking process is deliberately simple: tell us where you are going, when you need to
          leave, how many people are travelling and how much luggage you have. We then confirm the
          suitable vehicle and send the quote in writing.
        </p>
        <p className="text-base leading-[1.7] text-body">
          A written quote should be specific enough to compare. It should name the route and vehicle,
          and state whether toll, parking, state tax, driver allowance or a requested detour is extra.
          If the trip changes, ask for the revised total before continuing.
        </p>
        <p className="text-base leading-[1.7] text-body">
          This site explains the available vehicle categories and the routes regularly covered. The
          final booking details come from the written quote, not from an unconfirmed estimate on a web
          page.
        </p>
        <p className="hi text-[17px] font-medium leading-relaxed text-indigo">
          एक ही परिवार, एक ही दफ़्तर। {site.triadHi}
        </p>
      </div>

      <div className="mb-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROOFS.map((s) => (
          <Card key={s.title} className="flex flex-col gap-2 p-5">
            <span className="text-xl font-extrabold leading-tight tracking-[-0.02em] text-indigo">{s.title}</span>
            <span className="text-sm leading-snug text-muted">{s.label}</span>
          </Card>
        ))}
      </div>

      <H2 className="mb-5">How we work</H2>
      <div className="mb-11 grid gap-4 lg:grid-cols-3">
        {PILLARS.map((p) => (
          <Card key={p.title} className="flex flex-col gap-2.5 p-6">
            <span className="text-xl font-bold leading-tight">{p.title}</span>
            <span className="text-[15px] leading-relaxed text-muted">{p.body}</span>
          </Card>
        ))}
      </div>

      <div className={`grid gap-4 pb-8 ${papers.length ? "lg:grid-cols-2" : ""}`}>
        {/* Renders itself once real registration numbers exist in site.ts. */}
        {papers.length > 0 && (
          <Card className="p-6">
            <h3 className="mb-4 text-[22px] font-extrabold leading-tight tracking-[-0.01em]">
              Registration and papers
            </h3>
            <dl className="flex flex-col gap-3">
              {papers.map((p) => (
                <div key={p.k} className="flex flex-col gap-0.5 border-b border-line-soft pb-3 last:border-0 last:pb-0">
                  <dt className="text-[9.5px] font-semibold uppercase leading-none tracking-[0.14em] text-faint">
                    {p.k}
                  </dt>
                  <dd className="tnum text-[15px] font-medium">{p.v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        )}
        <div className="flex flex-col gap-3.5 bg-indigo p-6 text-white">
          <h3 className="text-[22px] font-extrabold leading-tight tracking-[-0.01em]">
            Ask us anything before you book
          </h3>
          <p className="text-[15px] leading-relaxed text-on-indigo-2">
            Which car suits five people and luggage, whether the road is fit for your parents, what a
            two-day circuit really costs. Call and ask — nobody will push you to book.
          </p>
          <a href={site.phoneHref} className="tnum bg-marigold px-4 py-4 text-center text-[19px] font-extrabold text-ink no-underline">
            {site.phone}
          </a>
        </div>
      </div>
      </Wrap>
    </>
  );
}
