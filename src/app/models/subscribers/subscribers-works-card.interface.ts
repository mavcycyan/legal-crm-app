export interface SubscribersWorksCardInterface {
  id: number,
  subscriber_id: number,
  date: string,
  what_done: {
    data: string,
    pending: boolean
  }[],
  responsible_advocate?: number
  result: string,
  fee: string,
  workers_names?: string,
  edit_path?: string
}

export interface SubscribersWorksCardInterfaceRequest {
  success: boolean,
  message: string,
  data: SubscribersWorksCardInterface
}
