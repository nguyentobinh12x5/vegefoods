import { Component } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { ProductWishlist } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  wishlistItems: ProductWishlist[] = [];
  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistItems = this.wishlistService.getWishlistItems();
  }

  increaseQuantity(productId: number) {
    this.wishlistService.increaseWishlistItemQuantity(productId);
    this.loadWishlist();
  }

  decreaseQuantity(productId: number) {
    this.wishlistService.decreaseWishlistItemQuantity(productId);
    this.loadWishlist();
  }

  removeItem(productId: number) {
    this.wishlistService.removeFromWishlist(productId);
    this.loadWishlist();
  }

  clearWishlist() {
    this.wishlistService.clearWishlist();
    this.loadWishlist();
  }

  addToCart(product: ProductWishlist) {
    const confirmed = confirm(
      'Are you sure you want to add this product to the cart?'
    );
    if (confirmed) {
      this.cartService.addToCart(product, product.quantity);
      this.removeItem(product.id);
    }
  }
}
