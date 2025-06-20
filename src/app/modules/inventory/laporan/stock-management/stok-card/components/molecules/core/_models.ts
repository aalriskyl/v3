import {ID, Response} from '@metronic/helpers'
export type Model= {
  id?: ID
  // entry_number: number | undefined
  // type: string
  // status: string
  material: string
  warehouse: string
  stock: number
  quantity: number
  uom: string
  date: string

}

export type UomSection = {
  id?: ID;
  material: {
    id: string;
    name: string;
  };
  material_uom: {
    uom_actual: {
      id: string;
      name: string;
    };
  };
  amount: number;
};

export type UsersQueryResponse = Response<Array<Model>>
 
export const initialUser: Model = {
  // entry_number: undefined,
  // type: '',
  // status: '',
  material: '',
  warehouse: '',
  stock: 0,
  quantity: 0,
  uom: '',
  date: '',
}
