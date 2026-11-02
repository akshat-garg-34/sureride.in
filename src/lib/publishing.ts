/**
 * Explicit release gates for customer-facing evidence.
 *
 * These default to false on purpose. Set them to 1 only after the client has
 * approved the final rate card or the corresponding image category. Driver
 * portraits stay independently disabled so approving vehicle and destination
 * imagery can never publish generated identities by accident.
 */
export const publishing = {
  faresConfirmed: process.env.NEXT_PUBLIC_FARES_CONFIRMED === "1",
  vehicleRatesConfirmed: process.env.NEXT_PUBLIC_VEHICLE_RATES_CONFIRMED === "1",
  sitePhotosApproved: process.env.NEXT_PUBLIC_SITE_PHOTOS_APPROVED === "1",
  driverPhotosApproved: process.env.NEXT_PUBLIC_DRIVER_PHOTOS_APPROVED === "1",
} as const;

const unconfirmedCommercialClaim =
  /₹|fare|cost|charge|free|included|advance|allowance|toll|parking|state tax|waiting|night halt/i;

/** Keep useful route guidance while withholding unverified commercial terms. */
export function publicRouteFaqs<T extends { q: string; a: string }>(faqs: T[]): T[] {
  if (publishing.faresConfirmed) return faqs;
  return faqs.filter((faq) => !unconfirmedCommercialClaim.test(`${faq.q} ${faq.a}`));
}

/** Route prose comes from the design export too, so apply the same release gate. */
export function publicRouteProse<T extends { text: string }>(prose: T[]): T[] {
  if (publishing.faresConfirmed) return prose;
  return prose.filter((paragraph) => !unconfirmedCommercialClaim.test(paragraph.text));
}
