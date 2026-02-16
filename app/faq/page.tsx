"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import TrustBadges from "@/components/ui/TrustBadges";
import { cn } from "@/lib/utils";

const faqCategories = [
  {
    name: "General Information",
    faqs: [
      { q: "What is Aureon?", a: "Aureon is a premium online store offering carefully curated products that enhance modern living. Every item is selected for purpose, longevity, aesthetic restraint, and universal appeal." },
      { q: "Are all products in stock?", a: "We maintain real-time inventory. If an item shows as 'In Stock,' it is available for immediate shipment. Some items may be made to order — this will be clearly indicated on the product page." },
      { q: "Do you ship internationally?", a: "Yes. We ship to over 40 countries worldwide. Shipping times and costs vary by destination. You can see exact shipping details at checkout." },
    ],
  },
  {
    name: "Ordering & Payment",
    faqs: [
      { q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are processed securely." },
      { q: "Can I modify or cancel my order?", a: "Orders can be modified or cancelled within 2 hours of placement. After this window, the order enters processing. Contact our concierge team immediately if changes are needed." },
      { q: "Do you offer gift wrapping?", a: "Yes. Every Aureon order comes in premium packaging. Gift wrapping with a personalized note is available for an additional $8." },
    ],
  },
  {
    name: "Shipping & Delivery",
    faqs: [
      { q: "How long does shipping take?", a: "Standard shipping takes 5–7 business days within the US and 7–14 business days internationally. Express options are available at checkout." },
      { q: "Is shipping free?", a: "Complimentary shipping is provided on all orders above $150. Orders below this threshold incur a flat $12 shipping fee." },
      { q: "How can I track my order?", a: "Once shipped, you will receive a confirmation email with a tracking number. You can also track your order at any time using our Track Order page." },
    ],
  },
  {
    name: "Returns & Exchanges",
    faqs: [
      { q: "What is your return policy?", a: "We offer a 30-day return policy on all unused items in original packaging. Refunds are processed within 5–7 business days of receiving the return." },
      { q: "How do I initiate a return?", a: "Contact our concierge team or visit your account's order history to initiate a return. We will provide a prepaid return label." },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <>
      <PageHeader title="FAQs" breadcrumbs={[{ name: "Home", href: "/" }, { name: "FAQs" }]} />
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Categories sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                {faqCategories.map((cat, i) => (
                  <button
                    key={cat.name}
                    onClick={() => { setActiveCategory(i); setOpenFaq(null); }}
                    className={cn(
                      "w-full text-left px-5 py-3.5 rounded-lg text-sm transition-all",
                      activeCategory === i ? "bg-charcoal text-ivory" : "text-stone hover:text-charcoal hover:bg-ivory-dark"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* FAQ content */}
            <div className="lg:col-span-3">
              <div className="space-y-3">
                {faqCategories[activeCategory].faqs.map((faq) => {
                  const isOpen = openFaq === faq.q;
                  return (
                    <div key={faq.q} className={cn("border rounded-lg transition-colors", isOpen ? "border-charcoal bg-charcoal" : "border-warm-gray/30")}>
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : faq.q)}
                        className={cn("w-full flex items-center justify-between px-6 py-5 text-left", isOpen ? "text-ivory" : "text-charcoal")}
                      >
                        <span className="text-sm font-medium pr-4">{faq.q}</span>
                        {isOpen ? <Minus size={16} className="flex-shrink-0 text-gold" /> : <Plus size={16} className="flex-shrink-0 text-stone" />}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5">
                          <p className="text-sm text-stone leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <TrustBadges />
    </>
  );
}
