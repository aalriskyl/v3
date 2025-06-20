import { ID, Response } from "@metronic/helpers";

// export type Model = {
//   id?: ID;
//   sales_order_number: string;
//   purchase_order_number: string;
//   tanggal_sales_order: string;
//   type: string;
//   konsumen: string;
//   status: string;
// };

export type Model = {
  id?: ID;
  no_sales_order: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type MaterialModel = {
  id?: ID;
  material: string;
  konversi_material: string;
  jumlah: number;
  uom: string;
  harga: number;
  barcode: string;
};

export type LayananModel = {
  id?: ID;
  layanan: string;
  supplier: string;
  harga: number;
};

export type UsersQueryResponse = Response<Array<Model>>;
export type MaterialsQueryResponse = Response<Array<MaterialModel>>;
export type LayananQueryResponse = Response<Array<LayananModel>>;

export const initialModel: Model = {
  created_at: "",
  no_sales_order: "",
  status: "",
  updated_at: "",
};

export const initialMaterial: MaterialModel = {
  material: "",
  konversi_material: "",
  jumlah: 0,
  uom: "",
  harga: 0,
  barcode: "",
};

export const initialLayanan: LayananModel = {
  layanan: "",
  supplier: "",
  harga: 0,
};
