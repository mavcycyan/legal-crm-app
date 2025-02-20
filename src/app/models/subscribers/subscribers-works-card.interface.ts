export interface SubscribersWorksCardInterface {
  id: number,
  subscriber_id: number,
  date: String,
  what_done: {
    data: String,
    pending: Boolean
  }[],
  responsible_advocate?: Number
  result: String,
  fee: String,
  edit_path?: String
}

export interface SubscribersWorksCardInterfaceRequest {
  success: Boolean,
  message: String,
  data: SubscribersWorksCardInterface
}
