import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLoginDto } from '../interfaces/userLoginDto';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  private router:Router = inject(Router);
  private authService:AuthService = inject(AuthService);

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  isLoading: boolean = false;

  submitUser() {
    if(!this.userForm.valid) {
      return;
    }

    this.isLoading = true;
    const email = this.userForm.value.email ?? '';
    const password = this.userForm.value.password ?? '';
    const userDto:UserLoginDto = {
      email: email,
      password: password
    }; 
    this.login(userDto);
  }

  login(userDto:UserLoginDto) {
    this.authService.login(userDto)
    .subscribe({
      next: (user: User) => {
        localStorage.setItem('fake-token', 'demo-token');
        localStorage.setItem('id', user.id.toString());
        localStorage.setItem('email', user.email);
        localStorage.setItem('name', user.name);
        this.router.navigate(['/']);
      },
      error: () => {
        console.log("Error during login");
        this.isLoading = false;
      }
    })
  }
}
