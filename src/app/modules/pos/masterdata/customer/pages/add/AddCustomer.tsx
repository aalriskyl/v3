import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import CustomerForm from '../../../../../sales/masterdata/customer/components/template/Form';

const AddMeja: FC = () => {
    const breadcrumbs: Array<PageLink> = [
        {
            title: 'Dashboard',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Inventory',
            path: '/inventory',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Master Data',
            path: '/inventory/masterdata',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Kategori Produk',
            path: '/inventory/masterdata/kategori-produk',
            isSeparator: false,
            isActive: false,
        },
    ]
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Kategori Produk</PageTitle>
            <CustomerForm
                mode='create'
                successMessage='Kategori Produk berhasil di tambah'
                headTitle='Tambah Kategori Produk'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default AddMeja;