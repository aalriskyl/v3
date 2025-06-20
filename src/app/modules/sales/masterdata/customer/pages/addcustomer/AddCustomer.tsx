import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import Form from '../../components/template/Form';

const AddCustomerPage: FC = () => {
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
            title: 'Master Data',
            path: '/sales/masterdata/',
            isSeparator: false,
            isActive: false,
        },
        {
            title: 'Customer',
            path: '/sales/masterdata/customers',
            isSeparator: false,
            isActive: false,
        },
    ];
    return (
        <>
            {/* Breadcrumb Header */}
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Customer</PageTitle>
            {/* Add Supplier Form */}
            <Form
                mode='create'
                // formTitle='Tambah Customer?'
                // submitButtonLabel='Tambah'
                successMessage='Customer berhasil di tambah'
                headTitle='Tambah Customer'
                buttonTitle='Tambah'
                message='Pastikan bahwa semua informasi sudah benar.'
            />
        </>
    );
};

export default AddCustomerPage;
