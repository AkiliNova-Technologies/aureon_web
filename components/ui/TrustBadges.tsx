import { Truck, Shield, Headphones } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Complimentary on orders above $150",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "Every item curated for excellence",
    },
    {
      icon: Headphones,
      title: "Concierge Support",
      description: "Dedicated assistance, always available",
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-12 border-t border-warm-gray/30">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {badges.map((badge) => (
            <div key={badge.title} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-ivory-dark flex items-center justify-center flex-shrink-0">
                <badge.icon size={18} strokeWidth={1.5} className="text-gold" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-charcoal mb-1">{badge.title}</h3>
                <p className="text-xs text-stone leading-relaxed">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
