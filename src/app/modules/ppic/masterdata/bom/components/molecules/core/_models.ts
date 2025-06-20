import { ID, Response } from '@metronic/helpers';

// Model untuk Bill of Materials (BOM)
export type Bom = {
  id?: ID;
  name: string;
  type: string;
};

// Model untuk Variant Materials dengan Unit of Measure (UOM)
export type VariantMaterialsUom = {
  id?: ID;
  photo: string;
  description: string;
  material_name: string;
  category_name: string;
  brand_name: string;
  set_default: string;
};

// Model untuk Service (Layanan)
export type Service = {
  id?: ID;
  service: string;
  supplier: string;
};

// Model untuk Finish Goods (Barang Jadi)
export type FinishGoods = {
  id?: ID;             
  namaFinishGoods: string;     
  hargaJual: string;          
  sku: string;                 
  ekspetasiJumlahHasil: string;
};

// Model untuk Material
export type Material = {
  id?: ID;
  material: string;
  satuan_uom: string;
  jumlah_material: number;
  supplier: string;
};

// Tipe respons untuk query API
export type UsersQueryResponse = Response<Array<Bom>>;
export type VariantMaterialsUomQueryResponse = Response<Array<VariantMaterialsUom>>;
export type ServiceQueryResponse = Response<Array<Service>>;
export type FinishGoodsQueryResponse = Response<Array<FinishGoods>>;
export type MaterialQueryResponse = Response<Array<Material>>;

// Data awal untuk BOM
export const initialBom: Bom = {
  name: '',
  type: '',
};

// Data awal untuk Service
export const initialService: Service = {
  service: '',
  supplier: '',
};

// Data awal untuk Variant Materials UOM
export const initialVariantMaterialsUom: VariantMaterialsUom = {
  photo: '',
  description: '',
  material_name: '',
  category_name: '',
  brand_name: '',
  set_default: '',
};

// Data awal untuk Finish Goods
export const initialFinishGoods: FinishGoods = {
  namaFinishGoods: '',
  hargaJual: '',
  sku: '',
  ekspetasiJumlahHasil: '',
};

// Data awal untuk Material
export const initialMaterial: Material = {
  material: '',
  satuan_uom: '',
  jumlah_material: 0,
  supplier: '',
};
