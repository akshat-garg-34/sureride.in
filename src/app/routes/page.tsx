import { routes } from "@/data/routes";
import { site } from "@/data/site";
import { Wrap, H1, RouteCard } from "@/components/ui";
import { publishing } from "@/lib/publishing";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, routesListSchema, webPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Taxi Routes from Jaipur",
  description:
    "Explore SureRide taxi routes from Jaipur to Delhi, Agra, Udaipur, Jodhpur, Khatu Shyam Ji, Ajmer, Pushkar and Ranthambore.",
  path: "/routes/",
  keywords: [
    "taxi routes from Jaipur",
    "outstation cabs from Jaipur",
    "Jaipur Rajasthan taxi routes",
    "one way taxi from Jaipur",
  ],
});

export default function RoutesPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "Taxi Routes from Jaipur",
          description:
            "SureRide taxi routes from Jaipur to major cities, airports, temples and destinations.",
          path: "/routes/",
          type: "CollectionPage",
        })}
      />
      <JsonLd data={routesListSchema(routes)} />
      <Wrap className="py-10 lg:py-12">
      <H1 className="mb-3">Routes we regularly cover</H1>
      <p className="mb-2 max-w-[760px] text-[17px] leading-relaxed text-muted-2 lg:text-[19px]">
        Each route page includes approximate distance and driving time, useful stops and practical
        trip notes. Ask for a written quote for your date and vehicle.
      </p>
      <p className="hi mb-8 text-[17px] font-medium leading-relaxed text-indigo">{site.triadHi}</p>
      <div className="grid gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-4">
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
    </>
  );
}
