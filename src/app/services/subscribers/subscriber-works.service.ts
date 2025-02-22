import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubscribersWorksCardInterfaceRequest} from "../../models/subscribers/subscribers-works-card.interface";
import {globals} from "../../../globals/globals";
import {Router} from "@angular/router";
import {ClientCardWorksListInterfaceRequest} from "../../models/clients/client-card-works-list.interface";
import {SubscribersWorksListInterfaceRequest} from "../../models/subscribers/subscribers-works-list.interface";

@Injectable({
  providedIn: 'root'
})
export class SubscriberWorksService {
  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getList(subscriber_id: number, params: {} = {}): Observable<SubscribersWorksListInterfaceRequest> {
    let params_str: string = '';
    if (Object.keys(params).length > 0) {
      Object.keys(params).forEach((item: string, index: number) => {
        params_str += '&';
        params_str += item+'='+Object.values(params)[index];
      });
    }
    return this.httpClient.get<SubscribersWorksListInterfaceRequest>(`${globals.api_url}/api/subscriber_works?subscriber_id=${subscriber_id}${params_str}`);
  }

  getOne(id: number): Observable<SubscribersWorksCardInterfaceRequest> {
    return this.httpClient.get<SubscribersWorksCardInterfaceRequest>(`${globals.api_url}/api/subscriber_works/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post(`${globals.api_url}/api/subscriber_works`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${globals.api_url}/api/subscriber_works/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`${globals.api_url}/api/subscriber_works/${id}`);
  }

  redirectSuccess(id: number|null = null) {
    this.router.navigate(['/', 'edit', 'lawyer', 'subscriber_work', id]);
  }

  redirectRemoveSuccess() {
    this.router.navigate(['/', 'lawyer', 'subscriber']);
  }
}
