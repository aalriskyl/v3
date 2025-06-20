import React, { FC, useState } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import Form from '../../components/template/MaterialsFormForEdit';

const EditMaterials: FC = () => {
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
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Bill of Material</PageTitle>
            <Form
                confirmButtonLabel='Ubah'
                cancelButtonLabel='Batalkan'
                successMessage='Bill of Material berhasil diubah'
                headTitle='Ubah Bill of Material'
                buttonTitle='Ubah'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default EditMaterials;

