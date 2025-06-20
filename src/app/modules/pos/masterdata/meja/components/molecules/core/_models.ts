import {ID, Response} from '@metronic/helpers'
export type Category = {
  id?: ID
  Name: string
  product_type_name: string
  status: boolean
}

export type UsersQueryResponse = Response<Array<Category>>

export const initialUser: Category = {
  Name: '',
  status: false,
  product_type_name: ''
}
