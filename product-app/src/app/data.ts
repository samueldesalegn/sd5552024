import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  showDetails?: boolean;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export class ProductService {
  #apiUrl = 'https://dummyjson.com/products';
  #http = inject(HttpClient);

  getProducts(skip = 0, limit = 30) {
    return this.#http.get<ProductsResponse>(
      `${this.#apiUrl}?skip=${skip}&limit=${limit}`
    );
  }
}
