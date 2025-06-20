import {ID, Response} from '@metronic/helpers'
export type Customer = {
  id?: ID
  Name: string
  Email: string
  Phone: string
  status: boolean
}

export type UsersQueryResponse = Response<Array<Customer>>

// export const initialUser: Customer = {
//   Name: '',
//   status: false,
//   product_type_name: ''
// }
