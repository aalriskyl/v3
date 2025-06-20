import { ID, Response } from '@metronic/helpers';

export type Model = {
  id?: ID;
  material_request_number: string;
  status: string;
  plan_production: string;
  supplier: string;
  request_by: string;
  approved_by: string;
};

export type MaterialModel = {
  id?: ID;
  material: string;
  uom: string;
  jumlah: number;
};

export type UsersQueryResponse = Response<Array<Model>>;
export type MaterialsQueryResponse = Response<Array<MaterialModel>>;

export const initialModel: Model = {
  material_request_number: '',
  status: '',
  plan_production: '',
  supplier: '',
  request_by: '',
  approved_by: '',
};

export const initialMaterial: MaterialModel = {
  material: '',
  uom: '',
  jumlah: 0,
};