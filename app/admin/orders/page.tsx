"use client";

import { useState } from "react";
import { Search, Eye, ChevronDown, X, Package, Truck, CheckCircle2, Clock, Ban } from "lucide-react";
import { adminOrders } from "@/lib/admin-data";
import { formatPrice, cn } from "@/lib/utils";

const statusConfig: Record<string, { label: string; cls: string; icon: typeof Package }> = {
  pending: { label: "Pending", cls: "bg-warning/10 text-warning", icon: Clock },
  accepted: { label: "Accepted", cls: "bg-gold/10 text-gold", icon: CheckCircle2 },
  processing: { label: "Processing", cls: "bg-blue-500/10 text-blue-600", icon: Package },
  shipped: { label: "Shipped", cls: "bg-purple-500/10 text-purple-600", icon: Truck },
  delivered: { label: "Delivered", cls: "bg-success/10 text-success", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", cls: "bg-error/10 text-error", icon: Ban },
};

const allStatuses = ["pending", "accepted", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [statusDropdown, setStatusDropdown] = useState<string | null>(null);

  const filtered = adminOrders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const viewOrder = adminOrders.find((o) => o.id === selectedOrder);

  const totalRevenue = adminOrders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="heading-serif text-2xl">Order Management</h1>
          <p className="text-stone text-sm mt-1">
            {adminOrders.length} orders · {formatPrice(totalRevenue)} revenue
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {allStatuses.map((status) => {
          const count = adminOrders.filter((o) => o.status === status).length;
          const config = statusConfig[status];
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(statusFilter === status ? "all" : status)}
              className={cn(
                "bg-white border rounded-lg p-4 text-center transition-all",
                statusFilter === status ? "border-charcoal" : "border-warm-gray/20 hover:border-charcoal/30"
              )}
            >
              <p className={cn("text-[10px] tracking-wider uppercase font-medium mb-1", config.cls.split(" ")[1])}>
                {config.label}
              </p>
              <p className="heading-serif text-xl">{count}</p>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="bg-white border border-warm-gray/20 rounded-lg p-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID, customer name, or email..."
            className="!pl-10 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-warm-gray/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs tracking-wider uppercase text-stone border-b border-warm-gray/20 bg-ivory-dark/50">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-4 py-4 font-medium">Customer</th>
                <th className="px-4 py-4 font-medium">Date</th>
                <th className="px-4 py-4 font-medium">Items</th>
                <th className="px-4 py-4 font-medium">Total</th>
                <th className="px-4 py-4 font-medium">Payment</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-4 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const config = statusConfig[order.status];
                return (
                  <tr key={order.id} className="border-b border-warm-gray/10 last:border-0 hover:bg-ivory-dark/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium font-mono">#{order.id}</td>
                    <td className="px-4 py-4">
                      <p className="text-sm">{order.customer}</p>
                      <p className="text-xs text-stone">{order.email}</p>
                    </td>
                    <td className="px-4 py-4 text-xs text-stone">{order.date}</td>
                    <td className="px-4 py-4 text-sm">{order.items.reduce((s, i) => s + i.qty, 0)}</td>
                    <td className="px-4 py-4 text-sm font-medium">{formatPrice(order.total)}</td>
                    <td className="px-4 py-4 text-xs text-stone">{order.payment}</td>
                    <td className="px-4 py-4">
                      <div className="relative">
                        <button
                          onClick={() => setStatusDropdown(statusDropdown === order.id ? null : order.id)}
                          className={cn(
                            "text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5 transition-all",
                            config.cls
                          )}
                        >
                          {config.label}
                          <ChevronDown size={9} />
                        </button>
                        {statusDropdown === order.id && (
                          <div className="absolute left-0 top-full mt-1 bg-white border border-warm-gray/30 rounded-lg shadow-lg py-1.5 min-w-[140px] z-10">
                            {allStatuses.map((s) => (
                              <button
                                key={s}
                                onClick={() => setStatusDropdown(null)}
                                className={cn(
                                  "w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 transition-colors",
                                  order.status === s ? "bg-ivory-dark text-charcoal" : "text-stone hover:text-charcoal hover:bg-ivory-dark"
                                )}
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{
                                    backgroundColor:
                                      s === "pending" ? "#B8860B" :
                                      s === "accepted" ? "#C6A75E" :
                                      s === "processing" ? "#3B82F6" :
                                      s === "shipped" ? "#8B5CF6" :
                                      s === "delivered" ? "#4A7C59" : "#A04040",
                                  }}
                                />
                                <span className="capitalize">{s}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => setSelectedOrder(order.id)}
                        className="text-stone hover:text-charcoal transition-colors p-1"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-stone text-sm">No orders match your criteria.</p>
          </div>
        )}
      </div>

      {/* Order detail modal */}
      {viewOrder && (
        <>
          <div className="fixed inset-0 bg-charcoal/40 z-50" onClick={() => setSelectedOrder(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-ivory rounded-lg shadow-2xl z-50 max-h-[80vh] overflow-y-auto animate-fade-in">
            {/* Modal header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-warm-gray/30">
              <div>
                <h2 className="text-sm font-medium">Order #{viewOrder.id}</h2>
                <p className="text-xs text-stone">{viewOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-stone hover:text-charcoal transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Customer */}
            <div className="px-8 py-5 border-b border-warm-gray/20">
              <p className="text-xs tracking-wider uppercase text-stone mb-2">Customer</p>
              <p className="text-sm font-medium">{viewOrder.customer}</p>
              <p className="text-xs text-stone">{viewOrder.email}</p>
            </div>

            {/* Items */}
            <div className="px-8 py-5 border-b border-warm-gray/20">
              <p className="text-xs tracking-wider uppercase text-stone mb-3">Items</p>
              <div className="space-y-3">
                {viewOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">{item.name}</p>
                      <p className="text-xs text-stone">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-medium">{formatPrice(item.price * item.qty)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="px-8 py-5">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-stone">Payment</span>
                <span className="text-sm">{viewOrder.payment}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-stone">Status</span>
                <span className={cn("text-xs tracking-wider uppercase px-2.5 py-1 rounded-full font-medium", statusConfig[viewOrder.status].cls)}>
                  {statusConfig[viewOrder.status].label}
                </span>
              </div>
              <div className="divider my-3" />
              <div className="flex justify-between">
                <span className="text-sm font-medium">Total</span>
                <span className="heading-serif text-xl">{formatPrice(viewOrder.total)}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
