import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {globals} from "../../../globals/globals";
import {Router} from "@angular/router";
import {ApiResponseInterface, ApiSaveResponseInterface, FormPayloadInterface} from "../../models/api/api-response.interface";

@Injectable({
  providedIn: 'root'
})
export class AdvocateCategoryService {

  constructor(private httpClient: HttpClient,
              private router: Router) { }


  save(data: FormPayloadInterface): Observable<ApiSaveResponseInterface> {
    return this.httpClient.post<ApiSaveResponseInterface>(`${globals.api_url}/api/advocates_categories`, data);
  }

  update(id: number, data: FormPayloadInterface): Observable<ApiSaveResponseInterface> {
    return this.httpClient.put<ApiSaveResponseInterface>(`${globals.api_url}/api/advocates_categories/${id}`, data);
  }

  remove(id: number): Observable<ApiResponseInterface> {
    return this.httpClient.delete<ApiResponseInterface>(`${globals.api_url}/api/advocates_categories/${id}`);
  }

  redirectSuccess(id: number|null = null) {
    this.router.navigate(['/', 'edit', 'advocate_category', id]);
  }

  redirectRemoveSuccess() {
    this.router.navigate(['/', 'advocate']);
  }
}
