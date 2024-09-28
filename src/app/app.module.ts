import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AuthPageComponent } from './layouts/auth-page/auth-page.component';
import { MainPageComponent } from './layouts/main-page/main-page.component';
import { LoginComponent } from './components/auth-page/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    MainPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
