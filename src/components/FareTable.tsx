import type { Fare } from "@/data/routes";
import { waLink } from "@/data/site";

const TH = "px-4 py-3.5 text-[13px] font-bold uppercase leading-none tracking-[0.06em]";

export default function FareTable({ fares, routeLabel }: { fares: Fare[]; routeLabel: string }) {
  return (
    <div className="overflow-x-auto border border-line bg-white">
      <table className="w-full min-w-[640px]">
        <caption className="sr-only">Fares for {routeLabel} by vehicle</caption>
        <thead>
          <tr className="bg-indigo text-white">
            <th scope="col" className={`${TH} text-left`}>Vehicle</th>
            <th scope="col" className={`${TH} text-left`}>Seats</th>
            <th scope="col" className={`${TH} text-right`}>One-way</th>
            <th scope="col" className={`${TH} text-right`}>Round trip</th>
            <th className={TH}><span className="sr-only">Book</span></th>
          </tr>
        </thead>
        <tbody>
          {fares.map((f) => (
            <tr key={f.veh} className="border-t border-line-soft">
              <td className="px-4 py-4 text-[17px] font-bold leading-tight">{f.veh}</td>
              <td className="px-4 py-4 text-[15px] font-medium text-muted">{f.seats}</td>
              <td className="tnum px-4 py-4 text-right text-xl font-bold tracking-[-0.01em]">{f.one}</td>
              <td className="tnum px-4 py-4 text-right text-xl font-bold tracking-[-0.01em]">{f.round}</td>
              <td className="px-4 py-4 text-right">
                <a
                  href={waLink(`Namaste, I want to book ${routeLabel} in a ${f.veh}. Please send the fare.`)}
                  className="inline-block bg-marigold px-3.5 py-2.5 text-[13px] font-bold leading-none text-ink no-underline"
                >
                  Book
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
