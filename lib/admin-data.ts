export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "customer" | "vip" | "admin";
  avatar: string;
  joined: string;
  orders: number;
  totalSpent: number;
  status: "active" | "inactive" | "suspended";
  lastActive: string;
}

export interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: "pending" | "accepted" | "processing" | "shipped" | "delivered" | "cancelled";
  payment: string;
  items: { name: string; qty: number; price: number }[];
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  lowStockThreshold: number;
  price: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
  lastRestocked: string;
}

export const adminUsers: AdminUser[] = [
  { id: "u1", name: "Alex Morgan", email: "alex@aureon.co", role: "admin", avatar: "AM", joined: "2025-06-15", orders: 0, totalSpent: 0, status: "active", lastActive: "2026-02-16" },
  { id: "u2", name: "Sophia Chen", email: "sophia.chen@gmail.com", role: "vip", avatar: "SC", joined: "2025-08-22", orders: 14, totalSpent: 2840, status: "active", lastActive: "2026-02-15" },
  { id: "u3", name: "James Eriksson", email: "j.eriksson@mail.com", role: "customer", avatar: "JE", joined: "2025-09-10", orders: 7, totalSpent: 1120, status: "active", lastActive: "2026-02-12" },
  { id: "u4", name: "Mia Tanaka", email: "mia.tanaka@outlook.com", role: "vip", avatar: "MT", joined: "2025-07-03", orders: 22, totalSpent: 4350, status: "active", lastActive: "2026-02-14" },
  { id: "u5", name: "Oliver Brandt", email: "oliver.b@proton.me", role: "customer", avatar: "OB", joined: "2025-11-18", orders: 3, totalSpent: 412, status: "active", lastActive: "2026-02-08" },
  { id: "u6", name: "Ava Williams", email: "ava.w@gmail.com", role: "customer", avatar: "AW", joined: "2025-10-05", orders: 5, totalSpent: 678, status: "inactive", lastActive: "2026-01-15" },
  { id: "u7", name: "Liam Novak", email: "liam.novak@mail.com", role: "customer", avatar: "LN", joined: "2025-12-20", orders: 1, totalSpent: 189, status: "active", lastActive: "2026-02-11" },
  { id: "u8", name: "Emma Delacroix", email: "emma.d@work.com", role: "vip", avatar: "ED", joined: "2025-07-28", orders: 18, totalSpent: 3290, status: "active", lastActive: "2026-02-16" },
  { id: "u9", name: "Noah Kim", email: "noah.kim@yahoo.com", role: "customer", avatar: "NK", joined: "2026-01-05", orders: 2, totalSpent: 246, status: "suspended", lastActive: "2026-01-30" },
  { id: "u10", name: "Isabella Rossi", email: "i.rossi@gmail.com", role: "customer", avatar: "IR", joined: "2025-09-30", orders: 8, totalSpent: 1560, status: "active", lastActive: "2026-02-13" },
];

export const adminOrders: AdminOrder[] = [
  { id: "AUR-2026-0301", customer: "Sophia Chen", email: "sophia.chen@gmail.com", date: "2026-02-16", total: 367, status: "pending", payment: "Credit Card", items: [{ name: "Arc Desk Lamp", qty: 1, price: 189 }, { name: "Zen Desk Organizer", qty: 1, price: 78 }, { name: "Helix Cable Manager", qty: 3, price: 34 }] },
  { id: "AUR-2026-0300", customer: "Mia Tanaka", email: "mia.tanaka@outlook.com", date: "2026-02-15", total: 245, status: "accepted", payment: "PayPal", items: [{ name: "Atlas Weekender Bag", qty: 1, price: 245 }] },
  { id: "AUR-2026-0299", customer: "James Eriksson", email: "j.eriksson@mail.com", date: "2026-02-14", total: 215, status: "processing", payment: "Credit Card", items: [{ name: "Sienna Throw Blanket", qty: 1, price: 120 }, { name: "Luna Ceramic Diffuser", qty: 1, price: 95 }] },
  { id: "AUR-2026-0298", customer: "Emma Delacroix", email: "emma.d@work.com", date: "2026-02-13", total: 110, status: "shipped", payment: "Credit Card", items: [{ name: "Forma Posture Cushion", qty: 1, price: 110 }] },
  { id: "AUR-2026-0297", customer: "Oliver Brandt", email: "oliver.b@proton.me", date: "2026-02-12", total: 68, status: "delivered", payment: "PayPal", items: [{ name: "Meridian Tech Pouch", qty: 1, price: 68 }] },
  { id: "AUR-2026-0296", customer: "Isabella Rossi", email: "i.rossi@gmail.com", date: "2026-02-11", total: 434, status: "delivered", payment: "Credit Card", items: [{ name: "Arc Desk Lamp", qty: 1, price: 189 }, { name: "Atlas Weekender Bag", qty: 1, price: 245 }] },
  { id: "AUR-2026-0295", customer: "Liam Novak", email: "liam.novak@mail.com", date: "2026-02-10", total: 189, status: "delivered", payment: "Credit Card", items: [{ name: "Arc Desk Lamp", qty: 1, price: 189 }] },
  { id: "AUR-2026-0294", customer: "Sophia Chen", email: "sophia.chen@gmail.com", date: "2026-02-09", total: 520, status: "cancelled", payment: "PayPal", items: [{ name: "Atlas Weekender Bag", qty: 1, price: 245 }, { name: "Canvas Wall Clock", qty: 1, price: 165 }, { name: "Forma Posture Cushion", qty: 1, price: 110 }] },
];

