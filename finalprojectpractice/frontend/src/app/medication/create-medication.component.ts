import { Component, inject } from '@angular/core';
import { MedicationService } from './medication.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedicationFormComponent } from './medication-form.component';

@Component({
  selector: 'app-create-medication',
  template: `
    <app-medication-form (store)="onStore($event)"></app-medication-form>
  `,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MedicationFormComponent],
})
export class CreateMedicationComponent {
  #medicationService = inject(MedicationService);
  #router = inject(Router);

  onStore(formData: FormData) {
    this.#medicationService.createMedication(formData).subscribe({
      next: (data) => this.#router.navigate(['', 'medications', data._id]),
      error: (err) => console.error('Error creating medication:', err),
    });
  }
}
