import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProductService, ProductsResponse, Product } from './data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div *ngFor="let product of paginatedProducts">
      <h2>{{ product.title }}</h2>
      <img [src]="product.thumbnail" alt="{{ product.title }}" />
      <p>{{ product.description }}</p>
      <button (click)="toggleDetails(product.id)">More...</button>
      <div *ngIf="product.showDetails">
        <p>Price: {{ product.price }}</p>
        <p>Rating: {{ product.rating }}</p>
        <p>Discount: {{ product.discountPercentage }}%</p>
      </div>
    </div>
    <div>
      <button (click)="previousPage()" [disabled]="currentPage === 1">
        <
      </button>
      <button (click)="nextPage()" [disabled]="currentPage === totalPages">
        >
      </button>
    </div>
  `,
  styles: [
    `
      div {
        margin: 10px 0;
      }
      img {
        max-width: 100px;
        max-height: 100px;
      }
    `,
  ],
  providers: [
    {
      provide: ProductService,
      useFactory: (http: HttpClient) => new ProductService(http),
      deps: [HttpClient],
    },
  ],
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 1; // You can change this value to suit your needs
  totalPages: number = 1;
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((response: ProductsResponse) => {
        this.products = response.products.map((product) => ({
          ...product,
          showDetails: false,
        }));
        this.totalPages = Math.ceil(this.products.length / this.pageSize);
        this.updatePagination();
      });
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = this.products.slice(start, end);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  toggleDetails(productId: number): void {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      product.showDetails = !product.showDetails;
    }
  }
}
