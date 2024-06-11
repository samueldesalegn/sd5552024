import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  OnChanges,
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReviewService } from './review.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Review } from '../data.interfaces';

@Component({
  selector: 'app-create-review',
  template: `
    <div class="review-form">
      <form [formGroup]="form" (ngSubmit)="create()">
        <textarea
          formControlName="review"
          placeholder="Write your review"
          rows="5"
        ></textarea>
        <div class="rating">
          <label *ngFor="let star of [1, 2, 3, 4, 5]" (click)="setRating(star)">
            <input type="radio" [value]="star" [checked]="rating >= star" />
            <span>{{ star }}</span>
          </label>
        </div>
        <button type="submit">
          {{ review?._id ? 'Update' : 'Create' }} Review
        </button>
      </form>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styles: [
    `
      .review-form {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .rating {
        display: flex;
        gap: 5px;
        margin: 10px 0;
      }
      .rating label {
        cursor: pointer;
      }
    `,
  ],
})
export class CreateReviewComponent implements OnChanges {
  @Input() review?: Review;
  @Output() onCreate = new EventEmitter<Review>();
  @Output() onUpdate = new EventEmitter<void>();

  #activatedRoute = inject(ActivatedRoute);
  #reviewService = inject(ReviewService);
  form = inject(FormBuilder).nonNullable.group({
    review: ['', Validators.required],
    rating: [0, Validators.min(1)],
  });

  ngOnChanges() {
    if (this.review) {
      this.form.setValue({
        review: this.review.review,
        rating: this.review.rating,
      });
    } else {
      this.form.reset({
        review: '',
        rating: 0,
      });
    }
  }

  setRating(rating: number) {
    this.form.patchValue({ rating });
  }

  get rating() {
    return this.form.get('rating')?.value || 0;
  }

  create() {
    if (this.form.invalid) {
      alert('Please fill in all fields');
      return;
    }
    const medicationId = this.#activatedRoute.snapshot.params['id'];
    if (this.review?._id) {
      this.#reviewService
        .updateReview(medicationId, this.review._id, this.form.value as Review)
        .subscribe(() => {
          this.onUpdate.emit();
          this.form.reset();
          this.review = undefined;
        });
    } else {
      this.#reviewService
        .createReview(medicationId, this.form.value as Review)
        .subscribe((data) => {
          this.onCreate.emit(data);
          this.form.reset();
        });
    }
  }
}
