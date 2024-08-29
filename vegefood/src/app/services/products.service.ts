import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { PaginationParams } from '../models/types.model';
import { Product, Products } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getProducts = (
    url: string,
    params: PaginationParams
  ): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };

  getProduct = (url: string): Observable<Product> => {
    return this.apiService.get(url, {
      responseType: 'json',
    });
  };
}
