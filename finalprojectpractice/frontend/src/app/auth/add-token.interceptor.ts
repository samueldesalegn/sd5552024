import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.auth_signal().jwt;
  if (token) {
    const cloned_request = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(cloned_request);
  } else {
    return next(req);
  }
};
