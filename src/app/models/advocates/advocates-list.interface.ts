export interface AdvocatesListInterface {
  id: Number,
  email: String,
  password: String,
  full_name: String,
  birthday: String,
  address: String,
  phone: String,
}

export interface AdvocatesListInterfaceRequest {
  success: Boolean,
  message: String,
  data: AdvocatesListInterface[]
}
