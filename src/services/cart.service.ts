import { Injectable, computed, signal } from '@angular/core';
import { CartLine, Product } from '../models/product.model';

const TAX_RATE = 0.0725;
const FREE_SHIPPING_THRESHOLD = 75;
const FLAT_SHIPPING = 6.99;

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly lines = signal<CartLine[]>([]);

  readonly cartLines = this.lines.asReadonly();

  readonly itemCount = computed(() => this.lines().reduce((sum, line) => sum + line.quantity, 0));

  readonly subtotal = computed(() =>
    this.lines().reduce((sum, line) => sum + line.product.price * line.quantity, 0),
  );

  readonly shippingCost = computed(() => (this.subtotal() === 0 || this.subtotal() >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING));

  readonly tax = computed(() => this.subtotal() * TAX_RATE);

  readonly total = computed(() => this.subtotal() + this.shippingCost() + this.tax());

  readonly amountUntilFreeShipping = computed(() => Math.max(0, FREE_SHIPPING_THRESHOLD - this.subtotal()));

  addToCart(product: Product, quantity = 1): void {
    this.lines.update((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      if (existing) {
        return current.map((line) =>
          line.product.id === product.id ? { ...line, quantity: line.quantity + quantity } : line,
        );
      }
      return [...current, { product, quantity }];
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeLine(productId);
      return;
    }
    this.lines.update((current) =>
      current.map((line) => (line.product.id === productId ? { ...line, quantity } : line)),
    );
  }

  removeLine(productId: string): void {
    this.lines.update((current) => current.filter((line) => line.product.id !== productId));
  }

  clearCart(): void {
    this.lines.set([]);
  }
}
