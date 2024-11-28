import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClientsCardInterfaceRequest} from "../../models/clients/clients-card.interface";
import {
  ClientWorksCardInterface,
  ClientWorksCardInterfaceRequest
} from "../../models/clients/client-works-card.interface";

@Injectable({
  providedIn: 'root'
})
export class ClientWorksService {
  constructor(private httpClient: HttpClient) { }

  // getList(): Observable<ClientWorksListInterfaceRequest> {
  //   return this.httpClient.get<ClientWorksListInterfaceRequest>('http://api.crm.local/api/client_works');
  // }
  getOne(id: number): Observable<ClientWorksCardInterfaceRequest> {
    return this.httpClient.get<ClientWorksCardInterfaceRequest>(`http://api.crm.local/api/client_works/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post(`http://api.crm.local/api/client_works`, data);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`http://api.crm.local/api/client_works/${id}`);
  }
}
