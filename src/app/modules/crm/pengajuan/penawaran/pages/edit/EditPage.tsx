import React, { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import Form from '../../components/template/RefactoredForm';

const EditPage: FC = () => {
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
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Penawaran</PageTitle>
            {/* Add Material Request Form */}
            <Form
                mode='edit'
                formTitle='Ubah Penawaran?'
                submitButtonLabel='Edit'
                successMessage='Penawaran berhasil di Ubah'
                headTitle='Ubah Penawaran'
                buttonTitle='Ubah'
                message='Pastikan bahwa semua informasi sudah benar'
            />
        </>
    );
};

export default EditPage;
