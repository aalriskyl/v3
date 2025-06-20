import {ID, Response} from '@metronic/helpers'
export type Customers = {
  id?: ID
  name: string
  email: string
  phone: string
  status: boolean
  address: string
  city_id: string
  industry: string
  contact_person: string;
  is_a_company?: boolean
  is_company_id?: string
}

export type UsersQueryResponse = Response<Array<Customers>>

export const initialUser: Customers = {
  name: '',
  email: '',
  phone:'',
  status: false,
  address: '',
  industry: '',
  city_id: '',
  contact_person: ''
  
}
