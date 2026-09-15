import { Injectable, signal } from '@angular/core';
import { CartLine, Order, ShippingDetails } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly lastOrderSignal = signal<Order | null>(null);

  readonly lastOrder = this.lastOrderSignal.asReadonly();

  placeOrder(
    lines: CartLine[],
    shipping: ShippingDetails,
    subtotal: number,
    shippingCost: number,
    tax: number,
    total: number,
  ): Order {
    const order: Order = {
      id: this.generateOrderId(),
      lines,
      shipping,
      subtotal,
      shippingCost,
      tax,
      total,
      placedAt: new Date(),
    };
    this.lastOrderSignal.set(order);
    return order;
  }

  private generateOrderId(): string {
    const random = Math.floor(Math.random() * 900000) + 100000;
    return `PET-${random}`;
  }
}
