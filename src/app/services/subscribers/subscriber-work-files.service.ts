import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FilesFormInterfaceRequest} from "../../models/forms/files-form.interface";
import {globals} from "../../../globals/globals";

@Injectable({
  providedIn: 'root'
})
export class SubscriberWorkFilesService {
  constructor(private httpClient: HttpClient) { }

  getList(workId: number): Observable<FilesFormInterfaceRequest> {
    return this.httpClient.get<FilesFormInterfaceRequest>(`${globals.api_url}/api/subscriber_works/${workId}/files`);
  }

  upload(workId: number, data: any): Observable<any> {
    return this.httpClient.post(`${globals.api_url}/api/subscriber_works/${workId}/files`, data);
  }

  delete(id: number, workId: number): Observable<any> {
    return this.httpClient.delete(`${globals.api_url}/api/subscriber_works/${workId}/files/${id}`);
  }
}
