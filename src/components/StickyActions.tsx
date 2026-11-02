import { site, waLink } from "@/data/site";
import SosButton from "@/components/SosButton";
import Link from "next/link";

/**
 * Mobile-only action bar. Bookings in this market happen by phone and WhatsApp,
 * so both stay thumb-reachable at every scroll position — and so does the SOS,
 * which is the one control a passenger may need to find in a hurry.
 */
export default function StickyActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_1.2fr_1fr_0.8fr] border-t border-indigo-line bg-indigo lg:hidden">
      <a href={site.phoneHref} className="py-3.5 text-center text-sm font-bold text-white">
        Call
      </a>
      <a href={waLink()} className="bg-whatsapp py-3.5 text-center text-sm font-bold text-white">
        WhatsApp
      </a>
      <Link href="/#fare" className="bg-marigold py-3.5 text-center text-sm font-bold text-ink">
        Get fare
      </Link>
      <div className="flex">
        <SosButton />
      </div>
    </div>
  );
}
