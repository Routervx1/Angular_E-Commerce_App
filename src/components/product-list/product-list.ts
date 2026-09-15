import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { PetCategory, Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly categories = this.productService.categories;
  readonly activeCategory = this.productService.category;
  readonly products = this.productService.filteredProducts;
  readonly searchTerm = this.productService.search;

  readonly recentlyAddedId = signal<string | null>(null);

  onSearch(term: string): void {
    this.productService.setSearchTerm(term);
  }

  onCategorySelect(category: PetCategory | 'All'): void {
    this.productService.setCategory(category);
  }

  addToCart(product: Product, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(product);
    this.recentlyAddedId.set(product.id);
    setTimeout(() => {
      if (this.recentlyAddedId() === product.id) {
        this.recentlyAddedId.set(null);
      }
    }, 1200);
  }
}
