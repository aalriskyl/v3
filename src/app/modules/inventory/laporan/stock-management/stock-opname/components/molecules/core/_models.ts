import { ID, Response } from '@metronic/helpers';

export type Model = {
  id?: ID;
  opname_date: string;
  approved_by: string;
  request_by: string;
  status: string;
  material: string;
  uom: string;
  actual_stock: number;
  note: string;
};

export type UsersQueryResponse = Response<Array<Model>>;

export const initialUser: Model = {
  opname_date: '',
  approved_by: '',
  request_by: '',
  status: '',
  material: '',
  uom: '',
  actual_stock: 0,
  note: '',
};