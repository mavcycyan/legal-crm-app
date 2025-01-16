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
import { AdvocateCasePageComponent } from './layouts/main-page/advocate-page/advocate-case-page/advocate-case-page.component';
import { InfocardComponent } from './components/global/infocard/infocard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { EditFormComponent } from './components/global/edit-form/edit-form.component';
import { EditClientPageComponent } from './layouts/edit-page/edit-client-page/edit-client-page.component';
import { EditClientWorkPageComponent } from './layouts/edit-page/edit-client-work-page/edit-client-work-page.component';
import { ClientsAllComponent } from './layouts/main-page/lawyer-page/clients-page/clients-all/clients-all.component';
import { EditSubscriberPageComponent } from './layouts/edit-page/edit-subscriber-page/edit-subscriber-page.component';
import { EditSubscriberWorkPageComponent } from './layouts/edit-page/edit-subscriber-work-page/edit-subscriber-work-page.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { EditAdvocatePageComponent } from './layouts/edit-page/edit-advocate-page/edit-advocate-page.component';
import { EditAdvocateCategoryComponent } from './layouts/edit-page/edit-advocate-category/edit-advocate-category.component';
import { EditAdvocateCaseComponent } from './layouts/edit-page/edit-advocate-case/edit-advocate-case.component';
import { EditAdvocateWorkComponent } from './layouts/edit-page/edit-advocate-work/edit-advocate-work.component';
import { StatusworkPipe } from './pipes/statuswork/statuswork.pipe';

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
    TableCardComponent,
    AdvocateCasePageComponent,
    InfocardComponent,
    EditFormComponent,
    EditClientPageComponent,
    EditClientWorkPageComponent,
    ClientsAllComponent,
    EditSubscriberPageComponent,
    EditSubscriberWorkPageComponent,
    EditAdvocatePageComponent,
    EditAdvocateCategoryComponent,
    EditAdvocateCaseComponent,
    EditAdvocateWorkComponent,
    StatusworkPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
