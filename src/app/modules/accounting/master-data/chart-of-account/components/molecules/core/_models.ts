import {ID, Response} from '@metronic/helpers'
export type Service = {
  id?: ID
  name?: string
  nomor_akun: string
  status: any

}

export type Supplier = {
  id?: ID
  supplier?: string
  harga_beli?: string
  harga_jual?: string
  skala_prioritas?: string
  set_default?: string
}

export type UsersQueryResponse = Response<Array<Service>>
export type SupplierResponse = Response<Array<Supplier>>


export const initialUser: Service = {
  name: '',
  nomor_akun: '',
  status: '',
}

export const initialSupplier: Supplier = {
  supplier: '',
  harga_beli: '',
  harga_jual: '',
  skala_prioritas: '',
  set_default: '',
}
