import { fleetDetail } from "@/data/fleet";
import { services } from "@/data/home";
import { site, waLink } from "@/data/site";
import { Wrap, H1, H2, Card, Photo } from "@/components/ui";
import { publishing } from "@/lib/publishing";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Jaipur Taxi Fleet: Cars & Tempo Traveller",
  description:
    "Compare SureRide Jaipur taxis by seats, luggage and per-kilometre offer rate: sedans, Ertiga, Crysta, Hycross, Fortuner, Tempo Traveller and Urbania.",
  path: "/fleet/",
  keywords: [
    "taxi fleet Jaipur",
    "Innova Crysta taxi Jaipur",
    "Ertiga taxi Jaipur",
    "Fortuner taxi Jaipur",
    "Tempo Traveller Jaipur",
    "Urbania rental Jaipur",
  ],
});

// Client-confirmed in-car standards. The first three replaced invented design
// copy ("first-aid kit", "phone charger"); add those back only if they are true.
const IN_EVERY_CAR = [
  "Fresh SureRide paper laid over the floor mats before every trip.",
  "A sealed 200 ml water bottle for each passenger.",
  "Tissues within reach in every row.",
  "Papers, insurance and permit in the glovebox, current and checkable.",
];

export default function FleetPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "SureRide taxi fleet in Jaipur",
          description: "SureRide vehicle categories, capacity, luggage space and per-kilometre rates.",
          path: "/fleet/",
          type: "CollectionPage",
        })}
      />
      <Wrap className="py-10 lg:py-12">
      <H1 className="mb-3 max-w-[900px]">Choose by passengers, luggage and journey.</H1>
      <p className="mb-8 max-w-[780px] text-[17px] leading-relaxed text-muted-2 lg:text-[19px]">
        Tell us how many people are travelling and what they are carrying. We will confirm the
        available vehicle in writing before you book rather than leave capacity to guesswork.
      </p>

      <div className="flex flex-col gap-4">
        {fleetDetail.map((v) => (
          <Card key={v.name} className="grid gap-0 lg:grid-cols-[280px_1fr]">
            <Photo
              src={`photos/fleet/${v.photo}-square`}
              alt={`${v.name} fleet vehicle`}
              label={`real ${v.name} fleet photograph`}
              sizes="(min-width:1024px) 280px, 100vw"
              className="h-[180px] lg:h-full"
            />
            <div className="flex flex-col gap-3 p-6">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-2xl font-extrabold leading-none tracking-[-0.015em]">{v.name}</span>
                <span className="tnum text-[15px] font-medium text-muted">{v.seats} · {v.bags}</span>
                {publishing.vehicleRatesConfirmed && (
                  <div className="ml-auto flex flex-wrap justify-end gap-2">
                    {v.rates.map((rate) => (
                      <span key={rate.name} className="tnum bg-indigo px-3 py-1.5 text-sm font-bold text-white">
                        {v.rates.length > 1 && `${rate.name}: `}
                        <span className="font-medium text-on-indigo line-through">{rate.regularPerKm}</span>{" "}
                        <span>{rate.offerPerKm}/km offer</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9.5px] font-semibold uppercase leading-none tracking-[0.14em] text-faint">Best for</span>
                <span className="text-[15px] leading-relaxed text-body">{v.best}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9.5px] font-semibold uppercase leading-none tracking-[0.14em] text-faint">Worth knowing</span>
                <span className="text-[15px] leading-relaxed text-muted">{v.note}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-11 bg-indigo px-6 py-10 text-white">
        <H2 className="mb-6 text-center">In every car, every trip</H2>
        <div className="mx-auto grid max-w-[1000px] items-start gap-5 lg:grid-cols-[1fr_1fr]">
          {/* The detail shot does more work than the list — it is checkable. */}
          <Photo
            src="photos/fleet/in-every-car"
            alt="Fresh SureRide paper over the floor mat, sealed 200 ml water bottles and a tissue box on the rear seat"
            label="real photograph of mats, water and tissues"
            sizes="(min-width:1024px) 490px, 100vw"
            className="h-[220px] lg:h-full lg:min-h-[260px]"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-3">
            {IN_EVERY_CAR.map((t) => (
              <div key={t} className="border border-indigo-line bg-indigo-card p-5 text-[15px] leading-relaxed">
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      <H2 className="mb-5 mt-11">How you can book them</H2>
      <div className="grid gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Card key={s.title} className="flex flex-col gap-2 border-l-4 border-l-indigo p-5">
            <span className="text-xl font-bold leading-tight tracking-[-0.01em]">{s.title}</span>
            <span className="text-sm leading-relaxed text-muted">{s.note}</span>
          </Card>
        ))}
      </div>

      <div className="mb-8 flex flex-col gap-3 bg-cream px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-lg font-bold">Not sure which car fits five people and luggage?</p>
          <p className="text-[15px] text-muted-2">Call and ask. Nobody will push you to the most expensive one.</p>
        </div>
        <div className="flex shrink-0 gap-2.5">
          <a href={site.phoneHref} className="tnum bg-marigold px-5 py-3.5 text-center text-base font-extrabold text-ink no-underline">
            {site.phone}
          </a>
          <a href={waLink("Namaste, which car do you suggest for my trip?")} className="bg-whatsapp px-5 py-3.5 text-center text-base font-bold text-white no-underline">
            WhatsApp
          </a>
        </div>
      </div>
      </Wrap>
    </>
  );
}
