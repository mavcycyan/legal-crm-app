import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaymentFormInterfaceRequest} from "../../models/forms/payment-form.interface";
import {globals} from "../../../globals/globals";
import {FormPayloadInterface} from "../../models/api/api-response.interface";

@Injectable({
  providedIn: 'root'
})
export class AdvocateCasePaymentsService {
  constructor(private httpClient: HttpClient) { }

  getList(id: number): Observable<PaymentFormInterfaceRequest> {
    return this.httpClient.get<PaymentFormInterfaceRequest>(`${globals.api_url}/api/fin/advocatecases/prices?parent_id=${id}`);
  }

  update(data: FormPayloadInterface): Observable<PaymentFormInterfaceRequest> {
    return this.httpClient.put<PaymentFormInterfaceRequest>(`${globals.api_url}/api/fin/advocatecases/prices_bulk_update`, data);
  }
}
