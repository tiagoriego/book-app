import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserPassword } from '../interfaces';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string;

  constructor(
    private loginService: LoginService,
    private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getMe(): Observable<User> {
    return this.loginService.getUser();
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/`, user)
  }

  updatePassword(user: UserPassword): Observable<Object> {
    return this.http.patch(`${this.apiUrl}/users/password`, user);
  }

}
