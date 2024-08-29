import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { ProductCart } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../services/wishlist.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems: ProductCart[] = [];

  couponCode = '';
  userLocation = 'Viet Nam';

  constructor(
    private cartService: CartService,
    private wishlishService: WishlistService
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
  }

  increaseQuantity(productId: number) {
    this.cartService.increaseCartItemQuantity(productId);
    this.loadCart();
  }

  decreaseQuantity(productId: number) {
    this.cartService.decreaseCartItemQuantity(productId);
    this.loadCart();
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
  }

  addToWishlist(product: ProductCart) {
    const confirmed = confirm(
      'Are you sure you want to add this product to the wishlist?'
    );
    if (confirmed) {
      this.wishlishService.addToWishlist(product, product.quantity);
      this.removeItem(product.id);
    }
  }

  applyCoupon() {
    this.cartService.applyCoupon(this.couponCode);
  }

  caculateShippingandTaxCost() {
    this.cartService.caculateShipping(this.userLocation);
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  getDiscount() {
    return this.cartService.getDiscount();
  }

  getShippingCost() {
    return this.cartService.getShippingCost();
  }

  getSurbtotal() {
    return this.cartService.getSubTotal();
  }
}
