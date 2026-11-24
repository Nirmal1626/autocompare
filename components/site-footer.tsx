import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold">AutoCompare</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
            A frontend prototype for comparing illustrative car offers across Delhi, Noida, Greater Noida, Ghaziabad, Gurugram and Faridabad.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Browse</p>
          <div className="mt-3 grid gap-2 text-white/70">
            <Link href="/explore">Explore cars</Link>
            <Link href="/compare">Compare prices</Link>
            <Link href="/dealerships">Dealerships</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Demo notice</p>
          <p className="mt-3 leading-6 text-white/70">
            Dealership names, phone numbers, discounts and prices are fictional. They are not live showroom quotations.
          </p>
        </div>
      </div>
    </footer>
  );
}
