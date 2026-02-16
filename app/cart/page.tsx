"use client";

import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import TrustBadges from "@/components/ui/TrustBadges";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useStore();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = cartTotal >= 150 ? 0 : 12;
  const total = cartTotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "aureon10") setDiscount(cartTotal * 0.1);
  };

  return (
    <>
      <PageHeader title="Shopping Cart" breadcrumbs={[{ name: "Home", href: "/" }, { name: "Shopping Cart" }]} />
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={48} strokeWidth={1} className="text-warm-gray mx-auto mb-6" />
              <h2 className="heading-serif text-3xl mb-3">Your cart is empty</h2>
              <p className="text-stone text-sm mb-8">Discover something beautiful to add.</p>
              <Link href="/shop" className="btn-primary px-10 py-3.5 text-sm tracking-[0.1em] uppercase inline-flex items-center gap-3">
                Browse Collection <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-warm-gray/30 text-xs tracking-[0.12em] uppercase text-stone">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>
                <div className="divide-y divide-warm-gray/20">
                  {cart.map((item) => (
                    <div key={item.product.id} className="grid grid-cols-12 gap-4 py-6 items-center">
                      <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                        <button onClick={() => removeFromCart(item.product.id)} className="text-warm-gray hover:text-charcoal transition-colors flex-shrink-0"><X size={14} /></button>
                        <div className="w-20 h-20 bg-ivory-dark rounded overflow-hidden flex-shrink-0">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <Link href={`/shop/${item.product.slug}`} className="text-sm font-medium hover:text-gold transition-colors">{item.product.name}</Link>
                          <p className="text-xs text-stone mt-0.5">{item.product.category}</p>
                        </div>
                      </div>
                      <div className="col-span-4 md:col-span-2 text-sm text-stone">{formatPrice(item.product.price)}</div>
                      <div className="col-span-4 md:col-span-2">
                        <div className="inline-flex items-center border border-warm-gray/40 rounded-md">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 text-stone hover:text-charcoal"><Minus size={12} /></button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-2 text-stone hover:text-charcoal"><Plus size={12} /></button>
                        </div>
                      </div>
                      <div className="col-span-4 md:col-span-2 text-sm font-medium text-right">{formatPrice(item.product.price * item.quantity)}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-warm-gray/30">
                  <div className="flex gap-3">
                    <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="!w-auto text-sm" />
                    <button onClick={applyCoupon} className="btn-primary px-6 py-2.5 text-xs tracking-[0.1em] uppercase">Apply</button>
                  </div>
                  <button onClick={clearCart} className="text-xs text-stone hover:text-error tracking-wider uppercase transition-colors">Clear Cart</button>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-ivory-dark rounded-lg p-8">
                  <h3 className="text-sm tracking-[0.12em] uppercase font-medium mb-6">Order Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-stone">Items</span><span>{cartCount}</span></div>
                    <div className="flex justify-between"><span className="text-stone">Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
                    <div className="flex justify-between"><span className="text-stone">Shipping</span><span>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</span></div>
                    {discount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
                    <div className="divider my-4" />
                    <div className="flex justify-between text-base font-medium"><span>Total</span><span>{formatPrice(total)}</span></div>
                  </div>
                  <Link href="/checkout" className="btn-primary block w-full text-center py-3.5 text-sm tracking-[0.1em] uppercase mt-6">Proceed to Checkout</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <TrustBadges />
    </>
  );
}
