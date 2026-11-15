export interface AdvocateCasesInterface {
  id: number,
  visit_date: string,
  advocates: unknown,
  proc_num: string,
  plot: string,
  fee: string,
  pays: {
      date: string,
      summ: number
  }[],
  result: string,
  category: string,
  advocate_id: number,
  advocate_name?: string,
  advocates_names?: string,
  client_name?: string,
  clients_names?: string
}

export interface AdvocateCasesInterfaceRequest {
  success: boolean,
  message: string,
  data: AdvocateCasesInterface[],
  all_items?: number,
  response_extras?: {
    response: string
  }
}

export interface AdvocateCaseInterfaceRequest {
  success: boolean,
  message: string,
  data: AdvocateCasesInterface
}
