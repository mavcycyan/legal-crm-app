export interface PaymentFormInterface {
  id?: number,
  date: string,
  date_end: string|null,
  price: string,
  status?: string,
  price_cur: string,
  name?: string,
  info?: string,
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
  amount_currency?: string,
  amount_currency_val?: string,
  fin_client_work_price_id: number
}
export interface PaymentFormInterfaceRequest {
  success: boolean,
  message: string,
  data: PaymentFormInterface[]
}
