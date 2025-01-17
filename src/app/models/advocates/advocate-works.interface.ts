export interface AdvocateWorksInterface {
  id: number,
  advocate_case_id: Number,
  date: String,
  what_done: {
    data: String,
    pending: Boolean
  }[],
  result: String,
  edit_path?: String
}



export interface AdvocateWorksInterfaceRequest {
  success: Boolean,
  message: String,
  data: AdvocateWorksInterface
}
