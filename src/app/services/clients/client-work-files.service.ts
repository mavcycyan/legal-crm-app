import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {globals} from "../../../globals/globals";
import {FilesFormInterfaceRequest} from "../../models/forms/files-form.interface";

@Injectable({
  providedIn: 'root'
})
export class ClientWorkFilesService {
  constructor(private httpClient: HttpClient) { }

  getList(workId: number): Observable<FilesFormInterfaceRequest> {
    return this.httpClient.get<FilesFormInterfaceRequest>(`${globals.api_url}/api/client_works/${workId}/files`);
  }

  upload(workId: number, data: FormData): Observable<FilesFormInterfaceRequest> {
    return this.httpClient.post<FilesFormInterfaceRequest>(`${globals.api_url}/api/client_works/${workId}/files`, data);
  }

  delete(id: number, workId: number): Observable<FilesFormInterfaceRequest> {
    return this.httpClient.delete<FilesFormInterfaceRequest>(`${globals.api_url}/api/client_works/${workId}/files/${id}`);
  }
}
