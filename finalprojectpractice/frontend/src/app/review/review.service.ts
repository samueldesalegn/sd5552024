import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { Response, Review } from '../data.interfaces';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  #http = inject(HttpClient);

  createReview(medicationId: string, review: Review) {
    return this.#http
      .post<Response<Review>>(
        `http://localhost:3000/medications/${medicationId}/reviews`,
        review
      )
      .pipe(map((response) => response.data));
  }

  deleteReview(medicationId: string, reviewId: string) {
    return this.#http
      .delete<Response<Review>>(
        `http://localhost:3000/medications/${medicationId}/reviews/${reviewId}`
      )
      .pipe(map((response) => response.data));
  }

  updateReview(medicationId: string, reviewId: string, review: Review) {
    return this.#http
      .put<Response<Review>>(
        `http://localhost:3000/medications/${medicationId}/reviews/${reviewId}`,
        review
      )
      .pipe(map((response) => response.data));
  }
}
