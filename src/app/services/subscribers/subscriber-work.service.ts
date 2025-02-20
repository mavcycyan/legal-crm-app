import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaymentFormInterfaceRequest} from "../../models/forms/payment-form.interface";
import {globals} from "../../../globals/globals";

@Injectable({
  providedIn: 'root'
})
export class SubscriberWorkService {
  constructor(private httpClient: HttpClient) { }

  getList(id: number): Observable<PaymentFormInterfaceRequest> {
    return this.httpClient.get<PaymentFormInterfaceRequest>(`${globals.api_url}/api/fin/subscriberworks/prices?parent_id=${id}`);
  }

  update(data: any): Observable<any> {
    return this.httpClient.put(`${globals.api_url}/api/fin/subscriberworks/prices_bulk_update`, data);
  }
}
