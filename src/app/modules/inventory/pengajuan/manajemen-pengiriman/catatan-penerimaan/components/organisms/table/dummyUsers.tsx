import { CatatanPenerimaanModel, MaterialModel } from "../../molecules/core/_models";

export const dummyUsers: CatatanPenerimaanModel[] = [
  {
    type: "string",
    supplier: {
      name: "string",
    },
    warehouse: {
      name: "string"
    },
    status: "string",
    purchase_order_number: "string",
    received_date: new Date(),
    request_by: "string",
    approved_by: "string",
    tanggal_pengajuan: new Date(),
    tanggal_approve: new Date(),
  },
  {
    id: 2,
    type: 'Warehouse',
    warehouse: {
      name: 'Warehouse B'
    },
    supplier: {
      name: ""
    },
    status: 'Submitted',
    purchase_order_number: 'SO-002',
    received_date: new Date('2023-10-16'),
    request_by: 'Jane Smith',
    approved_by: 'Manager B',
    tanggal_pengajuan: new Date('2023-10-15'),
    tanggal_approve: new Date('2023-10-15'),
  },
  {
    id: 3,
    type: 'Supplier',
    supplier: {
      name: 'Supplier C'
    },
    warehouse: {
      name: ""
    },
    status: 'Rejected',
    purchase_order_number: 'SO-003',
    received_date: new Date('2024-10-17'),
    request_by: 'Bob Brown',
    approved_by: 'Manager C',
    tanggal_pengajuan: new Date('2024-10-16'),
    tanggal_approve: new Date('2024-10-16'),
  },
];

export const dummyMaterials: MaterialModel[] = [
  // {
  //   id: 1,
  //   material: 'Material A',
  //   konversi_material: '1kg',
  //   jumlah: 100,
  //   satuan_uom: 'kg',
  //   barcode: 'BARCODE-A',
  //   catatan: 'Catatan untuk Material A',
  //   harga: 100
  // },
  // {
  //   id: 2,
  //   material: 'Material B',
  //   konversi_material: '6kg',
  //   jumlah: 200,
  //   satuan_uom: 'kg',
  //   barcode: 'BARCODE-B',
  //   catatan: 'Catatan untuk Material B',
  //   harga: 200
  // },
  // {
  //   id: 3,
  //   material: 'Material C',
  //   konversi_material: '3kg',
  //   jumlah: 150,
  //   satuan_uom: 'kg',
  //   barcode: 'BARCODE-C',
  //   catatan: 'Catatan untuk Material C',
  //   harga: 150
  // },
];