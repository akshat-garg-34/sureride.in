import Link from "next/link";
import { routes } from "@/data/routes";
import { services, pilgrimage, reviews } from "@/data/home";
import { fleetCards } from "@/data/fleet";
import { site } from "@/data/site";
import RoutePicker from "@/components/RoutePicker";
import { Wrap, H2, Card, Photo, TriadBar, RouteCard } from "@/components/ui";
import { publishing } from "@/lib/publishing";
import { JsonLd, faqSchema, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const HOME_TITLE = "SureRide Jaipur | Outstation Taxi & One-Way Cabs";
const HOME_DESCRIPTION =
  "Request a written quote for one-way, round-trip, airport and outstation taxis from Jaipur. Driver and vehicle details are shared before pickup.";

export const metadata = buildMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
  keywords: [
    "cab booking Jaipur",
    "Jaipur outstation cab",
    "one way cab from Jaipur",
    "Jaipur to Delhi taxi",
    "Jaipur to Udaipur taxi",
  ],
});

const WHY = [
  {
    n: "01",
    title: "The quote is sent in writing",
    body: "The WhatsApp quote identifies the route, vehicle and any applicable additional charges before you confirm.",
  },
  {
    n: "02",
    title: "Driver details before pickup",
    body: "The assigned driver's name and phone number are shared before pickup.",
  },
  {
    n: "03",
    title: "One number for booking and support",
    body: `Call or WhatsApp ${site.phone} for the quote, booking changes or trip support.`,
  },
];

const HOME_FAQS = [
  {
    q: "Which areas does SureRide cover?",
    a: "SureRide handles one-way, round-trip, airport and outstation journeys from Jaipur across Rajasthan, Delhi NCR, Haryana and Uttar Pradesh.",
  },
  {
    q: "How do I request a taxi quote?",
    a: "Enter the pickup, destination, date and time in the fare form, then send the prepared enquiry on WhatsApp. You can also call the published SureRide number.",
  },
  {
    q: "Which vehicles can I request?",
    a: "The fleet includes Dzire, Aura, Etios, Ertiga, Innova Crysta, Innova Hycross, Fortuner, Tempo Traveller and Force Urbania categories, subject to availability.",
  },
  {
    q: "Will I receive the driver details before pickup?",
    a: "Yes. The assigned driver's name and phone number are shared before pickup, together with the confirmed vehicle and trip details.",
  },
];

