export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  tags: string[];
  sku: string;
  variants?: { label: string; options: string[] }[];
  attributes?: { key: string; value: string }[];
  badge?: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  image: string;
}

export const categories: Category[] = [
  {
    name: "Workspace",
    slug: "workspace",
    description: "Desk accessories, lighting, and minimalist organizers",
    itemCount: 12,
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&q=80",
  },
  {
    name: "Living",
    slug: "living",
    description: "Home essentials, smart décor, and air & light solutions",
    itemCount: 15,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
  },
  {
    name: "Travel",
    slug: "travel",
    description: "Premium organizers, tech pouches, and everyday carry",
    itemCount: 8,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
  },
  {
    name: "Wellness",
    slug: "wellness",
    description: "Posture tools, focus aids, and calm technology",
    itemCount: 10,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
  },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "arc-desk-lamp",
    name: "Arc Desk Lamp",
    category: "Workspace",
    categorySlug: "workspace",
    price: 189,
    originalPrice: 220,
    description: "A sculptural desk lamp that combines precision engineering with organic form. The Arc Desk Lamp features a seamless aluminum body with a warm-toned LED that adjusts across three brightness levels. Designed for focused work and ambient presence.",
    shortDescription: "Sculptural aluminum desk lamp with warm LED",
    images: [
      "https://images.unsplash.com/photo-1571406487954-dc11b0c0767d?w=500&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 124,
    tags: ["Lighting", "Desk", "Aluminum"],
    sku: "AUR-WS-001",
    variants: [{ label: "Finish", options: ["Matte Black", "Brushed Silver", "Warm Bronze"] }],
    attributes: [
      { key: "Material", value: "Anodized Aluminum" },
      { key: "Light Source", value: "Integrated LED, 2700K–4000K" },
      { key: "Dimensions", value: "H 45cm × W 12cm" },
      { key: "Weight", value: "1.2 kg" },
    ],
    badge: "Editor's Pick",
  },
  {
    id: "2",
    slug: "zen-organizer",
    name: "Zen Desk Organizer",
    category: "Workspace",
    categorySlug: "workspace",
    price: 78,
    description: "Crafted from sustainably sourced walnut, the Zen Organizer brings warmth and order to any desk. Three compartments and a felt-lined base keep essentials accessible without clutter.",
    shortDescription: "Walnut desk organizer with felt-lined base",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    ],
    inStock: true,
    rating: 4.9,
    reviews: 87,
    tags: ["Organization", "Wood", "Desk"],
    sku: "AUR-WS-002",
    attributes: [
      { key: "Material", value: "American Walnut" },
      { key: "Dimensions", value: "L 28cm × W 12cm × H 8cm" },
    ],
  },
  {
    id: "3",
    slug: "equilibrium-monitor-stand",
    name: "Equilibrium Monitor Stand",
    category: "Workspace",
    categorySlug: "workspace",
    price: 145,
    description: "Elevate your screen to ergonomic height with the Equilibrium. Solid steel base with a natural oak platform, designed to reduce neck strain while adding a refined presence to your desk.",
    shortDescription: "Steel and oak ergonomic monitor stand",
    images: [
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&q=80",
    ],
    inStock: true,
    rating: 4.7,
    reviews: 56,
    tags: ["Ergonomic", "Stand", "Oak"],
    sku: "AUR-WS-003",
    variants: [{ label: "Platform", options: ["Natural Oak", "Dark Walnut"] }],
    attributes: [
      { key: "Material", value: "Powder-coated Steel, Solid Oak" },
      { key: "Max Weight", value: "15 kg" },
      { key: "Dimensions", value: "L 52cm × W 24cm × H 10cm" },
    ],
  },
  {
    id: "4",
    slug: "sienna-throw-blanket",
    name: "Sienna Throw Blanket",
    category: "Living",
    categorySlug: "living",
    price: 120,
    description: "Hand-finished merino wool throw in a warm sienna tone. The perfect balance of weight and softness — designed to drape beautifully over a sofa or at the foot of a bed.",
    shortDescription: "Hand-finished merino wool throw",
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    ],
    inStock: true,
    rating: 4.9,
    reviews: 203,
    tags: ["Textile", "Wool", "Home"],
    sku: "AUR-LV-001",
    variants: [{ label: "Color", options: ["Sienna", "Charcoal", "Sand"] }],
    attributes: [
      { key: "Material", value: "100% Merino Wool" },
      { key: "Dimensions", value: "180cm × 130cm" },
      { key: "Care", value: "Dry clean recommended" },
    ],
    badge: "Best Seller",
  },
  {
    id: "5",
    slug: "luna-diffuser",
    name: "Luna Ceramic Diffuser",
    category: "Living",
    categorySlug: "living",
    price: 95,
    description: "A minimalist ceramic diffuser with whisper-quiet ultrasonic technology. Luna creates a gentle mist with ambient warm light — bringing calm to any room without visual noise.",
    shortDescription: "Ceramic ultrasonic diffuser with ambient light",
    images: [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&q=80",
    ],
    inStock: true,
    rating: 4.6,
    reviews: 167,
    tags: ["Aroma", "Ceramic", "Wellness"],
    sku: "AUR-LV-002",
    variants: [{ label: "Color", options: ["Bone White", "Soft Gray"] }],
    attributes: [
      { key: "Material", value: "Glazed Ceramic" },
      { key: "Capacity", value: "200ml" },
      { key: "Run Time", value: "Up to 8 hours" },
    ],
  },
  {
    id: "6",
    slug: "atlas-weekender",
    name: "Atlas Weekender Bag",
    category: "Travel",
    categorySlug: "travel",
    price: 245,
    originalPrice: 280,
    description: "Full-grain leather weekender with a reinforced canvas lining. The Atlas is designed for 2–3 day trips — spacious enough for essentials, refined enough for any setting.",
    shortDescription: "Full-grain leather weekender bag",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 92,
    tags: ["Leather", "Bag", "Travel"],
    sku: "AUR-TR-001",
    variants: [{ label: "Color", options: ["Cognac", "Black"] }],
    attributes: [
      { key: "Material", value: "Full-grain Vegetable-tanned Leather" },
      { key: "Dimensions", value: "L 52cm × W 24cm × H 28cm" },
      { key: "Laptop Compartment", value: "Fits up to 15 inch" },
    ],
  },
  {
    id: "7",
    slug: "meridian-tech-pouch",
    name: "Meridian Tech Pouch",
    category: "Travel",
    categorySlug: "travel",
    price: 68,
    description: "Water-resistant tech pouch with a structured interior. Keeps cables, chargers, and accessories organized with precision. Built from recycled ballistic nylon.",
    shortDescription: "Structured tech organizer in recycled nylon",
    images: [
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800&q=80",
    ],
    inStock: false,
    rating: 4.7,
    reviews: 145,
    tags: ["Tech", "Organizer", "Nylon"],
    sku: "AUR-TR-002",
    attributes: [
      { key: "Material", value: "Recycled Ballistic Nylon" },
      { key: "Dimensions", value: "L 24cm × W 14cm × H 8cm" },
    ],
  },
  {
    id: "8",
    slug: "forma-posture-cushion",
    name: "Forma Posture Cushion",
    category: "Wellness",
    categorySlug: "wellness",
    price: 110,
    description: "Engineered memory foam cushion that supports natural spine alignment. The Forma features a breathable mesh cover and a non-slip base — designed for all-day seated comfort.",
    shortDescription: "Ergonomic memory foam posture cushion",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 234,
    tags: ["Ergonomic", "Posture", "Comfort"],
    sku: "AUR-WL-001",
    variants: [{ label: "Cover", options: ["Charcoal Mesh", "Stone Linen"] }],
    attributes: [
      { key: "Material", value: "High-density Memory Foam" },
      { key: "Cover", value: "Removable, Machine Washable" },
      { key: "Dimensions", value: "W 45cm × D 40cm × H 8cm" },
    ],
    badge: "New",
  },
  {
    id: "9",
    slug: "drift-sound-machine",
    name: "Drift Sound Machine",
    category: "Wellness",
    categorySlug: "wellness",
    price: 135,
    description: "Precision-tuned sound machine with 12 natural soundscapes. Drift creates an acoustic cocoon for sleep and focus — no loops, no digital artifacts, just smooth ambient sound.",
    shortDescription: "Natural soundscape machine for sleep and focus",
    images: [
      "https://images.unsplash.com/photo-1643989996350-01addb8c8228?w=800&q=60",
    ],
    inStock: true,
    rating: 4.5,
    reviews: 78,
    tags: ["Sound", "Sleep", "Focus"],
    sku: "AUR-WL-002",
    attributes: [
      { key: "Sounds", value: "12 Natural Soundscapes" },
      { key: "Timer", value: "30, 60, 90 min or Continuous" },
      { key: "Power", value: "USB-C, 5V/1A" },
    ],
  },
  {
    id: "10",
    slug: "helix-cable-manager",
    name: "Helix Cable Manager",
    category: "Workspace",
    categorySlug: "workspace",
    price: 34,
    description: "A magnetic cable management solution in anodized aluminum. Three weighted clips keep cables in place with a satisfying click — clean desk, clear mind.",
    shortDescription: "Magnetic aluminum cable management clips",
    images: [
      "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&q=80",
    ],
    inStock: true,
    rating: 4.6,
    reviews: 312,
    tags: ["Cable", "Organization", "Aluminum"],
    sku: "AUR-WS-004",
    variants: [{ label: "Set", options: ["3-Pack", "6-Pack"] }],
    attributes: [
      { key: "Material", value: "Anodized Aluminum" },
      { key: "Cable Compatibility", value: "Up to 6mm diameter" },
    ],
  },
  {
    id: "11",
    slug: "canvas-wall-clock",
    name: "Canvas Wall Clock",
    category: "Living",
    categorySlug: "living",
    price: 165,
    description: "A silent quartz wall clock with a brushed brass frame and linen-textured face. No ticking, no distraction — just quiet, beautiful timekeeping.",
    shortDescription: "Silent brass wall clock with linen face",
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80",
    ],
    inStock: true,
    rating: 4.9,
    reviews: 45,
    tags: ["Clock", "Brass", "Wall"],
    sku: "AUR-LV-003",
    attributes: [
      { key: "Material", value: "Brushed Brass, Linen" },
      { key: "Diameter", value: "30cm" },
      { key: "Movement", value: "Silent Quartz" },
    ],
  },
  {
    id: "12",
    slug: "terra-candle-set",
    name: "Terra Candle Set",
    category: "Living",
    categorySlug: "living",
    price: 58,
    description: "A trio of hand-poured soy candles in earthy tones. Unscented by default — designed as quiet objects that add warmth through presence alone.",
    shortDescription: "Hand-poured soy candle trio in earthy tones",
    images: [
      "https://images.unsplash.com/photo-1736124708942-c44cd69ec3ba?w=800&q=80",
    ],
    inStock: true,
    rating: 4.7,
    reviews: 189,
    tags: ["Candle", "Soy", "Home"],
    sku: "AUR-LV-004",
    attributes: [
      { key: "Material", value: "100% Soy Wax" },
      { key: "Burn Time", value: "40 hours each" },
      { key: "Set Includes", value: "3 candles" },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return products.filter((p) => p.inStock).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}
