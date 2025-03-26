export interface SubscribersWorksListInterface {
  id?: number,
  subscriber_id: number,
  date: String,
  what_done: {
    data: String,
    pending: Boolean
  }[],
  responsible_advocate?: Number
  result: String,
  workers_names?: string,
  fee: string
}

export interface SubscribersWorksListInterfaceRequest {
  success: Boolean,
  message: String,
  data: SubscribersWorksListInterface[],
  all_items?: number
}
