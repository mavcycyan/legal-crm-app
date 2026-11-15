import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaymentFormInterfaceRequest} from "../../models/forms/payment-form.interface";
import {globals} from "../../../globals/globals";
import {SubscriberCalculationInterfaceRequest} from "../../models/calculations/subscriber-calculation-interface";
import {ApiResponseInterface, ApiSaveResponseInterface, FormPayloadInterface} from "../../models/api/api-response.interface";

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

  save(data: FormPayloadInterface): Observable<ApiSaveResponseInterface> {
    return this.httpClient.post<ApiSaveResponseInterface>(`${globals.api_url}/api/calculations/subscribers`, data);
  }

  update(id: number, data: FormPayloadInterface): Observable<ApiSaveResponseInterface> {
    return this.httpClient.put<ApiSaveResponseInterface>(`${globals.api_url}/api/calculations/subscribers/${id}`, data);
  }

  stopReasonUpdate(id: number|string, data: FormPayloadInterface): Observable<ApiResponseInterface> {
    return this.httpClient.put<ApiResponseInterface>(`${globals.api_url}/api/subscribers_stop_reason/${id}`, data);
  }
}
