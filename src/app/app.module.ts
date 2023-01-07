import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './login/login.component';
import { LoaderModule } from './loader/loader.module';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditBookComponent } from './edit-book/edit-book.component';
import { NewBookComponent } from './new-book/new-book.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookComponent,
    HeaderComponent,
    FooterComponent,
    EditBookComponent,
    NewBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
