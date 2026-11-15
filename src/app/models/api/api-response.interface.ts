export interface ApiResponseInterface<T = unknown> {
  success: boolean,
  message?: string,
  data: T
}

export interface ApiEntityRefInterface {
  id: number
}

export type ApiSaveResponseInterface = ApiResponseInterface<ApiEntityRefInterface>;

// Raw form value sent to the API as is
export type FormPayloadInterface = Record<string, unknown>;

// Query string params for list requests (pagination, sorting, filters, search)
export interface QueryParamsInterface {
  pag_size?: number,
  pag_offset?: number,
  sort_dir?: string,
  sort_field?: string,
  with_pending?: string,
  filt_result?: string,
  filtcust_pending?: string,
  // dynamic search params: srch_<field>
  [key: string]: string|number|undefined
}

// Event emitted by pagination, filter and search components
export interface PageEventInterface {
  name: string,
  value: string
}
