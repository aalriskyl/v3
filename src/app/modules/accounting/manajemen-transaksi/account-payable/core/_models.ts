import { ID } from "@metronic/helpers";

export type ListView = {
  id: string;
  purchase_order: {
    id: string;
    no_purchase_order: string;
  };
  status: string;
};

export type DetailView = {
  created_at?: string
  approved_by: any;
  approved_date: any;
  submitted_date: any;
  id: string;
  purchase_order: {
    id: string;
    no_purchase_order: string;
  };
  request_by: {
    id: string;
    name: string;
  };
  status: string;
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
