import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserPassword } from '../interfaces';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-user-pwd',
  templateUrl: './user-pwd.component.html',
  styleUrls: ['./user-pwd.component.scss']
})
export class UserPwdComponent {
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

  private getFormUser() {
    return new FormGroup({
      oldPassword: new FormControl('', [Validators.minLength(6), Validators.required]),
      newPassword: new FormControl('', [Validators.minLength(6), Validators.required])
    });
  }

  get oldPassword() {
    return this.formUser.get('oldPassword');
  }

  get newPassword() {
    return this.formUser.get('newPassword');
  }

  public onSaveUser() {

    this.error = '';
    this.success = '';

    if (this.oldPassword?.invalid || this.newPassword?.invalid)
      return;

    const user = {
      old_password: this.oldPassword?.value,
      new_password: this.newPassword?.value
    } as UserPassword;

    this.userService
      .updatePassword(user)
      .subscribe({
        next: () => {
          this.success = 'Password successfully updated.'
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
    this.router.navigate(['/user'])
  }
}
