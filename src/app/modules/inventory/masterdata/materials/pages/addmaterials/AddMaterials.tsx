import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import MaterialsForm from '../../components/template/MaterialsForm';

const AddMaterials: FC = () => {
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
            path: '/inventory/masterdata/',
            isSeparator: false,
            isActive: true,
        },
        {
            title: 'Materials',
            path: '/inventory/masterdata/materials',
            isSeparator: false,
            isActive: false,
        },
    ];

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Material</PageTitle>
            <MaterialsForm
                mode='create'
                successMessage='Material berhasil ditambahkan'
                headTitle='Tambah Material'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar.'
                confirmButtonLabel='Tambah'
                cancelButtonLabel='Batal'
            />
        </>
    );
};

export default AddMaterials;