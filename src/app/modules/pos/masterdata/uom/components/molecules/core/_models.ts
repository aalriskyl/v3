import {ID, Response} from '@metronic/helpers'
export type Uom = {
  id?: ID
  name?: string
  status?: boolean
}

export type UsersQueryResponse = Response<Array<Uom>>

export const initialUser: Uom = {
  name: '',
  status: true,
}
