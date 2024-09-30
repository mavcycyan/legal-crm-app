import { Injectable } from '@angular/core';
import {UrlSegment} from "@angular/router";

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

  private checked: Boolean = false;
  private login: String = '';
  private user: UserInterface|false = {} as UserInterface;

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
  constructor() { }

  checkUser(): Boolean {
    return this.checked;
  }

  checkPermission(urlSegment: UrlSegment[]): {permission: boolean, redirect?: String[]} {
    if (this.user === false) {
      return {permission: false, redirect: ['login']};
    }
    if (this.user.user_type === 0) {
      return {permission: true};
    } else if (this.user.user_type === 1) {
      if (urlSegment.length > 0 && urlSegment[0].path === 'lawyer') {
        return {permission: true};
      }
      return {permission: false, redirect: ['lawyer']};
    } else if (this.user.user_type === 2) {
      if (urlSegment.length > 0 && urlSegment[0].path === 'advocate') {
        return {permission: true};
      }
      return {permission: false, redirect: ['advocate']};
    }
    return {permission: false, redirect: ['login']};
  }

  getLogin(): String {
    return this.login;
  }
  loginUser(login: String = '', password: String = ''): void {
    const user: false|UserInterface = this.findUser(login, password);
    this.checked = user !== false;
    if (this.checked && user !== false) {
      this.login = login;
      this.user = user;
    }
  }

  findUser(login: String = '', password: String = ''): false|UserInterface {
    const user: UserInterface|undefined = this.users.find(user => user.email === login);
    if (user !== undefined) {
      return (user.password === password) ? user : false;
    }
    return false;
  }
  logoutUser(): void {
    this.checked = false;
  }
}
