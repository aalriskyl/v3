import { ID, Response } from "@metronic/helpers";
export type Service = {
  id?: ID;
  payment_name?: string;
  invoice_portion: string;
  due_date: string;
  status: any;
};

export type Supplier = {
  id?: ID;
  name?: string;
  invoice_portion?: string;
  due_date?: any;
  credit?: string;
};

export type PaymentTerms = {
  id?: ID;
  name: string;
  invoice_portion: string;
  due_date: any;
  credit: string;
  status?: any;
};

export type UsersQueryResponse = Response<Array<Service>>;
export type SupplierResponse = Response<Array<Supplier>>;

export const initialUser: Service = {
  payment_name: "",
  invoice_portion: "",
  due_date: "",
  status: "",
};

export const initialSupplier: PaymentTerms = {
  name: "",
  invoice_portion: "",
  due_date: "",
  credit: "",
};
