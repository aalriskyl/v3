import React, { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import Form from '../../components/template/RefactoredForm';

const AddPage: FC = () => {
    const breadcrumbs: Array<PageLink> = [
        {
            title: 'Dashboard',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'CRM',
            path: '/crm',
            isSeparator: false,
            isActive: true,
        },
        {
            title: 'Pengajuan',
            path: '/crm/pengajuan',
            isSeparator: false,
            isActive: true,
        },
        {
            title: 'Penawaran',
            path: '/crm/pengajuan/penawaran',
            isSeparator: false,
            isActive: false,
        },
    ];
    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Penawaran</PageTitle>
            {/* Add Material Request Form */}
            <Form
                mode='create'
                formTitle='Tambah Penawaran?'
                submitButtonLabel='Tambah'
                successMessage='Tambah Penawaran berhasil di tambah'
                headTitle='Tambah Penawaran'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar'
            />
        </>
    );
};

export default AddPage;
