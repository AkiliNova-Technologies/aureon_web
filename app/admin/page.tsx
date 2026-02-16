"use client";

import Link from "next/link";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Package,
} from "lucide-react";
import { dashboardStats, adminOrders, inventoryItems } from "@/lib/admin-data";
import { formatPrice, cn } from "@/lib/utils";

const statCards = [
  {
    label: "Total Revenue",
    value: formatPrice(dashboardStats.totalRevenue),
    change: dashboardStats.revenueChange,
    icon: DollarSign,
  },
  {
    label: "Total Orders",
    value: dashboardStats.totalOrders.toString(),
    change: dashboardStats.ordersChange,
    icon: ShoppingCart,
  },
  {
    label: "Total Users",
    value: dashboardStats.totalUsers.toString(),
    change: dashboardStats.usersChange,
    icon: Users,
  },
  {
    label: "Avg. Order Value",
    value: formatPrice(dashboardStats.avgOrderValue),
    change: dashboardStats.aovChange,
    icon: TrendingUp,
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  accepted: "bg-gold/10 text-gold",
  processing: "bg-blue-500/10 text-blue-600",
  shipped: "bg-purple-500/10 text-purple-600",
  delivered: "bg-success/10 text-success",
  cancelled: "bg-error/10 text-error",
};

export default function AdminDashboard() {
  const maxRevenue = Math.max(...dashboardStats.recentRevenue.map((r) => r.value));
  const lowStockItems = inventoryItems.filter(
    (i) => i.status === "low_stock" || i.status === "out_of_stock"
  );

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="heading-serif text-2xl md:text-3xl">Good afternoon, Alex</h1>
        <p className="text-stone text-sm mt-1">Here is what is happening with your store today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white border border-warm-gray/20 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-ivory-dark flex items-center justify-center">
                <stat.icon size={18} strokeWidth={1.5} className="text-gold" />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                  stat.change >= 0 ? "bg-success/10 text-success" : "bg-error/10 text-error"
                )}
              >
                {stat.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {Math.abs(stat.change)}%
              </div>
            </div>
            <p className="heading-serif text-2xl mb-1">{stat.value}</p>
            <p className="text-xs text-stone">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart (simple bar) */}
        <div className="lg:col-span-2 bg-white border border-warm-gray/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium tracking-[0.06em]">Revenue Overview</h2>
            <span className="text-xs text-stone">Last 6 months</span>
          </div>
          <div className="flex items-end gap-4 h-48">
            {dashboardStats.recentRevenue.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] text-stone">{formatPrice(item.value)}</span>
                <div
                  className="w-full bg-charcoal/80 rounded-t-md transition-all hover:bg-gold"
                  style={{ height: `${(item.value / maxRevenue) * 140}px` }}
                />
                <span className="text-xs text-stone">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white border border-warm-gray/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium tracking-[0.06em]">Top Products</h2>
            <Link href="/admin/products" className="text-xs text-stone hover:text-gold transition-colors">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {dashboardStats.topProducts.map((product, i) => (
              <div key={product.name} className="flex items-center gap-3">
                <span className="text-xs text-stone w-5">{i + 1}.</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{product.name}</p>
                  <p className="text-[10px] text-stone">{product.sold} sold</p>
                </div>
                <span className="text-sm font-medium">{formatPrice(product.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white border border-warm-gray/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium tracking-[0.06em]">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1.5 text-xs text-stone hover:text-gold transition-colors"
            >
              View All <ArrowRight size={10} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs tracking-wider uppercase text-stone border-b border-warm-gray/20">
                  <th className="pb-3 font-medium">Order</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {adminOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-warm-gray/10 last:border-0">
                    <td className="py-3 text-sm font-medium">#{order.id}</td>
                    <td className="py-3 text-sm text-stone">{order.customer}</td>
                    <td className="py-3 text-xs text-stone">{order.date}</td>
                    <td className="py-3 text-sm">{formatPrice(order.total)}</td>
                    <td className="py-3">
                      <span
                        className={cn(
                          "text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full font-medium",
                          statusColors[order.status]
                        )}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low stock alerts */}
        <div className="bg-white border border-warm-gray/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium tracking-[0.06em]">Stock Alerts</h2>
            <Link href="/admin/inventory" className="text-xs text-stone hover:text-gold transition-colors">
              Manage
            </Link>
          </div>
          {lowStockItems.length === 0 ? (
            <p className="text-sm text-stone text-center py-8">All stock levels healthy</p>
          ) : (
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                      item.status === "out_of_stock" ? "bg-error/10" : "bg-warning/10"
                    )}
                  >
                    <Package
                      size={14}
                      className={item.status === "out_of_stock" ? "text-error" : "text-warning"}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{item.name}</p>
                    <p
                      className={cn(
                        "text-[10px] font-medium tracking-wider uppercase",
                        item.status === "out_of_stock" ? "text-error" : "text-warning"
                      )}
                    >
                      {item.stock === 0 ? "Out of stock" : `${item.stock} remaining`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Order status breakdown */}
          <div className="mt-8 pt-6 border-t border-warm-gray/20">
            <h3 className="text-xs tracking-wider uppercase text-stone mb-4">Orders by Status</h3>
            <div className="space-y-2.5">
              {Object.entries(dashboardStats.ordersByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full",
                        statusColors[status]?.replace(/text-\S+/, "").replace("bg-", "bg-").replace("/10", "")
                      )}
                      style={{
                        backgroundColor:
                          status === "pending" ? "#B8860B" :
                          status === "accepted" ? "#C6A75E" :
                          status === "processing" ? "#3B82F6" :
                          status === "shipped" ? "#8B5CF6" :
                          status === "delivered" ? "#4A7C59" : "#A04040",
                      }}
                    />
                    <span className="text-xs text-stone capitalize">{status}</span>
                  </div>
                  <span className="text-xs font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
