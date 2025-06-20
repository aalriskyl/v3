import {ID, Response} from '@metronic/helpers'
export type Pegawai = {
  id?: ID
  name?: string
  email?: string
  gender?: string
  birth_date?: string
  address_ktp?: string
  address_domicile?:string
  phone?:string
  marital_status?:string
  religion?: string
  last_education?:string
  join_date?: string
  bank?: string
  no_bank?: string
  emp_status?: string
  contract_type?:string
  name_emergency_phone?:string
  emergency_phone?:string
  photo?: File
  position_id?: string
  company_id?: string
}

export type UsersQueryResponse = Response<Array<Pegawai>>

export const initialUser:Pegawai = {
  name: '',
  email: '',
  gender: '',
  birth_date: '',
  address_ktp: '',
  address_domicile:'',
  phone:'',
  marital_status:'',
  religion: '',
  last_education:'',
  join_date: '',
  bank: '',
  no_bank: '',
  emp_status: '',
  contract_type:'',
  name_emergency_phone:'',
  emergency_phone:'',
  photo: new File([], ''), // File kosong sebagai nilai default
  position_id: '',
  company_id: '',
}
