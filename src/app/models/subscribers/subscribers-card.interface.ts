import {SubscribersWorksCardInterface} from "./subscribers-works-card.interface";

export interface SubscribersCardInterface {
  id: number,
  inactive?: number,
  name: string,
  edrpou: number,
  contract_date: string,
  responsible_person: string,
  responsible_person_id: string,
  contact_person_name: string,
  contact_person_phone: string,
  director_person_name: string,
  director_person_phone: string,
  legal_address: string,
  actual_address: string,
  last_pay_date: string,
  fee: number,
  info: string,
  subscriber_works: SubscribersWorksCardInterface[]
}
export interface SubscribersCardInterfaceRequest{
  success: boolean,
  message: string,
  data: SubscribersCardInterface
}
