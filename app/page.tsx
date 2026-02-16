import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import TrustBadges from "@/components/ui/TrustBadges";
import { getFeaturedProducts, categories } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts(6);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal text-ivory min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/40" />
        <div className="relative max-w-[1440px] mx-auto px-8 lg:px-16 py-32 w-full">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.28em] uppercase text-gold/90 mb-6 font-light">
              The Aureon Collection
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] tracking-[-0.02em]">
              Elevated Living.
              <br />
              <span className="italic text-gold/80 font-light">Thoughtfully</span> Curated.
            </h1>
            <p className="text-stone/90 text-base md:text-lg leading-relaxed mb-12 max-w-lg font-light">
              A considered collection of objects designed to improve modern life. No clutter. No compromise.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="/shop"
                className="group bg-gold text-charcoal px-10 py-4 text-sm tracking-[0.15em] uppercase inline-flex items-center justify-center gap-3 transition-all hover:bg-gold/90 hover:gap-4"
              >
                Explore Collection
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="border border-ivory/30 text-ivory px-10 py-4 text-sm tracking-[0.15em] uppercase inline-flex items-center justify-center transition-all hover:bg-ivory hover:text-charcoal hover:border-ivory"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block">
        </div>
      </section>

      {/* Editorial */}
      <section className="py-28 px-8 lg:px-16">
        <div className="max-w-[1440px] mx-auto text-center">
          <p className="text-xs tracking-[0.28em] uppercase text-stone mb-5 font-light">
            The Aureon Philosophy
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl max-w-4xl mx-auto leading-tight mb-6">
            A considered collection of objects designed to{" "}
            <span className="italic text-gold font-light">improve modern life</span>
          </h2>
          <div className="w-20 h-px bg-gold/30 mx-auto my-8" />
          <p className="text-stone text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light">
            Every item is selected for purpose, longevity, aesthetic restraint, and universal appeal. Quality is not about luxury pricing — it is about intention.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-28 px-8 lg:px-16 bg-charcoal text-ivory">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs tracking-[0.28em] uppercase text-stone/70 mb-3 font-light">
                Collections
              </p>
              <h2 className="font-serif text-3xl md:text-4xl tracking-[-0.02em]">
                Shop by Category
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-stone/70 hover:text-gold transition-colors group"
            >
              View All <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group relative aspect-[3/4] rounded-sm overflow-hidden"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="font-serif text-2xl text-ivory mb-2 tracking-[-0.02em]">{cat.name}</h3>
                  <p className="text-xs text-stone/70 tracking-wider">{cat.itemCount} products</p>
                  <div className="w-8 h-px bg-gold/50 mt-4 transition-all duration-300 group-hover:w-12" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-8 lg:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs tracking-[0.28em] uppercase text-stone mb-3 font-light">
                Curated Selection
              </p>
              <h2 className="font-serif text-3xl md:text-4xl tracking-[-0.02em]">
                Featured Products
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-stone hover:text-gold transition-colors group"
            >
              Shop All <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14">
            {featured.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Aureon Standard */}
      <section className="py-28 px-8 lg:px-16 bg-stone/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.28em] uppercase text-stone mb-3 font-light">
              Our Promise
            </p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-[-0.02em]">
              The Aureon Standard
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { 
                number: "01", 
                title: "Curated Selection", 
                desc: "Fewer products. Higher standards. Every item vetted for design integrity." 
              },
              { 
                number: "02", 
                title: "Global Perspective", 
                desc: "Inspired by the best of Scandinavian, Japanese, and Swiss design traditions." 
              },
              { 
                number: "03", 
                title: "Timeless Quality", 
                desc: "What looks right today should still look right in five years." 
              },
              { 
                number: "04", 
                title: "Transparent Pricing", 
                desc: "No artificial markups. No flash sales. Honest value, always." 
              },
            ].map((item, index) => (
              <div key={item.title} className="text-center group">
                <div className="relative mb-8">
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-stone/20 text-5xl font-serif italic">
                    {item.number}
                  </span>
                </div>
                <h3 className="text-sm font-medium tracking-[0.12em] uppercase mb-4">
                  {item.title}
                </h3>
                <p className="text-stone/70 text-sm leading-relaxed max-w-xs mx-auto font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-28 px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-transparent" />
        </div>
        <div className="max-w-[1440px] mx-auto text-center relative">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 tracking-[-0.02em] leading-[1.2]">
            Buy less. <span className="italic text-gold font-light">Choose better.</span>
          </h2>
          <div className="w-20 h-px bg-gold/30 mx-auto my-8" />
          <p className="text-stone/80 text-sm md:text-base max-w-md mx-auto mb-12 leading-relaxed font-light">
            Discover objects that earn their place in your life.
          </p>
          <Link
            href="/shop"
            className="group bg-charcoal text-ivory px-12 py-5 text-sm tracking-[0.15em] uppercase inline-flex items-center gap-3 transition-all hover:bg-charcoal/90 hover:gap-4"
          >
            Shop the Collection <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <TrustBadges />
    </>
  );
}