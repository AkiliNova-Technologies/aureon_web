import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import TrustBadges from "@/components/ui/TrustBadges";
import { blogPosts } from "@/lib/blog";

export default function BlogPage() {
  return (
    <>
      <PageHeader title="Journal" subtitle="Perspectives on design, craft, and modern living" breadcrumbs={[{ name: "Home", href: "/" }, { name: "Journal" }]} />
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Featured post */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            <Link href={`/blog/${blogPosts[0].slug}`} className="aspect-[4/3] bg-ivory-dark rounded-lg overflow-hidden product-image-wrapper block">
              <img src={blogPosts[0].image} alt={blogPosts[0].title} className="w-full h-full object-cover" />
            </Link>
            <div className="flex flex-col justify-center">
              <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">{blogPosts[0].category}</p>
              <Link href={`/blog/${blogPosts[0].slug}`}>
                <h2 className="heading-serif text-3xl md:text-4xl mb-4 hover:text-gold transition-colors">{blogPosts[0].title}</h2>
              </Link>
              <p className="text-stone text-sm leading-relaxed mb-2">{blogPosts[0].excerpt}</p>
              <p className="text-xs text-stone mb-1">{blogPosts[0].readTime}</p>
              <p className="text-xs text-stone mb-6">{blogPosts[0].date} · By {blogPosts[0].author.name}</p>
              <Link href={`/blog/${blogPosts[0].slug}`} className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-charcoal hover:text-gold transition-colors">
                Read More <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {blogPosts.slice(1).map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block aspect-[4/3] bg-ivory-dark rounded-lg overflow-hidden mb-5 product-image-wrapper">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </Link>
                <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-2">{post.category}</p>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="heading-serif text-xl mb-2 group-hover:text-gold transition-colors">{post.title}</h3>
                </Link>
                <p className="text-stone text-sm leading-relaxed mb-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-stone">{post.date}</p>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase text-charcoal hover:text-gold transition-colors">
                    Read <ArrowRight size={10} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <TrustBadges />
    </>
  );
}
