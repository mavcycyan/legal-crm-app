export interface UserInterface {
  id?: number,
  name: string,
  email: string,
  password: string,
  birthday: string,
  address: string,
  phone: string,
  role_id: number
}

export interface UserInterfaceRequest {
  success: Boolean,
  message: String,
  data: UserInterface
}

export interface UsersInterfaceRequest {
  success: Boolean,
  message: String,
  data: UserInterface[],
  all_items?: number
}
