import {ID, Response} from '@metronic/helpers'
export type Service = {
  id?: ID
  name?: string
  category_name: string
  brand?: string
  description?: string
  status?: boolean
}

export type Supplier = {
  id?: ID
  supplier: {
    name: string;
  }
  buy_price?: number
  skala_prioritas?: string
  set_default?: string
}

export type UsersQueryResponse = Response<Array<Service>>
export type SupplierResponse = Response<Array<Supplier>>


export const initialUser: Service = {
  name: '',
  category_name: '',
  brand: '',
  description: '',
  status: false,
}

export const initialSupplier: Supplier = {
  supplier: {
    name: "",
  },
  buy_price: 0,
};
