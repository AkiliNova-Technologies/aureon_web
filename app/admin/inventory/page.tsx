"use client";

import { useState } from "react";
import { Search, AlertTriangle, Package, RefreshCw } from "lucide-react";
import { inventoryItems } from "@/lib/admin-data";
import { formatPrice, cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; cls: string }> = {
  in_stock: { label: "In Stock", cls: "bg-success/10 text-success" },
  low_stock: { label: "Low Stock", cls: "bg-warning/10 text-warning" },
  out_of_stock: { label: "Out of Stock", cls: "bg-error/10 text-error" },
};

export default function AdminInventoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showRestock, setShowRestock] = useState<string | null>(null);

  const filtered = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalItems = inventoryItems.reduce((sum, i) => sum + i.stock, 0);
  const lowStockCount = inventoryItems.filter((i) => i.status === "low_stock").length;
  const outOfStockCount = inventoryItems.filter((i) => i.status === "out_of_stock").length;
  const totalValue = inventoryItems.reduce((sum, i) => sum + i.stock * i.price, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="heading-serif text-2xl">Inventory Management</h1>
        <p className="text-stone text-sm mt-1">Monitor stock levels and restock products</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-warm-gray/20 rounded-lg p-5">
          <p className="text-xs text-stone tracking-wider uppercase mb-1">Total Units</p>
          <p className="heading-serif text-2xl">{totalItems}</p>
        </div>
        <div className="bg-white border border-warm-gray/20 rounded-lg p-5">
          <p className="text-xs text-stone tracking-wider uppercase mb-1">Inventory Value</p>
          <p className="heading-serif text-2xl">{formatPrice(totalValue)}</p>
        </div>
        <div className="bg-white border border-warning/20 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={12} className="text-warning" />
            <p className="text-xs text-warning tracking-wider uppercase">Low Stock</p>
          </div>
          <p className="heading-serif text-2xl">{lowStockCount} items</p>
        </div>
        <div className="bg-white border border-error/20 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-1">
            <Package size={12} className="text-error" />
            <p className="text-xs text-error tracking-wider uppercase">Out of Stock</p>
          </div>
          <p className="heading-serif text-2xl">{outOfStockCount} items</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-warm-gray/20 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name or SKU..."
            className="!pl-10 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "in_stock", "low_stock", "out_of_stock"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-4 py-2 text-xs tracking-wider uppercase rounded-md border transition-all",
                statusFilter === status
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-warm-gray/30 text-stone hover:border-charcoal hover:text-charcoal"
              )}
            >
              {status === "all" ? "All" : status.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-warm-gray/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs tracking-wider uppercase text-stone border-b border-warm-gray/20 bg-ivory-dark/50">
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-4 py-4 font-medium">SKU</th>
                <th className="px-4 py-4 font-medium">Category</th>
                <th className="px-4 py-4 font-medium text-center">Stock</th>
                <th className="px-4 py-4 font-medium text-center">Threshold</th>
                <th className="px-4 py-4 font-medium text-center">Unit Price</th>
                <th className="px-4 py-4 font-medium text-center">Value</th>
                <th className="px-4 py-4 font-medium text-center">Status</th>
                <th className="px-4 py-4 font-medium text-center">Last Restocked</th>
                <th className="px-4 py-4 font-medium text-center"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const config = statusConfig[item.status];
                const stockPercent = Math.min(100, (item.stock / (item.lowStockThreshold * 5)) * 100);
                return (
                  <tr key={item.id} className="border-b border-warm-gray/10 last:border-0 hover:bg-ivory-dark/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">{item.name}</p>
                    </td>
                    <td className="px-4 py-4 text-xs text-stone font-mono">{item.sku}</td>
                    <td className="px-4 py-4 text-xs text-stone">{item.category}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-sm font-medium w-8">{item.stock}</span>
                        {/* <div className="w-20 h-1.5 bg-ivory-dark rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              item.status === "out_of_stock" ? "bg-error" : item.status === "low_stock" ? "bg-warning" : "bg-success"
                            )}
                            style={{ width: `${stockPercent}%` }}
                          />
                        </div> */}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-stone text-center">{item.lowStockThreshold}</td>
                    <td className="px-4 py-4 text-sm text-center">{formatPrice(item.price)}</td>
                    <td className="px-4 py-4 text-sm text-center">{formatPrice(item.stock * item.price)}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={cn("text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full font-medium", config.cls)}>
                        {config.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-stone text-center">{item.lastRestocked}</td>
                    <td className="px-4 py-4">
                      <div className="relative">
                        <button
                          onClick={() => setShowRestock(showRestock === item.id ? null : item.id)}
                          className="text-stone hover:text-charcoal transition-colors p-1 flex items-center gap-1 text-xs"
                        >
                          <RefreshCw size={12} /> Restock
                        </button>
                        {showRestock === item.id && (
                          <div className="absolute right-0 top-full mt-1 bg-white border border-warm-gray/30 rounded-lg shadow-lg p-4 min-w-[200px] z-10">
                            <p className="text-xs font-medium mb-3">Restock {item.name}</p>
                            <label className="block text-[10px] text-stone mb-1 tracking-wider uppercase">Quantity to add</label>
                            <input type="number" placeholder="0" className="!text-sm mb-3" />
                            <div className="flex gap-2">
                              <button className="btn-primary flex-1 py-2 text-[10px] tracking-wider uppercase">Confirm</button>
                              <button onClick={() => setShowRestock(null)} className="btn-secondary flex-1 py-2 text-[10px] tracking-wider uppercase">Cancel</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-stone text-sm">No inventory items match your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
