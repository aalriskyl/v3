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
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Material Request</PageTitle>
            {/* Add Material Request Form */}
            <Form
                mode='create'
                formTitle='Tambah Material Request?'
                submitButtonLabel='Tambah'
                successMessage='Material Request berhasil di tambah'
                headTitle='Tambah Material Request'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar'
            />
        </>
    );
};

export default AddPage;
