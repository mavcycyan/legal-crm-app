import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {globals} from "../../../globals/globals";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {
  AdvocateCategoriesInterfaceRequest,
  AdvocateCategoryInterfaceRequest
} from "../../models/advocates/advocate-categories.interface";
import {AdvocateCasesInterfaceRequest} from "../../models/advocates/advocate-cases.interface";
import {AdvocateCaseCardInterfaceRequest} from "../../models/advocates/advocate-cases-card.interface";
import {ClientsListInterfaceRequest} from "../../models/clients/clients-list.interface";
import {AdvocatesListInterfaceRequest} from "../../models/advocates/advocates-list.interface";

@Injectable({
  providedIn: 'root'
})
export class LawyerAdvcaseService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  save(data: any): Observable<any> {
    return this.httpClient.post(`${globals.api_url}/api/lawyer_advocates_cases`, data);
  }

  getAdvocatesList(params: {} = {}): Observable<AdvocatesListInterfaceRequest> {
    let params_str: string = '';
    if (Object.keys(params).length > 0) {
      params_str += '?';
      Object.keys(params).forEach((item: string, index: number) => {
        if (index > 0) {
          params_str += '&';
        }
        params_str += item+'='+Object.values(params)[index];
      });
    }
    return this.httpClient.get<AdvocatesListInterfaceRequest>(`${globals.api_url}/api/lawyer_advocates${params_str}`);
  }

  getCategories(): Observable<AdvocateCategoriesInterfaceRequest> {
    return this.httpClient.get<AdvocateCategoriesInterfaceRequest>(`${globals.api_url}/api/lawyer_advocates_categories`);
  }

  getAdvocateCases(advocate_id: number, category_slug: string, params: {} = {}): Observable<AdvocateCasesInterfaceRequest> {
    let params_str: string = '';
    if (Object.keys(params).length > 0) {
      Object.keys(params).forEach((item: string, index: number) => {
        params_str += '&';
        params_str += item+'='+Object.values(params)[index];
      });
    }
    return this.httpClient.get<AdvocateCasesInterfaceRequest>(`${globals.api_url}/api/lawyer_advocates_cases?advocate_id=${advocate_id}&advocate_category_slug=${category_slug}${params_str}`);
  }

  getClients(): Observable<ClientsListInterfaceRequest> {
    return this.httpClient.get<ClientsListInterfaceRequest>(`${globals.api_url}/api/clients`);
  }

  redirectSuccess(id: number|null = null) {
    this.router.navigate(['/', 'lawyer', 'clients']);
  }
}
