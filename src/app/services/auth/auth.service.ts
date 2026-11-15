import { Injectable } from '@angular/core';
import {Router, UrlSegment} from "@angular/router";
import {ResponseHttpLogin, ResponseHttpPasswordReset} from "../../models/auth/response.http.login.interface";
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {globals} from "../../../globals/globals";
import {FormPayloadInterface} from "../../models/api/api-response.interface";

export interface UserInterface {
  email: string,
  password?: string,
  name: string,
  user_type: number
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthorized: boolean = false;
  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post<ResponseHttpLogin>(`${globals.api_url}/api/login`, {
      email,
      password
    }).pipe(
      map((data) => {
        if (data.user.name && data.token) {
          this.setUserId(data.user.id);
          this.setUser(data.user.name);
          this.setToken(data.token);
          this.setUserType(data.user.role_id);

          return data;
        }

        return null;
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  logout(): boolean {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userType');
    return true;
  }

  checkUser() {
    if (sessionStorage.getItem('userToken') && sessionStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }


  getName(): string {
    return sessionStorage.getItem('currentUser') ?? '';
  }


  checkPermission(urlSegment: UrlSegment[]): {permission: boolean, redirect?: string[]} {
    const userType = this.getUserType();
    if (userType !== null) {
      if (urlSegment.length === 0) {
        return {permission: true};
      }
      if (userType === 1 || userType === 2) {
        return {permission: true};
      } else if (userType === 3) {
        if (urlSegment.length > 0 && urlSegment[0].path === 'lawyer') {
          return {permission: true};
        }
        return {permission: false, redirect: ['lawyer']};
      } else if (userType === 4) {
        if (
            (urlSegment.length > 1 && urlSegment[0].path === 'advocate' && urlSegment[1].path === 'personal') ||
            (urlSegment.length > 1 && urlSegment[0].path === 'advocate' && urlSegment[1].path === 'clients') ||
            (urlSegment.length > 0 && urlSegment[0].path === 'advocate_category') ||
            (urlSegment.length > 0 && urlSegment[0].path === 'advocate_case') ||
            (urlSegment.length > 0 && urlSegment[0].path === 'advocate_work')
        ) {
          return {permission: true};
        }
        return {permission: false, redirect: ['advocate', 'personal']};
      }
    }
    return {permission: false, redirect: ['login']};
  }

  private setUserId(userId: number): void {
    sessionStorage.setItem('userId', userId.toString());
  }

  private setUser(user: string): void {
    sessionStorage.setItem('currentUser', user);
  }

  private setToken(api_token: string): void {
    sessionStorage.setItem('userToken', api_token);
  }

  private setUserType(user_type: number): void {
    sessionStorage.setItem('userType', user_type.toString());
  }

  getToken(): string | null {
    if (this.checkUser()) {
      return sessionStorage.getItem('userToken');
    }
    return '';
  }

  getUserType(): number | null {
    const userType = sessionStorage.getItem('userType');
    if (userType !== null && userType !== '') {
      return parseInt(userType);
    }
    return null;
  }
  passwordReset(id: number, data: FormPayloadInterface): Observable<ResponseHttpPasswordReset> {
    return this.httpClient.post<ResponseHttpPasswordReset>(`${globals.api_url}/api/password_reset/${id}`, data)
  }
}
