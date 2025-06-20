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
            isActive: false,
        },
        {
            title: 'Pengajuan',
            path: '/inventory/pengajuan/manajemen-stok',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Stock Opname',
            path: '/inventory/pengajuan/manajemen-stok/stock-opname',
            isSeparator: false,
            isActive: false,
        },
    ];
    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Stock Opname</PageTitle>
            <Form
                mode='edit'
                successMessage='Stock Opname berhasil di Ubah'
                headTitle='Ubah Stock Opname'
                buttonTitle='Ubah'
                confirmButtonLabel='Ubah'
                cancelButtonLabel='Batalkan'
                message='Pastikan informasi sudah lengkap.'
            />
        </>
    );
};

export default AddSupplierPage;
