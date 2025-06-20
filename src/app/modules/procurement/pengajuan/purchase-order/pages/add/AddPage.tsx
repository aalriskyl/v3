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
            title: 'Procurement',
            path: '/procurement',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Pengajuan',
            path: '/procurement/pengajuan',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Purchase Request',
            path: '/procurement/pengajuan/purchase-request',
            isSeparator: false,
            isActive: false,
        },
    ];
    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Purchase Request</PageTitle>
            {/* Add Purchase Order Form */}
            <Form
                mode='create'
                formTitle='Tambah Purchase Request?'
                submitButtonLabel='Tambah'
                successMessage='Purchase Request berhasil di tambah'
                headTitle='Tambah Purchase Request'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar'
            />
        </>
    );
};

export default AddPage;
