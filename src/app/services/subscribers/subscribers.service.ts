import { Injectable } from '@angular/core';
import {
  SubscribersListInterfaceRequest
} from "../../models/subscribers/subscribers-list.interface";
import {
  SubscribersCardInterfaceRequest
} from "../../models/subscribers/subscribers-card.interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {globals} from "../../../globals/globals";
import {AdvocatesListInterfaceRequest} from "../../models/advocates/advocates-list.interface";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getList(params: {} = {}): Observable<SubscribersListInterfaceRequest> {
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
    return this.httpClient.get<SubscribersListInterfaceRequest>(`${globals.api_url}/api/subscribers${params_str}`);
  }

  getOne(id: number): Observable<SubscribersCardInterfaceRequest> {
    return this.httpClient.get<SubscribersCardInterfaceRequest>(`${globals.api_url}/api/subscribers/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post(`${globals.api_url}/api/subscribers`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${globals.api_url}/api/subscribers/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`${globals.api_url}/api/subscribers/${id}`);
  }


  getAdvocates(): Observable<AdvocatesListInterfaceRequest> {
    return this.httpClient.get<AdvocatesListInterfaceRequest>(`${globals.api_url}/api/lawyer_advocates`);
  }

  getWorkers(): Observable<AdvocatesListInterfaceRequest> {
    return this.httpClient.get<AdvocatesListInterfaceRequest>(`${globals.api_url}/api/lawyer_workers`);
  }

  redirectSuccess(id: number|null = null) {
    this.router.navigate(['/', 'edit', 'lawyer', 'subscribers', id]);
  }

  redirectRemoveSuccess() {
    this.router.navigate(['/', 'lawyer', 'subscribers']);
  }

}
