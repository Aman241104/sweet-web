import { Navbar } from '@/components/layout/Navbar';
import { MenuSection } from '@/components/home/MenuSection';
import { Footer } from '@/components/layout/Footer';

export default function MenuPage() {
    return (
        <main className="bg-brand-cream min-h-screen">
            <Navbar />
            <div className="pt-32 pb-12 px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-serif text-brand-cocoa mb-4">
                    The Menu
                </h1>
                <p className="text-brand-charcoal/60 max-w-xl mx-auto font-sans">
                    Handcrafted with love, premium ingredients, and 100% eggless recipes.
                </p>
            </div>

            {/* The Full Filterable Menu */}
            <MenuSection />

            <Footer />
        </main>
    );
}
