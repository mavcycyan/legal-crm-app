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
  edit_path?: String
}

export interface ClientWorksCardInterfaceRequest {
  success: Boolean,
  message: String,
  data: ClientWorksCardInterface
}
