import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AuthPageComponent } from './layouts/auth-page/auth-page.component';
import { MainPageComponent } from './layouts/main-page/main-page.component';
import { LoginComponent } from './components/auth-page/login/login.component';
import { TableComponent } from './components/global/table/table.component';
import { HomePageComponent } from './layouts/main-page/home-page/home-page.component';
import { AdvocatePageComponent } from './layouts/main-page/advocate-page/advocate-page.component';
import { ClientsPageComponent } from './layouts/main-page/lawyer-page/clients-page/clients-page.component';
import { SubscribersPageComponent } from './layouts/main-page/lawyer-page/subscribers-page/subscribers-page.component';
import { ClientsCardPageComponent } from './layouts/main-page/lawyer-page/clients-page/clients-card-page/clients-card-page.component';
import { SubscribersCardPageComponent } from './layouts/main-page/lawyer-page/subscribers-page/subscribers-card-page/subscribers-card-page.component';
import { AdvocateCategoriesComponent } from './layouts/main-page/advocate-page/advocate-categories/advocate-categories.component';
import { AdvocateCardComponent } from './layouts/main-page/advocate-page/advocate-card/advocate-card.component';
import { AdvocateCaseCardComponent } from './layouts/main-page/advocate-page/advocate-case-card/advocate-case-card.component';
import { TableCardComponent } from './components/global/table-card/table-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    MainPageComponent,
    LoginComponent,
    TableComponent,
    HomePageComponent,
    AdvocatePageComponent,
    ClientsPageComponent,
    SubscribersPageComponent,
    ClientsCardPageComponent,
    SubscribersCardPageComponent,
    AdvocateCategoriesComponent,
    AdvocateCardComponent,
    AdvocateCaseCardComponent,
    TableCardComponent
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
