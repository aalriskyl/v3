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
  service: {
    name: string;
  }
  material: {
    name: string
  }
  material_uom:{
    uom_actual: {
      name: string;
    }

  };
  quantity: number;
  supplier_id: any;
  status: string;
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

// export const initialMaterial: MaterialModel = {
//   material: '',
//   uom: '',
//   quantity: 0,
// };