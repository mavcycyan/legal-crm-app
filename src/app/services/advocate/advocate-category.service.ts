import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {globals} from "../../../globals/globals";

@Injectable({
  providedIn: 'root'
})
export class AdvocateCategoryService {

  constructor(private httpClient: HttpClient) { }


  save(data: any): Observable<any> {
    return this.httpClient.post(`${globals.api_url}/api/advocates_categories`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${globals.api_url}/api/advocates_categories/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this.httpClient.delete(`${globals.api_url}/api/advocates_categories/${id}`);
  }
}
