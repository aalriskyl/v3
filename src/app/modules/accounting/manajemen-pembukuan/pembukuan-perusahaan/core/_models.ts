import { ID } from "@metronic/helpers";

export type ListView = {
  id: string;
  purchase_order: {
    id: string;
    no_purchase_order: string;
  };
  status: string;
};

type CoaType = {
  id: string;
  no_account: string;
  name: string;
  type: string;
  parent_account_id: null | any;
  status: boolean;
  childs_accounts: null | any;
  parent_account: null | any;
  company_id: string;
  company: {
    id: string;
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null | any;
    name: string;
    type: string;
    address: string;
    owner: string;
    status: boolean;
    materials: null | any;
    services: null | any;
    finish_goods: null | any;
    item_bundlings: null | any;
    brands: null | any;
    categories: null | any;
    suppliers: null | any;
    customers: null | any;
    stock_entries: null | any;
    plan_productions: null | any;
    material_requests: null | any;
    stock_hitories: null | any;
    company_employee: null | any;
    suppliers_from: null | any;
    customers_from: null | any;
    purchase_orders: null | any;
    sales_orders: null | any;
    warehouses: null | any;
    received_notes: null | any;
    delivery_notes: null | any;
    vouchers: null | any;
    account_payables: null | any;
    purchase_payment_terms: null | any;
    account_receivables: null | any;
    sales_payment_terms: null | any;
    sales_invoices: null | any;
    purchase_invoices: null | any;
    payment_purchase_invoices: null | any;
    payment_sales_invoices: null | any;
    coa_transactions: null | any;
  };
  coa_transactions: null | any;
  coa_payment_sales_invoices: null | any;
  coa_payment_purchase_invoices: null | any;
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | any;
};

type CompanyType = {
  id: string;
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | any;
  name: string;
  type: string;
  address: string;
  owner: string;
  status: boolean;
  materials: null | any;
  services: null | any;
  finish_goods: null | any;
  item_bundlings: null | any;
  brands: null | any;
  categories: null | any;
  suppliers: null | any;
  customers: null | any;
  stock_entries: null | any;
  plan_productions: null | any;
  material_requests: null | any;
  stock_hitories: null | any;
  company_employee: null | any;
  suppliers_from: null | any;
  customers_from: null | any;
  purchase_orders: null | any;
  sales_orders: null | any;
  warehouses: null | any;
  received_notes: null | any;
  delivery_notes: null | any;
  vouchers: null | any;
  account_payables: null | any;
  purchase_payment_terms: null | any;
  account_receivables: null | any;
  sales_payment_terms: null | any;
  sales_invoices: null | any;
  purchase_invoices: null | any;
  payment_purchase_invoices: null | any;
  payment_sales_invoices: null | any;
  coa_transactions: null | any;
};

export type DetailView = {
  id: string;
  company_id: string;
  company: CompanyType;
  tax: number;
  income_tax: number;

  coa_sell_income_tax: CoaType;
  coa_buy_income_tax: CoaType;
  coa_material_id: string;
  coa_service_id: string;
  coa_sell_tax_id: string;
  coa_buy_tax_id: string;
  coa_ceil_id: string;
  coa_debt_id: string;
  coa_receivable_id: string;
  coa_payment_method_id: string;
  coa_material: CoaType;
  coa_service: CoaType;
  coa_sell_tax: CoaType;
  coa_buy_tax: CoaType;
  coa_ceil: CoaType;
  coa_debt: CoaType;
  coa_receivable: CoaType;
  coa_payment_method: CoaType;
  coa_retur_sales_id: string;
  coa_retur_purchase_id: string;
  coa_retur_sales: {
    name: string;
  };
  coa_retur_purchase: {
    name: string;
  };
};

