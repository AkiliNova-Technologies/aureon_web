"use client";

import Link from "next/link";
import { X, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import TrustBadges from "@/components/ui/TrustBadges";
import { useStore } from "@/lib/store";
import { formatPrice, formatDate } from "@/lib/utils";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  return (
    <>
      <PageHeader title="Wishlist" breadcrumbs={[{ name: "Home", href: "/" }, { name: "Wishlist" }]} />
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          {wishlist.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={48} strokeWidth={1} className="text-warm-gray mx-auto mb-6" />
              <h2 className="heading-serif text-3xl mb-3">Your wishlist is empty</h2>
              <p className="text-stone text-sm mb-8">Save items you love for later.</p>
              <Link href="/shop" className="btn-primary px-10 py-3.5 text-sm tracking-[0.1em] uppercase inline-flex items-center gap-3">
                Browse Collection <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <>
              {/* Table header */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-warm-gray/30 text-xs tracking-[0.12em] uppercase text-stone">
                <div className="col-span-5">Product</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Date Added</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-2 text-right">Action</div>
              </div>
              <div className="divide-y divide-warm-gray/20">
                {wishlist.map((item) => (
                  <div key={item.product.id} className="grid grid-cols-12 gap-4 py-6 items-center">
                    <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                      <button onClick={() => removeFromWishlist(item.product.id)} className="text-warm-gray hover:text-charcoal transition-colors flex-shrink-0"><X size={14} /></button>
                      <div className="w-16 h-16 bg-ivory-dark rounded overflow-hidden flex-shrink-0">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <Link href={`/shop/${item.product.slug}`} className="text-sm font-medium hover:text-gold transition-colors">{item.product.name}</Link>
                        <p className="text-xs text-stone mt-0.5">{item.product.category}</p>
                      </div>
                    </div>
                    <div className="col-span-4 md:col-span-2 text-sm">{formatPrice(item.product.price)}</div>
                    <div className="col-span-4 md:col-span-2 text-xs text-stone">{formatDate(item.addedAt)}</div>
                    <div className="col-span-4 md:col-span-1">
                      <span className={`text-xs tracking-wider uppercase ${item.product.inStock ? "text-success" : "text-error"}`}>
                        {item.product.inStock ? "In Stock" : "Sold Out"}
                      </span>
                    </div>
                    <div className="col-span-12 md:col-span-2 text-right">
                      {item.product.inStock && (
                        <button
                          onClick={() => addToCart(item.product)}
                          className="btn-primary px-5 py-2 text-xs tracking-[0.08em] uppercase inline-flex items-center gap-2"
                        >
                          <ShoppingBag size={12} /> Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <TrustBadges />
    </>
  );
}
