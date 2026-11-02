# SureRide — placeholder image prompts

46 images. Every one replaces a diagonal-hatch `<Photo>` block in the built site.
Dimensions below are the **display size ×3** so they stay sharp on phones.

> **These are development placeholders.** Before launch they must be swapped for
> real photographs of the actual cars and yard when they become available.
> Driver identity prompts are intentionally excluded; never generate a fictional
> person to represent a real SureRide driver.

---

## HOUSE STYLE — paste this before every prompt

```
Documentary photograph of a small, family-run Indian taxi business in Jaipur,
Rajasthan. Real and unglamorous, as if taken by a competent photographer on a
working day — NOT a car advertisement, NOT glossy stock photography, NOT CGI.
Natural available light, warm North Indian daylight, slight haze. Honest colour,
no heavy grading, no lens flare, no motion-blur theatrics. Everything looks
used and maintained rather than showroom-new. Photojournalistic, eye level,
35mm or 50mm feel, shallow-to-moderate depth of field.
```

**Negative prompt for every image:**
```
glossy car advertisement, showroom, CGI, 3D render, luxury supercar, western
cars, American or European street signage, snow, text overlay, watermark, logo,
readable number plate, distorted hands, extra fingers, plastic skin, HDR halo,
oversaturated sunset, drone shot, fisheye
```

**Three standing rules**
1. **Number plates must be blank, dirty, or out of focus.** Never generate a
   readable registration — it would invent a real vehicle's identity.
2. **Every interior shot must show the three in-car standards.** These are what
   the customer actually sees when the door opens, so they carry more weight
   than any exterior:
   - **SureRide paper laid over the floor mats** — a fresh white/kraft paper
     sheet on top of the black rubber mat in each footwell, printed with the
     SureRide wordmark in indigo `#1B2A6B` with a marigold `#E8A33D` letter R.
     Slightly creased and sitting naturally, not perfectly flat.
   - **Sealed 200 ml water bottles** — the small clear plastic bottles, one per
     passenger, in the door pocket or seat-back holder. Unopened, label plain.
   - **A tissue box or packet** within reach — on the parcel shelf, the seat
     back, or the centre console.

   *Practical note:* image generators render small logo text unreliably. Either
   accept an approximate wordmark, or prompt for a **blank white paper mat** and
   composite the real SureRide logo on afterwards — the second gives a cleaner
   result and is what I would do for anything customer-facing.

3. **Vehicles must be the Indian models named.** Maruti Suzuki Swift Dzire,
   Hyundai Aura, Toyota Etios, Maruti Suzuki Ertiga, Toyota Innova Crysta, Toyota Innova
   Hycross, Toyota Fortuner, and Force Traveller / Force Urbania minibuses.
   White is the usual taxi colour in Rajasthan; the Fortuner is often white or
   dark grey.

---

## 1 · Homepage hero — 1 image
`public/photos/hero-yard.jpg` — **2880 × 1040** (2.77:1, very wide)

White headline text sits over the **left third**, so keep that area darker and
uncluttered; put the subject right of centre.

```
Three white Indian taxis — a Toyota Innova Crysta, a Maruti Ertiga and a Swift Dzire —
parked in a row in a working transport yard in Jaipur at early morning. Two
drivers in plain shirts stand talking beside the middle car, one holding a cloth,
unposed and mid-conversation, not looking at the camera. Dusty ground, a low
boundary wall, a neem tree, morning light raking from the right. The left third
of the frame is open shaded ground with nothing important in it. Wide
cinematic composition.
```

## 2 · About page banner — 1 image
`public/photos/about-yard.jpg` — **2480 × 900** (2.75:1)

```
Wide view of a small taxi company's yard in Transport Nagar, Jaipur, just after
sunrise. Five or six white sedans and SUVs parked at angles, one with its bonnet
open, a man crouching to check a tyre. A single-storey office with a shuttered
front and plastic chairs outside. Long soft shadows, dust in the air, an
overcast-warm sky. Ordinary, lived-in, not staged.
```

## 3 · Fleet cards, homepage — 8 images
`public/photos/fleet/{dzire|aura|etios|ertiga|crysta|hycross|fortuner|tempo}-wide.jpg`
**720 × 368** each (1.95:1, landscape)

Three-quarter front view, whole vehicle in frame, plain yard or roadside
background, no people.

| File | Prompt subject |
|---|---|
| `dzire-wide` | `White Maruti Suzuki Swift Dzire sedan, three-quarter front view, parked on dusty ground in a Jaipur yard, clean but clearly used, morning light.` |
| `aura-wide` | `White Hyundai Aura compact sedan, three-quarter front view, parked beside a low boundary wall in a Jaipur yard, clean, soft morning light.` |
| `etios-wide` | `White Toyota Etios sedan, three-quarter front view, parked on dusty ground in a Jaipur yard, boot lid slightly open showing its depth, clean, morning light.` |
| `ertiga-wide` | `White Maruti Suzuki Ertiga MPV, three-quarter front view, parked in a Jaipur transport yard, side door slightly ajar, morning light.` |
| `crysta-wide` | `White Toyota Innova Crysta MPV, three-quarter front view, parked on a Rajasthan roadside with scrub and a low wall behind, midday light.` |
| `hycross-wide` | `White Toyota Innova Hycross, three-quarter front view, the newest-looking vehicle in the fleet, parked outside a small office, soft even light.` |
| `fortuner-wide` | `White Toyota Fortuner SUV, three-quarter front view, parked on a paved forecourt, marigold garland on the bonnet from a wedding booking, late afternoon light.` |
| `tempo-wide` | `White Force Urbania minibus with a roof luggage carrier, three-quarter front view, parked in a yard, side sliding door open.` |

