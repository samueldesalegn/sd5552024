import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService, User } from './auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  template: `
    <div class="container">
      <form [formGroup]="form" (ngSubmit)="go()">
        <input
          type="text"
          placeholder="Full Name"
          formControlName="fullname"
          autocomplete="name"
        />
        <input
          type="email"
          placeholder="Email"
          formControlName="email"
          autocomplete="email"
        />
        <input
          type="password"
          placeholder="Password"
          formControlName="password"
          autocomplete="new-password"
        />
        <button type="submit" [disabled]="form.invalid">Sign Up</button>
      </form>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 400px;
        margin: 20px auto;
      }

      form {
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }

      input {
        width: 100%;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      button {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      button:hover {
        background-color: #555;
      }

      button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ToastrModule],
  providers: [AuthService],
})
export class SignupComponent {
  #auth = inject(AuthService);
  #router = inject(Router);
  #notification = inject(ToastrService);
  #fb = inject(FormBuilder);

  form = this.#fb.nonNullable.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  go() {
    if (this.form.valid) {
      this.#auth.signup(this.form.value as User).subscribe({
        next: (response) => {
          this.#notification.success('User registered successfully!');
          this.#router.navigate(['signin']);
        },
        error: (err) => {
          this.#notification.error(
            'User registration failed. Please try again.'
          );
          console.error('Signup error:', err);
        },
      });
    }
  }

  ngOnInit() {
    if (this.#auth.isLoggedIn()) {
      this.#router.navigate(['medications']);
    }
  }
}
