import { Service, Supplier } from '../../molecules/core/_models';

const dummyDataService: Service[] = [
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
        supplier: {
        name: 'Supplier A'
        },
        buy_price: 20000,
        skala_prioritas: 'Tinggi',
        set_default: 'Pembelian',
    },
    {
        id: 1,
        supplier: {
            name: 'Supplier A'
        },
        buy_price: 20000,
        skala_prioritas: 'Tinggi',
        set_default: 'Pembelian',
    },
    {
        id: 1,
        supplier: {
            name: 'Supplier A'
        },
        buy_price: 20000,
        skala_prioritas: 'Tinggi',
        set_default: 'Pembelian',
    },
    {
        id: 1,
        supplier: {
            name: 'Supplier A'
        },
        buy_price: 20000,
        skala_prioritas: 'Tinggi',
        set_default: 'Pembelian',
    },
       {
        id: 1,
        supplier: {
        name: 'Supplier A'
        },
        buy_price: 20000,
        skala_prioritas: 'Tinggi',
        set_default: 'Pembelian',
    },
];

export { dummyDataService, dummyDataSupplier };