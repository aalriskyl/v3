import React, { FC, useState } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import LayananForm from '../../components/template/UomForm';

const EditLayanan: FC = () => {
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
            title: 'Master Data',
            path: '/inventory/masterdata',
            isSeparator: false,
            isActive: true,
        },
        {
            title: 'Satuan UOM',
            path: '/inventory/masterdata/satuan-uom',
            isSeparator: false,
            isActive: false,
        },
    ]
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Satuan/UOM</PageTitle>
            <LayananForm
                mode='edit'
                successMessage='Satuan/UOM berhasil di ubah.'
                headTitle='Ubah Satuan/UOM'
                buttonTitle='Ubah'
                cancelButtonLabel='Kembali'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default EditLayanan;