## 4 · Fleet page rows — 8 images
`public/photos/fleet/{dzire|aura|etios|ertiga|crysta|hycross|fortuner|tempo}-square.jpg`
**840 × 780** each (1.08:1, near square)

Same eight vehicles, **different angle** so the page does not repeat itself.
Five are interiors and must carry the SureRide paper mats, 200 ml bottles and
tissues from standing rule 2. The three boot shots exist to show real luggage
capacity, which is a question customers genuinely ask — and for the Etios it is
the whole selling point.

| File | Prompt subject |
|---|---|
| `dzire-square` | `Interior rear seat of a white Swift Dzire taxi, clean fabric seats. A fresh white paper mat printed with the SureRide wordmark lies over the black rubber floor mat in each rear footwell, slightly creased. Two sealed 200 ml water bottles stand in the door pockets and a tissue box sits on the parcel shelf. Daylight through the window, shot from the open rear door.` |
| `aura-square` | `Open boot of a white Hyundai Aura with two full-size suitcases loaded, shot from behind at hip height, blank number plate. A spare pack of sealed 200 ml water bottles sits tucked in beside the luggage.` |
| `etios-square` | `Open boot of a white Toyota Etios packed with three full-size suitcases and a holdall, lid raised, shot from behind at hip height, blank number plate — the shot exists to show how much it swallows.` |
| `ertiga-square` | `Open side door of a white Maruti Ertiga showing the middle-row seats, a family's bags on the floor. SureRide-printed white paper mats lie over the rubber mats in the footwells, sealed 200 ml water bottles in the seat-back holders, a tissue packet on the middle seat. Shot from outside at hip height, morning light.` |
| `crysta-square` | `Rear of a white Toyota Innova Crysta with the boot open, suitcases and a cloth bag loaded, a driver's hand on the tailgate, blank number plate.` |
| `hycross-square` | `Driver's-eye interior of a Toyota Innova Hycross, dashboard and windscreen with open highway ahead. A SureRide-printed white paper mat is visible over the front passenger footwell mat, sealed 200 ml water bottles in the centre console holders, a tissue box on the dashboard. Clean and quiet, morning light.` |
| `fortuner-square` | `Interior second row of a white Toyota Fortuner, leather seats, a suit jacket folded on the seat. Crisp SureRide-printed white paper mats over the footwell mats, sealed 200 ml water bottles in the door pockets, a tissue box on the centre armrest. Warm daylight through tinted glass.` |
| `tempo-square` | `Interior aisle of a Force Urbania looking toward the back, rows of push-back seats, curtains at the windows. A SureRide-printed white paper mat lies in the footwell of each row and sealed 200 ml water bottles sit in the seat-back pockets, with a tissue box at the front. Warm daylight.` |

## 4b · In-car standards close-up — 1 image
`public/photos/fleet/in-every-car.jpg` — **1320 × 660** (2:1, wide)

The detail shot that proves the three standards in one frame. This is the single
most persuasive image on the fleet page — it is small, specific and checkable,
which is exactly the kind of evidence the brand sells on.

```
Tight interior detail of an Indian taxi's rear footwell and seat, shot from the
open door at knee height. A fresh white paper mat printed with a small blue and
orange wordmark lies squarely over the black rubber floor mat, edges slightly
creased. Beside it on the seat: two sealed 200 ml clear plastic water bottles
and a small tissue box, arranged as a driver would leave them rather than styled.
Clean fabric upholstery, natural daylight from the open door, shallow depth of
field. Documentary, unstyled, no people.
```

## 5 · Route page booking rail — 8 images
`public/photos/routes/{slug}.jpg` — **1260 × 450** each (2.8:1, very wide)

A small caption sits over the bottom-left in light text, so keep that corner
simple. These are the only route-specific images; each names a real landmark.

For any airport pickup shot, the driver holds a **name placard at the arrivals
barrier** and is helping with luggage — that is the service, and it is the one
moment a customer is anxious about. Keep the placard lettering soft and
illegible so no real passenger's name is invented.

