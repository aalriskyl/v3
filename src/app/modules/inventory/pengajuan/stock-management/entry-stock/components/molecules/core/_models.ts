import {ID, Response} from '@metronic/helpers'
export type Model = {
  id?: ID; // Assuming ID is a string
  entry_number?: number; // Optional, as it might not always be present
  type: string; // Represents the type of entry (e.g., 'Debit', 'Kredit')
  status: string; // Represents the status of the entry (e.g., 'Draft', 'Approved')
  remarks?: string; // Optional remarks field
  warehouse: {
    id: string; // Warehouse ID
    name: string; // Warehouse name
  };
  request_by?: {
    id: string; // ID of the user who requested the entry
    name: string; // Name of the user who requested the entry
  };
  approved_by?: {
    id: string; // ID of the user who approved the entry
    name: string; // Name of the user who approved the entry
  };
  approved_date?: string; // Date when the entry was approved
  doc_type: string;
};

export type UomSection = {
  id?: ID;
  status: string;
  material: {
    id: string;
    name: string;
  };
  material_uom: {
    uom_actual: {
      id: string;
      name: string;
    };
  };
  amount: number;
};

export type UsersQueryResponse = Response<Array<Model>>
 
// export const initialUser: Model = {
//   // entry_number: undefined,
//   // type: '',
//   // status: '',
// }
