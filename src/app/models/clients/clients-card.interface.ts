import {ClientWorksCardInterface} from "./client-works-card.interface";

export interface ClientsCardInterface{
  id: Number,
  full_name: String,
  where_knows: String,
  birthday: String,
  address: String,
  phone: String,
  email: String,
  worker?: string,
  client_works?: ClientWorksCardInterface[]
}
export interface ClientsCardInterfaceRequest{
  success: Boolean,
  message: String,
  data: ClientsCardInterface
}