export default function HomePage() {
  const destinations = routes.map((r) => r.label.split("→")[1].trim());

  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: HOME_TITLE,
          description: HOME_DESCRIPTION,
          path: "/",
        })}
      />
      <JsonLd data={faqSchema(HOME_FAQS)} />

      {/* Hero — the route picker is the first thing, not a slogan. */}
      <section className="relative">
        <Photo
          src="photos/hero-yard"
          alt="Three SureRide cars and two of our drivers in the Jaipur yard at first light"
          label="real SureRide fleet and yard photograph"
          tone="dark"
          scrim="left"
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full"
        />
        <Wrap className="relative py-12 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_470px] lg:gap-14">
            <div className="flex flex-col gap-5">
              <h1 className="text-balance text-[clamp(2rem,5.5vw,3.375rem)] font-extrabold leading-[1.06] tracking-[-0.025em] text-white">
                Cabs across Rajasthan, Delhi, Haryana and UP.
              </h1>
              <p className="max-w-[520px] text-[17px] leading-relaxed text-[#e4e1da] lg:text-[19px]">
                Fixed fare quoted in writing. Your driver&rsquo;s name and number before you travel.
              </p>
            </div>
            <RoutePicker destinations={destinations} />
          </div>
        </Wrap>
      </section>

      <TriadBar />

      {/* Popular routes */}
      <Wrap className="pt-14 lg:pt-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <H2 className="mb-1.5">Popular routes</H2>
            <p className="text-[15px] text-muted">
              Approximate road distance. Ask for a written fare for your date.
            </p>
          </div>
          <Link
            href="/routes/"
            className="border-b-2 border-marigold pb-1 text-sm font-bold text-indigo no-underline"
          >
            All routes
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {routes.map((r) => (
            <RouteCard
              key={r.slug}
              slug={r.slug}
              title={r.label}
              km={r.km}
              price={publishing.faresConfirmed ? r.fromPrice : undefined}
            />
          ))}
        </div>
      </Wrap>

      {/* Services */}
      <Wrap className="pt-14 lg:pt-16">
        <H2 className="mb-6">Services</H2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.title} className="flex flex-col gap-2 border-l-4 border-l-indigo p-5">
              <span className="text-xl font-bold leading-tight tracking-[-0.01em]">{s.title}</span>
              <span className="text-sm leading-relaxed text-muted">{s.note}</span>
            </Card>
          ))}
        </div>
      </Wrap>

      {/* Fleet */}
      <Wrap className="pt-14 lg:pt-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <H2>Our fleet</H2>
          <p className="text-[15px] text-muted">The available vehicle and passenger capacity are confirmed before booking.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fleetCards.map((f) => (
            <Card key={f.name} className="flex flex-col">
              <Photo
                src={`photos/fleet/${f.photo}-wide`}
                alt={`${f.name} in the SureRide yard, Jaipur`}
                label={`real ${f.name} fleet photograph`}
                sizes="(min-width:1024px) 280px, (min-width:640px) 45vw, 90vw"
                className="h-[118px]"
              />
              <div className="flex flex-col gap-1 p-4">
                <span className="text-[17px] font-bold leading-tight tracking-[-0.01em]">{f.name}</span>
                <span className="tnum text-[13px] font-medium text-muted">{f.seats}</span>
                <span className="text-[12.5px] leading-snug text-faint">{f.note}</span>
              </div>
            </Card>
          ))}
        </div>
      </Wrap>

      {/* Pilgrimage circuit */}
      <section className="mt-14 bg-indigo py-13 text-white lg:mt-16 lg:py-14">
        <Wrap>
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <div className="h-[38px] w-[74px] rounded-t-[60px] rounded-b bg-marigold" aria-hidden="true" />
            <h2 className="hi text-[clamp(1.6rem,4vw,2.25rem)] font-bold leading-tight">
              तीर्थ यात्रा — दर्शन सर्किट
            </h2>
            <p className="text-[15px] text-on-indigo">
              Discuss departure time, stops and waiting requirements when you request the quote.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pilgrimage.map((p) => (
              <div key={p.en} className="flex flex-col gap-1.5 border border-indigo-line bg-indigo-card p-5">
                <span className="hi text-[21px] font-semibold leading-snug text-white">{p.hi}</span>
                <span className="text-[13px] font-semibold leading-none text-marigold">{p.en}</span>
                <span className="tnum text-[13px] leading-relaxed text-on-indigo">{p.km}</span>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* Why book with us */}
      <Wrap className="pt-14 lg:pt-16">
        <H2 className="mb-6">Why book with us</H2>
        <div className="grid gap-5 lg:grid-cols-3">
          {WHY.map((w) => (
            <Card key={w.n} className="flex flex-col gap-2.5 p-6">
              <span className="tnum text-3xl font-extrabold leading-none text-marigold">{w.n}</span>
              <span className="text-xl font-bold leading-tight">{w.title}</span>
              <span className="text-[14.5px] leading-relaxed text-muted">{w.body}</span>
            </Card>
          ))}
        </div>
      </Wrap>

      <Wrap className="pt-14 lg:pt-16">
        <H2 className="mb-6">Jaipur taxi service: quick answers</H2>
        <div className="grid gap-4 pb-14 sm:grid-cols-2 lg:pb-16">
          {HOME_FAQS.map((item) => (
            <Card key={item.q} className="flex flex-col gap-2 p-5">
              <h3 className="text-lg font-bold leading-snug">{item.q}</h3>
              <p className="text-[15px] leading-relaxed text-muted-2">{item.a}</p>
            </Card>
          ))}
        </div>
      </Wrap>

      {/* Reviews — hidden until real ones exist. See scripts/reviews.config.mjs. */}
      {reviews.length > 0 && (
      <Wrap className="py-14 lg:py-16">
        <H2 className="mb-6">Reviews on Google</H2>
        <div className="grid gap-4 lg:grid-cols-3">
          {reviews.map((v) => (
            <Card key={v.name} className="flex flex-col gap-3 p-5">
              <span className="text-[15px] font-semibold tracking-[0.14em] text-marigold" aria-label="5 out of 5">
                ★★★★★
              </span>
              <p className="text-[15px] leading-relaxed text-body">{v.text}</p>
              <div className="mt-auto flex flex-col gap-0.5 pt-2">
                <span className="text-sm font-bold">{v.name}</span>
                <span className="text-[12.5px] text-faint">{v.meta}</span>
              </div>
            </Card>
          ))}
        </div>
      </Wrap>
      )}
    </>
  );
}
