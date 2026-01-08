// Task 1.2: Define Enums and Type Aliases
export enum DessertCategory {
  Waffle = "Waffle",
  CremeBrulee = "CremeBrulee",
  Macaron = "Macaron",
  Tiramisu = "Tiramisu",
  Baklava = "Baklava",
  Pie = "Pie",
  Cake = "Cake",
  Brownie = "Brownie",
  PannaCotta = "PannaCotta"
}

export type DessertId = string;
export type Currency = "USD";
export type OrderStatus = "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";

// Task 1.1: Create Basic Type Definitions
export interface DessertImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Dessert {
  id: DessertId;
  name: string;
  category: DessertCategory;
  price: number;
  image: DessertImage;
  description: string;
  inStock: boolean;
}

export interface CartItem {
  dessert: Dessert;
  quantity: number;
  addedAt: Date;
}

// Order-related types for Phase 3
export interface OrderDetails {
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  paymentMethod: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  details: OrderDetails;
  createdAt: Date;
}