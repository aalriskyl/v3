import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import UomForm from '../../components/template/UomForm';

const AddLayanan: FC = () => {
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
            title: 'Satuan UOM',
            path: '/inventory/masterdata/satuan-uom',
            isSeparator: false,
            isActive: false,
        },
    ]
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Satuan/UOM</PageTitle>
            <UomForm
                mode='create'
                successMessage='Satuan/UOM berhasil di tambah'
                headTitle='Tambah Satuan/UOM'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default AddLayanan;