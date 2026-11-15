import {ClientWorksCardInterface} from "./client-works-card.interface";

export interface ClientsCardInterface{
  id: number,
  full_name: string,
  where_knows: string,
  birthday: string,
  address: string,
  phone: string,
  email: string,
  worker?: string,
  review?: string,
  client_works?: ClientWorksCardInterface[],
  inactive?: number
}
export interface ClientsCardInterfaceRequest{
  success: boolean,
  message: string,
  data: ClientsCardInterface
}
