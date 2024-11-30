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
  repdata?: {
    data: string,
    pending: boolean
  }[]
}
