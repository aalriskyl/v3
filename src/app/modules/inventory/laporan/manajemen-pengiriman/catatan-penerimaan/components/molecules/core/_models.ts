import { ID, Response } from "@metronic/helpers";

export type CatatanPenerimaanModel = {
  id?: ID;
  type: string;
  supplier: {
    name: string;
  };
  status: string;
  no_purchase_order: string;
  tanggal_penerimaan: Date;
  request_by: string;
  approved_by: string;
  tanggal_pengajuan: Date;
  tanggal_approve: Date;
};

export type MaterialModel = {
  id?: ID;
  material: {
    name: string;
  }
  konversi_material: string;
  jumlah: number;
  satuan_uom: string;
  barcode: string;
  catatan: string;
  harga: number;
};

export type UsersQueryResponse = Response<CatatanPenerimaanModel[]>;
export type MaterialQueryResponse = Response<MaterialModel[]>;

// export const initialUser: CatatanPenerimaanModel = {
//   // type: '',
//   // pemasok: '',
//   // status: '',
//   // purchase_order_number: '',
//   // tanggal_penerimaan: new Date(),
//   // request_by: '',
//   // approved_by: '',
//   // tanggal_pengajuan: new Date(),
//   // tanggal_approve: new Date(), // //
// };

// export const initialMaterial: MaterialModel = {
//   // material: "",
//   // konversi_material: "",
//   // jumlah: 0,
//   // satuan_uom: "",
//   // barcode: "",
//   // catatan: "",
//   // harga: 0,
// };
