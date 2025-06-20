import { ID, Response } from '@metronic/helpers';

export type CatatanPenerimaanModel = {
  id?: ID;
  type: string;
  supplier: {
    name: string;
  };
  warehouse: {
    name: string;
  };
  customer?: {
    name: string;
  };
  outlet?: {
    name: string;
  };
  status: string;
  purchase_order_number: string;
  received_date: Date;
  request_by: string;
  approved_by: string;
  tanggal_pengajuan: Date;
  tanggal_approve: Date;
  warehouse_id?: string;
  supplier_id?: string;
};

export type MaterialModel = {
  id?: ID;
  material: {
    name: string,
  }
  conversion_material: {
    name: string;
  };
  amount: number;
  conversion_material_uom: string;
  material_uom: {
    uom_actual: {
      name: string;
    }
  }
  remarks: string;
  price: number;
  status: string;
};

export type UsersQueryResponse = Response<CatatanPenerimaanModel[]>;
export type MaterialQueryResponse = Response<MaterialModel[]>;


export const initialUser: CatatanPenerimaanModel = {
  type: "",
  supplier: {
    name:""
  },
  warehouse: {
    name: ""
  },
  status: "",
  purchase_order_number: "",
  received_date: new Date(),
  request_by: "",
  approved_by: "",
  tanggal_pengajuan: new Date(),
  tanggal_approve: new Date(),
};

// export const initialMaterial: MaterialModel = {
//   material: '',
//   konversi_material: '',
//   jumlah: 0,
//   satuan_uom: '',
//   barcode: '',
//   catatan: '',
//   harga: 0
// };