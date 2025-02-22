import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {globals} from "../../../globals/globals";
import {UserInterfaceRequest, UsersInterfaceRequest} from "../../models/auth/user.interface";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getList(params: {} = {}): Observable<UsersInterfaceRequest> {
    let params_str: string = '';
    if (Object.keys(params).length > 0) {
      params_str += '?';
      Object.keys(params).forEach((item: string, index: number) => {
        if (index > 0) {
          params_str += '&';
        }
        params_str += item+'='+Object.values(params)[index];
      });
    }
    return this.httpClient.get<UsersInterfaceRequest>(`${globals.api_url}/api/users${params_str}`);
  }

  getOne(id: number): Observable<UserInterfaceRequest> {
    return this.httpClient.get<UserInterfaceRequest>(`${globals.api_url}/api/users/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post(`${globals.api_url}/api/register`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${globals.api_url}/api/users/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`${globals.api_url}/api/users/${id}`);
  }

  redirectSuccess(id: number|null = null) {
    this.router.navigate(['/', 'edit', 'user', id]);
  }

  redirectRemoveSuccess() {
    this.router.navigate(['/', 'users']);
  }
}
