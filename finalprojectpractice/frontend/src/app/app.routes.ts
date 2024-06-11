import { Routes } from '@angular/router';
import { MedicationListComponent } from './medication/medication.component';
import { ViewMedicationComponent } from './medication/view-medication.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';

export const routes: Routes = [
  { path: '', component: MedicationListComponent },
  { path: 'medications', component: MedicationListComponent },
  { path: 'medications/:id', component: ViewMedicationComponent },
  {
    path: 'medications/create',
    loadComponent: () =>
      import('./medication/create-medication.component').then(
        (m) => m.CreateMedicationComponent
      ),
  },
  {
    path: 'medications/:id/review',
    loadComponent: () =>
      import('./review/create-review.component').then(
        (m) => m.CreateReviewComponent
      ),
  },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
