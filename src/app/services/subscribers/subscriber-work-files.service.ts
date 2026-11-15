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

  upload(workId: number, data: FormData): Observable<FilesFormInterfaceRequest> {
    return this.httpClient.post<FilesFormInterfaceRequest>(`${globals.api_url}/api/subscriber_works/${workId}/files`, data);
  }

  delete(id: number, workId: number): Observable<FilesFormInterfaceRequest> {
    return this.httpClient.delete<FilesFormInterfaceRequest>(`${globals.api_url}/api/subscriber_works/${workId}/files/${id}`);
  }
}
