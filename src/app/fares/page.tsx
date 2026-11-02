import { rateRows } from "@/data/fares";
import { site, waLink } from "@/data/site";
import { Wrap, H1, H2, Card } from "@/components/ui";
import { publishing } from "@/lib/publishing";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: publishing.vehicleRatesConfirmed
    ? "Jaipur Taxi Rates Per Km & Offers"
    : "Request a Written Taxi Fare",
  description: publishing.vehicleRatesConfirmed
    ? "See SureRide Jaipur per-kilometre taxi rates and offers for Dzire, Aura, Ertiga, Crysta, Hycross, Tempo Traveller, Urbania and Fortuner."
    : "Send SureRide your route, date, passenger count and luggage to receive a written taxi quote before booking.",
  path: "/fares/",
  keywords: [
    "taxi rate per km Jaipur",
    "Jaipur cab rate per km",
    "Innova rate per km Jaipur",
    "Tempo Traveller rate Jaipur",
    "outstation taxi fare Jaipur",
  ],
});

const TH = "px-4 py-3.5 text-[13px] font-bold uppercase leading-none tracking-[0.06em]";

const QUOTE_DETAILS = [
  {
    title: "Route and trip type",
    body: "Pickup, destination, date, one-way or round trip, and any planned stops.",
  },
  {
    title: "Vehicle and capacity",
    body: "The vehicle category, passenger count and luggage requirement are stated in the quote.",
  },
  {
    title: "Applicable additions",
    body: "The quote should state whether toll, parking, state tax, driver allowance, night halt or detours are additional.",
  },
];

export default function FaresPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "SureRide Jaipur taxi rates and offers",
          description: "Per-kilometre vehicle rates and the details required for a written taxi quote.",
          path: "/fares/",
        })}
      />
      <Wrap className="py-10 lg:py-12">
      <H1 className="mb-2.5">
        {publishing.vehicleRatesConfirmed ? "Per-kilometre rates by vehicle" : "Get the fare in writing before you book"}
      </H1>
      <p className="mb-2 max-w-[760px] text-[17px] leading-relaxed text-muted-2 lg:text-[19px]">
        {publishing.vehicleRatesConfirmed
          ? "These base and offer rates come from the client-approved vehicle rate card. Your written trip quote confirms the final distance and applicable additional charges."
          : "Fares depend on the route, date, vehicle and planned stops. Send the trip details and ask for a written quote before confirming."}
      </p>
      <p className="hi mb-7 text-[17px] font-medium leading-relaxed text-indigo">{site.triadHi}</p>

      {publishing.vehicleRatesConfirmed ? (
        <>
          <H2 className="mb-4">Base rate and current offer</H2>
          <div className="overflow-x-auto border border-line bg-white">
            <table className="w-full min-w-[620px]">
              <thead>
                <tr className="bg-indigo text-white">
                  <th scope="col" className={`${TH} text-left`}>Vehicle</th>
                  <th scope="col" className={`${TH} text-left`}>Seats</th>
                  <th scope="col" className={`${TH} text-right`}>Base / km</th>
                  <th scope="col" className={`${TH} text-right`}>Offer / km</th>
                </tr>
              </thead>
              <tbody>
                {rateRows.map((r) => (
                  <tr key={r.veh} className="border-t border-line-soft">
                    <td className="px-4 py-4 text-[17px] font-bold leading-tight">{r.veh}</td>
                    <td className="px-4 py-4 text-[15px] font-medium text-muted">{r.seats}</td>
                    <td className="tnum px-4 py-4 text-right text-base font-medium text-muted line-through">{r.regularPerKm}</td>
                    <td className="tnum px-4 py-4 text-right text-xl font-extrabold text-indigo">{r.offerPerKm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-2">
            Rates are per kilometre. Minimum billing, tolls, parking, state tax, driver allowance,
            night halt and route-specific totals are confirmed separately in the written quote.
          </p>
        </>
      ) : (
        <div className="border-l-4 border-marigold bg-cream px-5 py-5 text-[15px] leading-relaxed text-muted-2">
          Send your trip details by phone or WhatsApp. SureRide will confirm availability and the
          applicable charges in writing before you book.
        </div>
      )}

      <H2 className="mb-5 mt-11">What the written quote should cover</H2>
      <div className="grid gap-4 lg:grid-cols-3">
        {QUOTE_DETAILS.map((item) => (
          <Card key={item.title} className="flex flex-col gap-2 border-t-4 border-t-marigold p-6">
            <span className="text-xl font-bold leading-tight">{item.title}</span>
            <span className="text-[15px] leading-relaxed text-muted-2">{item.body}</span>
          </Card>
        ))}
      </div>

      <div className="mt-9 grid gap-4 pb-8 lg:grid-cols-[1.2fr_1fr]">
        <Card className="p-6">
          <h2 className="mb-3 text-[22px] font-extrabold leading-tight tracking-[-0.01em]">
            Send enough detail for an accurate quote
          </h2>
          <p className="text-[15.5px] leading-relaxed text-body">
            Include the date, pickup point, destination, one-way or round trip, passenger count,
            luggage and planned stops. Ask for the revised total if any of those details change.
          </p>
        </Card>
        <div className="flex flex-col gap-3.5 bg-indigo p-6 text-white">
          <h2 className="text-[22px] font-extrabold leading-tight tracking-[-0.01em]">
            Request your written quote
          </h2>
          <a href={site.phoneHref} className="tnum bg-marigold px-4 py-4 text-center text-[19px] font-extrabold text-ink no-underline">
            {site.phone}
          </a>
          <a href={waLink("Namaste, please send me a written quote.")} className="bg-whatsapp px-4 py-3.5 text-center text-base font-bold text-white no-underline">
            WhatsApp for a written quote
          </a>
        </div>
      </div>
      </Wrap>
    </>
  );
}
