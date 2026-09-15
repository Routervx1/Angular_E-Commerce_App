import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
  private readonly cartService = inject(CartService);

  readonly lines = this.cartService.cartLines;
  readonly subtotal = this.cartService.subtotal;
  readonly shippingCost = this.cartService.shippingCost;
  readonly tax = this.cartService.tax;
  readonly total = this.cartService.total;
  readonly amountUntilFreeShipping = this.cartService.amountUntilFreeShipping;

  updateQuantity(productId: string, quantity: string): void {
    this.cartService.updateQuantity(productId, Number(quantity));
  }

  increment(productId: string, current: number): void {
    this.cartService.updateQuantity(productId, current + 1);
  }

  decrement(productId: string, current: number): void {
    this.cartService.updateQuantity(productId, current - 1);
  }

  remove(productId: string): void {
    this.cartService.removeLine(productId);
  }
}
