import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginForm } from './login-form';
import { AuthService } from '../services/auth-service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginForm],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    spyOn(component, 'login');
    component.userForm.setValue({ email: '', password: '' });
    component.submitUser();
    expect(component.login).not.toHaveBeenCalled();
  });

  it('should call login with valid form', () => {
    const userDto = { email: 'test@example.com', password: 'pass' };
    authServiceSpy.login.and.returnValue(of({ id: 1, email: 'test@example.com', name: 'Test' }));
    component.userForm.setValue(userDto);
    component.submitUser();
    expect(authServiceSpy.login).toHaveBeenCalledWith(userDto);
  });

  it('should handle login error', () => {
    const userDto = { email: 'test@example.com', password: 'pass' };
    authServiceSpy.login.and.returnValue(throwError(() => new Error('fail')));
    component.userForm.setValue(userDto);
    component.submitUser();
    expect(component.isLoading).toBeFalse();
  });
});
