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
  choises_dd?: FormFieldChoiseDdInterface[],
  repdata?: FormRepDataInterface[]
}

export interface FormFieldChoiseDdInterface {
  description: string,
  id: string
}

export interface FormRepDataInterface {
  data: string,
  pending: boolean
}

// Entity data passed to app-edit-form; other fields are read by field slug
export interface EditFormDataInterface {
  id?: number,
  role_id?: number
}
