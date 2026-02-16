export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  tags: string[];
  relatedSlugs: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "the-art-of-less",
    title: "The Art of Less: Why Curation Matters",
    excerpt:
      "In a world of infinite choice, the most valuable thing a brand can offer is discernment. Here is why we believe in fewer, better things.",
    content: `There is a quiet revolution happening in how we consume. Not louder, not faster — but slower. More deliberate. More intentional.

At Aureon, curation is not a marketing strategy. It is our founding principle. We believe that in a world drowning in options, the most generous thing a brand can do is decide on your behalf — and get it right.

## The Paradox of Choice

Psychologist Barry Schwartz famously described the paradox of choice: the more options we have, the less satisfied we become. Walk into any department store or browse any online marketplace and you will feel it — the weight of ten thousand mediocre alternatives.

We started Aureon because we were tired of that weight. We wanted a place where every object had earned its place.

## What Curation Really Means

Curation is not about exclusivity for its own sake. It is about respect — for your time, your attention, and your space.

Every product in our collection has passed through a rigorous selection process. We ask:

Does it solve a real problem? Will it last? Does it respect the materials it is made from? Would we use it ourselves — not once, not for a week, but for years?

If the answer to any of these is no, it does not make it in. Period.

## The Result

The result is a collection that feels different. Smaller, yes — but richer. Every page you browse, every product you discover, has been placed there with intention.

This is what we mean when we say "buy less, choose better." It is not a tagline. It is a philosophy that guides everything we do.

## Moving Forward

We are not trying to sell you more things. We are trying to help you find the right things — objects that integrate seamlessly into your life and quietly improve it. That is the art of less. And it is just the beginning.`,
    date: "February 8, 2026",
    category: "Philosophy",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
    author: {
      name: "Elena Voss",
      role: "Editorial Director",
      avatar: "EV",
    },
    readTime: "5 min read",
    tags: ["Philosophy", "Curation", "Design"],
    relatedSlugs: ["material-matters", "scandinavian-influence"],
  },
  {
    slug: "workspace-essentials",
    title: "Five Objects That Transform Your Workspace",
    excerpt:
      "A well-designed desk is not about having more — it is about having the right things. Our guide to building a workspace that works for you.",
    content: `Your desk is more than a surface — it is where your best thinking happens. And the objects on it either support that thinking or distract from it.

We believe a workspace should be functional, beautiful, and free of visual noise. Here are five objects we think every considered workspace deserves.

## 1. Proper Lighting

The single biggest upgrade you can make. A well-designed desk lamp — like our Arc Desk Lamp — eliminates screen glare, reduces eye strain, and adds warmth to your environment. Look for adjustable brightness and a colour temperature between 2700K and 4000K.

## 2. A Cable Management Solution

Nothing disrupts visual calm like tangled cables. A magnetic cable manager keeps your charging cables, headphone wires, and peripherals organized without effort. Once you experience a clean desk edge, you will never go back.

## 3. An Elevated Monitor Stand

Ergonomics is not optional. A quality monitor stand brings your screen to eye level, reducing neck strain during long work sessions. The best ones double as storage — like our Equilibrium Stand, which creates a clean shelf beneath your monitor.

## 4. A Considered Organizer

Pens, notebooks, small tools — they accumulate. A desk organizer with defined compartments gives everything a home. We favour natural materials like walnut or oak, which age beautifully and add warmth.

## 5. One Beautiful Object

Not everything on your desk needs to be functional. A small ceramic vessel, a piece of stone, a single plant — something that reminds you of the world outside the screen. This is not decoration. It is respite.

## The Principle

The principle is simple: remove what distracts, keep what supports, and let beauty emerge from intention. A workspace designed this way does not just look better — it thinks better.`,
    date: "January 24, 2026",
    category: "Workspace",
    image:
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=1200&q=80",
    author: {
      name: "Marcus Hale",
      role: "Product Curator",
      avatar: "MH",
    },
    readTime: "4 min read",
    tags: ["Workspace", "Productivity", "Guide"],
    relatedSlugs: ["the-art-of-less", "material-matters"],
  },
  {
    slug: "material-matters",
    title: "Material Matters: A Guide to Quality",
    excerpt:
      "How to recognize true quality in everyday objects — from leather grain to ceramic glaze to thread count.",
    content: `Quality is not always visible at first glance. But once you learn to see it, you cannot unsee it. This guide will help you recognize the hallmarks of well-made objects.

## Leather

The most important distinction in leather is between full-grain and corrected-grain. Full-grain leather retains the entire natural surface, including imperfections. It develops a rich patina over time and only gets better with age.

Corrected-grain leather has been sanded and embossed to look uniform. It may look perfect in the store, but it will not age gracefully. At Aureon, we exclusively source full-grain, vegetable-tanned leather.

## Ceramics

In ceramics, look for weight and glaze consistency. A well-made ceramic piece has a satisfying heft — not too heavy, not too light. The glaze should be even, without bare spots or drips (unless intentionally applied in a wabi-sabi style).

Run your finger along the base. Quality ceramics have a smooth, often unglazed foot ring that sits flat without wobbling.

## Textiles

Thread count is often misleading. A 400-thread-count Egyptian cotton sheet can outperform a 1000-thread-count blend. What matters is the fibre — long-staple cotton, merino wool, or linen — and the weave.

Feel the fabric. Quality textiles have a certain hand — a combination of softness and substance that cheap materials cannot replicate.

## Wood

Solid wood versus veneer is the fundamental divide. Solid wood is heavier, more resonant when tapped, and shows end-grain patterns that veneer cannot reproduce. Look for joinery — dovetails, mortise-and-tenon, finger joints — which indicate real craftsmanship.

## Metal

In metal goods, weight is your friend. Quality aluminium is anodized (creating a hard, scratch-resistant surface), while quality steel is powder-coated or brushed to reveal its natural character.

## The Common Thread

Across all materials, quality objects share one trait: they feel inevitable. The proportions are right. The surfaces invite touch. The weight feels considered. When you pick up a quality object, some part of you simply knows.`,
    date: "January 12, 2026",
    category: "Craft",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80",
    author: {
      name: "Elena Voss",
      role: "Editorial Director",
      avatar: "EV",
    },
    readTime: "6 min read",
    tags: ["Craft", "Materials", "Quality"],
    relatedSlugs: ["the-art-of-less", "scandinavian-influence"],
  },
  {
    slug: "scandinavian-influence",
    title: "The Scandinavian Influence on Modern Living",
    excerpt:
      "Exploring how Nordic design principles — simplicity, function, and warmth — continue to shape how we live today.",
    content: `Scandinavian design has become so pervasive that it is easy to forget how radical it once was. In a post-war world obsessed with ornament and status, Nordic designers proposed something different: beauty through simplicity, luxury through function.

## The Core Principles

At its heart, Scandinavian design is guided by three principles that remain as relevant today as they were in the 1950s.

**Democratic design.** Good design should be accessible. Not cheap — but available to those who value it, without requiring inherited wealth. This is why Nordic furniture often uses honest materials — beech, birch, linen — rather than exotic hardwoods or gilded finishes.

**Form follows function.** Every curve, every joint, every surface must serve a purpose. Ornament that does not contribute to comfort or durability is removed. What remains is the essence.

**Warmth and light.** In a region defined by long, dark winters, design naturally gravitates toward warmth. Soft textiles, warm wood tones, and objects that invite touch — these are not aesthetic choices but survival strategies that became a philosophy.

## The Legacy

Walk through any design-conscious home today and you will see the legacy. The clean lines. The natural materials. The preference for light and space over clutter and display.

But Scandinavian influence goes deeper than aesthetics. It shaped our understanding of what home means — not a showroom, but a refuge. Not a display of wealth, but a space for living well.

## What Aureon Takes From This

At Aureon, we draw heavily from Nordic design principles. Not to replicate a Scandinavian aesthetic, but to honour the philosophy underneath: that the best objects are those that improve daily life without demanding attention.

We combine this with influences from Japanese precision, Swiss engineering, and the quiet confidence of objects made to last. The result is a collection that feels global but grounded — designed for modern life, wherever that life is lived.`,
    date: "December 30, 2025",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1668365011614-9c4a49a0e89d?w=800&q=60",
    author: {
      name: "Marcus Hale",
      role: "Product Curator",
      avatar: "MH",
    },
    readTime: "5 min read",
    tags: ["Design", "Scandinavian", "Interiors"],
    relatedSlugs: ["the-art-of-less", "workspace-essentials"],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost): BlogPost[] {
  return post.relatedSlugs
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter(Boolean) as BlogPost[];
}
