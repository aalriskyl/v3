import { ID, Response } from '@metronic/helpers';

export type PlanProductionModel = {
  id?: ID;
  type: string;
  tanggal_mulai: Date;
  tanggal_berakhir: Date;
  status: string;
  rencana_produksi: string;
  tanggal_pengajuan: Date;
  request_by: string;
  tanggal_approve: Date;
  approved_by: string;
};

export type MaterialModel = {
  id?: ID;
  bill_of_materials: string;
  tanggal_produksi: Date;
  jumlah_produksi: string;
  jenis_buffer_stock: string;
  buffer_stock: string;
};

export type UsersQueryResponse = Response<PlanProductionModel[]>;
export type MaterialQueryResponse = Response<MaterialModel[]>;


export const initialUser: PlanProductionModel = {
  type: '',
  tanggal_mulai: new Date(),
  tanggal_berakhir: new Date(),
  status: '',
  rencana_produksi: '',
  tanggal_pengajuan: new Date(),
  request_by: '',
  tanggal_approve: new Date(),
  approved_by: '',
};

export const initialMaterial: MaterialModel = {
  bill_of_materials: '',
  tanggal_produksi: new Date(),
  jumlah_produksi: '',
  jenis_buffer_stock: '',
  buffer_stock: '',
};