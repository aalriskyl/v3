import { PlanProductionModel, MaterialModel } from "../../molecules/core/_models";


export const dummyUsers: PlanProductionModel[] = [
  {
    id: 1,
    type: 'Production Plan A',
    tanggal_mulai: new Date('2023-10-15'),
    tanggal_berakhir: new Date('2023-10-20'),
    status: 'Draft',
    rencana_produksi: 'Mingguan',
    tanggal_pengajuan: new Date('2023-10-14'),
    request_by: 'John Doe',
    tanggal_approve: new Date('2023-10-14'),
    approved_by: 'Manager A',
  },
  {
    id: 2,
    type: 'Production Plan B',
    tanggal_mulai: new Date('2023-10-16'),
    tanggal_berakhir: new Date('2023-10-21'),
    status: 'Submitted',
    rencana_produksi: 'Harian',
    tanggal_pengajuan: new Date('2023-10-15'),
    request_by: 'Jane Smith',
    tanggal_approve: new Date('2023-10-15'),
    approved_by: 'Manager B',
  },
  {
    id: 3,
    type: 'Production Plan C',
    tanggal_mulai: new Date('2024-10-17'),
    tanggal_berakhir: new Date('2024-10-22'),
    status: 'Rejected',
    rencana_produksi: 'Mingguan',
    tanggal_pengajuan: new Date('2024-10-16'),
    request_by: 'Bob Brown',
    tanggal_approve: new Date('2024-10-16'),
    approved_by: 'Manager C',
  },
];

export const dummyMaterials: MaterialModel[] = [
  {
    id: 1,
    bill_of_materials: 'BOM A',
    tanggal_produksi: new Date('2023-10-15'),
    jumlah_produksi: '100',
    jenis_buffer_stock: 'Safety Stock',
    buffer_stock: '50',
  },
  {
    id: 2,
    bill_of_materials: 'BOM B',
    tanggal_produksi: new Date('2023-10-16'),
    jumlah_produksi: '200',
    jenis_buffer_stock: 'Cycle Stock',
    buffer_stock: '100',
  },
  {
    id: 3,
    bill_of_materials: 'BOM C',
    tanggal_produksi: new Date('2024-10-17'),
    jumlah_produksi: '150',
    jenis_buffer_stock: 'Pipeline Stock',
    buffer_stock: '75',
  },
];