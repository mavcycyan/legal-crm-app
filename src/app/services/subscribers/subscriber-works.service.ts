import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubscribersWorksCardInterfaceRequest} from "../../models/subscribers/subscribers-works-card.interface";
import {globals} from "../../../globals/globals";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SubscriberWorksService {
  constructor(private httpClient: HttpClient,
              private router: Router) { }

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
}
