import {ID, Response} from '@metronic/helpers'
export type Schema = {
  id?: ID
  name?: string
  status?: string
}

export type UsersQueryResponse = Response<Array<Schema>>

export const initialUser: Schema = {
  name: '',
  status: '',
}
