export interface AdvocatesListInterface {
  id: Number,
  email: String,
  password: String,
  name: String,
  birthday: String,
  address: String,
  phone: String,
}

export interface AdvocatesListInterfaceRequest {
  success: Boolean,
  message: String,
  data: AdvocatesListInterface[],
  all_items?: number
}
