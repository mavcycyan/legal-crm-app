export interface AdvocatesListInterface {
  id: number,
  email: string,
  password: string,
  name: string,
  birthday: string,
  address: string,
  phone: string,
}

export interface AdvocatesListInterfaceRequest {
  success: boolean,
  message: string,
  data: AdvocatesListInterface[],
  all_items?: number
}
