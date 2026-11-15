export interface ClientWorksCardInterface {
  id: number,
  client_id: number,
  visit_date: string,
  visit_purpose: string,
  what_done: {
    data: string,
    pending: boolean
  }[],
  result: string,
  fee: string,
  fee_status: string,
  workers_names?: string,
  edit_path?: string
}

export interface ClientWorksCardInterfaceRequest {
  success: boolean,
  message: string,
  data: ClientWorksCardInterface
}
