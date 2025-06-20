export type ListView = {
  approved_date: null | string;
  delivery_note: null | {
    id: string;
    no_delivery_note: string;
  };
  id: string;
  no_retur_sales: string;
  retur_option: string;
  retur_purchase: null | {
    id: string;
    no_retur_purchase: string;
  };
  sales_order: {
    id: string;
    no_sales_order: string;
  };
  status: string;
};
const awdwad = {
  approved_date: null,
  delivery_note: {
    id: "9a338958-dbce-45da-90b9-a38ea42a4ddf",
    no_delivery_note: "DN-4",
  },
  id: "26ba34da-7b35-480c-8184-f86a2ec3540f",
  no_retur_purchase: "ReturSales-7",
  retur_option: "Barang",
  retur_purchase: null,
  sales_order: {
    id: "0f5177ae-4e35-4916-bdd3-6f49b1310ba8",
    no_sales_order: "SO-5",
  },
  status: "Draft",
};

export type DetailView = {
  retur_option: string;
  created_at: string;
  approved_by: null | {
    id: string;
    name: string;
  };
  approved_date: null | string;
  delivery_note: null | {
    id: string;
    no_delivery_note: string;
  };
  id: string;
  no_retur_sales: string;
  requested_by: {
    id: string;
    name: string;
  };
  retur_purchase: {
    id: string;
    no_retur_purchase: string;
  } | null;
  sales_order: {
    id: string;
    no_sales_order: string;
  };
  status: string;
  submitted_by: null | {
    id: string;
    name: string;
  };
  submitted_date: null | string;
  total_price: number;
};
