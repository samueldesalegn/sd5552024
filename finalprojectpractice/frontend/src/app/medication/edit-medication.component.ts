import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  inject,
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Medication } from '../data.interfaces';

@Component({
  selector: 'app-medication-form',
  template: `
    <div>
      <form
        [formGroup]="form"
        class="space-y-5 max-w-xl mx-auto"
        (ngSubmit)="submit()"
      >
        <h3 class="text-xl font-bold">Create Medication</h3>
        <input
          type="text"
          placeholder="Medication Name"
          formControlName="name"
          class="w-full bg-gray-50 border border-gray-200 focus:border-gray-200 focus:ring-0 focus:outline-none p-3 rounded-md"
        />
        <input
          type="text"
          placeholder="Medication Generic Name"
          formControlName="generic_name"
          class="w-full bg-gray-50 border border-gray-200 focus:border-gray-200 focus:ring-0 focus:outline-none p-3 rounded-md"
        />
        <input
          type="text"
          placeholder="Medication Class"
          formControlName="medication_class"
          class="w-full bg-gray-50 border border-gray-200 focus:border-gray-200 focus:ring-0 focus:outline-none p-3 rounded-md"
        />

        <div class="space-y-3">
          <p class="font-semibold">Availability</p>
          <div
            class="w-full bg-gray-50 border border-gray-200 focus:border-gray-200 focus:ring-0 focus:outline-none p-3 rounded-md flex items-center space-x-10"
          >
            <label class="flex items-center space-x-3">
              <span>Prescription</span>
              <input
                type="radio"
                formControlName="availability"
                value="Prescription"
                class="w-4 h-4 rounded"
              />
            </label>
            <label class="flex items-center space-x-3">
              <span>OTC</span>
              <input
                type="radio"
                formControlName="availability"
                value="OTC"
                class="w-4 h-4 rounded"
              />
            </label>
          </div>
        </div>

        <div class="space-y-2">
          <label for="image" class="font-semibold">Image</label>
          <input
            type="file"
            (change)="onFileSelect($event)"
            id="image"
            accept="image/*"
            class="w-full bg-gray-50 border border-gray-200 focus:border-gray-200 focus:ring-0 focus:outline-none p-3 rounded-md"
          />
        </div>

        <button
          type="submit"
          [disabled]="form.invalid"
          class="bg-blue-500 text-white py-3 px-10 w-full rounded-md disabled:opacity-50"
        >
          Create
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
export class MedicationFormComponent implements OnChanges {
  image!: File;
  @Input() medication?: Medication;
  @Output() store = new EventEmitter<FormData>();

  private fb = inject(FormBuilder);
  form = this.fb.group({
    name: ['', Validators.required],
    generic_name: ['', Validators.required],
    medication_class: ['', Validators.required],
    availability: ['Prescription', Validators.required],
  });

  ngOnChanges() {
    if (this.medication) {
      this.form.patchValue(this.medication);
    }
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.image = file;
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value as string);
    formData.append(
      'generic_name',
      this.form.get('generic_name')?.value as string
    );
    formData.append(
      'medication_class',
      this.form.get('medication_class')?.value as string
    );
    formData.append(
      'availability',
      this.form.get('availability')?.value as string
    );
    if (this.image) {
      formData.append('medication_image', this.image);
    }

    this.store.emit(formData);
    // Optionally reset the form if needed
    // this.form.reset();
  }
}
