import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Medication, Response } from '../data.interfaces';

type MedicationsResponse = Response<Medication[]>;

@Injectable({ providedIn: 'root' })
export class MedicationService {
  #http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/medications';

  getMedications(firstLetter: string) {
    return this.#http
      .get<MedicationsResponse>(`${this.baseUrl}?first_letter=${firstLetter}`)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  getMedication(id: string) {
    return this.#http.get<Response<Medication>>(`${this.baseUrl}/${id}`).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  createMedication(medication: FormData) {
    return this.#http.post<Response<Medication>>(this.baseUrl, medication).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  updateMedication(medicationId: string, medication: FormData) {
    return this.#http
      .put<Response<Medication>>(`${this.baseUrl}/${medicationId}`, medication)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  deleteMedication(medicationId: string) {
    return this.#http
      .delete<Response<Medication>>(`${this.baseUrl}/${medicationId}`)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
