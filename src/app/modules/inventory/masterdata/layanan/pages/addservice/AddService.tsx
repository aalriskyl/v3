import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import ServiceForm from '../../components/template/ServiceForm';

const AddService: FC = () => {
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
            isActive: true,
        },
        {
            title: 'Layanan',
            path: '/inventory/masterdata/layanan',
            isSeparator: false,
            isActive: false,
        },
    ]
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Layanan</PageTitle>
            <ServiceForm
                mode='create'
                cancelButtonLabel='Kembali'
                successMessage='Layanan berhasil di tambah'
                headTitle='Tambah Layanan'
                buttonTitle='Tambah'
                confirmButtonLabel='Tambah'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default AddService;