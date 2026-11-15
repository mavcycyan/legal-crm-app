import {Observable} from "rxjs";
import {ApiResponseInterface, ApiSaveResponseInterface, FormPayloadInterface} from "../api/api-response.interface";
import {PaymentFormInterfaceRequest} from "../forms/payment-form.interface";
import {FilesFormInterfaceRequest} from "../forms/files-form.interface";
import {TableAdvcaseclientInterfaceRequest} from "../table/table-advcaseclient.interface";

// Contract for services passed to app-edit-form as [formService]
export interface EditFormServiceInterface {
  save(data: FormPayloadInterface): Observable<ApiSaveResponseInterface>,
  update?(id: number, data: FormPayloadInterface): Observable<ApiSaveResponseInterface>,
  activate?(id: number): Observable<ApiSaveResponseInterface>,
  deactivate?(id: number): Observable<ApiResponseInterface>,
  remove?(id: number): Observable<ApiResponseInterface>,
  redirectSuccess(id: number|null, parentId?: number|null): void,
  redirectRemoveSuccess?(): void
}

// Contract for services passed to app-edit-form-payment as [service]
export interface PaymentsFormServiceInterface {
  getList(id: number): Observable<PaymentFormInterfaceRequest>,
  update(data: FormPayloadInterface): Observable<PaymentFormInterfaceRequest>
}

// Contract for services passed to app-edit-form-files / app-table-card-files as [service]
export interface FilesFormServiceInterface {
  getList(workId: number): Observable<FilesFormInterfaceRequest>,
  upload(workId: number, data: FormData): Observable<FilesFormInterfaceRequest>,
  delete(id: number, workId: number): Observable<FilesFormInterfaceRequest>
}

// Contract for services passed to app-table as [advCaseService]
export interface TableAdvcaseServiceInterface {
  getAdvocateCaseClient(caseId: number): Observable<TableAdvcaseclientInterfaceRequest>
}
