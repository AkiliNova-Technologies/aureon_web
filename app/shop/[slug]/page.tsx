"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Heart, Minus, Plus, Share2, ChevronRight, Star } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import TrustBadges from "@/components/ui/TrustBadges";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { useStore } from "@/lib/store";
import { formatPrice, cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug) || products[0];
  const related = getRelatedProducts(product);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product.variants?.[0]?.options[0]
  );
  const [activeTab, setActiveTab] = useState<"description" | "details" | "reviews">("description");
  const [activeImage, setActiveImage] = useState(0);
  const inWishlist = isInWishlist(product.id);

  const tabs = [
    { key: "description", label: "Description" },
    { key: "details", label: "Additional Information" },
    { key: "reviews", label: `Reviews (${product.reviews})` },
  ] as const;

  return (
    <>
      <section className="py-12 lg:py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs tracking-[0.1em] uppercase mb-10 text-stone">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <ChevronRight size={10} />
            <Link href="/shop" className="hover:text-charcoal transition-colors">Shop</Link>
            <ChevronRight size={10} />
            <span className="text-charcoal">{product.name}</span>
          </nav>

          {/* Product layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Images */}
            <div>
              <div className="aspect-square bg-ivory-dark rounded-lg overflow-hidden mb-4">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={cn(
                        "w-20 h-20 rounded overflow-hidden border-2 transition-colors",
                        activeImage === i ? "border-charcoal" : "border-transparent"
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:py-4">
              <p className="text-xs tracking-[0.2em] uppercase text-stone mb-3">{product.category}</p>
              <h1 className="heading-serif text-3xl md:text-4xl mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={cn(
                        i < Math.round(product.rating) ? "text-gold fill-gold" : "text-warm-gray"
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-stone">
                  {product.rating} ({product.reviews} reviews)
                </span>
                {product.inStock && (
                  <span className="text-xs text-success ml-2 tracking-wider uppercase">In Stock</span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="heading-serif text-2xl">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-stone line-through text-sm">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-stone text-sm leading-relaxed mb-8">
                {product.shortDescription}
              </p>

              {/* Variants */}
              {product.variants?.map((variant) => (
                <div key={variant.label} className="mb-6">
                  <p className="text-xs tracking-[0.12em] uppercase font-medium mb-3">
                    {variant.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedVariant(opt)}
                        className={cn(
                          "px-4 py-2.5 text-xs tracking-wider border rounded-md transition-all",
                          selectedVariant === opt
                            ? "border-charcoal bg-charcoal text-ivory"
                            : "border-warm-gray/50 text-stone hover:border-charcoal hover:text-charcoal"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-warm-gray/50 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-stone hover:text-charcoal transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-stone hover:text-charcoal transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => product.inStock && addToCart(product, quantity, selectedVariant)}
                  disabled={!product.inStock}
                  className={cn(
                    "btn-primary flex-1 py-3.5 text-sm tracking-[0.1em] uppercase text-center",
                    !product.inStock && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>

                <button
                  onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product)}
                  className={cn(
                    "w-12 h-12 border rounded-md flex items-center justify-center transition-all",
                    inWishlist
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-warm-gray/50 text-stone hover:border-charcoal hover:text-charcoal"
                  )}
                >
                  <Heart size={16} strokeWidth={1.5} fill={inWishlist ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Meta */}
              <div className="border-t border-warm-gray/30 pt-6 space-y-2 text-xs text-stone">
                <p><span className="text-charcoal font-medium">SKU:</span> {product.sku}</p>
                <p><span className="text-charcoal font-medium">Tags:</span> {product.tags.join(", ")}</p>
                <button className="flex items-center gap-1.5 hover:text-charcoal transition-colors mt-2">
                  <Share2 size={12} /> Share
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-20">
            <div className="flex gap-8 border-b border-warm-gray/30 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "pb-4 text-sm tracking-[0.06em] border-b-2 transition-all -mb-px",
                    activeTab === tab.key
                      ? "text-charcoal border-gold font-medium"
                      : "text-stone border-transparent hover:text-charcoal"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "description" && (
              <div className="max-w-3xl">
                <p className="text-stone text-sm leading-[1.8]">{product.description}</p>
              </div>
            )}

            {activeTab === "details" && product.attributes && (
              <div className="max-w-2xl">
                <table className="w-full">
                  <tbody>
                    {product.attributes.map((attr, i) => (
                      <tr key={attr.key} className={cn(i % 2 === 0 ? "bg-ivory-dark" : "")}>
                        <td className="py-3 px-4 text-sm font-medium text-charcoal w-1/3">
                          {attr.key}
                        </td>
                        <td className="py-3 px-4 text-sm text-stone">{attr.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-3xl">
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-center">
                    <p className="heading-serif text-4xl">{product.rating}</p>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className={cn(i < Math.round(product.rating) ? "text-gold fill-gold" : "text-warm-gray")} />
                      ))}
                    </div>
                    <p className="text-xs text-stone mt-1">{product.reviews} reviews</p>
                  </div>
                </div>
                {[
                  { name: "M. Chen", rating: 5, date: "Dec 2025", text: "Exceptional quality and design. Exactly what I was looking for — understated, functional, and beautifully made." },
                  { name: "S. Eriksson", rating: 4, date: "Nov 2025", text: "Very pleased with the craftsmanship. The materials feel premium and the design integrates seamlessly into my space." },
                ].map((review, i) => (
                  <div key={i} className="border-t border-warm-gray/30 py-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-ivory-dark flex items-center justify-center text-xs font-medium text-stone">
                          {review.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium">{review.name}</span>
                      </div>
                      <span className="text-xs text-stone">{review.date}</span>
                    </div>
                    <div className="flex mb-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={11} className={cn(j < review.rating ? "text-gold fill-gold" : "text-warm-gray")} />
                      ))}
                    </div>
                    <p className="text-stone text-sm leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-24">
              <p className="text-xs tracking-[0.25em] uppercase text-stone mb-3 text-center">You May Also Like</p>
              <h2 className="heading-serif text-3xl text-center mb-12">Related Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <TrustBadges />
    </>
  );
}
