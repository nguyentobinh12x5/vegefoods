import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  constructor(private cartService: CartService) {}

  userLocation = 'Viet Nam';
  getTotal() {
    return this.cartService.total;
  }

  getSubTotal() {
    return this.cartService.subtotal;
  }

  getDiscount() {
    return this.cartService.discount;
  }

  getShippingCost() {
    return this.cartService.shippingCost;
  }

  getTaxCost() {
    return this.cartService.taxCost;
  }

  caculateShippingandTaxCost() {
    this.cartService.caculateShipping(this.userLocation);
    this.cartService.caculateTax(this.userLocation);
  }
}
