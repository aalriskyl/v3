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
            title: 'Inventory',
            path: '/inventory',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Pengajuan',
            path: '/inventory/pengajuan',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Manajemen Pengiriman',
            path: '/inventory/pengajuan/manajemen-pengiriman',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Material Request',
            path: '/inventory/pengajuan/manajemen-pengiriman/material-request',
            isSeparator: false,
            isActive: false,
        },
    ];
    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Material Request</PageTitle>
            {/* Add Material Request Form */}
            <Form
                mode='edit'
                formTitle='Edit Material Request?'
                submitButtonLabel='Edit'
                successMessage='Material Request berhasil di tambah'
                headTitle='Ubah Material Request'
                buttonTitle='Ubah'
                message='Pastikan bahwa semua informasi sudah benar'
            />
        </>
    );
};

export default EditPage;
