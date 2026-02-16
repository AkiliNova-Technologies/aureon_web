"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/products";
import { useStore } from "@/lib/store";
import { formatPrice, cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className={cn("group", className)}>
      {/* Image */}
      <Link href={`/shop/${product.slug}`} className="block relative product-image-wrapper rounded-lg overflow-hidden bg-ivory-dark aspect-[4/5] mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 bg-charcoal text-ivory text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 rounded">
            {product.badge}
          </span>
        )}

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-ivory/60 flex items-center justify-center">
            <span className="text-xs tracking-[0.15em] uppercase text-charcoal">Out of Stock</span>
          </div>
        )}

        {/* Quick actions */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              inWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
            }}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
              inWishlist
                ? "bg-gold text-charcoal"
                : "bg-ivory/90 text-charcoal hover:bg-gold"
            )}
          >
            <Heart size={14} strokeWidth={1.5} fill={inWishlist ? "currentColor" : "none"} />
          </button>
          {product.inStock && (
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="w-9 h-9 rounded-full bg-charcoal text-ivory flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all duration-300"
            >
              <ShoppingBag size={14} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="space-y-1.5">
        <p className="text-[10px] tracking-[0.15em] uppercase text-stone">{product.category}</p>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-sm font-medium text-charcoal hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-stone line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={cn("text-xs", i < Math.round(product.rating) ? "text-gold" : "text-warm-gray")}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-[10px] text-stone">({product.reviews})</span>
        </div>
      </div>
    </div>
  );
}