export const inventoryItems: InventoryItem[] = [
  { id: "1", name: "Arc Desk Lamp", sku: "AUR-WS-001", category: "Workspace", stock: 45, lowStockThreshold: 10, price: 189, status: "in_stock", lastRestocked: "2026-02-01" },
  { id: "2", name: "Zen Desk Organizer", sku: "AUR-WS-002", category: "Workspace", stock: 32, lowStockThreshold: 8, price: 78, status: "in_stock", lastRestocked: "2026-01-20" },
  { id: "3", name: "Equilibrium Monitor Stand", sku: "AUR-WS-003", category: "Workspace", stock: 18, lowStockThreshold: 5, price: 145, status: "in_stock", lastRestocked: "2026-01-15" },
  { id: "4", name: "Sienna Throw Blanket", sku: "AUR-LV-001", category: "Living", stock: 8, lowStockThreshold: 10, price: 120, status: "low_stock", lastRestocked: "2026-01-10" },
  { id: "5", name: "Luna Ceramic Diffuser", sku: "AUR-LV-002", category: "Living", stock: 24, lowStockThreshold: 8, price: 95, status: "in_stock", lastRestocked: "2026-02-05" },
  { id: "6", name: "Atlas Weekender Bag", sku: "AUR-TR-001", category: "Travel", stock: 6, lowStockThreshold: 8, price: 245, status: "low_stock", lastRestocked: "2026-01-25" },
  { id: "7", name: "Meridian Tech Pouch", sku: "AUR-TR-002", category: "Travel", stock: 0, lowStockThreshold: 10, price: 68, status: "out_of_stock", lastRestocked: "2025-12-15" },
  { id: "8", name: "Forma Posture Cushion", sku: "AUR-WL-001", category: "Wellness", stock: 52, lowStockThreshold: 10, price: 110, status: "in_stock", lastRestocked: "2026-02-08" },
  { id: "9", name: "Drift Sound Machine", sku: "AUR-WL-002", category: "Wellness", stock: 15, lowStockThreshold: 5, price: 135, status: "in_stock", lastRestocked: "2026-01-28" },
  { id: "10", name: "Helix Cable Manager", sku: "AUR-WS-004", category: "Workspace", stock: 88, lowStockThreshold: 20, price: 34, status: "in_stock", lastRestocked: "2026-02-10" },
  { id: "11", name: "Canvas Wall Clock", sku: "AUR-LV-003", category: "Living", stock: 3, lowStockThreshold: 5, price: 165, status: "low_stock", lastRestocked: "2025-12-20" },
  { id: "12", name: "Terra Candle Set", sku: "AUR-LV-004", category: "Living", stock: 41, lowStockThreshold: 10, price: 58, status: "in_stock", lastRestocked: "2026-02-03" },
];

// Dashboard stats
export const dashboardStats = {
  totalRevenue: 28450,
  totalOrders: 142,
  totalUsers: 87,
  avgOrderValue: 200.35,
  revenueChange: 12.5,
  ordersChange: 8.3,
  usersChange: 15.2,
  aovChange: -2.1,
  recentRevenue: [
    { month: "Sep", value: 18200 },
    { month: "Oct", value: 21400 },
    { month: "Nov", value: 24800 },
    { month: "Dec", value: 31200 },
    { month: "Jan", value: 26700 },
    { month: "Feb", value: 28450 },
  ],
  ordersByStatus: {
    pending: 3,
    accepted: 5,
    processing: 8,
    shipped: 12,
    delivered: 108,
    cancelled: 6,
  },
  topProducts: [
    { name: "Arc Desk Lamp", sold: 34, revenue: 6426 },
    { name: "Atlas Weekender Bag", sold: 22, revenue: 5390 },
    { name: "Sienna Throw Blanket", sold: 28, revenue: 3360 },
    { name: "Forma Posture Cushion", sold: 19, revenue: 2090 },
    { name: "Helix Cable Manager", sold: 48, revenue: 1632 },
  ],
};
