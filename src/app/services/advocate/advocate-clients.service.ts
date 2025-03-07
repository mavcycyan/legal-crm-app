import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {ClientsListInterfaceRequest} from "../../models/clients/clients-list.interface";
import {globals} from "../../../globals/globals";
import {ClientsCardInterfaceRequest} from "../../models/clients/clients-card.interface";

@Injectable({
  providedIn: 'root'
})
export class AdvocateClientsService {
  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getList(params: {} = {}): Observable<ClientsListInterfaceRequest> {
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
    return this.httpClient.get<ClientsListInterfaceRequest>(`${globals.api_url}/api/advocates_clients${params_str}`);
  }
  getOne(id: number): Observable<ClientsCardInterfaceRequest> {
    return this.httpClient.get<ClientsCardInterfaceRequest>(`${globals.api_url}/api/advocates_clients/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post(`${globals.api_url}/api/advocates_clients`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${globals.api_url}/api/advocates_clients/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`${globals.api_url}/api/advocates_clients/${id}`);
  }


  redirectSuccess(id: number|null = null) {
    this.router.navigate(['/', 'edit', 'advocate', 'clients', id]);
  }

  redirectRemoveSuccess() {
    this.router.navigate(['/', 'advocate', 'clients']);
  }
}
