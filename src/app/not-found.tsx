import Link from "next/link";
import type { Metadata } from "next";
import { Wrap, H1 } from "@/components/ui";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | SureRide Jaipur" },
  description: "The requested SureRide page does not exist. Browse the published Jaipur taxi routes or contact SureRide for a written quote.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Wrap className="py-20 text-center">
      <H1 className="mb-4">That page is not here.</H1>
      <p className="mb-6 text-[17px] text-muted-2">
        The route you were after may not have a page yet — call us and we will quote it anyway.
      </p>
      <Link href="/routes/" className="border-b-2 border-marigold pb-1 font-bold text-indigo no-underline">
        See all routes
      </Link>
    </Wrap>
  );
}
