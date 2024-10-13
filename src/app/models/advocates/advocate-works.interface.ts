export interface AdvocateWorksInterface {
  case_id: Number,
  date: String,
  what_done: {
    data: String,
    pending: Boolean
  }[],
  result: String
}
