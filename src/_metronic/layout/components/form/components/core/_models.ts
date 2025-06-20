import {ID, Response} from '@metronic/helpers'
export type Pegawai = {
  id?: ID
  name?: string
  status?: string
}

export type UsersQueryResponse = Response<Array<Pegawai>>

export const initialUser:Pegawai = {
  name: '',
  status: '',
}
