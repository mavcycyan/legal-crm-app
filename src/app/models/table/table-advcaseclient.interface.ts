export interface TableAdvcaseclientInterface {
  case: {
    id: number,
    visit_date: string,
    advocates: any,
    proc_num: string,
    plot: string,
    plot_big: string,
    fee: number,
    result: string,
    advocate_id: number,
    advocate_name?: string,
    advocates_names?: string,
  },
  client: {
    full_name: string,
    where_knows: string,
    birthday: string,
    address: string,
    phone: string,
    email: string,
  }
}

export interface TableAdvcaseclientInterfaceRequest {
  success: Boolean,
  message: String,
  data: TableAdvcaseclientInterface
}
