import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export type User = {
  _id: string;
  fullname: string;
  email: string;
  password: string;
};

export type JWT = {
  _id: string;
  fullname: string;
  email: string;
};

export type Response = {
  success: boolean;
  data: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth_signal = signal({ _id: '', fullname: '', email: '', jwt: '' });
  #http = inject(HttpClient);

  constructor() {
    const state = localStorage.getItem('token');
    if (state) {
      this.auth_signal.set(JSON.parse(state));
    }
  }

  isLoggedIn(): boolean {
    return !!this.auth_signal().jwt;
  }

  signup(user: User): Observable<Response> {
    return this.#http
      .post<Response>('http://localhost:3000/users/signup', user)
      .pipe(
        tap((response: Response) => {
          if (response.success) {
            this.setAuthState(response.data);
          }
        }),
        catchError(this.handleError)
      );
  }

  signin(user: { email: string; password: string }): Observable<Response> {
    return this.#http
      .post<Response>('http://localhost:3000/users/signin', user)
      .pipe(
        tap((response: Response) => {
          if (response.success) {
            this.setAuthState(response.data);
          }
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.auth_signal.set({ _id: '', fullname: '', email: '', jwt: '' });
    localStorage.removeItem('token');
  }

  private setAuthState(token: string): void {
    const decodedToken = this.decodeToken(token);
    if (decodedToken) {
      this.auth_signal.set({ ...decodedToken, jwt: token });
      localStorage.setItem('token', JSON.stringify(this.auth_signal()));
    } else {
      console.error('Failed to decode token');
    }
  }

  private decodeToken(token: string): JWT | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        _id: payload._id,
        fullname: payload.fullname,
        email: payload.email,
      };
    } catch (e) {
      console.error('Invalid token format', e);
      return null;
    }
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    throw error; // Rethrow it back to the caller
  }
}
