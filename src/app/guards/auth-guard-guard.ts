import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Injectable()
export class authGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isLoggedIn = this.authService.isLoggedIn();
    if(!isLoggedIn) {
      this.router.navigate(['/login-form']);
  }
  return isLoggedIn;
  }
};

@Injectable()
export class notAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean {
    let isLoggedIn = this.authService.isLoggedIn();
    if(isLoggedIn) {
      this.router.navigate(['/']);
    }
    return !isLoggedIn;
  }
};