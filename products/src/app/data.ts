import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
showDetails: any;
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
}

export interface ProductsResponse {
  products: Product[];
}

export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.apiUrl);
  }
}
