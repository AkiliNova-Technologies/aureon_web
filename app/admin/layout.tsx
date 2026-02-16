"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  Boxes,
  ShoppingCart,
  ArrowLeft,
  Bell,
  Settings,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Inventory", href: "/admin/inventory", icon: Boxes },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-ivory">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-ivory flex-shrink-0 flex flex-col fixed h-screen z-40">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-stone/15">
          <Link href="/admin" className="logo-text text-base text-ivory block">
            AUREON
          </Link>
          <p className="text-[10px] tracking-[0.2em] uppercase text-stone mt-1">Admin Console</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all",
                  isActive
                    ? "bg-ivory/10 text-ivory"
                    : "text-stone hover:text-ivory hover:bg-ivory/5"
                )}
              >
                <item.icon size={16} strokeWidth={1.5} />
                {item.name}
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-stone/15">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-stone hover:text-ivory hover:bg-ivory/5 transition-all"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-ivory/95 backdrop-blur-md border-b border-warm-gray/30 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-medium">
              {navItems.find((i) => i.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-stone hover:text-charcoal transition-colors">
              <Bell size={18} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold text-charcoal text-[8px] rounded-full flex items-center justify-center font-medium">
                3
              </span>
            </button>
            <button className="text-stone hover:text-charcoal transition-colors">
              <Settings size={18} strokeWidth={1.5} />
            </button>
            <div className="h-5 w-px bg-warm-gray/30" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-charcoal text-ivory flex items-center justify-center text-xs font-medium">
                AM
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-medium">Alex Morgan</p>
                <p className="text-[10px] text-stone">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
