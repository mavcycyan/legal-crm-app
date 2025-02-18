import { Injectable } from '@angular/core';
import {
  ClientsCardInterfaceRequest
} from "../../models/clients/clients-card.interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClientWorksListInterfaceRequest} from "../../models/clients/client-works-list.interface";
import {ClientsListInterfaceRequest} from "../../models/clients/clients-list.interface";
import {globals} from "../../../globals/globals";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getList(params: {} = {}): Observable<ClientWorksListInterfaceRequest> {
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
    return this.httpClient.get<ClientWorksListInterfaceRequest>(`${globals.api_url}/api/client_works${params_str}`);
  }

  getClientsList(params: {} = {}): Observable<ClientsListInterfaceRequest> {
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
    return this.httpClient.get<ClientsListInterfaceRequest>(`${globals.api_url}/api/clients${params_str}`);
  }
  getOne(id: number): Observable<ClientsCardInterfaceRequest> {
    return this.httpClient.get<ClientsCardInterfaceRequest>(`${globals.api_url}/api/clients/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post(`${globals.api_url}/api/clients`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${globals.api_url}/api/clients/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`${globals.api_url}/api/clients/${id}`);
  }


  redirectSuccess(id: number|null = null) {
    this.router.navigate(['/', 'edit', 'lawyer', 'clients', id]);
  }

}
