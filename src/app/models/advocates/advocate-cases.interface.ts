export interface AdvocateCasesInterface {
  id: Number,
  visit_date: String,
  advocates: any,
  proc_num: String,
  plot: String,
  fee: String,
  pays: {
      date: String,
      summ: Number
  }[],
  result: String,
  category: String,
  advocate_id: Number,
  advocate_name?: string,
  client_name?: string
}

export interface AdvocateCasesInterfaceRequest {
  success: Boolean,
  message: String,
  data: AdvocateCasesInterface[],
  all_items?: number
}

export interface AdvocateCaseInterfaceRequest {
  success: Boolean,
  message: String,
  data: AdvocateCasesInterface
}
