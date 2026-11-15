export interface AdvocateWorksInterface {
  id: number,
  advocate_case_id: number,
  date: string,
  name: string,
  what_done: {
    data: string,
    pending: boolean
  }[],
  result: string,
  workers_names?: string,
  edit_path?: string
}



export interface AdvocateWorksInterfaceRequest {
  success: boolean,
  message: string,
  data: AdvocateWorksInterface
}

export interface AdvocateWorksListInterfaceRequest {
  success: boolean,
  message: string,
  data: AdvocateWorksInterface[],
  all_items?: number
}
