import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import MaterialsFormEdit from '../../components/template/MaterialsFormEdit';
import MaterialsForm from '../../components/template/MaterialsForm';

const EditMaterials: FC = () => {
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
    ]
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Material</PageTitle>
            <MaterialsForm
            mode='edit'
                successMessage='Material berhasil di ubah.'
                headTitle='Ubah Material'
                buttonTitle='Ubah'
                message='Pastikan bahwa semua informasi sudah benar.' 
                confirmButtonLabel='Ubah'
                cancelButtonLabel='Batal'/>
        </>
    );
};

export default EditMaterials;