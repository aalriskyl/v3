import {ID, Response} from '@metronic/helpers'
export type Suppliers = {
  id?: ID
  name: string
  email: string
  phone: string
  status: boolean
  address: string
  city_id: string
  industry: string
  contact_person: string;
  is_a_company: boolean;
  is_company_id: string;
}

export type UsersQueryResponse = Response<Array<Suppliers>>

export const initialUser: Suppliers = {
  name: '',
  email: '',
  phone:'',
  status: true,
  address: '',
  industry: '',
  city_id: '',
  contact_person: '',
  is_a_company: false,
  is_company_id: ''
}
