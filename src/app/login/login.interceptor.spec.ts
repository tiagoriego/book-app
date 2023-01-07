import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LoginInterceptor } from './login.interceptor';
import { LoginService } from './login.service';

describe('LoginInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoginInterceptor,
      LoginService,
      HttpClient,
      HttpHandler
    ]
  }));

  it('should be created', () => {
    const interceptor: LoginInterceptor = TestBed.inject(LoginInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
