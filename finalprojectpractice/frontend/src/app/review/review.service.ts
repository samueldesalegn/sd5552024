import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../data.interfaces';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  #http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/reviews';

  createReview(medicationId: string, review: Review): Observable<Review> {
    return this.#http.post<Review>(`${this.baseUrl}/${medicationId}`, review);
  }

  deleteReview(medicationId: string, reviewId: string): Observable<void> {
    return this.#http.delete<void>(
      `${this.baseUrl}/${medicationId}/${reviewId}`
    );
  }
}
