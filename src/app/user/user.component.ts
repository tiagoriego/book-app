import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public success: string;
  public error: string;
  public formUser: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router) {
    this.formUser = this.getFormUser();
    this.error = '';
    this.success = '';
  }

  ngOnInit(): void {
    this.loadUser();
  }

  private getFormUser() {
    return new FormGroup({
      fullName: new FormControl('', [Validators.minLength(3), Validators.required]),
      email: new FormControl('', [
        Validators.minLength(5),
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_\.]+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,4}$")]),
      username: new FormControl({ value: '', disabled: true })
    });
  }

  get fullName() {
    return this.formUser.get('fullName');
  }

  get email() {
    return this.formUser.get('email');
  }

  get username() {
    return this.formUser.get('username');
  }

  private loadUser() {
    this.userService
      .getMe()
      .subscribe({
        next: (user) => {
          this.fillFormUser(user);
        },
        error: (error: HttpErrorResponse) => {
          this.error = error.message;
        }
      });
  }

  private fillFormUser(user: User) {
    this.fullName?.setValue(user.full_name);
    this.email?.setValue(user.email);
    this.username?.setValue(user.username);
  }

  public onSaveUser() {

    let isValid: boolean = true;
    this.error = '';
    this.success = '';

    const user = {
      full_name: this.fullName?.value,
      email: this.email?.value
    } as User;

    const fields = Object.keys(user);
    for (let field of fields) {
      if (this.formUser.get(field)?.invalid) {
        isValid = false;
        break;
      }
    }

    if (!isValid)
      return;

    this.userService
      .updateUser(user)
      .subscribe({
        next: (result) => {
          this.success = 'User successfully updated.'
          this.fillFormUser(result);
        },
        error: (error: HttpErrorResponse) => {
          switch (error.status) {
            case 400:
              if (error.error) {
                if (Object.keys(error.error).indexOf('detail') !== -1) {
                  this.error = error.error['detail'];
                }
              }
              break;              
            default:
              this.error = error.message;
          }
        }
      })
  }

  public onCancel() {
    this.router.navigate(['/book'])
  }
}
