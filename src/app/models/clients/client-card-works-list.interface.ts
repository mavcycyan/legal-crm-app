export interface ClientCardWorksListInterface {
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

export interface ClientCardWorksListInterfaceRequest {
  success: boolean,
  message: string,
  data: ClientCardWorksListInterface[],
  all_items?: number
}
