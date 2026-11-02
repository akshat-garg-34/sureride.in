# SureRide

Static marketing site for a Jaipur cab company. Built from the Claude Design
artboards in `design/`.

**Next.js 15 (App Router) · static export · Tailwind v4 · TypeScript**

```bash
npm run dev      # http://localhost:3000
npm run build    # static HTML into out/
npm run gen      # regenerate src/data/* from the design export + fleet config
npm run assets   # regenerate icons and share cards (needs Chrome)
```

`npm run build` emits a fully static `out/` — no server, no runtime. Deploy to
Cloudflare Pages, Vercel, Netlify or any bucket.

---

## ⚠️ Before this goes live

Every business detail on the site came from the design mock, **not from the
client**. They are marked `PLACEHOLDER` in `src/data/site.ts`. Replace all of
them — publishing an invented GSTIN or tourist permit is a legal problem, not a
cosmetic one.

- Phone number, address, GSTIN, transport permit, RTO
- **The final domain.** Set `NEXT_PUBLIC_SITE_URL` in the host's environment
  (see `.env.example`). Every canonical tag, sitemap URL and og:image absolute
  URL is built from it, so a wrong value is wrong sitewide. The `sureride.in`
  fallback exists only so local dev works — do not ship on it by accident.
- Per-kilometre base and offer rates are client-supplied and publish through
  `VEHICLE_RATES_CONFIRMED=1`. Fixed route totals remain design placeholders
  and stay hidden unless `FARES_CONFIRMED=1` is separately approved.
- Driver names, portraits, and tenure claims have been removed. Reintroduce a
  drivers page only from client-supplied details and consented photographs.
- Google reviews — currently invented. Never publish fabricated reviews or
  ratings; it is a manual-action risk and it is dishonest.
- Fleet and driver counts ("eighteen vehicles", "eleven drivers") are still
  design copy on the About and Fleet pages. Confirm or change them.
- Vehicle, yard, route and destination imagery is controlled by
  `SITE_PHOTOS_APPROVED`. Driver portraits have a separate fail-closed gate and
  are absent from the repository and production bucket.

No founding year appears anywhere on the site now. If the client wants one, add
`foundedYear` back to `src/data/site.ts` and reference it — but decide first
whether the heritage line is *SureRide Travels* or *Jai Guru Dev Travels*, since
the brand blueprint and the design disagreed.

---

## Brand assets

`npm run assets` renders them with headless Chrome, so they use the real Archivo
webfont rather than a system-font approximation. Requires Google Chrome at the
standard macOS path and a network connection for Google Fonts.

| Output | What |
|---|---|
| `src/app/icon.png` | 512² SR monogram — favicon, picked up automatically by Next |
| `src/app/apple-icon.png` | 180² home-screen icon |
| `src/app/opengraph-image.png` | 1200×630 sitewide share card |
| `public/og/<slug>.png` | one share card per route, with its fare and distance |

Route cards matter more than the sitewide one: WhatsApp is the main sharing
channel, so a route link is the most-shared surface on the site. Re-run
`npm run assets` after changing fares or adding a route.

The design is pure typography, so it regenerates exactly. If a real logo is ever
drawn, replace the templates in `scripts/generate-assets.mjs`.

## Images

Site photos live in `public/photos/`. `npm run images` generates AVIF and WebP
at three widths each and writes `src/data/images.ts`, a manifest of what exists.

That manifest is what makes the `Photo` component safe: a slot with no supplied
photo falls back to the hatched placeholder instead of shipping a broken `<img>`.
Production uses the separate `NEXT_PUBLIC_SITE_PHOTOS_APPROVED=1` release gate.
Driver portraits use `NEXT_PUBLIC_DRIVER_PHOTOS_APPROVED` and remain off. The
deploy script also excludes `photos/drivers/` from the general image sync, so
the two categories cannot be published together by mistake.

The Ertiga and Crysta detail assets use client-supplied photographs with readable
registration numbers obscured. The remaining generated vehicle imagery should
still be replaced when equivalent real photographs are supplied.

Weight served: 6.5 MB as JPEG, **2.4 MB as AVIF**, which is what almost every
real browser gets.

## The fleet

