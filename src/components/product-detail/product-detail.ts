import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  private readonly productId = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))), {
    initialValue: null,
  });

  readonly product = computed(() => {
    const id = this.productId();
    return id ? this.productService.getById(id) : undefined;
  });

  readonly quantity = signal(1);
  readonly justAdded = signal(false);

  increment(): void {
    this.quantity.update((qty) => Math.min(qty + 1, 20));
  }

  decrement(): void {
    this.quantity.update((qty) => Math.max(qty - 1, 1));
  }

  addToCart(): void {
    const product = this.product();
    if (!product) {
      return;
    }
    this.cartService.addToCart(product, this.quantity());
    this.justAdded.set(true);
    setTimeout(() => this.justAdded.set(false), 1500);
  }

  goToCart(): void {
    this.addToCart();
    this.router.navigate(['/cart']);
  }
}
