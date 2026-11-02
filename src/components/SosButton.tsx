"use client";

import { useEffect, useState } from "react";
import { site, waLink } from "@/data/site";

/**
 * Quick SOS for a passenger already on a trip. Goes to the same number as
 * everything else — there is no separate emergency line to remember.
 *
 * Two deliberate choices:
 *  - Calling is offered first. In a real emergency a phone call beats typing.
 *  - Location is requested only after an explicit tap. Merely visiting the
 *    Contact page must never trigger a browser permission prompt.
 */
export default function SosButton({ variant = "pill" }: { variant?: "pill" | "card" }) {
  const [open, setOpen] = useState(variant === "card");
  const [coords, setCoords] = useState<string | null>(null);
  const [locState, setLocState] = useState<"idle" | "asking" | "ok" | "denied">("idle");

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocState("denied");
      return;
    }
    setLocState("asking");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords(`https://maps.google.com/?q=${latitude.toFixed(5)},${longitude.toFixed(5)}`);
        setLocState("ok");
      },
      () => setLocState("denied"),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
    );
  };

  const message = [
    "SOS — I need help right now.",
    "I am travelling with SureRide.",
    coords ? `My location: ${coords}` : "",
    "(Sent from the SureRide website)",
  ]
    .filter(Boolean)
    .join("\n");

  const Actions = (
    <div className="flex flex-col gap-2">
      <a
        href={site.phoneHref}
        className="tnum block bg-sos px-4 py-3.5 text-center text-[17px] font-extrabold text-white no-underline"
      >
        Call now — {site.phone}
      </a>
      <a
        href={waLink(message)}
        className="block border-2 border-sos px-4 py-3 text-center text-[15px] font-bold text-sos no-underline"
      >
        Send SOS on WhatsApp
      </a>
      {locState !== "ok" && (
        <button
          type="button"
          onClick={requestLocation}
          disabled={locState === "asking"}
          className="border border-line bg-white px-4 py-2.5 text-sm font-semibold text-indigo disabled:opacity-60"
        >
          {locState === "asking" ? "Getting location…" : "Add my current location"}
        </button>
      )}
      <p className="text-[12.5px] leading-snug text-muted" aria-live="polite">
        {locState === "asking" && "Getting your location to attach to the message…"}
        {locState === "ok" && "Your location will be attached to the message."}
        {locState === "denied" &&
          "Location is off, so the message will not carry it — say where you are in the chat."}
        {locState === "idle" && "Location is optional and is requested only if you tap the button."}
      </p>
    </div>
  );

  if (variant === "card") {
    return (
      <div className="flex flex-col gap-3 border-2 border-sos bg-sos-soft p-5">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-bold leading-tight text-sos">Emergency — send an SOS</span>
          <span className="text-[15px] leading-relaxed text-muted-2">
            If you feel unsafe on a trip, call us or send an SOS on WhatsApp. It reaches the same
            number, and if you allow location the message carries where you are.
          </span>
        </div>
        {Actions}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="w-full whitespace-nowrap bg-sos px-3 py-3.5 text-center text-sm font-bold leading-none tracking-[0.04em] text-white lg:w-auto lg:rounded-[3px] lg:py-3"
      >
        SOS
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Send an emergency SOS"
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4 sm:items-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex w-full max-w-[420px] flex-col gap-3 bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-xl font-extrabold leading-tight text-sos">Send an SOS</span>
                <span className="text-sm leading-relaxed text-muted-2">
                  Goes to the SureRide contact number, {site.phone}.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                autoFocus
                className="-mr-1 -mt-1 px-2 py-1 text-2xl leading-none text-muted"
              >
                ×
              </button>
            </div>
            {Actions}
          </div>
        </div>
      )}
    </>
  );
}
