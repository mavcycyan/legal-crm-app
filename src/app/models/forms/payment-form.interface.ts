export interface PaymentFormInterface {
  id: number,
  date: string,
  date_end: string|null,
  price: string,
  name?: string,
  deadlines?: {
    date: string,
    fee: string
  }[],
  client_work_id: number,
  payments?: PaymentFormPayInterface[]
}
export interface PaymentFormPayInterface {
  id: number,
  date: string,
  amount: string,
  fin_client_work_price_id: number
}
export interface PaymentFormInterfaceRequest {
  success: Boolean,
  message: String,
  data: PaymentFormInterface[]
}
