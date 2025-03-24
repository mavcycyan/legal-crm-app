export interface FormFieldsInterface {
  slug: string,
  name: string,
  class?: string,
  type: string,
  required: boolean,
  choises?: {
    label: string,
    value: string
  }[],
  choises_dd?: {
    description: string,
    id: string
  }[],
  repdata?: {
    data: string,
    pending: boolean
  }[]
}
