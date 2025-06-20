import { ID } from "@metronic/helpers";

export type ListView = {
  id: string;
  sales_order: {
    id: string;
    no_sales_order: string;
  };
  status: string;
};

export type DetailView = {
  percent_tax: number;
  purchase_order: {
    id: string;
    name: string;
  };
  percent_income_tax: number;
  submitted_date: null | string;
  created_at: string;
  approved_by: {
    name: string;
  };
  approved_date: null | string;
  id: string;
  sales_order: {
    id: string;
    no_sales_order: string;
    purchase_order_id: string;
  };
  request_by: {
    id: string;
    name: string;
  };
  status: string;
  submitted_by: {
    name: string;
  };
};

export type ModuleView = {
  id?: ID;
  material: string;
  jumlah: number;
  satuan_uom: string;
  harga: number;
};

export type PaymentTermsType = {
  id: string;
  name: string;
  invoice_portion: number;
  due_date: string;
  credit: number;
  description: null | string;
  account_payable_id: string;
  company_id: string;
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
};