| File | Prompt subject |
|---|---|
| `jaipur-to-delhi` | `White Toyota Innova Crysta on the NH-48 highway between Jaipur and Delhi, four-lane divided road, flat scrub and a distant toll gantry, hazy afternoon.` |
| `delhi-to-jaipur` | `Indian airport arrivals exit at night. A taxi driver in a plain shirt stands at the barrier holding a small hand-lettered name placard at chest height — the writing is soft and not legible. Behind him a white Toyota Innova Crysta waits at the kerb under sodium light, boot open, a suitcase half-loaded. Covered walkway and pillars, documentary, unposed.` |
| `jaipur-to-agra` | `White Toyota Innova Crysta parked on the approach road to Fatehpur Sikri, red sandstone walls in the background, late afternoon light.` |
| `jaipur-to-khatu-shyam-ji` | `White Maruti Ertiga parked on a narrow temple-town street at Khatu before dawn, shuttered shops, a few pilgrims walking, cool blue morning light.` |
| `jaipur-to-ajmer-and-pushkar` | `White Swift Dzire on the winding ghat road down toward Pushkar, dry hills, a glimpse of the lake and white temple buildings below, morning haze.` |
| `jaipur-to-udaipur` | `White Toyota Innova Hycross on the highway near Chittorgarh, the fort ridge visible on the horizon, open road, golden hour.` |
| `jaipur-to-jodhpur` | `White Toyota Innova Crysta parked on a street below Mehrangarh fort, blue-painted houses of the old city, the fort on the rock above, warm afternoon.` |
| `jaipur-to-ranthambore` | `White Maruti Ertiga on a tree-lined road near Sawai Madhopur, dry deciduous forest either side, early morning mist, no animals visible.` |

## 6 · Route stop cards — 18 images
`public/photos/stops/{slug}.jpg` — **740 × 330** each (2.24:1, wide)

Place photographs, **no vehicles and no prominent faces**. Each appears on the
route pages that pass through it.

| File | Prompt subject |
|---|---|
| `neemrana-fort` | `Neemrana Fort Palace on its hillside in Rajasthan, terraced sandstone façade, seen from the approach road, warm afternoon light.` |
| `behror` | `A highway dhaba at Behror on NH-48 — charpoys under a tin awning, a tea stall, trucks parked behind, midday.` |
| `manesar` | `Wide multi-lane highway at Manesar on the edge of Gurgaon, industrial sheds and a flyover, hazy morning traffic.` |
| `bharatpur` | `Wetland at Keoladeo Bharatpur, shallow water, reeds and bare trees, birds distant on the water, soft early light.` |
| `fatehpur-sikri` | `Red sandstone courtyard and Buland Darwaza at Fatehpur Sikri, strong afternoon shadows, a few visitors small in frame.` |
| `abhaneri-stepwell` | `Chand Baori stepwell at Abhaneri, the geometric criss-cross of stone steps descending, shot from the rim, hard midday light.` |
| `ringas` | `Small Rajasthani market town street at Ringas, shopfronts and a temple arch, cycles and a parked auto, ordinary morning.` |
| `salasar-balaji` | `Salasar Balaji temple complex, white and saffron structure with a crowd of pilgrims outside, flags, daytime.` |
| `jeen-mata` | `Jeen Mata temple set against dry Aravalli hills, stone steps climbing to it, saffron flags, clear morning.` |
| `kishangarh` | `Marble market at Kishangarh, stacked white and coloured marble slabs beside the highway, a crane and dust, midday.` |
| `ajmer-sharif-dargah` | `Entrance gate of Ajmer Sharif Dargah, crowded lane with flower sellers and green and gold cloth, warm daylight, faces not identifiable.` |
| `pushkar` | `Pushkar lake and its ghats at sunset, white temples and steps down to the water, hills behind, soft warm light.` |
| `chittorgarh` | `Chittorgarh fort walls and the Vijay Stambh tower on the ridge, seen from below, dry landscape, late afternoon.` |
| `nathdwara` | `Nathdwara temple town street, pilgrims walking toward the Shrinathji temple, painted shopfronts, morning light.` |
| `beawar` | `Small highway town of Beawar in Rajasthan, main road with shops and a dhaba, trucks passing, flat harsh daylight.` |
| `tonk` | `Old town street in Tonk, Rajasthan, faded colonial-era and Rajput buildings, an arched gateway, quiet afternoon.` |
| `sawai-madhopur` | `Road into Sawai Madhopur near Ranthambore, forest gate and signboard-free stone marker, dry forest, early morning mist.` |
| `chauth-ka-barwara` | `Hilltop temple at Chauth Ka Barwara seen across dry fields, steps winding up the hill, morning haze.` |

## 7 · Contact page map — 1 image
`public/photos/contact-map.jpg` — **1260 × 510** (2.47:1)

Replace with a real embedded map before launch; this is a visual stand-in only.

```
Flat vector-style illustrated street map of an industrial district in an Indian
city, muted sandstone and slate colours, a few unlabelled roads and blocks, one
small marigold-orange location pin slightly right of centre. No text, no place
names, no logos. Clean and minimal.
```

## Wiring them in

Drop the files under `public/photos/` with exactly these names, then the `Photo`
component in `src/components/ui.tsx` swaps to `next/image` in one edit — the
labels it currently renders already say which image belongs where. Ask me and
I'll do that pass once the files exist.
