import React, { FC, useState } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import Form from '../../components/template/RefactoredForm';

const AddSupplierPage: FC = () => {
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
            title: 'Pengajuan',
            path: '/inventory/pengajuan/manajemen-stok/',
            isSeparator: false,
            isActive: true,
        },
        {
            title: 'Entry Stock',
            path: '/inventory/pengajuan/manajemen-stok/entry-stock',
            isSeparator: false,
            isActive: false,
        },
    ];
    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Entry Stock</PageTitle>
            {/* Add Supplier Form */}
            <Form
            failedMessage='Gagal Menambahkan Entry Stock'
                mode='create'
                submitButtonLabel='Tambah'
                successMessage='Supplier berhasil di tambah'
                headTitle='Tambah'
                buttonTitle='Tambah'
                message='Pastikan informasi sudah lengkap.'
            />
        </>
    );
};

export default AddSupplierPage;
