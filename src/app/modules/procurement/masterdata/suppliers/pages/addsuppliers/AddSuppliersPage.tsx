import React, { FC, useState } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import RefactoredForm from '../../components/template/RefactoredForm';

const AddSupplierPage: FC = () => {
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
            title: 'Master Data',
            path: '/procurement/masterdata/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Suppliers',
            path: '/procurement/masterdata/suppliers',
            isSeparator: false,
            isActive: false,
        },
    ];
    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Supplier</PageTitle>
            {/* Add Supplier Form */}
            <RefactoredForm
                mode='create'
                successMessage='Supplier berhasil di tambah'
                headTitle='Tambah'
                buttonTitle='Tambah'
                message='Pastikan informasi sudah lengkap.'
            />
        </>
    );
};

export default AddSupplierPage;
