import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import CategoryForm from '../../components/template/CategoryForm';

const AddCategory: FC = () => {
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
            isActive: true,
        },
        {
            title: 'Master Data',
            path: '/inventory/masterdata',
            isSeparator: false,
            isActive: true,
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
            <CategoryForm
                mode='create'
                successMessage='Kategori Produk berhasil di tambah'
                headTitle='Tambah Kategori Produk'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default AddCategory;