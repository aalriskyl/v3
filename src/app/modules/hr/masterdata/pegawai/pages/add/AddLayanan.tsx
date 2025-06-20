import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import Form from '../../components/template/Form';

const AddLayanan: FC = () => {
    const breadcrumbs: Array<PageLink> = [
        {
            title: 'Dashboard',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'HR',
            path: '/hr',
            isSeparator: false,
            isActive: true,
        },
        {
            title: 'Master Data',
            path: '/hr/masterdata/',
            isSeparator: false,
            isActive: true,
        },
        {
            title: 'Pegawai',
            path: '/hr/masterdata/pegawai',
            isSeparator: false,
            isActive: false,
        },
    ]

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Pegawai</PageTitle>
            <Form
                mode="create"
                formTitle='Tambah Pegawai'
                submitButtonLabel='Tambah'
                // successMessage='Pegawai berhasil di tambah'
                headTitle='Tambah Pegawai'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default AddLayanan;