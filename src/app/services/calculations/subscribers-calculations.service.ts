import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaymentFormInterfaceRequest} from "../../models/forms/payment-form.interface";
import {globals} from "../../../globals/globals";
import {SubscriberCalculationInterfaceRequest} from "../../models/calculations/subscriber-calculation-interface";

@Injectable({
  providedIn: 'root'
})
export class SubscribersCalculationsService {
  constructor(private httpClient: HttpClient) { }

  getList(params: {} = {}): Observable<SubscriberCalculationInterfaceRequest> {
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
    return this.httpClient.get<SubscriberCalculationInterfaceRequest>(`${globals.api_url}/api/calculations/subscribers${params_str}`);
  }

  save(data: any): Observable<any> {
    return this.httpClient.post(`${globals.api_url}/api/calculations/subscribers`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.httpClient.put(`${globals.api_url}/api/calculations/subscribers/${id}`, data);
  }
}
