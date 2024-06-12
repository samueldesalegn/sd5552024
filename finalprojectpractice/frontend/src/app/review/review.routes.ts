import { Routes } from '@angular/router';
import { CreateReviewComponent } from './create-review.component';
import { ReviewComponent } from './review.component';

export const reviewRoutes: Routes = [
  { path: 'reviews/create', component: CreateReviewComponent },
  { path: 'reviews/:id', component: ReviewComponent },
];
