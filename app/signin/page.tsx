"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate a short delay for better UX
    setTimeout(() => {
      // Check credentials
      if (email === "admin@aureon.com" && password === "akilinova@2026") {
        // Store authentication state (you might want to use a more secure method in production)
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", "admin");
        
        // Redirect to admin dashboard
        router.push("/admin");
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <section className="min-h-screen flex">
      {/* Left — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <Link href="/" className="logo-text text-xl text-charcoal block mb-12">
            AUREON
          </Link>
          <h1 className="heading-serif text-3xl md:text-4xl mb-2">Welcome back</h1>
          <p className="text-stone text-sm mb-10">Sign in to your account to continue.</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Email *</label>
              <input 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-stone/20 focus:border-gold outline-none px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-stone mb-2 tracking-wider uppercase">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-stone/20 focus:border-gold outline-none px-4 py-3 text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone hover:text-charcoal transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="!w-4 !h-4 !p-0 rounded accent-charcoal" />
                <span className="text-xs text-stone">Remember me</span>
              </label>
              <Link href="#" className="text-xs text-stone hover:text-gold transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full text-center py-3.5 text-sm tracking-[0.1em] uppercase mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="divider flex-1" />
            <span className="text-xs text-stone">or continue with</span>
            <div className="divider flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="btn-secondary py-3 text-xs tracking-[0.08em] uppercase">Google</button>
            <button className="btn-secondary py-3 text-xs tracking-[0.08em] uppercase">Apple</button>
          </div>

          <p className="text-center text-sm text-stone mt-10">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-charcoal hover:text-gold transition-colors font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right — image */}
      <div className="hidden lg:block lg:w-[45%] relative">
        <div className="absolute inset-0 bg-charcoal">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-16 left-12 right-12 text-ivory">
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-4">The Aureon Experience</p>
          <h2 className="heading-serif text-3xl mb-3">Buy less. Choose better.</h2>
          <p className="text-stone text-sm leading-relaxed max-w-sm">
            Access your curated collection, track orders, and discover new arrivals selected with intention.
          </p>
        </div>
      </div>
    </section>
  );
}