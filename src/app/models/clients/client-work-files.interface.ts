export interface ClientWorkFilesInterface {
  id?: number,
  file_name: string,
  file_path: string,
  client_work_id: number
}
export interface ClientWorkFilesInterfaceRequest {
  success: boolean,
  message: string,
  data: ClientWorkFilesInterface[],
  all_items?: number
}
