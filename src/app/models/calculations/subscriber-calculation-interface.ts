export interface SubscriberCalculationInterface {
  subscribers: SubscriberCalculationSubInterface[],
  calculations: SubscriberCalculationDataInterface[],
  current_month_data: SubscriberCalculationDataInterface[]
}
export interface SubscriberCalculationInterfaceRequest {
  success: Boolean,
  message: String,
  data: SubscriberCalculationInterface,
  all_items?: number
}

export interface SubscriberCalculationSubInterface {
  id?: number,
  name: string,
  holder: string,
  fee: string,
  inactive?: number,
  stop_reason?: string
}

export interface SubscriberCalculationDataInterface {
  id: number,
  chalk: string,
  payments: {
    date: string,
    amount: string
  }[],
  date: string,
  subscriber_id: number
}

export interface SubscriberCalculationResultInterface {
  id?: number,
  chalk: string,
  payments: {
    date: string,
    amount: string
  }[],
  state: string,
  subscriber_id?: number,
  inactive?: number
}
