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
            title: 'Sales',
            path: '/sales',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Pengajuan',
            path: '/sales/pengajuan',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Faktur Penjualan',
            path: '/sales/pengajuan/faktur-penjualan',
            isSeparator: false,
            isActive: false,
        },
    ];
    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Faktur Penjualan</PageTitle>
            {/* Add Sales Order Form */}
            <Form
                mode='create'
                formTitle='Tambah Faktur Penjualan'
                submitButtonLabel='Tambah'
                successMessage='Faktur Penjualan berhasil di tambah'
                headTitle='Tambah Faktur Penjualan'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar'
            />
        </>
    );
};

export default AddPage;
