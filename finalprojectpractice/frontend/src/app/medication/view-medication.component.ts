import { Component, inject, OnInit } from '@angular/core';
import { Medication, Review } from '../data.interfaces';
import { MedicationService } from './medication.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'view-medication',
  template: `
    <div *ngIf="medication" class="medication-details">
      <h2>{{ medication.name }}</h2>
      <p><strong>Generic Name:</strong> {{ medication.generic_name }}</p>
      <p><strong>Class:</strong> {{ medication.medication_class }}</p>
      <p><strong>Availability:</strong> {{ medication.availability }}</p>
      <div *ngIf="medication.image">
        <img
          [src]="imagePath"
          alt="{{ medication.name }}"
          class="medication-image"
        />
      </div>
      <div *ngIf="loggedIn" class="actions">
        <button *ngIf="canEdit" (click)="editMedication()">Edit</button>
        <button *ngIf="canEdit" (click)="deleteMedication()">Delete</button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [
    `
      .medication-details {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .medication-image {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
        margin: 10px 0;
      }
      .actions button {
        margin-right: 10px;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      .actions button:hover {
        background-color: #ddd;
      }
    `,
  ],
})
export class ViewMedicationComponent implements OnInit {
  imageData: any;
  medication?: Medication;
  review?: Review;

  #router = inject(Router);
  #authService = inject(AuthService);
  #activatedRoute = inject(ActivatedRoute);
  #medicationService = inject(MedicationService);

  get medicationId() {
    return this.#activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getMedication();
  }

  getMedication() {
    this.#medicationService.getMedication(this.medicationId).subscribe({
      next: (medication) => {
        this.medication = medication;
      },
      error: (err) => {
        console.error('Error fetching medication:', err);
      },
    });
  }

  get imagePath() {
    return (
      'http://localhost:3000/medications/images/' + this.medication?.image?._id
    );
  }

  get canEdit() {
    return (
      this.#authService.isLoggedIn() &&
      this.#authService.auth_signal()._id === this.medication?.added_by.user_id
    );
  }

  get loggedIn() {
    return this.#authService.isLoggedIn();
  }

  editMedication() {
    this.#router.navigate(['', 'medications', this.medicationId, 'edit']);
  }

  deleteMedication() {
    if (
      this.#authService.auth_signal()._id !== this.medication?.added_by.user_id
    ) {
      alert('You are not authorized to delete this medication');
      return;
    }
    if (confirm('Are you sure you want to delete the medication?')) {
      this.#medicationService
        .deleteMedication(this.medicationId)
        .subscribe(() => {
          this.#router.navigate(['', 'medications']);
        });
    }
  }
}
