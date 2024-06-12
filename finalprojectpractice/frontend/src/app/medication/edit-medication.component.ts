import { Component, inject, OnInit } from '@angular/core';
import { MedicationService } from './medication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedicationFormComponent } from './medication-form.component';
import { Medication } from '../data.interfaces';

@Component({
  selector: 'app-edit-medication',
  template: `
    <app-medication-form
      [medication]="medication"
      (store)="onStore($event)"
    ></app-medication-form>
  `,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MedicationFormComponent],
})
export class EditMedicationComponent {
  medication?: Medication;
  #route = inject(ActivatedRoute);
  medicationId = this.#route.snapshot.paramMap.get('id');

  #medicationService = inject(MedicationService);
  #router = inject(Router);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    sideEffects: ['', Validators.required],
  });

  ngOnInit() {
    if (this.medicationId) {
      this.#medicationService.getMedication(this.medicationId).subscribe({
        next: (medication) => {
          this.medication = medication;
          this.form.patchValue(medication);
        },
        error: (err) => {
          console.error('Error fetching medication:', err);
        },
      });
    }
  }

  onStore(formData: FormData) {
    if (this.medicationId) {
      this.#medicationService
        .updateMedication(this.medicationId, formData)
        .subscribe({
          next: () =>
            this.#router.navigate(['', 'medications', this.medicationId]),
          error: (err) => console.error('Error updating medication:', err),
        });
    }
  }
}
