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
