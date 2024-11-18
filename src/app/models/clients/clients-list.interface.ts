export interface ClientsListInterface {
  id: Number,
  visit_date: String,
  visit_purpose: String,
  full_name: String,
  where_knows: String,
  birthday: String,
  phone: String,
  result: String,
  fee: String,
  client_id: Number,
  custom_path?: String
}

export interface ClientsListInterfaceRequest {
  success: Boolean,
  message: String,
  data: ClientsListInterface[]
}

