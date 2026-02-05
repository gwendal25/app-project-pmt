import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { AuthService } from './services/auth-service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'login-form',
  template: '<p>Skibidi! bwap! bwap! Component</p>'
})
class MockLoginForm {}

describe('App', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let harness: RouterTestingHarness;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'logout']);
    authServiceSpy.isLoggedIn.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        RouterModule
      ],
      declarations: [App],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        provideRouter([
          { path: '', component : MockLoginForm },
          { path: 'login-form', component : MockLoginForm }
        ])
      ]
    }).compileComponents();

    harness = await RouterTestingHarness.create();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
