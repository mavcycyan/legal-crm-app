export interface SubscribersListInterface {
  id: number,
  name: string,
  edrpou: number,
  contract_date: string,
  responsible_person: string,
  contact_person_name: string,
  contact_person_phone: string,
  contact_person_full?: string,
  director_person_name: string,
  director_person_phone: string,
  director_person_full?: string,
  accountant_person_name: string,
  accountant_person_phone: string,
  accountant_person_full?: string,
  legal_address: string,
  actual_address: string,
  last_pay_date: string,
  fee: number,
  info: string,
  pending_works?: number
}

export interface SubscribersListInterfaceRequest {
  success: boolean,
  message: string,
  data: SubscribersListInterface[],
  all_items?: number
}
