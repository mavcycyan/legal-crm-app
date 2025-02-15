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

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<SubscribersListInterfaceRequest> {
    return this.httpClient.get<SubscribersListInterfaceRequest>(`${globals.api_url}/api/subscribers`);
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

}
