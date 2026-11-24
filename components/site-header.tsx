'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore Cars' },
  { href: '/compare', label: 'Compare Prices' },
  { href: '/dealerships', label: 'Dealerships' },
  { href: '/about', label: 'About Us' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-sm font-semibold text-white">AC</span>
          <span className="text-lg font-semibold tracking-tight text-navy">AutoCompare</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-navy/80 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-navy">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/compare" className="btn-primary !hidden h-10 md:!inline-flex">
          Compare prices
        </Link>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-xl border border-line md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <nav className="space-y-1 border-t border-line px-4 py-3 md:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="block rounded-lg px-2 py-2 text-sm font-medium" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
