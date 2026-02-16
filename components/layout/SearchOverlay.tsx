"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { searchProducts, products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export default function SearchOverlay() {
  const { setIsSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length > 1 ? searchProducts(query) : [];
  const trending = products.slice(0, 4);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setIsSearchOpen]);

  return (
    <div className="fixed inset-0 z-[60] bg-ivory/98 backdrop-blur-lg animate-fade-in">
      <div className="max-w-2xl mx-auto px-6 pt-24">
        {/* Close */}
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-6 right-6 text-charcoal hover:text-gold transition-colors"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Search input */}
        <div className="flex items-center gap-4 border-b-2 border-charcoal pb-4 mb-8">
          <Search size={20} strokeWidth={1.5} className="text-stone flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="!border-0 !p-0 text-2xl heading-serif !bg-transparent focus:outline-none w-full placeholder:text-warm-gray"
          />
        </div>

        {/* Results */}
        {query.length > 1 ? (
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-stone mb-6">
              {results.length} Result{results.length !== 1 ? "s" : ""}
            </p>
            <div className="space-y-4 max-h-[50vh] overflow-y-auto">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-ivory-dark transition-colors"
                >
                  <div className="w-16 h-16 bg-ivory-dark rounded overflow-hidden flex-shrink-0">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-stone">{product.category}</p>
                  </div>
                  <p className="text-sm">{formatPrice(product.price)}</p>
                </Link>
              ))}
              {results.length === 0 && (
                <p className="text-stone text-sm py-8 text-center">No products found. Try a different search.</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-stone mb-6">Popular</p>
            <div className="space-y-3">
              {trending.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-ivory-dark transition-colors"
                >
                  <div className="w-12 h-12 bg-ivory-dark rounded overflow-hidden flex-shrink-0">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm">{product.name}</p>
                    <p className="text-xs text-stone">{formatPrice(product.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
