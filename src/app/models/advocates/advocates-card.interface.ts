export interface AdvocatesCardInterface {
  id: number,
  email: string,
  password: string,
  full_name: string,
  birthday: string,
  address: string,
  phone: string,
}

export interface AdvocatesCardInterfaceRequest {
  success: boolean,
  message: string,
  data: AdvocatesCardInterface
}
