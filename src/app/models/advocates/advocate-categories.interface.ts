export interface AdvocateCategoriesInterface {
  id: Number,
  name: String,
  slug: String
}

export interface AdvocateCategoriesInterfaceRequest {
  success: Boolean,
  message: String,
  data: AdvocateCategoriesInterface[],
  response_extras?: {
    response: string
  }
}

export interface AdvocateCategoryInterfaceRequest {
  success: Boolean,
  message: String,
  data: AdvocateCategoriesInterface,
  response_extras?: {
    response: string
  }
}
