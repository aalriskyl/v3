import { ID, Response } from "@metronic/helpers";
export type Model = {
  id: string;
  warehouse: string;
  material: string;
  amount: number;
  uom: string;
};
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

export type UsersQueryResponse = Response<Array<Model>>;

export const initialUser: Model = {
  // entry_number: undefined,
  // type: '',
  // status: '',
  material: "",
  warehouse: "",
  uom: "",
  amount: 12,
  id: "",
};
