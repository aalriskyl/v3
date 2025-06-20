export type ListView = {
  approved_date: null | string;
  id: string;
  no_retur_purchase: string;
  purchase_order: {
    id: string;
    no_purchase_order: string;
  };
  received_note: {
    id: string;
    no_received_note: string;
  };
  retur_option: string;
  status: string;
};

export type DetailView = {
  submitted_by: {
    name: string;
  };
  approved_by: null | any;
  submitted_date: null | any;
  approved_date: null | any;
  id: string;
  retur_option: string;
  created_at: string;
  no_retur_purchase: string;
  purchase_order: {
    id: string;
    no_purchase_order: string;
  };
  received_note: {
    id: string;
    no_received_note: string;
  };
  requested_by: {
    id: string;
    name: string;
  };
  status: string;
  total_price: number;
};
