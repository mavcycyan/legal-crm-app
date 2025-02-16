export interface ClientsListInterface {
  id: Number,
  full_name: String,
  where_knows: String,
  birthday: String,
  address: String,
  phone: String
}

export interface ClientsListInterfaceRequest {
  success: Boolean,
  message: String,
  data: ClientsListInterface[],
  all_items?: number
}

