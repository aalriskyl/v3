import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import UomForm from '../../components/template/UomForm';

const AddUom: FC = () => {
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
            title: 'Materials',
            path: '/inventory/masterdata/materials',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Tambah Materials',
            path: '/inventory/masterdata/materials/new',
            isSeparator: false,
            isActive: false,
        },
    ]
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Uom</PageTitle>
            <UomForm
                mode='create'
                successMessage='Uom berhasil ditambahkan'
                headTitle='Tambah Uom'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar.'
                confirmButtonLabel='Simpan'
                cancelButtonLabel='Batal'
            />
        </>
    );
};

export default AddUom;