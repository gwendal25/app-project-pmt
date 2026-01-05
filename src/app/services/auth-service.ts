import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { UserDto } from '../interfaces/user/userDto';
import { User } from '../interfaces/user/user';
import { UserLoginDto } from '../interfaces/user/userLoginDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint = 'http://localhost:8081/users';
  private httpClient:HttpClient = inject(HttpClient);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }

  createUser(userDto: UserDto) {
    return this.httpClient.post<User>(this.endpoint, JSON.stringify(userDto), this.httpOptions);
  }

  login(userLoginDto: UserLoginDto) {
    return this.httpClient.post<User>(this.endpoint + "/login", JSON.stringify(userLoginDto), this.httpOptions);
  }

  logout() {
    localStorage.removeItem('fake-token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
  }

  isLoggedIn() {
    return !!localStorage.getItem('fake-token');
  }

  handleError(error:any) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
