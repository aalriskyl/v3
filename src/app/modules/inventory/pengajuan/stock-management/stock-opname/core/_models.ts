interface SupplierData {
  name: string;
  phone?: string;
  email: string;
  contact_person: string;
  address: string;
  city_id: string;
  industry: string;
}
export type getAllOpnameType = {
  approved_date: string;
  doc_type: string;
  id: string;
  opname_number: number;
  remarks: string;
  requested_by: {
    id: string;
    name: string;
  };
  status: string;
  warehouse: {
    id: string;
    name: string;
  };
}[];

export type getSingleOpnameType = {
  approved_by: {
    id: string;
    name: string;
  };
  approved_date: string;
  doc_type: string;
  id: string;
  opname_number: number;
  remarks: string;
  requested_by: {
    id: string;
    name: string;
  };
  status: string;
  warehouse: {
    id: string;
    name: string;
  };
  submitted_by: {
    id: string;
    name: string;
  } | null;
  submitted_date: string | null;
  posting_date: any;
};

export type getAllMaterialByOpnameIdType = {
  id: string;
  material: {
    id: string;
    name: string;
    uom_default: {
      id: string;
      name: string;
    };
  };
  material_id: string;
  stock_book: number;
  total_stock_actual: number;
  stock_opname_uoms: {
    amount: number;
    id: string;
    material_uom: {
      barcode: number;
      conversion: number;
      id: string;
      uom_actual: {
        id: string;
        name: string;
      };
    };
    remarks: string;
  }[];
}[];
const adawd = {
  id: "a8f75719-6b57-47f3-8101-dd7efaeb5f9f",
  material: {
    id: "6c235a6d-a990-44d5-8c56-282987929418",
    name: "Teh Celup Sariwangi",
    uom_default: {
      id: "47428b3a-7b95-44fc-9703-7fd05d059eb7",
      name: "PCS",
    },
  },
  material_id: "6c235a6d-a990-44d5-8c56-282987929418",
  stock_book: 0,
  stock_opname_uoms: [],
};

export type getSingleMaterialOpnameByIdType = {
  id: string;
  material_id: string;
  material_uom_id: string;
  stock_opname_id: string;
  amount: number;
  material: {
    id: string;
    name: string;
    description: string;
    picture: string;
    status: boolean;
    default_purchase: boolean;
    default_sale: boolean;
    category_id: string;
    category: {
      id: string;
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: null;
      name: string;
      description: string;
      sellable: boolean;
      purchasable: boolean;
      status: boolean;
      company_id: string;
      product_type_id: number;
      product_type: {
        id: number;
        ID: number;
        CreatedAt: string;
        UpdatedAt: string;
        DeletedAt: null;
        name: string;
      };
    };
    brand_id: string;
    uom_default_id: string;
    uom_default: {
      id: string;
      name: string;
      status: boolean;
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: null;
    };
    material_uom: null;
    stock_history: null;
    input_materials: null;
    output_materials: null;
    company_id: string;
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null;
  };
  material_uom: {
    id: string;
    uom_actual: {
      id: string;
      name: string;
      status: boolean;
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: null;
    };
    uom_actual_id: string;
    conversion: number;
    sku: string;
    margin: number;
    barcode: string;
    uom_default_buy: boolean;
    uom_default_sell: boolean;
    uom_sellable: boolean;
    status: boolean;
    material_suppliers: null;
    material_id: string;
    material: null;
  };
};

export type getSelectWirehouseOpnameType = {
  id: string;
  name: string;
  address: string;
  company_id: string;
}[];
