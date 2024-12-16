import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  ClientWorksCardInterfaceRequest
} from "../../models/clients/client-works-card.interface";

@Injectable({
  providedIn: 'root'
})
export class ClientWorksService {
  constructor(private httpClient: HttpClient) { }

  getOne(id: number): Observable<ClientWorksCardInterfaceRequest> {
    return this.httpClient.get<ClientWorksCardInterfaceRequest>(`http://api.crm.local/api/client_works/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post(`http://api.crm.local/api/client_works`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`http://api.crm.local/api/client_works/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`http://api.crm.local/api/client_works/${id}`);
  }
}
