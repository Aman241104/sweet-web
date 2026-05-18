import { Navbar } from '@/components/layout/Navbar';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { Footer } from '@/components/layout/Footer';
import { MarqueeBar } from '@/components/ui/MarqueeBar';

export default function MenuPage() {
    return (
        <main className="bg-brand-cream min-h-screen">
            <MarqueeBar />
            <Navbar />
            <div className="pt-40 pb-6 px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-serif text-brand-cocoa mb-4">
                    The Menu
                </h1>
                <p className="text-brand-charcoal/60 max-w-xl mx-auto font-sans">
                    Handcrafted with love, from classic pastries to designer masterpieces.
                </p>
            </div>

            {/* The Categories */}
            <CategoryGrid />

            <Footer />
        </main>
    );
}
