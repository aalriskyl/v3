import React, { FC, useState } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import FormComponent from '../../components/template/RefactoredForm';

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
            isActive: true,
        },
        {
            title: 'Pengajuan',
            path: '/inventory/pengajuan',
            isSeparator: false,
            isActive: true,
        },
        {
            title: 'Manajemen Pengiriman',
            path: '/inventory/pengajuan/manajemen-pengiriman',
            isSeparator: false,
            isActive: true,
        },
        {
            title: 'Catatan Pengiriman',
            path: '/inventory/pengajuan/manajemen-pengiriman/catatan-pengiriman',
            isSeparator: false,
            isActive: false,
        },
    ];
    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Catatan Pengiriman</PageTitle>
            <FormComponent
                mode='edit'
                successMessage='Catatan Pengiriman berhasil di Ubah'
                headTitle='Ubah Catatan Pengiriman'
                buttonTitle='Ubah'
                confirmButtonLabel='Ubah'
                cancelButtonLabel='Batalkan'
                message='Pastikan informasi sudah lengkap.'
            />
        </>
    );
};

export default EditPage;
