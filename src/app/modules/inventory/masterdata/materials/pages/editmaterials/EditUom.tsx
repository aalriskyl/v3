import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import UomFormEdit from '../../components/template/UomFormEdit';
import UomForm from '../../components/template/UomForm';

const EditUom: FC = () => {
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
            path: '/invetory/masterdata/materials',
            isSeparator: false,
            isActive: false,
        },
    ]
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Uom</PageTitle>
            <UomForm
                mode='edit'
                successMessage='Uom berhasil di ubah.'
                headTitle='Ubah Uom'
                buttonTitle='Ubah'
                message='Pastikan bahwa semua informasi sudah benar.' 
                confirmButtonLabel='Ubah'
                cancelButtonLabel='Batal'/>
        </>
    );
};

export default EditUom;