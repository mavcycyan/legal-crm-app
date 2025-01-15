import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubscribersWorksCardInterfaceRequest} from "../../models/subscribers/subscribers-works-card.interface";
import {globals} from "../../../globals/globals";
import {AdvocateWorksInterfaceRequest} from "../../models/advocates/advocate-works.interface";

@Injectable({
  providedIn: 'root'
})
export class AdvocateWorkService {
  constructor(private httpClient: HttpClient) { }

  getOne(id: number): Observable<AdvocateWorksInterfaceRequest> {
    return this.httpClient.get<AdvocateWorksInterfaceRequest>(`${globals.api_url}/api/advocates_works/${id}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post(`${globals.api_url}/api/advocates_works`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${globals.api_url}/api/advocates_works/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`${globals.api_url}/api/advocates_works/${id}`);
  }
}
