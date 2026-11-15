export interface AdvocateCategoriesInterface {
  id: number,
  name: string,
  slug: string
}

export interface AdvocateCategoriesInterfaceRequest {
  success: boolean,
  message: string,
  data: AdvocateCategoriesInterface[],
  response_extras?: {
    response: string
  }
}

export interface AdvocateCategoryInterfaceRequest {
  success: boolean,
  message: string,
  data: AdvocateCategoriesInterface,
  response_extras?: {
    response: string
  }
}
