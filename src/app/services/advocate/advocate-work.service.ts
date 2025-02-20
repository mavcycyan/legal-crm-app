import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubscribersWorksCardInterfaceRequest} from "../../models/subscribers/subscribers-works-card.interface";
import {globals} from "../../../globals/globals";
import {
  AdvocateWorksInterface,
  AdvocateWorksInterfaceRequest,
  AdvocateWorksListInterfaceRequest
} from "../../models/advocates/advocate-works.interface";
import {Router} from "@angular/router";
import {ClientCardWorksListInterfaceRequest} from "../../models/clients/client-card-works-list.interface";

@Injectable({
  providedIn: 'root'
})
export class AdvocateWorkService {
  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getList(case_id: number, params: {} = {}): Observable<AdvocateWorksListInterfaceRequest> {
    let params_str: string = '';
    if (Object.keys(params).length > 0) {
      Object.keys(params).forEach((item: string, index: number) => {
        params_str += '&';
        params_str += item+'='+Object.values(params)[index];
      });
    }
    return this.httpClient.get<AdvocateWorksListInterfaceRequest>(`${globals.api_url}/api/advocates_works?case_id=${case_id}${params_str}`);
  }

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

  redirectSuccess(id: number|null = null) {
    this.router.navigate(['/', 'edit', 'advocate_work', id]);
  }
}
