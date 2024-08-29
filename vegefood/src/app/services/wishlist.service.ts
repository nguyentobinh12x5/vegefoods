import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor() {}

  getWishlistItems() {
    const items = localStorage.getItem('wishlistItems');
    return items ? JSON.parse(items) : [];
  }

  addToWishlist(product: Product, quantity: number) {
    const wishlistItems = this.getWishlistItems();
    const existingProduct = wishlistItems.find(
      (item: any) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      wishlistItems.push({ ...product, quantity });
    }
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));

    alert('Product added to Wishlist successfully!');
  }

  increaseWishlistItemQuantity(productId: number) {
    const wishlistItems = this.getWishlistItems();
    const existingProduct = wishlistItems.find(
      (item: any) => item.id === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
      return localStorage.setItem(
        'wishlistItems',
        JSON.stringify(wishlistItems)
      );
    }
    alert('Product not found in Wishlist!');
  }

  decreaseWishlistItemQuantity(productId: number) {
    const wishlistItems = this.getWishlistItems();
    const existingProduct = wishlistItems.find(
      (item: any) => item.id === productId
    );

    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity <= 0) {
        return this.removeFromWishlist(productId);
      }
      return localStorage.setItem(
        'wishlistItems',
        JSON.stringify(wishlistItems)
      );
    }
    alert('Product not found in Wishlist!');
  }

  removeFromWishlist(productId: number) {
    const WishlistItems = this.getWishlistItems();
    const updatedWishlistItems = WishlistItems.filter(
      (item: any) => item.id !== productId
    );
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlistItems));
  }

  clearWishlist() {
    localStorage.removeItem('wishlistItems');
  }
}
