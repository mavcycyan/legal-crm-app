import { Injectable } from '@angular/core';
import {
  SubscribersListInterfaceRequest
} from "../../models/subscribers/subscribers-list.interface";
import {
  SubscribersCardInterfaceRequest
} from "../../models/subscribers/subscribers-card.interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<SubscribersListInterfaceRequest> {
    return this.httpClient.get<SubscribersListInterfaceRequest>('http://api.crm.local/api/subscribers');
  }

  getOne(id: number): Observable<SubscribersCardInterfaceRequest> {
    return this.httpClient.get<SubscribersCardInterfaceRequest>(`http://api.crm.local/api/subscribers/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post(`http://api.crm.local/api/subscribers`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`http://api.crm.local/api/subscribers/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`http://api.crm.local/api/subscribers/${id}`);
  }


}
