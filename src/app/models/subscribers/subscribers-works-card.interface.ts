export interface SubscribersWorksCardInterface {
  subscriber_id: number,
  date: String,
  what_done: {
    data: String,
    pending: Boolean
  }[],
  responsible_advocate?: Number
  result: String
}
