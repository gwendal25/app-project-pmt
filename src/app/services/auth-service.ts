import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserDto } from '../interfaces/user/userDto';
import { User } from '../interfaces/user/user';
import { UserLoginDto } from '../interfaces/user/userLoginDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint = 'http://localhost:8081/api/users';
  private httpClient:HttpClient = inject(HttpClient);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }

  /**
   * Envoie une requête pour créer un nouvel utilisateur
   * @param {UserDto} userDto Un objet contenant les informations de l'utilisateur à créer (nom, email, mot de passe)
   * @returns {Observable<User>} Les informations de l'utilisateur qui vient d'être crée
   */
  createUser(userDto: UserDto): Observable<User> {
    return this.httpClient.post<User>(this.endpoint, JSON.stringify(userDto), this.httpOptions);
  }

  /**
   * Envoie une requête pour se connecter au serveur 
   * @param {UserLoginDto} userLoginDto Un objet contenant les informations de connection (email, mot de passe)
   * @returns Les informations de l'utilisateur
   */
  login(userLoginDto: UserLoginDto) {
    return this.httpClient.post<User>(this.endpoint + "/login", JSON.stringify(userLoginDto), this.httpOptions);
  }

  /**
   * Efface les données de connection de l'utilisateur du stockage local (faux token, id, email, nom)
   */
  logout() {
    localStorage.removeItem('fake-token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
  }

  /**
   * Permet de vérifier si le stockage local contient le token de connection
   * @returns `true` si l'utilisateur est connecté, `false` sinon
   */
  isLoggedIn() {
    return !!localStorage.getItem('fake-token');
  }

  /**
   * Internal error handler
   * @param {any} error the error returned by the function that called this handler
   * @returns An exception with the error message of the error
   */
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
