export interface ClientWorksListInterface {
  id: number,
  visit_date: string,
  visit_purpose: string,
  full_name: string,
  where_knows: string,
  birthday: string,
  phone: string,
  result: string,
  fee: string,
  fee_status: string,
  client_id: number,
  custom_path?: string
}

export interface ClientWorksListInterfaceRequest {
  success: boolean,
  message: string,
  data: ClientWorksListInterface[],
  all_items?: number
}

