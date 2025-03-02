export interface ClientWorksCardInterface {
  id: number,
  client_id: number,
  visit_date: String,
  visit_purpose: String,
  what_done: {
    data: String,
    pending: Boolean
  }[],
  result: String,
  fee: String,
  fee_status: string,
  edit_path?: String
}

export interface ClientWorksCardInterfaceRequest {
  success: Boolean,
  message: String,
  data: ClientWorksCardInterface
}
