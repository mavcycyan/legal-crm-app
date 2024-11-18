import {SubscribersWorksCardInterface} from "./subscribers-works-card.interface";

export interface SubscribersCardInterface {
  id: Number,
  name: String,
  edrpou: Number,
  contract_date: String,
  responsible_person: String,
  contact_person_name: String,
  contact_person_phone: String,
  director_person_name: String,
  director_person_phone: String,
  legal_address: String,
  actual_address: String,
  last_pay_date: String,
  fee: Number,
  info: String,
  subscriber_works: SubscribersWorksCardInterface[]
}
export interface SubscribersCardInterfaceRequest{
  success: Boolean,
  message: String,
  data: SubscribersCardInterface
}
