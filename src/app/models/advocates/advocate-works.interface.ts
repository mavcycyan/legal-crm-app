export interface AdvocateWorksInterface {
  advocate_case_id: Number,
  date: String,
  what_done: {
    data: String,
    pending: Boolean
  }[],
  result: String
}



export interface AdvocateWorksInterfaceRequest {
  success: Boolean,
  message: String,
  data: AdvocateWorksInterface
}
