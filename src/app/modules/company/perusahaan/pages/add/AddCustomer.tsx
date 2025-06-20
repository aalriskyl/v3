import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import Form from '../../components/template/Form';

const AddCompany: FC = () => {
    const breadcrumbs: Array<PageLink> = [
        {
            title: 'Dashboard',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Company',
            path: '/company',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Perusahaan',
            path: '/company/perusahaan',
            isSeparator: false,
            isActive: false,
        },

    ];
    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Perusahaan</PageTitle>
            {/* Add Supplier Form */}
            <Form
                mode='create'
                cancelButtonLabel='Batalkan'
                submitButtonLabel='Tambah'
                headTitle='Tambah Perusahaan'
                buttonTitle='Tambah'
                successMessage='Perusahaan berhasil di Tambah'
                message='Pastikan bahwa semua informasi sudah benar.'
            />
        </>
    );
};

export default AddCompany;
