import React, { FC, useState } from 'react';
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
            title: 'Catatan Penerimaan',
            path: '/inventory/pengajuan/manajemen-pengiriman/catatan-penerimaan',
            isSeparator: false,
            isActive: false,
        },
    ];
    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Catatan Penerimaan</PageTitle>
            <Form
                mode='edit'
                successMessage='Catatan Penerimaan berhasil di Ubah'
                headTitle='Ubah Catatan Penerimaan'
                buttonTitle='Ubah'
                confirmButtonLabel='Ubah'
                cancelButtonLabel='Batalkan'
                message='Pastikan informasi sudah lengkap.'
            />
        </>
    );
};

export default EditPage;
