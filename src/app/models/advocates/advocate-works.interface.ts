export interface AdvocateWorksInterface {
  id: number,
  advocate_case_id: Number,
  date: String,
  name: string,
  what_done: {
    data: String,
    pending: Boolean
  }[],
  result: String,
  workers_names?: string,
  edit_path?: String
}



export interface AdvocateWorksInterfaceRequest {
  success: Boolean,
  message: String,
  data: AdvocateWorksInterface
}

export interface AdvocateWorksListInterfaceRequest {
  success: Boolean,
  message: String,
  data: AdvocateWorksInterface[],
  all_items?: number
}
