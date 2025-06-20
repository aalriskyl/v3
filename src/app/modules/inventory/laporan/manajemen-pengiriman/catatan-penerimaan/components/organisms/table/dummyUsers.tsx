/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CatatanPenerimaanModel,
  MaterialModel,
} from "../../molecules/core/_models";

export const dummyUsers: CatatanPenerimaanModel[] = [
  // {
  //   id: 1,
  //   type: 'Supplier',
  //   pemasok: 'Supplier A',
  //   status: 'Approved',
  //   purchase_order_number: 'SO-001',
  //   tanggal_penerimaan: new Date('2023-10-15'),
  //   request_by: 'John Doe',
  //   approved_by: 'Manager A',
  //   tanggal_pengajuan: new Date('2023-10-14'),
  //   tanggal_approve: new Date('2023-10-14'),
  // },
  // {
  //   id: 2,
  //   type: 'Warehouse',
  //   pemasok: 'Warehouse B',
  //   status: 'Approved',
  //   purchase_order_number: 'SO-002',
  //   tanggal_penerimaan: new Date('2023-10-16'),
  //   request_by: 'Jane Smith',
  //   approved_by: 'Manager B',
  //   tanggal_pengajuan: new Date('2023-10-15'),
  //   tanggal_approve: new Date('2023-10-15'),
  // },
  // {
  //   id: 3,
  //   type: 'Supplier',
  //   pemasok: 'Supplier C',
  //   status: 'Approved',
  //   purchase_order_number: 'SO-003',
  //   tanggal_penerimaan: new Date('2024-10-17'),
  //   request_by: 'Bob Brown',
  //   approved_by: 'Manager C',
  //   tanggal_pengajuan: new Date('2024-10-16'),
  //   tanggal_approve: new Date('2024-10-16'),
  // },
];

export const dummyMaterials: any[] = [
  {
    id: 1,
    material: "Material A",
    konversi_material: "1kg",
    jumlah: 100,
    satuan_uom: "kg",
    barcode: "BARCODE-A",
    catatan: "Catatan untuk Material A",
    harga: 100,
  },
  {
    id: 2,
    material: "Material B",
    konversi_material: "6kg",
    jumlah: 200,
    satuan_uom: "kg",
    barcode: "BARCODE-B",
    catatan: "Catatan untuk Material B",
    harga: 200,
  },
  {
    id: 3,
    material: "Material C",
    konversi_material: "3kg",
    jumlah: 150,
    satuan_uom: "kg",
    barcode: "BARCODE-C",
    catatan: "Catatan untuk Material C",
    harga: 150,
  },
];
