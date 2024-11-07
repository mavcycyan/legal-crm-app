export interface ClientsCardInterface{
  id: Number,
  full_name: String,
  where_knows: String,
  birthday: String,
  address: String,
  phone: String,
  email: String,
}
export interface ClientsCardWorkListInterface {
  id: Number,
  full_name: String,
  where_knows: String,
  birthday: String,
  address: String,
  phone: String,
  visit_date: String,
  visit_purpose: String,
  what_done: {
    data: String,
    pending: Boolean
  }[],
  result: String,
  fee: String
}
