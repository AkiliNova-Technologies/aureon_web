import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  subtitle?: string;
}

export default function PageHeader({ title, breadcrumbs, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-charcoal text-ivory py-16 md:py-20 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto text-center">
        <h1 className="heading-serif text-4xl md:text-5xl mb-4">{title}</h1>
        {subtitle && (
          <p className="text-stone text-sm max-w-lg mx-auto mb-6 leading-relaxed">{subtitle}</p>
        )}
        <nav className="flex items-center justify-center gap-2 text-xs tracking-[0.1em] uppercase">
          {breadcrumbs.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <ChevronRight size={10} className="text-stone" />}
              {item.href ? (
                <Link href={item.href} className="text-stone hover:text-gold transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className="text-ivory">{item.name}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
