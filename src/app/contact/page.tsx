import { site, waLink, addressLines } from "@/data/site";
import { Wrap, H1, H2, Card, Photo } from "@/components/ui";
import SosButton from "@/components/SosButton";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Contact SureRide Jaipur - Call or WhatsApp",
  description:
    "Call or WhatsApp SureRide Jaipur with your route, date, passengers and luggage to request a written taxi quote and confirm availability.",
  path: "/contact/",
  keywords: [
    "SureRide Jaipur contact number",
    "Jaipur taxi WhatsApp number",
    "book taxi Jaipur phone number",
  ],
});

const TELL_US = [
  { t: "Where from and where to", b: "Pickup address or landmark, and the drop. City names are enough to start." },
  { t: "Date and pickup time", b: "And whether it is one-way or a round trip, if you know." },
  { t: "How many passengers and bags", b: "We will tell you which car actually fits, not the most expensive one." },
  { t: "Any stops on the way", b: "Mention temples, meals or sightseeing stops so the route and quote can account for them." },
];

const HELP = [
  { t: "Driver not reachable?", b: "Call the SureRide number so the team can contact the driver and coordinate the next step." },
  { t: "Need to change the time?", b: "WhatsApp as early as possible. We will confirm availability and any effect on the quote." },
  { t: "Something went wrong?", b: "Call the same booking number and explain what happened so it can be handled directly." },
];

const FACTS = [
  { k: "Office and yard", v: addressLines().join(", ") },
  { k: "Bookings", v: "Call or WhatsApp for availability and a written quote" },
  { k: "Languages", v: "Hindi and English" },
].filter((f) => f.v);

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Contact SureRide Jaipur",
          description: "Call or WhatsApp SureRide Jaipur for taxi availability and a written quote.",
          path: "/contact/",
          type: "ContactPage",
        })}
      />
      <Wrap className="py-10 lg:py-12">
      <H1 className="mb-3">Call or WhatsApp for a written quote.</H1>
      <p className="mb-2 max-w-[780px] text-[17px] leading-relaxed text-muted-2 lg:text-[19px]">
        Call or WhatsApp with the trip details. We will confirm availability and send the quote in
        writing before you decide whether to book.
      </p>
      <p className="hi mb-8 text-[17px] font-medium leading-relaxed text-indigo">
        फोन कीजिए या व्हाट्सएप कीजिए। किराया लिखकर भेजा जाएगा।
      </p>

      <div className="mb-11 grid gap-4 lg:grid-cols-2">
        <a href={site.phoneHref} className="flex flex-col gap-2 bg-indigo p-7 text-white no-underline">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-on-indigo">
            Call SureRide
          </span>
          <span className="tnum text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold leading-none">{site.phone}</span>
          <span className="text-[15px] leading-relaxed text-on-indigo-2">
            Call for bookings, changes and trip support. Hindi and English.
          </span>
        </a>
        <a href={waLink("Namaste, I need a cab. ")} className="flex flex-col gap-2 bg-whatsapp p-7 text-white no-underline">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#b7e3ce]">
            WhatsApp — fare in writing
          </span>
          <span className="tnum text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold leading-none">{site.phone}</span>
          <span className="text-[15px] leading-relaxed text-[#d6f0e4]">
            Send your route and date. Ask for the total and any additional charges in writing.
          </span>
        </a>
      </div>

      <div className="mb-11 grid gap-8 lg:grid-cols-[1fr_420px]">
        <div>
          <H2 className="mb-2">What to tell us</H2>
          <p className="mb-5 text-[15px] leading-relaxed text-muted">
            These four details help us prepare an accurate quote. If something is not decided yet,
            say so when you contact us.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {TELL_US.map((x) => (
              <Card key={x.t} className="flex flex-col gap-1.5 p-5">
                <span className="text-lg font-bold leading-tight">{x.t}</span>
                <span className="text-sm leading-relaxed text-muted">{x.b}</span>
              </Card>
            ))}
          </div>
          <p className="mt-4 border-l-4 border-marigold bg-cream px-4 py-3.5 text-[15.5px] font-semibold leading-relaxed">
            Ask for the full quote in writing before confirming the booking.
          </p>
        </div>

        <aside className="flex flex-col gap-4">
          <Card className="overflow-hidden">
            <Photo
              src="photos/contact-map"
              alt="SureRide office map pending confirmation"
              label="real office map"
              sizes="(min-width:1024px) 420px, 100vw"
              className="h-[170px]"
            />
            <dl className="flex flex-col gap-3 p-5">
              {FACTS.map((f) => (
                <div key={f.k} className="flex flex-col gap-0.5 border-b border-line-soft pb-3 last:border-0 last:pb-0">
                  <dt className="text-[9.5px] font-semibold uppercase leading-none tracking-[0.14em] text-faint">{f.k}</dt>
                  <dd className="text-[15px] font-medium leading-snug">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <div className="flex flex-col gap-2 border border-cream-line bg-cream p-5">
            <span className="text-lg font-bold leading-snug">Corporate and travel-agent bookings</span>
            <span className="text-[15px] leading-relaxed text-muted-2">
              For recurring or business travel, call the same number to discuss billing,
              documentation and booking requirements before confirming.
            </span>
          </div>
        </aside>
      </div>

      <H2 className="mb-5">Already travelling with us?</H2>
      <div className="grid gap-4 pb-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <SosButton variant="card" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {HELP.map((h) => (
            <Card key={h.t} className="flex flex-col gap-2 border-t-4 border-t-indigo p-5">
              <span className="text-lg font-bold leading-tight">{h.t}</span>
              <span className="text-[15px] leading-relaxed text-muted">{h.b}</span>
            </Card>
          ))}
        </div>
      </div>
      </Wrap>
    </>
  );
}
