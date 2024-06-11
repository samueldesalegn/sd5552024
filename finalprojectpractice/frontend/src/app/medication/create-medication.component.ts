import { Component, inject } from '@angular/core';
import { MedicationService } from './medication.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-medication',
  template: `
    <div class="container">
      <form [formGroup]="form" (ngSubmit)="onStore()" class="space-y-3">
        <input
          type="text"
          placeholder="Medication Name"
          formControlName="name"
          class="p-3 rounded-md border border-gray-300 w-full"
        />
        <textarea
          placeholder="Description"
          formControlName="description"
          class="p-3 rounded-md border border-gray-300 w-full"
        ></textarea>
        <input
          type="text"
          placeholder="Side Effects"
          formControlName="sideEffects"
          class="p-3 rounded-md border border-gray-300 w-full"
        />
        <button
          type="submit"
          class="p-3 rounded-md bg-blue-500 hover:bg-blue-700 text-white block w-full"
        >
          Create Medication
        </button>
      </form>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styles: [
    `
      .container {
        max-width: 400px;
        margin: 0 auto;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class CreateMedicationComponent {
  #medicationService = inject(MedicationService);
  #router = inject(Router);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    sideEffects: ['', Validators.required],
  });

  onStore() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.#medicationService.createMedication(new FormData()).subscribe((data) => {
        this.#router.navigate(['', 'medications', data._id]);
      });
    }
  }
}
