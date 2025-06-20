import { FC } from 'react';
import { PageLink, PageTitle } from '@metronic/layout/core';
import ServiceForm from '../../components/template/ServiceForm';

const AddCoa: FC = () => {
    const breadcrumbs: Array<PageLink> = [
        {
            title: "Dashboard",
            path: "/",
            isSeparator: false,
            isActive: false,
        },
        {
            title: "Accounting",
            path: "/accounting",
            isSeparator: false,
            isActive: false,
        },
        {
            title: "Master Data",
            path: "/accounting/masterdata",
            isSeparator: false,
            isActive: false,
        },
        {
            title: "Chart of Account",
            path: "/accounting/masterdata/chart-of-account",
            isSeparator: false,
            isActive: false,
        },
    ];

    return (
        <>
            <PageTitle breadcrumbs={breadcrumbs}>Tambah Chart of Account</PageTitle>
            <ServiceForm
                mode="create"
                successMessage="Chart of Account berhasil ditambahkan"
                headTitle="Tambah Chart of Account"
                buttonTitle="Tambah"
                message="Pastikan bahwa semua informasi sudah benar."
                confirmButtonLabel="Tambah"
                cancelButtonLabel="Kembali"
            />
        </>
    );
};

export default AddCoa;