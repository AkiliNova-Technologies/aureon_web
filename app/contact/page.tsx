import { Mail, Phone, MapPin, Clock } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import TrustBadges from "@/components/ui/TrustBadges";

const contactInfo = [
  { icon: Mail, label: "Email", value: "concierge@aureon.co", href: "mailto:concierge@aureon.co" },
  { icon: Phone, label: "Phone", value: "+1 (555) 890-1234", href: "tel:+15558901234" },
  { icon: MapPin, label: "Address", value: "142 Design District\nBrooklyn, NY 11201" },
  { icon: Clock, label: "Hours", value: "Mon–Fri: 9AM–6PM EST\nSat: 10AM–4PM EST" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" subtitle="We are here to help. Reach out anytime." breadcrumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="heading-serif text-2xl mb-6">Send us a message</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Name *</label>
                  <input type="text" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Email *</label>
                  <input type="email" placeholder="Your email" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Subject</label>
                  <input type="text" placeholder="How can we help?" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Message *</label>
                  <textarea rows={6} placeholder="Tell us more..." className="resize-none" />
                </div>
              </div>
              <button className="btn-primary px-10 py-3.5 text-sm tracking-[0.1em] uppercase mt-6">Send Message</button>
            </div>
            <div>
              <h2 className="heading-serif text-2xl mb-6">Get in touch</h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-ivory-dark flex items-center justify-center flex-shrink-0">
                      <item.icon size={16} strokeWidth={1.5} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-xs tracking-wider uppercase text-stone mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm hover:text-gold transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-sm whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <TrustBadges />
    </>
  );
}
