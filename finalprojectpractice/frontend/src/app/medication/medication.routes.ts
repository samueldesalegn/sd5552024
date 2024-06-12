import { Routes } from '@angular/router';
import { MedicationListComponent } from './medication.component';
import { ViewMedicationComponent } from './view-medication.component';
import { EditMedicationComponent } from './edit-medication.component';
import { CreateMedicationComponent } from './create-medication.component';

export const medicationRoutes: Routes = [
  { path: '', component: MedicationListComponent },
  { path: 'medications', component: MedicationListComponent },
  { path: 'medications/create', component: CreateMedicationComponent },
  { path: 'medications/:id', component: ViewMedicationComponent },
  { path: 'medications/:id/edit', component: EditMedicationComponent },
];
