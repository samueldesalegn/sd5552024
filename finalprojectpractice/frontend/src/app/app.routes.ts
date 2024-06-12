import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { medicationRoutes } from './medication/medication.routes';
import { reviewRoutes } from './review/review.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'medications', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  ...medicationRoutes,
  ...reviewRoutes,
  { path: '**', redirectTo: 'medications' },
];
