// REAL CUSTOMER REVIEWS — hand-maintained, never generated.
//
// This file is EMPTY on purpose. The design export shipped 16 invented reviews
// with invented names, attributed as "Google review". Publishing those would be
// deceptive to customers and fake review content is a Google manual-action
// risk, so the generator now ignores the design's reviews entirely and reads
// this file instead.
//
// The "From passengers on this route" section does not render while a route has
// no reviews — no empty state, no placeholder. Paste real ones in and it
// reappears on its own.
//
// Only paste reviews that genuinely exist. Quote them as written, keep the
// reviewer's name as they published it, and keep `meta` truthful.
//
//   "jaipur-to-delhi": [
//     { text: "…", name: "…", meta: "Google review · March 2026" },
//   ],

/** @type {Record<string, {text: string, name: string, meta: string}[]>} */
export const reviewsByRoute = {};

/**
 * Homepage "Reviews on Google" band. Same rule: empty until real ones exist,
 * and the whole section stays hidden while it is empty.
 * @type {{text: string, name: string, meta: string}[]}
 */
export const homeReviews = [];
