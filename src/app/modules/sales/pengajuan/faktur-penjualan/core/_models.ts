import { ID } from "@metronic/helpers";

export type ListView = {
  no_sales_invoice: string;
  due_date: string;
  grand_total: number;
  id: string;
  sales_order: {
    id: string;
    no_sales_order: string;
  };
  sales_payment_terms: {
    id: string;
    name: string;
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
  approved_by: {
    id: string;
    name: string;
  } | null;
  approved_date: string | null;
  created_at: string;
  due_date: string;
  grand_total: number;
  id: string;
  invoice_portion: number;
  no_sales_invoice: string;
  nominal_tax: number;
  percent_income_tax: number;
  percent_tax: number;
  requested_by: {
    id: string;
    name: string;
  };
  submitted_by: {
    id: string;
    name: string;
  } | null;
  income_tax: number;
  nominal_income_tax: number;
  submitted_date: string | null;
  sales_order: {
    customer: {
      id: "f8a9865f-60eb-4029-9d1d-442b1f89ef0d";
      is_a_company: boolean;
      is_company_id: "29fd249a-fe14-4ec9-a000-4f707710078c";
      name: "Subur Jaya";
    };
    id: "c2fd9dc4-7c21-4879-849f-c4fd00aee8bf";
    no_sales_order: "SO-2";
  };
  sales_payment_terms: {
    id: string;
    name: string;
  } | null;
  retur_sales: {
    id: string;
    no_retur_sales: string;
  } | null;
  invoice_type: string;
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
