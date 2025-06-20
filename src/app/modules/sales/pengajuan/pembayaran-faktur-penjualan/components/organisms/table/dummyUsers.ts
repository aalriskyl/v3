import {
  Model,
  MaterialModel,
  LayananModel,
} from "../../molecules/core/_models";

export const dummyUsers: any[] = [
  {
    id: 1,
    sales_order_number: "SO001",
    purchase_order_number: "PO001",
    tanggal_sales_order: "10 Oktober 2023",
    type: "Customer",
    konsumen: "Customer A",
    status: "Draft",
  },
  {
    id: 2,
    sales_order_number: "SO002",
    purchase_order_number: "PO002",
    tanggal_sales_order: "16 Maret 2024",
    type: "Outlet",
    konsumen: "Outlet B",
    status: "Submitted",
  },
  {
    id: 3,
    sales_order_number: "SO003",
    purchase_order_number: "PO003",
    tanggal_sales_order: "20 Agustus 2023",
    type: "Customer",
    konsumen: "Customer C",
    status: "Rejected",
  },
];

export const dummyMaterials: any[] = [
  {
    id: 1,
    material: "Material A",
    konversi_material: "Konversi A",
    jumlah: 100,
    uom: "pcs",
    harga: 5000,
    barcode: "123456789",
  },
  {
    id: 2,
    material: "Material B",
    konversi_material: "Konversi B",
    jumlah: 200,
    uom: "kg",
    harga: 10000,
    barcode: "987654321",
  },
  {
    id: 3,
    material: "Material C",
    konversi_material: "Konversi C",
    jumlah: 150,
    uom: "liters",
    harga: 7500,
    barcode: "555555555",
  },
];

export const dummyLayanan: any[] = [
  {
    id: 1,
    layanan: "Layanan A",
    supplier: "Supplier X",
    harga: 100000,
  },
  {
    id: 2,
    layanan: "Layanan B",
    supplier: "Supplier Y",
    harga: 150000,
  },
  {
    id: 3,
    layanan: "Layanan C",
    supplier: "Supplier Z",
    harga: 200000,
  },
];
