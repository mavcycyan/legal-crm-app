export interface TablePaymentInterface {
  id: number,
  date: string,
  date_end: string|null,
  price: string,
  status?: string,
  name?: string,
  info?: string,
  deadlines?: {
    date: string,
    fee: string
  }[],
  client_work_id: number,
  payments?: TablePaymentPayInterface[]
}
export interface TablePaymentPayInterface {
  id: number,
  date: string,
  amount: string,
  amount_currency?: string,
  amount_currency_val?: string,
  fin_client_work_price_id: number
}
export interface TablePaymentInterfaceRequest {
  success: boolean,
  message: string,
  data: TablePaymentInterface[]
}
