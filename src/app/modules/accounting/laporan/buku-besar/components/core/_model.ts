import { ID } from "@metronic/helpers";

export type ListDataType = {
    id: ID
    status?: any;
    coa_id: string;
};

export type DetailDataType = {
    id: ID;
    amount: number;
    saldo_awal: number;
    saldo_akhir: number;
    type: string;
    sales_invoice_id: string | null;
    purchase_invoice_id: string | null;
    payment_sales_invoice_id: string | null;
    payment_purchase_invoice_id: string | null;
    sales_invoice: {
      no_sales_invoice: string;
    } | null;
    purchase_invoice: {
      no_purchase_invoice: string;
    } | null;
    payment_sales_invoice: {
      no_payment_sales_invoice: string;
    } | null;
    payment_purchase_invoice: {
      no_payment_purchase_invoice: string;
    } | null;
    created_at: string;
    updated_at: string;
    coa: {
      id: string;
      no_account: string;
      name: string;
      type: string;
    };
  };
