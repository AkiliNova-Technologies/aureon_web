"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Lock,
  LogOut,
  Camera,
  ChevronRight,
  Check,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import TrustBadges from "@/components/ui/TrustBadges";
import { cn, formatPrice, formatDate } from "@/lib/utils";

const sidebarItems = [
  { key: "personal", label: "Personal Information", icon: User },
  { key: "orders", label: "My Orders", icon: Package },
  { key: "addresses", label: "Manage Address", icon: MapPin },
  { key: "payment", label: "Payment Method", icon: CreditCard },
  { key: "password", label: "Password Manager", icon: Lock },
];

const mockOrders = [
  {
    id: "AUR-2026-0102",
    date: "2026-01-02",
    total: 367,
    status: "Delivered",
    payment: "Credit Card",
    items: [
      { name: "Arc Desk Lamp", qty: 1, price: 189 },
      { name: "Zen Desk Organizer", qty: 1, price: 78 },
      { name: "Helix Cable Manager", qty: 3, price: 34 },
    ],
  },
  {
    id: "AUR-2026-0188",
    date: "2026-02-10",
    total: 245,
    status: "Accepted",
    payment: "PayPal",
    items: [{ name: "Atlas Weekender Bag", qty: 1, price: 245 }],
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <>
      <PageHeader
        title="My Account"
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "My Account" }]}
      />
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={cn(
                      "w-full flex items-center gap-3 px-5 py-3.5 rounded-lg text-sm transition-all text-left",
                      activeTab === item.key
                        ? "bg-charcoal text-ivory"
                        : "text-stone hover:text-charcoal hover:bg-ivory-dark",
                    )}
                  >
                    <item.icon size={16} strokeWidth={1.5} />
                    {item.label}
                  </button>
                ))}
                <button className="w-full">
                  <Link href="/signin" className="w-full flex items-center gap-3 px-5 py-3.5 rounded-lg text-sm text-stone hover:text-error hover:bg-ivory-dark transition-all text-left">
                    <LogOut size={16} strokeWidth={1.5} />
                    Logout
                  </Link>
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* Personal Info */}
              {activeTab === "personal" && (
                <div>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-ivory-dark flex items-center justify-center text-2xl heading-serif text-stone">
                        A
                      </div>
                      <button className="absolute bottom-0 right-0 w-7 h-7 bg-gold rounded-full flex items-center justify-center text-charcoal">
                        <Camera size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                    <div>
                      <label className="block text-xs text-stone mb-2 tracking-wider uppercase">
                        First Name *
                      </label>
                      <input type="text" defaultValue="Alex" />
                    </div>
                    <div>
                      <label className="block text-xs text-stone mb-2 tracking-wider uppercase">
                        Last Name *
                      </label>
                      <input type="text" defaultValue="Morgan" />
                    </div>
                    <div>
                      <label className="block text-xs text-stone mb-2 tracking-wider uppercase">
                        Email *
                      </label>
                      <input type="email" defaultValue="alex@aureon.co" />
                    </div>
                    <div>
                      <label className="block text-xs text-stone mb-2 tracking-wider uppercase">
                        Phone *
                      </label>
                      <input type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                  <button className="btn-primary px-8 py-3 text-sm tracking-[0.1em] uppercase mt-6">
                    Update Changes
                  </button>
                </div>
              )}

              {/* Orders */}
              {activeTab === "orders" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-sm tracking-[0.12em] uppercase font-medium">
                      Orders ({mockOrders.length})
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-warm-gray/30 rounded-lg overflow-hidden"
                      >
                        <div className="bg-ivory-dark px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                          <div>
                            <span className="text-stone block mb-1">
                              Order ID
                            </span>
                            <span className="font-medium">#{order.id}</span>
                          </div>
                          <div>
                            <span className="text-stone block mb-1">Total</span>
                            <span className="font-medium">
                              {formatPrice(order.total)}
                            </span>
                          </div>
                          <div>
                            <span className="text-stone block mb-1">
                              Payment
                            </span>
                            <span className="font-medium">{order.payment}</span>
                          </div>
                          <div>
                            <span className="text-stone block mb-1">Date</span>
                            <span className="font-medium">
                              {formatDate(order.date)}
                            </span>
                          </div>
                        </div>
                        <div className="px-6 py-4 space-y-3">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-ivory-dark rounded flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm">{item.name}</p>
                                <p className="text-xs text-stone">
                                  Qty: {item.qty}
                                </p>
                              </div>
                              <p className="text-sm">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="px-6 py-4 border-t border-warm-gray/20 flex items-center justify-between">
                          <span
                            className={cn(
                              "text-xs tracking-wider uppercase px-3 py-1 rounded-full",
                              order.status === "Delivered"
                                ? "bg-success/10 text-success"
                                : "bg-gold/10 text-gold",
                            )}
                          >
                            {order.status}
                          </span>
                          <div className="flex gap-3">
                            <Link
                              href="/track-order"
                              className="btn-primary px-5 py-2 text-xs tracking-[0.08em] uppercase"
                            >
                              Track Order
                            </Link>
                            <button className="btn-secondary px-5 py-2 text-xs tracking-[0.08em] uppercase">
                              Invoice
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Addresses */}
              {activeTab === "addresses" && (
                <div>
                  <h2 className="text-sm tracking-[0.12em] uppercase font-medium mb-6">
                    Saved Addresses
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-warm-gray/30 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs tracking-wider uppercase text-gold">
                          Default
                        </span>
                        <button className="text-xs text-stone hover:text-charcoal">
                          Edit
                        </button>
                      </div>
                      <p className="text-sm font-medium mb-1">Alex Morgan</p>
                      <p className="text-sm text-stone leading-relaxed">
                        123 Design Avenue, Suite 4B
                        <br />
                        Brooklyn, NY 11201
                        <br />
                        United States
                      </p>
                      <p className="text-xs text-stone mt-2">
                        +1 (555) 123-4567
                      </p>
                    </div>
                    <button className="border border-dashed border-warm-gray/40 rounded-lg p-6 flex items-center justify-center text-sm text-stone hover:text-charcoal hover:border-charcoal/30 transition-all min-h-[160px]">
                      + Add New Address
                    </button>
                  </div>
                </div>
              )}

              {/* Payment */}
              {activeTab === "payment" && (
                <div>
                  <h2 className="text-sm tracking-[0.12em] uppercase font-medium mb-6">
                    Saved Payment Methods
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-warm-gray/30 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-medium tracking-wider">
                          VISA •••• 4242
                        </span>
                        <span className="text-xs tracking-wider uppercase text-gold">
                          Default
                        </span>
                      </div>
                      <p className="text-sm text-stone">Expires 08/27</p>
                      <p className="text-sm text-stone">Alex Morgan</p>
                    </div>
                    <button className="border border-dashed border-warm-gray/40 rounded-lg p-6 flex items-center justify-center text-sm text-stone hover:text-charcoal hover:border-charcoal/30 transition-all min-h-[120px]">
                      + Add New Card
                    </button>
                  </div>
                </div>
              )}

              {/* Password */}
              {activeTab === "password" && (
                <div className="max-w-md">
                  <h2 className="text-sm tracking-[0.12em] uppercase font-medium mb-6">
                    Change Password
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-stone mb-2 tracking-wider uppercase">
                        Current Password *
                      </label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-stone mb-2 tracking-wider uppercase">
                        New Password *
                      </label>
                      <input type="password" placeholder="Enter new password" />
                    </div>
                    <div>
                      <label className="block text-xs text-stone mb-2 tracking-wider uppercase">
                        Confirm New Password *
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <button className="btn-primary px-8 py-3 text-sm tracking-[0.1em] uppercase mt-6">
                    Update Password
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <TrustBadges />
    </>
  );
}