`scripts/fleet.config.mjs` is the **single source of truth** for vehicles: eight
of them, with seats, luggage, per-km rate and a `fareIndex`.

It is hand-maintained and never overwritten by the design export. Route fare
tables are *derived* from it — each vehicle's `fareIndex` multiplies that route's
Swift Dzire base price — so changing one number re-prices all eight route pages,
the homepage cards, the fleet page and the rates table together. Run `npm run gen`
after editing.

Current lineup: Swift Dzire · Hyundai Aura · Toyota Etios · Maruti Ertiga ·
Innova Crysta · Innova Hycross · Toyota Fortuner · Tempo Traveller, with Force
Urbania priced separately. The client-supplied per-km base and offer rates are
rendered when the vehicle-rate gate is enabled. Fixed route totals remain
hidden because they were not part of that confirmation.

## Driver identities

The placeholder driver page, fictional roster, generation step, and generated
portraits have been removed. If the client later supplies real driver details,
build the page again from those verified details and photographs taken with
each driver's permission. Keep `DRIVER_PHOTOS_APPROVED=0` until that work is
complete.

## How the routes work

Route pages are **data, not files**. All eight live in `src/data/routes.ts` and
`src/app/taxi/[slug]/page.tsx` generates one static page per entry via
`generateStaticParams`. Adding route #9 is a data edit; the sitemap, the footer
links and the homepage cards all read the same array, so they cannot drift.

`src/data/*.ts` is **generated** — `scripts/generate-data.mjs` reads
`design/SureRide Website.dc.html`, evaluates its `DCLogic` block into
`design/data.json`, and emits typed modules. Re-run with `npm run gen` after
changing the design. Once the client supplies real content, stop regenerating
and edit `src/data/` directly.

## Content rule inherited from the brand work

The business cuts brokers out, but that is an internal rationale, not a customer
need. It is **deliberately absent** from every hero, title, meta description and
route heading. It belongs only in the About story, one line on the fares page,
and an FAQ. Sell the proof — fixed fare, named driver, owner's number — not the
pitch. Keep it that way.

## Structure

```
src/data/          routes, fleet, fares, home  (generated)
src/data/site.ts   business details + WhatsApp helper   (hand-edited)
src/lib/schema.tsx TaxiService / Service / FAQPage / BreadcrumbList JSON-LD
src/app/taxi/[slug]/  the 8 generated route pages
design/            the Claude Design export — source of truth for content
```

## Still to do

- Real photography, then swap `Photo` for `next/image`
- Set `NEXT_PUBLIC_SITE_URL` on the host before the first real deploy
- Google Business Profile — the biggest single lever for a local cab firm,
  and slower to verify than this site is to ship. Start it first.
- GA4 + Search Console, with call and WhatsApp clicks tracked as conversions
- Phase 2 routes (Salasar, Mehandipur, Mathura, Gurgaon, Bikaner) — add to
  `routes.ts` and they build themselves
- Social profile URLs into `sameAs` in `src/lib/schema.tsx`

## AWS production release gates

### DNS prerequisite

The Route 53 hosted zone works only after the registrar delegates `sureride.in`
to all four nameservers below. Do not rely on records shown in Route 53 while
the public NS records still point somewhere else.

```text
ns-579.awsdns-08.net
ns-1796.awsdns-32.co.uk
ns-1117.awsdns-11.org
ns-145.awsdns-18.com
```

Before changing nameservers, copy any mail or verification records from the
current DNS provider. The existing `_dmarc.sureride.in` TXT record has already
been mirrored into this Route 53 zone. `scripts/go-live.sh` checks the real TLD
delegation and stops if Route 53 is not authoritative.

The deploy script verifies the selected AWS profile resolves to account
`706262411123` before writing. Its safe production invocation is:

```bash
AWS_PROFILE=default SITE_URL=https://sureride.in NOINDEX=0 \
FARES_CONFIRMED=0 VEHICLE_RATES_CONFIRMED=1 \
SITE_PHOTOS_APPROVED=1 DRIVER_PHOTOS_APPROVED=0 npm run deploy
```

Change a release gate to `1` only after its source material is client-approved.
When site photos are not approved, the deployment removes the `/photos/` prefix
from the bucket. Driver portraits are independently excluded and removed unless
their dedicated gate is explicitly enabled.
