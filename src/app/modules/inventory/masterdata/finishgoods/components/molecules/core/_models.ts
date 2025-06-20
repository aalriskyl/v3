import {ID, Response} from '@metronic/helpers'
export type Goods = {
  id?: ID
  name?: string
  category?: string
  status?: boolean
}

export type UsersQueryResponse = Response<Array<Goods>>

export const initialUser: Goods = {
  name: '',
  category: '',
  status: undefined
}
