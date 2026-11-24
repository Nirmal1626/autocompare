import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-navy">That page is not in the demo.</h1>
      <p className="mt-3 text-navy/70">The catalogue has twenty cars and five fictional dealerships.</p>
      <Link href="/" className="btn-primary mt-6">Back to home</Link>
    </div>
  );
}
