import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {globals} from "../../../globals/globals";
import {PaymentFormInterfaceRequest} from "../../models/forms/payment-form.interface";

@Injectable({
  providedIn: 'root'
})
export class ClientWorkPaymentsService {
  constructor(private httpClient: HttpClient) { }

  getList(id: number): Observable<PaymentFormInterfaceRequest> {
    return this.httpClient.get<PaymentFormInterfaceRequest>(`${globals.api_url}/api/fin/clientworks/prices?parent_id=${id}`);
  }

  update(data: any): Observable<any> {
    return this.httpClient.put(`${globals.api_url}/api/fin/clientworks/prices_bulk_update`, data);
  }
}
