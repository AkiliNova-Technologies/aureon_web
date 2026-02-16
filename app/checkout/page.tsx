"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, Wallet, DollarSign, Check } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import TrustBadges from "@/components/ui/TrustBadges";
import { useStore } from "@/lib/store";
import { formatPrice, cn } from "@/lib/utils";

const paymentMethods = [
  { id: "card", label: "Credit Card", icon: CreditCard },
  { id: "paypal", label: "PayPal", icon: Wallet },
  { id: "cod", label: "Cash on Delivery", icon: DollarSign },
];

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount } = useStore();
  const [payment, setPayment] = useState("card");
  const [placed, setPlaced] = useState(false);

  const shipping = cartTotal >= 150 ? 0 : 12;
  const total = cartTotal + shipping;

  if (placed) {
    return (
      <>
        <section className="py-32 px-6 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={28} className="text-success" />
            </div>
            <h1 className="heading-serif text-3xl mb-3">Order Confirmed</h1>
            <p className="text-stone text-sm mb-2">Thank you for your purchase.</p>
            <p className="text-stone text-sm mb-8">Order #AUR-2026-0215 has been placed successfully.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/track-order" className="btn-primary px-8 py-3 text-sm tracking-[0.1em] uppercase">Track Order</Link>
              <Link href="/shop" className="btn-secondary px-8 py-3 text-sm tracking-[0.1em] uppercase">Continue Shopping</Link>
            </div>
          </div>
        </section>
        <TrustBadges />
      </>
    );
  }

  return (
    <>
      <PageHeader title="Checkout" breadcrumbs={[{ name: "Home", href: "/" }, { name: "Cart", href: "/cart" }, { name: "Checkout" }]} />
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2 space-y-10">
              {/* Shipping */}
              <div>
                <h2 className="text-sm tracking-[0.12em] uppercase font-medium mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone mb-2 tracking-wider uppercase">First Name *</label>
                    <input type="text" placeholder="First name" />
                  </div>
                  <div>
                    <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Last Name *</label>
                    <input type="text" placeholder="Last name" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Address *</label>
                    <input type="text" placeholder="Street address" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Apartment, suite (optional)</label>
                    <input type="text" placeholder="Apartment, suite, etc." />
                  </div>
                  <div>
                    <label className="block text-xs text-stone mb-2 tracking-wider uppercase">City *</label>
                    <input type="text" placeholder="City" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-stone mb-2 tracking-wider uppercase">State</label>
                      <select><option>Select state</option></select>
                    </div>
                    <div>
                      <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Zip *</label>
                      <input type="text" placeholder="Zip code" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Email *</label>
                    <input type="email" placeholder="Email address" />
                  </div>
                  <div>
                    <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Phone *</label>
                    <input type="tel" placeholder="Phone number" />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div>
                <h2 className="text-sm tracking-[0.12em] uppercase font-medium mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPayment(method.id)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 border rounded-lg transition-all text-left",
                        payment === method.id ? "border-charcoal bg-ivory-dark" : "border-warm-gray/30 hover:border-charcoal/30"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                        payment === method.id ? "border-charcoal" : "border-warm-gray"
                      )}>
                        {payment === method.id && <div className="w-2.5 h-2.5 rounded-full bg-charcoal" />}
                      </div>
                      <method.icon size={18} strokeWidth={1.5} className="text-stone" />
                      <span className="text-sm">{method.label}</span>
                    </button>
                  ))}
                </div>

                {payment === "card" && (
                  <div className="mt-6 space-y-4 p-6 bg-ivory-dark rounded-lg">
                    <div>
                      <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Card Holder Name *</label>
                      <input type="text" placeholder="Name on card" />
                    </div>
                    <div>
                      <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Card Number *</label>
                      <input type="text" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Expiry Date *</label>
                        <input type="text" placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="block text-xs text-stone mb-2 tracking-wider uppercase">CVV *</label>
                        <input type="text" placeholder="000" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-ivory-dark rounded-lg p-8 sticky top-24">
                <h3 className="text-sm tracking-[0.12em] uppercase font-medium mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-ivory rounded overflow-hidden flex-shrink-0">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{item.product.name}</p>
                        <p className="text-[10px] text-stone">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-xs font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm border-t border-warm-gray/30 pt-4">
                  <div className="flex justify-between"><span className="text-stone">Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
                  <div className="flex justify-between"><span className="text-stone">Shipping</span><span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span></div>
                  <div className="divider my-3" />
                  <div className="flex justify-between text-base font-medium"><span>Total</span><span>{formatPrice(total)}</span></div>
                </div>
                <button
                  onClick={() => setPlaced(true)}
                  className="btn-primary block w-full text-center py-3.5 text-sm tracking-[0.1em] uppercase mt-6"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TrustBadges />
    </>
  );
}
