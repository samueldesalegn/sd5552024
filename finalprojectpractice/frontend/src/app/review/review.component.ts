// review.component.ts
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Review } from '../data.interfaces';
import { ReviewService } from './review.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review',
  template: `
    <div class="space-y-2 mb-5 border-b pb-5 border-gray-100">
      <p class="leading-relaxed">{{ review?.review }}</p>
      <p class="text-sm">
        By
        <span class="text-neutral-800 font-semibold tracking-wide">{{
          review?.by?.fullname
        }}</span>
      </p>
      <div class="flex justify-between items-center space-x-10">
        <div class="flex gap-3 text-gray-400">
          <svg
            *ngFor="let _ of [].constructor(review?.rating)"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-star-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
          <svg
            *ngFor="let _ of [].constructor(5 - (review?.rating || 0))"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-star"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
            />
          </svg>
        </div>
        <div class="flex items-center space-x-5" *ngIf="canEditReview">
          <button
            class="font-semibold text-sm text-blue-500"
            (click)="editReview(review)"
          >
            Edit
          </button>
          <button
            class="font-semibold text-sm text-red-500"
            (click)="deleteReview()"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [ReviewService],
})
export class ReviewComponent {
  @Input() review?: Review;
  @Output() onEdit = new EventEmitter<Review>();
  @Output() onDelete = new EventEmitter<string>();

  #router = inject(Router);
  #authService = inject(AuthService);
  #reviewService = inject(ReviewService);
  #activatedRoute = inject(ActivatedRoute);

  editReview(review?: Review) {
    this.onEdit.emit(review);
    const medicationId = this.#activatedRoute.snapshot.params['id'];
    this.#router.navigate(['', 'medications', medicationId], {
      fragment: 'create-review-form',
    });
  }

  deleteReview() {
    if (confirm('Are you sure you want to delete the review?')) {
      const medicationId = this.#activatedRoute.snapshot.params['id'];
      this.#reviewService
        .deleteReview(medicationId, this.review?._id || '')
        .subscribe(() => {
          this.onDelete.emit(this.review?._id || '');
        });
    }
  }

  get canEditReview() {
    return this.#authService.auth_signal()._id === this.review?.by?.user_id;
  }
}
