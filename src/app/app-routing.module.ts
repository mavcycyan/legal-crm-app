import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./layouts/main-page/main-page.component";
import {AuthGuard} from "./guards/auth/auth.guard";
import {AuthPageComponent} from "./layouts/auth-page/auth-page.component";
import {HomePageComponent} from "./layouts/main-page/home-page/home-page.component";
import {PermissionsGuard} from "./guards/permissions/permissions.guard";
import {AdvocatePageComponent} from "./layouts/main-page/advocate-page/advocate-page.component";
import {ClientsPageComponent} from "./layouts/main-page/lawyer-page/clients-page/clients-page.component";
import {SubscribersPageComponent} from "./layouts/main-page/lawyer-page/subscribers-page/subscribers-page.component";
import {
  ClientsCardPageComponent
} from "./layouts/main-page/lawyer-page/clients-page/clients-card-page/clients-card-page.component";
import {
  SubscribersCardPageComponent
} from "./layouts/main-page/lawyer-page/subscribers-page/subscribers-card-page/subscribers-card-page.component";
import {
  AdvocateCategoriesComponent
} from "./layouts/main-page/advocate-page/advocate-categories/advocate-categories.component";
import {
  AdvocateCaseCardComponent
} from "./layouts/main-page/advocate-page/advocate-case-card/advocate-case-card.component";
import {AdvocateCardComponent} from "./layouts/main-page/advocate-page/advocate-card/advocate-card.component";
import {
  AdvocateCasePageComponent
} from "./layouts/main-page/advocate-page/advocate-case-page/advocate-case-page.component";
import {EditClientPageComponent} from "./layouts/edit-page/edit-client-page/edit-client-page.component";
import {EditClientWorkPageComponent} from "./layouts/edit-page/edit-client-work-page/edit-client-work-page.component";
import {ClientsAllComponent} from "./layouts/main-page/lawyer-page/clients-page/clients-all/clients-all.component";
import {EditSubscriberPageComponent} from "./layouts/edit-page/edit-subscriber-page/edit-subscriber-page.component";
import {
  EditSubscriberWorkPageComponent
} from "./layouts/edit-page/edit-subscriber-work-page/edit-subscriber-work-page.component";
import {EditAdvocatePageComponent} from "./layouts/edit-page/edit-advocate-page/edit-advocate-page.component";
import {
  EditAdvocateCategoryComponent
} from "./layouts/edit-page/edit-advocate-category/edit-advocate-category.component";
import {EditAdvocateCaseComponent} from "./layouts/edit-page/edit-advocate-case/edit-advocate-case.component";
import {EditAdvocateWorkComponent} from "./layouts/edit-page/edit-advocate-work/edit-advocate-work.component";
import {EditUserPageComponent} from "./layouts/edit-page/edit-user-page/edit-user-page.component";
import {UsersPageComponent} from "./layouts/main-page/users-page/users-page.component";
import {UsersCardPageComponent} from "./layouts/main-page/users-page/users-card-page/users-card-page.component";
import {
  ClientWorkCardComponent
} from "./layouts/main-page/lawyer-page/clients-page/client-work-card/client-work-card.component";
import {
  ClientWorksListComponent
} from "./layouts/main-page/lawyer-page/clients-page/client-works-list/client-works-list.component";
import {
  SubscriberWorksListComponent
} from "./layouts/main-page/lawyer-page/subscribers-page/subscriber-works-list/subscriber-works-list.component";
import {
  SubscriberWorkCardComponent
} from "./layouts/main-page/lawyer-page/subscribers-page/subscriber-work-card/subscriber-work-card.component";
import {
  AdvocateWorksListComponent
} from "./layouts/main-page/advocate-page/advocate-works-list/advocate-works-list.component";
import {
  AdvocateWorksCardComponent
} from "./layouts/main-page/advocate-page/advocate-works-card/advocate-works-card.component";
import {AdvocateClientsComponent} from "./layouts/main-page/advocate-page/advocate-clients/advocate-clients.component";
import {EditAdvocateClientComponent} from "./layouts/edit-page/edit-advocate-client/edit-advocate-client.component";
import {
  AdvocateClientCardComponent
} from "./layouts/main-page/advocate-page/advocate-clients/advocate-client-card/advocate-client-card.component";
import {EditLawyerAdvcaseComponent} from "./layouts/edit-page/edit-lawyer-advcase/edit-lawyer-advcase.component";
import {ClientsArchiveComponent} from "./layouts/archive/clients-archive/clients-archive.component";
import {SubscribersArchiveComponent} from "./layouts/archive/subscribers-archive/subscribers-archive.component";
import {AdvocateCasesArchiveComponent} from "./layouts/archive/advocate-cases-archive/advocate-cases-archive.component";
import {
  SubscribersCalculationsComponent
} from "./layouts/main-page/calculations/subscribers/subscribers-calculations/subscribers-calculations.component";

