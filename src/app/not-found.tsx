import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-cream px-6 text-center">
      {/* Playful crumbs illustration */}
      <div className="relative mb-8">
        <span className="text-[120px] leading-none select-none" aria-hidden="true">
          🍪
        </span>
        {/* Crumb particles */}
        <span className="absolute bottom-2 left-0 text-2xl opacity-60 rotate-12 select-none" aria-hidden="true">⚬</span>
        <span className="absolute bottom-0 right-2 text-lg opacity-40 -rotate-6 select-none" aria-hidden="true">⚬</span>
        <span className="absolute bottom-1 left-10 text-sm opacity-30 rotate-45 select-none" aria-hidden="true">⚬</span>
      </div>

      <h1 className="font-serif text-4xl sm:text-5xl text-brand-cocoa tracking-tight mb-4">
        Oops! This page has been eaten.
      </h1>
      <p className="font-sans text-base text-brand-charcoal/60 max-w-md mb-10 leading-relaxed">
        Looks like someone couldn&rsquo;t resist. The page you&rsquo;re looking
        for doesn&rsquo;t exist — but our cakes certainly do.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-brand-cocoa px-8 py-3.5
                   font-sans text-sm uppercase tracking-wider text-brand-cream
                   transition-all duration-300 hover:bg-brand-charcoal hover:shadow-lg"
      >
        Return to Home
      </Link>
    </div>
  );
}
