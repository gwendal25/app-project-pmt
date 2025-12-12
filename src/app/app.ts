import { Component, inject, signal } from '@angular/core';
import { AuthService } from './services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App {
  protected readonly titleSignal = signal('app-project-pmt');
  title = "App projet PMT"
  router:Router = inject(Router);
  authService = inject(AuthService);

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login-form']);
  }
}
