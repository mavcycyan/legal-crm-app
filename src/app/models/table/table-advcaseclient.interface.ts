export interface TableAdvcaseclientInterface {
  case: {
    id: number,
    visit_date: string,
    advocates: unknown,
    proc_num: string,
    plot: string,
    plot_big: string,
    fee: number,
    result: string,
    advocate_id: number,
    advocate_name?: string,
    advocates_names?: string,
  },
  clients: {
    full_name: string,
    where_knows: string,
    birthday: string,
    address: string,
    phone: string,
    email: string,
  }[]
}

export interface TableAdvcaseclientInterfaceRequest {
  success: boolean,
  message: string,
  data: TableAdvcaseclientInterface
}
