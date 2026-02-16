"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen flex">
      {/* Left — image */}
      <div className="hidden lg:block lg:w-[45%] relative">
        <div className="absolute inset-0 bg-charcoal">
          <img
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-16 left-12 right-12 text-ivory">
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-4">Join Aureon</p>
          <h2 className="heading-serif text-3xl mb-3">Elevated living starts here.</h2>
          <div className="space-y-3 mt-6">
            {[
              "Exclusive access to new collections",
              "Order tracking and history",
              "Curated recommendations",
              "Members-only events",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Check size={10} className="text-gold" />
                </div>
                <span className="text-sm text-stone">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <Link href="/" className="logo-text text-xl text-charcoal block mb-12">
            AUREON
          </Link>
          <h1 className="heading-serif text-3xl md:text-4xl mb-2">Create your account</h1>
          <p className="text-stone text-sm mb-10">Join the Aureon community.</p>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-stone mb-2 tracking-wider uppercase">First Name *</label>
                <input type="text" placeholder="First name" />
              </div>
              <div>
                <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Last Name *</label>
                <input type="text" placeholder="Last name" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Email *</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Phone (optional)</label>
              <input type="tel" placeholder="Phone number" />
            </div>
            <div>
              <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone hover:text-charcoal transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-[10px] text-stone mt-1.5">Minimum 8 characters with at least one number</p>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" className="!w-4 !h-4 !p-0 rounded accent-charcoal mt-0.5" />
              <span className="text-xs text-stone leading-relaxed">
                I agree to the{" "}
                <Link href="#" className="text-charcoal hover:text-gold underline">Terms & Conditions</Link>{" "}
                and{" "}
                <Link href="#" className="text-charcoal hover:text-gold underline">Privacy Policy</Link>
              </span>
            </label>

            <Link
              href="/account"
              className="btn-primary block w-full text-center py-3.5 text-sm tracking-[0.1em] uppercase"
            >
              Create Account
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="divider flex-1" />
            <span className="text-xs text-stone">or sign up with</span>
            <div className="divider flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="btn-secondary py-3 text-xs tracking-[0.08em] uppercase">Google</button>
            <button className="btn-secondary py-3 text-xs tracking-[0.08em] uppercase">Apple</button>
          </div>

          <p className="text-center text-sm text-stone mt-10">
            Already have an account?{" "}
            <Link href="/signin" className="text-charcoal hover:text-gold transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
