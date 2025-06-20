import { ID, Response } from "@metronic/helpers";
export type Gudang = {
  id: string;
  name: string;
  address: string;
  company_id: string;
};

export type UsersQueryResponse = Response<Array<Gudang>>;

export const initialUser: Gudang = {
  id: "",
  name: "",
  address: "",
  company_id: "",
};
