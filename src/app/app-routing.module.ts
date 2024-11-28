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

const routes: Routes = [
  {
    path: '', component: MainPageComponent, canActivate: [AuthGuard], children: [
      {path: '', component: HomePageComponent, canActivate: [PermissionsGuard]},
      {path: 'lawyer/clients', component: ClientsPageComponent, canActivate: [PermissionsGuard]},
      {path: 'lawyer/clients/:id', component: ClientsCardPageComponent, canActivate: [PermissionsGuard]},
      {path: 'lawyer/subscribers', component: SubscribersPageComponent, canActivate: [PermissionsGuard]},
      {path: 'lawyer/subscribers/:id', component: SubscribersCardPageComponent, canActivate: [PermissionsGuard]},
      {path: 'lawyer', redirectTo: 'lawyer/clients'},
      {path: 'advocate', component: AdvocatePageComponent, canActivate: [PermissionsGuard]},
      {path: 'advocate/:id', component: AdvocateCardComponent, canActivate: [PermissionsGuard], children: [
        {path: '', component: AdvocateCategoriesComponent, canActivate: [PermissionsGuard]},
        {path: ':category', component: AdvocateCasePageComponent, canActivate: [PermissionsGuard]},
        {path: ':category/:case_id', component: AdvocateCaseCardComponent, canActivate: [PermissionsGuard]},
      ]},
      {
        path: 'edit', canActivate: [AuthGuard], children: [
          {path: 'lawyer/clients', component: EditClientPageComponent, canActivate: [PermissionsGuard]},
          {path: 'lawyer/clients/:id', component: EditClientPageComponent, canActivate: [PermissionsGuard]},
          {path: 'lawyer/client_work', component: EditClientWorkPageComponent, canActivate: [PermissionsGuard]},
          {path: 'lawyer/client_work/:id', component: EditClientWorkPageComponent, canActivate: [PermissionsGuard]},
          //     {path: 'lawyer/subscribers', component: SubscribersPageComponent, canActivate: [PermissionsGuard]},
          //     {path: 'lawyer/subscribers/:id', component: SubscribersCardPageComponent, canActivate: [PermissionsGuard]},
          {path: 'lawyer', redirectTo: 'lawyer/clients'},
          //     {path: 'advocate', component: AdvocatePageComponent, canActivate: [PermissionsGuard]},
          //     {path: 'advocate/:id', component: AdvocateCardComponent, canActivate: [PermissionsGuard], children: [
          //       {path: '', component: AdvocateCategoriesComponent, canActivate: [PermissionsGuard]},
          //       {path: ':category', component: AdvocateCasePageComponent, canActivate: [PermissionsGuard]},
          //       {path: ':category/:case_id', component: AdvocateCaseCardComponent, canActivate: [PermissionsGuard]},
          //     ]},
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
