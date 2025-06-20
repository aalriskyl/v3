import React, { FC, useState } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import Form from '../../components/template/MaterialsForm';

const AddMaterials: FC = () => {
    const breadcrumbs: Array<PageLink> = [
        {
            title: 'Dashboard',
            path: '/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'PPIC',
            path: '/ppic',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Master Data',
            path: '/ppic/masterdata/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Bill of Material',
            path: '/ppic/masterdata/bom',
            isSeparator: false,
            isActive: false,
        },
    ]
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Bill of Material</PageTitle>
            <Form
                confirmButtonLabel='Tambah'
                cancelButtonLabel='Batalkan'
                successMessage='Bill of Material berhasil di tambah'
                headTitle='Tambah Bill of Material'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default AddMaterials;