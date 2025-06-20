import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import UomForm from '../../components/template/ItemForm';

const AddItem: FC = () => {
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
            title: 'Item Bundling',
            path: '/invetory/masterdata/item-bundling',
            isSeparator: false,
            isActive: false,
        },
    ]
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Item Bundling</PageTitle>
            <UomForm
                formTitle='Tambah Item Bundling'
                submitButtonLabel='Tambah'
                successMessage='Item Bundling berhasil di tambah'
                headTitle='Tambah Item Bundling'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default AddItem;