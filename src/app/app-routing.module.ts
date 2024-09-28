import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./layouts/main-page/main-page.component";
import {AuthGuard} from "./guards/auth.guard";
import {AuthPageComponent} from "./layouts/auth-page/auth-page.component";

const routes: Routes = [
  {
    path: '', component: MainPageComponent, canActivate: [AuthGuard]
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
