import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe, DatePipe } from '@angular/common';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [RouterLink, DecimalPipe, DatePipe],
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmation {
  private readonly orderService = inject(OrderService);
  readonly order = this.orderService.lastOrder;
}
