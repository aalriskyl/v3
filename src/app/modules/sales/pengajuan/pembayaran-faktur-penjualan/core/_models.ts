import { ID } from "@metronic/helpers";

type SupplierData = {
  name: string;
  phone?: string;
  email: string;
  contact_person: string;
  address: string;
  city_id: string;
  industry: string;
};

export type ListView = {
  amount: number;
  id: string;
  no_payment_sales_invoice: string;
  sales_invoice: {
    grand_total: number;
    id: string;
    no_sales_invoice: string;
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

export type DetailView = {
  amount: number;
  approved_by: {
    id: string;
    name: string;
  };
  coa_payment: {
    id: string;
    name: string;
    no_account: string;
  };
  approved_date: null | string;
  created_at: string;
  id: string;
  no_payment_sales_invoice: string;
  payment_purchase_invoice: null | {
    id: string;
    no_payment_purchase_invoice: string;
  };
  posting_date: string;
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
    due_date: string;
    grand_total: number;
    id: string;
    invoice_portion: number;
    no_sales_invoice: string;
    nominal_tax: number;
    percent_tax: number;
    percent_income_tax: number;
    nominal_income_tax: number;
    sales_payment_terms: {
      due_date: string;
      id: string;
      invoice_portion: number;
      name: string;
    };
    sub_total: number;
    sub_total_material: number;
    sub_total_service: number;
    sub_total_tax: number;
    total_ceil: number;
    total_paid: number;
    total_purchase_material: number;
    total_purchase_service: number;
  };
  sales_payment_terms: {
    due_date: string;
    id: string;
    invoice_portion: number;
    name: string;
  } | null;
  status: string;
};