const awdwad = {
  id: "8956ff39-a86c-4bf5-b512-5e35d008575f",
  company_id: "29fd249a-fe14-4ec9-a000-4f707710078c",
  company: {
    id: "29fd249a-fe14-4ec9-a000-4f707710078c",
    ID: 0,
    CreatedAt: "2025-02-26T17:05:46.695432+07:00",
    UpdatedAt: "2025-02-26T17:05:46.695432+07:00",
    DeletedAt: null,
    name: "Outlet Sulfat",
    type: "Outlet",
    address: "",
    owner: "",
    status: true,
    materials: null,
    services: null,
    finish_goods: null,
    item_bundlings: null,
    brands: null,
    categories: null,
    suppliers: null,
    customers: null,
    stock_entries: null,
    plan_productions: null,
    material_requests: null,
    stock_hitories: null,
    company_employee: null,
    suppliers_from: null,
    customers_from: null,
    purchase_orders: null,
    sales_orders: null,
    warehouses: null,
    received_notes: null,
    delivery_notes: null,
    vouchers: null,
    account_payables: null,
    purchase_payment_terms: null,
    account_receivables: null,
    sales_payment_terms: null,
    sales_invoices: null,
    purchase_invoices: null,
    payment_purchase_invoices: null,
    payment_sales_invoices: null,
    coa_transactions: null,
  },
  float: 12,
  coa_material_id: "a977c929-e311-4635-8747-92190746dc0b",
  coa_service_id: "3c148c22-9b53-4d14-a628-54a119b2d8ce",
  coa_sell_tax_id: "6ab1ebb6-f005-4b42-bfb5-dcd88cc31032",
  coa_buy_tax_id: "54a80aa1-b85e-462d-a7f1-23a4cd08d985",
  coa_ceil_id: "797bf5d8-f003-4b6e-a3db-fd8d9455bfc4",
  coa_debt_id: "02fa506a-4429-4a2c-9386-51e3492f199d",
  coa_receivable_id: "d15ba2ef-66e6-444d-a5e0-88ff97621219",
  coa_payment_method_id: "20ec1627-9f00-458b-b71c-1662e7e24455",
  coa_material: {
    id: "a977c929-e311-4635-8747-92190746dc0b",
    no_account: "No 1",
    name: "COA Material",
    type: "Aset",
    parent_account_id: null,
    status: true,
    childs_accounts: null,
    parent_account: null,
    company_id: "233b117c-1d96-4f4d-8289-6a6691088af6",
    company: {
      id: "00000000-0000-0000-0000-000000000000",
      ID: 0,
      CreatedAt: "0001-01-01T00:00:00Z",
      UpdatedAt: "0001-01-01T00:00:00Z",
      DeletedAt: null,
      name: "",
      type: "",
      address: "",
      owner: "",
      status: false,
      materials: null,
      services: null,
      finish_goods: null,
      item_bundlings: null,
      brands: null,
      categories: null,
      suppliers: null,
      customers: null,
      stock_entries: null,
      plan_productions: null,
      material_requests: null,
      stock_hitories: null,
      company_employee: null,
      suppliers_from: null,
      customers_from: null,
      purchase_orders: null,
      sales_orders: null,
      warehouses: null,
      received_notes: null,
      delivery_notes: null,
      vouchers: null,
      account_payables: null,
      purchase_payment_terms: null,
      account_receivables: null,
      sales_payment_terms: null,
      sales_invoices: null,
      purchase_invoices: null,
      payment_purchase_invoices: null,
      payment_sales_invoices: null,
      coa_transactions: null,
    },
    coa_transactions: null,
    coa_payment_sales_invoices: null,
    coa_payment_purchase_invoices: null,
    ID: 0,
    CreatedAt: "2025-02-26T17:05:46.702617+07:00",
    UpdatedAt: "2025-02-26T17:05:46.702617+07:00",
    DeletedAt: null,
  },
  coa_service: {
    id: "3c148c22-9b53-4d14-a628-54a119b2d8ce",
    no_account: "No 2",
    name: "COA Layanan",
    type: "Aset",
    parent_account_id: null,
    status: true,
    childs_accounts: null,
    parent_account: null,
    company_id: "233b117c-1d96-4f4d-8289-6a6691088af6",
    company: {
      id: "00000000-0000-0000-0000-000000000000",
      ID: 0,
      CreatedAt: "0001-01-01T00:00:00Z",
      UpdatedAt: "0001-01-01T00:00:00Z",
      DeletedAt: null,
      name: "",
      type: "",
      address: "",
      owner: "",
      status: false,
      materials: null,
      services: null,
      finish_goods: null,
      item_bundlings: null,
      brands: null,
      categories: null,
      suppliers: null,
      customers: null,
      stock_entries: null,
      plan_productions: null,
      material_requests: null,
      stock_hitories: null,
      company_employee: null,
      suppliers_from: null,
      customers_from: null,
      purchase_orders: null,
      sales_orders: null,
      warehouses: null,
      received_notes: null,
      delivery_notes: null,
      vouchers: null,
      account_payables: null,
      purchase_payment_terms: null,
      account_receivables: null,
      sales_payment_terms: null,
      sales_invoices: null,
      purchase_invoices: null,
      payment_purchase_invoices: null,
      payment_sales_invoices: null,
      coa_transactions: null,
    },
    coa_transactions: null,
    coa_payment_sales_invoices: null,
    coa_payment_purchase_invoices: null,
    ID: 0,
    CreatedAt: "2025-02-26T17:05:46.703618+07:00",
    UpdatedAt: "2025-02-26T17:05:46.703618+07:00",
    DeletedAt: null,
  },
  coa_sell_tax: {
    id: "6ab1ebb6-f005-4b42-bfb5-dcd88cc31032",
    no_account: "No 3",
    name: "COA PPN Keluaran",
    type: "Aset",
    parent_account_id: null,
    status: true,
    childs_accounts: null,
    parent_account: null,
    company_id: "233b117c-1d96-4f4d-8289-6a6691088af6",
    company: {
      id: "00000000-0000-0000-0000-000000000000",
      ID: 0,
      CreatedAt: "0001-01-01T00:00:00Z",
      UpdatedAt: "0001-01-01T00:00:00Z",
      DeletedAt: null,
      name: "",
      type: "",
      address: "",
      owner: "",
      status: false,
      materials: null,
      services: null,
      finish_goods: null,
      item_bundlings: null,
      brands: null,
      categories: null,
      suppliers: null,
      customers: null,
      stock_entries: null,
      plan_productions: null,
      material_requests: null,
      stock_hitories: null,
      company_employee: null,
      suppliers_from: null,
      customers_from: null,
      purchase_orders: null,
      sales_orders: null,
      warehouses: null,
      received_notes: null,
      delivery_notes: null,
      vouchers: null,
      account_payables: null,
      purchase_payment_terms: null,
      account_receivables: null,
      sales_payment_terms: null,
      sales_invoices: null,
      purchase_invoices: null,
      payment_purchase_invoices: null,
      payment_sales_invoices: null,
      coa_transactions: null,
    },
    coa_transactions: null,
    coa_payment_sales_invoices: null,
    coa_payment_purchase_invoices: null,
    ID: 0,
    CreatedAt: "2025-02-26T17:05:46.703618+07:00",
    UpdatedAt: "2025-02-26T17:05:46.703618+07:00",
    DeletedAt: null,
  },
  coa_buy_tax: {
    id: "54a80aa1-b85e-462d-a7f1-23a4cd08d985",
    no_account: "No 4",
    name: "COA PPN Masukan",
    type: "Aset",
    parent_account_id: null,
    status: true,
    childs_accounts: null,
    parent_account: null,
    company_id: "233b117c-1d96-4f4d-8289-6a6691088af6",
    company: {
      id: "00000000-0000-0000-0000-000000000000",
      ID: 0,
      CreatedAt: "0001-01-01T00:00:00Z",
      UpdatedAt: "0001-01-01T00:00:00Z",
      DeletedAt: null,
      name: "",
      type: "",
      address: "",
      owner: "",
      status: false,
      materials: null,
      services: null,
      finish_goods: null,
      item_bundlings: null,
      brands: null,
      categories: null,
      suppliers: null,
      customers: null,
      stock_entries: null,
      plan_productions: null,
      material_requests: null,
      stock_hitories: null,
      company_employee: null,
      suppliers_from: null,
      customers_from: null,
      purchase_orders: null,
      sales_orders: null,
      warehouses: null,
      received_notes: null,
      delivery_notes: null,
      vouchers: null,
      account_payables: null,
      purchase_payment_terms: null,
      account_receivables: null,
      sales_payment_terms: null,
      sales_invoices: null,
      purchase_invoices: null,
      payment_purchase_invoices: null,
      payment_sales_invoices: null,
      coa_transactions: null,
    },
    coa_transactions: null,
    coa_payment_sales_invoices: null,
    coa_payment_purchase_invoices: null,
    ID: 0,
    CreatedAt: "2025-02-26T17:05:46.703618+07:00",
    UpdatedAt: "2025-02-26T17:05:46.703618+07:00",
    DeletedAt: null,
  },
  coa_ceil: {
    id: "797bf5d8-f003-4b6e-a3db-fd8d9455bfc4",
    no_account: "No 5",
    name: "COA Pembulatan",
    type: "Aset",
    parent_account_id: null,
    status: true,
    childs_accounts: null,
    parent_account: null,
    company_id: "233b117c-1d96-4f4d-8289-6a6691088af6",
    company: {
      id: "00000000-0000-0000-0000-000000000000",
      ID: 0,
      CreatedAt: "0001-01-01T00:00:00Z",
      UpdatedAt: "0001-01-01T00:00:00Z",
      DeletedAt: null,
      name: "",
      type: "",
      address: "",
      owner: "",
      status: false,
      materials: null,
      services: null,
      finish_goods: null,
      item_bundlings: null,
      brands: null,
      categories: null,
      suppliers: null,
      customers: null,
      stock_entries: null,
      plan_productions: null,
      material_requests: null,
      stock_hitories: null,
      company_employee: null,
      suppliers_from: null,
      customers_from: null,
      purchase_orders: null,
      sales_orders: null,
      warehouses: null,
      received_notes: null,
      delivery_notes: null,
      vouchers: null,
      account_payables: null,
      purchase_payment_terms: null,
      account_receivables: null,
      sales_payment_terms: null,
      sales_invoices: null,
      purchase_invoices: null,
      payment_purchase_invoices: null,
      payment_sales_invoices: null,
      coa_transactions: null,
    },
    coa_transactions: null,
    coa_payment_sales_invoices: null,
    coa_payment_purchase_invoices: null,
    ID: 0,
    CreatedAt: "2025-02-26T17:05:46.703618+07:00",
    UpdatedAt: "2025-02-26T17:05:46.703618+07:00",
    DeletedAt: null,
  },
  coa_debt: {
    id: "02fa506a-4429-4a2c-9386-51e3492f199d",
    no_account: "No 6",
    name: "COA Hutang",
    type: "Aset",
    parent_account_id: null,
    status: true,
    childs_accounts: null,
    parent_account: null,
    company_id: "233b117c-1d96-4f4d-8289-6a6691088af6",
    company: {
      id: "00000000-0000-0000-0000-000000000000",
      ID: 0,
      CreatedAt: "0001-01-01T00:00:00Z",
      UpdatedAt: "0001-01-01T00:00:00Z",
      DeletedAt: null,
      name: "",
      type: "",
      address: "",
      owner: "",
      status: false,
      materials: null,
      services: null,
      finish_goods: null,
      item_bundlings: null,
      brands: null,
      categories: null,
      suppliers: null,
      customers: null,
      stock_entries: null,
      plan_productions: null,
      material_requests: null,
      stock_hitories: null,
      company_employee: null,
      suppliers_from: null,
      customers_from: null,
      purchase_orders: null,
      sales_orders: null,
      warehouses: null,
      received_notes: null,
      delivery_notes: null,
      vouchers: null,
      account_payables: null,
      purchase_payment_terms: null,
      account_receivables: null,
      sales_payment_terms: null,
      sales_invoices: null,
      purchase_invoices: null,
      payment_purchase_invoices: null,
      payment_sales_invoices: null,
      coa_transactions: null,
    },
    coa_transactions: null,
    coa_payment_sales_invoices: null,
    coa_payment_purchase_invoices: null,
    ID: 0,
    CreatedAt: "2025-02-26T17:05:46.703618+07:00",
    UpdatedAt: "2025-02-26T17:05:46.703618+07:00",
    DeletedAt: null,
  },
  coa_receivable: {
    id: "d15ba2ef-66e6-444d-a5e0-88ff97621219",
    no_account: "No 7",
    name: "COA Piutang",
    type: "Aset",
    parent_account_id: null,
    status: true,
    childs_accounts: null,
    parent_account: null,
    company_id: "233b117c-1d96-4f4d-8289-6a6691088af6",
    company: {
      id: "00000000-0000-0000-0000-000000000000",
      ID: 0,
      CreatedAt: "0001-01-01T00:00:00Z",
      UpdatedAt: "0001-01-01T00:00:00Z",
      DeletedAt: null,
      name: "",
      type: "",
      address: "",
      owner: "",
      status: false,
      materials: null,
      services: null,
      finish_goods: null,
      item_bundlings: null,
      brands: null,
      categories: null,
      suppliers: null,
      customers: null,
      stock_entries: null,
      plan_productions: null,
      material_requests: null,
      stock_hitories: null,
      company_employee: null,
      suppliers_from: null,
      customers_from: null,
      purchase_orders: null,
      sales_orders: null,
      warehouses: null,
      received_notes: null,
      delivery_notes: null,
      vouchers: null,
      account_payables: null,
      purchase_payment_terms: null,
      account_receivables: null,
      sales_payment_terms: null,
      sales_invoices: null,
      purchase_invoices: null,
      payment_purchase_invoices: null,
      payment_sales_invoices: null,
      coa_transactions: null,
    },
    coa_transactions: null,
    coa_payment_sales_invoices: null,
    coa_payment_purchase_invoices: null,
    ID: 0,
    CreatedAt: "2025-02-26T17:05:46.704904+07:00",
    UpdatedAt: "2025-02-26T17:05:46.704904+07:00",
    DeletedAt: null,
  },
  coa_payment_method: {
    id: "20ec1627-9f00-458b-b71c-1662e7e24455",
    no_account: "No 8",
    name: "COA Metode Pembayaran",
    type: "Aset",
    parent_account_id: null,
    status: true,
    childs_accounts: null,
    parent_account: null,
    company_id: "233b117c-1d96-4f4d-8289-6a6691088af6",
    company: {
      id: "00000000-0000-0000-0000-000000000000",
      ID: 0,
      CreatedAt: "0001-01-01T00:00:00Z",
      UpdatedAt: "0001-01-01T00:00:00Z",
      DeletedAt: null,
      name: "",
      type: "",
      address: "",
      owner: "",
      status: false,
      materials: null,
      services: null,
      finish_goods: null,
      item_bundlings: null,
      brands: null,
      categories: null,
      suppliers: null,
      customers: null,
      stock_entries: null,
      plan_productions: null,
      material_requests: null,
      stock_hitories: null,
      company_employee: null,
      suppliers_from: null,
      customers_from: null,
      purchase_orders: null,
      sales_orders: null,
      warehouses: null,
      received_notes: null,
      delivery_notes: null,
      vouchers: null,
      account_payables: null,
      purchase_payment_terms: null,
      account_receivables: null,
      sales_payment_terms: null,
      sales_invoices: null,
      purchase_invoices: null,
      payment_purchase_invoices: null,
      payment_sales_invoices: null,
      coa_transactions: null,
    },
    coa_transactions: null,
    coa_payment_sales_invoices: null,
    coa_payment_purchase_invoices: null,
    ID: 0,
    CreatedAt: "2025-02-26T17:05:46.704904+07:00",
    UpdatedAt: "2025-02-26T17:05:46.704904+07:00",
    DeletedAt: null,
  },
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
