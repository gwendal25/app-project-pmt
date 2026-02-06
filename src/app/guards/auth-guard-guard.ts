import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let isLoggedIn = authService.isLoggedIn();
  if(!isLoggedIn) {
    router.navigate(['/login-form']);
  }
  return isLoggedIn;
};

export const notAuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let isLoggedIn = authService.isLoggedIn();
  if(isLoggedIn) {
    router.navigate(['/']);
  }
  return !isLoggedIn;
};
