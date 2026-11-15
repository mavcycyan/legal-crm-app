import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {globals} from "../../../globals/globals";
import {AdvocatesListInterfaceRequest} from "../../models/advocates/advocates-list.interface";
import {AdvocateCasesInterface, AdvocateCasesInterfaceRequest} from "../../models/advocates/advocate-cases.interface";
import {Router} from "@angular/router";
import {ApiResponseInterface, ApiSaveResponseInterface, FormPayloadInterface} from "../../models/api/api-response.interface";

@Injectable({
  providedIn: 'root'
})
export class AdvocateCaseService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getList(params: {} = {}): Observable<AdvocateCasesInterfaceRequest> {
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
    return this.httpClient.get<AdvocateCasesInterfaceRequest>(`${globals.api_url}/api/advocates_cases${params_str}`);
  }
  getArchivesList(params: {} = {}): Observable<AdvocateCasesInterfaceRequest> {
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
    return this.httpClient.get<AdvocateCasesInterfaceRequest>(`${globals.api_url}/api/archive/advocates_cases${params_str}`);
  }

  save(data: FormPayloadInterface): Observable<ApiSaveResponseInterface> {
    return this.httpClient.post<ApiSaveResponseInterface>(`${globals.api_url}/api/advocates_cases`, data);
  }

  update(id: number, data: FormPayloadInterface): Observable<ApiSaveResponseInterface> {
    return this.httpClient.put<ApiSaveResponseInterface>(`${globals.api_url}/api/advocates_cases/${id}`, data);
  }

  activate(id: number): Observable<ApiSaveResponseInterface> {
    return this.httpClient.put<ApiSaveResponseInterface>(`${globals.api_url}/api/advocates_cases/activity/${id}`, {inactive: 0});
  }

  deactivate(id: number): Observable<ApiSaveResponseInterface> {
    return this.httpClient.put<ApiSaveResponseInterface>(`${globals.api_url}/api/advocates_cases/activity/${id}`, {inactive: 1});
  }

  remove(id: number): Observable<ApiResponseInterface> {
    return this.httpClient.delete<ApiResponseInterface>(`${globals.api_url}/api/advocates_cases/${id}`);
  }

  redirectSuccess(id: number|null = null) {
    this.router.navigate(['/', 'edit', 'advocate_case', id]);
  }

  redirectRemoveSuccess() {
    this.router.navigate(['/', 'advocate']);
  }
}
