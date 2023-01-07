import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'custom-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser() {
    const userToken = this.loginService.getAuthToken();
    if (userToken) {
      this.loginService.getUser().subscribe({
        next: (result) => {
          this.user = result;
        },
        error: () => {
          this.onSignOut();
        }
      });
    } else {
      this.onSignOut();
    }
  }

  onSignOut() {
    this.loginService.logout();
    this.router.navigate(['/login'])
  }
}
