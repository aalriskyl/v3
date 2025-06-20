import {ID, Response} from '@metronic/helpers'
export type Brand = {
  id?: ID
  name?: string
  status?: boolean
  pictureUrl?: any
  description?: string
}

export type UsersQueryResponse = Response<Array<Brand>>

export const initialUser: Brand = {
  name: '',
  status:false,
  pictureUrl: '',
  description: ''
}
