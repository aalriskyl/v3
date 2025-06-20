import {ID, Response} from '@metronic/helpers'
export type ParentMaterials = {
  id?: ID
  name: string
  category_name:string
}
export type Materials = {
  id?: ID;
  photo: string;
  description: string;
  name: string;
  category_name: string;
  brand_name: string;
  set_default: string;
}
export type Uom = {
  id?: ID;
  uom_actual: {
    id: string;
    name: string;
    status: boolean;
  };
  uom_conversion: {
    id: string;
    name: string;
    status: boolean;
  };
  conversion: number;
  barcode: string;
  sku: string;
  uom_sellable: boolean;
  uom_default: boolean;
  uom_default_buy: boolean;
  uom_default_sell: boolean;
  status: boolean;
};

export type Supplier = {
  id?: ID; // Optional ID
  name?: string; // Supplier name
  supplier_id: string; // Supplier ID (matches the form)
  priority_supplier: number; // Priority supplier (matches the form)
  default_supplier: boolean; // Default supplier (matches the form)
  buy_price: number; // Buy price (matches the form)
  purchase_price?: string; // Optional, not used in the form
  selling_price?: string; // Optional, not used in the form
  priority?: string; // Optional, not used in the form
  is_default_supplier?: boolean; // Optional, not used in the form
  is_default_purchase?: boolean; // Optional, not used in the form
  is_default_sales?: boolean; // Optional, not used in the form
};

export type UsersQueryResponse = Response<Array<ParentMaterials>>
export type MaterialsResponse = Response<Array<Materials>>
export type UomResponse = Response<Array<Uom>>
export type SupplierResponse = Response<Array<Supplier>>

export const initialUser: ParentMaterials = {
  name: '',
  category_name:'',
}
export const initialMaterials: Materials = {
  photo: '',
  description: '',
  name: '',
  category_name: '',
  brand_name: '',
  set_default: '',
}
export const initialUom: Uom = {
  id: undefined, // Optional ID, can be undefined initially
  uom_actual: {
    id: '', // Initialize with an empty string or a valid ID if known
    name: '', // Initialize with an empty string
    status: false, // Default status
  },
  uom_conversion: {
    id: '', // Initialize with an empty string or a valid ID if known
    name: '', // Initialize with an empty string
    status: false, // Default status
  },
  conversion: 0, // Default conversion value
  barcode: '', // Initialize with an empty string
  sku: '', // Initialize with an empty string
  uom_sellable: false, // Default sellable status
  uom_default: false, // Default UOM default status
  uom_default_buy: false, // Default buy status
  uom_default_sell: false, // Default sell status
  status: true, // Default status
};
export const initialSupplier: Supplier = {
  name: '',
  supplier_id: '',
  purchase_price: '',
  selling_price: '',
  priority: '',
  is_default_supplier: false,
  is_default_purchase: false,
  is_default_sales: false,
  priority_supplier: 0,
  default_supplier: false,
  buy_price: 0,
}

