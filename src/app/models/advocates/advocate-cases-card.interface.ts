import {AdvocateWorksInterface} from "./advocate-works.interface";

export interface AdvocateCaseCardInterface {
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
  advocate_works: AdvocateWorksInterface[]
}

export interface AdvocateCaseCardInterfaceRequest {
  success: Boolean,
  message: String,
  data: AdvocateCaseCardInterface
}
