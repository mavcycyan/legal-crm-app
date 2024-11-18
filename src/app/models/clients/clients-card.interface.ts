import {ClientWorksCardInterface} from "./client-works-card.interface";

export interface ClientsCardInterface{
  id: Number,
  full_name: String,
  where_knows: String,
  birthday: String,
  address: String,
  phone: String,
  email: String,
  client_works: ClientWorksCardInterface[]
}
export interface ClientsCardInterfaceRequest{
  success: Boolean,
  message: String,
  data: ClientsCardInterface
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
