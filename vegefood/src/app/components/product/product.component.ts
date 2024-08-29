import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { PricePipe } from '../../pipes/price.pipe';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, PricePipe, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  @Input() product!: Product;

  addToCart(product: Product) {
    this.cartService.addToCart(product, 1);
  }

  addToWishlist(product: Product) {
    this.wishlistService.addToWishlist(product, 1);
  }
}
