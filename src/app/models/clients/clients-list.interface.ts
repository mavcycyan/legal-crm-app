export interface ClientsListInterface {
  id: Number,
  full_name: String,
  where_knows: String,
  birthday: String,
  address: String,
  phone: String,
}

export interface ClientsListWorkInterface {
  id: Number,
  full_name: String,
  where_knows: String,
  birthday: String,
  address: String,
  phone: String,
  visit_date: String,
  visit_purpose: String,
  what_done: String[],
  result: String,
  fee: String
}
