"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Share2, Bookmark } from "lucide-react";
import TrustBadges from "@/components/ui/TrustBadges";
import { getBlogPost, getRelatedPosts, blogPosts } from "@/lib/blog";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getBlogPost(slug) || blogPosts[0];
  const related = getRelatedPosts(post);

  // Simple markdown-like rendering for ## headings and **bold**
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="heading-serif text-2xl md:text-3xl mt-12 mb-4">
            {block.replace("## ", "")}
          </h2>
        );
      }

      // Handle bold text within paragraphs
      const parts = block.split(/(\*\*.*?\*\*)/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j} className="font-medium text-charcoal">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <p key={i} className="text-stone text-base leading-[1.9] mb-6">
          {rendered}
        </p>
      );
    });
  };

  // Find prev/next posts
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-charcoal text-ivory">
        <div className="absolute inset-0 opacity-30">
          <img src={post.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/40" />
        <div className="relative max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase text-stone hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft size={12} /> Back to Journal
          </Link>
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-4">{post.category}</p>
          <h1 className="heading-serif text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-xs text-stone animate-fade-in-delay-1">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-stone" />
            <span className="flex items-center gap-1.5">
              <Clock size={11} /> {post.readTime}
            </span>
            <span className="w-1 h-1 rounded-full bg-stone" />
            <span>By {post.author.name}</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="py-16 md:py-20 px-6">
        <div className="max-w-[720px] mx-auto">
          {/* Author bar */}
          <div className="flex items-center justify-between mb-12 pb-8 border-b border-warm-gray/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-ivory-dark flex items-center justify-center text-sm font-medium text-stone heading-serif">
                {post.author.avatar}
              </div>
              <div>
                <p className="text-sm font-medium">{post.author.name}</p>
                <p className="text-xs text-stone">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 rounded-full bg-ivory-dark flex items-center justify-center text-stone hover:text-gold hover:bg-gold/10 transition-all">
                <Bookmark size={14} strokeWidth={1.5} />
              </button>
              <button className="w-9 h-9 rounded-full bg-ivory-dark flex items-center justify-center text-stone hover:text-gold hover:bg-gold/10 transition-all">
                <Share2 size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="article-content">{renderContent(post.content)}</div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-warm-gray/30">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs tracking-wider uppercase text-stone">Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs tracking-wider px-3 py-1.5 rounded-full border border-warm-gray/40 text-stone hover:border-charcoal hover:text-charcoal transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share bar */}
          <div className="mt-8 p-6 bg-ivory-dark rounded-lg flex items-center justify-between">
            <p className="text-sm font-medium">Share this article</p>
            <div className="flex gap-3">
              {["Twitter", "LinkedIn", "Email"].map((platform) => (
                <button
                  key={platform}
                  className="text-xs tracking-wider uppercase text-stone hover:text-gold transition-colors"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Prev/Next navigation */}
          <div className="mt-12 grid grid-cols-2 gap-6">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group p-6 border border-warm-gray/30 rounded-lg hover:border-charcoal/30 transition-all"
              >
                <span className="text-[10px] tracking-wider uppercase text-stone flex items-center gap-1.5 mb-2">
                  <ArrowLeft size={10} /> Previous
                </span>
                <p className="text-sm font-medium group-hover:text-gold transition-colors leading-snug">
                  {prevPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group p-6 border border-warm-gray/30 rounded-lg hover:border-charcoal/30 transition-all text-right"
              >
                <span className="text-[10px] tracking-wider uppercase text-stone flex items-center justify-end gap-1.5 mb-2">
                  Next <ArrowRight size={10} />
                </span>
                <p className="text-sm font-medium group-hover:text-gold transition-colors leading-snug">
                  {nextPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-16 px-6 lg:px-12 bg-ivory-dark">
          <div className="max-w-[1400px] mx-auto">
            <p className="text-xs tracking-[0.25em] uppercase text-stone mb-3 text-center">Keep Reading</p>
            <h2 className="heading-serif text-3xl text-center mb-12">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {related.map((relPost) => (
                <Link
                  key={relPost.slug}
                  href={`/blog/${relPost.slug}`}
                  className="group flex gap-5"
                >
                  <div className="w-32 h-24 bg-ivory rounded-lg overflow-hidden flex-shrink-0 product-image-wrapper">
                    <img src={relPost.image} alt={relPost.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-1.5">{relPost.category}</p>
                    <h3 className="text-sm font-medium group-hover:text-gold transition-colors leading-snug mb-1.5">
                      {relPost.title}
                    </h3>
                    <p className="text-xs text-stone">{relPost.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <TrustBadges />
    </>
  );
}
