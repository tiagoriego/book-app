import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../user/user.service';

import { UserPwdComponent } from './user-pwd.component';

describe('UserPwdComponent', () => {
  let component: UserPwdComponent;
  let fixture: ComponentFixture<UserPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserPwdComponent,
        HeaderComponent,
        FooterComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule
      ],
      providers: [
        UserService,
        HttpClient,
        HttpHandler
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
