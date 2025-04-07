export interface SubscribersListInterface {
  id: Number,
  name: String,
  edrpou: Number,
  contract_date: String,
  responsible_person: String,
  contact_person_name: String,
  contact_person_phone: String,
  contact_person_full?: String,
  director_person_name: String,
  director_person_phone: String,
  director_person_full?: String,
  accountant_person_name: String,
  accountant_person_phone: String,
  accountant_person_full?: String,
  legal_address: String,
  actual_address: String,
  last_pay_date: String,
  fee: Number,
  info: String,
  pending_works?: number
}

export interface SubscribersListInterfaceRequest {
  success: Boolean,
  message: String,
  data: SubscribersListInterface[],
  all_items?: number
}
