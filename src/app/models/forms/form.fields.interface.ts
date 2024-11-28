export interface FormFieldsInterface {
  slug: string,
  name: string,
  class?: string,
  type: string,
  choises?: {
    label: string,
    value: string
  }[]
}
