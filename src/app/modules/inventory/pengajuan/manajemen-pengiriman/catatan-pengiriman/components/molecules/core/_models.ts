import { ID, Response } from "@metronic/helpers";

export type CatatanPengirimanModel = {
  id?: ID;
  type: string;
  konsumen: string;
  status: string;
  sales_order_number: string;
  tanggal_pengiriman: Date;
  request_by: string;
  approved_by: string;
  tanggal_pengajuan: Date;
  tanggal_approve: Date;
  customer?: {
    name: string;
  };
  supplier?: {
    name: string;
  };
  warehouse: {
    id: string;
    name: string;
  } | null;
};

export type MaterialModel = {
  id?: ID;
  material: string;
  jumlah: number;
  satuan_uom: string;
  barcode: string;
  catatan: string;
  harga: number;
};

export type UsersQueryResponse = Response<CatatanPengirimanModel[]>;
export type MaterialQueryResponse = Response<MaterialModel[]>;

export const initialUser: CatatanPengirimanModel = {
  type: "",
  konsumen: "",
  status: "",
  sales_order_number: "",
  tanggal_pengiriman: new Date(),
  request_by: "",
  approved_by: "",
  tanggal_pengajuan: new Date(),
  tanggal_approve: new Date(),
  warehouse: null,
};

export const initialMaterial: MaterialModel = {
  material: "",
  jumlah: 0,
  satuan_uom: "",
  barcode: "",
  catatan: "",
  harga: 0,
};
