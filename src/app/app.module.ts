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
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EditFormPaymentComponent } from './components/global/edit-form-payment/edit-form-payment.component';
import { EditUserPageComponent } from './layouts/edit-page/edit-user-page/edit-user-page.component';
import { UsersPageComponent } from './layouts/main-page/users-page/users-page.component';
import { UsersCardPageComponent } from './layouts/main-page/users-page/users-card-page/users-card-page.component';
import { RolenamePipe } from './pipes/rolename/rolename.pipe';
import { PaginationComponent } from './components/global/pagination/pagination.component';
import { FilterComponent } from './components/global/filter/filter.component';
import { ClientWorkCardComponent } from './layouts/main-page/lawyer-page/clients-page/client-work-card/client-work-card.component';
import { ClientWorksListComponent } from './layouts/main-page/lawyer-page/clients-page/client-works-list/client-works-list.component';
import { SubscriberWorkCardComponent } from './layouts/main-page/lawyer-page/subscribers-page/subscriber-work-card/subscriber-work-card.component';
import { SubscriberWorksListComponent } from './layouts/main-page/lawyer-page/subscribers-page/subscriber-works-list/subscriber-works-list.component';
import { AdvocateWorksListComponent } from './layouts/main-page/advocate-page/advocate-works-list/advocate-works-list.component';
import { AdvocateWorksCardComponent } from './layouts/main-page/advocate-page/advocate-works-card/advocate-works-card.component';
import { EditFormPasswordResetComponent } from './components/global/edit-form-password-reset/edit-form-password-reset.component';
import { EditFormFilesComponent } from './components/global/edit-form-files/edit-form-files.component';
import { TableCardFilesComponent } from './components/global/table-card-files/table-card-files.component';
import { AdvocateClientsComponent } from './layouts/main-page/advocate-page/advocate-clients/advocate-clients.component';
import { EditAdvocateClientComponent } from './layouts/edit-page/edit-advocate-client/edit-advocate-client.component';
import { AdvocateClientCardComponent } from './layouts/main-page/advocate-page/advocate-clients/advocate-client-card/advocate-client-card.component';
import { EditLawyerAdvcaseComponent } from './layouts/edit-page/edit-lawyer-advcase/edit-lawyer-advcase.component';
import { AdvocateSubcategoriesComponent } from './layouts/main-page/advocate-page/advocate-subcategories/advocate-subcategories.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ClientsArchiveComponent } from './layouts/archive/clients-archive/clients-archive.component';
import { SubscribersArchiveComponent } from './layouts/archive/subscribers-archive/subscribers-archive.component';
import { AdvocateCasesArchiveComponent } from './layouts/archive/advocate-cases-archive/advocate-cases-archive.component';
import { SearchFormComponent } from './components/global/search-form/search-form.component';
import { SubscribersCalculationsComponent } from './layouts/main-page/calculations/subscribers/subscribers-calculations/subscribers-calculations.component';
import { BreadcrumbsComponent } from './components/global/breadcrumbs/breadcrumbs.component';

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
    StatusworkPipe,
    EditFormPaymentComponent,
    EditUserPageComponent,
    UsersPageComponent,
    UsersCardPageComponent,
    RolenamePipe,
    PaginationComponent,
    FilterComponent,
    ClientWorkCardComponent,
    ClientWorksListComponent,
    SubscriberWorkCardComponent,
    SubscriberWorksListComponent,
    AdvocateWorksListComponent,
    AdvocateWorksCardComponent,
    EditFormPasswordResetComponent,
    EditFormFilesComponent,
    TableCardFilesComponent,
    AdvocateClientsComponent,
    EditAdvocateClientComponent,
    AdvocateClientCardComponent,
    EditLawyerAdvcaseComponent,
    AdvocateSubcategoriesComponent,
    ClientsArchiveComponent,
    SubscribersArchiveComponent,
    AdvocateCasesArchiveComponent,
    SearchFormComponent,
    SubscribersCalculationsComponent,
    BreadcrumbsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SelectDropDownModule
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
