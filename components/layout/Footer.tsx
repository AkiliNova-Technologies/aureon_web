import Link from "next/link";
import { ArrowRight, ChevronRight, Facebook, Instagram, Twitter } from "lucide-react";

const footerLinks = {
  Shop: [
    { name: "All Products", href: "/shop" },
    { name: "Workspace", href: "/shop?category=workspace" },
    { name: "Living", href: "/shop?category=living" },
    { name: "Travel", href: "/shop?category=travel" },
    { name: "Wellness", href: "/shop?category=wellness" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Journal", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "#" },
  ],
  Support: [
    { name: "My Account", href: "/account" },
    { name: "Track Order", href: "/track-order" },
    { name: "FAQ", href: "/faq" },
    { name: "Returns", href: "#" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Returns", href: "#" },
    { name: "Shipping", href: "#" },
  ],
};

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "X", icon: Twitter, href: "#" },
  { name: "Pinterest", icon: Facebook, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      {/* Newsletter */}
      <section className="relative py-12 px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-[1440px] mx-auto text-center relative">
          <p className="text-xs tracking-[0.28em] uppercase text-stone/70 mb-4 font-light">
            Newsletter
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-4 tracking-[-0.02em]">
            Stay Considered
          </h2>
          <p className="text-stone/70 text-sm max-w-md mx-auto mb-10 leading-relaxed font-light">
            Curated updates on new arrivals and design perspectives. No noise.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
             <input
              type="email"
              placeholder="Your email address"
              className="flex-1 !bg-charcoal-light !border-stone/30 !text-ivory placeholder:text-stone/60 text-sm"
            />
            <button className="group bg-gold text-charcoal px-8 py-4 text-sm tracking-[0.15em] uppercase inline-flex items-center justify-center gap-3 transition-all hover:bg-gold/90 hover:gap-4">
              Subscribe
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <section className="border-t border-stone/20 pt-20 pb-12 px-8 lg:px-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <Link 
                href="/" 
                className="font-serif text-xl text-ivory block mb-6 tracking-[0.15em]"
              >
                AUREON
              </Link>
              <p className="text-stone/70 text-sm leading-relaxed mb-8 font-light max-w-xs">
                Elevated living. Thoughtfully curated. Objects designed to improve modern life.
              </p>
              <div className="flex gap-6">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-stone/50 hover:text-gold transition-colors duration-300 text-xs tracking-wider uppercase"
                      aria-label={social.name}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-xs tracking-[0.2em] uppercase text-ivory/90 mb-6 font-medium">
                  {title}
                </h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-stone/70 text-sm hover:text-gold transition-colors duration-300 inline-flex items-center gap-2 group"
                      >
                        <ChevronRight size={10} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom bar */}
      <section className="border-t border-stone/20 py-8 px-8 lg:px-16">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-stone/50 text-xs font-light">
            &copy; {new Date().getFullYear()} Aureon. All rights reserved by AkiliNova Technologies.
          </p>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="text-stone/50 text-xs">Currency</span>
              <span className="text-ivory/90 text-xs tracking-wider font-medium">USD $</span>
            </div>
            <div className="w-px h-4 bg-stone/30" />
            <div className="flex items-center gap-3">
              <span className="text-stone/50 text-xs">Language</span>
              <span className="text-ivory/90 text-xs tracking-wider font-medium">English</span>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}