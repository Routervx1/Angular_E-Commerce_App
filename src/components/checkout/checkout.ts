import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, DecimalPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Checkout {
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);

  readonly lines = this.cartService.cartLines;
  readonly subtotal = this.cartService.subtotal;
  readonly shippingCost = this.cartService.shippingCost;
  readonly tax = this.cartService.tax;
  readonly total = this.cartService.total;

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    country: ['United States', Validators.required],
    cardName: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{13,19}$/)]],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvc: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
  });

  isInvalid(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  submit(): void {
    if (this.form.invalid || this.lines().length === 0) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const order = this.orderService.placeOrder(
      this.lines(),
      {
        fullName: value.fullName,
        email: value.email,
        address: value.address,
        city: value.city,
        postalCode: value.postalCode,
        country: value.country,
      },
      this.subtotal(),
      this.shippingCost(),
      this.tax(),
      this.total(),
    );

    this.cartService.clearCart();
    this.router.navigate(['/order-confirmation', order.id]);
  }
}
