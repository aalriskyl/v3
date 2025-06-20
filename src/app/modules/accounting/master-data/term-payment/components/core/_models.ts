export type ListDataType = {
  id: string;
  name: string;
  no_account: string;
  parent_account: {
    id: string;
    name: string;
  } | null;
  status: boolean;
  type: string;
};

export type DetailDataType = {
  id: string;
  name: string;
  no_account: string;
  parent_account: {
    id: string;
    name: string;
  } | null;
  status: boolean;
  type: string;
};

export type PaymentTermsType = {
  credit: number;
  due_date_based_on: string;
  id: string;
  invoice_portion: number;
  name: string;
  status: boolean;
};

export type DetailPaymentTermsType = {
  credit_days: number;
  due_date_based_on: string;
  id: string;
  invoice_portion: number;
  name: string;
  status: boolean;
};
