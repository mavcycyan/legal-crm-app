import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  ClientWorksCardInterfaceRequest
} from "../../models/clients/client-works-card.interface";
import {globals} from "../../../globals/globals";
import {Router} from "@angular/router";
import {ClientCardWorksListInterfaceRequest} from "../../models/clients/client-card-works-list.interface";

@Injectable({
  providedIn: 'root'
})
export class ClientWorksService {
  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getList(client_id: number, params: {} = {}): Observable<ClientCardWorksListInterfaceRequest> {
    let params_str: string = '';
    if (Object.keys(params).length > 0) {
      Object.keys(params).forEach((item: string, index: number) => {
        params_str += '&';
        params_str += item+'='+Object.values(params)[index];
      });
    }
    return this.httpClient.get<ClientCardWorksListInterfaceRequest>(`${globals.api_url}/api/client_works_list?client_id=${client_id}${params_str}`);
  }

  getOne(id: number): Observable<ClientWorksCardInterfaceRequest> {
    return this.httpClient.get<ClientWorksCardInterfaceRequest>(`${globals.api_url}/api/client_works/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post(`${globals.api_url}/api/client_works`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${globals.api_url}/api/client_works/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`${globals.api_url}/api/client_works/${id}`);
  }

  redirectSuccess(id: number|null = null) {
    this.router.navigate(['/', 'edit', 'lawyer', 'client_work', id]);
  }

  redirectRemoveSuccess() {
    this.router.navigate(['/', 'lawyer', 'clients']);
  }
}
