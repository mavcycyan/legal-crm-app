import { Injectable } from '@angular/core';
import {Router, UrlSegment} from "@angular/router";

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

  private users: UserInterface[] = [
    {
      email: 'admin@example.com',
      password: 'admin',
      name: 'Адмінистратор',
      user_type: 0
    },
    {
      email: 'director@example.com',
      password: 'director',
      name: 'Директоренко Іван Іванович',
      user_type: 0
    },
    {
      email: 'lawyer@example.com',
      password: 'lawyer',
      name: 'Юрист',
      user_type: 1
    },
    {
      email: 'advocate@example.com',
      password: 'advocate',
      name: 'Адвокат',
      user_type: 2
    }
  ];
  constructor(private router: Router) { }

  checkUser(): Boolean {
    const checked = localStorage.getItem('checked')
    const name = localStorage.getItem('name')
    const userType = localStorage.getItem('user_type')
    return (checked !== null && checked !== '0' && name !== null && name !== '' && userType !== null && userType !== '');
  }

  getName(): String {
    const name = localStorage.getItem('name');
    if (name !== null) {
      return name;
    }
    return '';
  }
  loginUser(login: String = '', password: String = ''): void {
    const user: false|UserInterface = this.findUser(login, password);
    if (user !== false) {
      localStorage.setItem('checked', '1');
      localStorage.setItem('name', user.name);
      localStorage.setItem('user_type', user.user_type.toString());
    }
  }

  findUser(login: String = '', password: String = ''): false|UserInterface {
    const user: UserInterface|undefined = this.users.find(user => user.email === login);
    if (user !== undefined) {
      return (user.password === password) ? user : false;
    }
    return false;
  }


  checkPermission(urlSegment: UrlSegment[]): {permission: boolean, redirect?: String[]} {
    const userType = localStorage.getItem('user_type')
    if (userType !== null && userType !== '') {
      if (userType === '0') {
        return {permission: true};
      } else if (userType === '1') {
        if (urlSegment.length > 0 && urlSegment[0].path === 'lawyer') {
          return {permission: true};
        }
        return {permission: false, redirect: ['lawyer']};
      } else if (userType === '2') {
        if (urlSegment.length > 1 && urlSegment[0].path === 'advocate' && urlSegment[1].path === 'personal') {
          return {permission: true};
        }
        return {permission: false, redirect: ['advocate', 'personal']};
      }
    }
    return {permission: false, redirect: ['login']};
  }

  logoutUser(): void {
    localStorage.removeItem('checked');
    localStorage.removeItem('name');
    localStorage.removeItem('user_type');
    this.router.navigate(['login'])
  }
}
