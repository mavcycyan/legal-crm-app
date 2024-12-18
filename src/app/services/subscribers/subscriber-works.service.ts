import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubscribersWorksCardInterfaceRequest} from "../../models/subscribers/subscribers-works-card.interface";

@Injectable({
  providedIn: 'root'
})
export class SubscriberWorksService {
  constructor(private httpClient: HttpClient) { }

  getOne(id: number): Observable<SubscribersWorksCardInterfaceRequest> {
    return this.httpClient.get<SubscribersWorksCardInterfaceRequest>(`http://api.crm.local/api/subscriber_works/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post(`http://api.crm.local/api/subscriber_works`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`http://api.crm.local/api/subscriber_works/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`http://api.crm.local/api/subscriber_works/${id}`);
  }
}
