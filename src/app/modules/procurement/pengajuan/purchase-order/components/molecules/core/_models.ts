import { ID, Response } from '@metronic/helpers';
import { string } from 'yup';

export type Model = {
      id?: ID; 
        approved_by?: Date,
        approved_date?: Date,
        company_id?: string,
        created_at?: Date,
        material_request?: string,
        no_purchase_order?: string,
        rejected_by?: Date,
        rejected_date?: Date,
        requested_by?: {
            id: string,
            name: string
        },
        status: string,
        status_delivery?: string,
        status_payment?: string,
        submitted_by?: string,
        submitted_date: Date,
        supplier?: {
            id: string,
            name: string,
        },
        term_of_condition?: string,
        type?: string;
    };

// Extend the Model type to include the supplier information if needed
export type Supplier = {
  id: string; // The unique identifier for the supplier
  name: string; // The name of the supplier
};

// Example of how to use the Model type with the API response
export type PurchaseOrderResponse = {
  material_requests: Model & { supplier: Supplier }; // Include supplier as a nested object
};

export type MaterialModelSupplier = {
  id?: ID;
  material: {
    name: string;

  }
  material_uom: {
    uom_actual: {
      name: string;
    }
  }
  material_supplier :{
    supplier: {
      name: string;
    }
  }
  material_id: string;
  amount: number;
  price: number;
  barcode: string;
  status: string;
};
export type MaterialModelWarehouse = {
  id?: ID;
  conversion_material: {
    name: string;
  }
  material: {
    id: string;
    name: string;
  }
  material_uom: {
    id: string;
    uom_actual: {
      id: string;
      name:string;
    }
  }
  amount: number;
  price: number;

};


export type LayananModel = {
  id?: ID;
  service: {
    name: string;
  };
  service_supplier: {
    supplier: {
      name: string;
    };
  };
  price: number;
  purchaseOrder?: {
    status: string;
  }; // Add this line
};

export type UsersQueryResponse = Response<Array<Model>>;
export type MaterialsQueryResponse = Response<Array<MaterialModelSupplier>>;
export type LayananQueryResponse = Response<Array<LayananModel>>;

// export const initialModel: Model = {
//   purchase_order_number: '',
//   material_request: '',
//   tanggal_purchase_order: '',
//   type: '',
//   pemasok: '',
//   status: '',
// };

// export const initialMaterial: MaterialModel = {
//   // material: '',
//   // konversi_material: '',
//   // jumlah: 0,
//   // uom: '',
//   // harga: 0,
//   // barcode: '',
// };

// export const initialLayanan: LayananModel = {
//   layanan: '',
//   supplier: '',
//   harga: 0,
// }