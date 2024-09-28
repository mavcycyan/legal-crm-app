import { Injectable } from '@angular/core';

export interface UserInterface {
  email: string,
  password: string,
  name: string,
  isDirector: boolean
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private checked: Boolean = false;
  private login: String = '';

  private users: UserInterface[] = [
    {
      email: 'admin@example.com',
      password: 'admin',
      name: 'Адмінистратор',
      isDirector: true
    },
    {
      email: 'director@example.com',
      password: 'director',
      name: 'Директоренко Іван Іванович',
      isDirector: true
    },
    {
      email: 'lawyer@example.com',
      password: 'lawyer',
      name: 'Юрист',
      isDirector: false
    },
    {
      email: 'advocate@example.com',
      password: 'advocate',
      name: 'Адвокат',
      isDirector: false
    }
  ];
  constructor() { }

  checkUser(): Boolean {
    return this.checked;
  }

  getLogin(): String {
    return this.login;
  }
  loginUser(login: String = '', password: String = ''): void {
    const user: false|UserInterface = this.findUser(login, password);
    this.checked = user !== false;
    if (this.checked) {
      this.login = login;
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
