import type { Metadata } from 'next';
import { Oswald, Outfit } from 'next/font/google';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const display = Oswald({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'AutoCompare — Compare car prices across Delhi NCR',
  description: 'A demo prototype for comparing illustrative car offers from fictional dealerships in Delhi NCR.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${display.variable} font-sans antialiased`}>
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-cover bg-top" style={{ backgroundImage: "url('/vice-night.jpg')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#120814]/45 via-[#120814]/78 to-[#0a0410]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(255,46,151,0.3),transparent_42%),radial-gradient(circle_at_100%_8%,rgba(45,230,220,0.16),transparent_40%),radial-gradient(circle_at_70%_100%,rgba(255,122,60,0.14),transparent_42%)]" />
        </div>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
