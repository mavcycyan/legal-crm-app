export interface SubscribersWorksListInterface {
  id?: number,
  subscriber_id: number,
  date: string,
  what_done: {
    data: string,
    pending: boolean
  }[],
  responsible_advocate?: number
  result: string,
  workers_names?: string,
  fee: string
}

export interface SubscribersWorksListInterfaceRequest {
  success: boolean,
  message: string,
  data: SubscribersWorksListInterface[],
  all_items?: number
}
