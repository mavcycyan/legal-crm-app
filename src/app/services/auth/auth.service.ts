import { Injectable } from '@angular/core';
import {Router, UrlSegment} from "@angular/router";
import {ResponseHttpLogin} from "../../models/auth/response.http.login.interface";
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {globals} from "../../../globals/globals";

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


  getName(): String {
    return sessionStorage.getItem('currentUser') ?? '';
  }

  checkPermission(urlSegment: UrlSegment[]): {permission: boolean, redirect?: String[]} {
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
}
// export class AuthService {
//
//   private users: UserInterface[] = [
//     {
//       email: 'admin@example.com',
//       password: 'admin',
//       name: 'Адмінистратор',
//       user_type: 0
//     },
//     {
//       email: 'director@example.com',
//       password: 'director',
//       name: 'Директоренко Іван Іванович',
//       user_type: 0
//     },
//     {
//       email: 'lawyer@example.com',
//       password: 'lawyer',
//       name: 'Юрист',
//       user_type: 1
//     },
//     {
//       email: 'advocate@example.com',
//       password: 'advocate',
//       name: 'Адвокат',
//       user_type: 2
//     }
//   ];
//   constructor(private router: Router,
//               private httpClient: HttpClient) { }
//
//   checkUser(): Boolean {
//     const checked = localStorage.getItem('checked')
//     const name = localStorage.getItem('name')
//     const userType = localStorage.getItem('user_type')
//     return (checked !== null && checked !== '0' && name !== null && name !== '' && userType !== null && userType !== '');
//   }
//
//   getName(): String {
//     const name = localStorage.getItem('name');
//     if (name !== null) {
//       return name;
//     }
//     return '';
//   }
//   loginUser(login: String = '', password: String = ''): void {
//     const user: false|UserInterface = this.findUser(login, password);
//     if (user !== false) {
//       localStorage.setItem('checked', '1');
//       localStorage.setItem('name', user.name);
//       localStorage.setItem('user_type', user.user_type.toString());
//     }
//   }
//   // loginUser(email: String = '', password: String = ''): Observable<ResponseHttpLogin> {
//   //   return this.httpClient.post<ResponseHttpLogin>(`http://api.crm.local/api/login`, {
//   //     email,
//   //     password
//   //   }).pipe(
//   //     map((data) => {
//   //       if (data.data.user.name && data.data.token) {
//   //         // this.setUser(data.data.name);
//   //         this.setToken(data.data.token);
//   //
//   //         return data;
//   //       }
//   //
//   //       return null;
//   //     }),
//   //     catchError((error) => {
//   //       console.log(error);
//   //       return throwError(error);
//   //     })
//   //   );
//   // }
//
//   findUser(login: String = '', password: String = ''): false|UserInterface {
//     const user: UserInterface|undefined = this.users.find(user => user.email === login);
//     if (user !== undefined) {
//       return (user.password === password) ? user : false;
//     }
//     return false;
//   }
//
//
//   checkPermission(urlSegment: UrlSegment[]): {permission: boolean, redirect?: String[]} {
//     const userType = localStorage.getItem('user_type')
//     if (userType !== null && userType !== '') {
//       if (userType === '0') {
//         return {permission: true};
//       } else if (userType === '1') {
//         if (urlSegment.length > 0 && urlSegment[0].path === 'lawyer') {
//           return {permission: true};
//         }
//         return {permission: false, redirect: ['lawyer']};
//       } else if (userType === '2') {
//         if (urlSegment.length > 1 && urlSegment[0].path === 'advocate' && urlSegment[1].path === 'personal') {
//           return {permission: true};
//         }
//         return {permission: false, redirect: ['advocate', 'personal']};
//       }
//     }
//     return {permission: false, redirect: ['login']};
//   }
//
//   logoutUser(): void {
//     localStorage.removeItem('checked');
//     localStorage.removeItem('name');
//     localStorage.removeItem('user_type');
//     this.router.navigate(['login'])
//   }
//
//
//   private setToken(api_token: string): void {
//     sessionStorage.setItem('userToken', api_token);
//   }
//
//   getToken(): string | null {
//     if (this.checkUser()) {
//       return sessionStorage.getItem('userToken');
//     }
//     return '';
//   }
// }
