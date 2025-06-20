import React, { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import Form from '../../components/template/RefactoredForm';

const AddPage: FC = () => {
    const breadcrumbs: Array<PageLink> = [
        {
            title: "Dashboard",
            path: "/",
            isSeparator: false,
            isActive: false,
        },
        {
            title: "Sales",
            path: "/sales",
            isSeparator: false,
            isActive: false,
        },
        {
            title: "Pengajuan",
            path: "/sales/pengajuan",
            isSeparator: false,
            isActive: false,
        },
        {
            title: "Request Order",
            path: "/sales/pengajuan/request-order",
            isSeparator: false,
            isActive: false,
        },
    ];
    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Request Order</PageTitle>
            {/* Add Sales Order Form */}
            <Form
                mode='create'
                formTitle='Tambah Request Order'
                submitButtonLabel='Tambah'
                successMessage='Request Order berhasil di tambah'
                headTitle='Tambah Request Order'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar'
            />
        </>
    );
};

export default AddPage;
