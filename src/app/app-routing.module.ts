import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { LinkComponent } from './link/link.component';
import { LoginComponent } from './login/login.component';
import { NewBookComponent } from './new-book/new-book.component';
import { UserPwdComponent } from './user-pwd/user-pwd.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'book', component: BookComponent },
  { path: 'book/:id', component: EditBookComponent },
  { path: 'book/link/:id', component: LinkComponent },
  { path: 'new/book', component: NewBookComponent },
  { path: 'user', component: UserComponent},
  { path: 'user/pwd', component: UserPwdComponent},
  { path: '', redirectTo: '/book', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
