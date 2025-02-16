import { Injectable } from '@angular/core';
import {AdvocatesListInterfaceRequest} from "../../models/advocates/advocates-list.interface";
import {
  AdvocateCategoriesInterfaceRequest, AdvocateCategoryInterfaceRequest
} from "../../models/advocates/advocate-categories.interface";
import {
  AdvocateCasesInterface,
  AdvocateCasesInterfaceRequest
} from "../../models/advocates/advocate-cases.interface";
import {AdvocatesCardInterfaceRequest} from "../../models/advocates/advocates-card.interface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AdvocateCaseCardInterfaceRequest} from "../../models/advocates/advocate-cases-card.interface";
import {globals} from "../../../globals/globals";

@Injectable({
  providedIn: 'root'
})
export class AdvocateService {


  constructor(private httpClient: HttpClient) { }

  getList(params: {} = {}): Observable<AdvocatesListInterfaceRequest> {
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
    return this.httpClient.get<AdvocatesListInterfaceRequest>(`${globals.api_url}/api/advocates${params_str}`);
  }

  getOne(id: number): Observable<AdvocatesCardInterfaceRequest> {
    return this.httpClient.get<AdvocatesCardInterfaceRequest>(`${globals.api_url}/api/advocates/${id}`);
  }

  getCategories(): Observable<AdvocateCategoriesInterfaceRequest> {
    return this.httpClient.get<AdvocateCategoriesInterfaceRequest>(`${globals.api_url}/api/advocates_categories`);
  }

  getCategory(id: number): Observable<AdvocateCategoryInterfaceRequest> {
    return this.httpClient.get<AdvocateCategoryInterfaceRequest>(`${globals.api_url}/api/advocates_categories/${id}`);
  }

  getCategoryBySlug(slug: string): Observable<AdvocateCategoryInterfaceRequest> {
    return this.httpClient.get<AdvocateCategoryInterfaceRequest>(`${globals.api_url}/api/advocates_categories_byslug?slug=${slug}`);
  }

  getAdvocateCases(advocate_id: number, category_slug: string, params: {} = {}): Observable<AdvocateCasesInterfaceRequest> {
    let params_str: string = '';
    if (Object.keys(params).length > 0) {
      Object.keys(params).forEach((item: string, index: number) => {
        params_str += '&';
        params_str += item+'='+Object.values(params)[index];
      });
    }
    return this.httpClient.get<AdvocateCasesInterfaceRequest>(`${globals.api_url}/api/advocates_cases?advocate_id=${advocate_id}&advocate_category_slug=${category_slug}${params_str}`);
  }

  getAdvocateCase(case_id: number): Observable<AdvocateCaseCardInterfaceRequest> {
    return this.httpClient.get<AdvocateCaseCardInterfaceRequest>(`${globals.api_url}/api/advocates_cases/${case_id}`);
  }


}
