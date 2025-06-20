import { CatatanPengirimanModel, MaterialModel } from "../../molecules/core/_models";

export const dummyUsers: CatatanPengirimanModel[] = [
  {
    id: 1,
    type: 'Customer',
    konsumen: 'Customer A',
    status: 'Approved',
    sales_order_number: 'SO-001',
    tanggal_pengiriman: new Date('2023-10-15'),
    request_by: 'John Doe',
    approved_by: 'Manager A',
    tanggal_pengajuan: new Date('2023-10-14'),
    tanggal_approve: new Date('2023-10-14'),
  },
  {
    id: 2,
    type: 'Outlet',
    konsumen: 'Outlet B',
    status: 'Approved',
    sales_order_number: 'SO-002',
    tanggal_pengiriman: new Date('2023-10-16'),
    request_by: 'Jane Smith',
    approved_by: 'Manager B',
    tanggal_pengajuan: new Date('2023-10-15'),
    tanggal_approve: new Date('2023-10-15'),
  },
  {
    id: 3,
    type: 'Customer',
    konsumen: 'Customer C',
    status: 'Approved',
    sales_order_number: 'SO-003',
    tanggal_pengiriman: new Date('2024-10-17'),
    request_by: 'Bob Brown',
    approved_by: 'Manager C',
    tanggal_pengajuan: new Date('2024-10-16'),
    tanggal_approve: new Date('2024-10-16'),
  },
];

export const dummyMaterials: MaterialModel[] = [
  {
    id: 1,
    material: 'Material A',
    jumlah: 100,
    satuan_uom: 'kg',
    barcode: 'BARCODE-A',
    catatan: 'Catatan untuk Material A',
    harga: 100
  },
  {
    id: 2,
    material: 'Material B',
    jumlah: 200,
    satuan_uom: 'kg',
    barcode: 'BARCODE-B',
    catatan: 'Catatan untuk Material B',
    harga: 200
  },
  {
    id: 3,
    material: 'Material C',
    jumlah: 150,
    satuan_uom: 'kg',
    barcode: 'BARCODE-C',
    catatan: 'Catatan untuk Material C',
    harga: 150
  },
];