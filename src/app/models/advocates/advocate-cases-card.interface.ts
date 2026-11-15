import {AdvocateWorksInterface} from "./advocate-works.interface";

export interface AdvocateCaseCardInterface {
  id: number,
  inactive?: number,
  visit_date: string,
  advocates: unknown,
  proc_num: string,
  plot: string,
  plot_big: string,
  fee: string,
  pays: {
      date: string,
      summ: number
  }[],
  result: string,
  category: string,
  advocate_id: number,
  advocate_works: AdvocateWorksInterface[]
}

export interface AdvocateCaseCardInterfaceRequest {
  success: boolean,
  message: string,
  data: AdvocateCaseCardInterface
}
