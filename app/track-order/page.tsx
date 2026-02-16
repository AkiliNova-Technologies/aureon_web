"use client";

import { useState } from "react";
import { Package, CheckCircle2, Truck, MapPin, Clock } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import TrustBadges from "@/components/ui/TrustBadges";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Order Placed", icon: Package, date: "Feb 10, 2026 · 2:15 PM", completed: true },
  { label: "Accepted", icon: CheckCircle2, date: "Feb 10, 2026 · 2:30 PM", completed: true },
  { label: "In Progress", icon: Clock, date: "Expected Feb 12", completed: false, active: true },
  { label: "On the Way", icon: Truck, date: "Expected Feb 13", completed: false },
  { label: "Delivered", icon: MapPin, date: "Expected Feb 14", completed: false },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [tracking, setTracking] = useState(false);

  return (
    <>
      <PageHeader title="Track Your Order" breadcrumbs={[{ name: "Home", href: "/" }, { name: "Track Order" }]} />
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          {!tracking ? (
            <div>
              <p className="text-stone text-sm leading-relaxed mb-8">
                Enter your Order ID and email address to track the status of your order. You can find your Order ID in the confirmation email.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Order ID *</label>
                  <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="e.g. AUR-2026-0188" />
                </div>
                <div>
                  <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Email Address *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                </div>
              </div>
              <button
                onClick={() => setTracking(true)}
                className="btn-primary px-10 py-3.5 text-sm tracking-[0.1em] uppercase mt-6"
              >
                Track Order
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <h2 className="text-sm tracking-[0.12em] uppercase font-medium mb-1">Order Status</h2>
                <p className="text-xs text-stone">Order ID: #AUR-2026-0188</p>
              </div>

              {/* Progress */}
              <div className="relative">
                {steps.map((step, i) => (
                  <div key={step.label} className="flex gap-6 pb-10 last:pb-0">
                    {/* Line + dot */}
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                        step.completed ? "bg-charcoal text-ivory" : step.active ? "bg-gold text-charcoal" : "bg-ivory-dark text-stone"
                      )}>
                        <step.icon size={16} strokeWidth={1.5} />
                      </div>
                      {i < steps.length - 1 && (
                        <div className={cn(
                          "w-px flex-1 mt-2",
                          step.completed ? "bg-charcoal" : "bg-warm-gray/30"
                        )} />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pt-2">
                      <p className={cn("text-sm font-medium", step.completed || step.active ? "text-charcoal" : "text-stone")}>{step.label}</p>
                      <p className="text-xs text-stone mt-0.5">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Products in order */}
              <div className="mt-10 pt-8 border-t border-warm-gray/30">
                <h3 className="text-xs tracking-[0.12em] uppercase text-stone mb-4">Products</h3>
                <div className="space-y-3">
                  {[
                    { name: "Atlas Weekender Bag", variant: "Cognac", qty: 1 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-ivory-dark rounded flex-shrink-0" />
                      <div>
                        <p className="text-sm">{item.name}</p>
                        <p className="text-xs text-stone">{item.variant} · Qty {item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setTracking(false)} className="btn-secondary px-8 py-3 text-sm tracking-[0.1em] uppercase mt-8">
                Track Another Order
              </button>
            </div>
          )}
        </div>
      </section>
      <TrustBadges />
    </>
  );
}
