import {ID, Response} from '@metronic/helpers'
export type Category = {
  id?: ID
  name: string
  product_type_id: number | null
  product_type_name: string
  status: boolean
}

export type UsersQueryResponse = Response<Array<Category>>

export const initialUser: Category = {
  name: '',
  product_type_id: null,
  product_type_name: '',
  status: false
}
