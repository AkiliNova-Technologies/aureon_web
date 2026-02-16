# AUREON — Elevated Living. Thoughtfully Curated.

A premium e-commerce store built with Next.js 15 (App Router), Tailwind CSS v4, and Lucide Icons.

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **Styling:** Tailwind CSS v4 with custom theme
- **Icons:** Lucide React
- **Language:** TypeScript
- **State:** React Context (cart, wishlist, UI state)

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, editorial, categories, featured products, brand story |
| Shop | `/shop` | Product grid with category filters, sorting, grid toggle |
| Product Detail | `/shop/[slug]` | Image gallery, variants, tabs (description, details, reviews) |
| Cart | `/cart` | Full cart with quantity controls, coupon, order summary |
| Checkout | `/checkout` | Shipping form, payment methods, order confirmation |
| Wishlist | `/wishlist` | Saved items table with add-to-cart actions |
| Account | `/account` | Tabbed: personal info, orders, addresses, payment, password |
| Track Order | `/track-order` | Order lookup form, visual progress timeline |
| FAQ | `/faq` | Categorized accordion FAQ |
| About | `/about` | Brand story, values, CTA |
| Contact | `/contact` | Contact form + info sidebar |
| Blog/Journal | `/blog` | Featured post + grid layout |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Brand Identity

- **Colors:** Charcoal (#1C1C1C), Ivory (#F5F3EF), Muted Gold (#C6A75E), Warm Gray (#B8B6B1), Stone (#8E8C86)
- **Typography:** Cormorant Garamond (headings), Inter (body/UI)
- **Design:** Minimal UI chrome, large product photography, editorial spacing, understated buttons

## Project Structure

```
aureon/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Tailwind v4 + custom styles
│   ├── shop/               # Shop + product detail
│   ├── cart/               # Cart page
│   ├── checkout/           # Checkout flow
│   ├── wishlist/           # Wishlist page
│   ├── account/            # Account dashboard
│   ├── track-order/        # Order tracking
│   ├── faq/                # FAQ page
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   └── blog/               # Journal/blog
├── components/
│   ├── layout/             # Header, Footer, CartDrawer, SearchOverlay
│   └── ui/                 # ProductCard, PageHeader, TrustBadges
├── lib/
│   ├── products.ts         # Product data + helpers
│   ├── store.tsx           # Cart/Wishlist context
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## Features

- Responsive design (mobile-first)
- Slide-out cart drawer
- Full-screen search overlay
- Product variant selection
- Quantity controls
- Coupon code support
- Order tracking with visual timeline
- Categorized FAQ accordion
- Newsletter subscription
- Trust badges
- Animated page transitions
