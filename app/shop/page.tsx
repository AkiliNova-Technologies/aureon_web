"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Grid3X3, LayoutList, ChevronDown } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ProductCard from "@/components/ui/ProductCard";
import TrustBadges from "@/components/ui/TrustBadges";
import { products, categories } from "@/lib/products";
import { cn } from "@/lib/utils";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Best Rated", value: "rating" },
];

export default function ShopPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ShopPage />
    </Suspense>
  );
}

function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState<3 | 2>(3);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (activeCategory !== "all") {
      result = result.filter((p) => p.categorySlug === activeCategory);
    }
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }
    return result;
  }, [activeCategory, sortBy]);

  return (
    <>
      <PageHeader
        title="Shop"
        subtitle="A curated selection of objects designed for modern living"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Shop" },
        ]}
      />

      <section className="py-12 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Category tabs */}
          <div className="flex items-center gap-6 mb-10 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "text-xs tracking-[0.12em] uppercase whitespace-nowrap pb-2 border-b-2 transition-all",
                activeCategory === "all"
                  ? "text-charcoal border-gold"
                  : "text-stone border-transparent hover:text-charcoal"
              )}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={cn(
                  "text-xs tracking-[0.12em] uppercase whitespace-nowrap pb-2 border-b-2 transition-all",
                  activeCategory === cat.slug
                    ? "text-charcoal border-gold"
                    : "text-stone border-transparent hover:text-charcoal"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs text-stone">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setShowSort(!showSort)}
                  className="flex items-center gap-2 text-xs tracking-[0.08em] uppercase text-stone hover:text-charcoal transition-colors"
                >
                  Sort <ChevronDown size={12} />
                </button>
                {showSort && (
                  <div className="absolute top-full right-0 mt-2 bg-ivory border border-warm-gray/30 rounded-lg shadow-lg py-2 min-w-[180px] z-10">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                        className={cn(
                          "block w-full text-left px-4 py-2 text-sm transition-colors",
                          sortBy === opt.value ? "text-charcoal bg-ivory-dark" : "text-stone hover:text-charcoal hover:bg-ivory-dark"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Grid toggle */}
              <div className="hidden md:flex items-center gap-1 border-l border-warm-gray/30 pl-4">
                <button
                  onClick={() => setGridCols(3)}
                  className={cn("p-1.5", gridCols === 3 ? "text-charcoal" : "text-warm-gray")}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setGridCols(2)}
                  className={cn("p-1.5", gridCols === 2 ? "text-charcoal" : "text-warm-gray")}
                >
                  <LayoutList size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div
            className={cn(
              "grid gap-x-6 gap-y-10",
              gridCols === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
            )}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="heading-serif text-2xl mb-2">No products found</p>
              <p className="text-stone text-sm">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>

      <TrustBadges />
    </>
  );
}
