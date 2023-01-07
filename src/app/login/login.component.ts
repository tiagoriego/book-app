import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginService } from './login.service';
import { Token } from '../interfaces/index'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public error: string;

  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.min(1)]),
    password: new FormControl('', [Validators.required, Validators.min(1)])
  })

  constructor(
    private loginService: LoginService,
    private router: Router) {
    this.error = '';
  }

  ngOnInit(): void {
    this.checkSigIn();
  }

  private checkSigIn() {
    if (this.loginService.getAuthToken()) {
      this.router.navigate(['/book']);
    }
  }

  get username(): any {
    return this.formLogin.get('username');
  }

  get password(): any {
    return this.formLogin.get('password');
  }

  onLogin() {
    if (this.username.invalid && this.password.invalid ||
      this.username.value == '' || this.password.value == '')
      return;

    this.loginService
      .authLogin(this.username.value, this.password.value)
      .subscribe({
        next: (result) => {
          this.error = '';
          this.loginService.setAuthToken(result as Token);
          this.router.navigate(['/book']);
        },
        error: (error: HttpErrorResponse) => {
          switch (error.status) {
            case 0:
              this.error = 'Connection refused.';
              break;
            case 401:
              this.error = 'Incorrect username or password.';
              break;
            default:
              this.error = error.message;
          }
        }
      });
  }
}
