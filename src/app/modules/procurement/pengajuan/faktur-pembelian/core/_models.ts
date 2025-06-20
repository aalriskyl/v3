import { ID } from "@metronic/helpers";

export type ListView = {
  no_purchase_invoice: string;
  due_date: string;
  grand_total: number;
  id: string;
  purchase_order: {
    id: string;
    no_purchase_order: string;
  };
  purchase_payment_terms: any | null;
  sales_invoice: {
    id: string;
    no_sales_invoice: string;
  };
  status: string;
  status_payment: string;
};

export type ModuleView = {
  id?: ID;
  material: string;
  jumlah: number;
  satuan_uom: string;
  harga: number;
};

export type DetailView = {
  type: any;
  approved_by: null | any;
  approved_date: null | any;
  created_at: string;
  due_date: string;
  invoice_type: string;
  grand_total: number;
  id: string;
  income_tax: number;
  invoice_portion: number;
  no_purchase_invoice: string;
  nominal_tax: number;
  percent_tax: number;
  nominal_income_tax: number;
  percent_income_tax: number;
  purchase_order: {
    id: string;
    no_purchase_order: string;
    supplier: {
      id: string;
      is_a_company: boolean;
      is_company_id: string;
      name: string;
    };
  };
  purchase_payment_terms: {
    id: string;
    name: string;
  };
  requested_by: {
    id: string;
    name: string;
  };
  submitted_by: {
    id: string;
    name: string;
  } | null;
  submitted_date: string | null;
  sales_invoice: {
    id: string;
    no_sales_invoice: string;
  } | null;
  retur_purchase: {
    id: string | null;
    no_retur_purchase: string;
  } | null;
  status: string;
  status_payment: string;
  sub_total: number;
  sub_total_material: number;
  sub_total_service: number;
  sub_total_tax: number;
  total_ceil: number;
  total_paid: number;
  total_purchase_material: number;
  total_purchase_service: number;
};
