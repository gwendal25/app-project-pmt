
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { authGuard } from './auth-guard-guard';
import { AuthService } from '../services/auth-service';
import { Component } from '@angular/core';
import { RouterTestingHarness } from '@angular/router/testing';

@Component({ template: '<h1>Protected page</h1>'})
class ProtectedComponent {}

@Component({ template: '<h1>Login page</h1>'})
class LoginComponent {}

describe('authGuardGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let harness: RouterTestingHarness;

  async function setup(isLoggedIn: boolean) {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    authServiceSpy.isLoggedIn.and.returnValue(isLoggedIn);
  
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        provideRouter([
          { path: 'project-homepage', component: ProtectedComponent, canActivate: [authGuard]},
          { path: 'login-form', component: LoginComponent },
        ]),
      ],
    });

    harness = await RouterTestingHarness.create();
  }

  it('allows navigation when user is logged in', async() => {
    await setup(true);
    await harness.navigateByUrl('/project-homepage', ProtectedComponent);
    expect(harness.routeNativeElement?.textContent).toContain('Protected page');
  });

  it('redirect to login when user is not authenticated', async() => {
    await setup(false);
    await harness.navigateByUrl('/project-homepage', LoginComponent);
    expect(harness.routeNativeElement?.textContent).toContain('Login page');
  })
});
