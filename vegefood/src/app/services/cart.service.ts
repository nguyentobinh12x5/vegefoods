import { Injectable } from '@angular/core';
import { Product, ProductCart } from '../models/product.model';
import { CouponService } from './coupon.service';
import { ShippingService } from './shipping.service';
import { TaxService } from './tax.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private couponService: CouponService,
    private shippingService: ShippingService,
    private taxService: TaxService
  ) {}

  total = 0;
  subtotal = 0;
  discount = 0;
  shippingCost = 0;
  taxCost = 0;

  cartItems: ProductCart[] = [];

  getCartItems() {
    const items = localStorage.getItem('cartItems');
    this.cartItems = items ? JSON.parse(items) : [];
    this.calculateSubTotal();
    return this.cartItems;
  }

  addToCart(product: Product, quantity: number) {
    const cartItems = this.getCartItems();
    const existingProduct = cartItems.find(
      (item: any) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cartItems.push({ ...product, quantity });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    alert('Product added to cart successfully!');
  }

  increaseCartItemQuantity(productId: number) {
    const cartItems = this.getCartItems();
    const existingProduct = cartItems.find(
      (item: any) => item.id === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
      return localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    alert('Product not found in cart!');
  }

  decreaseCartItemQuantity(productId: number) {
    const cartItems = this.getCartItems();
    const existingProduct = cartItems.find(
      (item: any) => item.id === productId
    );

    if (existingProduct) {
      existingProduct.quantity -= 1;
      if (existingProduct.quantity <= 0) {
        return this.removeFromCart(productId);
      }
      return localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    alert('Product not found in cart!');
  }

  removeFromCart(productId: number) {
    const cartItems = this.getCartItems();
    const updatedCartItems = cartItems.filter(
      (item: any) => item.id !== productId
    );
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  }

  clearCart() {
    localStorage.removeItem('cartItems');
  }

  applyCoupon(code: string) {
    this.discount = this.couponService.validateCoupon(code);
    this.calculateTotal();
  }

  calculateSubTotal() {
    this.subtotal = this.cartItems.reduce((acc, item) => {
      const price = item.priceSales || item.priceOriginal;
      return acc + price * item.quantity;
    }, 0);
    return this.subtotal;
  }

  calculateTotal() {
    this.calculateSubTotal();
    this.total =
      this.subtotal - this.discount + this.shippingCost + this.taxCost;
    return this.total;
  }

  caculateShipping(location: string) {
    this.shippingCost = this.shippingService.calculateShippingCost(location);
    this.calculateTotal();
  }

  caculateTax(location: string) {
    this.taxCost = this.taxService.calculateTax(this.subtotal, location);
    this.calculateTotal();
  }

  getTotal() {
    return this.total;
  }

  getSubTotal() {
    return this.subtotal;
  }

  getDiscount() {
    return this.discount;
  }

  getShippingCost() {
    return this.shippingCost;
  }

  getTaxCost() {
    return this.taxCost;
  }
}
