export type PetCategory = 'Dogs' | 'Cats' | 'Fish' | 'Birds' | 'Small Pets';

export interface Product {
  id: string;
  name: string;
  category: PetCategory;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  emoji: string;
  color: string;
  tags: string[];
  inStock: boolean;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentDetails {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export interface Order {
  id: string;
  lines: CartLine[];
  shipping: ShippingDetails;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  placedAt: Date;
}
