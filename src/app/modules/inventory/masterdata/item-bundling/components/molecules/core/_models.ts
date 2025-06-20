import {ID, Response} from '@metronic/helpers'
export type ItemBundling = {
  id?: ID
  name: string
  total_price: string
  status?:boolean
}

export type UsersQueryResponse = Response<Array<ItemBundling>>

export const initialUser: ItemBundling = {
  name: '',
  total_price: '',
  status: false
}
