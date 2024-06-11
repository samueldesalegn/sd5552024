import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ProductService, ProductsResponse, Product } from './data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatPaginatorModule],
  template: `
    <div class="product-list">
      @for (product of paginatedProducts; track product.id;) {
        <mat-card class="product-card">
          <mat-card-header>
            <mat-card-title>{{ product.title }}</mat-card-title>
          </mat-card-header>
          <img
            mat-card-image
            [src]="product.thumbnail"
            alt="{{ product.title }}"
          />
          <mat-card-content>
            <p>{{ product.description }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button (click)="toggleDetails(product.id)">
              More...
            </button>
          </mat-card-actions>
          @if (product.showDetails) {
          <div class="product-details">
            <p>Price: {{ product.price }}</p>
            <p>Rating: {{ product.rating }}</p>
            <p>Discount: {{ product.discountPercentage }}%</p>
          </div>
  
          }
        </mat-card>

      }
      <mat-paginator
        [length]="totalProducts"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        (page)="onPageChange($event)"
      >
      </mat-paginator>
    </div>
  `,
  styles: [
    `
      .product-list {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .product-card {
        width: 100%;
        max-width: 400px;
        margin-bottom: 16px;
      }
      .product-details {
        padding: 16px;
        border-top: 1px solid #ddd;
      }
    `,
  ],
  providers: [ProductService],
})
export class AppComponent {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  currentPage: number = 0;
  pageSize: number = 5; // Adjust this value as needed
  pageSizeOptions: number[] = [5, 10, 25, 100];
  totalProducts: number = 0;
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(skip = 0, limit = 30): void {
    this.productService
      .getProducts(skip, limit)
      .subscribe((response: ProductsResponse) => {
        this.products = response.products.map((product) => ({
          ...product,
          showDetails: false,
        }));
        this.totalProducts = response.total;
        this.updatePagination();
      });
  }

  updatePagination(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = this.products.slice(start, end);

    // Fetch more products if needed
    if (
      end > this.products.length &&
      this.products.length < this.totalProducts
    ) {
      this.loadMoreProducts();
    }
  }

  loadMoreProducts(): void {
    this.productService
      .getProducts(this.products.length)
      .subscribe((response: ProductsResponse) => {
        this.products = [...this.products, ...response.products];
        this.updatePagination();
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagination();
  }

  toggleDetails(productId: number): void {
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      product.showDetails = !product.showDetails;
    }
  }
}
