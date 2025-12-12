import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDto } from '../interfaces/userDto';

@Component({
  selector: 'app-signin-form',
  standalone: false,
  templateUrl: './signin-form.html',
  styleUrl: './signin-form.scss',
})
export class SigninForm {
  private router:Router = inject(Router);
  private authService:AuthService = inject(AuthService);

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required])
  });

  isLoading: boolean = false;

  submitUser() {
    if(!this.userForm.valid) {
      return;
    }

    this.isLoading = true;
    const name = this.userForm.value.name ?? '';
    const email = this.userForm.value.email ?? '';
    const password = this.userForm.value.password ?? '';
    const repeatPassword = this.userForm.value.repeatPassword ?? '';
    const userDto:UserDto = {
      name: name,
      email: email,
      password: password,
      repeatPassword: repeatPassword
    }; 
    this.createUser(userDto);
  }

  createUser(userDto:UserDto) {
    this.authService.createUser(userDto)
    .subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        console.log("Error when creating the user");
        this.isLoading = false;
      }
    })
  }
}
