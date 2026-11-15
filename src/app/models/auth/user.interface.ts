export interface UserInterface {
  id?: number,
  name: string,
  email: string,
  password: string,
  birthday: string,
  address: string,
  phone: string,
  role_id: number,
  certificate_num?: string,
  certificate_place?: string,
  inactive?: number
}

export interface UserInterfaceRequest {
  success: boolean,
  message: string,
  data: UserInterface
}

export interface UsersInterfaceRequest {
  success: boolean,
  message: string,
  data: UserInterface[],
  all_items?: number
}
