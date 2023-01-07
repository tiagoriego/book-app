import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.loginService.getAuthToken();
    if (authToken && authToken.access_token !== '') {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken.access_token}`)
      });
      return next.handle(authReq);
    } else {
      return next.handle(request);
    }
  }
}
