import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SigninForm } from './signin-form';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { of, throwError } from 'rxjs';

describe('SigninForm', () => {
  let component: SigninForm;
  let fixture: ComponentFixture<SigninForm>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['createUser']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ],
      declarations: [SigninForm],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SigninForm);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    spyOn(component, 'createUser');
    component.userForm.setValue({ name: '', email: '', password: '', repeatPassword: '' });
    component.submitUser();
    expect(component.createUser).not.toHaveBeenCalled();
  })

  it('should call signin with valid form', () => {
    const userDto = { name: 'Pulchra', email: 'pulchra@eridumail.com', password: 'FluffyKitty20', repeatPassword: 'FluffyKitty20' };
    authServiceSpy.createUser.and.returnValue(of({ id: 1, name: 'Pulchra', email: 'pulchra@eridumail.com'}));
    component.userForm.setValue(userDto);
    component.submitUser();
    expect(authServiceSpy.createUser).toHaveBeenCalledWith(userDto);
  })

  it('should handle signin error', () => {
    const userDto = { name: 'Pulchra', email: 'pulchra@eridumail.com', password: 'FluffyKitty20', repeatPassword: 'FluffyKitty20' };
    authServiceSpy.createUser.and.returnValue(throwError(() => new Error('fail')));
    component.userForm.setValue(userDto);
    component.submitUser();
    expect(component.isLoading).toBeFalse();
  })
});
