import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import ItemForm from '../../components/template/ItemForm';

const EditItem: FC = () => {
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
            path: '/inventory/masterdata/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Kategori Produk',
            path: '/invetory/masterdata/item-bundling',
            isSeparator: false,
            isActive: false,
        },
    ]
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Item Bundling</PageTitle>
            <ItemForm
                formTitle="Ubah Item Bundling"
                submitButtonLabel='Ubah'
                successMessage='Item Bundling berhasil di ubah.'
                headTitle='Ubah Item Bundling'
                buttonTitle='Ubah'
                cancelButtonLabel='Kembali'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default EditItem;