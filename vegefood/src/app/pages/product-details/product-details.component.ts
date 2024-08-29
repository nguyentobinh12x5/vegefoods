import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { BASE_URL } from '../../../../config';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { PricePipe } from '../../pipes/price.pipe';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, PricePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}
  productId: string | null = null;
  product: Product | null = null;

  quantity: number = 1;

  increaseQuantity() {
    this.quantity += 1;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.fetchProductDetails();
  }

  fetchProductDetails() {
    this.productsService
      .getProduct(`${BASE_URL}/products/${this.productId}`)
      .subscribe({
        next: (product: Product) => {
          this.product = product;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  addToCart(product: Product, quantity: number) {
    this.cartService.addToCart(product, quantity);
  }
}
