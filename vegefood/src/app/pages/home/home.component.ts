import { Component, OnInit } from '@angular/core';
import { Product, Products } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../components/product/product.component';
import { BASE_URL } from '../../../../config';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];

  totalRecords: number = 0;

  rows: number = 4;

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts(`${BASE_URL}/products`, { page, perPage })
      .subscribe({
        next: (products: Products) => {
          console.log(products);
          this.products = products.items;
          console.log(this.products);
          this.totalRecords = products.total;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
