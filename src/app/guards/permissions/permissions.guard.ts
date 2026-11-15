import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const permission: {permission: boolean, redirect?: string[]} = this.checkPermission(route.url);
    if (permission.permission) {
      return true;
    }
    this.redirectTo(permission.redirect);
    return false;
  }

  checkPermission(urlSegment: UrlSegment[]): {permission: boolean, redirect?: string[]} {
    return this.authService.checkPermission(urlSegment);
  }

  redirectTo(redirect: string[] = ['']): void {
    this.router.navigate(redirect);
  }

}
