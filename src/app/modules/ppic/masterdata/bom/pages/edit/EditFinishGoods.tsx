import React, { FC, useState } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import Form from '../../components/template/VariantFormForEdit';

const EditFinishGoods: FC = () => {
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
            <PageTitle breadcrumbs={breadcrumbs}>Ubah Finish Goods</PageTitle>
            <Form
                confirmButtonLabel='Ubah'
                cancelButtonLabel='Batalkan'
                successMessage='Finish Goods berhasil diubah'
                headTitle='Ubah Finish Goods'
                buttonTitle='Ubah'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default EditFinishGoods;

