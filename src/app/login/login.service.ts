import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token, User } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string;
  private keyUserToken: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.keyUserToken = 'user_token'
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  authLogin(username: string, password: string) {
    const url = `${this.apiUrl}/login`;
    const body = {
      username: username,
      password: password
    }
    return this.http.post(url, body, this.getHttpOptions())
  }

  getUser(): Observable<User> {
    const url = `${this.apiUrl}/users/me`;
    return this.http.get<User>(url);
  }

  getAuthToken(): Token | null {
    const userToken = localStorage.getItem(this.keyUserToken);
    let resultUserToken: Token | null = null
    if (userToken) {
      try {
        resultUserToken = JSON.parse(userToken);
      } catch (e) {
        resultUserToken = null;
      }
    }
    return resultUserToken;
  }

  setAuthToken(token: Token) {
    localStorage.setItem(this.keyUserToken, JSON.stringify(token));
  }

  logout() {
    localStorage.clear();
  }
}
