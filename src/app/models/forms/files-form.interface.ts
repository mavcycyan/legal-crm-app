export interface FilesFormInterface {
  id?: number,
  file_name: string,
  file_url: string,
  client_work_id: number
}
export interface FilesFormInterfaceRequest {
  success: boolean,
  message: string,
  data: FilesFormInterface[],
  all_items?: number
}
