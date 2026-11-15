export interface ClientsListInterface {
  id: number,
  full_name: string,
  where_knows: string,
  birthday: string,
  address: string,
  phone: string,
  pending_works?: number
}

export interface ClientsListInterfaceRequest {
  success: boolean,
  message: string,
  data: ClientsListInterface[],
  all_items?: number
}

