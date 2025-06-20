/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service, Supplier } from '../../molecules/core/_models';

const dummyDataService: any[] = [
    {
        id: 1,
        name: 'Layanan Pemrograman Web',
        category_name: 'Kategori 1',
        brand: 'TechSolutions',
        description: 'Layanan pembuatan website profesional untuk bisnis Anda.',
        status: true,
    },
    {
        id: 2,
        name: 'Layanan Desain Grafis',
        category_name: 'Kategori 2',
        brand: 'CreativeStudio',
        description: 'Desain logo, brosur, dan materi pemasaran lainnya.',
        status: false,
    },
    {
        id: 3,
        name: 'Layanan Konsultasi Bisnis',
        category_name: 'Kategori 3',
        brand: 'BusinessAdvisors',
        description: 'Konsultasi strategi bisnis dan manajemen perusahaan.',
        status: true,
    },
];

const dummyDataSupplier: Supplier[] = [
    {
        id: 1,
        supplier: 'Supplier A',
        harga_beli: 'Rp 100.000',
        harga_jual: 'Rp 150.000',
        skala_prioritas: 'Tinggi',
        set_default: 'Pembelian',
    },
    {
        id: 2,
        supplier: 'Supplier B',
        harga_beli: 'Rp 200.000',
        harga_jual: 'Rp 250.000',
        skala_prioritas: 'Sedang',
        set_default: 'Penjualan',
    },
    {
        id: 3,
        supplier: 'Supplier C',
        harga_beli: 'Rp 300.000',
        harga_jual: 'Rp 350.000',
        skala_prioritas: 'Rendah',
        set_default: 'Pembelian',
    },
    {
        id: 4,
        supplier: 'Supplier D',
        harga_beli: 'Rp 400.000',
        harga_jual: 'Rp 450.000',
        skala_prioritas: 'Tinggi',
        set_default: 'Penjualan',
    },
    {
        id: 5,
        supplier: 'Supplier E',
        harga_beli: 'Rp 500.000',
        harga_jual: 'Rp 550.000',
        skala_prioritas: 'Sedang',
        set_default: 'Pembelian',
    },
];

export { dummyDataService, dummyDataSupplier };