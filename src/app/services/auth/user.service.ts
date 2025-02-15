import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {globals} from "../../../globals/globals";
import {UserInterfaceRequest, UsersInterfaceRequest} from "../../models/auth/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  getList(): Observable<UsersInterfaceRequest> {
    return this.httpClient.get<UsersInterfaceRequest>(`${globals.api_url}/api/users`);
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
}
