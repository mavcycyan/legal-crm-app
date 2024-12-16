import { Injectable } from '@angular/core';
import {
  ClientsCardInterfaceRequest
} from "../../models/clients/clients-card.interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClientWorksListInterfaceRequest} from "../../models/clients/client-works-list.interface";
import {ClientsListInterfaceRequest} from "../../models/clients/clients-list.interface";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor(private httpClient: HttpClient) { }

  getList(): Observable<ClientWorksListInterfaceRequest> {
    return this.httpClient.get<ClientWorksListInterfaceRequest>('http://api.crm.local/api/client_works');
  }

  getClientsList(): Observable<ClientsListInterfaceRequest> {
    return this.httpClient.get<ClientsListInterfaceRequest>('http://api.crm.local/api/clients');
  }
  getOne(id: number): Observable<ClientsCardInterfaceRequest> {
    return this.httpClient.get<ClientsCardInterfaceRequest>(`http://api.crm.local/api/clients/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post(`http://api.crm.local/api/clients`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`http://api.crm.local/api/clients/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`http://api.crm.local/api/clients/${id}`);
  }

}
