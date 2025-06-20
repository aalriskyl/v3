import {ID, Response} from '@metronic/helpers'
export type VariantGoods = {
  id?: ID
  name?: string
  category?: string
  status?: string
}

export type UsersQueryResponse = Response<Array<VariantGoods>>

export const initialUser: VariantGoods = {
  name: '',
  category: '',
  status: ''
}
