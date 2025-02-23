import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AdvocateCaseCardInterfaceRequest} from "../../models/advocates/advocate-cases-card.interface";
import {globals} from "../../../globals/globals";
import {HttpClient} from "@angular/common/http";
import {TableAdvcaseclientInterfaceRequest} from "../../models/table/table-advcaseclient.interface";

@Injectable({
  providedIn: 'root'
})
export class AdvocateCaseTblService {

  constructor(private httpClient: HttpClient) { }
  getAdvocateCaseClient(case_id: number): Observable<TableAdvcaseclientInterfaceRequest> {
    return this.httpClient.get<TableAdvcaseclientInterfaceRequest>(`${globals.api_url}/api/get_client_case/${case_id}`);
  }
}