const routes: Routes = [
  {
    path: '', component: MainPageComponent, canActivate: [AuthGuard], children: [
      {path: '', component: HomePageComponent, canActivate: [PermissionsGuard]},
      {path: 'lawyer/client_works', component: ClientsPageComponent, canActivate: [PermissionsGuard]},
      {path: 'lawyer/clients', component: ClientsAllComponent, canActivate: [PermissionsGuard]},
      {path: 'lawyer/clients/page/:page', component: ClientsAllComponent, canActivate: [PermissionsGuard]},
      {path: 'lawyer/clients/page', redirectTo: 'lawyer/clients'},
      {path: 'lawyer/clients/:id', component: ClientsCardPageComponent, canActivate: [PermissionsGuard], children: [
          {path: '', component: ClientWorksListComponent},
          {path: ':client_work', component: ClientWorkCardComponent},
      ]},
      {path: 'lawyer/subscribers', component: SubscribersPageComponent, canActivate: [PermissionsGuard]},
      {path: 'lawyer/subscribers/page/:page', component: SubscribersPageComponent, canActivate: [PermissionsGuard]},
      {path: 'lawyer/subscribers/page', redirectTo: 'lawyer/subscribers'},
      {path: 'lawyer/subscribers/:id', component: SubscribersCardPageComponent, canActivate: [PermissionsGuard], children: [
          {path: '', component: SubscriberWorksListComponent},
          {path: ':subscriber_work', component: SubscriberWorkCardComponent},
        ]},
      {path: 'lawyer', redirectTo: 'lawyer/clients'},
      {path: 'advocate', component: AdvocatePageComponent, canActivate: [PermissionsGuard]},
      {path: 'advocate/clients', component: AdvocateClientsComponent, canActivate: [PermissionsGuard]},
      {path: 'advocate/clients/:id', component: AdvocateClientCardComponent, canActivate: [PermissionsGuard]},
      {path: 'advocate/:id', component: AdvocateCardComponent, canActivate: [PermissionsGuard], children: [
        {path: '', component: AdvocateCategoriesComponent},
      ]},
      {path: 'advocate/:id/:category', component: AdvocateCasePageComponent, canActivate: [PermissionsGuard]},
      {path: 'advocate/:id/:category/:case_id', component: AdvocateWorksListComponent, canActivate: [PermissionsGuard]},
      {path: 'advocate/:id/:category/:case_id/:advocate_work', component: AdvocateWorksCardComponent, canActivate: [PermissionsGuard]},
      {path: 'users', component: UsersPageComponent, canActivate: [PermissionsGuard]},
      {path: 'users/:id', component: UsersCardPageComponent, canActivate: [PermissionsGuard]},
      {
        path: 'edit', canActivate: [AuthGuard], children: [
          {path: 'lawyer/clients', component: EditClientPageComponent, canActivate: [PermissionsGuard]},
          {path: 'lawyer/clients/:id', component: EditClientPageComponent, canActivate: [PermissionsGuard]},
          {path: 'lawyer/client_work', component: EditClientWorkPageComponent, canActivate: [PermissionsGuard]},
          {path: 'lawyer/client_work/:id', component: EditClientWorkPageComponent, canActivate: [PermissionsGuard]},
          {path: 'lawyer/subscribers', component: EditSubscriberPageComponent, canActivate: [PermissionsGuard]},
          {path: 'lawyer/subscribers/:id', component: EditSubscriberPageComponent, canActivate: [PermissionsGuard]},
          {path: 'lawyer/subscriber_work', component: EditSubscriberWorkPageComponent, canActivate: [PermissionsGuard]},
          {path: 'lawyer/subscriber_work/:id', component: EditSubscriberWorkPageComponent, canActivate: [PermissionsGuard]},
          {path: 'lawyer/advcase', component: EditLawyerAdvcaseComponent, canActivate: [PermissionsGuard]},
          {path: 'lawyer', redirectTo: 'lawyer/clients'},

          {path: 'advocate/clients', component: EditAdvocateClientComponent, canActivate: [PermissionsGuard]},
          {path: 'advocate/clients/:id', component: EditAdvocateClientComponent, canActivate: [PermissionsGuard]},
          {path: 'advocate', component: EditAdvocatePageComponent, canActivate: [PermissionsGuard]},
          {path: 'advocate/:id', component: EditAdvocatePageComponent, canActivate: [PermissionsGuard]},
          {path: 'advocate_category', component: EditAdvocateCategoryComponent, canActivate: [PermissionsGuard]},
          {path: 'advocate_category/:id', component: EditAdvocateCategoryComponent, canActivate: [PermissionsGuard]},
          {path: 'advocate_case', component: EditAdvocateCaseComponent, canActivate: [PermissionsGuard]},
          {path: 'advocate_case/:id', component: EditAdvocateCaseComponent, canActivate: [PermissionsGuard]},
          {path: 'advocate_work/:case_id', component: EditAdvocateWorkComponent, canActivate: [PermissionsGuard]},
          {path: 'advocate_work/:case_id/:id', component: EditAdvocateWorkComponent, canActivate: [PermissionsGuard]},

          {path: 'user', component: EditUserPageComponent, canActivate: [PermissionsGuard]},
          {path: 'user/:id', component: EditUserPageComponent, canActivate: [PermissionsGuard]},
        ]
      },
      {
        path: 'archive', canActivate: [AuthGuard], children: [
          {path: 'clients', component: ClientsArchiveComponent, canActivate: [PermissionsGuard]},
          {path: 'subscribers', component: SubscribersArchiveComponent, canActivate: [PermissionsGuard]},
          {path: 'advocate_cases', component: AdvocateCasesArchiveComponent, canActivate: [PermissionsGuard]},
        ]
      },
      {
        path: 'calculations', canActivate: [AuthGuard], children: [
          {path: 'subscribers', component: SubscribersCalculationsComponent, canActivate: [PermissionsGuard]},
        ]
      },
    ]
  },
  {
    path: 'login', component: AuthPageComponent
  },
  {
    path: '**', redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
