"use client";

import { useState } from "react";
import { Search, Plus, MoreHorizontal, Pencil, Trash2, Eye, Star } from "lucide-react";
import { products, categories } from "@/lib/products";
import { formatPrice, cn } from "@/lib/utils";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "all" || p.categorySlug === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-serif text-2xl">Product Management</h1>
          <p className="text-stone text-sm mt-1">{products.length} products in catalogue</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary px-5 py-2.5 text-xs tracking-[0.08em] uppercase flex items-center gap-2"
        >
          <Plus size={14} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-warm-gray/20 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name or SKU..."
            className="!pl-10 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setCategoryFilter("all")}
            className={cn("px-4 py-2 text-xs tracking-wider uppercase rounded-md border transition-all", categoryFilter === "all" ? "border-charcoal bg-charcoal text-ivory" : "border-warm-gray/30 text-stone hover:border-charcoal hover:text-charcoal")}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setCategoryFilter(cat.slug)}
              className={cn("px-4 py-2 text-xs tracking-wider uppercase rounded-md border transition-all", categoryFilter === cat.slug ? "border-charcoal bg-charcoal text-ivory" : "border-warm-gray/30 text-stone hover:border-charcoal hover:text-charcoal")}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid/table */}
      <div className="bg-white border border-warm-gray/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs tracking-wider uppercase text-stone border-b border-warm-gray/20 bg-ivory-dark/50">
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-4 py-4 font-medium">SKU</th>
                <th className="px-4 py-4 font-medium">Category</th>
                <th className="px-4 py-4 font-medium">Price</th>
                <th className="px-4 py-4 font-medium">Rating</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-4 py-4 font-medium">Badge</th>
                <th className="px-4 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-warm-gray/10 last:border-0 hover:bg-ivory-dark/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-ivory-dark overflow-hidden flex-shrink-0">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-stone truncate max-w-[200px]">{product.shortDescription}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-stone font-mono">{product.sku}</td>
                  <td className="px-4 py-4">
                    <span className="text-xs tracking-wider text-stone">{product.category}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <span className="text-sm font-medium">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-stone line-through ml-1.5">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <Star size={11} className="text-gold fill-gold" />
                      <span className="text-xs">{product.rating}</span>
                      <span className="text-[10px] text-stone">({product.reviews})</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn("text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full font-medium", product.inStock ? "bg-success/10 text-success" : "bg-error/10 text-error")}>
                      {product.inStock ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {product.badge && (
                      <span className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-gold/10 text-gold font-medium">
                        {product.badge}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="relative">
                      <button
                        onClick={() => setActionMenu(actionMenu === product.id ? null : product.id)}
                        className="text-stone hover:text-charcoal transition-colors p-1"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      {actionMenu === product.id && (
                        <div className="absolute right-0 top-full mt-1 bg-white border border-warm-gray/30 rounded-lg shadow-lg py-2 min-w-[140px] z-10">
                          <button className="w-full text-left px-4 py-2 text-sm text-stone hover:text-charcoal hover:bg-ivory-dark flex items-center gap-2 transition-colors">
                            <Eye size={12} /> View
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-stone hover:text-charcoal hover:bg-ivory-dark flex items-center gap-2 transition-colors">
                            <Pencil size={12} /> Edit
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/5 flex items-center gap-2 transition-colors">
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add product modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-charcoal/40 z-50" onClick={() => setShowAddModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-ivory rounded-lg shadow-2xl z-50 p-8 max-h-[80vh] overflow-y-auto animate-fade-in">
            <h2 className="heading-serif text-2xl mb-6">Add New Product</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Product Name *</label>
                <input type="text" placeholder="e.g. Walnut Desk Tray" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Price *</label>
                  <input type="number" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Category *</label>
                  <select>
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-stone mb-2 tracking-wider uppercase">SKU *</label>
                <input type="text" placeholder="AUR-XX-000" />
              </div>
              <div>
                <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Short Description *</label>
                <input type="text" placeholder="Brief product description" />
              </div>
              <div>
                <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Full Description</label>
                <textarea rows={4} placeholder="Detailed product description..." className="resize-none" />
              </div>
              <div>
                <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Image URL</label>
                <input type="text" placeholder="https://..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="btn-primary flex-1 py-3 text-sm tracking-[0.08em] uppercase">Save Product</button>
              <button onClick={() => setShowAddModal(false)} className="btn-secondary flex-1 py-3 text-sm tracking-[0.08em] uppercase">Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
