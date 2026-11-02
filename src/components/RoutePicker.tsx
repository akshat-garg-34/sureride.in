"use client";

import { useState } from "react";
import { site, waLink } from "@/data/site";

const FIELD =
  "border-[1.5px] border-field bg-white px-3.5 py-3 text-base font-medium text-ink outline-none focus:border-indigo";
const LABEL = "text-[10px] font-semibold uppercase leading-none tracking-[0.14em] text-muted";

/**
 * There is no booking backend. "Get fare" composes the enquiry and hands it to
 * WhatsApp, which is where this business actually quotes — a form that emailed
 * into a void would be worse than no form.
 */
export default function RoutePicker({ destinations }: { destinations: string[] }) {
  const [roundTrip, setRoundTrip] = useState(false);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("Jaipur");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const message = [
    name ? `Namaste, this is ${name}.` : "Namaste,",
    `I need a ${roundTrip ? "round trip" : "one-way"} cab.`,
    from && to ? `From ${from} to ${to}.` : from ? `From ${from}.` : "",
    date ? `Date: ${date}.` : "",
    time ? `Pickup: ${time}.` : "",
    "Please send the fare.",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div id="fare" className="bg-sand p-6 shadow-[0_20px_50px_rgba(10,14,40,.45)]">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <span className="text-xl font-bold tracking-[-0.01em]">Get your fare</span>
        <span className="text-xs font-medium text-muted">Quote sent on WhatsApp</span>
      </div>

      <div className="mb-4 flex gap-2" role="group" aria-label="Trip type">
        {[
          { label: "One-way", value: false },
          { label: "Round trip", value: true },
        ].map((opt) => (
          <button
            key={opt.label}
            type="button"
            aria-pressed={roundTrip === opt.value}
            onClick={() => setRoundTrip(opt.value)}
            className={`flex-1 px-3 py-2.5 text-[13px] leading-none ${
              roundTrip === opt.value
                ? "bg-indigo font-bold text-white"
                : "border-[1.5px] border-field font-semibold text-indigo"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="flex flex-col gap-1.5">
          <span className={LABEL}>Your name</span>
          <input
            className={FIELD}
            placeholder="So we know who we are quoting"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={LABEL}>From</span>
          <input className={FIELD} value={from} onChange={(e) => setFrom(e.target.value)} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={LABEL}>To</span>
          <input
            className={FIELD}
            list="sr-destinations"
            placeholder="City, airport or temple"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <datalist id="sr-destinations">
            {destinations.map((d) => (
              <option key={d} value={d} />
            ))}
          </datalist>
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <label className="flex flex-col gap-1.5">
            <span className={LABEL}>Date</span>
            <input type="date" className={`${FIELD} tnum`} value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={LABEL}>Pickup time</span>
            <input type="time" className={`${FIELD} tnum`} value={time} onChange={(e) => setTime(e.target.value)} />
          </label>
        </div>
      </div>

      <a
        href={waLink(message)}
        className="mt-4 block w-full bg-marigold px-4 py-4 text-center text-[17px] font-extrabold tracking-[-0.01em] text-ink"
      >
        Get fare
      </a>

      <div className="mt-2.5 flex gap-2">
        <a
          href={site.phoneHref}
          className="flex-1 border-[1.5px] border-indigo px-3 py-2.5 text-center text-[13px] font-bold leading-none text-indigo no-underline"
        >
          Call to book
        </a>
        <a
          href={waLink(message)}
          className="flex-1 bg-whatsapp px-3 py-2.5 text-center text-[13px] font-bold leading-none text-white no-underline"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
