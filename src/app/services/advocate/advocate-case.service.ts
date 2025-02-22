import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {globals} from "../../../globals/globals";
import {AdvocatesListInterfaceRequest} from "../../models/advocates/advocates-list.interface";
import {AdvocateCasesInterface, AdvocateCasesInterfaceRequest} from "../../models/advocates/advocate-cases.interface";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdvocateCaseService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getList(): Observable<AdvocateCasesInterfaceRequest> {
    return this.httpClient.get<AdvocateCasesInterfaceRequest>(`${globals.api_url}/api/advocates_cases`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post(`${globals.api_url}/api/advocates_cases`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${globals.api_url}/api/advocates_cases/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`${globals.api_url}/api/advocates_cases/${id}`);
  }

  redirectSuccess(id: number|null = null) {
    this.router.navigate(['/', 'edit', 'advocate_case', id]);
  }

  redirectRemoveSuccess() {
    this.router.navigate(['/', 'advocate']);
  }
}
