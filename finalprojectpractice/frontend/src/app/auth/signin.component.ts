import { Component, inject } from '@angular/core';
import { AuthService, JWT, Response } from './auth.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-signin',
  template: `
    <div
      class="max-w-[400px] mx-auto p-5 border border-gray-300 rounded-md shadow-lg"
    >
      <form [formGroup]="form" (ngSubmit)="go()" class="space-y-3">
        <input
          type="email"
          placeholder="Email"
          formControlName="email"
          class="p-3 rounded-md border border-gray-300 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          formControlName="password"
          class="p-3 rounded-md border border-gray-300 w-full"
        />
        <button
          type="submit"
          class="p-3 rounded-md bg-blue-500 hover:bg-blue-700 text-white block w-full"
        >
          Sign In
        </button>
      </form>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ToastrModule],
})
export class SigninComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private notification = inject(ToastrService);
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  go() {
    if (this.form.valid) {
      this.auth
        .signin(this.form.value as { email: string; password: string })
        .subscribe({
          next: (response: Response) => {
            if (response.success) {
              const decoded = jwtDecode(response.data) as JWT;
              const state = {
                ...decoded,
                jwt: response.data,
              };
              this.auth.auth_signal.set(state);
              localStorage.setItem('token', JSON.stringify(state));
              this.notification.success('User logged in successfully!');
              this.router.navigate(['', 'medications']);
            } else {
              this.notification.error('Signin failed.');
            }
          },
          error: (error: any) => {
            console.error('Error during signin:', error);
            this.notification.error('An error occurred during signin.');
          },
        });
    }
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['', 'medications']);
    }
  }
}
