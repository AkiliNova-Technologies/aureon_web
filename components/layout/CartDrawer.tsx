"use client";

import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount } = useStore();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-charcoal/40 z-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-ivory z-50 shadow-2xl flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-warm-gray/30">
          <h2 className="text-xs tracking-[0.15em] uppercase font-medium">
            Cart ({cartCount})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-charcoal hover:text-gold transition-colors"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={40} strokeWidth={1} className="text-warm-gray mb-4" />
              <p className="heading-serif text-xl mb-2">Your cart is empty</p>
              <p className="text-stone text-sm mb-6">Discover something beautiful.</p>
              <Link
                href="/shop"
                onClick={() => setIsCartOpen(false)}
                className="btn-primary px-8 py-3 text-sm tracking-[0.08em] uppercase inline-block"
              >
                Browse Collection
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-ivory-dark rounded-md flex-shrink-0 overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-charcoal truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-stone mt-0.5">{item.product.category}</p>
                        {item.variant && (
                          <p className="text-xs text-stone">{item.variant}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone hover:text-charcoal transition-colors ml-2"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 border border-warm-gray/40 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-stone hover:text-charcoal transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-stone hover:text-charcoal transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-8 py-6 border-t border-warm-gray/30 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-stone">Subtotal</span>
              <span className="text-lg font-medium">{formatPrice(cartTotal)}</span>
            </div>
            <p className="text-xs text-stone">Shipping calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="btn-primary block w-full text-center py-3.5 text-sm tracking-[0.08em] uppercase"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/cart"
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center py-2 text-sm text-stone hover:text-charcoal transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
