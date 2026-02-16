"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import CartDrawer from "./CartDrawer";
import SearchOverlay from "./SearchOverlay";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Shop",
    href: "/shop",
    children: [
      { name: "All Products", href: "/shop" },
      { name: "Workspace", href: "/shop?category=workspace" },
      { name: "Living", href: "/shop?category=living" },
      { name: "Travel", href: "/shop?category=travel" },
      { name: "Wellness", href: "/shop?category=wellness" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const { cartCount, wishlist, setIsCartOpen, setIsSearchOpen, isSearchOpen } =
    useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <>
      {/* Announcement bar - hidden on mobile */}
      <div className="hidden sm:block bg-charcoal text-ivory text-center py-2.5 text-xs tracking-[0.15em] uppercase font-light">
        Complimentary shipping on orders above $150 &nbsp;·&nbsp;{" "}
        <Link
          href="/shop"
          className="underline decoration-gold underline-offset-2 hover:text-gold transition-colors"
        >
          Shop Now
        </Link>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-md border-b border-warm-gray/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-[60px] sm:h-[72px] py-4 lg:py-6">
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.children && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-[13px] tracking-[0.08em] uppercase text-charcoal hover:text-gold transition-colors duration-300 flex items-center gap-1",
                      item.children && "cursor-pointer",
                    )}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown size={12} className="mt-0.5" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 pt-2 animate-fade-in">
                      <div className="bg-ivory border border-warm-gray/30 rounded-lg shadow-lg py-3 min-w-[200px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-5 py-2.5 text-sm text-stone hover:text-charcoal hover:bg-ivory-dark transition-all duration-200"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Logo */}
            <Link
              href="/"
              className="logo-text text-lg sm:text-xl text-charcoal"
            >
              AUREON
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-3 sm:gap-5">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-charcoal hover:text-gold transition-colors duration-300"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              <Link
                href="/wishlist"
                className="relative text-charcoal hover:text-gold transition-colors duration-300 hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart size={19} strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gold text-charcoal text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-charcoal hover:text-gold transition-colors duration-300"
                aria-label="Cart"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gold text-charcoal text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>

              <Link
                href="/account"
                className="text-charcoal hover:text-gold transition-colors duration-300 hidden sm:block"
                aria-label="Account"
              >
                <User size={19} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileOpen && (
          <div className="lg:hidden bg-ivory border-t border-warm-gray/30 animate-fade-in">
            <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm tracking-[0.08em] uppercase text-charcoal py-2"
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-2 mt-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-sm text-stone py-1"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-warm-gray/30 flex gap-6">
                <Link
                  href="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-stone"
                >
                  Wishlist
                </Link>
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-stone"
                >
                  Account
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer />
      {isSearchOpen && <SearchOverlay />}
    </>
  );
}
