import {ID, Response} from '@metronic/helpers'
export type Company = {
  id?: ID
  name: string;
  type: string;
  owner: string;
  status?: boolean;
  address?: string;
}

export type UsersQueryResponse = Response<Array<Company>>

export const initialUser: Company = {
  name: '',
  type: '',
  owner: '',
  status: false,
  address: '',
}
