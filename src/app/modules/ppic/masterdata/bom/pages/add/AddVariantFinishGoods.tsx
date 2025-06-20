import React, { FC, useState } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core'
import Form from '../../components/template/VariantForm';

const AddVariantFinishGoods: FC = () => {
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
        {
            title: 'Variant Finish Goods',
            path: '/ppic/masterdata/bom/variant-finish-goods',
            isSeparator: false,
            isActive: false,
        },
    ]
    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Variant Finish Goods</PageTitle>
            <Form
                confirmButtonLabel='Tambah'
                cancelButtonLabel='Batalkan'
                successMessage='Variant Finish Good berhasil di tambah'
                headTitle='Tambah Variant Finish Good'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar.' />
        </>
    );
};

export default AddVariantFinishGoods;