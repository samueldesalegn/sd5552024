import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicationService } from './medication.service';
import { Medication } from '../data.interfaces';
import { range } from 'lodash';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'medication-list',
  template: `
    <div class="container">
      <div class="letters">
        <button
          *ngFor="let letter of letters"
          (click)="changeFirstLetter(letter)"
        >
          {{ letter }}
        </button>
      </div>
      <div class="medications">
        <div *ngFor="let medication of medications" class="medication">
          <h4>
            <a [routerLink]="['/medications', medication._id]">{{
              medication.name
            }}</a>
          </h4>
          <p>{{ medication.generic_name }}</p>
          <p>{{ medication.medication_class }}</p>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [
    `
      .container {
        padding: 1rem;
      }
      .letters {
        margin-bottom: 1rem;
      }
      .letters button {
        margin: 0 0.2rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
      }
      .medications {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
      }
      .medication {
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
      }
    `,
  ],
})
export class MedicationListComponent {
  #medicationService = inject(MedicationService);
  letters = range(1, 27).map((i) => String.fromCharCode(64 + i));
  medications: Medication[] = [];
  firstLetter = 'A';

  ngOnInit() {
    this.getMedications();
  }

  getMedications() {
    this.#medicationService
      .getMedications(this.firstLetter)
      .subscribe((medications) => {
        this.medications = medications;
      });
  }

  changeFirstLetter(letter: string) {
    this.firstLetter = letter;
    this.getMedications();
  }
}
