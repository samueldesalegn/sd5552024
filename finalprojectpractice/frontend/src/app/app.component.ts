import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <div class="max-w-7xl mx-auto space-y-10 py-20">
      <div class="flex justify-end gap-10">
        <a class="text-blue-500 font-semibold p-2" [routerLink]="['']"
          >Medications</a
        >
        <div
          class="flex items-center space-x-3 text-blue-500 font-semibold"
          *ngIf="!authService.auth_signal().jwt; else signoutTemplate"
        >
          <button (click)="signup()">Register</button>
          <button
            (click)="signin()"
            class="border border-gray-400 rounded-md px-5 py-2"
          >
            Sign in
          </button>
        </div>
        <ng-template #signoutTemplate>
          <div class="flex space-x-3 items-center text-sm">
            <button
              class="text-blue-500 font-semibold"
              (click)="createMedication()"
            >
              Create Medication
            </button>
            <p>{{ authService.auth_signal().fullname }}</p>
            <button (click)="signout()" class="text-red-500 font-semibold">
              Sign Out
            </button>
          </div>
        </ng-template>
      </div>

      <div>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      .max-w-7xl {
        max-width: 1280px;
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
      }
      .space-y-10 > :not([hidden]) ~ :not([hidden]) {
        --tw-space-y-reverse: 0;
        margin-top: calc(2.5rem * calc(1 - var(--tw-space-y-reverse)));
        margin-bottom: calc(2.5rem * var(--tw-space-y-reverse));
      }
      .py-20 {
        padding-top: 5rem;
        padding-bottom: 5rem;
      }
      .text-blue-500 {
        --tw-text-opacity: 1;
        color: rgba(59, 130, 246, var(--tw-text-opacity));
      }
      .font-semibold {
        font-weight: 600;
      }
      .border {
        border-width: 1px;
      }
      .border-gray-400 {
        --tw-border-opacity: 1;
        border-color: rgba(156, 163, 175, var(--tw-border-opacity));
      }
      .rounded-md {
        border-radius: 0.375rem;
      }
      .px-5 {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
      }
      .py-2 {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
      .text-red-500 {
        --tw-text-opacity: 1;
        color: rgba(239, 68, 68, var(--tw-text-opacity));
      }
      .text-sm {
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
      .flex {
        display: flex;
      }
      .items-center {
        align-items: center;
      }
      .space-x-3 > :not([hidden]) ~ :not([hidden]) {
        --tw-space-x-reverse: 0;
        margin-right: calc(0.75rem * var(--tw-space-x-reverse));
        margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
      }
      .justify-end {
        justify-content: flex-end;
      }
      .gap-10 {
        gap: 2.5rem;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
})
export class AppComponent {
  authService = inject(AuthService);
  #router = inject(Router);

  signup() {
    this.#router.navigate(['', 'signup']);
  }

  signin() {
    this.#router.navigate(['', 'signin']);
  }

  signout() {
    this.authService.auth_signal.set({
      _id: '',
      fullname: '',
      email: '',
      jwt: '',
    });

    localStorage.clear();
    this.#router.navigate(['', 'signin']);
  }

  createMedication() {
    this.#router.navigate(['', 'medications', 'create']);
  }
}
