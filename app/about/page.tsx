import { ArrowRight } from "lucide-react";
import Link from "next/link";
import TrustBadges from "@/components/ui/TrustBadges";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal text-ivory py-32 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-charcoal/70" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-6">Our Story</p>
          <h1 className="heading-serif text-4xl md:text-5xl lg:text-6xl mb-6">Quality is not about luxury pricing. It is about <span className="italic text-gold/80">intention.</span></h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-stone text-base leading-[1.9] mb-8">
            Aureon was born from a belief that the best products are quiet. They do not beg for attention. They simply work — beautifully.
          </p>
          <p className="text-stone text-base leading-[1.9] mb-8">
            The founders traveled, observed, and studied how people live well across cultures — from minimalist Scandinavian interiors to precision-driven Japanese design. What they found was consistent: purposeful objects, made with care, designed without excess.
          </p>
          <p className="text-stone text-base leading-[1.9]">
            Aureon exists to bring those products together in one place, removing excess and elevating the everyday. Every item is selected for purpose, longevity, aesthetic restraint, and universal appeal.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 lg:px-12 bg-charcoal text-ivory">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-stone mb-3 text-center">What We Believe</p>
          <h2 className="heading-serif text-3xl md:text-4xl text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
            {[
              { title: "Curation over Abundance", desc: "Fewer products. Higher standards. We would rather offer 50 exceptional items than 5,000 mediocre ones." },
              { title: "Timeless over Trendy", desc: "What looks right today should still look right in five years. We resist fleeting trends in favor of enduring design." },
              { title: "Global Sensibility", desc: "Designed for no single country — but for modern life everywhere. Our perspective is informed by the world's best design traditions." },
              { title: "Quiet Confidence", desc: "The product speaks louder than the marketing. We let quality and craftsmanship do the talking." },
            ].map((v) => (
              <div key={v.title}>
                <div className="w-8 h-px bg-gold mb-4" />
                <h3 className="text-sm font-medium tracking-[0.08em] uppercase mb-3">{v.title}</h3>
                <p className="text-stone text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-12 text-center">
        <h2 className="heading-serif text-3xl md:text-4xl mb-4">Experience the Aureon difference.</h2>
        <p className="text-stone text-sm mb-8 max-w-md mx-auto leading-relaxed">
          Discover a collection where every product earns its place.
        </p>
        <Link href="/shop" className="btn-primary px-12 py-4 text-sm tracking-[0.12em] uppercase inline-flex items-center gap-3">
          Shop the Collection <ArrowRight size={14} />
        </Link>
      </section>

      <TrustBadges />
    </>
  );
}
